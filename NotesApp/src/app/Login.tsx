
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

export default function Login() {
    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter your email and password');
            return;
        }

        try {
            await login(email.trim().toLowerCase(), password);

            router.replace('/Home');
        } catch (error) {
            Alert.alert('Login Failed', 'Invalid email or password');
        }
    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Welcome Back!</Text>

            <Text style={styles.subtitle}>
                Login to access your notes
            </Text>

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
                onPress={handleLogin}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <View style={styles.registerContainer}>
                <Text>Don't have an account? </Text>

                <Text
                    style={styles.link}
                    onPress={() => router.push('/Register')}
                >
                    Register
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
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 25
    },
    link: {
        color: '#526D9B',
        fontWeight: 'bold'
    }
});
