
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../Types/User';

const USERS_KEY = 'users';
const SESSION_KEY = 'loggedInUser';

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
        (item) => item.email.toLowerCase() === user.email.toLowerCase()
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
        (item) =>
            item.email.toLowerCase() === email.toLowerCase() &&
            item.password === password
    );

    return user || null;
};

// Update an existing user's profile
export const updateUser = async (updatedUser: User): Promise<User> => {
    const users = await getUsers();

    // Check whether another user is already using this email
    const existingUser = users.find(
        (item) =>
            item.email.toLowerCase() === updatedUser.email.toLowerCase() &&
            item.id !== updatedUser.id
    );

    if (existingUser) {
        throw new Error('This email is already registered');
    }

    // Replace the old user details with the updated details
    const updatedUsers = users.map((item) =>
        item.id === updatedUser.id ? updatedUser : item
    );

    await saveUsers(updatedUsers);

    return updatedUser;
};

// Save the logged-in user
export const saveSession = async (user: User) => {
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
};

// Get the logged-in user
export const getSession = async (): Promise<User | null> => {
    const user = await AsyncStorage.getItem(SESSION_KEY);

    return user ? JSON.parse(user) : null;
};

// Remove the logged-in user
export const removeSession = async () => {
    await AsyncStorage.removeItem(SESSION_KEY);
};
