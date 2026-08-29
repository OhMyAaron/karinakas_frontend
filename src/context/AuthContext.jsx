import { createContext, useContext, useState, useEffect } from 'react'
import { api, setToken, getToken } from '../services/api'

const AuthContext = createContext(null)

// Backend (Laravel) → bentuk user yang dipakai frontend
function mapUser(u) {
  if (!u) return null
  return {
    id: u.id,
    name: u.nama_lengkap || u.email,
    email: u.email,
    username: u.username,
    // backend pakai 'super_admin', frontend pakai 'superadmin'
    role: u.role === 'super_admin' ? 'superadmin' : u.role,
    // field profil
    telepon: u.no_telepon || '',
    gender: u.jenis_kelamin || '',
    alamat: u.alamat || '',
    kota: u.kota || '',
    paroki: u.asal_paroki || '',
    tentang: u.tentang || '',
    raw: u,
  }
}

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  // Pulihkan sesi dari token saat reload
  useEffect(() => {
    let active = true
    async function init() {
      if (!getToken()) { setLoading(false); return }
      try {
        const res = await api.get('/me')
        if (active) setUser(mapUser(res.user))
      } catch {
        setToken(null) // token tidak valid
      } finally {
        if (active) setLoading(false)
      }
    }
    init()
    return () => { active = false }
  }, [])

  // identifier bisa email ATAU username
  async function login(identifier, password) {
    const payload = identifier.includes('@')
      ? { email: identifier, password }
      : { username: identifier, password }
    try {
      const res = await api.post('/login', payload)
      setToken(res.token)
      const u = mapUser(res.user)
      setUser(u)
      return { success: true, user: u }
    } catch (err) {
      return { success: false, error: err.message || 'Login gagal', network: err.network }
    }
  }

  // data sudah dalam format field backend (nama_lengkap, username, email, password, dst)
  async function register(data) {
    try {
      const res = await api.post('/register', data)
      setToken(res.token)
      const u = mapUser(res.user)
      setUser(u)
      return { success: true, user: u }
    } catch (err) {
      return { success: false, error: err.message || 'Registrasi gagal', network: err.network }
    }
  }

  async function logout() {
    try { await api.post('/logout') } catch { /* abaikan */ }
    setToken(null)
    setUser(null)
  }

  // data: { nama, telepon, gender, alamat, kota, paroki, tentang }
  async function updateProfile(data) {
    const payload = {
      nama_lengkap: data.nama,
      no_telepon: data.telepon,
      jenis_kelamin: data.gender || undefined,
      alamat: data.alamat,
      kota: data.kota,
      tentang: data.tentang,
      asal_paroki: data.paroki,
    }
    Object.keys(payload).forEach(k => (payload[k] === undefined || payload[k] === '') && delete payload[k])
    const res = await api.put('/profile', payload)
    const u = mapUser(res.user)
    setUser(u)
    return u
  }

  const isAdmin = user?.role === 'admin' || user?.role === 'superadmin'

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
