import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { cpf as cpfValidator } from "cpf";
import axios from "axios";

const API_BASE_URL = "http://192.168.1.8:4000";

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [nomeError, setNomeError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [cpfError, setCpfError] = useState("");
  const [senhaError, setSenhaError] = useState("");
  const [confirmarSenhaError, setConfirmarSenhaError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const formatarCPF = (valor) => {
    const numerosCPF = valor.replace(/\D/g, "");
    let cpfFormatado = numerosCPF;
    if (numerosCPF.length > 3)
      cpfFormatado = numerosCPF.replace(/(\d{3})(\d)/, "$1.$2");
    if (numerosCPF.length > 6)
      cpfFormatado = cpfFormatado.replace(/(\d{3})(\d)/, "$1.$2");
    if (numerosCPF.length > 9)
      cpfFormatado = cpfFormatado.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    setCpf(cpfFormatado.substring(0, 14));
  };

  const handleCadastroPress = async () => {
    console.log("--- [FRONTEND] Iniciando handleCadastroPress ---");

    setNomeError("");

    let isValid = true;

    if (!isValid) {
      console.log("--- [FRONTEND] Validação local FALHOU ---");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        nomeCompleto: nome.trim(),
        cpf: cpf.replace(/\D/g, ""),
        email: email.trim(),
        senha: senha,
      };
      console.log("--- [FRONTEND] Enviando para API:", payload);

      const response = await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        payload
      );

      console.log(
        "--- [FRONTEND] API SUCESSO! Status:",
        response.status,
        "Dados:",
        response.data
      );

      Alert.alert("Cadastro Realizado!", "Usuário criado com sucesso.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
      console.log(
        "--- [FRONTEND] Alerta de sucesso exibido, navegando de volta... ---"
      );
    } catch (error) {
      console.error("--- [FRONTEND] ERRO no bloco catch! ---");

      if (error.response) {
        console.error("[FRONTEND] Erro - Status:", error.response.status);
        console.error("[FRONTEND] Erro - Dados:", error.response.data);
        console.error("[FRONTEND] Erro - Cabeçalhos:", error.response.headers);
      } else if (error.request) {
        console.error(
          "[FRONTEND] Erro - Sem resposta do servidor. Request:",
          error.request
        );
      } else {
        console.error(
          "[FRONTEND] Erro - Configuração da Requisição:",
          error.message
        );
      }
      console.error("[FRONTEND] Config do Axios:", error.config);

      if (error.response) {
        const errorMessage =
          error.response.data?.message || "Erro desconhecido no cadastro.";
        if (error.response.status === 409) {
          Alert.alert("Erro no Cadastro", "Email ou CPF já cadastrado.");
        } else if (error.response.status === 400) {
          Alert.alert("Erro no Cadastro", `Dados inválidos: ${errorMessage}`);
        } else {
          Alert.alert(
            "Erro no Servidor",
            "Não foi possível completar o cadastro."
          );
        }
      } else {
        Alert.alert(
          "Erro de Conexão",
          "Não foi possível conectar ao servidor."
        );
      }
      console.log("--- [FRONTEND] Alerta de ERRO exibido ---");
    } finally {
      setIsLoading(false);
      console.log(
        "--- [FRONTEND] Finalizando handleCadastroPress (finally) ---"
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Criar Conta</Text>

        {}
        <TextInput
          style={[styles.input, nomeError ? styles.inputError : null]}
          placeholder="Nome Completo"
          value={nome}
          onChangeText={setNome}
          placeholderTextColor="#888"
          editable={!isLoading}
        />
        {nomeError ? <Text style={styles.errorText}>{nomeError}</Text> : null}

        <TextInput
          style={[styles.input, emailError ? styles.inputError : null]}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="#888"
          editable={!isLoading}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <TextInput
          style={[styles.input, cpfError ? styles.inputError : null]}
          placeholder="CPF"
          value={cpf}
          onChangeText={formatarCPF}
          keyboardType="numeric"
          maxLength={14}
          placeholderTextColor="#888"
          editable={!isLoading}
        />
        {cpfError ? <Text style={styles.errorText}>{cpfError}</Text> : null}

        <TextInput
          style={[styles.input, senhaError ? styles.inputError : null]}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={true}
          placeholderTextColor="#888"
          editable={!isLoading}
        />
        {senhaError ? <Text style={styles.errorText}>{senhaError}</Text> : null}

        <TextInput
          style={[styles.input, confirmarSenhaError ? styles.inputError : null]}
          placeholder="Confirmar Senha"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry={true}
          placeholderTextColor="#888"
          editable={!isLoading}
        />
        {confirmarSenhaError ? (
          <Text style={styles.errorText}>{confirmarSenhaError}</Text>
        ) : null}

        {}
        <TouchableOpacity
          style={[styles.button, isLoading ? styles.buttonDisabled : null]}
          onPress={handleCadastroPress}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Cadastrar</Text>
          )}
        </TouchableOpacity>

        {}
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.goBack()}
          disabled={isLoading}
        >
          <Text
            style={[
              styles.linkButtonText,
              isLoading ? styles.linkButtonDisabled : null,
            ]}
          >
            Já tem conta? Voltar para Login
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, justifyContent: "center" },
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 30, color: "#333" },
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
  inputError: { borderColor: "#dc3545" },
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
    backgroundColor: "#28a745",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 15,
  },
  buttonDisabled: { backgroundColor: "#6c757d" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  linkButton: { marginTop: 20 },
  linkButtonText: { color: "#007bff", fontSize: 16 },
  linkButtonDisabled: { color: "#6c757d" },
});
