import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import KarinakasLogo from '../components/KarinakasLogo'
import { api } from '../services/api'

// Halaman tujuan tautan pemulihan kata sandi: /reset-password?token=...&email=...
// Keabsahan tautan diperiksa lebih dulu ke server agar pengguna tidak mengisi
// formulir yang sudah pasti ditolak.
function ResetPassword() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const token = params.get('token') || ''
  const email = params.get('email') || ''

  const [memeriksa, setMemeriksa] = useState(true)
  const [tautanSah, setTautanSah] = useState(false)
  const [pass,      setPass]      = useState('')
  const [confirm,   setConfirm]   = useState('')
  const [showPass,  setShowPass]  = useState(false)
  const [error,     setError]     = useState('')
  const [loading,   setLoading]   = useState(false)
  const [selesai,   setSelesai]   = useState(false)

  useEffect(() => {
    let aktif = true
    const periksa = async () => {
      if (!token || !email) {
        if (aktif) { setError('Tautan tidak lengkap. Silakan minta tautan baru dari halaman Lupa Kata Sandi.'); setMemeriksa(false) }
        return
      }
      try {
        await api.post('/reset-password/check', { token, email })
        if (aktif) { setTautanSah(true); setMemeriksa(false) }
      } catch (err) {
        if (aktif) { setError(err.message || 'Tautan tidak berlaku atau sudah kedaluwarsa.'); setMemeriksa(false) }
      }
    }
    periksa()
    return () => { aktif = false }
  }, [token, email])

  const simpan = async e => {
    e.preventDefault()
    setError('')
    if (pass.length < 8)  { setError('Kata sandi minimal 8 karakter.'); return }
    if (pass !== confirm) { setError('Konfirmasi kata sandi tidak cocok.'); return }
    setLoading(true)
    try {
      await api.post('/reset-password', {
        token,
        email,
        new_password: pass,
        new_password_confirmation: confirm,
      })
      setSelesai(true)
    } catch (err) {
      const pesan = err.message || 'Gagal menyimpan kata sandi baru.'
      setError(pesan)
      if (/tautan/i.test(pesan)) setTautanSah(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="lg-page">
      {/* Left visual */}
      <div className="lg-left">
        <div className="lg-orb lg-orb-1" /><div className="lg-orb lg-orb-2" /><div className="lg-orb lg-orb-3" />
        <div className="lg-dots" />
        <div className="lg-ring lg-ring-1"><span className="lg-ring-dot" /></div>
        <div className="lg-ring lg-ring-2" />
        <div className="lg-left-inner">
          <Link to="/" className="lg-brand">
            <KarinakasLogo size={46} className="lg-brand-logo" />
            <span>KARINAKAS</span>
          </Link>
          <div className="lg-left-hero">
            <h1 className="lg-left-title">Kata Sandi<br /><span className="lg-left-accent">Baru</span></h1>
            <p className="lg-left-desc">Buat kata sandi baru untuk akun {email || 'Anda'}.</p>
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="lg-right">
        <div className="lg-form-wrap">
          <div className="lg-form-brand"><KarinakasLogo size={30} className="me-2" /><span>KARINAKAS</span></div>

          {memeriksa && (
            <div className="rg-panel text-center">
              <span className="lg-spinner" />
              <p className="lg-welcome-sub mt-3">Memeriksa tautan...</p>
            </div>
          )}

          {!memeriksa && selesai && (
            <div className="rg-panel text-center">
              <div className="fp-success-icon"><i className="bi bi-check-circle-fill"></i></div>
              <h2 className="lg-welcome-title">Berhasil!</h2>
              <p className="lg-welcome-sub mb-4">Kata sandi Anda telah diperbarui. Silakan masuk dengan kata sandi baru.</p>
              <button className="lg-btn" onClick={() => navigate('/login')}>
                <span>Ke Halaman Masuk</span><i className="bi bi-box-arrow-in-right"></i>
              </button>
            </div>
          )}

          {!memeriksa && !selesai && !tautanSah && (
            <div className="rg-panel text-center">
              <div className="fp-success-icon" style={{ background: '#FFEBEE', color: '#C0392B' }}>
                <i className="bi bi-exclamation-triangle-fill"></i>
              </div>
              <h2 className="lg-welcome-title">Tautan Tidak Berlaku</h2>
              <p className="lg-welcome-sub mb-4">{error}</p>
              <button className="lg-btn" onClick={() => navigate('/forgot-password')}>
                <span>Minta Tautan Baru</span><i className="bi bi-arrow-right-circle-fill"></i>
              </button>
            </div>
          )}

          {!memeriksa && !selesai && tautanSah && (
            <form onSubmit={simpan} className="rg-panel">
              <div className="lg-welcome mb-3">
                <h2 className="lg-welcome-title">Kata Sandi Baru</h2>
                <p className="lg-welcome-sub">Untuk akun <strong>{email}</strong></p>
              </div>
              <div className="lg-field">
                <label className="lg-label">Kata Sandi Baru</label>
                <div className="lg-input-wrap">
                  <i className="bi bi-lock-fill lg-iicon"></i>
                  <input type={showPass ? 'text' : 'password'} className="lg-input lg-input-pr" placeholder="Minimal 8 karakter"
                    value={pass} onChange={e => setPass(e.target.value)} autoFocus />
                  <button type="button" className="lg-eye-btn" onClick={() => setShowPass(v => !v)} tabIndex={-1}>
                    <i className={`bi ${showPass ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
                  </button>
                </div>
              </div>
              <div className="lg-field">
                <label className="lg-label">Konfirmasi Kata Sandi</label>
                <div className="lg-input-wrap">
                  <i className="bi bi-lock-fill lg-iicon"></i>
                  <input type={showPass ? 'text' : 'password'} className="lg-input" placeholder="Ulangi kata sandi"
                    value={confirm} onChange={e => setConfirm(e.target.value)} />
                </div>
              </div>
              {error && <div className="lg-error"><i className="bi bi-exclamation-circle-fill me-2"></i>{error}</div>}
              <button type="submit" className={`lg-btn${loading ? ' loading' : ''}`} disabled={loading}>
                {loading ? <><span className="lg-spinner" /><span>Menyimpan...</span></> : <><i className="bi bi-check-circle-fill me-1"></i><span>Simpan Kata Sandi</span></>}
              </button>
            </form>
          )}

          <div className="lg-back-wrap mt-3">
            <Link to="/login" className="lg-back-link"><i className="bi bi-arrow-left me-1"></i>Kembali ke Masuk</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
