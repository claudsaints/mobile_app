import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, useAuth } from "./src/Contexts/AuthContext";
import { AppDrawerNavigator } from "./src/Routes/AppDrawer.Routes";
import { AuthStackScreen } from "./src/Routes/AuthStack.Routes";
import * as SecureStore from 'expo-secure-store';

const AppContent = () => {
  const { token, restoreToken } = useAuth(); // Use restoreToken here

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await SecureStore.getItemAsync('userToken');
      const storedUserType = await SecureStore.getItemAsync('userType');
      if (storedToken && storedUserType) {
        restoreToken(storedToken, storedUserType); // Use restoreToken here
      }
    };
    loadToken();
  }, []);

  return (
    <NavigationContainer>
      {token ? <AppDrawerNavigator /> : <AuthStackScreen />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
