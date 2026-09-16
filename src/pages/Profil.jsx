import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Breadcrumb from '../components/Breadcrumb'
import CTA from '../components/CTA'
import { STATUS_DONASI, STATUS_RELAWAN, fmtRp, fmtTanggal } from '../data/store'
import { donasiService, relawanService, notifikasiService } from '../services/resources'

// ── Avatar colors ─────────────────────────────────────────────────────────────
const avatarGradients = [
  ['#C0392B', '#8B0000'], ['#1d4ed8', '#1e3a8a'], ['#1a6b3a', '#14532d'],
  ['#d97000', '#92400e'], ['#6d28d9', '#4c1d95'],
]
const getGradient = (email = '') => avatarGradients[(email.charCodeAt(0) || 0) % avatarGradients.length]

function Profil() {
  const { user, logout, updateProfile } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('info')
  const [editMode, setEditMode]   = useState(false)
  const [saved,    setSaved]      = useState(false)
  const [saveErr,  setSaveErr]    = useState('')

  const [form, setForm] = useState({
    nama: '', email: '', telepon: '', gender: '', alamat: '', kota: '', paroki: '', tentang: '',
  })
  const [myDonasi, setMyDonasi]   = useState([])
  const [myRelawan, setMyRelawan] = useState([])
  const [myNotif, setMyNotif]     = useState([])

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    // Ambil dari data user backend
    setForm({
      nama: user.name || '', email: user.email || '', telepon: user.telepon || '',
      gender: user.gender || '', alamat: user.alamat || '', kota: user.kota || '',
      paroki: user.paroki || '', tentang: user.tentang || '',
    })
    // Riwayat donasi, relawan & notifikasi dari backend
    donasiService.myDonations().then(setMyDonasi).catch(() => setMyDonasi([]))
    relawanService.myRegistrations().then(setMyRelawan).catch(() => setMyRelawan([]))
    notifikasiService.myNotifications().then(setMyNotif).catch(() => setMyNotif([]))
  }, [user, navigate])

  if (!user) return null

  const [g1, g2]  = getGradient(user.email)
  const initial   = (form.nama || user.name)[0]?.toUpperCase() ?? '?'

  // ── Data milik user ── (donasi, relawan & notifikasi dari backend)
  const totalDonasi = myDonasi.filter(d => d.status === 'berhasil').reduce((s, d) => s + Number(d.nominal), 0)

  const handleSave = async (e) => {
    e.preventDefault()
    setSaveErr('')
    try {
      await updateProfile(form)
      setEditMode(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setSaveErr(err.message || 'Gagal menyimpan profil')
    }
  }

  const handleLogout = () => { logout(); navigate('/') }

  const tabs = [
    { id: 'info',    icon: 'bi-person-fill',  label: 'Info Pribadi' },
    { id: 'donasi',  icon: 'bi-cash-coin',     label: 'Riwayat Donasi' },
    { id: 'relawan', icon: 'bi-person-heart',  label: 'Kegiatan Relawan' },
    { id: 'notif',   icon: 'bi-bell-fill',     label: 'Notifikasi' },
  ]

  return (
    <>
      <Breadcrumb items={[{ label: 'Profil Saya' }]} />

      {/* ── Profile Header ── */}
      <section className="pf-hero">
        <div className="pf-hero-bg" />
        <div className="container pf-hero-inner">
          <div className="pf-identity">
            <div className="pf-avatar-wrap">
              <div className="pf-avatar" style={{ background: `linear-gradient(135deg, ${g1}, ${g2})` }}>{initial}</div>
              <div className="pf-avatar-ring" style={{ borderColor: g1 }} />
            </div>
            <div className="pf-identity-text">
              <h1 className="pf-display-name">{form.nama || user.name}</h1>
              <p className="pf-display-email">{user.email}</p>
              {(form.kota || form.alamat) && <p className="pf-display-kota"><i className="bi bi-geo-alt-fill me-1"></i>{form.kota || form.alamat}</p>}
              <span className="pf-member-badge"><i className="bi bi-patch-check-fill me-1"></i>Anggota Karinakas</span>
            </div>
          </div>

          <div className="pf-hero-stats">
            <div className="pf-hero-stat">
              <span className="pf-hero-stat-num">{myDonasi.length}</span>
              <span className="pf-hero-stat-lbl">Donasi</span>
            </div>
            <div className="pf-hero-stat-sep" />
            <div className="pf-hero-stat">
              <span className="pf-hero-stat-num">{myRelawan.length}</span>
              <span className="pf-hero-stat-lbl">Pendaftaran</span>
            </div>
            <div className="pf-hero-stat-sep" />
            <div className="pf-hero-stat">
              <span className="pf-hero-stat-num">{fmtRp(totalDonasi)}</span>
              <span className="pf-hero-stat-lbl">Total Donasi</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="pf-section">
        <div className="container">
          <div className="row g-4">

            {/* Sidebar */}
            <div className="col-lg-3">
              <div className="pf-sidebar-card mb-3">
                <p className="pf-sidebar-section-label">Menu Akun</p>
                {tabs.map(t => (
                  <button key={t.id} className={`pf-sidebar-btn${activeTab === t.id ? ' active' : ''}`} onClick={() => setActiveTab(t.id)}>
                    <i className={`bi ${t.icon} pf-sidebar-icon`}></i>
                    <span>{t.label}</span>
                    {t.id === 'notif' && myNotif.length > 0 && <span className="pf-notif-count">{myNotif.length}</span>}
                  </button>
                ))}
                <hr className="pf-sidebar-hr" />
                <Link to="/donasi" className="pf-sidebar-btn pf-sidebar-action">
                  <i className="bi bi-heart-fill pf-sidebar-icon text-danger"></i><span>Donasi Sekarang</span>
                </Link>
                <Link to="/daftar-relawan" className="pf-sidebar-btn pf-sidebar-action">
                  <i className="bi bi-people-fill pf-sidebar-icon text-danger"></i><span>Daftar Relawan</span>
                </Link>
                <hr className="pf-sidebar-hr" />
                <button className="pf-sidebar-btn pf-sidebar-logout" onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right pf-sidebar-icon"></i><span>Keluar</span>
                </button>
              </div>
            </div>

            {/* Tab content */}
            <div className="col-lg-9">

              {/* ══ Info Pribadi ══ */}
              {activeTab === 'info' && (
                <div key="info" className="pf-panel">
                  {saved && <div className="pf-alert-success"><i className="bi bi-check-circle-fill me-2"></i>Profil berhasil disimpan!</div>}
                  {saveErr && <div className="lg-error mb-3"><i className="bi bi-exclamation-circle-fill me-2"></i>{saveErr}</div>}

                  <div className="pf-card">
                    <div className="pf-card-head">
                      <div>
                        <h3 className="pf-card-title">Informasi Pribadi</h3>
                        <p className="pf-card-sub">Data dasar akun Anda di Karinakas</p>
                      </div>
                      {!editMode && <button className="pf-edit-btn" onClick={() => setEditMode(true)}><i className="bi bi-pencil-fill me-1"></i>Edit</button>}
                    </div>

                    {editMode ? (
                      <form onSubmit={handleSave} className="pf-form">
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label className="pf-label">Nama Lengkap <span className="text-danger">*</span></label>
                            <div className="lg-input-wrap"><i className="bi bi-person-fill lg-iicon"></i>
                              <input required className="lg-input" value={form.nama} onChange={e => setForm(f => ({ ...f, nama: e.target.value }))} /></div>
                          </div>
                          <div className="col-md-6">
                            <label className="pf-label">Alamat Email</label>
                            <div className="lg-input-wrap"><i className="bi bi-envelope-fill lg-iicon"></i>
                              <input className="lg-input" value={form.email} readOnly style={{ background: '#f5f5f5', color: '#606060', cursor: 'not-allowed' }} /></div>
                          </div>
                          <div className="col-md-6">
                            <label className="pf-label">Nomor Telepon</label>
                            <div className="lg-input-wrap"><i className="bi bi-telephone-fill lg-iicon"></i>
                              <input type="tel" className="lg-input" placeholder="08xxxxxxxxxx" value={form.telepon} onChange={e => setForm(f => ({ ...f, telepon: e.target.value }))} /></div>
                          </div>
                          <div className="col-md-6">
                            <label className="pf-label">Jenis Kelamin</label>
                            <div className="lg-input-wrap"><i className="bi bi-gender-ambiguous lg-iicon"></i>
                              <select className="lg-input" style={{ paddingLeft: '2.8rem' }} value={form.gender} onChange={e => setForm(f => ({ ...f, gender: e.target.value }))}>
                                <option value="">Pilih...</option>
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                              </select></div>
                          </div>
                          <div className="col-md-6">
                            <label className="pf-label">Kota / Domisili</label>
                            <div className="lg-input-wrap"><i className="bi bi-geo-alt-fill lg-iicon"></i>
                              <input className="lg-input" placeholder="Contoh: Semarang" value={form.kota} onChange={e => setForm(f => ({ ...f, kota: e.target.value }))} /></div>
                          </div>
                          <div className="col-md-6">
                            <label className="pf-label">Asal Paroki <span className="text-muted fw-normal">(opsional)</span></label>
                            <div className="lg-input-wrap"><i className="bi bi-building lg-iicon"></i>
                              <input className="lg-input" placeholder="Contoh: Paroki Katedral" value={form.paroki} onChange={e => setForm(f => ({ ...f, paroki: e.target.value }))} /></div>
                          </div>
                          <div className="col-12">
                            <label className="pf-label">Alamat Lengkap</label>
                            <div className="lg-input-wrap"><i className="bi bi-house-fill lg-iicon"></i>
                              <input className="lg-input" placeholder="Jl. ..." value={form.alamat} onChange={e => setForm(f => ({ ...f, alamat: e.target.value }))} /></div>
                          </div>
                          <div className="col-12">
                            <label className="pf-label">Tentang Saya</label>
                            <textarea rows={3} className="kt-input kt-textarea" placeholder="Ceritakan sedikit tentang diri Anda..." value={form.tentang} onChange={e => setForm(f => ({ ...f, tentang: e.target.value }))} />
                          </div>
                        </div>
                        <div className="d-flex gap-2 mt-3">
                          <button type="submit" className="btn btn-danger rounded-pill px-4 fw-semibold"><i className="bi bi-check2 me-1"></i>Simpan Perubahan</button>
                          <button type="button" className="btn btn-outline-secondary rounded-pill px-4" onClick={() => setEditMode(false)}>Batal</button>
                        </div>
                      </form>
                    ) : (
                      <div className="pf-info-grid">
                        {[
                          ['bi-person-fill',    '#C0392B', '#FFEBEE', 'Nama Lengkap',  form.nama || user.name],
                          ['bi-envelope-fill',  '#1d4ed8', '#EFF6FF', 'Email',         form.email],
                          ['bi-telephone-fill', '#1a6b3a', '#E8F5E9', 'Telepon',       form.telepon || '—'],
                          ['bi-gender-ambiguous','#6d28d9','#F3E8FF', 'Jenis Kelamin', form.gender  || '—'],
                          ['bi-geo-alt-fill',   '#d97000', '#FFF3E6', 'Kota',          form.kota    || '—'],
                          ['bi-building',       '#0891b2', '#E0F7FA', 'Asal Paroki',   form.paroki  || '—'],
                          ['bi-house-fill',     '#C0392B', '#FFEBEE', 'Alamat',        form.alamat  || '—'],
                        ].map(([icon, color, bg, label, value]) => (
                          <div key={label} className="pf-info-item">
                            <div className="pf-info-icon" style={{ color, background: bg }}><i className={`bi ${icon}`}></i></div>
                            <div><p className="pf-info-label">{label}</p><p className="pf-info-value">{value}</p></div>
                          </div>
                        ))}
                        {form.tentang && (
                          <div className="pf-info-item col-span-2">
                            <div className="pf-info-icon" style={{ color: '#6d28d9', background: '#F3E8FF' }}><i className="bi bi-chat-quote-fill"></i></div>
                            <div><p className="pf-info-label">Tentang Saya</p><p className="pf-info-value">{form.tentang}</p></div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ══ Riwayat Donasi ══ */}
              {activeTab === 'donasi' && (
                <div key="donasi" className="pf-panel">
                  <div className="pf-summary-row mb-3">
                    {[
                      ['bi-cash-coin',          '#C0392B', '#FFEBEE', myDonasi.length + ' Donasi', 'Total transaksi'],
                      ['bi-currency-dollar',    '#1a6b3a', '#E8F5E9', fmtRp(totalDonasi),          'Total berhasil'],
                      ['bi-calendar-check-fill','#1d4ed8', '#EFF6FF', myDonasi[0] ? fmtTanggal(myDonasi[0].tanggal) : '—', 'Terakhir donasi'],
                    ].map(([icon, color, bg, val, lbl]) => (
                      <div key={lbl} className="pf-summary-card">
                        <div className="pf-summary-icon" style={{ color, background: bg }}><i className={`bi ${icon}`}></i></div>
                        <div><p className="pf-summary-val">{val}</p><p className="pf-summary-lbl">{lbl}</p></div>
                      </div>
                    ))}
                  </div>

                  <div className="pf-card">
                    <div className="pf-card-head">
                      <h3 className="pf-card-title"><i className="bi bi-clock-history me-2 text-danger"></i>Daftar Donasi</h3>
                      <Link to="/donasi" className="pf-action-link">+ Donasi Lagi</Link>
                    </div>
                    {myDonasi.length === 0 ? (
                      <div className="pf-empty"><i className="bi bi-inbox"></i><p>Belum ada riwayat donasi.<br />Donasi pertama Anda akan muncul di sini.</p></div>
                    ) : (
                      <div className="pf-table-wrap">
                        <table className="pf-table">
                          <thead><tr><th>Tanggal</th><th>Tujuan</th><th>Nominal</th><th>Metode</th><th>Status</th></tr></thead>
                          <tbody>
                            {myDonasi.map(d => (
                              <tr key={d.id}>
                                <td className="pf-td-muted">{fmtTanggal(d.tanggal)}</td>
                                <td className="pf-td-bold">{d.tujuan}</td>
                                <td><span className="pf-amount">{fmtRp(d.nominal)}</span></td>
                                <td className="pf-td-muted">{d.metode}</td>
                                <td><span className={`pf-badge-status ${STATUS_DONASI[d.status]?.cls || 'orange'}`}>{STATUS_DONASI[d.status]?.label || d.status}</span></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ══ Kegiatan Relawan ══ */}
              {activeTab === 'relawan' && (
                <div key="relawan" className="pf-panel">
                  <div className="pf-summary-row mb-3">
                    {[
                      ['bi-people-fill',         '#6d28d9', '#F3E8FF', myRelawan.filter(r => r.status === 'diterima').length + ' Diterima', 'Disetujui'],
                      ['bi-hourglass-split',     '#d97000', '#FFF3E6', myRelawan.filter(r => r.status === 'pending').length + ' Pending',  'Menunggu'],
                      ['bi-card-checklist',      '#1d4ed8', '#EFF6FF', myRelawan.length + ' Total',  'Pendaftaran'],
                    ].map(([icon, color, bg, val, lbl]) => (
                      <div key={lbl} className="pf-summary-card">
                        <div className="pf-summary-icon" style={{ color, background: bg }}><i className={`bi ${icon}`}></i></div>
                        <div><p className="pf-summary-val">{val}</p><p className="pf-summary-lbl">{lbl}</p></div>
                      </div>
                    ))}
                  </div>

                  <div className="pf-card">
                    <div className="pf-card-head">
                      <h3 className="pf-card-title"><i className="bi bi-person-heart me-2 text-danger"></i>Pendaftaran Relawan Saya</h3>
                      <Link to="/daftar-relawan" className="pf-action-link">+ Daftar Baru</Link>
                    </div>
                    {myRelawan.length === 0 ? (
                      <div className="pf-empty"><i className="bi bi-inbox"></i><p>Belum ada pendaftaran relawan.<br />Daftar sekarang untuk ikut kegiatan kami.</p></div>
                    ) : (
                      <div className="pf-activity-list">
                        {myRelawan.map(r => (
                          <div key={r.id} className="pf-activity-item">
                            <div className={`pf-activity-dot ${r.status === 'diterima' ? 'selesai' : 'upcoming'}`} />
                            <div className="pf-activity-body">
                              <div className="pf-activity-top">
                                <p className="pf-activity-name">Relawan {r.jenis} — {r.minat || 'Umum'}</p>
                                <span className={`pf-badge-status ${STATUS_RELAWAN[r.status]?.cls || 'orange'}`}>{STATUS_RELAWAN[r.status]?.label || r.status}</span>
                              </div>
                              <div className="pf-activity-meta">
                                <span><i className="bi bi-calendar3 me-1"></i>{r.tanggal}</span>
                                <span><i className="bi bi-tag-fill me-1"></i>{r.jenis}</span>
                                {r.kemampuan && r.kemampuan !== '-' && <span><i className="bi bi-stars me-1"></i>{r.kemampuan}</span>}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ══ Notifikasi ══ */}
              {activeTab === 'notif' && (
                <div key="notif" className="pf-panel">
                  <div className="pf-card">
                    <div className="pf-card-head">
                      <h3 className="pf-card-title"><i className="bi bi-bell-fill me-2 text-danger"></i>Notifikasi & Ucapan Terima Kasih</h3>
                    </div>
                    {myNotif.length === 0 ? (
                      <div className="pf-empty"><i className="bi bi-bell-slash"></i><p>Belum ada notifikasi.<br />Anda akan menerima ucapan terima kasih setelah donasi diverifikasi atau pendaftaran relawan disetujui.</p></div>
                    ) : (
                      <div className="pf-activity-list">
                        {myNotif.map(n => (
                          <div key={n.id} className="pf-activity-item">
                            <div className="pf-info-icon" style={{ color: n.tipe === 'email' ? '#1d4ed8' : '#1a6b3a', background: n.tipe === 'email' ? '#EFF6FF' : '#E8F5E9', flexShrink: 0 }}>
                              <i className={`bi ${n.tipe === 'email' ? 'bi-envelope-fill' : 'bi-gear-fill'}`}></i>
                            </div>
                            <div className="pf-activity-body">
                              <div className="pf-activity-top">
                                <p className="pf-activity-name">{n.judul}</p>
                                <span className="pf-badge-status green">✓ Terkirim</span>
                              </div>
                              <div className="pf-activity-meta">
                                <span><i className="bi bi-clock me-1"></i>{n.tanggal}</span>
                                <span className="text-uppercase">{n.tipe}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}

export default Profil
