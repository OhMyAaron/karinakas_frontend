import { useState, useEffect, useRef } from 'react'
import heroImg from '../assets/hero.jpeg'
import { DAFTAR_STATISTIK, fmtStatistik } from '../data/lembaga'

// Foto Karinakas — letakkan di public/intro/ dengan nama berikut.
// Selama file belum ada, otomatis memakai foto hero bawaan.
const STORY = [
  { img: '/intro/karinakas-1.jpg', side: 'left',  kicker: 'Posyandu Lansia', icon: 'bi-heart-pulse-fill',
    title: 'Pemeriksaan Kesehatan Rutin',
    text: 'Cek tekanan darah dan kondisi kesehatan bagi para lansia agar keluhan terdeteksi sejak dini dan tertangani dengan baik.' },
  { img: '/intro/karinakas-2.jpg', side: 'right', kicker: 'Deteksi Dini', icon: 'bi-clipboard2-pulse-fill',
    title: 'Pemantauan Kesehatan Berkala',
    text: 'Pengukuran tekanan darah, berat badan, dan pencatatan rutin membantu memantau kesehatan warga lanjut usia dari waktu ke waktu.' },
  { img: '/intro/karinakas-3.jpg', side: 'left',  kicker: 'Pendampingan', icon: 'bi-house-heart-fill',
    title: 'Kunjungan & Pendampingan',
    text: 'Relawan menyapa dan mendampingi lansia langsung ke rumah, memastikan mereka tetap diperhatikan dan tidak merasa sendiri.' },
  { img: '/intro/karinakas-4.jpg', side: 'right', kicker: 'Perawatan Lansia', icon: 'bi-bandaid-fill',
    title: 'Perawatan Penuh Kasih',
    text: 'Dari merawat kebersihan hingga kebutuhan sehari-hari, kami hadir memberi perhatian tulus bagi para lansia.' },
]

const STATS = DAFTAR_STATISTIK.map(s => [s.icon, fmtStatistik(s), s.label])

const onImgError = (e) => {
  if (!e.currentTarget.src.endsWith(heroImg)) e.currentTarget.src = heroImg
}

function IntroScreen({ onEnter }) {
  const [leaving, setLeaving] = useState(false)
  const scrollRef = useRef(null)

  const handleEnter = () => {
    setLeaving(true)
    setTimeout(() => onEnter(), 650)
  }

  const scrollToStory = () => {
    scrollRef.current?.querySelector('.intro-story')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Reveal saat elemen masuk layar
  useEffect(() => {
    const root = scrollRef.current
    if (!root) return
    const obs = new IntersectionObserver(
      entries => entries.forEach(en => { if (en.isIntersecting) en.target.classList.add('in') }),
      { root, threshold: 0.25 }
    )
    root.querySelectorAll('.intro-reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div className={`intro-scroll${leaving ? ' leaving' : ''}`} ref={scrollRef}>

      {/* Tombol lewati (selalu terlihat) */}
      <button className="intro-skip" onClick={handleEnter}>
        Lewati <i className="bi bi-chevron-double-right ms-1"></i>
      </button>

      {/* ── HERO ── */}
      <section className="intro-hero">
        <div className="intro-hero-inner">
          <div className="intro-brand">
            <span className="intro-logo-ring">
              <img src="/karinakas-logo.png" alt="Karinakas" className="intro-logo-img" />
            </span>
            <span className="intro-brand-name">KARINAKAS</span>
          </div>
          <p className="intro-eyebrow"><i className="bi bi-stars me-2"></i>Selamat Datang</p>
          <h1 className="intro-title">Berbagi Kasih,<br /><span className="intro-title-accent">Menebar Harapan</span></h1>
          <p className="intro-desc">
            Yayasan <strong>Karinakas</strong> melayani sesama melalui kegiatan sosial, kesehatan,
            pendidikan, dan tanggap bencana. Gulir ke bawah untuk mengenal kami lebih dekat.
          </p>
          <div className="intro-hero-actions">
            <button className="intro-cta" onClick={handleEnter}>
              <i className="bi bi-compass me-2"></i>Mulai Menjelajah
              <i className="bi bi-arrow-right ms-2 intro-cta-arrow"></i>
            </button>
            <button className="intro-scrolldown" onClick={scrollToStory}>
              <span>Kenali Kami</span>
              <i className="bi bi-chevron-down intro-chevron"></i>
            </button>
          </div>
        </div>
      </section>

      {/* ── STORY: foto kiri-kanan bergantian ── */}
      {STORY.map((s) => (
        <section key={s.title} className={`intro-story intro-story-${s.side}`}>
          <div className="intro-story-photo intro-reveal">
            <img src={s.img} alt={s.title} onError={onImgError} />
            <span className="intro-story-badge"><i className={`bi ${s.icon}`}></i></span>
          </div>
          <div className="intro-story-text intro-reveal">
            <span className="intro-story-kicker">{s.kicker}</span>
            <h2 className="intro-story-title">{s.title}</h2>
            <p className="intro-story-desc">{s.text}</p>
          </div>
        </section>
      ))}

      {/* ── PENUTUP + CTA ── */}
      <section className="intro-final">
        <div className="intro-final-inner intro-reveal">
          <div className="intro-stats">
            {STATS.map(([icon, num, label]) => (
              <div key={label} className="intro-stat">
                <i className={`bi ${icon} intro-stat-icon`}></i>
                <div>
                  <p className="intro-stat-num">{num}</p>
                  <p className="intro-stat-lbl">{label}</p>
                </div>
              </div>
            ))}
          </div>
          <h2 className="intro-final-title">Siap ikut berbagi kebaikan?</h2>
          <p className="intro-final-desc">Jelajahi kegiatan, berita, galeri, dan cara Anda dapat terlibat bersama Karinakas.</p>
          <button className="intro-cta intro-cta-lg" onClick={handleEnter}>
            <i className="bi bi-compass me-2"></i>Mulai Menjelajah
            <i className="bi bi-arrow-right ms-2 intro-cta-arrow"></i>
          </button>
        </div>
      </section>
    </div>
  )
}

export default IntroScreen
