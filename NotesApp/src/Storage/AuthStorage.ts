
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
export const registerUser = async (user: User) => {
    const users = await getUsers();

    const existingUser = users.find(
        (item) => item.email === user.email
    );

    if (existingUser) {
        throw new Error('Email already registered');
    }

    users.push(user);

    await saveUsers(users);
};

// Login an existing user
export const loginUser = async (email: string, password: string) => {
    const users = await getUsers();

    const user = users.find(
        (item) => item.email === email && item.password === password
    );

    return user || null;
};
