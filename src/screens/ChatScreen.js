import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import MessageBubble from "../components/MessageBubble";

const INITIAL_MESSAGES = [
  {
    id: "3",
    text: "Olá! Como posso ajudar?",
    sender: "ai",
    timestamp: new Date(Date.now() - 9000),
  },
  {
    id: "2",
    text: "Preciso de ajuda com meus pedidos.",
    sender: "user",
    timestamp: new Date(Date.now() - 5000),
  },
  {
    id: "1",
    text: "Claro, sobre qual pedido você gostaria de falar?",
    sender: "ai",
    timestamp: new Date(),
  },
];

const CURRENT_USER_ID = "user";

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");

  const handleSend = useCallback(() => {
    if (inputText.trim().length === 0) {
      return;
    }

    const newMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: CURRENT_USER_ID,
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [newMessage, ...prevMessages]);

    setInputText("");
  }, [inputText]);

  const renderMessageItem = ({ item }) => (
    <MessageBubble
      message={item}
      isCurrentUser={item.sender === CURRENT_USER_ID}
    />
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 100}
    >
      {}
      <FlatList
        style={styles.messageList}
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id}
        inverted
        contentContainerStyle={{ paddingVertical: 10 }}
      />

      {}
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
          {}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  messageList: {
    flex: 1,
    paddingHorizontal: 10,
  },
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
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
