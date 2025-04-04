import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useCart } from "../contexts/CartContexts";

import CartItem from "../components/CarItem";

export default function CartScreen({ navigation }) {
  const { cartItems, getCartTotal } = useCart();

  const handleFinalizeOrder = () => {
    console.log("Finalizando pedido com os itens:", cartItems);
    console.log("Total do pedido:", getCartTotal());
    Alert.alert(
      "Pedido Finalizado (Simulado)",
      `Total: R$ ${getCartTotal()}. Seu pedido foi recebido!`
    );
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
        style={styles.finalizeButton}
        onPress={handleFinalizeOrder}
      >
        <Text style={styles.finalizeButtonText}>Finalizar Pedido</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {}
      {cartItems.length === 0 ? (
        renderEmptyCart()
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={({ item }) => <CartItem item={item} />}
            keyExtractor={(item) => item.product.id}
            contentContainerStyle={styles.listContentContainer}
            style={styles.list}
          />
          {}
          {renderCartSummary()}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  list: {
    flex: 1,
  },
  listContentContainer: {
    padding: 15,
  },

  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyCartText: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  continueShoppingButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  continueShoppingButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  summaryContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
    marginBottom: 15,
    color: "#333",
  },
  finalizeButton: {
    backgroundColor: "#28a745",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  finalizeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
