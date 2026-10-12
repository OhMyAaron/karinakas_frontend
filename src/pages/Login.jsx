import { useState, useEffect, Fragment } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import KarinakasLogo from '../components/KarinakasLogo'
import { useAuth } from '../context/AuthContext'
import { STATISTIK, fmtStatistik } from '../data/lembaga'

const features = [
  ['bi-heart-fill',             'Donasi Online Mudah'],
  ['bi-person-heart',           'Daftar Jadi Relawan'],
  ['bi-grid-fill',              'Dashboard Admin'],
  ['bi-bar-chart-fill',         'Laporan & Statistik'],
]

function Login() {
  const { user, isAdmin, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Halaman tujuan sebelum diminta login (mis. /donasi, /daftar-relawan)
  const from = location.state?.from || '/'

  const [showPass,    setShowPass]    = useState(false)
  const [loading,     setLoading]     = useState(false)
  const [error,       setError]       = useState('')
  const [noAccount,   setNoAccount]   = useState(false)
  const [form, setForm] = useState({ email: '', password: '', remember: false })

  useEffect(() => {
    if (user) navigate(isAdmin ? '/admin' : from, { replace: true })
  }, [user, isAdmin, navigate, from])

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setNoAccount(false)
    const result = await login(form.email, form.password)
    if (!result.success) {
      setError(result.error)
      setNoAccount(!!result.noAccount)
      setLoading(false)
      return
    }
    // User biasa → kembali ke halaman tujuan; admin → panel admin
    navigate(result.user.role === 'user' ? from : '/admin', { replace: true })
  }

  return (
    <div className="lg-page">

      {/* ── Left Visual Panel ── */}
      <div className="lg-left">
        <div className="lg-orb lg-orb-1" />
        <div className="lg-orb lg-orb-2" />
        <div className="lg-orb lg-orb-3" />
        <div className="lg-dots" />
        <div className="lg-ring lg-ring-1"><span className="lg-ring-dot" /></div>
        <div className="lg-ring lg-ring-2" />

        <div className="lg-left-inner">
          <Link to="/" className="lg-brand">
            <KarinakasLogo size={46} className="lg-brand-logo" />
            <span>KARINAKAS</span>
          </Link>

          <div className="lg-left-hero">
            <h1 className="lg-left-title">
              Masuk &<br />
              <span className="lg-left-accent">Bergabung</span>
            </h1>
            <p className="lg-left-desc">
              Daftarkan diri sebagai relawan, akses fitur donasi, atau kelola
              organisasi dari panel admin Karinakas.
            </p>
          </div>

          <ul className="lg-features">
            {features.map(([icon, label]) => (
              <li key={label} className="lg-feature-item">
                <div className="lg-feature-icon"><i className={`bi ${icon}`}></i></div>
                <span>{label}</span>
              </li>
            ))}
          </ul>

          <div className="lg-left-stats">
            {[STATISTIK.penerimaManfaat, STATISTIK.kegiatan, STATISTIK.tahun].map((s, i) => (
              <Fragment key={s.label}>
                {i > 0 && <div className="lg-stat-sep" />}
                <div className="lg-stat">
                  <span className="lg-stat-num">{fmtStatistik(s)}</span>
                  <span className="lg-stat-lbl">{s.label}</span>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Form Panel ── */}
      <div className="lg-right">
        <div className="lg-form-wrap">

          <div className="lg-form-brand">
            <KarinakasLogo size={30} className="me-2" />
            <span>KARINAKAS</span>
          </div>

          <div className="lg-welcome" style={{ animationDelay: '0.04s' }}>
            <h2 className="lg-welcome-title">Selamat Datang</h2>
            <p className="lg-welcome-sub">Akses platform Karinakas sesuai peranmu</p>
          </div>

          <form onSubmit={handleSubmit} className="lg-form" noValidate>

            <div className="lg-field" style={{ animationDelay: '0.1s' }}>
              <label className="lg-label">Email atau Username</label>
              <div className="lg-input-wrap">
                <i className="bi bi-person-fill lg-iicon"></i>
                <input
                  type="text"
                  className="lg-input"
                  placeholder="nama@email.com atau username"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="lg-field" style={{ animationDelay: '0.17s' }}>
              <label className="lg-label">Kata Sandi</label>
              <div className="lg-input-wrap">
                <i className="bi bi-lock-fill lg-iicon"></i>
                <input
                  type={showPass ? 'text' : 'password'}
                  className="lg-input lg-input-pr"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="lg-eye-btn"
                  onClick={() => setShowPass(v => !v)}
                  tabIndex={-1}
                >
                  <i className={`bi ${showPass ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
                </button>
              </div>
            </div>

            {error && (
              <div className="lg-error">
                <i className="bi bi-exclamation-circle-fill me-2"></i>
                {error}
                {noAccount && (
                  <> — <Link to="/register" className="lg-error-link">Daftar sekarang</Link></>
                )}
              </div>
            )}

            <div className="lg-opts-row" style={{ animationDelay: '0.23s' }}>
              <label className="lg-check-label">
                <input
                  type="checkbox"
                  className="lg-checkbox"
                  checked={form.remember}
                  onChange={e => setForm(f => ({ ...f, remember: e.target.checked }))}
                />
                <span className={`lg-checkmark${form.remember ? ' checked' : ''}`}>
                  {form.remember && <i className="bi bi-check2"></i>}
                </span>
                <span>Ingat saya</span>
              </label>
              <Link to="/forgot-password" className="lg-forgot">Lupa kata sandi?</Link>
            </div>

            <button
              type="submit"
              className={`lg-btn${loading ? ' loading' : ''}`}
              disabled={loading}
              style={{ animationDelay: '0.3s' }}
            >
              {loading ? (
                <><span className="lg-spinner" /><span>Memproses...</span></>
              ) : (
                <><span>Masuk Sekarang</span><i className="bi bi-arrow-right-circle-fill"></i></>
              )}
            </button>

          </form>

          <p className="rg-prompt" style={{ animationDelay: '0.37s' }}>
            Belum punya akun?{' '}
            <Link to="/register" className="rg-prompt-link">Daftar di sini</Link>
          </p>

          <div className="lg-back-wrap" style={{ animationDelay: '0.4s' }}>
            <Link to="/" className="lg-back-link">
              <i className="bi bi-arrow-left me-1"></i>Kembali ke Beranda
            </Link>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Login
