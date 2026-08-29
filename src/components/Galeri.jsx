import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { galeriService } from '../services/resources'

// Placeholder saat gambar gagal dimuat (mis. URL eksternal tak terjangkau)
const IMG_FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='100%25' height='100%25' fill='%23f0eeea'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='20' fill='%23b6b0a8' text-anchor='middle' dominant-baseline='middle'%3EFoto tidak tersedia%3C/text%3E%3C/svg%3E"
const onImgError = (e) => { if (!e.currentTarget.src.startsWith('data:')) e.currentTarget.src = IMG_FALLBACK }

function Galeri() {
  const ref = useRef(null)
  const [photos, setPhotos]   = useState([])
  const [loading, setLoading] = useState(true)

  // Ambil foto terbaru dari backend
  useEffect(() => {
    let alive = true
    galeriService.latest()
      .then(list => { if (alive) setPhotos(list.slice(0, 6)) })
      .catch(() => { if (alive) setPhotos([]) })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [])

  // Reveal animasi setelah foto termuat
  useEffect(() => {
    const container = ref.current
    if (!container) return
    const items = container.querySelectorAll('.reveal-item')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('revealed')
        })
      },
      { threshold: 0.1 }
    )
    items.forEach(item => observer.observe(item))
    return () => observer.disconnect()
  }, [photos])

  return (
    <section className="galeri-section">
      <div className="container">
        <div className="galeri-section-header d-flex justify-content-between align-items-end">
          <div>
            <h2 className="section-title mb-0">Galeri Karinakas</h2>
            <p className="section-subtitle mb-0">
              Momen-momen bermakna dari setiap kegiatan yang kami jalani bersama
            </p>
          </div>
          <Link to="/galeri" className="text-danger fw-semibold text-decoration-none flex-shrink-0 ms-4">
            Lihat semua &rarr;
          </Link>
        </div>

        <div className="row g-4" ref={ref}>
          {loading ? (
            <div className="col-12 text-center py-5">
              <div className="lg-spinner" style={{ borderTopColor: '#C0392B', width: 32, height: 32, borderWidth: 3, margin: '0 auto' }} />
            </div>
          ) : photos.length === 0 ? (
            <div className="col-12 text-center py-4 text-muted">
              <i className="bi bi-image-alt me-2"></i>Belum ada foto galeri.
            </div>
          ) : (
            photos.map((photo, i) => (
              <div
                className="col-md-4 reveal-item"
                key={photo.id}
                style={{ transitionDelay: `${(i % 3) * 0.12}s` }}
              >
                <Link to="/galeri" className="galeri-img-wrapper d-block">
                  <img src={photo.img} alt={photo.judul} className="galeri-img" loading="lazy" onError={onImgError} />
                  <div className="galeri-overlay">
                    <i className="bi bi-zoom-in"></i>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default Galeri
