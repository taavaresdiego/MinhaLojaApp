// Arquivo: src/components/ProductItem.js

import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useCart } from "../contexts/CartContexts"; // Importa o hook do carrinho

// Componente recebe o objeto 'product' como prop
export default function ProductItem({ product }) {
  // Pega a função addToCart do nosso contexto
  const { addToCart } = useCart();

  // Função chamada ao clicar no botão "Adicionar"
  const handleAddToCart = () => {
    addToCart(product); // Chama a função do contexto passando o produto atual
    // Poderia adicionar um feedback visual aqui (ex: Alert ou animação)
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.imagemUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{product.nome}</Text>
        {/* Formata o preço para Reais (R$) */}
        <Text style={styles.price}>
          R$ {product.preco.toFixed(2).replace(".", ",")}
        </Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
        <Text style={styles.addButtonText}>+</Text>
        {/* Ou poderia ser um ícone de carrinho */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Alinha itens lado a lado
    alignItems: "center", // Centraliza verticalmente
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2, // Sombra no Android
    shadowColor: "#000", // Sombra no iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1, // Ocupa o espaço restante
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: "#007bff", // Azul
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: "#28a745", // Verde
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20, // Botão redondo
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
