// Arquivo: src/screens/LiveChatScreen.js (Antigo ChatScreen.js com Socket.IO)

import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { io } from "socket.io-client";
import MessageBubble from "../components/MessageBubble"; // Confirme o caminho

// ===> CONFIRME SEU IP E PORTA <===
const API_BASE_URL = "http://192.168.1.5:4000"; // << IP ATUAL!

// Simula ID e Nome do usuário
const CURRENT_USER_DATA = {
  id: "user-" + Math.random().toString(16).slice(2),
  name: "Usuário Teste",
};

export default function LiveChatScreen({ navigation }) {
  // Nome do componente atualizado
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    console.log("[Socket.IO] Tentando conectar a:", API_BASE_URL);
    socketRef.current = io(API_BASE_URL, {});
    const socket = socketRef.current;

    socket.on("connect", () =>
      console.log("[Socket.IO] Conectado! ID:", socket.id)
    );
    socket.on("disconnect", (reason) =>
      console.log("[Socket.IO] Desconectado:", reason)
    );
    socket.on("connect_error", (err) =>
      console.error("[Socket.IO] Erro de conexão:", err)
    );

    socket.on("liveChatMessage", (receivedMsg) => {
      console.log("[Socket.IO] Mensagem recebida:", receivedMsg);
      setMessages((prevMessages) => [receivedMsg, ...prevMessages]);
    });

    return () => {
      if (socket) {
        console.log("[Socket.IO] Desconectando...");
        socket.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  const handleSend = useCallback(() => {
    const messageText = inputText.trim();
    if (
      messageText.length === 0 ||
      !socketRef.current ||
      !socketRef.current.connected
    ) {
      console.log("[Socket.IO] Não conectado ou mensagem vazia. Não enviando.");
      return;
    }

    const messageToSend = {
      text: messageText,
      senderId: CURRENT_USER_DATA.id,
      senderName: CURRENT_USER_DATA.name,
    };

    const userMessageForUI = {
      id: Date.now().toString(),
      text: messageText,
      sender: CURRENT_USER_DATA.id, // Usar 'user' ou ID para estilização local
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [userMessageForUI, ...prevMessages]);
    setInputText("");

    console.log("[Socket.IO] Enviando mensagem:", messageToSend);
    socketRef.current.emit("liveChatMessage", messageToSend);
  }, [inputText]);

  const renderMessageItem = ({ item }) => (
    <MessageBubble
      message={item}
      isCurrentUser={
        item.sender === CURRENT_USER_DATA.id ||
        item.senderId === CURRENT_USER_DATA.id
      }
    />
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 90} // Ajuste conforme necessário
    >
      <FlatList
        style={styles.messageList}
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id.toString()}
        inverted
        contentContainerStyle={{ paddingVertical: 10 }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Digite sua mensagem..."
          placeholderTextColor="#999"
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// Estilos (os mesmos de antes para ChatScreen)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  messageList: { flex: 1, paddingHorizontal: 10 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#f5f5f5",
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 15,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
