import { useEffect, useState } from 'react'
import VaccineCard from './components/VaccineCard';

function App() {
  const mockName = 'João da Silva';
  const mockAge = 30;
  const mockGender = 'Masculino';

  return (
    <div>
      <div>
        <h1>Nome: {mockName}</h1>
        <h2>Idade: {mockAge}</h2>
        <h2>Gênero: {mockGender}</h2>
      </div>

      <h1>🩺 Cartão de Vacinação</h1>
      <VaccineCard name={'defaultUser'}></VaccineCard>

    </div>
  );
}

export default App
