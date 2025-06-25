import { useEffect, useState } from 'react'
import VaccineCard from './VaccineCard';
import LoginPage from './LoginPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './datatable-grid.css'
import { MainPage } from './MainPage';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<MainPage/>} />
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
