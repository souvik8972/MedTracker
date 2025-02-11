import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { options, TypeList, WhenToTake } from '../constant/Options';
import { when } from '../constant/Options';
import AntDesign from '@expo/vector-icons/AntDesign';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../config/FireBaseConfig';
import { GetLocalStorage } from '../service/LocalStorage';
import { ActivityIndicator } from 'react-native';
import { generateDateRange } from '../utill/CustomFuction';
import { useRouter } from 'expo-router';
import { Image } from 'react-native';

export const MedForm = () => {
  const [formdata, setFormData] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartDate, setIsStartDate] = useState(true); // To differentiate between start and end date
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false); // For time picker
  const [isLoading,setIsLoading]=useState(false)
const router=useRouter()
  // Date Picker Functions
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    setDatePickerVisibility(false);
    if (isStartDate) {
      setFormData((prev) => ({ ...prev, startDate: date }));
    } else {
      setFormData((prev) => ({ ...prev, endDate: date }));
    }
  };

  // Time Picker Functions
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    setTimePickerVisibility(false);
    setFormData((prev) => ({ ...prev, time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }));
  };

  // Handle Add Medicine Button Press
  const handleAddMedicine = async() => {
   
    if (!formdata.medicine || !formdata.type || !formdata.quantity || !formdata.when || !formdata.time) {
      Alert.alert("Error", "Please fill all the fields.");
      return;
    }
    // console.log(formdata.startDate.toLocaleDateString(),formdata.endDate.toLocaleDateString())
    const dateRange = generateDateRange(formdata.startDate.toLocaleDateString('en-GB'), formdata.endDate.toLocaleDateString('en-GB'));
    // console.log(formdata.startDate.toLocaleDateString('en-GB'),formdata.endDate.toLocaleDateString('en-GB'))
    const user=await GetLocalStorage('userDetails')
  
    setIsLoading(true)
    // Log the form data (you can replace this with an API call)
    try {
      const docRef = await addDoc(collection(db, "MED"), {...formdata,userEmail:user?.email,dateRange:dateRange});
      console.log("Document written with ID: ", docRef.id);
      setFormData({});
      setSelectedOption(null);
      Alert.alert("Success", "Medicine added successfully!");
      router.push('(tabs)')
    } catch (e) {
      console.error("Error adding document: ", e);
      Alert.alert("Failed", "Failed to added ");

    }
    setIsLoading(false)

    // Show success message


    // Reset form data (optional)

   
  };

  // useEffect(() => {
  //   console.log(formdata);
  // }, [formdata]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Medicine</Text>
      
      {/* Medicine Name Input */}
      <View style={styles.inputContainer}>
        <FontAwesome6 name="hand-holding-medical" size={24} color="#4361ee" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Medicine Name"
          placeholderTextColor="#888"
          onChangeText={(value) => {
            setFormData((prev) => ({
              ...prev,
              medicine: value,
            }));
          }}
          value={formdata.medicine || ""}
        />
      </View>

      {/* Medicine Type Options */}
      <View style={styles.optionsContainer}>
        <FlatList
          data={TypeList}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedOption(item.id);
                setFormData((prev) => ({ ...prev, type: {name:item.name,icon:item.icon} }));
              }}
              style={[styles.option, item.id === selectedOption ? styles.selectedOption : {}]}
            >
             <Image 
            source={{ uri: item.icon }} 
            style={{ width: 30, height: 30,  }} 
            resizeMode="contain"
          />
              <Text style={styles.optionText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Dose Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="eyedrop-outline" size={24} color="#4361ee" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Dose Ex: 2,5ml"
          placeholderTextColor="#888"
          onChangeText={(value) => {
            setFormData((prev) => ({
              ...prev,
              quantity: value,
            }));
          }}
          value={formdata.quantity || ""}
        />
      </View>

      {/* Time Picker */}
      <View style={styles.inputContainer}>
        <Ionicons name="time-outline" size={24} color="#4361ee" style={styles.icon} />
        <TouchableOpacity
          style={styles.timeButton}
          onPress={showTimePicker}
        >
          <Text style={styles.timeText}>
            {formdata?.time || "Select Time"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* When Picker */}
      <View style={styles.pickerContainer}>
        <Picker 
          selectedValue={formdata?.when || ""}
          onValueChange={(itemValue) =>
            setFormData((prev) => ({
              ...prev,
              when: itemValue,
            }))
          }
          style={styles.picker}
          dropdownIconColor="#4361ee"
        >
          <Picker.Item label="When To take" value="" enabled={false} />
          {WhenToTake.map((val, index) => (
            <Picker.Item key={index} label={val} value={val} />
          ))}
        </Picker>
      </View>

      {/* Date Picker */}
      <View style={styles.dateContainer}>
        <View style={styles.dateRow}>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => {
              setIsStartDate(true);
              showDatePicker();
            }}
          >
            <AntDesign name="calendar" size={24} color="#4361ee" />
            <Text style={styles.dateText}>
              {formdata?.startDate?.toLocaleDateString() || "Start Date"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.toText}>TO</Text>

          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => {
              setIsStartDate(false);
              showDatePicker();
            }}
          >
            <AntDesign name="calendar" size={24} color="#4361ee" />
            <Text style={styles.dateText}>
              {formdata?.endDate?.toLocaleDateString() || "End Date"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Add Medicine Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddMedicine}
      >
        <Text style={styles.addButtonText}>{isLoading==true?"Inserting..":"Add Medicine"}</Text>
      </TouchableOpacity>

      {/* Date Picker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        minimumDate={isStartDate ? new Date() : formdata.startDate || new Date()} 
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />

      {/* Time Picker Modal */}
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4361ee',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4361ee',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#4361ee',
    fontSize: 16,
  },
  optionsContainer: {
    marginBottom: 15,
  },
  option: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginRight: 5,
    minWidth:70,
    borderWidth: 1,
    borderColor: '#4361ee',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  selectedOption: {
    backgroundColor: '#F2F9FF',
    borderColor: '#4361ee',
  },
  optionText: {
    color: '#4361ee',
    fontSize: 14,
    marginTop: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#4361ee',
    borderRadius: 10,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    color: '#4361ee',
  },
  dateContainer: {
    marginBottom: 15,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4361ee',
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  dateText: {
    color: '#4361ee',
    fontSize: 16,
    marginLeft: 10,
  },
  toText: {
    color: '#4361ee',
    fontSize: 16,
    marginHorizontal: 10,
  },
  timeButton: {
    flex: 1,
    justifyContent: 'center',
  },
  timeText: {
    color: '#4361ee',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#4361ee',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MedForm;

