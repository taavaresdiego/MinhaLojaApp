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
  // Estados para os valores dos campos
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  // Estados para as mensagens de erro
  const [nomeError, setNomeError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [cpfError, setCpfError] = useState("");
  const [senhaError, setSenhaError] = useState("");
  const [confirmarSenhaError, setConfirmarSenhaError] = useState("");

  // Função de formatação (mantida)
  const formatarCPF = (valor) => {
    const numerosCPF = valor.replace(/\D/g, "");
    let cpfFormatado = numerosCPF;
    if (numerosCPF.length > 3)
      cpfFormatado = numerosCPF.replace(/(\d{3})(\d)/, "$1.$2");
    if (numerosCPF.length > 6)
      cpfFormatado = cpfFormatado.replace(/(\d{3})(\d)/, "$1.$2");
    if (numerosCPF.length > 9)
      cpfFormatado = cpfFormatado.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    setCpf(cpfFormatado.substring(0, 14)); // Limita ao tamanho máximo 11 digitos + 3 formatadores
  };

  // Função de validação e cadastro
  const handleCadastroPress = () => {
    // 1. Limpar erros anteriores
    setNomeError("");
    setEmailError("");
    setCpfError("");
    setSenhaError("");
    setConfirmarSenhaError("");

    let isValid = true; // Flag para controlar a validade geral

    // 2. Validar campos obrigatórios
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
      // Senha não usa trim() para permitir espaços se o usuário quiser
      setSenhaError("Senha é obrigatória.");
      isValid = false;
    }
    if (!confirmarSenha) {
      setConfirmarSenhaError("Confirmação de senha é obrigatória.");
      isValid = false;
    }

    // 3. Validar regras específicas (só se não houver erro de campo obrigatório)
    if (isValid) {
      // Nome Completo: Mínimo 2 caracteres
      if (nome.trim().length < 2) {
        setNomeError("Nome completo deve ter no mínimo 2 caracteres.");
        isValid = false;
      }

      // Email: Formato válido (Regex simples)
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(email.trim())) {
        setEmailError("Formato de e-mail inválido.");
        isValid = false;
      }

      // CPF: Validação real usando a biblioteca
      const cpfLimpo = cpf.replace(/\D/g, "");
      if (!cpfValidator.isValid(cpfLimpo)) {
        // <<< Erro provavelmente aqui!
        setCpfError("CPF inválido.");
        isValid = false;
      }

      // Senha: Mínimo de caracteres (exemplo: 6) - OPCIONAL, NÃO ESTAVA NO REQUISITO
      /*
      if (senha.length < 6) {
          setSenhaError('Senha deve ter no mínimo 6 caracteres.');
          isValid = false;
      }
      */

      // Senhas coincidem
      if (senha !== confirmarSenha) {
        setConfirmarSenhaError("As senhas não coincidem.");
        // Poderia adicionar erro em ambos os campos de senha se preferir
        // setSenhaError('As senhas não coincidem.');
        isValid = false;
      }
    }

    // 4. Se tudo for válido, simula o cadastro
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
      // Futuramente (Fase 2), aqui chamaremos a API backend
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

        {/* Input Nome */}
        <TextInput
          style={[styles.input, nomeError ? styles.inputError : null]} // Aplica estilo de erro
          placeholder="Nome Completo"
          value={nome}
          onChangeText={setNome}
          placeholderTextColor="#888"
        />
        {/* Exibe a mensagem de erro se existir */}
        {nomeError ? <Text style={styles.errorText}>{nomeError}</Text> : null}

        {/* Input Email */}
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

        {/* Input CPF */}
        <TextInput
          style={[styles.input, cpfError ? styles.inputError : null]}
          placeholder="CPF"
          value={cpf}
          onChangeText={formatarCPF} // Usa a formatação
          keyboardType="numeric"
          maxLength={14}
          placeholderTextColor="#888"
        />
        {cpfError ? <Text style={styles.errorText}>{cpfError}</Text> : null}

        {/* Input Senha */}
        <TextInput
          style={[styles.input, senhaError ? styles.inputError : null]}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry={true}
          placeholderTextColor="#888"
        />
        {senhaError ? <Text style={styles.errorText}>{senhaError}</Text> : null}

        {/* Input Confirmar Senha */}
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

        {/* Botão Cadastrar */}
        <TouchableOpacity style={styles.button} onPress={handleCadastroPress}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        {/* Botão Voltar */}
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

// Estilos Atualizados
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
    borderColor: "#ddd", // Cor padrão da borda
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 5, // Diminuido para dar espaço ao texto de erro
    fontSize: 16,
    backgroundColor: "#fff",
  },
  // Novo estilo para input com erro
  inputError: {
    borderColor: "#dc3545", // Cor vermelha para erro
  },
  // Novo estilo para texto de erro
  errorText: {
    width: "100%", // Para alinhar com o input
    color: "#dc3545",
    fontSize: 12,
    marginBottom: 10, // Espaço antes do próximo input
    textAlign: "left", // Alinha texto à esquerda
    paddingLeft: 5, // Pequeno padding
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#28a745",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 15, // Aumentado um pouco
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
