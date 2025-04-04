import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { cpf as cpfValidator } from "cpf";

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

  const handleCadastroPress = () => {
    setNomeError("");
    setEmailError("");
    setCpfError("");
    setSenhaError("");
    setConfirmarSenhaError("");

    let isValid = true;

    if (!nome.trim()) {
      setNomeError("Nome completo é obrigatório.");
      isValid = false;
    }
    if (!email.trim()) {
      setEmailError("E-mail é obrigatório.");
      isValid = false;
    }
    if (!cpf.trim()) {
      setCpfError("CPF é obrigatório.");
      isValid = false;
    }
    if (!senha) {
      setSenhaError("Senha é obrigatória.");
      isValid = false;
    }
    if (!confirmarSenha) {
      setConfirmarSenhaError("Confirmação de senha é obrigatória.");
      isValid = false;
    }

    if (isValid) {
      if (nome.trim().length < 2) {
        setNomeError("Nome completo deve ter no mínimo 2 caracteres.");
        isValid = false;
      }

      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(email.trim())) {
        setEmailError("Formato de e-mail inválido.");
        isValid = false;
      }

      const cpfLimpo = cpf.replace(/\D/g, "");
      if (!cpfValidator.isValid(cpfLimpo)) {
        setCpfError("CPF inválido.");
        isValid = false;
      }

      if (senha !== confirmarSenha) {
        setConfirmarSenhaError("As senhas não coincidem.");

        isValid = false;
      }
    }

    if (isValid) {
      console.log("Dados válidos! Tentando cadastrar:", {
        nome: nome.trim(),
        email: email.trim(),
        cpf: cpf.trim(),
        senha,
      });
      Alert.alert("Sucesso", "Cadastro (simulado) realizado!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } else {
      console.log("Formulário inválido. Erros:", {
        nomeError,
        emailError,
        cpfError,
        senhaError,
        confirmarSenhaError,
      });
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
        />
        {}
        {nomeError ? <Text style={styles.errorText}>{nomeError}</Text> : null}

        {}
        <TextInput
          style={[styles.input, emailError ? styles.inputError : null]}
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="#888"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        {}
        <TextInput
          style={[styles.input, cpfError ? styles.inputError : null]}
          placeholder="CPF"
          value={cpf}
          onChangeText={formatarCPF}
          keyboardType="numeric"
          maxLength={14}
          placeholderTextColor="#888"
        />
        {cpfError ? <Text style={styles.errorText}>{cpfError}</Text> : null}

        {}
        <TextInput
          style={[styles.input, senhaError ? styles.inputError : null]}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={true}
          placeholderTextColor="#888"
        />
        {senhaError ? <Text style={styles.errorText}>{senhaError}</Text> : null}

        {}
        <TextInput
          style={[styles.input, confirmarSenhaError ? styles.inputError : null]}
          placeholder="Confirmar Senha"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry={true}
          placeholderTextColor="#888"
        />
        {confirmarSenhaError ? (
          <Text style={styles.errorText}>{confirmarSenhaError}</Text>
        ) : null}

        {}
        <TouchableOpacity style={styles.button} onPress={handleCadastroPress}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        {}
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.linkButtonText}>
            Já tem conta? Voltar para Login
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
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
    backgroundColor: "#28a745",
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
