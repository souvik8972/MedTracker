import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { auth } from '../../config/FireBaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { SetLocalStorage } from '../../service/LocalStorage';


const SignIn = () => {
const router=useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


const OnSignIn=()=>{
if (!email || !password) {
      ToastAndroid.show("Please enter all details", ToastAndroid.SHORT);
      return;
    }



    signInWithEmailAndPassword(auth, email, password)
    .then(async(userCredential) => {
      const user = userCredential.user;
      console.log("User signed in:", user);
      ToastAndroid.show("Login successful!", ToastAndroid.SHORT);
     await SetLocalStorage("userDetails",user)
      router.push('(tabs)')
    })
    .catch((error) => {
      const errorCode = error.code;

      console.log("Login Error:", errorCode);

      switch (errorCode) {
        case 'auth/user-not-found':
          ToastAndroid.show('No user found with this email', ToastAndroid.SHORT);
          break;
        case 'auth/wrong-password':
          ToastAndroid.show('Incorrect password', ToastAndroid.SHORT);
          break;
        case 'auth/invalid-email':
          ToastAndroid.show('Invalid email format', ToastAndroid.SHORT);
          break;
        case 'auth/user-disabled':
          ToastAndroid.show('This account has been disabled', ToastAndroid.SHORT);
          break;
        default:
          ToastAndroid.show('Login failed. Please try again.', ToastAndroid.SHORT);
      }
    });


}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's Sign You In</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput onChangeText={(value) => setEmail(value)}  placeholder="Enter your email" style={styles.input} keyboardType="email-address" />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput onChangeText={(value) => setPassword(value)}  placeholder="Enter your password" style={styles.input} secureTextEntry={true} />
      </View>

      <TouchableOpacity style={styles.button} onPress={OnSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Don't have an account? Sign Up */}
      <TouchableOpacity onPress={() => router.push('login/SignUp')}>
        <Text style={styles.signUpText}>
          Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
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
    signUpText: {
        marginTop: 15,
        textAlign: 'center',
        fontSize: 16,
        color: '#333',
      },
      signUpLink: {
        color: '#4361ee',
        fontWeight: 'bold',
      },
  });
  

export default SignIn;
