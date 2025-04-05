// Arquivo: src/components/MessageBubble.js

import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Recebe a mensagem e um booleano indicando se é do usuário atual
export default function MessageBubble({ message, isCurrentUser }) {
  return (
    <View
      style={[
        styles.messageRow,
        // Alinha à direita se for do usuário atual, senão à esquerda
        isCurrentUser ? styles.rowSent : styles.rowReceived,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          // Cor de fundo diferente para enviado/recebido
          isCurrentUser ? styles.bubbleSent : styles.bubbleReceived,
        ]}
      >
        <Text style={styles.messageText}>{message.text}</Text>
        {/* Poderia adicionar timestamp aqui depois */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageRow: {
    flexDirection: "row",
    marginVertical: 5,
    maxWidth: "80%", // Bolha não ocupa a tela inteira
  },
  rowSent: {
    alignSelf: "flex-end", // Alinha a linha inteira à direita
  },
  rowReceived: {
    alignSelf: "flex-start", // Alinha a linha inteira à esquerda
  },
  messageBubble: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 15,
  },
  bubbleSent: {
    backgroundColor: "#007bff", // Azul para enviado
    borderBottomRightRadius: 5, // Ajuste de estilo
  },
  bubbleReceived: {
    backgroundColor: "#e5e5ea", // Cinza claro para recebido
    borderBottomLeftRadius: 5, // Ajuste de estilo
  },
  messageText: {
    fontSize: 15,
    color: "#000", // Texto padrão preto (pode mudar cor para bubbleSent se quiser)
  },
  // Estilo opcional para texto de mensagem enviada (se quiser branco)
  // sentText: {
  //   color: '#fff',
  // }
});
