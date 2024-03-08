import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import WelcomePage from './src/pantallas/Welcome/Welcome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/pantallas/User/LoginScreen';
import RegisterScreen from './src/pantallas/User/RegisterScreen';
import React from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      options={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomePage} options={{ headerShown: false }}  />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
