
import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'

// Public pages
import LandingPage from '../pages/LandingPage'
import MethodologyPage from '../pages/MethodologyPage'
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

// App pages
import MainLayout from '../layouts/MainLayout'
import HomePage from '../pages/HomePage'
import GoalsPage from '../pages/GoalsPage'
import FocusPage from '../pages/FocusPage'
import StatsPage from '../pages/StatsPage'
import HistoryPage from '../pages/HistoryPage'
import ProfilePage from '../pages/ProfilePage'
import DeepFocusPage from '../pages/DeepFocusMode'

const MainLayoutShell = () => (
  <MainLayout>
    <Outlet />
  </MainLayout>
)

const AppLayout = () => (
  <Routes>
    <Route path="/DeepFocus" element={<DeepFocusPage />} />
    <Route element={<MainLayoutShell />}>
      <Route path="/home" element={<HomePage />} />
      <Route path="/focus" element={<FocusPage />} />
      <Route path="/stats" element={<StatsPage />} />
      <Route path="/goals" element={<GoalsPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Route>
  </Routes>
)

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/methodology" element={<MethodologyPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/*" element={<AppLayout />} />
    </Routes>
  )
}

export default AppRoutes
