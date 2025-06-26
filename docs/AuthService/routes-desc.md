# Rotas da API - AuthenticationService

# Rotas - AuthRoutes
## POST /auth/login

Autentica usuário.

**Body:**
```json
{
  "username": "admin",
  "password": "123456"
}
```

## POST /auth/register

Registra o usuário.

**Body:**
```json
{
  "username": "admin",
  "password": "123456"
}
```

# Rotas - UserRoutes (/users)

## GET /username
    
Devolve todos os nomes de usuários presentes no banco.

## PATCH /:username

Atualiza o cargo do usuário dependendo do "role" recebida.

**Body:**
```json
{
  "username": "usuário1",    
  "role": "admin"
}
```

## DELETE /:username

Deleta o usuário requisitado, posteriormente requisitando a deleção do respectivo cartão de vacinação.

**Body:**
```json
{
  "username": "usuário1",    
}
```

