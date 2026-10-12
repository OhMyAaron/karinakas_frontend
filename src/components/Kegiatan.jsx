import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { kegiatanService } from '../services/resources'
import { KATEGORI_LABEL, KATEGORI_STYLE, fmtTanggal } from '../data/store'

const JUMLAH_TAMPIL = 3

// Placeholder saat gambar kosong atau gagal dimuat
const IMG_FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='300'%3E%3Crect width='100%25' height='100%25' fill='%23f0eeea'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='20' fill='%23b6b0a8' text-anchor='middle' dominant-baseline='middle'%3EFoto tidak tersedia%3C/text%3E%3C/svg%3E"
const onImgError = (e) => { if (!e.currentTarget.src.startsWith('data:')) e.currentTarget.src = IMG_FALLBACK }

const ringkas = (teks, maks = 120) => (teks.length > maks ? `${teks.slice(0, maks).trimEnd()}…` : teks)

function Kegiatan() {
  const ref = useRef(null)
  const [items, setItems]     = useState([])
  const [loading, setLoading] = useState(true)

  // Kegiatan yang sedang berjalan (status aktif), tanggal terbaru lebih dulu
  useEffect(() => {
    let alive = true
    kegiatanService.list({ status: 'aktif', sort_by: 'tanggal_mulai', sort_order: 'desc' })
      .then(list => { if (alive) setItems(list.slice(0, JUMLAH_TAMPIL)) })
      .catch(() => { if (alive) setItems([]) })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [])

  // Reveal animasi setelah kartu termuat
  useEffect(() => {
    const container = ref.current
    if (!container) return
    const els = container.querySelectorAll('.reveal-item')
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('revealed')
        })
      },
      { threshold: 0.1 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [items])

  return (
    <section className="kegiatan-section">
      <div className="container">
        <div className="kegiatan-section-header d-flex justify-content-between align-items-end">
          <div>
            <h2 className="section-title mb-0">Kegiatan Kami</h2>
            <p className="section-subtitle mb-0">
              Berbagai program nyata yang kami jalankan untuk masyarakat
            </p>
          </div>
          <Link to="/kegiatan" className="text-danger fw-semibold text-decoration-none flex-shrink-0 ms-4">
            Lihat semua &rarr;
          </Link>
        </div>

        <div className="row g-4" ref={ref}>
          {loading ? (
            <div className="col-12 text-center py-5">
              <div className="lg-spinner" style={{ borderTopColor: '#C0392B', width: 32, height: 32, borderWidth: 3, margin: '0 auto' }} />
            </div>
          ) : items.length === 0 ? (
            <div className="col-12 text-center py-4 text-muted">
              <i className="bi bi-calendar-x me-2"></i>Belum ada kegiatan yang sedang berjalan.
            </div>
          ) : (
            items.map((item, i) => {
              const badge = KATEGORI_STYLE[item.kategori] || KATEGORI_STYLE.lainnya
              return (
                <div
                  className="col-md-4 reveal-item"
                  key={item.id}
                  style={{ transitionDelay: `${i * 0.12}s` }}
                >
                  <Link to="/kegiatan" className="text-decoration-none d-block h-100">
                    <div className="card h-100 kegiatan-card">
                      <div className="kegiatan-img-wrapper">
                        <img
                          src={item.img || IMG_FALLBACK}
                          className="card-img-top kegiatan-img"
                          alt={item.judul}
                          loading="lazy"
                          onError={onImgError}
                        />
                        <span
                          className="category-badge"
                          style={{ color: badge.color, background: badge.bg }}
                        >
                          {KATEGORI_LABEL[item.kategori] || KATEGORI_LABEL.lainnya}
                        </span>
                      </div>
                      <div className="card-body">
                        <h6 className="card-title">{item.judul}</h6>
                        <p className="card-text text-muted">{ringkas(item.deskripsi)}</p>
                        <div className="d-flex gap-3 text-muted small">
                          <span><i className="bi bi-calendar3 me-1"></i>{fmtTanggal(item.tanggal)}</span>
                          {item.lokasi && <span><i className="bi bi-geo-alt-fill me-1"></i>{item.lokasi}</span>}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}

export default Kegiatan
