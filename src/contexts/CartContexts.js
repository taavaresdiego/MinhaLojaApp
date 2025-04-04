import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        console.log(`Aumentando quantidade do produto ID: ${product.id}`);
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        console.log(`Adicionando novo produto ID: ${product.id}`);
        return [...prevItems, { product: product, quantity: 1 }];
      }
    });
    console.log("Carrinho atualizado:", cartItems);
  };

  const removeFromCart = (productId) => {
    console.log(`Removendo produto ID: ${productId}`);
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
    console.log("Carrinho atualizado:", cartItems);
  };

  const incrementQuantity = (productId) => {
    console.log(`Incrementando quantidade do produto ID: ${productId}`);
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
    console.log("Carrinho atualizado:", cartItems);
  };

  const decrementQuantity = (productId) => {
    console.log(`Decrementando quantidade do produto ID: ${productId}`);
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === productId
      );

      if (!existingItem) return prevItems;
      if (existingItem.quantity === 1) {
        return prevItems.filter((item) => item.product.id !== productId);
      } else {
        return prevItems.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
    console.log("Carrinho atualizado:", cartItems);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cartItems
      .reduce((sum, item) => sum + item.product.preco * item.quantity, 0)
      .toFixed(2);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    getCartItemCount,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
}
