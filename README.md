# SafeDrop

## 🌪 Descrição do Desafio / Problema

Nos últimos anos, desastres naturais como enchentes, deslizamentos de terra, secas severas e ondas de calor têm se tornado cada vez mais frequentes e intensos no Brasil e em diversas partes do mundo. Esses eventos extremos atingem de forma desproporcional as comunidades mais vulneráveis, especialmente aquelas localizadas em áreas de risco e que vivem à margem do acesso a infraestrutura básica, tecnologias de comunicação e conexão com a internet.

Nessas regiões, a população frequentemente enfrenta limitações significativas para se proteger, buscar ajuda ou acessar informações confiáveis em tempo real. Durante a ocorrência desses eventos, a ausência de sistemas de comunicação eficazes, a desorganização logística das respostas emergenciais e a carência de dados atualizados agravam substancialmente os impactos dos desastres. A evacuação de pessoas torna-se caótica, o envio de socorro é dificultado e o direcionamento da população para abrigos temporários seguros é comprometido.

Além disso, órgãos públicos e organizações voluntárias enfrentam sérias dificuldades operacionais, muitas vezes lidando com sistemas fragmentados, mapas de risco desatualizados e dados de sensores distribuídos de forma não integrada, o que compromete a tomada de decisões estratégicas em momentos críticos.

##  Nossa Solução: SafeDrop

A SafeDrop é uma plataforma integrada e inteligente voltada à gestão de emergências em desastres naturais extremos. Desenvolvida com tecnologias modernas, a solução é composta por:

- Um aplicativo mobile para cidadãos e voluntários;
- Um painel administrativo web para autoridades públicas e ONGs;
- Uma infraestrutura de backend robusta;
- E a integração com sensores IoT para alertas em tempo real.

A plataforma tem como foco a organização, agilidade e segurança durante eventos extremos, com funcionalidades que facilitam a evacuação, localização de abrigos, emissão de alertas e coordenação entre a comunidade e agentes públicos.

##  Principais Funcionalidades da Plataforma

###  Tela de Ocorrência
Permite que usuários em situação de risco registrem uma ocorrência, como deslizamentos, enchentes ou falta de acesso a recursos essenciais.

Essas ocorrências ficam disponíveis para visualização pública, podendo ser acessadas por voluntários, órgãos como a Defesa Civil ou outros cidadãos dispostos a ajudar.

Funciona como um sistema de ajuda comunitária colaborativa.

###  Tela de Abrigos
Exibe abrigos próximos com informações detalhadas, como:
- Capacidade total
- Quantidade de vagas disponíveis
- Localização exata no mapa

Ajuda a população a encontrar refúgios seguros em situações de emergência.

###  Tela de Mapa Interativo
Renderiza os abrigos e ocorrências em tempo real no mapa.

Permite traçar rotas seguras de evacuação, com base na posição do usuário e nas condições atuais.

Facilita o planejamento logístico e o deslocamento seguro das pessoas.

###  Tela de Alertas (Sensores IoT)
Mostra o status dos sensores instalados em áreas de risco.

Em caso de irregularidades, como aumento repentino de umidade ou tremores, o sistema emite alertas automáticos para o painel web e o aplicativo.

Essa automação permite respostas rápidas e organizadas a eventos críticos.

##  Implementações Técnicas

###  Backend – Java + Oracle SQL
A lógica central da aplicação é implementada em Java (Spring Boot).

Autenticação de usuários (login, registro) e o registro e gerenciamento de ocorrências são manipulados no backend.

A persistência de dados utiliza Oracle SQL, garantindo robustez e confiabilidade nas operações.

###  Abrigos e Mapa – Dados Mockados + Frontend Interativo
As informações dos abrigos e a renderização dos mapas utilizam dados mockados durante o desenvolvimento.

A interface é interativa, construída com Next.js e React, e integra os dados para simular a visualização dinâmica dos pontos de abrigo e ocorrências.

###  Alertas – ESP32 + MQTT + Node-RED
O monitoramento de alertas é realizado com sensores conectados a um ESP32, que envia dados via MQTT.

Um fluxo no Node-RED orquestra esses dados e os disponibiliza por meio de uma API REST, que é consumida pela aplicação web para mostrar os alertas em tempo real.

A detecção de anomalias aciona notificações automáticas, alertando rapidamente os usuários e gestores.

##  Público-Alvo e Impacto

A SafeDrop é projetada para atender múltiplos perfis:

**Cidadãos vulneráveis**: recebem alertas, acessam rotas de fuga e encontram abrigos próximos mesmo sem internet, utilizando tecnologias como QR Code e Bluetooth (P2P).

**Voluntários**: acessam as ocorrências para oferecer ajuda de forma rápida e coordenada.

**Órgãos públicos e ONGs**: utilizam o painel administrativo com dados atualizados em tempo real para otimizar decisões e recursos.

Com foco na coordenação comunitária, interação entre atores sociais e uso de tecnologias acessíveis, a SafeDrop oferece uma abordagem inovadora, integrada e prática para salvar vidas em momentos de crise.

##  Integrantes

- Adel Mouhaidly - RM557705 - 2TDSA
- Afonso Correia Pereira - RM557863 - 2TDSA
- Tiago Augusto Desiderato Ferro - RM558485 - 2TDSA


---
