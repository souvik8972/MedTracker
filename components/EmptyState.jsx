import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const EmptyState = ({check}) => {

const router=useRouter()


  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/images/medicine.png")} />
      <Text style={styles.title}>No Medications!</Text>
      <Text style={styles.subtitle}>
        You have 0 medications set up, kindly set up a new one.
      </Text>
      {check=="true"?null:  <TouchableOpacity style={styles.button} onPress={()=>router.push('add-medication/AddMedication')}>
        <Text style={styles.buttonText}>+ Add New Medicine</Text>
      </TouchableOpacity>}
    
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop:40,
    // backgroundColor: '#f8f9fa',
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 10,

  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
