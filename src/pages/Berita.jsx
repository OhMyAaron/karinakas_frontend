import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import PageHero from '../components/PageHero'
import CTA from '../components/CTA'
import useResource from '../hooks/useResource'
import { beritaService } from '../services/resources'

const ITEMS_PER_PAGE = 6

const categories = [
  { id: 'semua',      label: 'Semua',       icon: 'bi-grid-fill' },
  { id: 'sosial',     label: 'Sosial',      icon: 'bi-heart' },
  { id: 'pendidikan', label: 'Pendidikan',  icon: 'bi-book' },
  { id: 'kesehatan',  label: 'Kesehatan',   icon: 'bi-heart-pulse' },
  { id: 'pengumuman', label: 'Pengumuman',  icon: 'bi-megaphone' },
]

const badgeStyle = {
  sosial:      { color: '#1a6b3a', bg: '#E8F5E9' },
  pendidikan:  { color: '#1d4ed8', bg: '#EFF6FF' },
  kesehatan:   { color: '#C0392B', bg: '#FFEBEE' },
  kegiatan:    { color: '#6d28d9', bg: '#F3E8FF' },
  pengumuman:  { color: '#d97000', bg: '#FFF3E6' },
}

function BeritaCard({ berita }) {
  const navigate = useNavigate()
  const badge = badgeStyle[berita.category] || { color: '#555', bg: '#F5F5F5' }
  return (
    <div className="bt-card" onClick={() => navigate(`/berita/${berita.id}`)}>
      <div className="bt-card-img-wrapper">
        <img src={berita.img} alt={berita.title} className="bt-card-img" />
        <div className="bt-card-overlay"><i className="bi bi-arrow-right-circle"></i></div>
      </div>
      <div className="bt-card-body">
        <span className="bt-badge" style={{ color: badge.color, background: badge.bg }}>
          {berita.categoryLabel}
        </span>
        <h3 className="bt-card-title">{berita.title}</h3>
        <p className="bt-card-excerpt">{berita.excerpt}</p>
        <div className="bt-card-meta">
          <img src={berita.authorAvatar} alt={berita.author} className="bt-avatar" />
          <span className="bt-meta-author">{berita.author}</span>
          <span className="bt-meta-sep">·</span>
          <span className="bt-meta-date"><i className="bi bi-calendar3 me-1"></i>{berita.date}</span>
          <span className="bt-meta-sep">·</span>
          <span className="bt-meta-read"><i className="bi bi-clock me-1"></i>{berita.readTime} baca</span>
        </div>
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
    <div className="gl-pagination">
      <button className="gl-page-btn" onClick={() => onChange(Math.max(1, current - 1))} disabled={current === 1}>
        <i className="bi bi-chevron-left"></i>
      </button>
      {pages.map((p, i) =>
        p === '...'
          ? <span key={`e-${i}`} className="gl-page-ellipsis">...</span>
          : <button key={p} className={`gl-page-btn ${current === p ? 'active' : ''}`} onClick={() => onChange(p)}>{p}</button>
      )}
      <button className="gl-page-btn" onClick={() => onChange(Math.min(total, current + 1))} disabled={current === total}>
        <i className="bi bi-chevron-right"></i>
      </button>
    </div>
  )
}

function Berita() {
  const { items: allBerita, loading, error } = useResource(beritaService)
  const [search, setSearch]           = useState('')
  const [activeCategory, setCategory] = useState('semua')
  const [sort, setSort]               = useState('terbaru')
  const [currentPage, setCurrentPage] = useState(1)
  const filterRef = useRef(null)
  const gridRef   = useRef(null)

  const filtered = allBerita
    .filter(b => {
      const isPublished = (b.status || 'published') === 'published'
      const matchCat    = activeCategory === 'semua' || b.category === activeCategory
      const matchSearch = (b.title || '').toLowerCase().includes(search.toLowerCase()) ||
                          (b.excerpt || '').toLowerCase().includes(search.toLowerCase())
      return isPublished && matchCat && matchSearch
    })
    .sort((a, b) => {
      const da = new Date(a.publishedAt || 0), db = new Date(b.publishedAt || 0)
      return sort === 'terbaru' ? db - da : da - db
    })

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paged      = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const handleSearch   = e => { setSearch(e.target.value); setCurrentPage(1) }
  const handleCategory = id => { setCategory(id); setCurrentPage(1) }
  const handlePage     = p => {
    setCurrentPage(p)
    filterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    const container = gridRef.current
    if (!container) return
    container.querySelectorAll('.bt-card-wrap').forEach((el, i) => {
      el.classList.remove('revealed')
      setTimeout(() => el.classList.add('revealed'), i * 80)
    })
  }, [paged])

  return (
    <>
      <Breadcrumb items={[{ label: 'Berita Hari Ini' }]} />

      <PageHero
        label="BERITA HARI INI"
        title={<>Informasi &amp; <br /><span className="text-danger">Kabar Terkini</span></>}
        desc="Ikuti perkembangan terbaru kegiatan, program, dan dampak nyata yang telah kami wujudkan bersama untuk masyarakat."
      />

      {/* Content */}
      <section className="bt-section">
        <div className="container">

          {/* Filter bar */}
          <div className="gl-filter-bar" ref={filterRef}>
            <div className="gl-filter-pills">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`gl-filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => handleCategory(cat.id)}
                >
                  <i className={`bi ${cat.icon} me-1`}></i>
                  {cat.label}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
              <div className="gl-search-wrapper">
                <i className="bi bi-search gl-search-icon"></i>
                <input
                  className="gl-search-input"
                  placeholder="Cari berita..."
                  value={search}
                  onChange={handleSearch}
                />
              </div>
              <select className="kg-select" value={sort} onChange={e => { setSort(e.target.value); setCurrentPage(1) }}>
                <option value="terbaru">Terbaru</option>
                <option value="terlama">Terlama</option>
              </select>
              <span className="bt-result-count">{filtered.length} berita</span>
            </div>
          </div>

          {/* Grid */}
          <div ref={gridRef}>
            {loading ? (
              <div className="gl-empty">
                <div className="lg-spinner" style={{ borderTopColor: '#C0392B', width: 32, height: 32, borderWidth: 3, margin: '0 auto 1rem' }} />
                <p>Memuat berita...</p>
              </div>
            ) : error ? (
              <div className="gl-empty">
                <i className="bi bi-wifi-off"></i>
                <p>{error}</p>
              </div>
            ) : paged.length > 0 ? (
              <div className="row g-3">
                {paged.map((berita, i) => (
                  <div
                    key={berita.id}
                    className="col-md-6 col-lg-4 bt-card-wrap"
                    style={{ transitionDelay: `${i * 0.08}s` }}
                  >
                    <BeritaCard berita={berita} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="gl-empty">
                <i className="bi bi-newspaper"></i>
                <p>Tidak ada berita untuk kata kunci ini.</p>
              </div>
            )}
          </div>

          <Pagination current={currentPage} total={totalPages} onChange={handlePage} />
        </div>
      </section>

      <CTA />
    </>
  )
}

export default Berita
