import { Link } from 'react-router-dom'
import KarinakasLogo from './KarinakasLogo'

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
              Jl. Panuluh 377A, Pringwulung, Sleman, Yogyakarta
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
              <a href="https://linktr.ee/prjct88?utm_source=qr_code" target="_blank" rel="noreferrer" className="text-white-50 footer-social" title="LinkTree">
                <i className="bi bi-linktree"></i>
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-3">Kunjungi Kami</h6>
            <div className="rounded-3 overflow-hidden footer-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.7!2d110.38!3d-7.76!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNDUnMzYuMCJTIDExMMKwMjInNDguMCJF!5e0!3m2!1sen!2sid!4v1234567890"
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
