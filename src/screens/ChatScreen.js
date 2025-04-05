// Arquivo: src/screens/ChatScreen.js (Atualizado com UI)

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
import MessageBubble from "../components/MessageBubble"; // Importa o componente

// Dados de exemplo iniciais (simulando mensagens)
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

// Simula o ID do usuário atual (em um app real, viria do contexto de autenticação)
const CURRENT_USER_ID = "user"; // Ou qualquer identificador único

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");

  // Função para lidar com o envio de mensagem
  const handleSend = useCallback(() => {
    if (inputText.trim().length === 0) {
      return; // Não envia mensagem vazia
    }

    // Cria a nova mensagem do usuário
    const newMessage = {
      id: Date.now().toString(), // Chave simples baseada no tempo
      text: inputText.trim(),
      sender: CURRENT_USER_ID, // Marca como 'user'
      timestamp: new Date(),
    };

    // Adiciona a nova mensagem no *início* do array (porque a FlatList é invertida)
    setMessages((prevMessages) => [newMessage, ...prevMessages]);

    // Limpa o campo de input
    setInputText("");

    // Aqui, futuramente, você enviaria a mensagem para o backend ou para a IA
    // e receberia a resposta para adicionar também com setMessages(...)
  }, [inputText]); // Depende do inputText

  // Função para renderizar cada item da FlatList
  const renderMessageItem = ({ item }) => (
    <MessageBubble
      message={item}
      isCurrentUser={item.sender === CURRENT_USER_ID} // Passa se a mensagem é do usuário atual
    />
  );

  return (
    // KeyboardAvoidingView ajusta a tela quando o teclado aparece
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Comportamento diferente por OS
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 100} // Ajuste fino do offset
    >
      {/* Lista de Mensagens */}
      <FlatList
        style={styles.messageList}
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id}
        inverted // Faz a lista começar de baixo e novas mensagens aparecerem embaixo
        contentContainerStyle={{ paddingVertical: 10 }}
      />

      {/* Barra de Entrada */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Digite sua mensagem..."
          placeholderTextColor="#999"
          multiline // Permite múltiplas linhas (opcional)
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Enviar</Text>
          {/* Poderia ser um ícone de envio */}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// Estilos atualizados
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Fundo branco para chat
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
    backgroundColor: "#f5f5f5", // Fundo levemente cinza para input bar
  },
  input: {
    flex: 1,
    minHeight: 40, // Altura mínima
    maxHeight: 120, // Altura máxima para multiline
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20, // Bordas arredondadas
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 15,
    height: 40, // Mesma altura mínima do input
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
