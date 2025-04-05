import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import das telas existentes
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import CartScreen from "./src/screens/CartScreen";

// Import do Contexto
import { CartProvider } from "./src/contexts/CartContext";

// <<< Import da nova tela de Chat >>>
import ChatScreen from "./src/screens/ChatScreen";

// Cria os navegadores de pilha
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
          // Pilha principal (após login)
          <MainStack.Navigator>
            <MainStack.Screen
              name="Home"
              // Passa onLogout como prop para HomeScreen
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
            {/* <<< Nova tela de Chat adicionada à pilha principal >>> */}
            <MainStack.Screen
              name="Chat" // Nome da rota para navegação
              component={ChatScreen}
              options={{ title: "Chat / Ajuda" }} // Título no cabeçalho
            />
          </MainStack.Navigator>
        ) : (
          // Pilha de autenticação (antes do login)
          <AuthStack.Navigator initialRouteName="Login">
            <MainStack.Screen
              name="Login"
              // Passa onLogin como prop para LoginScreen
              children={(props) => (
                <LoginScreen {...props} onLogin={handleLogin} />
              )}
              options={{ headerShown: false }} // Esconde cabeçalho no Login
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
