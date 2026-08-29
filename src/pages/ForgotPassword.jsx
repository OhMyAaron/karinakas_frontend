import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../services/api'

function ForgotPassword() {
  const navigate = useNavigate()
  const [step,    setStep]    = useState(1)
  const [email,   setEmail]   = useState('')
  const [inputOtp,setInputOtp]= useState('')
  const [pass,    setPass]    = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPass,setShowPass]= useState(false)
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  // Step 1 — minta kode OTP dikirim ke surel
  const sendOtp = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.post('/forgot-password', { email })
      setInputOtp('')
      setStep(2)
    } catch (err) {
      setError(err.message || 'Gagal mengirim kode. Pastikan email terdaftar & backend berjalan.')
    } finally {
      setLoading(false)
    }
  }

  // Step 2 — kode diverifikasi server bersamaan dengan penggantian sandi (langkah 3)
  const verifyOtp = e => {
    e.preventDefault()
    setError('')
    if (inputOtp.length !== 6) { setError('Masukkan 6 digit kode verifikasi.'); return }
    setStep(3)
  }

  // Step 3 — kirim kode + kata sandi baru ke server
  const resetPass = async e => {
    e.preventDefault()
    setError('')
    if (pass.length < 8) { setError('Kata sandi minimal 8 karakter.'); return }
    if (pass !== confirm) { setError('Konfirmasi tidak cocok.'); return }
    setLoading(true)
    try {
      await api.post('/reset-password', {
        email,
        otp: inputOtp,
        new_password: pass,
        new_password_confirmation: confirm,
      })
      setStep(4)
    } catch (err) {
      const pesan = err.message || 'Gagal menyimpan kata sandi baru.'
      setError(pesan)
      // Kode salah/kedaluwarsa → kembalikan ke langkah pengisian kode
      if (/kode|otp|kedaluwarsa/i.test(pesan)) setStep(2)
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
            <div className="lg-brand-box"><i className="bi bi-heart-fill"></i></div>
            <span>KARINAKAS</span>
          </Link>
          <div className="lg-left-hero">
            <h1 className="lg-left-title">Lupa<br /><span className="lg-left-accent">Kata Sandi?</span></h1>
            <p className="lg-left-desc">Tenang, kami bantu pulihkan akses akun Anda lewat verifikasi kode OTP.</p>
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="lg-right">
        <div className="lg-form-wrap">
          <div className="lg-form-brand"><i className="bi bi-heart-fill text-danger me-2"></i><span>KARINAKAS</span></div>

          {/* Step indicator */}
          <div className="rg-steps">
            {[1, 2, 3].map((n, i) => (
              <div key={n} className="d-flex align-items-center" style={{ flex: i < 2 ? 1 : 'unset' }}>
                <div className={`rg-step${step >= n ? ' active' : ''}`}>
                  <div className="rg-step-circle">{step > n ? <i className="bi bi-check2"></i> : n}</div>
                </div>
                {i < 2 && <div className={`rg-step-line${step > n ? ' filled' : ''}`} />}
              </div>
            ))}
          </div>

          {/* Step 1 — email */}
          {step === 1 && (
            <form onSubmit={sendOtp} className="rg-panel">
              <div className="lg-welcome mb-3">
                <h2 className="lg-welcome-title">Verifikasi Email</h2>
                <p className="lg-welcome-sub">Masukkan email akun Anda untuk menerima kode OTP</p>
              </div>
              <div className="lg-field">
                <label className="lg-label">Alamat Email</label>
                <div className="lg-input-wrap">
                  <i className="bi bi-envelope-fill lg-iicon"></i>
                  <input type="email" required className="lg-input" placeholder="nama@email.com" value={email} onChange={e => setEmail(e.target.value)} autoFocus />
                </div>
              </div>
              {error && <div className="lg-error"><i className="bi bi-exclamation-circle-fill me-2"></i>{error}</div>}
              <button type="submit" className={`lg-btn${loading ? ' loading' : ''}`} disabled={loading}>
                {loading ? <><span className="lg-spinner" /><span>Mengirim...</span></> : <><span>Kirim Kode OTP</span><i className="bi bi-send-fill"></i></>}
              </button>
            </form>
          )}

          {/* Step 2 — OTP */}
          {step === 2 && (
            <form onSubmit={verifyOtp} className="rg-panel">
              <div className="lg-welcome mb-3">
                <h2 className="lg-welcome-title">Masukkan OTP</h2>
                <p className="lg-welcome-sub">Kode 6 digit telah dikirim ke <strong>{email}</strong></p>
              </div>
              <div className="fp-otp-demo">
                <i className="bi bi-info-circle-fill me-2"></i>
                Kode berlaku <strong>10 menit</strong> dan hanya sekali pakai. Periksa juga folder spam.
              </div>
              <div className="lg-field">
                <label className="lg-label">Kode OTP</label>
                <div className="lg-input-wrap">
                  <i className="bi bi-shield-lock-fill lg-iicon"></i>
                  <input className="lg-input" placeholder="6 digit kode" maxLength={6} value={inputOtp}
                    onChange={e => setInputOtp(e.target.value.replace(/\D/g, ''))} autoFocus />
                </div>
              </div>
              {error && <div className="lg-error"><i className="bi bi-exclamation-circle-fill me-2"></i>{error}</div>}
              <button type="submit" className="lg-btn"><span>Verifikasi</span><i className="bi bi-arrow-right-circle-fill"></i></button>
              <button type="button" className="rg-back-btn" onClick={() => { setStep(1); setError('') }}><i className="bi bi-arrow-left me-1"></i>Ganti email</button>
            </form>
          )}

          {/* Step 3 — new password */}
          {step === 3 && (
            <form onSubmit={resetPass} className="rg-panel">
              <div className="lg-welcome mb-3">
                <h2 className="lg-welcome-title">Kata Sandi Baru</h2>
                <p className="lg-welcome-sub">Buat kata sandi baru untuk akun Anda</p>
              </div>
              <div className="lg-field">
                <label className="lg-label">Kata Sandi Baru</label>
                <div className="lg-input-wrap">
                  <i className="bi bi-lock-fill lg-iicon"></i>
                  <input type={showPass ? 'text' : 'password'} className="lg-input lg-input-pr" placeholder="Minimal 8 karakter" value={pass} onChange={e => setPass(e.target.value)} autoFocus />
                  <button type="button" className="lg-eye-btn" onClick={() => setShowPass(v => !v)} tabIndex={-1}><i className={`bi ${showPass ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i></button>
                </div>
              </div>
              <div className="lg-field">
                <label className="lg-label">Konfirmasi Kata Sandi</label>
                <div className="lg-input-wrap">
                  <i className="bi bi-lock-fill lg-iicon"></i>
                  <input type={showPass ? 'text' : 'password'} className="lg-input" placeholder="Ulangi kata sandi" value={confirm} onChange={e => setConfirm(e.target.value)} />
                </div>
              </div>
              {error && <div className="lg-error"><i className="bi bi-exclamation-circle-fill me-2"></i>{error}</div>}
              <button type="submit" className={`lg-btn${loading ? ' loading' : ''}`} disabled={loading}>
                {loading ? <><span className="lg-spinner" /><span>Menyimpan...</span></> : <><i className="bi bi-check-circle-fill me-1"></i><span>Simpan Kata Sandi</span></>}
              </button>
            </form>
          )}

          {/* Step 4 — done */}
          {step === 4 && (
            <div className="rg-panel text-center">
              <div className="fp-success-icon"><i className="bi bi-check-circle-fill"></i></div>
              <h2 className="lg-welcome-title">Berhasil!</h2>
              <p className="lg-welcome-sub mb-4">Kata sandi Anda telah diperbarui. Silakan masuk dengan kata sandi baru.</p>
              <button className="lg-btn" onClick={() => navigate('/login')}><span>Ke Halaman Masuk</span><i className="bi bi-box-arrow-in-right"></i></button>
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
