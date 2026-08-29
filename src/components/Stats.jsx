import { useEffect, useRef, useState } from 'react'

const stats = [
  { end: 5000, suffix: '+', label: 'Penerima Manfaat', icon: 'bi-people-fill' },
  { end: 120, suffix: '+', label: 'Kegiatan Sosial', icon: 'bi-calendar-check-fill' },
  { end: 800, suffix: '+', label: 'Relawan Aktif', icon: 'bi-heart-fill' },
  { end: 15, suffix: '+', label: 'Tahun Berkarya', icon: 'bi-award-fill' },
]

function Counter({ end, suffix, duration = 1800 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const startTime = performance.now()
          const animate = (now) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * end))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration])

  return (
    <span ref={ref} className="stat-number">
      {count.toLocaleString('id-ID')}{suffix}
    </span>
  )
}

function Stats() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
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
    <section className="stats-section">
      <div className="container" ref={containerRef}>
        <div className="stats-header reveal-item text-center mb-5">
          <h2>Dampak Nyata Karinakas</h2>
          <p>Bersama-sama, kita telah menyentuh ribuan kehidupan di seluruh Indonesia</p>
        </div>
        <div className="row g-4 justify-content-center">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="col-6 col-md-3 reveal-item"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="stat-item">
                <i className={`bi ${s.icon} stat-icon`}></i>
                <Counter end={s.end} suffix={s.suffix} />
                <p className="stat-label">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
