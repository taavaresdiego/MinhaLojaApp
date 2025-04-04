import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

// 2. Criar o Componente Provedor (Provider)
export function CartProvider({ children }) {
  // Estado que vai armazenar os itens do carrinho
  const [cartItems, setCartItems] = useState([]);

  // Função para adicionar um produto ao carrinho
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
    // O console.log aqui pode mostrar o estado *antes* da atualização devido à natureza assíncrona do setState
    // Para ver o estado atualizado, use um useEffect ou logue dentro do setCartItems
  };

  // Função para remover um produto completamente do carrinho
  const removeFromCart = (productId) => {
    console.log(`Removendo produto ID: ${productId}`);
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  // Função para incrementar a quantidade de um item existente
  const incrementQuantity = (productId) => {
    console.log(`Incrementando quantidade do produto ID: ${productId}`);
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Função para decrementar a quantidade de um item existente
  const decrementQuantity = (productId) => {
    console.log(`Decrementando quantidade do produto ID: ${productId}`);
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === productId
      );
      if (!existingItem) return prevItems;
      if (existingItem.quantity === 1) {
        // Remove o item se a quantidade for 1 e tentar decrementar
        return prevItems.filter((item) => item.product.id !== productId);
      } else {
        // Senão, apenas decrementa
        return prevItems.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
  };

  // Função para calcular o total de itens (soma das quantidades)
  const getCartItemCount = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cartItems
      .reduce((sum, item) => {
        const price = Number(item.product.preco) || 0;
        const quantity = Number(item.quantity) || 0;
        return sum + price * quantity;
      }, 0)
      .toFixed(2);
  };

  const clearCart = () => {
    console.log("Limpando o carrinho...");
    setCartItems([]);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    getCartItemCount,
    getCartTotal,
    clearCart,
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
