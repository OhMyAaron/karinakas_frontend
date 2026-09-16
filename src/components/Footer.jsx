import { Link } from 'react-router-dom'
import KarinakasLogo from './KarinakasLogo'
import { ALAMAT_LENGKAP, PETA_SEMATAN, PETA_TAUTAN } from '../data/lembaga'

const navLinks = [
  { label: 'Beranda',      path: '/' },
  { label: 'Tentang Kami', path: '/tentang-kami' },
  { label: 'Kegiatan',     path: '/kegiatan' },
  { label: 'Relawan',      path: '/daftar-relawan' },
  { label: 'Donasi',       path: '/donasi' },
  { label: 'Berita',       path: '/berita' },
  { label: 'Kontak',       path: '/kontak' },
]

function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <div className="container">
        <div className="row g-4 mb-4">
          {/* Brand */}
          <div className="col-md-3">
            <div className="d-flex align-items-center gap-2 mb-3">
              <KarinakasLogo size={72} />
              <span className="fw-bold fs-5">KARINAKAS</span>
            </div>
            <p className="text-white-50 small">
              Yayasan Karinakas berkomitmen menghadirkan kasih dan harapan melalui pelayanan
              sosial yang nyata.
            </p>
          </div>

          {/* Navigation */}
          <div className="col-md-2 offset-md-1">
            <h6 className="fw-bold mb-3">Navigasi</h6>
            <ul className="list-unstyled">
              {navLinks.map((link) => (
                <li key={link.label} className="mb-2">
                  <Link to={link.path} className="text-white-50 text-decoration-none footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-3">Kontak</h6>
            <p className="text-white-50 small mb-2">
              <i className="bi bi-geo-alt-fill me-2"></i>
              <a href={PETA_TAUTAN} target="_blank" rel="noreferrer" className="text-white-50 text-decoration-none footer-link">
                {ALAMAT_LENGKAP}
              </a>
            </p>
            <p className="text-white-50 small mb-2">
              <i className="bi bi-telephone-fill me-2"></i>
              <a href="tel:+6281392777710" className="text-white-50 text-decoration-none footer-link">+62 813-9277-7710</a>
            </p>
            <p className="text-white-50 small mb-3">
              <i className="bi bi-globe me-2"></i>
              karinakas.office@gmail.com
            </p>

            <div className="d-flex gap-2">
              <a href="https://www.instagram.com/yayasankarinakas" target="_blank" rel="noreferrer" className="text-white-50 footer-social" title="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://www.youtube.com/@karinakasofficial" target="_blank" rel="noreferrer" className="text-white-50 footer-social" title="YouTube">
                <i className="bi bi-youtube"></i>
              </a>
              <a href="https://wa.me/6281392777710" target="_blank" rel="noreferrer" className="text-white-50 footer-social" title="WhatsApp">
                <i className="bi bi-whatsapp"></i>
              </a>
              {/* Bootstrap Icons tidak punya ikon Linktree (bi-linktree tidak ada, dulu tampil kosong),
                  jadi lambangnya digambar langsung sebagai SVG */}
              <a href="https://linktr.ee/prjct88?utm_source=qr_code" target="_blank" rel="noreferrer" className="text-white-50 footer-social" title="Linktree" aria-label="Linktree">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m13.73635 5.85251 4.00467-4.11665 2.3248 2.3808-4.20064 4.00466h5.9085v3.30473h-5.9365l4.22865 4.10766-2.3248 2.3338L12.0005 12.099l-5.74052 5.76852-2.3248-2.3248 4.22864-4.10766h-5.9375V8.12132h5.9085L3.93417 4.11666l2.3248-2.3808 4.00468 4.11665V0h3.4727zm-3.4727 10.30614h3.4727V24h-3.4727z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-3">Kunjungi Kami</h6>
            <div className="rounded-3 overflow-hidden footer-map">
              <iframe
                src={PETA_SEMATAN}
                width="100%"
                height="140"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Karinakas"
              ></iframe>
            </div>
          </div>
        </div>

        <hr className="border-secondary" />
        <p className="text-center text-white-50 small mb-0">
          &copy; 2026 Yayasan Karinakas. Hak cipta dilindungi.
        </p>
      </div>
    </footer>
  )
}

export default Footer
