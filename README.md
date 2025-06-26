# Sistema de Gestão de Vacinação

Aplicação fullstack desenvolvida com React (frontend) e Node.js + Express (backend) para controle de vacinações pessoais e administração de vacinas e usuários.

## Funcionalidades

### Área do Usuário
- Login e cadastro com token JWT.
- Visualização das próprias vacinações.
- Busca por nome da suas vacinações.
- Edição e remoção das suas vacinações.
- Adição de nova vacinação com nome, dose e data.
- Visualização de todas as vacinas disponíveis.

### Área do Administrador
- Listagem e gerenciamento de usuários:
  - Edição da função (usuário/admin).
  - Exclusão de usuários.
- Listagem de todas as vacinas cadastradas.
- Adição de novas vacinas ao sistema.

### Interface
- Estilização com PrimeReact, PrimeIcons e Bootstrap.
- Sidebar fixa com navegação e ícones.
- Feedback de erros.

---

## Tecnologias Utilizadas

### Frontend
- React.js + Vite
- PrimeReact, PrimeIcons
- Bootstrap 5
- Axios
- React Router

### Backend
- Node.js + Express, CORS
- JWT para autenticação

---

## Como Rodar o Projeto
Execute o script shell na raiz do projeto para instalar todos os pacotes:
```bash
./install-all.sh
```

### 2. Executar os Microsserviços

Abra três terminais diferentes:

#### VaccineService
```bash
cd /backend
npm run start:vaccinesService
```

#### AuthenticationService
```bash
cd /backend
npm run start:authService
```

#### EventBus
```bash
cd /backend
npm run start:eventBus
```

---

### 3. Iniciar o Frontend

Abra outro terminal:

```bash
cd /frontend
npm run dev
```

Acesse em: [http://localhost:5173](http://localhost:5173)

---

### ⚡ 4. Executar Tudo de Uma Só Vez (VSCode)

Se estiver usando o VSCode, você pode executar todos os serviços simultaneamente:

```bash
Ctrl + Shift + P → Run Task → buildworkspace
```

---

## Usuários de Teste

Você pode cadastrar novos usuários pela tela de login e para parte de admin, utilizar o seguinte:

| Usuário   | Senha     |
|-----------|-----------|
| admin     | admin     |

---
