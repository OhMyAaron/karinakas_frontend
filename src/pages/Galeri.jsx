import { useState, useMemo, useEffect } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import PageHero from '../components/PageHero'
import CTA from '../components/CTA'
import { fmtTanggal } from '../data/store'
import useResource from '../hooks/useResource'
import { galeriService } from '../services/resources'

const IMG_FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='100%25' height='100%25' fill='%23f0eeea'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='18' fill='%23b6b0a8' text-anchor='middle' dominant-baseline='middle'%3EFoto tidak tersedia%3C/text%3E%3C/svg%3E"
const onImgError = (e) => { if (!e.currentTarget.src.startsWith('data:')) e.currentTarget.src = IMG_FALLBACK }

function Galeri() {
  const { items: allPhotos, loading, error } = useResource(galeriService)
  const [activeAlbum, setActiveAlbum] = useState(null)   // nama kegiatan yang dibuka
  const [search, setSearch]           = useState('')
  const [lightbox, setLightbox]       = useState(null)   // index foto pada album aktif

  // Kelompokkan foto per nama kegiatan (album)
  const albums = useMemo(() => {
    const map = {}
    allPhotos.forEach(p => {
      const key = p.judul || '(Tanpa nama)'
      ;(map[key] = map[key] || []).push(p)
    })
    return Object.entries(map).map(([name, photos]) => ({
      name,
      photos,
      cover: (photos.find(x => x.img) || photos[0])?.img,
      count: photos.length,
    }))
  }, [allPhotos])

  const filteredAlbums = albums.filter(a => a.name.toLowerCase().includes(search.toLowerCase()))
  const currentAlbum   = activeAlbum ? albums.find(a => a.name === activeAlbum) : null
  const photos         = currentAlbum?.photos || []

  const openAlbum = (name) => { setActiveAlbum(name); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const backToAlbums = () => { setActiveAlbum(null); setLightbox(null) }

  // Navigasi lightbox
  const showPrev = () => setLightbox(i => (i - 1 + photos.length) % photos.length)
  const showNext = () => setLightbox(i => (i + 1) % photos.length)

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
      else if (e.key === 'ArrowLeft') showPrev()
      else if (e.key === 'ArrowRight') showNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox, photos.length])

  return (
    <>
      <Breadcrumb items={currentAlbum ? [{ label: 'Galeri' }, { label: currentAlbum.name }] : [{ label: 'Galeri' }]} />

      <PageHero
        label="GALERI KARINAKAS"
        desc="Dokumentasi kegiatan dan momen berharga dalam pelayanan kami untuk masyarakat. Setiap foto adalah bukti nyata komitmen kami untuk mengasihi dan melayani."
      />

      <section className="gl-section">
        <div className="container">

          {loading ? (
            <div className="gl-empty">
              <div className="lg-spinner" style={{ borderTopColor: '#C0392B', width: 32, height: 32, borderWidth: 3, margin: '0 auto 1rem' }} />
              <p>Memuat galeri...</p>
            </div>
          ) : error ? (
            <div className="gl-empty">
              <i className="bi bi-wifi-off"></i>
              <p>{error}</p>
            </div>

          /* ══ TAMPILAN ALBUM (daftar kegiatan) ══ */
          ) : !currentAlbum ? (
            <>
              <div className="gl-filter-bar">
                <div className="gl-filter-pills">
                  <span className="gl-albums-hint"><i className="bi bi-collection-fill me-2 text-danger"></i>{albums.length} kegiatan terdokumentasi — klik untuk lihat semua foto</span>
                </div>
                <div className="gl-search-wrapper">
                  <i className="bi bi-search gl-search-icon"></i>
                  <input className="gl-search-input" placeholder="Cari kegiatan..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
              </div>

              {filteredAlbums.length === 0 ? (
                <div className="gl-empty">
                  <i className="bi bi-image-alt"></i>
                  <p>{albums.length === 0 ? 'Belum ada foto galeri.' : 'Tidak ada kegiatan untuk kata kunci ini.'}</p>
                </div>
              ) : (
                <div className="row g-3">
                  {filteredAlbums.map(al => (
                    <div key={al.name} className="col-6 col-md-4 col-lg-3">
                      <div className="gl-card" style={{ cursor: 'pointer' }} onClick={() => openAlbum(al.name)}>
                        <div className="gl-card-img-wrapper gl-album-stack">
                          <img src={al.cover || IMG_FALLBACK} alt={al.name} className="gl-card-img" onError={onImgError} loading="lazy" />
                          <span className="gl-album-badge"><i className="bi bi-images me-1"></i>{al.count}</span>
                          <div className="gl-card-overlay"><i className="bi bi-folder2-open"></i></div>
                        </div>
                        <div className="gl-card-body">
                          <p className="gl-card-title">{al.name}</p>
                          <p className="gl-card-date"><i className="bi bi-images me-1"></i>{al.count} foto</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>

          /* ══ TAMPILAN DETAIL (semua foto dalam 1 kegiatan) ══ */
          ) : (
            <>
              <div className="gl-detail-head">
                <button className="gl-back-btn" onClick={backToAlbums}>
                  <i className="bi bi-arrow-left me-2"></i>Semua Kegiatan
                </button>
                <div>
                  <h2 className="gl-detail-title">{currentAlbum.name}</h2>
                  <p className="gl-detail-sub"><i className="bi bi-images me-1"></i>{photos.length} foto</p>
                </div>
              </div>

              <div className="row g-3">
                {photos.map((p, i) => (
                  <div key={p.id} className="col-6 col-md-4 col-lg-3">
                    <div className="gl-card" style={{ cursor: 'zoom-in' }} onClick={() => setLightbox(i)}>
                      <div className="gl-card-img-wrapper">
                        <img src={p.img || IMG_FALLBACK} alt={p.judul} className="gl-card-img" onError={onImgError} loading="lazy" />
                        <div className="gl-card-overlay"><i className="bi bi-zoom-in"></i></div>
                      </div>
                      <div className="gl-card-body">
                        {p.namaFoto && <p className="gl-card-title">{p.namaFoto}</p>}
                        <p className="gl-card-date"><i className="bi bi-calendar3 me-1"></i>{p.tanggal ? fmtTanggal(p.tanggal) : '—'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ══ LIGHTBOX ══ */}
      {lightbox !== null && photos[lightbox] && (
        <div className="gl-lightbox" onClick={() => setLightbox(null)}>
          <button className="gl-lb-close" onClick={() => setLightbox(null)} aria-label="Tutup"><i className="bi bi-x-lg"></i></button>
          {photos.length > 1 && (
            <button className="gl-lb-nav gl-lb-prev" onClick={e => { e.stopPropagation(); showPrev() }} aria-label="Sebelumnya"><i className="bi bi-chevron-left"></i></button>
          )}
          <div className="gl-lb-content" onClick={e => e.stopPropagation()}>
            <img src={photos[lightbox].img || IMG_FALLBACK} alt={photos[lightbox].judul} className="gl-lb-img" onError={onImgError} />
            <div className="gl-lb-caption">
              <span>{photos[lightbox].namaFoto || currentAlbum.name}</span>
              <span className="gl-lb-counter">{lightbox + 1} / {photos.length}</span>
            </div>
          </div>
          {photos.length > 1 && (
            <button className="gl-lb-nav gl-lb-next" onClick={e => { e.stopPropagation(); showNext() }} aria-label="Berikutnya"><i className="bi bi-chevron-right"></i></button>
          )}
        </div>
      )}

      <CTA />
    </>
  )
}

export default Galeri
