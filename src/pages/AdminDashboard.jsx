import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import KarinakasLogo from '../components/KarinakasLogo'
import SectionBerita    from './admin/SectionBerita'
import SectionKegiatan  from './admin/SectionKegiatan'
import SectionRelawan   from './admin/SectionRelawan'
import SectionGaleri    from './admin/SectionGaleri'
import SectionDonasi    from './admin/SectionDonasi'
import SectionPengguna  from './admin/SectionPengguna'
import SectionNotifikasi from './admin/SectionNotifikasi'
import SectionAudit     from './admin/SectionAudit'
import { STATUS_DONASI, fmtRp, fmtTanggal } from '../data/store'
import { adminService, donasiService, relawanService } from '../services/resources'
import { downloadExcel, excelFilename, tanggalHariIni } from '../utils/excel'

// superOnly: true → hanya tampil untuk Super Admin
const sideNav = [
  { id: 'dashboard',  icon: 'bi-grid-fill',            label: 'Dashboard' },
  { id: 'berita',     icon: 'bi-newspaper',             label: 'Berita & Kampanye' },
  { id: 'program',    icon: 'bi-clipboard2-check-fill', label: 'Program & Kegiatan' },
  { id: 'relawan',    icon: 'bi-people-fill',           label: 'Relawan' },
  { id: 'galeri',     icon: 'bi-images',                label: 'Galeri' },
  { id: 'donasi',     icon: 'bi-cash-coin',             label: 'Donasi' },
  { id: 'notifikasi', icon: 'bi-bell-fill',             label: 'Notifikasi' },
  { id: 'pengguna',   icon: 'bi-person-fill-gear',      label: 'Manajemen Pengguna', superOnly: true },
  { id: 'audit',      icon: 'bi-shield-lock-fill',      label: 'Audit Log',          superOnly: true },
]

const quickActions = [
  { id: 'berita',  icon: 'bi-pencil-square',       color: '#1d4ed8', bg: '#EFF6FF', label: 'Kelola Berita',   desc: 'Publikasikan konten baru' },
  { id: 'program', icon: 'bi-calendar2-plus-fill', color: '#1a6b3a', bg: '#E8F5E9', label: 'Kelola Kegiatan', desc: 'Jadwalkan program baru' },
  { id: 'relawan', icon: 'bi-person-plus-fill',    color: '#6d28d9', bg: '#F3E8FF', label: 'Kelola Relawan',  desc: 'Atur data relawan' },
  { id: 'export',  icon: 'bi-download',            color: '#d97000', bg: '#FFF3E6', label: 'Export Laporan',  desc: 'Unduh laporan (Excel)' },
]

const sectionTitle = {
  dashboard: 'Dashboard', relawan: 'Manajemen Relawan',
  program: 'Program & Kegiatan', donasi: 'Donasi',
  berita: 'Berita & Kampanye', galeri: 'Galeri', notifikasi: 'Notifikasi & Automasi',
  pengguna: 'Manajemen Pengguna', audit: 'Audit Log', pengaturan: 'Pengaturan',
}

function AdminDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [active, setActive] = useState('dashboard')

  const isSuper = user?.role === 'superadmin'

  // ── Data asli dari backend ──
  const [stat, setStat]                 = useState({})
  const [recentDonasi, setRecentDonasi] = useState([])
  const [recentRelawan, setRecentRelawan] = useState([])
  const [loadingStats, setLoadingStats] = useState(true)

  useEffect(() => {
    if (active !== 'dashboard') return
    let alive = true
    setLoadingStats(true)
    Promise.all([
      adminService.dashboard().catch(() => ({ stats: {} })),
      donasiService.listAdmin().catch(() => []),
      relawanService.listAdmin().catch(() => []),
    ]).then(([dash, don, rel]) => {
      if (!alive) return
      setStat(dash.stats || {})
      setRecentDonasi(don.slice(0, 5))
      setRecentRelawan(rel.slice(0, 5))
      setLoadingStats(false)
    })
    return () => { alive = false }
  }, [active])

  // Turunan dari statistik backend
  const jmlRelawan     = stat.total_relawan ?? 0
  const jmlDiterima    = stat.relawan_diterima ?? 0
  const jmlLansia      = stat.relawan_lansia ?? 0
  const jmlBencana     = stat.relawan_kebencanaan ?? 0
  const jmlKegiatan    = stat.total_kegiatan ?? 0
  const jmlDonasi      = stat.total_donasi ?? 0
  const donasiBerhasil = stat.jumlah_transaksi_donasi ?? 0
  const totalNominal   = Number(stat.total_nominal_donasi || 0)
  const pendingRelawan = stat.relawan_pending ?? 0

  // Kartu statistik — admin biasa lihat jumlah (count), super admin lihat nominal
  const stats = [
    isSuper
      ? { icon: 'bi-cash-coin', color: '#C0392B', bg: '#FFEBEE', label: 'Total Donasi Berhasil', value: fmtRp(totalNominal), sub: `${donasiBerhasil} transaksi berhasil` }
      : { icon: 'bi-cash-coin', color: '#C0392B', bg: '#FFEBEE', label: 'Jumlah Donasi',         value: String(jmlDonasi),   sub: `${donasiBerhasil} berhasil (nominal terkunci)` },
    { icon: 'bi-people-fill',           color: '#1d4ed8', bg: '#EFF6FF', label: 'Relawan Terdaftar', value: String(jmlRelawan),  sub: `${jmlDiterima} diterima` },
    { icon: 'bi-clipboard2-check-fill', color: '#1a6b3a', bg: '#E8F5E9', label: 'Kegiatan',          value: String(jmlKegiatan), sub: 'program' },
    { icon: 'bi-bell-fill',             color: '#d97000', bg: '#FFF3E6', label: 'Pendaftar Pending', value: String(pendingRelawan), sub: 'perlu verifikasi' },
  ]

  const visibleSideNav    = sideNav.filter(item => isSuper || !item.superOnly)
  const visibleActions    = quickActions

  // Aktivitas terkini — diturunkan dari data asli (donasi & relawan terbaru)
  const visibleActivities = [
    ...recentDonasi.slice(0, 3).map(d => ({
      icon: 'bi-cash-coin', color: '#1d4ed8', bg: '#EFF6FF',
      text: `Donasi dari ${d.donatur}${isSuper ? ` — ${fmtRp(d.nominal)}` : ` (${d.tujuan})`}`,
      time: fmtTanggal(d.tanggal),
    })),
    ...recentRelawan.slice(0, 3).map(r => ({
      icon: 'bi-person-plus-fill', color: '#1a6b3a', bg: '#E8F5E9',
      text: `${r.nama} mendaftar relawan ${r.jenis || ''}`.trim(),
      time: r.tanggal,
    })),
  ]

  const hour     = new Date().getHours()
  const greeting = hour < 12 ? 'Selamat Pagi' : hour < 15 ? 'Selamat Siang' : hour < 18 ? 'Selamat Sore' : 'Selamat Malam'

  const handleLogout = () => { logout(); navigate('/login') }

  // Export laporan keseluruhan ke Excel (Module 9 #44 & #45)
  const exportLaporan = () => {
    downloadExcel(excelFilename('Laporan-Karinakas'), {
      judul: 'LAPORAN KESELURUHAN KARINAKAS',
      sheet: 'Laporan',
      meta: [
        ['Tanggal export', tanggalHariIni()],
        ['Dibuat oleh', `${user?.name || '-'} (${isSuper ? 'Super Admin' : 'Admin'})`],
      ],
      columns: [
        { header: 'Modul',       min: 200 },
        { header: 'Jumlah Data', format: 'number', min: 120 },
      ],
      rows: [
        ['Berita & Kampanye',  Number(stat.total_kampanye ?? 0)],
        ['Program & Kegiatan', Number(jmlKegiatan)],
        ['Relawan',            Number(jmlRelawan)],
        ['Galeri',             Number(stat.total_galeri ?? 0)],
        ['Donasi',             Number(jmlDonasi)],
        ['Pengguna',           Number(stat.total_pengguna ?? 0)],
      ],
      ringkasan: [
        ['Relawan terdaftar', Number(jmlRelawan)],
        ['- Jenis Lansia', Number(jmlLansia)],
        ['- Jenis Kebencanaan', Number(jmlBencana)],
        ['Relawan diterima', Number(jmlDiterima)],
        ['Jumlah kegiatan', Number(jmlKegiatan)],
        ['Jumlah donasi', Number(jmlDonasi)],
        ...(isSuper ? [['Total donasi berhasil', fmtRp(totalNominal)]] : []),
      ],
    })
  }

  const handleQuickAction = (id) => {
    if (id === 'export') exportLaporan()
    else setActive(id)
  }

  return (
    <div className="ad-page">

      {/* ── Sidebar ── */}
      <aside className="ad-sidebar">
        <div className="ad-sidebar-top">
          <button type="button" className="ad-brand" onClick={() => setActive('dashboard')}
            style={{ border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', width: '100%' }}
            title="Ke Dashboard">
            <KarinakasLogo size={44} bleed={100} />
            <div style={{ minWidth: 0 }}>
              <div className="ad-brand-name">KARINAKAS</div>
              <div className="ad-brand-role">{isSuper ? 'Super Admin' : 'Admin Panel'}</div>
            </div>
          </button>
        </div>

        <nav className="ad-nav">
          <p className="ad-nav-label">Menu Utama</p>
          {visibleSideNav.map(item => (
            <button
              key={item.id}
              className={`ad-nav-item${active === item.id ? ' active' : ''}`}
              onClick={() => setActive(item.id)}
            >
              <i className={`bi ${item.icon} ad-nav-icon`}></i>
              <span className="ad-nav-text">{item.label}</span>
              {item.badge && <span className="ad-nav-badge">{item.badge}</span>}
              {item.superOnly && <i className="bi bi-shield-fill ad-nav-super-icon" title="Super Admin only"></i>}
            </button>
          ))}
          <p className="ad-nav-label mt-3">Lainnya</p>
          <button
            className={`ad-nav-item${active === 'pengaturan' ? ' active' : ''}`}
            onClick={() => setActive('pengaturan')}
          >
            <i className="bi bi-gear-fill ad-nav-icon"></i>
            <span className="ad-nav-text">Pengaturan</span>
          </button>
        </nav>

        <div className="ad-sidebar-bottom">
          <button className="ad-logout-btn" onClick={handleLogout}>
            <i className="bi bi-box-arrow-left"></i>
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* ── Main Body ── */}
      <div className="ad-body">

        {/* Topbar */}
        <header className="ad-topbar">
          <div className="ad-topbar-left">
            <h1 className="ad-topbar-title">{sectionTitle[active] ?? 'Dashboard'}</h1>
            <p className="ad-topbar-date">{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
          <div className="ad-topbar-right">
            <div className="ad-search-wrap">
              <i className="bi bi-search ad-search-icon"></i>
              <input type="text" className="ad-search-input" placeholder="Cari sesuatu..." />
            </div>
            <button className="ad-icon-btn" title="Notifikasi">
              <i className="bi bi-bell-fill"></i>
              <span className="ad-notif-dot"></span>
            </button>
            <div className="ad-topbar-user">
              <div className="ad-topbar-avatar">{user?.name?.[0]?.toUpperCase() ?? 'A'}</div>
              <div className="ad-topbar-userinfo">
                <span className="ad-topbar-name">{user?.name}</span>
                <span className="ad-topbar-role">{isSuper ? 'Super Admin' : 'Admin'}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content area */}
        <div className="ad-content">

          {/* CRUD sections */}
          {active === 'berita'     && <SectionBerita />}
          {active === 'program'    && <SectionKegiatan />}
          {active === 'relawan'    && <SectionRelawan />}
          {active === 'galeri'     && <SectionGaleri />}
          {active === 'donasi'     && <SectionDonasi />}
          {active === 'notifikasi' && <SectionNotifikasi />}
          {active === 'pengguna'   && isSuper && <SectionPengguna />}
          {active === 'audit'      && isSuper && <SectionAudit />}

          {/* Pengaturan — masih placeholder */}
          {active === 'pengaturan' && (
            <div className="ad-coming-soon">
              <div className="ad-coming-icon"><i className="bi bi-gear-wide-connected"></i></div>
              <h3 className="ad-coming-title">Pengaturan</h3>
              <p className="ad-coming-desc">Konfigurasi sistem akan tersedia setelah integrasi backend.</p>
              <button className="btn btn-danger rounded-pill px-4" onClick={() => setActive('dashboard')}>
                <i className="bi bi-arrow-left me-2"></i>Kembali ke Dashboard
              </button>
            </div>
          )}

          {/* ── Dashboard home ── */}
          {active === 'dashboard' && (
            <>
              <div className="ad-greeting">
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  <div>
                    <h2 className="ad-greeting-title">
                      {greeting}, {user?.name?.split(' ')[0]}! 👋
                      {isSuper && <span className="ad-super-badge ms-2">Super Admin</span>}
                    </h2>
                    <p className="ad-greeting-sub">
                      {isSuper
                        ? 'Anda memiliki akses penuh termasuk data keuangan dan donasi.'
                        : 'Berikut ringkasan aktivitas Karinakas hari ini.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats — dihitung dari data asli */}
              <div className="ad-stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                {stats.map(s => (
                  <div key={s.label} className="ad-stat-card">
                    <div className="ad-stat-icon" style={{ color: s.color, background: s.bg }}>
                      <i className={`bi ${s.icon}`}></i>
                    </div>
                    <div className="ad-stat-info">
                      <p className="ad-stat-label">{s.label}</p>
                      <p className="ad-stat-value">{loadingStats ? '…' : s.value}</p>
                      <span className="ad-stat-sub">{s.sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Breakdown relawan per jenis */}
              <div className="ad-breakdown">
                <div className="ad-breakdown-card">
                  <div className="ad-breakdown-head">
                    <span className="ad-card-title"><i className="bi bi-pie-chart-fill me-2 text-danger"></i>Relawan per Jenis</span>
                  </div>
                  <div className="ad-breakdown-row">
                    <div className="ad-bd-item">
                      <div className="ad-bd-icon" style={{ color: '#1d4ed8', background: '#EFF6FF' }}><i className="bi bi-person-walking"></i></div>
                      <div><p className="ad-bd-num">{jmlLansia}</p><p className="ad-bd-lbl">Lansia</p></div>
                    </div>
                    <div className="ad-bd-item">
                      <div className="ad-bd-icon" style={{ color: '#d97000', background: '#FFF3E6' }}><i className="bi bi-exclamation-triangle-fill"></i></div>
                      <div><p className="ad-bd-num">{jmlBencana}</p><p className="ad-bd-lbl">Kebencanaan</p></div>
                    </div>
                    <div className="ad-bd-bar">
                      <div className="ad-bd-bar-fill" style={{ width: `${jmlRelawan ? (jmlLansia / jmlRelawan) * 100 : 0}%`, background: '#1d4ed8' }} title={`Lansia: ${jmlLansia}`} />
                      <div className="ad-bd-bar-fill" style={{ width: `${jmlRelawan ? (jmlBencana / jmlRelawan) * 100 : 0}%`, background: '#d97000' }} title={`Kebencanaan: ${jmlBencana}`} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle row */}
              <div className="ad-middle">
                {isSuper ? (
                  <div className="ad-card">
                    <div className="ad-card-head">
                      <span className="ad-card-title"><i className="bi bi-cash-coin me-2 text-danger"></i>Donasi Terkini</span>
                      <div className="d-flex align-items-center gap-2">
                        <span className="ad-super-badge-sm">Super Admin</span>
                        <button className="ad-card-link" onClick={() => setActive('donasi')}>Kelola</button>
                      </div>
                    </div>
                    <div className="ad-table-wrap">
                      <table className="ad-table">
                        <thead><tr><th>Donatur</th><th>Tujuan</th><th>Nominal</th><th>Metode</th><th>Status</th></tr></thead>
                        <tbody>
                          {recentDonasi.length === 0
                            ? <tr><td colSpan={5} className="ad-empty-row">Belum ada donasi</td></tr>
                            : recentDonasi.map(d => (
                              <tr key={d.id}>
                                <td>
                                  <div className="ad-donor">
                                    <div className="ad-donor-av">{d.donatur[0]}</div>
                                    <div><div className="ad-donor-name">{d.donatur}</div><div className="ad-donor-date">{fmtTanggal(d.tanggal)}</div></div>
                                  </div>
                                </td>
                                <td className="ad-td-muted">{d.tujuan}</td>
                                <td><span className="ad-amount">{fmtRp(d.nominal)}</span></td>
                                <td className="ad-td-muted">{d.metode}</td>
                                <td><span className={`ad-badge ${STATUS_DONASI[d.status]?.cls || 'orange'}`}>{STATUS_DONASI[d.status]?.label || d.status}</span></td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="ad-card">
                    <div className="ad-card-head">
                      <span className="ad-card-title"><i className="bi bi-people-fill me-2 text-danger"></i>Relawan Terbaru</span>
                      <button className="ad-card-link" onClick={() => setActive('relawan')}>Kelola</button>
                    </div>
                    <div className="ad-table-wrap">
                      <table className="ad-table">
                        <thead><tr><th>Nama Relawan</th><th>Jenis</th><th>Tanggal</th><th>Status</th></tr></thead>
                        <tbody>
                          {recentRelawan.length === 0
                            ? <tr><td colSpan={4} className="ad-empty-row">Belum ada relawan</td></tr>
                            : recentRelawan.map(v => (
                              <tr key={v.id}>
                                <td>
                                  <div className="ad-donor">
                                    <div className="ad-donor-av">{v.nama[0]}</div>
                                    <div className="ad-donor-name">{v.nama}</div>
                                  </div>
                                </td>
                                <td className="ad-td-muted">{v.jenis}</td>
                                <td className="ad-td-muted">{v.tanggal}</td>
                                <td><span className={`ad-badge ${v.status === 'pending' ? 'orange' : v.status === 'diterima' ? 'green' : 'red'}`}>{v.status}</span></td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Activity feed */}
                <div className="ad-card">
                  <div className="ad-card-head">
                    <span className="ad-card-title"><i className="bi bi-activity me-2 text-danger"></i>Aktivitas</span>
                  </div>
                  <div className="ad-activity-list">
                    {visibleActivities.length === 0 && (
                      <p className="ad-td-muted" style={{ padding: '0.5rem 0' }}>{loadingStats ? 'Memuat aktivitas...' : 'Belum ada aktivitas terbaru.'}</p>
                    )}
                    {visibleActivities.map((a, i) => (
                      <div key={i} className="ad-activity-item">
                        <div className="ad-activity-icon" style={{ color: a.color, background: a.bg }}>
                          <i className={`bi ${a.icon}`}></i>
                        </div>
                        <div>
                          <p className="ad-activity-text">{a.text}</p>
                          <p className="ad-activity-time">{a.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick actions */}
              <div className="ad-quick-grid" style={{ gridTemplateColumns: `repeat(${visibleActions.length}, 1fr)` }}>
                {visibleActions.map(a => (
                  <button key={a.label} className="ad-quick-btn" onClick={() => handleQuickAction(a.id)}>
                    <div className="ad-quick-icon" style={{ color: a.color, background: a.bg }}>
                      <i className={`bi ${a.icon}`}></i>
                    </div>
                    <div>
                      <p className="ad-quick-label">{a.label}</p>
                      <p className="ad-quick-desc">{a.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
