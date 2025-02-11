import { Stack } from "expo-router";
import { useEffect } from "react";
import { initializeReminders} from "../service/medicationReminder"

export default function RootLayout() {


  
    useEffect(() => {
      initializeReminders(); 
    }, []);
  return (
    <Stack screenOptions={{ headerShown: false }}>
      
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="login"/>
     


    </Stack>
  );
}
