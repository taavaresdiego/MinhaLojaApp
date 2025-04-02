import React, { createContext, useState, useContext } from "react";

// 1. Criar o Contexto
const CartContext = createContext();

// 2. Criar o Componente Provedor (Provider)
export function CartProvider({ children }) {
  // Estado que vai armazenar os itens do carrinho
  // Estrutura: [{ product: { id, nome, preco, ... }, quantity: X }, ...]
  const [cartItems, setCartItems] = useState([]);

  // Função para adicionar um produto ao carrinho
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Verifica se o produto já existe no carrinho
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        // Se existe, aumenta a quantidade
        console.log(`Aumentando quantidade do produto ID: ${product.id}`);
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Se não existe, adiciona o novo produto com quantidade 1
        console.log(`Adicionando novo produto ID: ${product.id}`);
        return [...prevItems, { product: product, quantity: 1 }];
      }
    });
    console.log("Carrinho atualizado:", cartItems); // Log para depuração
  };

  // Função para remover um produto completamente do carrinho
  const removeFromCart = (productId) => {
    console.log(`Removendo produto ID: ${productId}`);
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
    console.log("Carrinho atualizado:", cartItems); // Log para depuração
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
    console.log("Carrinho atualizado:", cartItems); // Log para depuração
  };

  // Função para decrementar a quantidade de um item existente
  const decrementQuantity = (productId) => {
    console.log(`Decrementando quantidade do produto ID: ${productId}`);
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === productId
      );

      // Se o item não existir ou já for 1, remove ele completamente
      if (!existingItem) return prevItems; // Não deveria acontecer, mas por segurança
      if (existingItem.quantity === 1) {
        return prevItems.filter((item) => item.product.id !== productId);
      } else {
        // Senão, apenas decrementa a quantidade
        return prevItems.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    });
    console.log("Carrinho atualizado:", cartItems); // Log para depuração
  };

  // Função para calcular o total de itens (soma das quantidades) - útil para badge no ícone do carrinho
  const getCartItemCount = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  // Função para calcular o preço total do carrinho
  const getCartTotal = () => {
    return cartItems
      .reduce((sum, item) => sum + item.product.preco * item.quantity, 0)
      .toFixed(2); // Formata para 2 casas decimais
  };

  // 3. Montar o objeto 'value' que será compartilhado
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    getCartItemCount,
    getCartTotal,
  };

  // 4. Retornar o Provider com o value e os children
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// 5. Criar um Hook customizado para facilitar o uso do contexto
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
}
