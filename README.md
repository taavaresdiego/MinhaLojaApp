# Projeto App Mobile E-Commerce (Fase 1) - UNIFACISA SI

## Descrição do Projeto

Este repositório contém a **Fase 1** do frontend para um aplicativo móvel de e-commerce, desenvolvido como parte da disciplina de Desenvolvimento de Aplicativos Móveis e IOT (2025.1) do curso de Sistemas de Informação da UNIFACISA.

O objetivo desta fase foi construir a interface do usuário e a lógica de frontend para as funcionalidades essenciais de um aplicativo de compras, utilizando dados simulados ("mock data") e sem integração com um backend real. O contexto inicial é de um supermercado, mas pode ser adaptado [sources: 2, 18, 23, 37].

**Professor:** Bruno Rafael Araújo Vasconcelos

## Funcionalidades Implementadas (Fase 1)

- [x] Tela de Login com validação de campos.
- [x] Tela de Cadastro de Usuário com validações (campos obrigatórios, nome min. 2 caracteres, formato de email válido, formato e validação de CPF, confirmação de senha) [sources: 10, 32, 33].
- [x] Navegação básica entre telas de Autenticação e Telas Principais (usando React Navigation Stack).
- [x] Tela Principal (`HomeScreen`) exibindo uma lista de produtos (com dados simulados) usando `FlatList` [source: 29].
- [x] Componente reutilizável para item de produto (`ProductItem`).
- [x] Funcionalidade de Adicionar Produto ao Carrinho a partir da `HomeScreen`.
- [x] Gerenciamento de estado do carrinho de compras usando React Context API (`CartContext`).
- [x] Tela de Carrinho (`CartScreen`) exibindo os itens adicionados.
- [x] Funcionalidade para incrementar, decrementar e remover itens do carrinho na `CartScreen` [source: 32].
- [x] Exibição do valor total do carrinho.
- [x] Botão para "Finalizar Pedido" com ação simulada [source: 32].
- [x] Tratamento visual para carrinho vazio.

## Tecnologias Utilizadas

- **React Native:** Framework para desenvolvimento de apps móveis multiplataforma.
- **Expo:** Plataforma e conjunto de ferramentas para facilitar o desenvolvimento e build com React Native.
- **React Navigation:** Biblioteca para gerenciamento de navegação e rotas (`@react-navigation/native`, `@react-navigation/native-stack`).
- **React Context API:** Para gerenciamento de estado global (carrinho de compras).
- **cpf:** Biblioteca para validação de CPF brasileiro.
- **JavaScript (ES6+)**

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado em sua máquina:

- **Node.js (Versão LTS recomendada):** [https://nodejs.org/](https://nodejs.org/) (inclui npm ou pode usar yarn).
- **npm** (geralmente vem com Node.js) ou **Yarn** (opcional): Gerenciador de pacotes.
- **Expo Go App (no Celular):** Para testar em dispositivo físico.
  - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
  - [Apple App Store](https://apps.apple.com/us/app/expo-go/id982107779)
- **Git:** Para clonar o repositório. [https://git-scm.com/](https://git-scm.com/)
- **(Opcional) Emulador/Simulador:**
  - Android Studio (para Emulador Android): [https://developer.android.com/studio](https://developer.android.com/studio)
  - Xcode (para Simulador iOS - Apenas macOS): Via Mac App Store.

## Como Começar (Instalação e Execução)

Siga os passos abaixo para configurar e rodar o projeto localmente:

1.  **Clonar o Repositório:**

    ```bash
    git clone <URL_DO_SEU_REPOSITORIO_GITHUB>
    ```

2.  **Navegar para o Diretório:**

    ```bash
    cd <NOME_DA_PASTA_DO_PROJETO>
    # Ex: cd projetoMinhaLojaApp
    ```

3.  **Instalar Dependências:**

    - Se você usa **npm**:
      ```bash
      npm install
      ```
    - Se você usa **Yarn**:
      ```bash
      yarn install
      ```

4.  **Iniciar o Servidor de Desenvolvimento Expo:**

    ```bash
    npx expo start
    ```

    - Isso iniciará o Metro Bundler e exibirá um QR Code no terminal.

5.  **Executar o Aplicativo:**
    - **No Expo Go (Celular):**
      - Certifique-se de que seu celular e computador estão na **mesma rede Wi-Fi**.
      - Abra o app Expo Go e escaneie o QR Code exibido no terminal.
    - **No Simulador iOS (macOS):**
      - Com o servidor rodando, pressione `i` no terminal.
    - **No Emulador Android:**
      - Certifique-se de que um emulador esteja **aberto e rodando**.
      - Com o servidor rodando, pressione `a` no terminal.

## Solução de Problemas Comuns

- **Erros de Resolução de Módulo (`Unable to resolve module...`):** Frequentemente causados por cache ou caminhos de importação incorretos (verifique maiúsculas/minúsculas!). Tente reiniciar o servidor com limpeza de cache:
  ```bash
  npx expo start -c
  ```
- **Erro `EPERM: operation not permitted...` (Windows):** Geralmente significa que um arquivo/pasta está em uso. Certifique-se de que o servidor Expo (`npx expo start`) está parado e feche o editor de código antes de tentar renomear/excluir arquivos/pastas problemáticos.

**Observação sobre a pasta `_app/`:**

Esta pasta (`_app/` ou `app_desativado/` - ajuste conforme o nome utilizado) contém a estrutura de arquivos original do **Expo Router**. Durante o desenvolvimento inicial, optou-se por **desativar** o Expo Router (renomeando a pasta `app` original para este nome) e implementar a navegação manualmente utilizando a biblioteca **React Navigation**, configurada principalmente no arquivo `App.js`. A pasta foi mantida no versionamento para fins de contexto histórico e possível referência futura, mas **não está sendo utilizada** pela aplicação no estado atual (Fase 1).

## Status Atual

Este branch/commit representa a conclusão da **Fase 1**. A aplicação é funcional do ponto de vista do frontend, mas utiliza dados simulados e não possui persistência real ou comunicação com um servidor backend.

## Próximos Passos (Fase 2)

A próxima fase do projeto envolverá:

- Desenvolvimento e integração de um **Backend** para gerenciar usuários, produtos e pedidos reais.
- Substituição de dados e lógica simulada por chamadas **API** ao backend.
- Implementação de **autenticação** real com tokens (JWT).
- Integração com sistema de **pagamentos**.
- Desenvolvimento das funcionalidades de **Chat** (usuário-usuário e usuário-IA).

---
