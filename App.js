import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import CartScreen from "./src/screens/CartScreen";

import { CartProvider } from "./src/contexts/CartContext";

import ChatScreen from "./src/screens/ChatScreen";

const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

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
            {}
            <MainStack.Screen
              name="Chat"
              component={ChatScreen}
              options={{ title: "Chat / Ajuda" }}
            />
          </MainStack.Navigator>
        ) : (
          <AuthStack.Navigator initialRouteName="Login">
            <MainStack.Screen
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
