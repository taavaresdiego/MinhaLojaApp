import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MessageBubble({ message, isCurrentUser }) {
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
        <Text style={styles.messageText}>{message.text}</Text>
        {}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageRow: {
    flexDirection: "row",
    marginVertical: 5,
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
  },
  bubbleSent: {
    backgroundColor: "#007bff",
    borderBottomRightRadius: 5,
  },
  bubbleReceived: {
    backgroundColor: "#e5e5ea",
    borderBottomLeftRadius: 5,
  },
  messageText: {
    fontSize: 15,
    color: "#000",
  },
});
