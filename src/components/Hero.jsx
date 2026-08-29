import { Link } from 'react-router-dom'
import heroImg from '../assets/hero.jpeg'

function Hero() {
  return (
    <section className="hero-section">
      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row align-items-center hero-row">
          <div className="col-lg-6 py-5 py-lg-0">
            <h1 className="hero-title fw-bold mb-3">
              Bersama Melayani,<br />
              Mengasihi,<br />
              <span className="text-danger">Mengubah Hidup.</span>
            </h1>
            <p className="hero-subtitle mb-4">
              Karinakas hadir untuk menebar kasih dan harapan melalui berbagai kegiatan
              sosial yang nyata dan berdampak
            </p>
            <div className="d-flex gap-3 flex-wrap">
              <Link to="/donasi" className="btn btn-lg px-4 fw-bold rounded-pill btn-hero-primary">
                Donasi Sekarang
              </Link>
              <Link to="/daftar-relawan" className="btn btn-lg px-4 fw-bold rounded-pill btn-hero-secondary">
                Jadi Relawan
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-img-wrapper d-none d-lg-block">
        <img
          src={heroImg}
          alt="Karinakas volunteers helping community"
          className="hero-img"
        />
      </div>
    </section>
  )
}

export default Hero
