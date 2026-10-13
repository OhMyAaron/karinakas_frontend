import { useRef, useEffect } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import PageHero from '../components/PageHero'
import CTA from '../components/CTA'
import { ALAMAT, ALAMAT_LENGKAP, PETA_SEMATAN, PETA_TAUTAN } from '../data/lembaga'

const infoCards = [
  {
    icon: 'bi-geo-alt-fill',
    color: '#C0392B',
    bg: '#FFEBEE',
    label: 'Alamat',
    value: ALAMAT_LENGKAP,
  },
  {
    icon: 'bi-telephone-fill',
    color: '#1d4ed8',
    bg: '#EFF6FF',
    label: 'Telepon',
    value: '+62 813-9277-7710',
    href: 'tel:+6281392777710',
  },
  {
    icon: 'bi-envelope-fill',
    color: '#1a6b3a',
    bg: '#E8F5E9',
    label: 'Email',
    value: 'karinakas.office@gmail.com',
    href: 'mailto:karinakas.office@gmail.com',
  },
  {
    icon: 'bi-whatsapp',
    color: '#128C7E',
    bg: '#E0F7F5',
    label: 'WhatsApp',
    value: '+62 813-9277-7710',
    href: 'https://wa.me/6281392777710',
  },
]

// Topik yang disarankan — dipakai sebagai pesan awal WhatsApp agar
// pengunjung tidak bingung harus menulis apa.
const topikWa = [
  'Pertanyaan Umum',
  'Informasi Program',
  'Kemitraan & Donasi',
  'Laporan & Pengaduan',
]

const waLink = (topik) =>
  `https://wa.me/6281392777710?text=${encodeURIComponent(`Halo Yayasan Karinakas, saya ingin bertanya mengenai ${topik}.`)}`

