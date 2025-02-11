import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Tabs, useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/FireBaseConfig';
import { GetLocalStorage } from '../../service/LocalStorage';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
const _layout = () => {
  const router = useRouter();
  
  useEffect(() => {
    CheckAuth();
  }, []);

  const CheckAuth = async () => {
    const userDetail = await GetLocalStorage("userDetails");
    console.log("__",userDetail)
    if (!userDetail) {
    
      router.push('login/Home');
      return;
    }
  }

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen 
        name="index"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          )
        }} 
      />
      <Tabs.Screen 
        name="AddNew"
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="history" size={24} color={color} />
          )
        }} 
      />
      <Tabs.Screen 
        name="Profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          )
        }} 
      />
    </Tabs>
  );
}

export default _layout;
