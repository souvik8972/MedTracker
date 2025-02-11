import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import MedForm from '../../components/MedForm'
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';

const AddMedication = () => {
  const route=useRouter()
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      <TouchableOpacity onPress={route.back}>
      <Feather name="arrow-left-circle" size={24} color="#4361ee" />
      </TouchableOpacity>
           <View style={styles.contentContainer}>

        <Image style={styles.image} source={require("../../assets/images/add.jpg")} />
        </View>
        <MedForm/>
        </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20,
    backgroundColor: 'white', 
  }, contentContainer: {
    width: '100%',
    height: 150,

   
    justifyContent: 'flex-start',
    marginBottom:'20',
    alignItems: 'center',
    
  },
  image: {
    width: '100%', 
  height: '100%',
  borderRadius: 30,
  resizeMode: 'contain',
 


 
  },
})
export default AddMedication