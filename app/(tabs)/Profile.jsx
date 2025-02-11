import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
import { auth } from '../../config/FireBaseConfig';
import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { ClearLocalStorage } from '../../service/LocalStorage';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const Profile = () => {
  const router = useRouter();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        ClearLocalStorage('userDetails');
        router.replace('login/Home');
      })
      .catch((error) => {
        console.error('Logout Error:', error);
      });
  };

  const handleNavigation = (screen) => {
    router.replace(screen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}> 
        <Image 
          source={require("../../assets/images/user.png")} 
          style={styles.avatar} 
        />
        <Text style={styles.username}></Text>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton}  onPress={() => router.push('add-medication/AddMedication')}>
          <AntDesign name="pluscircleo" size={28} color="#4361ee" style={styles.icon} />
          <Text style={styles.optionText}>Create New</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}  onPress={() => router.push('(tabs)/AddNew')}>
          <FontAwesome5 name="history" size={28} color="#4361ee" style={styles.icon} />
          <Text style={styles.optionText}>View History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton} onPress={() => router.push('(tabs)')}>
          <AntDesign name="home" size={28} color="#4361ee" style={styles.icon} />
          <Text style={styles.optionText}>Go to Home</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <AntDesign name="logout" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  optionsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: 15,
  },
  optionText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e53e3e',
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    width: '60%',
    justifyContent: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default Profile;