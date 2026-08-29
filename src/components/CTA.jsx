import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

function CTA() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.reveal-item').forEach(item => item.classList.add('revealed'))
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="cta-section" ref={ref}>
      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="reveal-item" style={{ transitionDelay: '0s' }}>
          <p className="text-white fw-semibold mb-2" style={{ opacity: 0.75, letterSpacing: 1, fontSize: '0.85rem', textTransform: 'uppercase' }}>
            Bergabunglah Bersama Kami
          </p>
          <h2 className="cta-title text-white mb-3">
            Mari Menjadi Bagian<br />Dari Perubahan Nyata
          </h2>
          <p className="cta-subtitle text-white mb-5 mx-auto" style={{ maxWidth: 520 }}>
            Setiap langkah kecilmu — donasi, waktu, atau tenaga — adalah nyawa bagi
            mereka yang membutuhkan bantuan kita.
          </p>
        </div>
        <div
          className="d-flex justify-content-center gap-3 flex-wrap reveal-item"
          style={{ transitionDelay: '0.18s' }}
        >
          <Link to="/donasi" className="btn rounded-pill btn-cta-primary">
            Donasi Sekarang
          </Link>
          <Link to="/daftar-relawan" className="btn rounded-pill btn-cta-secondary">
            Daftar Relawan
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CTA
