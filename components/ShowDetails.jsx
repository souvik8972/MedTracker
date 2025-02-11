import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import { db } from "../config/FireBaseConfig";
import { GetLocalStorage } from "../service/LocalStorage";
import EmptyState from "./EmptyState";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";

// import { options } from '../constant/Options';

const ShowDetails = ({ days }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const [medData, setMedData] = useState([]);
  // const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading to true initially

  const handleClickItem = (item,dateStatus) => {
    console.log(dateStatus,"dateStaus")
    const selectedDate = days[selectedIndex]?.fulldate;
    
    router.push({
      pathname: "user-status/UserStatus", // Corrected the URL
      params: {
        ...item,
        ...dateStatus,
        selectedDate,
      },
    });
    console.log(days[selectedIndex]?.fulldate);
  };

  // Fetch all the data when the page loads
  useEffect(() => {
    if (!days || days.length === 0 || selectedIndex >= days.length) {
      console.warn("Days array is not ready or selectedIndex is out of range.");
      return;
    }

    const fetchData = async () => {
      try {
        const user = await GetLocalStorage("userDetails");
        if (!user?.email) {
          // console.error("User email not found");
          router.push("login/SignUp");
          return;
        }

        const selectedDate = days[selectedIndex]?.fulldate;
        if (!selectedDate) {
          console.error("Selected date is undefined");
          return;
        }

        console.log("Fetching data for date:", selectedDate);

        const q = query(
          collection(db, "MED"),
          where("userEmail", "==", user.email),
          where("dateRange", "array-contains", selectedDate)
        );
        const querySnapshot = await getDocs(q);

        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(fetchedData)

        setMedData(fetchedData);

        // setFilteredData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedIndex, days]); // Depend on `selectedIndex` and `days`

  // Handle day selection and filter data based on date
  const handlePress = (index, date) => {
    if (selectedIndex === index) return;

    setSelectedIndex(index);
  };

  return (
    <View style={styles.container}>
      {/* Horizontal List for Days */}
      <View style={styles.optionsContainer}>
        <FlatList
          data={days}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.option,
                selectedIndex === index && styles.selectedOption,
              ]}
              onPress={() => handlePress(index, item.fulldate)}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedIndex === index && styles.selectedText,
                ]}
              >
                {String(item.date)}
              </Text>
              <Text
                style={[
                  styles.optionText,
                  selectedIndex === index && styles.selectedText,
                ]}
              >
                {String(item.day)}
              </Text>
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Display Fetched Data or Loading Indicator */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" /> // Loading spinner
      ) : medData.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={medData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            // Find the corresponding icon based on item.type.id
            const dateToCheck = days[selectedIndex]?.fulldate; // The date you want to check

            // Find the status for the given date
            const dateStatus = item?.statusHistory?.find(
              (item) => item.date === dateToCheck
            );
           

            return (
              <TouchableOpacity
                onPress={() => {
                  handleClickItem(item,dateStatus);
                }}
                style={styles.item}
              >
             

                <View style={styles.imageConatiner}>
                  <Image
                    source={{ uri: item?.type?.icon }}
                    style={{ width: 50, height: 50 }}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.Txtcontainer}>
                  <View style={styles.TextConatiner}>
                    <Text style={[styles.itemText, styles.header]}>
                      {item.medicine}
                    </Text>
                    <Text style={styles.itemText}> Qua:{item.quantity}</Text>

                    {/* <Text style={styles.itemText}> {item.type.name}</Text> */}

                    <Text style={styles.itemText}>{item.when}</Text>
                  </View>

                  {dateStatus?.status === "Taken" ? (
  <View style={styles.timeContainer}>
    <Feather name="check-circle" size={24} color="green" />
    <Text style={styles.timeText}>Taken</Text>
  </View>
) : dateStatus?.status === "Missed" ? (
  <View style={styles.timeContainer}>
    <Feather name="x-circle" size={24} color="red" />
    <Text style={styles.timeText}>Missed</Text>
  </View>
) : (
  <View style={styles.timeContainer}>
    <AntDesign name="clockcircleo" size={24} color="black" />
    <Text style={styles.timeText}>{item.time}</Text>
  </View>
)}

                  
                </View>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <EmptyState />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  Txtcontainer: {
    // backgroundColor:'red',
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionsContainer: {
    paddingBottom: 10,
  },
  item: {
    padding: 20,
    borderWidth: 1,
    // backgroundColor:'red'
    // borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  iconContainer: {
    marginBottom: 10,
  },
  imageConatiner: {
    height: "100%",
    //  borderWidth:0.4,
    //  borderRadius:10,
    borderColor: "black",
    width: "70",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "20%",
    marginRight: 20,
  },
  option: {
    margin: 10,
    marginTop: 0,
    padding: 10,
    alignItems: "center",
    width: 50,
    minWidth: 60,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  selectedOption: {
    backgroundColor: "#007bff",
  },
  selectedText: {
    color: "white",
  },
  item: {
    backgroundColor: "white", // Light gray background
    padding: 15,
    height: 85,
    marginBottom: 5,
    flexDirection: "row",
    // justifyContent:'space-between',
    alignItems: "center",
    marginTop: 10,
    // marginBottom: 2,
    borderColor: "black",
    borderRadius: 8,
    width: "100%",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 1,
    // For Android shadow
  },
  itemText: {
    fontSize: 13,
    color: "#333",
    // marginBottom: 5,
    textAlign: "left",
  },
  timeText: {
    fontSize: 12, // Larger font size for time
    fontWeight: "bold",
    // Darker color for the time
    marginBottom: 10,
    textAlign: "center",
  },
  header: {
    fontSize: 23,
    color: "#007bff",
  },
  cross: {
    position: "absolute",
    top: 10,
    // backgroundColor:'red'

    width: 20,
    height: 20,
    fontSize: 5,
  },
  TextConatiner: {
    lineHeight: 1,
    // height:"80%",
    gap: 0,
    justifyContent: "space-around",
    // backgroundColor:'red',
    alignItems: "flex-start",
  },
  timeContainer: {
    // backgroundColor:'red',
    // flexDirection:'row',
    alignItems: "center",

    borderWidth: 0.4,
    //  borderRadius:10,
    borderColor: "black",
    borderRadius: 20,
    padding: 10,
    gap: 5,
    width: 75,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ShowDetails;
