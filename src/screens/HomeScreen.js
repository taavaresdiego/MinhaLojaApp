import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions,
} from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import MovieItem from "../components/MovieItem";
const API_BASE_URL = "http://192.168.1.8:4000";

const { width } = Dimensions.get("window");
const numColumns = 2;
const itemPadding = 10;
const itemWidth = (width - itemPadding * (numColumns + 1)) / numColumns;
item;

export default function HomeScreen({ navigation, onLogout }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      let token = null;
      try {
        token = await SecureStore.getItemAsync("userToken");
        if (!token) {
          console.log("[HomeScreen] Token não encontrado no SecureStore.");
          Alert.alert(
            "Erro",
            "Sessão inválida. Por favor, faça login novamente."
          );
          if (onLogout) onLogout();
          else console.error("onLogout não foi passado para HomeScreen");
          return;
        }
        console.log("[HomeScreen] Buscando 'produtos' (filmes) com token...");
        const response = await axios.get(`${API_BASE_URL}/api/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(
          "[HomeScreen] 'Produtos' (filmes) recebidos:",
          response.data.length
        );
        setProducts(response.data);
      } catch (err) {
        console.error(
          "[HomeScreen] Erro ao buscar 'produtos' (filmes):",
          err.response?.data || err.message
        );
        setError("Não foi possível carregar os filmes.");
        if (
          err.response &&
          (err.response.status === 401 || err.response.status === 403)
        ) {
          Alert.alert("Sessão Expirada", "Por favor, faça login novamente.");
          if (onLogout) onLogout();
          else console.error("onLogout não foi passado para HomeScreen");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [onLogout]);

  const renderHeader = () => (
    <Text style={styles.title}>Filmes Disponíveis</Text>
  );

  const renderFooter = () => (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate("Cart")}
      >
        <Text style={styles.footerButtonText}>Ver Carrinho</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.chatButton}
        onPress={() => navigation.navigate("LiveChat")}
      >
        <Text style={styles.footerButtonText}>Chat Live</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.aiChatButton}
        onPress={() => navigation.navigate("AIChat")}
      >
        <Text style={styles.footerButtonText}>Assistente IA</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.footerButton, styles.logoutButton]}
        onPress={onLogout}
      >
        <Text style={styles.footerButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#E50914" />
        <Text style={styles.loadingText}>Carregando filmes...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>Erro: {error}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <MovieItem product={item} itemWidth={itemWidth} />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        numColumns={numColumns}
        contentContainerStyle={styles.listContentContainer}
        style={styles.list}
        columnWrapperStyle={styles.row}
      />
      {}
      {renderFooter()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#141414",
  },
  list: {
    flex: 1,
  },
  listContentContainer: {
    paddingHorizontal: itemPadding / 2,
    paddingBottom: 20,
  },
  row: {},
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 15,
    textAlign: "center",
    color: "#E5E5E5",
  },
  footerContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#333333",
    backgroundColor: "#1F1F1F",
  },
  footerButton: {
    backgroundColor: "#333333",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  chatButton: {
    backgroundColor: "#333333",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  aiChatButton: {
    backgroundColor: "#333333",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: "#E50914",
    marginBottom: 0,
  },
  footerButtonText: {
    color: "#E5E5E5",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingText: {
    marginTop: 10,
    color: "#E5E5E5",
  },
  errorText: {
    color: "#E87C03",
    fontSize: 16,
    textAlign: "center",
  },
});
