
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../Types/User';

const USERS_KEY = 'users';

// Get all registered users
export const getUsers = async (): Promise<User[]> => {
    const users = await AsyncStorage.getItem(USERS_KEY);

    return users ? JSON.parse(users) : [];
};

// Save registered users
export const saveUsers = async (users: User[]) => {
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Register a new user
