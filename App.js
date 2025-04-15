import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MessageBubble({ message, isCurrentUser }) {
  if (!message || typeof message.text === "undefined") {
    console.warn(
      "Tentativa de renderizar bolha com mensagem inválida:",
      message
    );
    return null;
  }

  const senderName = message.senderName || null;

  return (
    <View
      style={[
        styles.messageRow,
        isCurrentUser ? styles.rowSent : styles.rowReceived,
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          isCurrentUser ? styles.bubbleSent : styles.bubbleReceived,
        ]}
      >
        {!isCurrentUser && senderName && (
          <Text style={styles.senderName}>{senderName}</Text>
        )}

        <Text style={isCurrentUser ? styles.sentText : styles.receivedText}>
          {message.text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageRow: {
    flexDirection: "row",
    marginVertical: 4,
    maxWidth: "80%",
  },
  rowSent: {
    alignSelf: "flex-end",
  },
  rowReceived: {
    alignSelf: "flex-start",
  },
  messageBubble: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 15,
    elevation: 1,
  },
  bubbleSent: {
    backgroundColor: "#007bff",
    borderBottomRightRadius: 5,
  },
  bubbleReceived: {
    backgroundColor: "#e5e5ea",
    borderBottomLeftRadius: 5,
  },
  senderName: {
    fontSize: 11,
    color: "#555",
    fontWeight: "bold",
    marginBottom: 3,
    marginLeft: 2,
  },
  sentText: {
    fontSize: 15,
    color: "#fff",
  },
  receivedText: {
    fontSize: 15,
    color: "#000",
  },
});
