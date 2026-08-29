import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import CTA from '../components/CTA'
import Breadcrumb from '../components/Breadcrumb'
import useResource from '../hooks/useResource'
import { beritaService } from '../services/resources'

const badgeStyle = {
  sosial:      { color: '#1a6b3a', bg: '#E8F5E9' },
  pendidikan:  { color: '#1d4ed8', bg: '#EFF6FF' },
  kesehatan:   { color: '#C0392B', bg: '#FFEBEE' },
  kegiatan:    { color: '#6d28d9', bg: '#F3E8FF' },
  pengumuman:  { color: '#d97000', bg: '#FFF3E6' },
}

function BeritaDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { items: allBerita, loading } = useResource(beritaService)
  const berita = allBerita.find(b => String(b.id) === String(id))

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [id])

  if (loading) {
    return (
      <div className="container py-5 text-center" style={{ minHeight: '50vh' }}>
        <div className="lg-spinner" style={{ borderTopColor: '#C0392B', width: 36, height: 36, borderWidth: 3, margin: '3rem auto' }} />
        <p style={{ color: '#606060' }}>Memuat berita...</p>
      </div>
    )
  }

  if (!berita) {
    return (
      <div className="container py-5 text-center">
        <i className="bi bi-newspaper" style={{ fontSize: '4rem', color: '#ddd', display: 'block', marginBottom: '1rem' }}></i>
        <h2 style={{ color: '#606060' }}>Berita tidak ditemukan</h2>
        <Link to="/berita" className="btn btn-danger mt-3 rounded-pill px-4">Kembali ke Berita</Link>
      </div>
    )
  }

  const badge   = badgeStyle[berita.category] || { color: '#555', bg: '#F5F5F5' }
  const related = allBerita.filter(b => b.category === berita.category && String(b.id) !== String(berita.id)).slice(0, 3)

  return (
    <>
      <Breadcrumb items={[
        { label: 'Berita Hari Ini', path: '/berita' },
        { label: berita.title, truncate: true },
      ]} />

      {/* Article */}
      <section className="bt-detail-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">

              {/* Header */}
              <div className="bt-detail-header">
                <span className="bt-badge" style={{ color: badge.color, background: badge.bg, fontSize: '0.8rem', padding: '4px 14px' }}>
                  {berita.categoryLabel}
                </span>
                <h1 className="bt-detail-title">{berita.title}</h1>
                <div className="bt-detail-meta">
                  <img src={berita.authorAvatar} alt={berita.author} className="bt-avatar bt-avatar-lg" />
                  <div>
                    <span className="bt-meta-author-lg">{berita.author}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                      <span className="bt-meta-date"><i className="bi bi-calendar3 me-1"></i>{berita.date}</span>
                      <span className="bt-meta-sep">·</span>
                      <span className="bt-meta-date">{berita.time}</span>
                      <span className="bt-meta-sep">·</span>
                      <span className="bt-meta-read"><i className="bi bi-clock me-1"></i>{berita.readTime} baca</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured image */}
              <div className="bt-detail-img-wrapper">
                <img src={berita.img} alt={berita.title} className="bt-detail-img" />
              </div>

              {/* Body */}
              <div className="bt-detail-body">
                {(berita.content || []).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Tags */}
              {(berita.tags || []).length > 0 && (
                <div className="bt-tags">
                  <i className="bi bi-tags me-2 text-danger"></i>
                  {(berita.tags || []).map(tag => (
                    <span key={tag} className="bt-tag">#{tag}</span>
                  ))}
                </div>
              )}

              {/* Back */}
              <div className="mt-4 mb-5">
                <button
                  className="btn btn-outline-danger rounded-pill px-4"
                  onClick={() => navigate('/berita')}
                >
                  <i className="bi bi-arrow-left me-2"></i>Kembali ke Berita
                </button>
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="bt-related-section">
              <h2 className="bt-related-title">Berita Terkait</h2>
              <div className="row g-3">
                {related.map(b => {
                  const rbadge = badgeStyle[b.category] || { color: '#555', bg: '#F5F5F5' }
                  return (
                    <div key={b.id} className="col-md-4">
                      <Link to={`/berita/${b.id}`} className="bt-related-card">
                        <div className="bt-related-img-wrapper">
                          <img src={b.img} alt={b.title} className="bt-related-img" />
                        </div>
                        <div className="bt-related-body">
                          <span className="bt-badge" style={{ color: rbadge.color, background: rbadge.bg, fontSize: '0.72rem', padding: '3px 10px' }}>
                            {b.categoryLabel}
                          </span>
                          <p className="bt-related-card-title">{b.title}</p>
                          <p className="bt-related-date"><i className="bi bi-calendar3 me-1"></i>{b.date}</p>
                        </div>
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

        </div>
      </section>

      <CTA />
    </>
  )
}

export default BeritaDetail
