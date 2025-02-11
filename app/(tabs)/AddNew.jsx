import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import EmptyState from '../../components/EmptyState';
import { getPreviousSevenDays, getSevenDays } from '../../utill/CustomFuction';
import ShowDetails from '../../components/ShowDetails';
import ShowHistory from '../../components/ShowHistory';

const AddNew = () => {
  const [days,setDays]=useState(getPreviousSevenDays());
   



  return (
    <SafeAreaView style={styles.container}>
      {/* Header Component */}
      <Header />
      
      {/* Content Section */}
      <View style={styles.contentContainer}>
        <Image 
          style={styles.image} 
          source={require('../../assets/images/header.jpg')} 
        />
   
   
   
      </View>
{/* <EmptyState/> */}
<Text style={styles.headerText}>Last Seven Days History</Text>
<ShowHistory days={days} />


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20,
    backgroundColor: 'white', // Light background for a modern look
  },
  contentContainer: {
    width: '100%',
    height: 200,
    // backgroundColor: 'red',
    justifyContent: 'flex-start',
    marginBottom:'20',
    alignItems: 'center',
    // paddingTop: 10, // Added padding for better alignment
  },
  image: {
    width: '100%', // Takes 90% of the parent container's width
  height: '100%', // Takes 70% of the parent container's height
  borderRadius: 30,
  resizeMode: 'cover', // Ensures image scales properly

  // Shadow for iOS
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.01,
  shadowRadius: 6,

  // Shadow for Android
  elevation: 0.9, 
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',           // Darker color for readability
    textTransform: 'uppercase', // Uppercase for emphasis
    letterSpacing: 1.5,         // Adds spacing between letters
    padding: 10,
    textAlign:'center'
    
    // Indigo underline
  },
});


export default AddNew