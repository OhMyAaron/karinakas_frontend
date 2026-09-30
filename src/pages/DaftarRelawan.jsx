import { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import CTA from '../components/CTA'
import Breadcrumb from '../components/Breadcrumb'
import PageHero from '../components/PageHero'
import { useAuth } from '../context/AuthContext'
import { JENIS_RELAWAN, MINAT_RELAWAN } from '../data/store'
import { kegiatanService, relawanService } from '../services/resources'

function DaftarRelawan() {
  const { user } = useAuth()
  const [params] = useSearchParams()
  const navigate = useNavigate()

  // Konteks kegiatan (jika datang dari halaman Kegiatan)
  const kegId = params.get('kegiatan')
  const [kegiatan, setKegiatan] = useState(null)
  useEffect(() => {
    let alive = true
    if (!kegId) { setKegiatan(null); return }
    kegiatanService.get(kegId)
      .then(k => { if (alive && k?.butuhRelawan) setKegiatan(k) })
      .catch(() => { if (alive) setKegiatan(null) })
    return () => { alive = false }
  }, [kegId])

  const kuota  = kegiatan ? (Number(kegiatan.kuotaRelawan) || 0) : 0
  const terisi = kegiatan ? (Number(kegiatan.terisi) || 0) : 0
  const penuh  = kuota > 0 && terisi >= kuota

  // Opsi jenis & minat: pakai yang ditentukan admin untuk kegiatan ini,
  // atau pilihan bawaan bila kegiatan tidak menentukan (atau relawan umum)
  const jenisOptions = kegiatan?.jenisRelawan?.length ? kegiatan.jenisRelawan : JENIS_RELAWAN
  const minatOptions = kegiatan?.bidangMinat?.length ? kegiatan.bidangMinat : MINAT_RELAWAN

  const [form, setForm] = useState({
    jenis: '', minat: '', keterbatasan: '', kemampuan: '', motivasi: '', ktp: '',
  })
  const [sent,    setSent]    = useState(false)
  const [saving,  setSaving]  = useState(false)
  const [error,   setError]   = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    if (penuh || saving) return
    if (form.ktp.length !== 16) {
      setError('Nomor KTP harus diisi tepat 16 digit.')
      return
    }
    setSaving(true); setError('')
    try {
      await relawanService.create({ ...form, kegiatanId: kegiatan ? kegiatan.id : null })
      setSent(true)
    } catch (err) {
      setError(err.message || 'Gagal mengirim pendaftaran. Coba lagi.')
    } finally {
      setSaving(false)
    }
  }

  // Belum login → wajib masuk dulu (data pribadi diambil dari profil)
  if (!user) {
    return (
      <>
        <Breadcrumb items={[{ label: 'Daftar Relawan' }]} />
        <PageHero
          label="BERGABUNG BERSAMA KAMI"
          title={<>Jadi Bagian dari<br /><span className="text-danger">Gerakan Kebaikan</span></>}
          desc="Daftarkan diri Anda sebagai relawan Karinakas dan bersama-sama membuat perubahan nyata."
          image={false}
        />
        <section className="kt-info-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="kt-form-card text-center">
                  <div className="kt-success-icon" style={{ background: '#FFF3E6', color: '#d97000' }}>
                    <i className="bi bi-person-lock"></i>
                  </div>
                  <h3 className="kt-success-title">Masuk Dulu, Yuk</h3>
                  <p className="kt-success-text">
                    Pendaftaran relawan memakai data dari profil Anda (nama, email, kontak, alamat).
                    Silakan masuk atau buat akun terlebih dahulu.
                  </p>
                  <div className="d-flex gap-3 justify-content-center flex-wrap">
                    <Link to="/login" state={{ from: kegId ? `/daftar-relawan?kegiatan=${kegId}` : '/daftar-relawan' }}
                      className="btn btn-danger rounded-pill px-4"><i className="bi bi-box-arrow-in-right me-2"></i>Masuk</Link>
                    <Link to="/register" className="btn btn-outline-secondary rounded-pill px-4">Buat Akun</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <CTA />
      </>
    )
  }

  return (
    <>
      <Breadcrumb items={[{ label: 'Daftar Relawan' }]} />

      <PageHero
        label="BERGABUNG BERSAMA KAMI"
        title={<>Jadi Bagian dari<br /><span className="text-danger">Gerakan Kebaikan</span></>}
        desc="Daftarkan diri Anda sebagai relawan Karinakas dan bersama-sama membuat perubahan nyata bagi masyarakat yang membutuhkan."
        image={false}
      />

      <section className="kt-info-section">
        <div className="container">
          <div className="row g-4 justify-content-center">

            <div className="col-lg-7">
              {sent ? (
                <div className="kt-success">
                  <div className="kt-success-icon">
                    <i className="bi bi-person-check-fill"></i>
                  </div>
                  <h3 className="kt-success-title">Pendaftaran Terkirim!</h3>
                  <p className="kt-success-text">
                    Selamat datang, <strong>{user.name}</strong>! Pendaftaran relawan Anda
                    telah kami terima dan berstatus <strong>menunggu verifikasi</strong>.
                    Tim Karinakas akan menghubungi Anda melalui <strong>{user.email}</strong>.
                  </p>
                  <div className="d-flex gap-3 justify-content-center flex-wrap">
                    <button className="btn btn-danger rounded-pill px-4" onClick={() => { setSent(false); setForm({ jenis: '', minat: '', keterbatasan: '', kemampuan: '', motivasi: '', ktp: '' }) }}>
                      Daftar Lagi
                    </button>
                    <button className="btn btn-outline-secondary rounded-pill px-4" onClick={() => navigate('/profil')}>
                      Lihat Status di Profil
                    </button>
                  </div>
                </div>
              ) : (
                <div className="kt-form-card">
                  <h2 className="kt-form-title mb-4">
                    <i className="bi bi-person-heart me-2 text-danger"></i>Formulir Pendaftaran Relawan
                  </h2>
                  {kegiatan && (
                    <div className="dr-keg-context mb-4">
                      <img src={kegiatan.img} alt={kegiatan.judul} />
                      <div>
                        <p className="dr-keg-context-label"><i className="bi bi-stars me-1"></i>Mendaftar untuk kegiatan:</p>
                        <p className="dr-keg-context-title">{kegiatan.judul}</p>
                        <p className="dr-keg-context-meta"><i className="bi bi-geo-alt-fill me-1"></i>{kegiatan.lokasi}</p>
                        {kuota > 0 && (
                          <p className="dr-keg-context-meta mt-1">
                            <i className="bi bi-people-fill me-1"></i>
                            Kuota: {terisi}/{kuota}{penuh ? ' (Penuh)' : ` · sisa ${kuota - terisi}`}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {penuh && (
                    <div className="dr-privacy-note mb-3" style={{ background: '#FFEBEE', borderColor: '#ffcdd2', color: '#C0392B' }}>
                      <i className="bi bi-lock-fill me-2"></i>
                      Maaf, kuota relawan untuk kegiatan ini sudah penuh. Anda masih bisa mendaftar untuk kegiatan lain.
                    </div>
                  )}

                  {/* Data pribadi dari profil (read-only) */}
                  <div className="dr-privacy-note mb-4" style={{ background: '#EFF6FF', borderColor: '#bfdbfe', color: '#1d4ed8' }}>
                    <i className="bi bi-person-badge me-2"></i>
                    Mendaftar sebagai <strong>{user.name}</strong> ({user.email}).
                    Data kontak & alamat diambil dari profil — perbarui di halaman Profil jika perlu.
                  </div>

                  <form onSubmit={handleSubmit} className="kt-form">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="kt-label">Jenis Relawan <span className="text-danger">*</span></label>
                        <select required className="kt-input kt-select-input"
                          value={form.jenis} onChange={e => setForm(f => ({ ...f, jenis: e.target.value }))}>
                          <option value="">Pilih jenis relawan...</option>
                          {jenisOptions.map(j => <option key={j} value={j}>{j}</option>)}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="kt-label">Bidang Minat</label>
                        <select className="kt-input kt-select-input"
                          value={form.minat} onChange={e => setForm(f => ({ ...f, minat: e.target.value }))}>
                          <option value="">Pilih bidang minat...</option>
                          {minatOptions.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                      </div>
                      <div className="col-12">
                        <label className="kt-label">Nomor KTP <span className="text-danger">*</span> <span className="text-muted fw-normal">(16 digit)</span></label>
                        <input required className="kt-input" placeholder="Untuk verifikasi data relawan" inputMode="numeric"
                          minLength={16} maxLength={16} pattern="\d{16}" title="Nomor KTP harus 16 digit angka"
                          value={form.ktp} onChange={e => setForm(f => ({ ...f, ktp: e.target.value.replace(/\D/g, '').slice(0, 16) }))} />
                      </div>
                      <div className="col-12">
                        <label className="kt-label">Keterbatasan Diri <span className="text-muted fw-normal">(penyakit / kondisi kesehatan)</span></label>
                        <input className="kt-input" placeholder="Contoh: Asma ringan, alergi debu. Kosongkan jika tidak ada."
                          value={form.keterbatasan} onChange={e => setForm(f => ({ ...f, keterbatasan: e.target.value }))} />
                      </div>
                      <div className="col-12">
                        <label className="kt-label">Kemampuan Diri <span className="text-muted fw-normal">(skill untuk pembagian divisi)</span></label>
                        <input className="kt-input" placeholder="Contoh: P3K, mengemudi, public speaking, desain grafis"
                          value={form.kemampuan} onChange={e => setForm(f => ({ ...f, kemampuan: e.target.value }))} />
                      </div>
                      <div className="col-12">
                        <label className="kt-label">Motivasi Bergabung</label>
                        <textarea rows={3} className="kt-input kt-textarea"
                          placeholder="Ceritakan motivasi Anda bergabung sebagai relawan Karinakas..."
                          value={form.motivasi} onChange={e => setForm(f => ({ ...f, motivasi: e.target.value }))} />
                      </div>
                      {error && (
                        <div className="col-12">
                          <div className="lg-error"><i className="bi bi-exclamation-circle-fill me-2"></i>{error}</div>
                        </div>
                      )}
                      <div className="col-12">
                        <div className="dr-privacy-note mb-3">
                          <i className="bi bi-shield-lock-fill me-2"></i>
                          Data pribadi Anda (alamat, kondisi kesehatan) dilindungi dan hanya diakses oleh admin yang berwenang.
                        </div>
                        <button type="submit" className="btn btn-danger rounded-pill px-5 py-2 fw-bold kt-submit-btn" disabled={penuh || saving}>
                          {saving
                            ? <><span className="lg-spinner" /> Mengirim...</>
                            : <><i className="bi bi-person-plus me-2"></i>Daftar Sekarang</>}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Side info */}
            <div className="col-lg-4">
              <div className="kt-contact-detail-card mb-3">
                <h2 className="kt-contact-detail-title">Keuntungan Jadi Relawan</h2>
                <ul className="list-unstyled m-0">
                  {[
                    ['bi-mortarboard-fill',  '#1d4ed8', '#EFF6FF', 'Pelatihan & pembekalan dasar'],
                    ['bi-patch-check-fill',  '#1a6b3a', '#E8F5E9', 'Sertifikat kerelawanan resmi'],
                    ['bi-people-fill',       '#6d28d9', '#F3E8FF', 'Jaringan komunitas sosial'],
                    ['bi-briefcase-fill',    '#d97000', '#FFF3E6', 'Pengalaman kerja sosial nyata'],
                    ['bi-heart-fill',        '#C0392B', '#FFEBEE', 'Kepuasan membantu sesama'],
                  ].map(([icon, color, bg, label]) => (
                    <li key={label} className="kt-contact-item">
                      <div className="kt-contact-icon" style={{ color, background: bg }}>
                        <i className={`bi ${icon}`}></i>
                      </div>
                      <div>
                        <p className="kt-contact-item-value">{label}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="kt-contact-detail-card">
                <h2 className="kt-contact-detail-title">Pertanyaan?</h2>
                <p className="small text-muted mb-2">Hubungi kami melalui:</p>
                <a href="https://wa.me/6281392777710" target="_blank" rel="noreferrer"
                  className="btn btn-success btn-sm rounded-pill w-100 mb-2">
                  <i className="bi bi-whatsapp me-2"></i>WhatsApp
                </a>
                <a href="mailto:karinakas.office@gmail.com"
                  className="btn btn-outline-danger btn-sm rounded-pill w-100">
                  <i className="bi bi-envelope me-2"></i>karinakas.office@gmail.com
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}

export default DaftarRelawan
