import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useCart } from "../contexts/CartContext";

const ImagePlaceholder = ({ style }) => (
  <View style={[style, styles.placeholderContainer]}>
    <ActivityIndicator color="#808080" />
  </View>
);

export default function MovieItem({ product, itemWidth }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const precoAluguel =
    product.preco && !isNaN(product.preco)
      ? product.preco.toFixed(2).replace(".", ",")
      : "N/D";

  return (
    <TouchableOpacity
      style={[styles.container, { width: itemWidth }]}
      onPress={handleAddToCart}
    >
      <Image
        source={{ uri: product.imagemUrl }}
        style={styles.image}
        resizeMode="cover"
        PlaceholderContent={<ImagePlaceholder style={styles.image} />}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {product.nome || "Filme sem nome"}
        </Text>
        <Text style={styles.price}>Alugar R$ {precoAluguel}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    marginHorizontal: 5,
    backgroundColor: "#1F1F1F",
    borderRadius: 5,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  image: {
    width: "100%",
    aspectRatio: 2 / 3,
    backgroundColor: "#2C2C2C",
  },
  placeholderContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    padding: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#E5E5E5",
    marginBottom: 4,
  },
  price: {
    fontSize: 13,
    color: "#808080",
  },
});
