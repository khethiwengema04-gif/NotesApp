
import { useEffect } from 'react';
import {
  Stack,
  useRouter,
  useSegments
} from 'expo-router';

import { View, ActivityIndicator, StyleSheet } from 'react-native';

import { AuthProvider, useAuth } from '../Context/AuthContext';

function ProtectedRoutes() {

  const { user, loading } = useAuth();

  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {

    if (loading) {
      return;
    }

    const currentRoute = segments[0];

    const isPublicRoute =
      currentRoute === 'Login' ||
      currentRoute === 'Register';

    // Redirect logged-out users to Login
    if (!user && !isPublicRoute) {
      router.replace('/Login');
    }

    // Redirect logged-in users away from Login and Register
    if (user && isPublicRoute) {
      router.replace('/Home');
    }

  }, [user, loading, segments]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#526D9B" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}

export default function RootLayout() {

  return (
    <AuthProvider>
      <ProtectedRoutes />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
