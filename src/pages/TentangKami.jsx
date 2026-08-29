import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/Breadcrumb'
import PageHero from '../components/PageHero'
import CTA from '../components/CTA'
import { galeriService } from '../services/resources'

/* ── Counter (reuse logic) ── */
function Counter({ end, suffix, duration = 1800 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const t0 = performance.now()
        const animate = (now) => {
          const p = Math.min((now - t0) / duration, 1)
          const e = 1 - Math.pow(1 - p, 3)
          setCount(Math.round(e * end))
          if (p < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
        observer.unobserve(el)
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration])
  return <span ref={ref} className="tk-stat-number">{count.toLocaleString('id-ID')}{suffix}</span>
}

/* ── Scroll reveal hook ── */
function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const container = ref.current
    if (!container) return
    const items = container.querySelectorAll('.reveal-item')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed') })
    }, { threshold: 0.1 })
    items.forEach(item => observer.observe(item))
    return () => observer.disconnect()
  }, [])
  return ref
}

/* ── Data ── */
const coreValues = [
  { icon: 'bi-heart-fill', color: '#C0392B', bg: '#FFF0F0', title: 'Humanis', desc: 'Mengutamakan nilai kemanusiaan dalam setiap pelayanan' },
  { icon: 'bi-people-fill', color: '#b07d00', bg: '#FFF8DC', title: 'Kebersamaan', desc: 'Bersinergi dan bekerja sama untuk kebaikan bersama' },
  { icon: 'bi-shield-check', color: '#1a6b3a', bg: '#E8F5E9', title: 'Terpercaya', desc: 'Menjaga integritas, transparansi, dan akuntabilitas' },
  { icon: 'bi-hand-heart', color: '#d97000', bg: '#FFF3E6', title: 'Kepedulian', desc: 'Peka terhadap kebutuhan sesama dan lingkungan sekitar' },
]

const orgStats = [
  { end: 25, suffix: '+', label: 'Tahun Melayani', icon: 'bi-award-fill' },
  { end: 100, suffix: '+', label: 'Program Kegiatan', icon: 'bi-calendar-check-fill' },
  { end: 15000, suffix: '+', label: 'Penerima Manfaat', icon: 'bi-people-fill' },
  { end: 500, suffix: '+', label: 'Relawan Aktif', icon: 'bi-heart-fill' },
]

const pengurus = [
  { foto: 'https://randomuser.me/api/portraits/men/32.jpg', nama: 'Rm. Yohanes Surya', jabatan: 'Pelindung' },
  { foto: 'https://randomuser.me/api/portraits/men/44.jpg', nama: 'Bpk. Andreas Wibowo', jabatan: 'Ketua Pengurus' },
  { foto: 'https://randomuser.me/api/portraits/women/47.jpg', nama: 'Ibu Maria Susanti', jabatan: 'Sekretaris' },
  { foto: 'https://randomuser.me/api/portraits/men/55.jpg', nama: 'Bpk. Petrus Haryanto', jabatan: 'Bendahara' },
  { foto: 'https://randomuser.me/api/portraits/women/68.jpg', nama: 'Ibu Theresia Dewi', jabatan: 'Koordinator Program' },
]

