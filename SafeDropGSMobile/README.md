# 🚨 Aplicativo de Emergências para Desastres Naturais

#  Equipe

- **Adel Mouhaidy** - RM 557705 - 2TDSA
- **Afonso Correia Pereira** - RM 557863 - 2TDSA
- **Tiago Augusto Desiderato Ferro** - RM 558485 - 2TDSA


##  Links

- [Link do video de funcionalidade](https://www.youtube.com/watch?v=T9VluZ7q3cs)


## 📱 Sobre o Projeto

Este aplicativo mobile foi desenvolvido como uma solução completa para auxiliar comunidades durante desastres naturais extremos. A plataforma oferece ferramentas essenciais para prevenção, resposta e coordenação de emergências, conectando cidadãos, órgãos públicos e sistemas de monitoramento em tempo real.

## 🎯 Principais Funcionalidades

### 🏠 Aba de Abrigos
- **Localização de Abrigos**: Encontre abrigos de emergência próximos à sua localização
- **Informações Detalhadas**: Visualize a capacidade total de cada abrigo
- **Disponibilidade em Tempo Real**: Verifique se há vagas disponíveis
- **Status Atualizado**: Informações sempre atualizadas sobre a situação dos abrigos

### 🗺️ Mapa Interativo
- **Navegação Inteligente**: Sistema de roteamento para abrigos e locais seguros
- **Interface Intuitiva**: Mapa interativo com marcadores e informações relevantes
- **Rotas Otimizadas**: Cálculo das melhores rotas considerando condições de emergência
- **Localização em Tempo Real**: GPS integrado para navegação precisa

### 📋 Tela de Ocorrências
- **Registro de Emergências**: Cidadãos podem reportar ocorrências em tempo real
- **Visualização Centralizada**: Todas as ocorrências são exibidas em um painel unificado
- **Sistema de Candidatura**: Voluntários podem se candidatar para ajudar em ocorrências específicas
- **Integração com Órgãos Públicos**: Defesa Civil e outros órgãos podem visualizar e responder às ocorrências
- **Priorização Automática**: Sistema de classificação de urgência das ocorrências

### ⚠️ Sistema de Alertas
- **Dashboard de Sensores IoT**: Monitoramento em tempo real de sensores distribuídos pela cidade
- **Organização por Região**: Sensores categorizados por área geográfica
- **Detecção Automática**: Identificação de padrões que indicam desastres iminentes
- **Alertas Regionais**: Notificações automáticas para todos os usuários da região afetada
- **Resposta Rápida**: Sistema de alerta precoce para maximizar o tempo de resposta

## 🔧 Tecnologias Utilizadas

- **Frontend Mobile**: React Native com Expo
- **Backend**: Java (Spring Boot)
- **IoT**: Sistema de sensores conectados
- **Mapas**: Integração com serviços de geolocalização
- **Notificações**: Push notifications em tempo real

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js instalado
- Expo CLI
- Java JDK (para o backend)
- Dispositivos IoT configurados

### Instalação e Execução

1. **Clone o repositório**
   ```bash
   git clone [url-do-repositorio]
   cd SafeDropGSMobile
   cd SafeDrop
   ```

2. **Instale as dependências**
   ```bash
   npm i
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npx expo start
   ```

4. **Execute no Android**
   - Após executar `npx expo start`, pressione a tecla **A** para abrir no emulador Android
   - Ou escaneie o QR code com o aplicativo Expo Go em seu dispositivo Android

### 📱 Formas de Abrir o Aplicativo

1. **Emulador Android**: Pressione 'A' no terminal após `npx expo start`
2. **Emulador iOS**: Pressione 'I' no terminal (requer macOS e Xcode)
3. **Dispositivo Físico**: Use o app Expo Go e escaneie o QR code
4. **Web**: Pressione 'W' para abrir no navegador (funcionalidade não aplicada)

## 🗂️ Estrutura do Projeto

Para o funcionamento completo da aplicação, é necessário executar os seguintes componentes:

### 📁 Pastas Necessárias

1. **Pasta `SafeDropGSJava/`**: Contém o backend da aplicação
   - APIs REST para gerenciamento de autenticação e ocorrências
   - Integração com banco de dados

2. **Pasta `SafeDropGSJava/`**: Sistema de sensores IoT
   - Código para os dispositivos sensores
   - Configurações de comunicação
   - Scripts de monitoramento ambiental
   - Contém backend da aplicação em Node-red

### ⚙️ Configuração Completa

Para rodar o projeto perfeitamente:

1. **Backend (Java)**:
   ```bash
   cd SafeDropGSJava/
   mvn spring-boot:run
   ```

2. **Sistema IoT**:
   ```bash
   cd SafeDropGSIOT/
   # Siga as instruções específicas no repositório
   ```

3. **Frontend Mobile**:
   ```bash
   npm i
   npx expo start
   ```

## 🌟 Benefícios da Solução

- **Prevenção Proativa**: Sistema de alerta precoce baseado em sensores IoT
- **Coordenação Eficiente**: Centralização de informações para órgãos de resposta
- **Participação Cidadã**: Envolvimento da comunidade na identificação e resposta a emergências
- **Otimização de Recursos**: Melhor distribuição de pessoas em abrigos disponíveis
- **Resposta Rápida**: Redução do tempo entre detecção e ação

