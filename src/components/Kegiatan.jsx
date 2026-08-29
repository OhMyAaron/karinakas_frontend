import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const kegiatan = [
  {
    img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&h=300&fit=crop',
    category: 'Pendidikan',
    categoryColor: '#b07d00',
    categoryBg: '#FFF8DC',
    title: 'Bimbingan Belajar Anak',
    desc: 'Membantu anak-anak kurang mampu dalam pendidikan dan pembelajaran agar masa depan mereka lebih cerah.',
    date: '12 Mei 2026',
    location: 'Semarang',
  },
  {
    img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&h=300&fit=crop',
    category: 'Sosial',
    categoryColor: '#1a6b3a',
    categoryBg: '#E8F5E9',
    title: 'Bakti Sosial',
    desc: 'Kegiatan sosial untuk membantu masyarakat yang membutuhkan melalui pembagian sembako dan layanan.',
    date: '28 April 2026',
    location: 'Yogyakarta',
  },
  {
    img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&h=300&fit=crop',
    category: 'Kesehatan',
    categoryColor: '#C0392B',
    categoryBg: '#FFEBEE',
    title: 'Layanan Kesehatan Gratis',
    desc: 'Pemeriksaan kesehatan gratis untuk masyarakat umum yang kurang mampu mengakses fasilitas medis.',
    date: '17 Juni 2026',
    location: 'Klaten',
  },
]

function Kegiatan() {
  const ref = useRef(null)

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
  }, [])

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
          {kegiatan.map((item, i) => (
            <div
              className="col-md-4 reveal-item"
              key={item.title}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="card h-100 kegiatan-card">
                <div className="kegiatan-img-wrapper">
                  <img
                    src={item.img}
                    className="card-img-top kegiatan-img"
                    alt={item.title}
                  />
                  <span
                    className="category-badge"
                    style={{ color: item.categoryColor, background: item.categoryBg }}
                  >
                    {item.category}
                  </span>
                </div>
                <div className="card-body">
                  <h6 className="card-title">{item.title}</h6>
                  <p className="card-text text-muted">{item.desc}</p>
                  <div className="d-flex gap-3 text-muted small">
                    <span><i className="bi bi-calendar3 me-1"></i>{item.date}</span>
                    <span><i className="bi bi-geo-alt-fill me-1"></i>{item.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Kegiatan
