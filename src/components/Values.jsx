import { useEffect, useRef } from 'react'

const values = [
  {
    icon: 'bi-bag-check-fill',
    title: 'Transparan',
    desc: 'Setiap donasi dan kegiatan dilaporkan secara terbuka kepada seluruh pemangku kepentingan',
    iconColor: '#e6ac00',
    iconBg: '#FFFBEA',
  },
  {
    icon: 'bi-shield-check',
    title: 'Terpercaya',
    desc: 'Dikelola dengan integritas tinggi dan tanggung jawab penuh terhadap masyarakat',
    iconColor: '#C0392B',
    iconBg: '#FFF0F0',
  },
  {
    icon: 'bi-heart-fill',
    title: 'Berdampak',
    desc: 'Program-program kami dirancang untuk menyentuh dan mengubah banyak kehidupan',
    iconColor: '#e05555',
    iconBg: '#FFF0F0',
  },
  {
    icon: 'bi-people-fill',
    title: 'Bersama',
    desc: 'Kami percaya bahwa perubahan sejati terjadi ketika kita melangkah bersama-sama',
    iconColor: '#d97000',
    iconBg: '#FFF3E6',
  },
]

function Values() {
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
      { threshold: 0.15 }
    )
    items.forEach(item => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="values-section">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="section-title">Mengapa Karinakas?</h2>
          <p className="section-subtitle mx-auto" style={{ maxWidth: 520 }}>
            Kami hadir bukan sekadar memberi bantuan, tapi membangun harapan dengan
            landasan nilai yang kuat dan terpercaya
          </p>
        </div>
        <div className="row g-4" ref={ref}>
          {values.map((v, i) => (
            <div
              key={v.title}
              className="col-6 col-md-3 reveal-item"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="value-card">
                <div className="value-icon-wrapper" style={{ background: v.iconBg }}>
                  <i className={`bi ${v.icon}`} style={{ color: v.iconColor }}></i>
                </div>
                <h6>{v.title}</h6>
                <p className="text-muted mb-0">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Values
