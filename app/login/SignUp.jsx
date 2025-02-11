import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { GetLocalStorage, SetLocalStorage } from '../../service/LocalStorage';
import { auth, db } from '../../config/FireBaseConfig';
import { addDoc, collection } from 'firebase/firestore';


const SignUp = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');


const handleAddUser= async(email) => {
   
   

    // console.log(formdata.startDate.toLocaleDateString('en-GB'),formdata.endDate.toLocaleDateString('en-GB'))

  
    setIsLoading(true)
    // Log the form data (you can replace this with an API call)
    try {
      const docRef = await addDoc(collection(db, "User"), {userName,userEmail:email});
      console.log("Document written with ID: ", docRef.id);
     


    } catch (e) {
      console.error("Error adding document: ", e);
      Alert.alert("Failed", "Failed to added ");

    }
    setIsLoading(false)

    // Show success message


    // Reset form data (optional)

   
  };


  const OnCreateAccount = () => {
    if (!email || !password) {
      ToastAndroid.show("Please enter all details", ToastAndroid.SHORT);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then( async(userCredential) => {
        const user = userCredential.user;
        console.log("User registered:", user);
        handleAddUser(email)

        await updateProfile(user, { displayName: userName });
        // console.log("User registered and name updated:", user);
        await  SetLocalStorage("userDetails",user)
      // await updateProfile(user,{displayName:userName})

        ToastAndroid.show("Account created successfully!", ToastAndroid.SHORT);
        router.push('(tabs)'); 
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log("Error:", errorCode);

        if (errorCode === 'auth/email-already-in-use') {
          ToastAndroid.show('Email already exists', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show('Registration failed', ToastAndroid.SHORT);
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your Account</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput onChangeText={(value) => setUserName(value)}  placeholder="Enter your full name" style={styles.input} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput 
          onChangeText={(value) => setEmail(value)} 
          placeholder="Enter your email" 
          style={styles.input} 
          keyboardType="email-address" 
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput 
          onChangeText={(value) => setPassword(value)} 
          placeholder="Enter your password" 
          style={styles.input} 
          secureTextEntry={true} 
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={OnCreateAccount}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('login/SignIn')}>
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginLink}>Log in</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#4361ee',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4361ee',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  loginLink: {
    color: '#4361ee',
    fontWeight: 'bold',
  },
});

export default SignUp;
