import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import ProductItem from "../components/ProductItem";
const API_BASE_URL = "http://192.168.1.5:4000";

export default function HomeScreen({ navigation, onLogout }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setError(null);
        setIsLoading(true);

        const token = await SecureStore.getItemAsync("userToken");
        if (!token) {
          Alert.alert(
            "Erro",
            "Sessão inválida. Por favor, faça login novamente."
          );
          onLogout();
          return;
        }

        console.log("Buscando produtos em:", `${API_BASE_URL}/api/products`);
        const response = await axios.get(`${API_BASE_URL}/api/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Produtos recebidos:", response.data);
        setProducts(response.data);
      } catch (err) {
        console.error(
          "Erro ao buscar produtos:",
          err.response?.data || err.message
        );
        setError("Não foi possível carregar os produtos.");

        if (
          err.response &&
          (err.response.status === 401 || err.response.status === 403)
        ) {
          Alert.alert("Sessão Expirada", "Por favor, faça login novamente.");
          onLogout();
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [onLogout]);

  const renderHeader = () => (
    <Text style={styles.title}>Produtos Disponíveis</Text>
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
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Carregando produtos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>Erro: {error}</Text>
        {}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductItem product={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContentContainer}
        style={styles.list}
      />
      {renderFooter()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    flex: 1,
  },
  listContentContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  footerContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  footerButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    marginBottom: 0,
  },
  footerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});
