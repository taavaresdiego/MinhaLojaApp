import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

// Importa os dados falsos e o componente de item
import mockProducts from "../data/mockProducts"; // Ajuste o caminho se necessário
import ProductItem from "../components/ProductItem"; // Ajuste o caminho se necessário

// Recebe 'navigation' e 'onLogout' como antes
export default function HomeScreen({ navigation, onLogout }) {
  // Função para renderizar o cabeçalho da lista (opcional)
  const renderHeader = () => (
    <Text style={styles.title}>Produtos Disponíveis</Text>
  );

  // Função para renderizar o rodapé com os botões
  const renderFooter = () => (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate("Cart")}
      >
        <Text style={styles.footerButtonText}>Ver Carrinho</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.footerButton, styles.logoutButton]}
        onPress={onLogout}
      >
        <Text style={styles.footerButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockProducts} // Nossos dados falsos
        renderItem={({ item }) => <ProductItem product={item} />} // Como renderizar cada item
        keyExtractor={(item) => item.id} // Chave única para cada item
        ListHeaderComponent={renderHeader} // Adiciona um título acima da lista
        // ListFooterComponent={renderFooter} // Adiciona os botões abaixo da lista
        contentContainerStyle={styles.listContentContainer} // Estilo para o conteúdo da lista
        style={styles.list} // Estilo para o container da FlatList
      />
      {/* Alternativamente, colocar os botões fora da FlatList */}
      {renderFooter()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda a tela
    backgroundColor: "#f5f5f5",
  },
  list: {
    flex: 1, // Permite que a lista ocupe o espaço disponível
  },
  listContentContainer: {
    paddingHorizontal: 15, // Espaçamento nas laterais da lista
    paddingBottom: 20, // Espaçamento abaixo do último item
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  // Estilos para os botões no rodapé (se fora da FlatList)
  footerContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff", // Fundo branco para destacar os botões
  },
  footerButton: {
    backgroundColor: "#007bff", // Azul
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10, // Espaço entre botões
  },
  logoutButton: {
    backgroundColor: "#dc3545", // Vermelho para sair
    marginBottom: 0, // Último botão não precisa de margem inferior
  },
  footerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
