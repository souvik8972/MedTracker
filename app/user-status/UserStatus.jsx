import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Animated } from 'react-native';
import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';


import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/FireBaseConfig';

import { useEffect, useState } from 'react';

import { MaterialIcons, AntDesign } from '@expo/vector-icons';


// Ensure the correct Firebase config path

const UserStatus = () => {
  const data = useLocalSearchParams();
  const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
  const selectedDate = data.selectedDate;
  const router = useRouter();

  const [currentStatus, setCurrentStatus] = useState(null); // Track current status

  useEffect(() => {
    // Check if status already exists for the selected date
    if (parsedData?.status) {
     
      
        setCurrentStatus(parsedData?.status); 
      
    }
   
  }, [parsedData, selectedDate]);

  const handleStatus = async (status) => {
    try {
      const docRef = doc(db, 'MED', parsedData.id); // Reference to the document

      await updateDoc(docRef, {
        statusHistory: arrayUnion({
          status: status,
          date: selectedDate,
        }),
      });

      console.log(`Medicine marked as: ${status}`);
      alert(`Status updated successfully: ${status}`);
      setCurrentStatus(status);
      router.replace('(tabs)')
       // Update local status after successful update
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../../assets/images/bell.gif')} />

      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{selectedDate}</Text>
      </View>

      <View style={styles.medicineInfo}>
        <Text style={styles.medicineName}>{parsedData.medicine}</Text>
        <Text style={styles.medicineDetails}>
          Quantity: {parsedData.quantity} {parsedData.type.name}
        </Text>
        <Text style={styles.medicineTime}>{parsedData.time}</Text>
      </View>

      {/* Show Status if Already Set */}
      {currentStatus ? (
        <View style={styles.statusContainer}>
          {currentStatus === 'Taken' ? (
            <View style={styles.statusView}>
              <MaterialIcons name="check-circle" size={24} color="green" />
              <Text style={styles.medicineName}>Taken</Text>
            </View>
          ) : (
            <View style={styles.statusView}>
              <MaterialIcons name="cancel" size={24} color="red" />
              <Text style={styles.medicineName}>Missed</Text>
            </View>
          )}
        </View>
      ) : (
       
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.takenButton]}
            onPress={() => handleStatus('Taken')}
          >
            <MaterialIcons name="check-circle" size={24} color="white" />
            <Text style={styles.buttonText}>Taken</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.missedButton]}
            onPress={() => handleStatus('Missed')}
          >
            <MaterialIcons name="cancel" size={24} color="white" />
            <Text style={styles.buttonText}>Missed</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity onPress={() => router.back()} style={styles.close}>
        <AntDesign name="closecircleo" size={39} color="black" />
      </TouchableOpacity>
    </ScrollView>
  );
};




const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  dateContainer: {
    backgroundColor: '#E0F7FA',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00796B',
  },
  medicineInfo: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 30,
    width: '90%',
  },
  medicineIcon: {
    width: 60,
    height: 60,
    // marginBottom: 10,
  },
  medicineName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#37474F',
    marginBottom: 5,
  },
  medicineDetails: {
    fontSize: 20,
    color: '#607D8B',
    marginBottom: 5,
  },
  medicineTime: {
    fontSize: 25,
    color: '#607D8B',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  takenButton: {
    backgroundColor: '#4CAF50',
  },
  missedButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  close:{
    position:'absolute',
    bottom:20,
    fontSize:30
  },
  statusView:{
    flexDirection:'row',
    alignItems:'center',
    gap:'10',
    
  }
});

export default UserStatus;