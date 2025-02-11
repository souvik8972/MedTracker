import { requestNotificationPermission, scheduleNotification } from "./notificationService";
import { collection, query, where, getDocs } from "firebase/firestore";
import { router } from "expo-router";
import { db } from "../config/FireBaseConfig";
import { GetLocalStorage } from "./LocalStorage";

export const initializeReminders = async () => {
  try {
    await requestNotificationPermission();
    await fetchMedicationData();
  } catch (error) {
    console.error("Error initializing reminders:", error);
  }
};

const fetchMedicationData = async () => {
  try {
    const user = await GetLocalStorage("userDetails");
    if (!user?.email) {
      router.push("login/SignUp");
      return;
    }

    const today = new Date().toLocaleDateString("en-GB"); // Format: DD/MM/YYYY

    const q = query(
      collection(db, "MED"),
      where("userEmail", "==", user.email),
      where("dateRange", "array-contains", today)
    );

    const querySnapshot = await getDocs(q);

    const fetchedData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Schedule notifications
    fetchedData.forEach((med) => {
      const notificationTime = parseTimeToDate(today, med.time);
console.log('hello')
      scheduleNotification(
        `💊 Medication Reminder: ${med.medicine}`, // ✅ Fixed: Changed med.name to med.medicine
        `Time to take ${med.quantity} of ${med.medicine} (${med.when})`, // ✅ Fixed: Used med.quantity and med.when
        notificationTime
      );
    });
  } catch (error) {
    console.error("Error fetching medication data:", error);
  }
};

// ✅ Helper Function to Parse Time
const parseTimeToDate = (date, time) => {
  const timeParts = time.match(/(\d+):(\d+)\s?(AM|PM)/i);
  if (!timeParts) return new Date(); // Fallback to current time if invalid

  let hours = parseInt(timeParts[1], 10);
  const minutes = parseInt(timeParts[2], 10);
  const period = timeParts[3]?.toUpperCase();

  if (period === "PM" && hours < 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  const [day, month, year] = date.split("/").map(Number);
  return new Date(year, month - 1, day, hours, minutes);
};
