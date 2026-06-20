# Controle de Vendas - Mobile Client

Aplicativo móvel desenvolvido em **React Native** (com Expo) para gerenciamento, cadastro, edição e exclusão de vendas mensais. O app consome uma API REST interna para persistência dos dados.

---

## 🚀 Funcionalidades

* 📊 **Visualização de Vendas:** Listagem dinâmica das vendas com tradução automatizada do número do mês para o nome por extenso.
* ➕ **Cadastro de Vendas:** Formulário com seleção de mês via Modal nativo e validação de campos.
* ✏️ **Edição:** Atualização rápida de valores e meses diretamente na API.
* ❌ **Exclusão:** Remoção de registros com alertas nativos de confirmação.

---

## 🛠️ Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:
* [Node.js](https://nodejs.org/) (Versão LTS recomendada)
* [Git](https://git-scm.com/)
* Gerenciador de pacotes **npm** (já vem com o Node) ou **yarn**.
* O aplicativo **Expo Go** instalado no seu celular (Android ou iOS) para testar o app físico, ou um emulador configurado.

---

## 🔧 Instalação e Configuração

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/sferrem/react-native-app](https://github.com/sferrem/react-native-app)

O projeto vem configurado com a API remota pública,porém se você instalar a local precisará mudar a URL no arquio api.js.
