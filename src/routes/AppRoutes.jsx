import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import HistoryPage from '../pages/HistoryPage';
import StatsPage from '../pages/StatsPage';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/home" element={<HomePage />} />

        <Route path="/history" element={<HistoryPage />} />
        
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/stats" element={<StatsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes
