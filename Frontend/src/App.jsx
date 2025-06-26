import { useEffect, useState } from 'react'
import LoginPage from './LoginPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './components/datatable-grid.css'
import { MainPage } from './MainPage';
import { AdminPage } from './AdminPage';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<MainPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