function Kontak() {
  const sectionRef = useRef(null)

  /* scroll reveal */
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll('.reveal-item') || []
    els.forEach((el, i) => {
      el.classList.remove('revealed')
      setTimeout(() => el.classList.add('revealed'), i * 80)
    })
  }, [])

  return (
    <>
      <Breadcrumb items={[{ label: 'Kontak' }]} />

      <PageHero
        label="HUBUNGI KAMI"
        title={<>Mari Terhubung &<br /><span className="text-danger">Berkolaborasi</span></>}
        desc="Kami senang mendengar dari Anda. Sampaikan pesan atau pertanyaan dan tim kami akan segera merespons."
      />

      {/* Info Cards */}
      <section className="kt-info-section" ref={sectionRef}>
        <div className="container">
          <div className="row g-3 mb-5">
            {infoCards.map((card, i) => (
              <div key={card.label} className="col-6 col-lg-3 reveal-item" style={{ transitionDelay: `${i * 0.08}s` }}>
                {card.href ? (
                  <a href={card.href} className="kt-info-card" target={card.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                    <div className="kt-info-icon" style={{ color: card.color, background: card.bg }}>
                      <i className={`bi ${card.icon}`}></i>
                    </div>
                    <p className="kt-info-label">{card.label}</p>
                    <p className="kt-info-value">{card.value}</p>
                  </a>
                ) : (
                  <div className="kt-info-card">
                    <div className="kt-info-icon" style={{ color: card.color, background: card.bg }}>
                      <i className={`bi ${card.icon}`}></i>
                    </div>
                    <p className="kt-info-label">{card.label}</p>
                    <p className="kt-info-value">{card.value}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Split: Kanal WhatsApp + Contact Info */}
          <div className="row g-4 align-items-start">

            {/* WhatsApp — kanal utama untuk pertanyaan pengunjung */}
            <div className="col-lg-7 reveal-item" style={{ transitionDelay: '0.32s' }}>
              <div className="kt-form-card">
                <h2 className="kt-form-title mb-3">
                  <i className="bi bi-whatsapp me-2" style={{ color: '#128C7E' }}></i>Hubungi Kami lewat WhatsApp
                </h2>
                <p className="kt-contact-item-value mb-4">
                  Cara tercepat menghubungi Yayasan Karinakas. Pesan Anda langsung diterima tim kami
                  dan dibalas pada jam operasional — Senin s.d. Jumat pukul 08.00–16.00 WIB.
                </p>

                <a
                  href="https://wa.me/6281392777710"
                  target="_blank"
                  rel="noreferrer"
                  className="btn rounded-pill px-5 py-2 fw-bold text-white"
                  style={{ background: '#128C7E', fontSize: '1.05rem' }}
                >
                  <i className="bi bi-whatsapp me-2"></i>Chat +62 813-9277-7710
                </a>

                <p className="kt-label mt-4 mb-2">Atau pilih topik agar pesan langsung terisi:</p>
                <div className="d-flex flex-wrap gap-2">
                  {topikWa.map(t => (
                    <a
                      key={t}
                      href={waLink(t)}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline-secondary btn-sm rounded-pill px-3"
                    >
                      {t}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: contact detail + map */}
            <div className="col-lg-5 reveal-item" style={{ transitionDelay: '0.44s' }}>

              <div className="kt-contact-detail-card mb-3">
                <h2 className="kt-contact-detail-title">Informasi Kontak</h2>
                <ul className="kt-contact-list">
                  <li className="kt-contact-item">
                    <div className="kt-contact-icon" style={{ color: '#C0392B', background: '#FFEBEE' }}>
                      <i className="bi bi-geo-alt-fill"></i>
                    </div>
                    <div>
                      <p className="kt-contact-item-label">Alamat Kantor</p>
                      <p className="kt-contact-item-value">{ALAMAT.jalan},<br />{ALAMAT.wilayah},<br />{ALAMAT.provinsi}</p>
                    </div>
                  </li>
                  <li className="kt-contact-item">
                    <div className="kt-contact-icon" style={{ color: '#1d4ed8', background: '#EFF6FF' }}>
                      <i className="bi bi-telephone-fill"></i>
                    </div>
                    <div>
                      <p className="kt-contact-item-label">Telepon</p>
                      <a href="tel:+6281392777710" className="kt-contact-item-value kt-link">+62 813-9277-7710</a>
                    </div>
                  </li>
                  <li className="kt-contact-item">
                    <div className="kt-contact-icon" style={{ color: '#1a6b3a', background: '#E8F5E9' }}>
                      <i className="bi bi-envelope-fill"></i>
                    </div>
                    <div>
                      <p className="kt-contact-item-label">Email</p>
                      <a href="mailto:karinakas.office@gmail.com" className="kt-contact-item-value kt-link">karinakas.office@gmail.com</a>
                    </div>
                  </li>
                  <li className="kt-contact-item">
                    <div className="kt-contact-icon" style={{ color: '#128C7E', background: '#E0F7F5' }}>
                      <i className="bi bi-whatsapp"></i>
                    </div>
                    <div>
                      <p className="kt-contact-item-label">WhatsApp</p>
                      <a href="https://wa.me/6281392777710" target="_blank" rel="noreferrer" className="kt-contact-item-value kt-link">+62 813-9277-7710</a>
                    </div>
                  </li>
                  <li className="kt-contact-item">
                    <div className="kt-contact-icon" style={{ color: '#d97000', background: '#FFF3E6' }}>
                      <i className="bi bi-clock-fill"></i>
                    </div>
                    <div>
                      <p className="kt-contact-item-label">Jam Operasional</p>
                      <p className="kt-contact-item-value">Sen – Jum: 08.00 – 16.00 WIB<br />Sabtu: 08.00 – 12.00 WIB</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Map */}
              <div className="kt-map-wrapper">
                <iframe
                  title="Lokasi Karinakas"
                  src={PETA_SEMATAN}
                  width="100%"
                  height="240"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a href={PETA_TAUTAN} target="_blank" rel="noreferrer" className="kt-link d-inline-flex align-items-center gap-1 mt-2">
                <i className="bi bi-box-arrow-up-right"></i>Buka di Google Maps
              </a>

            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}

export default Kontak
