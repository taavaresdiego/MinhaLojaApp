import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API_BASE_URL = "http://192.168.1.8:4000";

export default function LoginScreen({ navigation, onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [emailError, setEmailError] = useState("");
  const [senhaError, setSenhaError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEntrarPress = async () => {
    setEmailError("");
    setSenhaError("");
    let isValid = true;
    if (!email.trim()) {
      setEmailError("E-mail é obrigatório.");
      isValid = false;
    }
    if (!senha) {
      setSenhaError("Senha é obrigatória.");
      isValid = false;
    }
    if (!isValid) {
      return;
    }

    setIsLoading(true);
    try {
      console.log(
        `[LoginScreen] Tentando login para ${email.trim()} em ${API_BASE_URL}/api/auth/login`
      );
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email: email.trim(),
        senha: senha,
      });

      const { token, user } = response.data;
      console.log(
        "[LoginScreen] Login bem-sucedido, token:",
        token ? "Token recebido" : "Token NÃO recebido!"
      );

      if (token) {
        await SecureStore.setItemAsync("userToken", token);
        console.log("[LoginScreen] Token armazenado com sucesso.");
        onLogin();
      } else {
        throw new Error("Resposta de login inválida do servidor.");
      }
    } catch (error) {
      console.error(
        "[LoginScreen] Erro no login:",
        error.response?.data?.message || error.message
      );
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 400)
      ) {
        setEmailError(" ");
        setSenhaError("Email ou senha inválidos.");
      } else {
        Alert.alert(
          "Erro de Conexão",
          "Não foi possível conectar ao servidor."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>
      <TextInput
        style={[styles.input, emailError ? styles.inputError : null]}
        placeholder="Seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor="#888"
        editable={!isLoading}
      />
      {emailError && !senhaError ? (
        <Text style={styles.errorText}>{emailError}</Text>
      ) : null}
      <TextInput
        style={[styles.input, senhaError ? styles.inputError : null]}
        placeholder="Sua senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry={true}
        placeholderTextColor="#888"
        editable={!isLoading}
      />
      {senhaError ? <Text style={styles.errorText}>{senhaError}</Text> : null}
      <TouchableOpacity
        style={[styles.button, isLoading ? styles.buttonDisabled : null]}
        onPress={handleEntrarPress}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate("Register")}
        disabled={isLoading}
      >
        <Text
          style={[
            styles.linkButtonText,
            isLoading ? styles.linkButtonDisabled : null,
          ]}
        >
          Não tem conta? Cadastre-se
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#141414",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#E5E5E5",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#333333",
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
    color: "#E5E5E5",
    borderWidth: 1,
    borderColor: "#424242",
  },
  inputError: {
    borderColor: "#E50914",
  },
  errorText: {
    width: "100%",
    color: "#E87C03",
    fontSize: 13,
    marginBottom: 10,
    textAlign: "left",
    paddingLeft: 5,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#E50914",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: "#555555",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkButton: {
    marginTop: 25,
  },
  linkButtonText: {
    color: "#B3B3B3",
    fontSize: 16,
  },
  linkButtonDisabled: {
    color: "#555555",
  },
});
