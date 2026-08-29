import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const features = [
  ['bi-heart-fill',        'Donasi ke program pilihan'],
  ['bi-person-heart',      'Daftar jadi relawan aktif'],
  ['bi-bell-fill',         'Notifikasi kegiatan terbaru'],
  ['bi-shield-check-fill', 'Data pribadi aman terlindungi'],
]

function getStrength(p) {
  if (!p) return { level: 0, label: '', color: '#e0e0e0' }
  if (p.length < 8)  return { level: 1, label: 'Lemah',        color: '#C0392B' }
  if (p.length < 10) return { level: 2, label: 'Cukup',        color: '#d97000' }
  const mixed = /[A-Z]/.test(p) && /[0-9]/.test(p)
  if (mixed)         return { level: 4, label: 'Sangat Kuat',  color: '#1a6b3a' }
  return               { level: 3, label: 'Kuat',          color: '#1d4ed8' }
}

// Hitung usia dari tanggal lahir
function calcUsia(tgl) {
  if (!tgl) return null
  const b = new Date(tgl)
  if (isNaN(b)) return null
  const now = new Date()
  let age = now.getFullYear() - b.getFullYear()
  const m = now.getMonth() - b.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < b.getDate())) age--
  return age >= 0 ? age : null
}

const empty = {
  nama: '', username: '', email: '', gender: '', tanggalLahir: '', telepon: '',
  alamat: '', kota: '', paroki: '', password: '', confirm: '', agree: false,
}

