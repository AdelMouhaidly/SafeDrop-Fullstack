# SafeDrop - Sistema de Monitoramento de Desastres Naturais

##  Equipe

- **Adel Mouhaidy** - RM 557705 - 1TDSA
- **Afonso Correia Pereira** - RM 557863 - 1TDSA
- **Tiago Augusto Desiderato Ferro** - RM 558485 - 1TDSA

##  Sumário

- [Descrição da Solução](#-descrição-da-solução)

- [Guia de como rodar o projeto](#safedrop---backend-setup-guide)

##  Descrição da Solução

### Visão Geral

O SafeDrop é um sistema IoT desenvolvido para monitoramento preventivo de desastres naturais, com foco especial em enchentes e eventos climáticos extremos. A solução combina sensores ambientais, processamento inteligente de dados e comunicação redundante para fornecer alertas antecipados e informações críticas para tomada de decisões.

O sistema foi projetado para ser uma ferramenta completa de prevenção, capaz de detectar condições que precedem desastres naturais através do monitoramento contínuo de parâmetros como nível de água, temperatura, umidade e vibração.

### Problemas Solucionados

- **Detecção Precoce de Enchentes**: Monitoramento contínuo de níveis de água em rios, córregos e sistemas de drenagem urbana
- **Monitoramento de Condições Climáticas Extremas**: Detecção de condições que podem preceder eventos meteorológicos severos
- **Detecção de Instabilidade Geológica**: Identificação de movimentações de solo que podem indicar risco de deslizamentos
- **Comunicação Confiável**: Conectividade redundante para garantir transmissão de dados críticos

### Benefícios

- **Redução de Perdas Humanas**: Alertas antecipados permitem evacuações programadas
- **Minimização de Perdas Materiais**: Tempo para remoção de bens de áreas de risco
- **Otimização de Recursos**: Direcionamento eficiente de equipes de emergência
- **Melhoria do Planejamento**: Dados históricos para planejamento urbano

##  Arquitetura Técnica

### Visão Geral da Arquitetura

O sistema é estruturado em três camadas:

#### 1. Camada de Sensoriamento
- Microcontrolador ESP32 como unidade central
- Sensor DHT22 para temperatura e umidade
- Sensores analógicos para nível de água e vibração
- Display LCD para interface local

#### 2. Camada de Comunicação
- Conectividade WiFi e Ethernet redundante
- Protocolo MQTT para comunicação eficiente
- Algoritmos de reconexão automática

#### 3. Camada de Processamento
- Node-RED para processamento de dados
- Correlação de informações de múltiplos sensores
- API REST para acesso aos dados

### Componentes Principais

| Componente | Função | Especificações |
|------------|--------|---------------|
| **ESP32 DevKit** | Controlador Central | Dual-core, WiFi/Bluetooth, ADC 12-bit |
| **DHT22** | Sensor Climático | Temp: -40°C a +80°C (±0.5°C), Umidade: 0-100% (±2-5%) |
| **Sensores Analógicos** | Nível/Vibração | Resolução 12-bit (4096 níveis), 0-100% |
| **Display LCD I2C** | Interface Local | 16x2, comunicação I2C |

##  Funcionalidades

### Monitoramento Contínuo

- **Temperatura e Umidade**: Detecção de padrões anômalos e mudanças meteorológicas
- **Nível de Água**: Monitoramento de elevações graduais e mudanças súbitas
- **Vibração e Movimento**: Diferenciação entre vibrações normais e padrões anômalos
- **Análise de Tendências**: Identificação de padrões temporais de curto e médio prazo

### Sistema de Alertas Inteligentes

#### Classificação de Alertas

1. **Informativos**: Parâmetros se aproximam de valores de atenção
2. **Prioridade Média**: Parâmetros excedem thresholds primários
3. **Prioridade Alta**: Condições críticas que requerem ação imediata

#### Critérios de Alerta

- Níveis de água > 80%
- Temperatura > 35°C
- Umidade > 90%
- Vibração > 70%
- Tremores > 60%

### Conectividade Redundante

- **Alternância Automática**: WiFi/Ethernet a cada 30 segundos
- **Reconexão Inteligente**: Tentativas com intervalos progressivos
- **Buffer de Dados**: Armazenamento temporário durante interrupções
- **Monitoramento de Qualidade**: Otimização da escolha do canal

## 🔧 Implementação

### Hardware (Wokwi)

```
ESP32 DevKit:
- DHT22 → Pino 4
- Sensor Nível → Pino 34
- Sensor Vibração → Pino 35
- LCD SDA → Pino 21
- LCD SCL → Pino 22
```

### Software

#### Bibliotecas Utilizadas

```cpp
#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>
#include <LiquidCrystal_I2C.h>
```

#### Configuração de Rede

```cpp
const char* ssid = "Wokwi-GUEST";
const char* password = "";
const char* mqtt_server = "broker.hivemq.com";
```

### Node-RED

#### Fluxos Implementados

- **Entrada de Dados**: Recepção via MQTT e validação
- **Processamento de Alertas**: Análise com JavaScript
- **Gerenciamento de Estado**: Manutenção de alertas ativos
- **API REST**: Interface para sistemas externos

#### API REST

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/alertas` | GET | Lista todos os alertas ativos |
| `/alertas/:id` | DELETE | Remove alerta específico |

##  Configuração

### Pré-requisitos

- Ambiente Wokwi para simulação
- Node-RED instalado
- Broker MQTT (HiveMQ público ou local)

### Passos de Instalação

1. **Hardware**: Carregar projeto no Wokwi
2. **Firmware**: Upload do código para ESP32
3. **Node-RED**: Importar fluxos de processamento
4. **Testes**: Verificar comunicação MQTT

### Configurações Importantes

```cpp
// Intervalos de leitura
#define SENSOR_INTERVAL 5000  // 5 segundos

// Thresholds de alerta
#define WATER_LEVEL_THRESHOLD 80
#define TEMPERATURE_THRESHOLD 35
#define HUMIDITY_THRESHOLD 90
#define VIBRATION_THRESHOLD 70
```

##  Testes

### Testes de Funcionalidade

- ✅ Validação de operação de sensores
- ✅ Verificação de transmissão MQTT
- ✅ Geração de alertas com valores extremos

### Testes de Conectividade

- ✅ Alternância WiFi/Ethernet
- ✅ Reconexão automática
- ✅ Continuidade na transmissão

### Testes de Performance

- ✅ Medição de latência de alertas
- ✅ Capacidade de múltiplas streams
- ✅ Estabilidade em operação prolongada

## 📊 Considerações

### Escalabilidade

- Suporte a múltiplos dispositivos ESP32
- Hierarquia de tópicos MQTT organizizada
- Processamento distribuído no Node-RED

### Manutenibilidade

- Código modular e bem documentado
- Configuração flexível via constantes
- Monitoramento de saúde do sistema

### Segurança

- Possibilidade de implementar TLS/SSL
- Suporte à autenticação MQTT
- Validação rigorosa de dados

##  Futuras Melhorias

- [ ] Integração com serviços de meteorologia
- [ ] Machine Learning para predição avançada
- [ ] Integração com sistemas de emergência


**SafeDrop** - Prevenindo desastres, protegendo vidas. 🛡️


# SafeDrop - Backend Setup Guide

Guia para configurar e executar o backend do sistema SafeDrop, incluindo Node-RED para processamento de dados e simulação Arduino no Wokwi.

##  Componentes do Backend

- **ESP32 + Sensores** - Coleta de dados ambientais (simulado no Wokwi)
- **Node-RED** - Processamento de dados e API REST
- **MQTT** - Comunicação entre dispositivos (HiveMQ broker)

##  Como Executar o Backend

### Parte 1: Configuração do Node-RED

#### Instalação

1. **Instale o Node.js** (se não tiver):
   ```bash
   # Windows/Mac: Baixe do site oficial nodejs.org
   # Ubuntu/Debian:
   sudo apt update
   sudo apt install nodejs npm
   ```

2. **Instale o Node-RED globalmente:**
   ```bash
   npm install -g node-red
   ```

3. **Inicie o Node-RED:**
   ```bash
   node-red
   ```

4. **Acesse a interface web:**
   - Abra o navegador em: `http://localhost:1880`
   - Anote seu IP local (será necessário para conectar dispositivos externos)

#### Importação dos Flows

1. **Na interface do Node-RED:**
   - Clique no menu hamburger (☰) no canto superior direito
   - Selecione "Import"

2. **Importe o arquivo flows.json:**
   - Copie todo o conteúdo do arquivo `flows.json` fornecido
   - Cole na janela de importação do Node-RED
   - Clique em "Import"

3. **Configure o broker MQTT:**
   - Os flows já estão configurados para usar `broker.hivemq.com`
   - Se necessário, edite os nós MQTT para outro broker

4. **Deploy os flows:**
   - Clique no botão "Deploy" (vermelho) no canto superior direito
   - Aguarde confirmação de sucesso

### Parte 2: Simulação Arduino no Wokwi

#### Execute a Simulação

1. **Acesse o projeto no Wokwi:**
   ```
   https://wokwi.com/projects/432691229810454529
   ```

2. **Inicie a simulação:**
   - Clique no botão "Play" (▶️) para iniciar
   - O ESP32 conectará automaticamente ao WiFi
   - Os dados serão enviados via MQTT para o broker

3. **Monitore o funcionamento:**
   - **Serial Monitor:** Visualize logs de conexão e envio de dados
   - **Display LCD:** Mostra status do sistema em tempo real
   - **Potenciômetros:** Ajuste para simular diferentes condições

#### Configuração dos Sensores Simulados

- **Potenciômetro 1 (Nível de Água):** Simula sensor ultrassônico
- **Potenciômetro 2 (Vibração):** Simula sensor de vibração
- **DHT22:** Sensor de temperatura e umidade (valores automáticos)

##  API REST Disponível

Com o Node-RED rodando, a API estará disponível em:

**Base URL:** `http://localhost:1880` (ou `http://[SEU_IP]:1880`)

### Endpoints

#### 1. Listar Alertas
```http
GET /alertas
```

**Resposta de exemplo:**
```json
{
  "sucesso": true,
  "data": [
    {
      "id": "1701234567890",
      "titulo": "Alerta de Enchente",
      "descricao": "Nível de água elevado: 85%",
      "prioridade": "Alta",
      "data": "05/06/2025",
      "fonte": "IoT"
    }
  ]
}
```

#### 2. Remover Alerta
```http
DELETE /alertas/:id
```

### Testando a API

```bash
# Listar todos os alertas
curl -X GET http://localhost:1880/alertas

# Remover alerta específico
curl -X DELETE http://localhost:1880/alertas/1701234567890
```

##  Configuração dos Alertas

### Thresholds Automáticos

O sistema gera alertas baseado nos seguintes limites:

- **🌊 Enchente:** Nível de água > 80%
- **🌡️ Temperatura:** > 35°C  
- **💧 Umidade:** > 90% (risco de enchente)
- **📳 Vibração:** > 70%
- **🏗️ Tremor:** > 60%

### Tópicos MQTT

```
SafeDrop/Enchente/Nivel          - Dados de nível de água
SafeDrop/TemperaturaUmidade      - Dados de temp/umidade
SafeDrop/Vibracao                - Dados de vibração
SafeDrop/Tremores                - Dados de tremores
```

##  Teste End-to-End

### Fluxo Completo de Funcionamento

1. **Inicie o Node-RED:**
   ```bash
   node-red
   ```

2. **Execute a simulação no Wokwi**

3. **Gere um alerta:**
   - No Wokwi, ajuste um potenciômetro para valor alto
   - Observe no Serial Monitor o envio via MQTT
   - Verifique se o alerta aparece na API: `GET /alertas`

4. **Monitore no Node-RED:**
   - Vá para `http://localhost:1880`
   - Observe os nós MQTT recebendo dados
   - Verifique os logs de processamento

##  Monitoramento e Debug

### Node-RED Debug
- Use nós "debug" para visualizar dados MQTT
- Monitore o terminal onde executou `node-red`
- Verifique a aba "Debug" na interface web

### Wokwi Debug
- **Serial Monitor:** Logs detalhados do ESP32
- **Display LCD:** Status visual do sistema
- **Console do navegador:** Erros de simulação

### Logs Importantes
```bash
# Terminal Node-RED
[info] Started flows
[info] MQTT connected to broker.hivemq.com

# Serial Monitor Wokwi
WiFi conectado
Conectado ao broker MQTT
Enviado Enchente: {"nivel_agua": 75}
```

## 🌐 Descobrir IP Local

Para conectar dispositivos externos (como app mobile):

```bash
# Windows
ipconfig

# Linux/Mac  
ifconfig | grep inet

# Ou use
hostname -I
```

Configure dispositivos externos para acessar:
```
http://[SEU_IP]:1880/alertas
```

##  Solução de Problemas

### Node-RED não inicia
```bash
# Reinstale se necessário
npm uninstall -g node-red
npm install -g node-red
```

### MQTT não conecta
- Verifique conexão com internet
- Teste outro broker MQTT se necessário
- Confirme firewall não está bloqueando

### Wokwi não envia dados
- Reinicie a simulação
- Verifique se WiFi conectou no Serial Monitor
- Confirme configuração MQTT no código

### API não responde
- Confirme Node-RED rodando na porta 1880
- Verifique se flows foram deployados
- Teste com `curl` ou navegador

## ✅ Verificação Final

Sistema funcionando corretamente quando:

- ✅ Node-RED rodando em `http://localhost:1880`
- ✅ Wokwi enviando dados via MQTT  
- ✅ API REST respondendo em `/alertas`
- ✅ Alertas sendo gerados automaticamente
- ✅ Logs aparecem no Serial Monitor

##  Resumo dos Comandos

```bash
# 1. Instalar Node-RED
npm install -g node-red

# 2. Executar Node-RED
node-red

# 3. Testar API
curl http://localhost:1880/alertas

# 4. Descobrir IP local
ipconfig  # Windows
ifconfig  # Linux/Mac
```

O backend estará pronto para receber conexões de aplicações frontend (web, mobile, etc.)!