import { useState } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import IntroScreen from './components/IntroScreen'
import Home from './pages/Home'
import TentangKami from './pages/TentangKami'
import Galeri from './pages/Galeri'
import Kegiatan from './pages/Kegiatan'
import Berita from './pages/Berita'
import BeritaDetail from './pages/BeritaDetail'
import Kontak from './pages/Kontak'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import AdminDashboard from './pages/AdminDashboard'
import Donasi from './pages/Donasi'
import DaftarRelawan from './pages/DaftarRelawan'
import Profil from './pages/Profil'
import { useAuth } from './context/AuthContext'

function AuthLoading() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="lg-spinner" style={{ borderTopColor: '#C0392B', width: 32, height: 32, borderWidth: 3 }} />
    </div>
  )
}

function RequireAuth({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()
  if (loading) return <AuthLoading />
  // Simpan tujuan agar setelah login user dikembalikan ke halaman ini
  if (!user) return <Navigate to="/login" state={{ from: location.pathname + location.search }} replace />
  return children
}

function RequireAdmin({ children }) {
  const { user, loading, isAdmin } = useAuth()
  if (loading)  return <AuthLoading />
  if (!user)    return <Navigate to="/login" replace />
  if (!isAdmin) return <Navigate to="/"      replace />
  return children
}

// Admin & Super Admin difokuskan ke panel admin — tak boleh membuka
// tampilan publik/pengguna biasa. Selalu diarahkan ke /admin.
function BlockAdmin({ children }) {
  const { isAdmin } = useAuth()
  return isAdmin ? <Navigate to="/admin" replace /> : children
}

function App() {
  const { pathname } = useLocation()
  const { isAdmin } = useAuth()
  const isFullPage = pathname === '/login' || pathname === '/register' || pathname === '/forgot-password' || pathname.startsWith('/admin')

  // Layar intro/selamat datang — tampil sekali per sesi, dilewati untuk
  // halaman auth/admin (mis. akses via tautan langsung).
  const [showIntro, setShowIntro] = useState(() => {
    try { return !sessionStorage.getItem('kk_intro_seen') } catch { return true }
  })
  const enterSite = () => {
    try { sessionStorage.setItem('kk_intro_seen', '1') } catch { /* abaikan */ }
    setShowIntro(false)
  }

  // Intro hanya untuk pengunjung/pengguna biasa — admin langsung ke panel
  if (showIntro && !isFullPage && !isAdmin) {
    return <IntroScreen onEnter={enterSite} />
  }

  return (
    <>
      {!isFullPage && <Navbar />}
      <Routes>
        <Route path="/"               element={<BlockAdmin><Home /></BlockAdmin>} />
        <Route path="/tentang-kami"   element={<BlockAdmin><TentangKami /></BlockAdmin>} />
        <Route path="/galeri"         element={<BlockAdmin><Galeri /></BlockAdmin>} />
        <Route path="/kegiatan"       element={<BlockAdmin><Kegiatan /></BlockAdmin>} />
        <Route path="/berita"         element={<BlockAdmin><Berita /></BlockAdmin>} />
        <Route path="/berita/:id"     element={<BlockAdmin><BeritaDetail /></BlockAdmin>} />
        <Route path="/kontak"         element={<BlockAdmin><Kontak /></BlockAdmin>} />
        <Route path="/login"          element={<Login />} />
        <Route path="/register"       element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin"          element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
        <Route path="/donasi"         element={<RequireAuth><BlockAdmin><Donasi /></BlockAdmin></RequireAuth>} />
        <Route path="/daftar-relawan" element={<RequireAuth><BlockAdmin><DaftarRelawan /></BlockAdmin></RequireAuth>} />
        <Route path="/profil"         element={<RequireAuth><BlockAdmin><Profil /></BlockAdmin></RequireAuth>} />
      </Routes>
      {!isFullPage && <Footer />}
    </>
  )
}

export default App
