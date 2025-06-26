# Rotas da API - VaccineService

# Rotas - VaccinesRoutes
## GET /vaccines

Reinvindica todas as vacinas presentes no banco.

## POST /vaccines/add

Adiciona uma nova vacina, sendo uma rota utilizada somente para administradores.

**Body:**
```json
{
  "name": "COVID-19"
}
```

# Rotas - VaccinationsRoutes

## GET /vaccinations
    
Resgata todas as vacinações de um usuário presentes no banco.
**Body:**
```json
{
  "username": "usuário1"
}
```

## GET /vaccinations/search

Resgata todas as vacinações de um usuário presentes no banco que contenham o termo de busca.

**Body:**
```json
{
  "username": "usuário1",
  "searchTerm": "COVI",    
}
```

## POST /vaccinations/add

Adiciona uma nova vacinação na conta do usuário.

**Body:**
```json
{
  "name": "COVID-19",
  "dose": "1a dose",
  "date": "22-01-2025"
}
```

## PUT /vaccinations/update/:id

Atualiza dados de uma vacinação de um usuário.

**Body:**
```json
{
  "username": "usuario1",
  "idVaccine": 1,
  "vaccine":
  {
    "name": "COVID-19",
    "dose": "1a dose",
    "date": "22-01-2025"
  }
}
```

## PUT /vaccinations/delete/:id

Deleta dados de uma vacinação de um usuário.

**Body:**
```json
{
  "username": "usuario1",
  "idVaccine": 1
}
```
