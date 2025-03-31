import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TermsScreen from "./screens/TermsScreen";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import DoctorProfileScreen from "./screens/DoctorProfileScreen";
import DetectScreen from "./screens/DetectScreen"; // ✅ Import the screen

const Stack = createStackNavigator();

export default function App() {
  const [accepted, setAccepted] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!accepted ? (
          <Stack.Screen name="Terms">
            {(props) => <TermsScreen {...props} setAccepted={setAccepted} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="DoctorProfile" component={DoctorProfileScreen} />
            <Stack.Screen name="DetectScreen" component={DetectScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
