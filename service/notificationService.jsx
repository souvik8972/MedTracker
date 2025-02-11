import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Request permission for notifications
export const requestNotificationPermission = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  
  if (status !== 'granted') {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    if (newStatus !== 'granted') {
      console.warn('Notification permissions not granted!');
    }
  }
};

// Schedule a local notification
export const scheduleNotification = async (title, body, dateTime) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
    },
    trigger: {
      date: new Date(dateTime), // Schedule based on database time
    },
  });
};
