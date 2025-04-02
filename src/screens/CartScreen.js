// Arquivo: src/screens/CartScreen.js

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

import CartItem from "../components/CarItem"; // Importa o componente do item

export default function CartScreen({ navigation }) {
  // Pega os itens, e a função para calcular total do contexto
  const { cartItems, getCartTotal } = useCart();

  // Função para lidar com a finalização (simulada)
  const handleFinalizeOrder = () => {
    // Em um app real (Fase 2), aqui você enviaria os dados para o backend
    console.log("Finalizando pedido com os itens:", cartItems);
    console.log("Total do pedido:", getCartTotal());
    Alert.alert(
      "Pedido Finalizado (Simulado)",
      `Total: R$ ${getCartTotal()}. Seu pedido foi recebido!`
      // Poderia adicionar um botão para limpar o carrinho ou navegar para outra tela
      // onPress: () => { clearCart(); navigation.navigate('Home'); }
    );
    // Para o requisito da Fase 2, o backend geraria um objeto 'Compra' aqui [source: 21]
  };

  // Componente para exibir quando o carrinho está vazio
  const renderEmptyCart = () => (
    <View style={styles.emptyCartContainer}>
      <Text style={styles.emptyCartText}>Seu carrinho está vazio.</Text>
      <TouchableOpacity
        style={styles.continueShoppingButton}
        onPress={() => navigation.goBack()} // Volta para a tela anterior (Home)
      >
        <Text style={styles.continueShoppingButtonText}>
          Continuar Comprando
        </Text>
      </TouchableOpacity>
    </View>
  );

  // Componente para exibir o sumário e o botão de finalizar
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
      {/* Verifica se o carrinho está vazio */}
      {cartItems.length === 0 ? (
        renderEmptyCart() // Mostra a mensagem de carrinho vazio
      ) : (
        // Se não estiver vazio, mostra a lista e o sumário
        <>
          <FlatList
            data={cartItems} // Dados vêm do contexto
            renderItem={({ item }) => <CartItem item={item} />} // Usa o componente CartItem
            keyExtractor={(item) => item.product.id} // Chave única
            contentContainerStyle={styles.listContentContainer}
            style={styles.list}
            // O sumário pode ir no ListFooterComponent ou fora/abaixo da FlatList
            // ListFooterComponent={renderCartSummary}
          />
          {/* Colocando fora/abaixo garante que ele sempre apareça */}
          {renderCartSummary()}
        </>
      )}
    </View>
  );
}

// Estilos para a tela do carrinho
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  list: {
    flex: 1, // Ocupa o espaço disponível se houver itens
  },
  listContentContainer: {
    padding: 15,
  },
  // Estilos para carrinho vazio
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
  // Estilos para o sumário e botão finalizar
  summaryContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff", // Fundo branco para destacar
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right", // Alinha o total à direita
    marginBottom: 15,
    color: "#333",
  },
  finalizeButton: {
    backgroundColor: "#28a745", // Verde
    paddingVertical: 15, // Botão maior
    borderRadius: 8,
    alignItems: "center",
  },
  finalizeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
