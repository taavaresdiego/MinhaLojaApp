import React, { useState, useCallback, useEffect } from "react";
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
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import MessageBubble from "../components/MessageBubble";

const API_BASE_URL = "http://192.168.1.8:4000";

const CURRENT_USER_ID = "user";

const INITIAL_MESSAGES = [
  {
    id: "ai-initial",
    text: "Olá! Sou seu assistente IA. Pergunte sobre seus produtos ou pedidos.",
    sender: "ai",
    timestamp: new Date(),
  },
];

export default function AIChatScreen({ navigation }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [isAiTyping, setIsAiTyping] = useState(false);

  const handleSend = useCallback(async () => {
    const messageText = inputText.trim();
    if (messageText.length === 0) {
      return;
    }

    const userMessage = {
      id: Date.now().toString(),
      text: messageText,
      sender: CURRENT_USER_ID,
      timestamp: new Date(),
    };

    if (userMessage && typeof userMessage.text !== "undefined") {
      console.log(
        ">> AIChat: Adicionando msg LOCAL:",
        JSON.stringify(userMessage)
      );
      setMessages((prevMessages) => [userMessage, ...prevMessages]);
    } else {
      console.error(
        ">> AIChat: ERRO - Mensagem LOCAL é inválida!",
        userMessage
      );
    }
    setInputText("");
    setIsAiTyping(true);

    try {
      const token = await SecureStore.getItemAsync("userToken");
      if (!token) {
        Alert.alert("Autenticação Necessária", "Token não encontrado.");
        setIsAiTyping(false);
        return;
      }

      console.log(`[AIChat UI] Enviando para ${API_BASE_URL}/api/chat/ai:`, {
        message: messageText,
      });
      const response = await axios.post(
        `${API_BASE_URL}/api/chat/ai`,
        { message: messageText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const aiResponseData = response.data;
      console.log("[AIChat UI] Resposta REAL da IA recebida:", aiResponseData);

      if (aiResponseData && aiResponseData.text) {
        const aiMessage = {
          id: Date.now().toString() + "-ai",
          text: aiResponseData.text,
          sender: "ai",
          timestamp: new Date(),
        };

        if (aiMessage && typeof aiMessage.text !== "undefined") {
          console.log(
            ">> AIChat: Adicionando msg SUCESSO IA:",
            JSON.stringify(aiMessage)
          );
          setMessages((prevMessages) => [aiMessage, ...prevMessages]);
        } else {
          console.error(
            ">> AIChat: ERRO - Mensagem SUCESSO IA é inválida!",
            aiMessage
          );
          throw new Error("Resposta da IA inválida recebida.");
        }
      } else {
        throw new Error("Resposta da IA inválida recebida.");
      }
    } catch (error) {
      console.error(
        "[AIChat UI] Erro ao chamar API de chat AI:",
        error.response?.data || error.message
      );
      let displayErrorMessage =
        "Desculpe, não consegui processar sua mensagem agora.";
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        displayErrorMessage = "Sessão expirada/inválida. Faça login.";
      } else if (error.response) {
        displayErrorMessage = `Erro do servidor: ${
          error.response.data?.message || "Tente novamente."
        }`;
      } else if (error.request) {
        displayErrorMessage = "Não foi possível conectar ao servidor de chat.";
      }

      const errorAiMessage = {
        id: Date.now().toString() + "-ai-err",
        text: displayErrorMessage,
        sender: "ai",
        timestamp: new Date(),
      };

      if (errorAiMessage && typeof errorAiMessage.text !== "undefined") {
        console.log(
          ">> AIChat: Adicionando msg ERRO IA:",
          JSON.stringify(errorAiMessage)
        );
        setMessages((prevMessages) => [errorAiMessage, ...prevMessages]);
      } else {
        console.error(
          ">> AIChat: ERRO - Mensagem ERRO IA é inválida!",
          errorAiMessage
        );
      }
    } finally {
      setIsAiTyping(false);
    }
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
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 90}
    >
      <FlatList
        style={styles.messageList}
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id.toString()}
        inverted
        contentContainerStyle={{ paddingVertical: 10 }}
      />
      {isAiTyping && (
        <View style={styles.typingIndicator}>
          <Text style={styles.typingText}>IA está digitando...</Text>
          <ActivityIndicator
            size="small"
            color="#999"
            style={{ marginLeft: 5 }}
          />
        </View>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Pergunte ao Assistente IA..."
          placeholderTextColor="#999"
          multiline
          editable={!isAiTyping}
        />
        <TouchableOpacity
          style={[styles.sendButton, isAiTyping ? styles.buttonDisabled : null]}
          onPress={handleSend}
          disabled={isAiTyping}
        >
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// ... (importações e lógica do componente)

// SUBSTITUA O styles EXISTENTE POR ESTE:
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
  },
  messageList: {
    flex: 1,
    paddingHorizontal: 0,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#333333",
    backgroundColor: "#1F1F1F",
  },
  input: {
    flex: 1,
    minHeight: 45,
    maxHeight: 120,
    backgroundColor: "#333333",
    borderWidth: 1,
    borderColor: "#424242",
    borderRadius: 22,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 10,
    color: "#E5E5E5",
  },
  sendButton: {
    backgroundColor: "#E50914",
    paddingHorizontal: 18,
    height: 45,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    backgroundColor: "#555555",
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  typingIndicator: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#1F1F1F",
    flexDirection: "row",
    alignItems: "center",
  },
  typingText: {
    fontSize: 13,
    color: "#808080",
    fontStyle: "italic",
  },
});
