# SafeDrop API 🚀

API REST para gerenciamento de abrigos, usuários e alertas em situações de emergência. Desenvolvida em Java com Spring Boot, com deploy na plataforma Render.

---

## 🎯 Sobre o Projeto

A SafeDrop API oferece suporte a sistemas de resposta rápida em cenários de desastres, permitindo:

- Cadastro e autenticação de usuários (cidadãos, voluntários e órgãos públicos)
- Gerenciamento de abrigos
- Check-ins e check-outs em abrigos
- Criação e acompanhamento de alertas
- Registro e listagem de ocorrências

---

## 👥 Equipe

* Membros da Equipe: 
* Afonso Correia Pereira - RM557863
* Adel Mouhaidly - RM557705
* Tiago Augusto Desiderato - RM558485

## 🛠️ Tecnologias Utilizadas

- Java 21
- Spring Boot 3.x
- Spring Security (JWT)
- Spring Data JPA
- Oracle Database
- Maven
- Docker
- Swagger/OpenAPI 3
- Bean Validation

---

## ⚡ Funcionalidades

### 🔐 Autenticação

- Registro e login de usuários com JWT
- Suporte a múltiplos perfis de acesso

### 👥 Usuários

- Cadastro, listagem, busca, atualização e exclusão

### 🏠 Abrigos

- Registro de abrigos com dados completos
- Listagem, busca por localização e status, atualização e remoção

### ✅ Check-ins

- Entrada e saída de abrigos
- Histórico completo por abrigo ou usuário

### 🚨 Alertas

- Criação de alertas
- Filtros por tipo e localização

### 📝 Ocorrências

- Registro de eventos ocorridos
- Associação com usuários

---

## 🌐 Links de Deploy

- API: https://safedropjavaapi.onrender.com  
- Swagger: https://safedropjavaapi.onrender.com/swagger-ui.html  
- Health: https://safedropjavaapi.onrender.com/actuator/health

Status: ✅ Ativa e funcional

---

## 🔧 Instalação e Execução

### Pré-requisitos

- Java 21+
- Maven 3.6+
- Oracle Database
- Docker (opcional)

### Local

```bash
git clone <url-do-repositorio>
cd safedrop
```

Crie um arquivo `.env` com as variáveis:

```properties
ORACLE_DB_URL=jdbc:oracle:thin:@oracle.fiap.com.br:1521/ORCL
ORACLE_DB_USERNAME=seu_usuario
ORACLE_DB_PASSWORD=sua_senha
JWT_SECRET=sua_chave_jwt
JWT_EXPIRATION=86400000
```

Execute a aplicação:

```bash
mvn spring-boot:run
```

### Docker

```bash
docker build -t safedrop-api .
docker run -p 8080:8080 \
  -e ORACLE_DB_URL=jdbc:oracle:thin:@oracle.fiap.com.br:1521/ORCL \
  -e ORACLE_DB_USERNAME=seu_usuario \
  -e ORACLE_DB_PASSWORD=sua_senha \
  safedrop-api
```

---

## 📚 Documentação da API

### Autenticação

```http
Authorization: Bearer <seu_jwt_token>
```

### Endpoints Principais

#### 🔐 Autenticação

| Método | Endpoint              | Descrição        |
|--------|-----------------------|------------------|
| POST   | /api/auth/login       | Login de usuário |
| POST   | /api/auth/registro    | Cadastro         |

#### 👥 Usuários

| Método | Endpoint              | Descrição               |
|--------|-----------------------|--------------------------|
| GET    | /api/usuarios         | Listar usuários          |
| GET    | /api/usuarios/{id}    | Buscar por ID            |
| PUT    | /api/usuarios/{id}    | Atualizar dados          |
| DELETE | /api/usuarios/{id}    | Deletar usuário          |

#### 🏠 Abrigos

| Método | Endpoint                   | Descrição                 |
|--------|----------------------------|----------------------------|
| POST   | /api/abrigos               | Criar abrigo               |
| GET    | /api/abrigos               | Listar abrigos             |
| GET    | /api/abrigos/ativos        | Buscar ativos              |
| GET    | /api/abrigos/localizacao   | Buscar por localização     |
| PUT    | /api/abrigos/{id}          | Atualizar abrigo           |
| DELETE | /api/abrigos/{id}          | Remover abrigo             |

#### ✅ Check-ins

| Método | Endpoint                       | Descrição                |
|--------|--------------------------------|---------------------------|
| POST   | /api/checkins/checkin          | Realizar check-in         |
| PUT    | /api/checkins/checkout/{id}    | Realizar check-out        |
| GET    | /api/checkins                  | Listar check-ins          |
| GET    | /api/checkins/usuario/{id}     | Por usuário               |
| GET    | /api/checkins/abrigo/{id}      | Por abrigo                |

#### 🚨 Alertas

| Método | Endpoint                     | Descrição              |
|--------|------------------------------|-------------------------|
| POST   | /api/alertas                 | Criar alerta            |
| GET    | /api/alertas                 | Listar alertas          |
| GET    | /api/alertas/tipo/{tipo}     | Buscar por tipo         |
| GET    | /api/alertas/localizacao     | Buscar por localizacao  |
| PUT    | /api/alertas/{id}            | Atualizar alerta        |
| DELETE | /api/alertas/{id}            | Deletar alerta          |

#### 📝 Ocorrências

| Método | Endpoint                           | Descrição                |
|--------|------------------------------------|---------------------------|
| POST   | /api/ocorrencias                   | Criar ocorrência          |
| GET    | /api/ocorrencias                   | Listar todas              |
| GET    | /api/ocorrencias/usuario/{id}      | Por usuário               |
| PUT    | /api/ocorrencias/{id}              | Atualizar ocorrência      |
| DELETE | /api/ocorrencias/{id}              | Deletar ocorrência        |

---

## 🧪 Exemplos de Uso

### 1. Registro

```bash
curl -X POST https://safedropjavaapi.onrender.com/api/auth/registro \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João",
    "email": "joao@email.com",
    "senha": "123456",
    "tipoUsuario": "cidadao"
}'
```

### 2. Login

```bash
curl -X POST https://safedropjavaapi.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@email.com",
    "senha": "123456"
}'
```

### 3. Criar Abrigo

```bash
curl -X POST https://safedropjavaapi.onrender.com/api/abrigos \
  -H "Authorization: Bearer <seu_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Abrigo A",
    "endereco": "Rua A, 123",
    "cidade": "SP",
    "estado": "SP",
    "capacidade": 150,
    "ativo": true
}'
```

---

## 🚀 Deploy Render

Variáveis no dashboard:

- `ORACLE_DB_URL`
- `ORACLE_DB_USERNAME`
- `ORACLE_DB_PASSWORD`
- `JWT_SECRET`
- `JWT_EXPIRATION`

Build:

```bash
mvn clean package -DskipTests
```

Start:

```bash
java -jar target/safedrop-0.0.1-SNAPSHOT.jar
```

---

