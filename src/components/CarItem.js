// Arquivo: src/components/CartItem.js

import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useCart } from "../contexts/CartContexts"; // Importa o hook do carrinho

// O componente recebe o 'item' do carrinho como prop
// Lembrar que a estrutura do item é: { product: { id, nome, preco, ... }, quantity: X }
export default function CartItem({ item }) {
  // Pega as funções que precisamos do contexto do carrinho
  const { incrementQuantity, decrementQuantity, removeFromCart } = useCart();

  // Simplifica o acesso ao produto dentro do item
  const product = item.product;

  return (
    <View style={styles.container}>
      {/* Imagem do Produto */}
      <Image source={{ uri: product.imagemUrl }} style={styles.image} />

      {/* Informações do Produto (Nome, Preço) */}
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={2}>
          {product.nome}
        </Text>
        <Text style={styles.price}>
          R$ {product.preco.toFixed(2).replace(".", ",")}
        </Text>
      </View>

      {/* Controles de Quantidade */}
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => decrementQuantity(product.id)} // Chama a função do contexto
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.quantityText}>{item.quantity}</Text>

        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => incrementQuantity(product.id)} // Chama a função do contexto
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Botão Remover Item (Exemplo com 'X') */}
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromCart(product.id)} // Chama a função do contexto
      >
        <Text style={styles.removeButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos para o item do carrinho
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5, // Menor padding horizontal que o ProductItem
    backgroundColor: "#fff",
    marginBottom: 10, // Espaço entre itens do carrinho
    borderRadius: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  image: {
    width: 50, // Imagem menor no carrinho
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1, // Ocupa espaço para empurrar controles para direita
    justifyContent: "center",
  },
  name: {
    fontSize: 14, // Nome um pouco menor
    fontWeight: "bold",
    marginBottom: 4,
  },
  price: {
    fontSize: 13, // Preço um pouco menor
    color: "#888", // Cinza
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10, // Espaço antes e depois dos controles
  },
  quantityButton: {
    backgroundColor: "#eee", // Fundo cinza claro
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  quantityText: {
    fontSize: 14,
    fontWeight: "bold",
    minWidth: 20, // Garante espaço para números
    textAlign: "center",
  },
  removeButton: {
    backgroundColor: "#dc3545", // Vermelho
    borderRadius: 15, // Botão redondo pequeno
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5, // Espaço após controles de quantidade
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});
