import { useState } from 'react'
import { Link } from 'react-router-dom'
import KarinakasLogo from '../components/KarinakasLogo'
import { api } from '../services/api'

// Pemulihan kata sandi memakai TAUTAN sekali pakai yang dikirim ke surel.
// Halaman ini hanya meminta alamat surel; kata sandi barunya diisi pada
// halaman ResetPassword yang dibuka dari tautan tersebut.
function ForgotPassword() {
  const [email,   setEmail]   = useState('')
  const [terkirim, setTerkirim] = useState(false)
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const kirimTautan = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.post('/forgot-password', { email })
      setTerkirim(true)
    } catch (err) {
      setError(err.message || 'Gagal mengirim tautan. Pastikan email terdaftar.')
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
            <h1 className="lg-left-title">Lupa<br /><span className="lg-left-accent">Kata Sandi?</span></h1>
            <p className="lg-left-desc">Tenang, kami kirimkan tautan penyetelan ulang ke email Anda.</p>
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="lg-right">
        <div className="lg-form-wrap">
          <div className="lg-form-brand"><KarinakasLogo size={30} className="me-2" /><span>KARINAKAS</span></div>

          {!terkirim ? (
            <form onSubmit={kirimTautan} className="rg-panel">
              <div className="lg-welcome mb-3">
                <h2 className="lg-welcome-title">Pemulihan Kata Sandi</h2>
                <p className="lg-welcome-sub">Masukkan email akun Anda. Kami kirimkan tautan untuk membuat kata sandi baru.</p>
              </div>
              <div className="lg-field">
                <label className="lg-label">Alamat Email</label>
                <div className="lg-input-wrap">
                  <i className="bi bi-envelope-fill lg-iicon"></i>
                  <input type="email" required className="lg-input" placeholder="nama@email.com" value={email}
                    onChange={e => setEmail(e.target.value)} autoFocus />
                </div>
              </div>
              {error && <div className="lg-error"><i className="bi bi-exclamation-circle-fill me-2"></i>{error}</div>}
              <button type="submit" className={`lg-btn${loading ? ' loading' : ''}`} disabled={loading}>
                {loading ? <><span className="lg-spinner" /><span>Mengirim...</span></> : <><span>Kirim Tautan</span><i className="bi bi-send-fill"></i></>}
              </button>
            </form>
          ) : (
            <div className="rg-panel text-center">
              <div className="fp-success-icon"><i className="bi bi-envelope-check-fill"></i></div>
              <h2 className="lg-welcome-title">Periksa Email Anda</h2>
              <p className="lg-welcome-sub mb-3">
                Tautan penyetelan ulang kata sandi sudah dikirim ke <strong>{email}</strong>.
              </p>
              <div className="fp-otp-demo text-start">
                <i className="bi bi-info-circle-fill me-2"></i>
                Tautan berlaku <strong>60 menit</strong> dan hanya sekali pakai. Bila tidak ditemukan,
                periksa juga folder spam atau promosi.
              </div>
              <button className="lg-btn mt-3" onClick={() => { setTerkirim(false); setError('') }}>
                <i className="bi bi-arrow-repeat me-1"></i><span>Kirim Ulang Tautan</span>
              </button>
            </div>
          )}

          <div className="lg-back-wrap mt-3">
            <Link to="/login" className="lg-back-link"><i className="bi bi-arrow-left me-1"></i>Kembali ke Masuk</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