/* ══════════════════════════════════════════ */
function TentangKami() {
  const valuesRef = useReveal()
  const statsRef = useReveal()
  const pengurusRef = useReveal()
  const galeriRef = useReveal()

  // Galeri "Momen Bersama" — foto terbaru dari backend
  const [galeriPhotos, setGaleriPhotos] = useState([])
  useEffect(() => {
    let alive = true
    galeriService.latest()
      .then(list => { if (alive) setGaleriPhotos(list.slice(0, 5)) })
      .catch(() => { if (alive) setGaleriPhotos([]) })
    return () => { alive = false }
  }, [])
  // Foto dimuat async → tampilkan (useReveal hanya jalan sekali saat mount)
  useEffect(() => {
    if (!galeriPhotos.length) return
    galeriRef.current?.querySelectorAll('.reveal-item').forEach(el => el.classList.add('revealed'))
  }, [galeriPhotos, galeriRef])

  return (
    <>
      <Breadcrumb items={[{ label: 'Tentang Kami' }]} />

      <PageHero
        label="PROFIL KARINAKAS"
        title="Tentang Karinakas"
        subtitle="Bersama Melayani, Mengasihi, Mengubah Hidup."
        desc="Karinakas adalah lembaga sosial di bawah Keuskupan Agung Semarang yang bergerak dalam bidang kemanusiaan, pendidikan, kesehatan, dan pemberdayaan masyarakat."
        minHeight="60vh"
      >
        <div className="d-flex gap-3 flex-wrap">
          <Link to="/kegiatan" className="btn btn-lg px-4 fw-bold rounded-pill btn-hero-primary">
            Lihat Kegiatan Kami
          </Link>
          <Link to="/daftar-relawan" className="btn btn-lg px-4 fw-bold rounded-pill btn-hero-secondary">
            Jadi Relawan
          </Link>
        </div>
      </PageHero>

      {/* ── Tentang Lembaga ── */}
      <section className="tk-about-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-5">
              <div className="tk-about-img-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=500&fit=crop"
                  alt="Kegiatan Karinakas"
                  className="tk-about-img"
                />
              </div>
            </div>
            <div className="col-lg-7">
              <p className="tk-section-label">TENTANG LEMBAGA</p>
              <h2 className="tk-about-heading mb-3">
                Kasih yang Menggerakkan,<br />Harapan yang Menghidupkan
              </h2>
              <p className="tk-about-text mb-3">
                Karinakas (Yayasan Karinakas) didirikan sebagai wujud nyata kepedulian terhadap
                sesama, khususnya mereka yang membutuhkan. Terinspirasi oleh nilai kasih dan
                pelayanan, kami berkomitmen untuk menghadirkan program-program sosial yang berdampak
                dan berkelanjutan.
              </p>
              <p className="tk-about-text">
                Dengan dukungan relawan, donatur, dan masyarakat, kami percaya bahwa setiap
                kebaikan kecil dapat membawa perubahan besar bagi banyak kehidupan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Visi & Misi ── */}
      <section className="tk-visi-misi-section">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="tk-vm-card">
                <div className="tk-vm-icon-wrapper bg-danger">
                  <i className="bi bi-eye-fill text-white"></i>
                </div>
                <h4 className="fw-bold mb-3">VISI</h4>
                <p className="tk-vm-text">
                  Menjadi lembaga sosial yang menghadirkan kasih dan harapan bagi masyarakat
                  melalui pelayanan yang berkelanjutan.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="tk-vm-card">
                <div className="tk-vm-icon-wrapper" style={{ background: '#e6ac00' }}>
                  <i className="bi bi-bullseye text-white"></i>
                </div>
                <h4 className="fw-bold mb-3">MISI</h4>
                <ol className="tk-misi-list">
                  <li>Memberikan bantuan dan pelayanan sosial kepada masyarakat.</li>
                  <li>Meningkatkan kesejahteraan dan kualitas hidup komunitas.</li>
                  <li>Mengembangkan program pendidikan dan pemberdayaan.</li>
                  <li>Mengajak partisipasi aktif masyarakat dalam kebaikan.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Nilai Inti ── */}
      <section className="tk-core-values-section">
        <div className="container">
          <div className="row g-4" ref={valuesRef}>
            {coreValues.map((v, i) => (
              <div key={v.title} className="col-6 col-md-3 reveal-item" style={{ transitionDelay: `${i * 0.12}s` }}>
                <div className="tk-cv-card">
                  <div className="tk-cv-icon" style={{ background: v.bg, color: v.color }}>
                    <i className={`bi ${v.icon}`}></i>
                  </div>
                  <h6 className="fw-bold mb-1">{v.title}</h6>
                  <p className="text-muted small mb-0">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats / Nilai-Nilai ── */}
      <section className="tk-stats-section">
        <div className="container" ref={statsRef}>
          <p className="tk-section-label text-center mb-1">NILAI – NILAI KAMI</p>
          <div className="row g-4 justify-content-center mt-2">
            {orgStats.map((s, i) => (
              <div key={s.label} className="col-6 col-md-3 reveal-item" style={{ transitionDelay: `${i * 0.12}s` }}>
                <div className="tk-stat-item">
                  <i className={`bi ${s.icon} tk-stat-icon`}></i>
                  <Counter end={s.end} suffix={s.suffix} />
                  <p className="tk-stat-label">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Struktur Organisasi ── */}
      <section className="tk-struktur-section">
        <div className="container">
          <div className="text-center mb-5">
            <p className="tk-section-label">STRUKTUR ORGANISASI</p>
            <h2 className="section-title">Pengurus Karinakas</h2>
          </div>
          <div className="row g-4 justify-content-center" ref={pengurusRef}>
            {pengurus.map((p, i) => (
              <div key={p.jabatan} className="col-6 col-md-4 col-lg reveal-item" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="tk-person-card">
                  <div className="tk-person-photo-wrapper">
                    <img src={p.foto} alt={p.nama} className="tk-person-photo" />
                  </div>
                  <p className="tk-person-name">{p.nama}</p>
                  <p className="tk-person-role">{p.jabatan}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Galeri Kegiatan ── */}
      <section className="tk-galeri-section">
        <div className="container">
          <div className="text-center mb-5">
            <p className="tk-section-label">GALERI KEGIATAN</p>
            <h2 className="section-title">Momen Bersama</h2>
          </div>
          <div className="row g-3" ref={galeriRef}>
            {galeriPhotos.length === 0 ? (
              <div className="col-12 text-center py-4 text-muted">
                <i className="bi bi-image-alt me-2"></i>Belum ada foto galeri.
              </div>
            ) : galeriPhotos.map((photo, i) => (
              <div key={photo.id} className="col-6 col-md-4 col-lg reveal-item" style={{ transitionDelay: `${i * 0.1}s` }}>
                <Link to="/galeri" className="galeri-img-wrapper d-block">
                  <img src={photo.img} alt={photo.judul} className="galeri-img" style={{ height: 200 }} loading="lazy" />
                  <div className="galeri-overlay"><i className="bi bi-zoom-in"></i></div>
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/galeri" className="btn btn-outline-danger rounded-pill px-5 fw-semibold">
              Lihat Semua Galeri &rarr;
            </Link>
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}

export default TentangKami