function Register() {
  const { user, isAdmin, register: authRegister } = useAuth()
  const navigate = useNavigate()

  const [step,        setStep]        = useState(1)
  const [loading,     setLoading]     = useState(false)
  const [error,       setError]       = useState('')
  const [showPass,    setShowPass]    = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [form, setForm] = useState(empty)

  useEffect(() => {
    if (user) navigate(isAdmin ? '/admin' : '/', { replace: true })
  }, [user, isAdmin, navigate])

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))
  const strength       = getStrength(form.password)
  const passwordsMatch = form.password && form.confirm && form.password === form.confirm
  const usia           = calcUsia(form.tanggalLahir)

  const handleStep1 = e => {
    e.preventDefault()
    setError('')
    if (form.nama.trim().length < 2)     { setError('Nama minimal 2 karakter.'); return }
    if (form.username.trim().length < 3) { setError('Username minimal 3 karakter.'); return }
    setStep(2)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (form.password.length < 8)       { setError('Kata sandi minimal 8 karakter.'); return }
    if (form.password !== form.confirm)  { setError('Konfirmasi kata sandi tidak cocok.'); return }
    if (!form.agree)                     { setError('Setujui syarat & ketentuan terlebih dahulu.'); return }

    setLoading(true)
    setError('')

    const payload = {
      nama_lengkap: form.nama.trim(),
      username: form.username.trim(),
      email: form.email.trim(),
      password: form.password,
      jenis_kelamin: form.gender || undefined,
      tanggal_lahir: form.tanggalLahir || undefined,
      usia: usia ?? undefined,
      no_telepon: form.telepon || undefined,
      alamat: form.alamat || undefined,
      kota: form.kota || undefined,
      asal_paroki: form.paroki || undefined,
    }
    Object.keys(payload).forEach(k => payload[k] === undefined && delete payload[k])

    const result = await authRegister(payload)
    if (!result.success) {
      setError(result.error)
      setLoading(false)
      return
    }
    navigate('/', { replace: true })
  }

  return (
    <div className="lg-page">

      {/* ── Left Visual Panel ── */}
      <div className="lg-left rg-left">
        <div className="lg-orb lg-orb-1" style={{ background: 'rgba(255,120,80,0.28)' }} />
        <div className="lg-orb lg-orb-2" style={{ background: 'rgba(255,215,0,0.2)' }} />
        <div className="lg-orb lg-orb-3" style={{ background: 'rgba(255,180,80,0.22)' }} />
        <div className="lg-dots" />
        <div className="lg-ring lg-ring-1"><span className="lg-ring-dot" /></div>
        <div className="lg-ring lg-ring-2" />

        <div className="lg-left-inner">
          <Link to="/" className="lg-brand">
            <div className="lg-brand-box"><i className="bi bi-heart-fill"></i></div>
            <span>KARINAKAS</span>
          </Link>

          <div className="lg-left-hero">
            <h1 className="lg-left-title">
              Buat Akun &<br />
              <span className="lg-left-accent">Mulai Berbagi</span>
            </h1>
            <p className="lg-left-desc">
              Bergabunglah bersama ribuan orang yang sudah berkontribusi
              untuk perubahan nyata bersama Karinakas.
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
            <div className="lg-stat"><span className="lg-stat-num">847+</span><span className="lg-stat-lbl">Relawan Aktif</span></div>
            <div className="lg-stat-sep" />
            <div className="lg-stat"><span className="lg-stat-num">120+</span><span className="lg-stat-lbl">Program Aktif</span></div>
            <div className="lg-stat-sep" />
            <div className="lg-stat"><span className="lg-stat-num">5K+</span><span className="lg-stat-lbl">Penerima Manfaat</span></div>
          </div>
        </div>
      </div>

      {/* ── Right Form Panel ── */}
      <div className="lg-right">
        <div className="lg-form-wrap">

          <div className="lg-form-brand">
            <i className="bi bi-heart-fill text-danger me-2"></i>
            <span>KARINAKAS</span>
          </div>

          {/* Step indicator */}
          <div className="rg-steps">
            <div className={`rg-step${step >= 1 ? ' active' : ''}`}>
              <div className="rg-step-circle">{step > 1 ? <i className="bi bi-check2"></i> : '1'}</div>
              <span>Data Diri</span>
            </div>
            <div className={`rg-step-line${step > 1 ? ' filled' : ''}`} />
            <div className={`rg-step${step >= 2 ? ' active' : ''}`}>
              <div className="rg-step-circle">2</div>
              <span>Kata Sandi</span>
            </div>
          </div>

          {/* ── Step 1: Data Diri ── */}
          {step === 1 && (
            <div key="step1" className="rg-panel">
              <div className="lg-welcome mb-3">
                <h2 className="lg-welcome-title">Daftar Akun Baru</h2>
                <p className="lg-welcome-sub">Lengkapi data diri Anda</p>
              </div>

              {/* Avatar preview */}
              <div className="rg-avatar-row">
                <div className="rg-avatar">
                  {form.nama.trim() ? form.nama.trim()[0].toUpperCase() : <i className="bi bi-person-fill"></i>}
                </div>
                <div>
                  <p className="rg-avatar-name">{form.nama.trim() || 'Nama Anda'}</p>
                  <p className="rg-avatar-sub">{form.username.trim() ? `@${form.username.trim()}` : 'Anggota Baru Karinakas'}</p>
                </div>
              </div>

              <form onSubmit={handleStep1} className="lg-form">
                <div className="lg-field">
                  <label className="lg-label">Nama Lengkap <span className="text-danger">*</span></label>
                  <div className="lg-input-wrap">
                    <i className="bi bi-person-fill lg-iicon"></i>
                    <input type="text" className="lg-input" placeholder="Nama lengkap Anda" value={form.nama} onChange={set('nama')} required autoFocus />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <div className="lg-field" style={{ flex: 1 }}>
                    <label className="lg-label">Username <span className="text-danger">*</span></label>
                    <div className="lg-input-wrap">
                      <i className="bi bi-at lg-iicon"></i>
                      <input type="text" className="lg-input" placeholder="username" value={form.username} onChange={set('username')} required />
                    </div>
                  </div>
                  <div className="lg-field" style={{ flex: 1 }}>
                    <label className="lg-label">Jenis Kelamin <span className="text-danger">*</span></label>
                    <div className="lg-input-wrap">
                      <i className="bi bi-gender-ambiguous lg-iicon"></i>
                      <select className="lg-input" style={{ paddingLeft: '2.8rem' }} value={form.gender} onChange={set('gender')} required>
                        <option value="">Pilih...</option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="lg-field">
                  <label className="lg-label">Alamat Email <span className="text-danger">*</span></label>
                  <div className="lg-input-wrap">
                    <i className="bi bi-envelope-fill lg-iicon"></i>
                    <input type="email" className="lg-input" placeholder="nama@email.com" value={form.email} onChange={set('email')} required />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <div className="lg-field" style={{ flex: 1 }}>
                    <label className="lg-label">Tanggal Lahir <span className="text-danger">*</span></label>
                    <div className="lg-input-wrap">
                      <i className="bi bi-calendar-event lg-iicon"></i>
                      <input type="date" className="lg-input" value={form.tanggalLahir} onChange={set('tanggalLahir')} required />
                    </div>
                    {usia != null && <p className="rg-match mt-1" style={{ color: '#585858' }}><i className="bi bi-info-circle me-1"></i>Usia: {usia} tahun</p>}
                  </div>
                  <div className="lg-field" style={{ flex: 1 }}>
                    <label className="lg-label">No. Telepon <span className="text-danger">*</span></label>
                    <div className="lg-input-wrap">
                      <i className="bi bi-telephone-fill lg-iicon"></i>
                      <input type="tel" className="lg-input" placeholder="08xxxxxxxxxx" value={form.telepon} onChange={set('telepon')} required />
                    </div>
                  </div>
                </div>

                <div className="lg-field">
                  <label className="lg-label">Alamat <span className="text-danger">*</span></label>
                  <div className="lg-input-wrap">
                    <i className="bi bi-house-fill lg-iicon"></i>
                    <input type="text" className="lg-input" placeholder="Alamat domisili" value={form.alamat} onChange={set('alamat')} required />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <div className="lg-field" style={{ flex: 1 }}>
                    <label className="lg-label">Kota <span className="text-muted fw-normal">(opsional)</span></label>
                    <div className="lg-input-wrap">
                      <i className="bi bi-geo-alt-fill lg-iicon"></i>
                      <input type="text" className="lg-input" placeholder="Semarang" value={form.kota} onChange={set('kota')} />
                    </div>
                  </div>
                  <div className="lg-field" style={{ flex: 1 }}>
                    <label className="lg-label">Asal Paroki <span className="text-muted fw-normal">(opsional)</span></label>
                    <div className="lg-input-wrap">
                      <i className="bi bi-building lg-iicon"></i>
                      <input type="text" className="lg-input" placeholder="Paroki Katedral" value={form.paroki} onChange={set('paroki')} />
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="lg-error"><i className="bi bi-exclamation-circle-fill me-2"></i>{error}</div>
                )}

                <button type="submit" className="lg-btn">
                  <span>Lanjut</span><i className="bi bi-arrow-right-circle-fill"></i>
                </button>
              </form>
            </div>
          )}

          {/* ── Step 2: Kata Sandi ── */}
          {step === 2 && (
            <div key="step2" className="rg-panel">
              <div className="lg-welcome mb-3">
                <h2 className="lg-welcome-title">Buat Kata Sandi</h2>
                <p className="lg-welcome-sub">Untuk akun <strong className="text-dark">{form.email}</strong></p>
              </div>

              <form onSubmit={handleSubmit} className="lg-form">
                <div className="lg-field">
                  <label className="lg-label">Kata Sandi <span className="text-danger">*</span></label>
                  <div className="lg-input-wrap">
                    <i className="bi bi-lock-fill lg-iicon"></i>
                    <input type={showPass ? 'text' : 'password'} className="lg-input lg-input-pr" placeholder="Minimal 8 karakter" value={form.password} onChange={set('password')} required autoFocus />
                    <button type="button" className="lg-eye-btn" onClick={() => setShowPass(v => !v)} tabIndex={-1}>
                      <i className={`bi ${showPass ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
                    </button>
                  </div>
                  {form.password && (
                    <div className="rg-strength">
                      <div className="rg-strength-bar">
                        <div className="rg-strength-fill" style={{ width: `${(strength.level / 4) * 100}%`, background: strength.color }} />
                      </div>
                      <span className="rg-strength-label" style={{ color: strength.color }}>{strength.label}</span>
                    </div>
                  )}
                </div>

                <div className="lg-field">
                  <label className="lg-label">Konfirmasi Kata Sandi <span className="text-danger">*</span></label>
                  <div className="lg-input-wrap">
                    <i className={`bi ${passwordsMatch ? 'bi-check-circle-fill' : 'bi-lock-fill'} lg-iicon`} style={{ color: passwordsMatch ? '#1a6b3a' : undefined }} />
                    <input type={showConfirm ? 'text' : 'password'} className="lg-input lg-input-pr" placeholder="Ulangi kata sandi" value={form.confirm} onChange={set('confirm')} required />
                    <button type="button" className="lg-eye-btn" onClick={() => setShowConfirm(v => !v)} tabIndex={-1}>
                      <i className={`bi ${showConfirm ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
                    </button>
                  </div>
                  {form.confirm && !passwordsMatch && <p className="rg-mismatch"><i className="bi bi-x-circle-fill me-1"></i>Kata sandi tidak cocok</p>}
                  {passwordsMatch && <p className="rg-match"><i className="bi bi-check-circle-fill me-1"></i>Kata sandi cocok</p>}
                </div>

                <div className="rg-agree-row">
                  <label className="lg-check-label align-items-start">
                    <input type="checkbox" className="lg-checkbox" checked={form.agree} onChange={e => setForm(f => ({ ...f, agree: e.target.checked }))} />
                    <span className={`lg-checkmark${form.agree ? ' checked' : ''}`} style={{ marginTop: 2, flexShrink: 0 }}>
                      {form.agree && <i className="bi bi-check2"></i>}
                    </span>
                    <span className="rg-agree-text">
                      Saya menyetujui{' '}
                      <a href="#" className="text-danger text-decoration-none fw-semibold">Syarat & Ketentuan</a>
                      {' '}dan{' '}
                      <a href="#" className="text-danger text-decoration-none fw-semibold">Kebijakan Privasi</a> Karinakas
                    </span>
                  </label>
                </div>

                {error && (
                  <div className="lg-error"><i className="bi bi-exclamation-circle-fill me-2"></i>{error}</div>
                )}

                <button type="submit" className={`lg-btn${loading ? ' loading' : ''}`} disabled={loading}>
                  {loading
                    ? <><span className="lg-spinner" /><span>Membuat Akun...</span></>
                    : <><i className="bi bi-person-check-fill me-1"></i><span>Buat Akun Sekarang</span></>}
                </button>

                <button type="button" className="rg-back-btn" onClick={() => { setStep(1); setError('') }}>
                  <i className="bi bi-arrow-left me-1"></i>Kembali
                </button>
              </form>
            </div>
          )}

          <p className="rg-prompt">
            Sudah punya akun?{' '}
            <Link to="/login" className="rg-prompt-link">Masuk di sini</Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Register
