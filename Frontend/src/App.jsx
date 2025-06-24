import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import VaccineCard from './components/VaccineCard';

function App() {
  const mockName = 'João da Silva';
  const mockAge = 30;
  const mockGender = 'Masculino';

  const [vacinas, setVacinas] = useState([
    {
      id: 1,
      nome: 'COVID-19',
      data: '2023-05-10',
      dose: '1ª Dose',
    },
    {
      id: 2,
      nome: 'Hepatite B',
      data: '2023-06-20',
      dose: '2ª Dose',
    },
  ]);

  const handleDelete = (id) => {
    setVacinas(vacinas.filter((vacina) => vacina.id !== id));
  };

  return (
    <div>
      <div>
        <h1>Nome: {mockName}</h1>
        <h2>Idade: {mockAge}</h2>
        <h2>Gênero: {mockGender}</h2>
      </div>

      <h1>🩺 Cartão de Vacinação</h1>
      <VaccineCard name={'leo'}></VaccineCard>

    </div>
  );
}

export default App
