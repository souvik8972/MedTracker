import asyncLocalStorage from "@react-native-async-storage/async-storage";

export const SetLocalStorage = async (key, val) => {
    await asyncLocalStorage.setItem(key, JSON.stringify(val));
};

export const GetLocalStorage = async (key) => {
    const result = await asyncLocalStorage.getItem(key);
    return result ? JSON.parse(result) : null;  // Added null check to handle empty results
};

export const ClearLocalStorage = async (key) => {
    await asyncLocalStorage.removeItem(key); // Use removeItem instead of clear
};
