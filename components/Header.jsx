import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GetLocalStorage } from '../service/LocalStorage'; // Ensure this path is correct
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

const Header = () => {
  const [userName, setUserName] = useState(null);
  const router =useRouter()

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetails = await GetLocalStorage('userDetails');
      if (userDetails && userDetails.displayName) {
        setUserName(userDetails.displayName.split(" ")[0]);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Hello {userName}!</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push('add-medication/AddMedication')}
      >
        <MaterialIcons name="add-circle-outline" size={28} color="#007bff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',  // Aligns children horizontally
    alignItems: 'center',  // Centers items vertically
    justifyContent: 'space-between',  // Pushes text and button apart
    padding: 20,
    // backgroundColor: 'red',
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
    // elevation: 3, // Shadow effect for Android
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    flex: 1,  // Allows text to take available space
  },
  button: {
    // backgroundColor: '#007bff',
    color: '#007bff',
    padding: 2,
    borderRadius: 20,
  },
});

export default Header;
