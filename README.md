# Projeto

Aplicacao full stack para cadastro de usuarios, login com JWT e controle de remedios em um calendario.

## O que o projeto faz

- `front/`: interface React com Vite.
- `back/`: API em Express conectada ao MongoDB com Mongoose.
- Fluxo principal:
  - criar conta em `/signup`
  - fazer login em `/login`
  - visualizar, criar e editar remedios no calendario

## Tecnologias

### Frontend

- React 19
- React DOM 19
- React Router DOM 7
- Vite 7
- ESLint 9

### Backend

- Node.js
- Express 5
- Mongoose 9
- JSON Web Token
- bcryptjs
- nodemon

## Dependencias para rodar

Voce precisa ter instalado na maquina:

- Node.js
- npm
- acesso a um banco MongoDB

Dependencias do frontend em `front/package.json`:

- `react`
- `react-dom`
- `react-router-dom`
- `nvm`

Dependencias de desenvolvimento do frontend:

- `vite`
- `@vitejs/plugin-react`
- `eslint`
- `@eslint/js`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`
- `globals`
- `@types/react`
- `@types/react-dom`

Dependencias do backend em `back/package.json`:

- `express`
- `mongoose`
- `bcryptjs`
- `jsonwebtoken`
- `cors`
- `nodemon`

## Configuracao atual

- O backend sobe na porta `8080`.
- O frontend faz chamadas fixas para `http://localhost:8080`.
- A conexao com MongoDB esta definida em `back/help.js`.
- O segredo JWT esta hardcoded como `"secret"` no backend.

Hoje nao existe arquivo `.env`. Para rodar do jeito que o codigo esta, `back/help.js` precisa exportar uma string com a URI do MongoDB.

Exemplo:

```js
export default "mongodb://127.0.0.1:27017/farmacia";
```

## Como instalar

### 1. Instalar dependencias do backend

```bash
cd back
npm install
```

### 2. Instalar dependencias do frontend

```bash
cd front
npm install
```

## Como executar

### 1. Iniciar o backend

```bash
cd back
npm start
```

O script `npm start` executa `nodemon app.js`.

### 2. Iniciar o frontend

Em outro terminal:

```bash
cd front
npm run dev
```

Depois abra a URL mostrada pelo Vite, normalmente `http://localhost:5173`.

## Estrutura

```text
projeto/
├── back/
│   ├── app.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
└── front/
    ├── src/
    │   └── components/
    └── package.json
```

## Observacoes

- O frontend possui um `README.md` padrao do Vite em `front/README.md`.
- O backend depende de `back/help.js`; sem esse arquivo com uma URI valida do MongoDB, a API nao inicia.
- Para uso real, faz sentido mover a URI do MongoDB e o segredo JWT para variaveis de ambiente.
