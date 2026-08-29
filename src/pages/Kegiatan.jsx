import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import PageHero from '../components/PageHero'
import CTA from '../components/CTA'
import {
  KATEGORI_KEGIATAN, KATEGORI_LABEL, KATEGORI_STYLE, fmtTanggal,
} from '../data/store'
import useResource from '../hooks/useResource'
import { kegiatanService } from '../services/resources'

const ITEMS_PER_PAGE = 6

const statusStyle = {
  aktif:      { color: '#1a6b3a', bg: '#E8F5E9', label: 'Aktif' },
  selesai:    { color: '#585858',    bg: '#F5F5F5', label: 'Selesai' },
  dibatalkan: { color: '#C0392B', bg: '#FFEBEE', label: 'Dibatalkan' },
}

const catIcon = {
  bantuan: 'bi-box-seam', pendidikan: 'bi-book', kesehatan: 'bi-heart-pulse',
  sosial: 'bi-people', lainnya: 'bi-three-dots',
}

const categoryList = [
  { id: 'semua', label: 'Semua Kegiatan', icon: 'bi-grid-fill' },
  ...KATEGORI_KEGIATAN.map(k => ({ id: k, label: KATEGORI_LABEL[k], icon: catIcon[k] })),
]

function KegiatanCard({ item, onClick }) {
  const badge = KATEGORI_STYLE[item.kategori] || KATEGORI_STYLE.lainnya
  const st    = statusStyle[item.status] || statusStyle.selesai
  return (
    <div className="gl-card kg-card-clickable" onClick={onClick}>
      <div className="gl-card-img-wrapper">
        <img src={item.img} alt={item.judul} className="gl-card-img" />
        <div className="gl-card-overlay"><i className="bi bi-arrow-right-circle"></i></div>
        {(item.butuhRelawan || item.butuhDonasi) && item.status === 'aktif' && (
          <div className="kg-card-flags">
            {item.butuhRelawan && <span className="kg-flag relawan"><i className="bi bi-person-heart"></i></span>}
            {item.butuhDonasi  && <span className="kg-flag donasi"><i className="bi bi-heart-fill"></i></span>}
          </div>
        )}
      </div>
      <div className="gl-card-body">
        <div className="d-flex gap-2 mb-2 flex-wrap">
          <span className="gl-badge" style={{ color: badge.color, background: badge.bg }}>{KATEGORI_LABEL[item.kategori]}</span>
          <span className="gl-badge" style={{ color: st.color, background: st.bg }}>{st.label}</span>
        </div>
        <p className="gl-card-title">{item.judul}</p>
        <p className="gl-card-date">
          <i className="bi bi-calendar3 me-1"></i>{fmtTanggal(item.tanggal)}
          <span className="mx-2">·</span>
          <i className="bi bi-geo-alt-fill me-1"></i>{item.lokasi}
        </p>
      </div>
    </div>
  )
}

function Pagination({ current, total, onChange }) {
  if (total <= 1) return null
  const pages = []
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || Math.abs(i - current) <= 1) pages.push(i)
    else if (pages[pages.length - 1] !== '...') pages.push('...')
  }
  return (
    <div className="gl-pagination mt-4">
      <button className="gl-page-btn" onClick={() => onChange(Math.max(1, current - 1))} disabled={current === 1}>
        <i className="bi bi-chevron-left"></i>
      </button>
      {pages.map((p, i) =>
        p === '...'
          ? <span key={`e${i}`} className="gl-page-ellipsis">...</span>
          : <button key={p} className={`gl-page-btn ${current === p ? 'active' : ''}`} onClick={() => onChange(p)}>{p}</button>
      )}
      <button className="gl-page-btn" onClick={() => onChange(Math.min(total, current + 1))} disabled={current === total}>
        <i className="bi bi-chevron-right"></i>
      </button>
    </div>
  )
}

