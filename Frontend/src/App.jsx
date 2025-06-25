import { useEffect, useState } from 'react'
import VaccineCard from './components/VaccineCard';
import LoginPage from './LoginPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'


function App() {
  const mockName = 'João da Silva';

  return (
    <div>
      <Routes>
        <Route path="/dashboard" element={<VaccineCard/>} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App
