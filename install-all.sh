#!/bin/bash

echo "Iniciando a instalação de dependências..."

# Frontend
echo "Instalando dependências do frontend..."
cd frontend || exit
npm install
cd ..

# VaccineService
echo "Instalando dependências do backend..."
cd backend || exit
npm install
cd ..


echo "Instalação de dependências concluída!"
