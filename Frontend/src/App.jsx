import { useEffect, useState } from 'react'
import VaccineCard from './components/VaccineCard';
import LoginPage from './LoginPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './datatable-grid.css'


function App() {
  const mockName = 'defaultUser'; // Mock username for testing

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<VaccineCard name={mockName} />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
