import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function LoginScreen({ navigation, onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Estados de erro para Login
  const [emailError, setEmailError] = useState("");
  const [senhaError, setSenhaError] = useState("");

  const handleEntrarPress = () => {
    // 1. Limpar erros anteriores
    setEmailError("");
    setSenhaError("");
    let isValid = true;

    // 2. Validar campos obrigatórios
    if (!email.trim()) {
      setEmailError("E-mail é obrigatório.");
      isValid = false;
    }
    if (!senha) {
      setSenhaError("Senha é obrigatória.");
      isValid = false;
    }

    // 3. Validar formato do email (opcional, mas boa prática)
    if (email.trim() && isValid) {
      // Só valida formato se não estiver vazio
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(email.trim())) {
        setEmailError("Formato de e-mail inválido.");
        isValid = false;
      }
    }

    // 4. Se válido, chama a função onLogin
    if (isValid) {
      console.log("Tentando logar com:", { email: email.trim(), senha });
      onLogin(); // Chama a função passada por props (do App.js)
    } else {
      console.log("Formulário de login inválido. Erros:", {
        emailError,
        senhaError,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>

      {/* Input Email */}
      <TextInput
        style={[styles.input, emailError ? styles.inputError : null]}
        placeholder="Seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        placeholderTextColor="#888"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

      {/* Input Senha */}
      <TextInput
        style={[styles.input, senhaError ? styles.inputError : null]}
        placeholder="Sua senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry={true}
        placeholderTextColor="#888"
      />
      {senhaError ? <Text style={styles.errorText}>{senhaError}</Text> : null}

      {/* Botão Entrar */}
      <TouchableOpacity style={styles.button} onPress={handleEntrarPress}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Botão para ir para Cadastro */}
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.linkButtonText}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos Atualizados (reutilizando os da tela de Registro onde possível)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 5,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#dc3545",
  },
  errorText: {
    width: "100%",
    color: "#dc3545",
    fontSize: 12,
    marginBottom: 10,
    textAlign: "left",
    paddingLeft: 5,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkButton: {
    marginTop: 20,
  },
  linkButtonText: {
    color: "#007bff",
    fontSize: 16,
  },
});