function Kegiatan() {
  const { items: allKegiatan, loading, error } = useResource(kegiatanService)

  const [search,      setSearch]      = useState('')
  const [catFilter,   setCatFilter]   = useState('semua')
  const [statFilter,  setStatFilter]  = useState('semua')
  const [sortBy,      setSortBy]      = useState('terbaru')
  const [currentPage, setCurrentPage] = useState(1)
  const [selected,    setSelected]    = useState(null)
  const topRef = useRef(null)

  const counts = categoryList.reduce((acc, cat) => {
    acc[cat.id] = cat.id === 'semua' ? allKegiatan.length : allKegiatan.filter(k => k.kategori === cat.id).length
    return acc
  }, {})

  let filtered = allKegiatan.filter(k => {
    const matchCat    = catFilter  === 'semua' || k.kategori === catFilter
    const matchStatus = statFilter === 'semua' || k.status   === statFilter
    const matchSearch = k.judul.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchStatus && matchSearch
  })

  if (sortBy === 'terbaru') filtered = [...filtered].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))
  else if (sortBy === 'terlama') filtered = [...filtered].sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal))
  else if (sortBy === 'az') filtered = [...filtered].sort((a, b) => a.judul.localeCompare(b.judul))

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paged      = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const handlePage = (p) => {
    setCurrentPage(p)
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const gridRef = useRef(null)
  useEffect(() => {
    const container = gridRef.current
    if (!container) return
    container.querySelectorAll('.gl-card-wrap').forEach((el, i) => {
      el.classList.remove('revealed')
      setTimeout(() => el.classList.add('revealed'), i * 60)
    })
  }, [paged])

  const st = selected ? (statusStyle[selected.status] || statusStyle.selesai) : null
  // Kuota relawan (terisi dari backend: jumlah_relawan_terdaftar)
  const kuota   = selected ? (Number(selected.kuotaRelawan) || 0) : 0
  const terisi  = selected ? (Number(selected.terisi) || 0) : 0
  const penuh   = kuota > 0 && terisi >= kuota
  const sisa    = kuota > 0 ? Math.max(0, kuota - terisi) : null

  return (
    <>
      <Breadcrumb items={[{ label: 'Kegiatan' }]} />

      <PageHero
        label="DAFTAR KEGIATAN"
        desc="Berbagai kegiatan sosial Karinakas. Klik kegiatan untuk ikut sebagai relawan atau berdonasi bagi yang membutuhkan."
      >
        <Link to="/login" className="btn btn-danger rounded-pill px-4 fw-semibold">
          Gabung/Login
        </Link>
      </PageHero>

      <section className="gl-section" ref={topRef}>
        <div className="container">
          <div className="row g-4">

            {/* Left: filter + grid */}
            <div className="col-lg-9">
              <div className="kg-filter-bar">
                <div className="gl-search-wrapper">
                  <i className="bi bi-search gl-search-icon"></i>
                  <input className="gl-search-input" placeholder="Cari Kegiatan..." value={search}
                    onChange={e => { setSearch(e.target.value); setCurrentPage(1) }} style={{ width: 180 }} />
                </div>
                <select className="kg-select" value={catFilter} onChange={e => { setCatFilter(e.target.value); setCurrentPage(1) }}>
                  <option value="semua">Semua Kategori</option>
                  {categoryList.filter(c => c.id !== 'semua').map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
                <select className="kg-select" value={statFilter} onChange={e => { setStatFilter(e.target.value); setCurrentPage(1) }}>
                  <option value="semua">Semua Status</option>
                  <option value="aktif">Aktif</option>
                  <option value="selesai">Selesai</option>
                  <option value="dibatalkan">Dibatalkan</option>
                </select>
                <select className="kg-select" value={sortBy} onChange={e => { setSortBy(e.target.value); setCurrentPage(1) }}>
                  <option value="terbaru">Terbaru</option>
                  <option value="terlama">Terlama</option>
                  <option value="az">A–Z</option>
                </select>
              </div>

              {loading ? (
                <div className="gl-empty">
                  <div className="lg-spinner" style={{ borderTopColor: '#C0392B', width: 32, height: 32, borderWidth: 3, margin: '0 auto 1rem' }} />
                  <p>Memuat kegiatan...</p>
                </div>
              ) : error ? (
                <div className="gl-empty">
                  <i className="bi bi-wifi-off"></i>
                  <p>{error}</p>
                </div>
              ) : paged.length > 0 ? (
                <div className="row g-3" ref={gridRef}>
                  {paged.map((item, i) => (
                    <div key={item.id} className="col-6 col-md-4 gl-card-wrap reveal-item" style={{ transitionDelay: `${i * 0.06}s` }}>
                      <KegiatanCard item={item} onClick={() => setSelected(item)} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="gl-empty">
                  <i className="bi bi-calendar-x"></i>
                  <p>Tidak ada kegiatan yang sesuai.</p>
                </div>
              )}

              <Pagination current={currentPage} total={totalPages} onChange={handlePage} />
            </div>

            {/* Sidebar */}
            <div className="col-lg-3">
              <div className="kg-sidebar-card mb-3">
                <h6 className="kg-sidebar-title">Kategori Kegiatan</h6>
                <ul className="kg-cat-list">
                  {categoryList.map(cat => (
                    <li key={cat.id}>
                      <button className={`kg-cat-btn ${catFilter === cat.id ? 'active' : ''}`} onClick={() => { setCatFilter(cat.id); setCurrentPage(1) }}>
                        <span className="kg-cat-label"><i className={`bi ${cat.icon} me-2`}></i>{cat.label}</span>
                        <span className="kg-cat-count">{counts[cat.id]}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="kg-sidebar-cta">
                <div className="kg-cta-icon"><i className="bi bi-lightbulb-fill"></i></div>
                <h6 className="fw-bold mb-1">Punya Ide Kegiatan?</h6>
                <p className="small text-muted mb-3">Usulkan kegiatan sosial untuk bersama-sama kami wujudkan.</p>
                <Link to="/kontak" className="btn btn-danger btn-sm rounded-pill px-3 fw-semibold w-100">Kirim Usulan</Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Detail modal ── */}
      {selected && (
        <div className="kg-modal-overlay" onClick={() => setSelected(null)}>
          <div className="kg-modal" onClick={e => e.stopPropagation()}>
            <button className="kg-modal-close" onClick={() => setSelected(null)}><i className="bi bi-x-lg"></i></button>
            <div className="kg-modal-img">
              <img src={selected.img} alt={selected.judul} />
              <div className="kg-modal-badges">
                <span className="gl-badge" style={{ color: st.color, background: st.bg }}>{st.label}</span>
                <span className="gl-badge" style={{ color: (KATEGORI_STYLE[selected.kategori] || {}).color, background: (KATEGORI_STYLE[selected.kategori] || {}).bg }}>{KATEGORI_LABEL[selected.kategori]}</span>
              </div>
            </div>
            <div className="kg-modal-body">
              <h3 className="kg-modal-title">{selected.judul}</h3>
              <div className="kg-modal-meta">
                <span><i className="bi bi-calendar3 me-1 text-danger"></i>{fmtTanggal(selected.tanggal)}</span>
                <span><i className="bi bi-geo-alt-fill me-1 text-danger"></i>{selected.lokasi}</span>
              </div>
              <p className="kg-modal-desc">{selected.deskripsi}</p>

              {/* Kebutuhan kegiatan */}
              {(selected.butuhRelawan || selected.butuhDonasi) ? (
                <div className="kg-modal-needs">
                  <p className="kg-needs-label">Kegiatan ini membuka:</p>
                  <div className="d-flex gap-2 flex-wrap">
                    {selected.butuhRelawan && <span className="kg-need-chip relawan"><i className="bi bi-person-heart me-1"></i>Pendaftaran Relawan</span>}
                    {selected.butuhDonasi  && <span className="kg-need-chip donasi"><i className="bi bi-heart-fill me-1"></i>Donasi</span>}
                  </div>
                  {selected.butuhRelawan && selected.status === 'aktif' && (
                    <div className="kg-kuota">
                      {kuota > 0 ? (
                        <>
                          <div className="kg-kuota-head">
                            <span><i className="bi bi-people-fill me-1"></i>Kuota relawan</span>
                            <span className={penuh ? 'text-danger fw-bold' : 'fw-bold'}>{terisi}/{kuota}{penuh ? ' · Penuh' : ` · sisa ${sisa}`}</span>
                          </div>
                          <div className="kg-kuota-bar">
                            <div className="kg-kuota-fill" style={{ width: `${Math.min(100, (terisi / kuota) * 100)}%`, background: penuh ? '#C0392B' : '#6d28d9' }} />
                          </div>
                        </>
                      ) : (
                        <p className="kg-kuota-unlimited"><i className="bi bi-infinity me-1"></i>Pendaftaran relawan tidak dibatasi</p>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="kg-modal-needs">
                  <p className="kg-needs-label mb-0"><i className="bi bi-info-circle me-1"></i>Kegiatan ini tidak membuka pendaftaran relawan atau donasi.</p>
                </div>
              )}

              {/* Aksi */}
              <div className="kg-modal-actions">
                {selected.status === 'aktif' ? (
                  <>
                    {selected.butuhRelawan && (
                      penuh ? (
                        <button className="btn btn-secondary rounded-pill px-4 fw-semibold" disabled>
                          <i className="bi bi-lock-fill me-2"></i>Kuota Relawan Penuh
                        </button>
                      ) : (
                        <Link to={`/daftar-relawan?kegiatan=${selected.id}`} className="btn btn-danger rounded-pill px-4 fw-semibold">
                          <i className="bi bi-person-plus me-2"></i>Daftar Relawan
                        </Link>
                      )
                    )}
                    {selected.butuhDonasi && (
                      <Link to={`/donasi?kegiatan=${selected.id}`} className="btn rounded-pill px-4 fw-semibold kg-btn-donasi">
                        <i className="bi bi-heart-fill me-2"></i>Donasi Sekarang
                      </Link>
                    )}
                    {!selected.butuhRelawan && !selected.butuhDonasi && (
                      <button className="btn btn-outline-secondary rounded-pill px-4" onClick={() => setSelected(null)}>Tutup</button>
                    )}
                  </>
                ) : (
                  <button className="btn btn-outline-secondary rounded-pill px-4" onClick={() => setSelected(null)}>
                    Kegiatan telah {st.label.toLowerCase()} · Tutup
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <CTA />
    </>
  )
}

export default Kegiatan
