
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView
} from 'react-native';

import { useRouter } from 'expo-router';
import { useAuth } from '../Context/AuthContext';

const Profile = () => {

    const router = useRouter();
    const { user, updateProfile } = useAuth();

    const [username, setUsername] = useState(user?.username || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleUpdate = async () => {

        if (!user) {
            Alert.alert('Error', 'No user is currently logged in.');
            return;
        }

        if (!username.trim() || !email.trim()) {
            Alert.alert('Error', 'Username and email are required.');
            return;
        }

        if (password && password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }

        try {
            const updatedUser = {
                ...user,
                username: username.trim(),
                email: email.trim().toLowerCase(),
                password: password ? password : user.password
            };

            await updateProfile(updatedUser);

            Alert.alert('Success', 'Your profile has been updated.');

            router.replace('/Home');

        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Error', error.message);
            } else {
                Alert.alert('Error', 'Could not update your profile.');
            }
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <Text style={styles.heading}>My Profile</Text>
            <Text style={styles.description}>
                View and update your account details.
            </Text>

            <View style={styles.form}>

                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Enter your username"
                />

                <Text style={styles.label}>Email Address</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={styles.label}>New Password</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter a new password"
                    secureTextEntry
                />

                <Text style={styles.label}>Confirm New Password</Text>
                <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Confirm your new password"
                    secureTextEntry
                />

                <Text style={styles.note}>
                    Leave the password fields empty if you do not want to
                    change your password.
                </Text>

                <TouchableOpacity
                    style={styles.updateButton}
                    onPress={handleUpdate}
                >
                    <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.replace('/Home')}
                >
                    <Text style={styles.backButtonText}>Back to Home</Text>
                </TouchableOpacity>

            </View>

        </ScrollView>
    );
};

export default Profile;

const styles = StyleSheet.create({

    container: {
        flexGrow: 1,
        backgroundColor: '#F8F9FC',
        padding: 20,
        justifyContent: 'center'
    },

    heading: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#243B55',
        marginBottom: 8
    },

    description: {
        fontSize: 15,
        color: '#666',
        marginBottom: 25
    },

    form: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 12,
        elevation: 3
    },

    label: {
        fontSize: 15,
        fontWeight: '600',
        color: '#243B55',
        marginBottom: 8,
        marginTop: 12
    },

    input: {
        borderWidth: 1,
        borderColor: '#D5DCE5',
        borderRadius: 8,
        padding: 12,
        fontSize: 15,
        backgroundColor: '#FFFFFF'
    },

    note: {
        fontSize: 12,
        color: '#777',
        marginTop: 10,
        marginBottom: 20
    },

    updateButton: {
        backgroundColor: '#526D9B',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center'
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold'
    },

    backButton: {
        padding: 14,
        alignItems: 'center',
        marginTop: 8
    },

    backButtonText: {
        color: '#526D9B',
        fontSize: 15,
        fontWeight: '600'
    }

});
