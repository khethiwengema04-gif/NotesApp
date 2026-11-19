
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../Context/AuthContext';
import { User } from '../Types/User';

export default function Register() {

    const router = useRouter();
    const { register } = useAuth();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {

        if (!username || !email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        const newUser: User = {
            id: Date.now().toString(),
            username: username.trim(),
            email: email.trim().toLowerCase(),
            password: password
        };

        try {
            await register(newUser);

            Alert.alert('Success', 'Account created successfully');

            router.replace('/Home');

        } catch (error) {
            Alert.alert('Registration Failed', 'Email already registered');
        }
    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Create Account</Text>

            <Text style={styles.subtitle}>
                Register to start saving your notes
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />

            <TextInput
                style={styles.input}
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleRegister}
            >
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
                <Text>Already have an account? </Text>

                <Text
                    style={styles.link}
                    onPress={() => router.push('/login')}
                >
                    Login
                </Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 25,
        backgroundColor: '#F8F9FC'
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#243B55'
    },

    subtitle: {
        fontSize: 15,
        textAlign: 'center',
        color: '#777',
        marginBottom: 30
    },

    input: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#DDD',
        fontSize: 15
    },

    button: {
        backgroundColor: '#526D9B',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold'
    },

    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 25
    },

    link: {
        color: '#526D9B',
        fontWeight: 'bold'
    }

});
