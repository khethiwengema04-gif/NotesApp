
import { Redirect } from 'expo-router';
import { useAuth } from '../Context/AuthContext';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#526D9B" />
      </View>
    );
  }

  if (user) {
    return <Redirect href="/Home" />;
  }

  return <Redirect href="/Login" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
