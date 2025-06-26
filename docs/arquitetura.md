## Arquitetura do Projeto

O sistema é dividido em duas camadas principais:

- **Frontend (React)**  
  Interface do usuário, com rotas protegidas e integração via REST API.

- **Backend (Node.js/Express)**  
  API RESTful com autenticação JWT, utilizando um banco local no código.
  A escolha de utilizar esse tipo de banco foi devido ao jeito de entregar a tarefa,
  visando facilidade na hora de testar o projeto pedido. Em produção seria necessário
  guardar os dados em um banco persistente como mySQL ou Postgres

## Padrões de Projeto Utilizados

### Frontend

- **Componentização**: Separação em componentes reutilizáveis (`Button`, `Sidebar`, `VaccineCard`, etc).
- **Container + Presentation Pattern**: Separação entre lógica e apresentação para facilitar testes e manutenções.
- **Service Pattern**: Todos os acessos à API são centralizados em arquivos `clientXYZ.js` (como `clientVaccines.js`), facilitando reutilização e manutenção.
- **Roteamento Protegido**: Rota só acessível com token válido (ex: `/dashboard`, `/vaccines`, etc). Nesse caso, se o usuário não autenticado utilizar uma rota protegida, ele é redirecionado para a página de login.

### Backend

- **Microsserviços e Barramento**: Separação clara entre serviços distintos, com comunicação gerenciada por um barramentos de eventos próprio.
- **Service Layer**: Camada intermediária com as regras de negócio, situada em cada '/services' de cada microsserviço.
- **Middleware Pattern**: Funções reutilizáveis aplicadas em cadeia para tratar autenticação/ validações de entrada. Centralizadas na pasta '/middleware'.
- **JWT Authentication**: Tokens gerados no login e validados em cada requisição protegida.

---

## Autenticação com JWT

- Após login com sucesso, o servidor emite um **JWT (JSON Web Token)** com tempo de expiração.
- O token é armazenado no `localStorage` do navegador.
- Em cada requisição autenticada, o token é enviado via `Authorization: Bearer <token>`.
- Se o token for inválido ou expirado, o usuário é redirecionado para a tela de login.
- Backend usa middleware (`verifyToken`) para validar JWT antes de permitir acesso a rotas protegidas.

---

## Design de Interface

- Utilização do **PrimeReact** afim de obter componentes responsivos e facilitar a execução do projeto.
- Cores associadas à área da saúde (azul, verde, branco).
