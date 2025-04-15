import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useCart } from "../contexts/CartContext";
import CartItem from "../components/CartItem";

const API_BASE_URL = "http://192.168.1.8:4000";

export default function CartScreen({ navigation }) {
  const { cartItems, getCartTotal, clearCart } = useCart();

  const [isLoading, setIsLoading] = useState(false);

  const handleFinalizeOrder = async () => {
    if (cartItems.length === 0) {
      Alert.alert(
        "Carrinho Vazio",
        "Adicione itens ao carrinho antes de finalizar."
      );
      return;
    }

    setIsLoading(true);
    try {
      const token = await SecureStore.getItemAsync("userToken");
      if (!token) {
        Alert.alert("Erro", "Você não está logado. Faça login novamente.");
        setIsLoading(false);

        return;
      }

      const payload = { items: cartItems };
      console.log(
        "Enviando pedido para /api/orders:",
        JSON.stringify(payload, null, 2)
      );

      const response = await axios.post(`${API_BASE_URL}/api/orders`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Pedido criado com sucesso:", response.data);
      Alert.alert(
        "Pedido Realizado!",
        `Seu pedido #${
          response.data.orderId
        } foi criado com sucesso. Total: R$ ${getCartTotal()}`,
        [
          {
            text: "OK",
            onPress: () => {
              clearCart();
              navigation.navigate("Home");
            },
          },
        ]
      );
    } catch (error) {
      console.error(
        "Erro ao finalizar pedido:",
        error.response?.data || error.message
      );
      if (error.response) {
        const errorMessage =
          error.response.data?.message || "Erro desconhecido.";
        if (error.response.status === 401 || error.response.status === 403) {
          Alert.alert(
            "Erro de Autenticação",
            "Sua sessão expirou. Faça login novamente."
          );
        } else {
          Alert.alert(
            "Erro ao Finalizar",
            `Não foi possível criar seu pedido: ${errorMessage}`
          );
        }
      } else {
        Alert.alert(
          "Erro de Conexão",
          "Não foi possível conectar ao servidor."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderEmptyCart = () => (
    <View style={styles.emptyCartContainer}>
      <Text style={styles.emptyCartText}>Seu carrinho está vazio.</Text>
      <TouchableOpacity
        style={styles.continueShoppingButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.continueShoppingButtonText}>
          Continuar Comprando
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderCartSummary = () => (
    <View style={styles.summaryContainer}>
      <Text style={styles.totalText}>Total: R$ {getCartTotal()}</Text>
      <TouchableOpacity
        style={[
          styles.finalizeButton,
          isLoading ? styles.buttonDisabled : null,
        ]}
        onPress={handleFinalizeOrder}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.finalizeButtonText}>Finalizar Pedido</Text>
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        renderEmptyCart()
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={({ item }) => <CartItem item={item} />}
            keyExtractor={(item) => item.product.id.toString()}
            contentContainerStyle={styles.listContentContainer}
            style={styles.list}
          />
          {renderCartSummary()}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
  },
  list: {
    flex: 1,
  },
  listContentContainer: {
    padding: 15,
    paddingBottom: 10,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyCartText: {
    fontSize: 18,
    color: "#808080",
    marginBottom: 20,
    textAlign: "center",
  },
  continueShoppingButton: {
    backgroundColor: "#E50914",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  continueShoppingButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  summaryContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#333333",
    backgroundColor: "#1F1F1F",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
    marginBottom: 15,
    color: "#E5E5E5",
  },
  finalizeButton: {
    backgroundColor: "#E50914",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    minHeight: 50,
  },
  finalizeButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonDisabled: {
    backgroundColor: "#555555",
  },
});
