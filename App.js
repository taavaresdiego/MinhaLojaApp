import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";

import { CartProvider } from "./src/contexts/CartContext";

// Telas
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import CartScreen from "./src/screens/CartScreen";
import LiveChatScreen from "./src/screens/LiveChatScreen";
import AIChatScreen from "./src/screens/AIChatScreen";

const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogin = () => {
    console.log("[App.js] handleLogin chamado, definindo isLoggedIn = true");
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    console.log("[App.js] handleLogout chamado, definindo isLoggedIn = false");
    setIsLoading(true);
    try {
      await SecureStore.deleteItemAsync("userToken");
      console.log("[App.js] Token removido no logout.");
    } catch (e) {
      console.error("[App.js] Erro ao remover token no logout:", e);
    } finally {
      setIsLoggedIn(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      let token = null;
      setIsLoading(true); // Garante loading ao verificar
      try {
        token = await SecureStore.getItemAsync("userToken");
        if (token) {
          console.log("[App.js] Token encontrado na inicialização.");
          setIsLoggedIn(true);
        } else {
          console.log("[App.js] Nenhum token encontrado na inicialização.");
          setIsLoggedIn(false);
        }
      } catch (e) {
        console.error("[App.js] Erro ao buscar token inicial:", e);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkToken();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <CartProvider>
        {isLoggedIn ? (
          <MainStack.Navigator>
            <MainStack.Screen
              name="Home"
              children={(props) => (
                <HomeScreen {...props} onLogout={handleLogout} />
              )}
              options={{ title: "Produtos" }}
            />
            <MainStack.Screen
              name="Cart"
              component={CartScreen}
              options={{ title: "Meu Carrinho" }}
            />
            <MainStack.Screen
              name="LiveChat"
              component={LiveChatScreen}
              options={{ title: "Chat Live" }}
            />
            <MainStack.Screen
              name="AIChat"
              component={AIChatScreen}
              options={{ title: "Assistente IA" }}
            />
          </MainStack.Navigator>
        ) : (
          <AuthStack.Navigator initialRouteName="Login">
            <AuthStack.Screen
              name="Login"
              children={(props) => (
                <LoginScreen {...props} onLogin={handleLogin} />
              )}
              options={{ headerShown: false }}
            />
            <AuthStack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ title: "Criar Conta" }}
            />
          </AuthStack.Navigator>
        )}
      </CartProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});
