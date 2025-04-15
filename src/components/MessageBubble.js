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
    marginVertical: 5,
    maxWidth: "85%",
  },
  rowSent: {
    alignSelf: "flex-end",
    marginRight: 10,
  },
  rowReceived: {
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  messageBubble: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
  },
  bubbleSent: {
    backgroundColor: "#2C2C2C",
    borderBottomRightRadius: 5,
  },
  bubbleReceived: {
    backgroundColor: "#424242",
    borderBottomLeftRadius: 5,
  },
  senderName: {
    fontSize: 12,
    color: "#B3B3B3",
    fontWeight: "bold",
    marginBottom: 4,
    marginLeft: 2,
  },
  sentText: {
    fontSize: 15,
    color: "#E5E5E5",
  },
  receivedText: {
    fontSize: 15,
    color: "#E5E5E5",
  },
});
