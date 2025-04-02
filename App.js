import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Importe suas telas
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import CartScreen from "./src/screens/CartScreen";

// Importe o CartProvider <<< NOVO IMPORT
import { CartProvider } from "./src/contexts/CartContexts";

// Crie os navegadores de pilha
const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    // NavigationContainer continua sendo o mais externo para navegação
    <NavigationContainer>
      {/* CartProvider envolve TUDO que precisa acessar o carrinho */}
      <CartProvider>
        {isLoggedIn ? (
          // Se logado, mostra a pilha principal
          <MainStack.Navigator>
            <MainStack.Screen
              name="Home"
              // Passamos a função de logout via props
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
            {/* Adicione outras telas principais aqui (Perfil, etc.) */}
          </MainStack.Navigator>
        ) : (
          // Se não logado, mostra a pilha de autenticação
          <AuthStack.Navigator initialRouteName="Login">
            <AuthStack.Screen
              name="Login"
              // Passamos a função de login via props
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
      </CartProvider>{" "}
      {/* Fecha o CartProvider */}
    </NavigationContainer>
  );
}
