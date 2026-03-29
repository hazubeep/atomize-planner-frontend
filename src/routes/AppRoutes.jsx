import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Public pages
import LandingPage from '../pages/LandingPage'
import MethodologyPage from '../pages/MethodologyPage'
import PricingPage from '../pages/PricingPage'
import RegisterPage from '../pages/RegisterPage'

// App pages
import MainLayout from '../layouts/MainLayout'
import HomePage from '../pages/HomePage'
import GoalsPage from '../pages/GoalsPage'
import FocusPage from '../pages/FocusPage'
import StatsPage from '../pages/StatsPage'
import HistoryPage from '../pages/HistoryPage'
import ProfilePage from '../pages/ProfilePage'
import DeepFocusPage from '../pages/DeepFocusMode'

const AppLayout = () => (
  <MainLayout>
    <Routes>
      <Route path="home" element={<HomePage />} />
      <Route path="focus" element={<FocusPage />} />
      <Route path="stats" element={<StatsPage />} />
      <Route path="goals" element={<GoalsPage />} />
      <Route path="history" element={<HistoryPage />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="DeepFocus" element={<DeepFocusPage/>} />
    </Routes>
  </MainLayout>
)

const AppRoutes = () => {
  return (
      <Routes>

        {/* Landing jadi halaman awal */}
        <Route path="/" element={<LandingPage />} />

        {/* Public */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/methodology" element={<MethodologyPage />} />
        <Route path="/pricing" element={<PricingPage />} />

        {/* App */}
        <Route path="/*" element={<AppLayout />} />

      </Routes>
  )
}

export default AppRoutes