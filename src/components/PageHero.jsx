import heroImg from '../assets/hero.jpeg'

/**
 * Hero section yang konsisten di semua halaman publik.
 *
 * Props:
 *   label      - teks kecil uppercase di atas judul (opsional)
 *   title      - konten h1, bisa string atau JSX (opsional — beberapa halaman tanpa judul)
 *   subtitle   - teks merah di bawah judul (opsional, hanya TentangKami)
 *   desc       - paragraf deskripsi
 *   image      - URL gambar sisi kanan; false/null → mode kompak tanpa gambar
 *   minHeight  - min-height row (default "45vh"); hanya berlaku jika ada gambar
 *   children   - tombol / konten tambahan di bawah deskripsi
 */
function PageHero({
  label,
  title,
  subtitle,
  desc,
  image = heroImg,
  minHeight = '45vh',
  children,
}) {
  const hasImage = image !== false && image !== null

  if (!hasImage) {
    return (
      <section className="tk-hero-section" style={{ minHeight: 'auto' }}>
        <div className="container position-relative py-5" style={{ zIndex: 2 }}>
          {label    && <p className="tk-section-label mb-2">{label}</p>}
          {title    && <h1 className="tk-hero-title fw-bold mb-3">{title}</h1>}
          {subtitle && <p className="tk-hero-subtitle mb-2">{subtitle}</p>}
          {desc     && (
            <p className={`tk-hero-desc ${children ? 'mb-4' : 'mb-0'}`} style={{ maxWidth: 460 }}>
              {desc}
            </p>
          )}
          {children}
        </div>
      </section>
    )
  }

  return (
    <section className="tk-hero-section">
      <div className="container position-relative" style={{ zIndex: 2 }}>
        <div className="row align-items-center" style={{ minHeight }}>
          <div className="col-lg-6 py-5 py-lg-0">
            {label    && <p className="tk-section-label mb-2">{label}</p>}
            {title    && <h1 className="tk-hero-title fw-bold mb-3">{title}</h1>}
            {subtitle && <p className="tk-hero-subtitle mb-2">{subtitle}</p>}
            {desc     && (
              <p className={`tk-hero-desc ${children ? 'mb-4' : 'mb-0'}`} style={{ maxWidth: 440 }}>
                {desc}
              </p>
            )}
            {children}
          </div>
        </div>
      </div>
      <div className="hero-img-wrapper d-none d-lg-block">
        <img src={image} alt="Karinakas" className="hero-img" />
      </div>
    </section>
  )
}

export default PageHero
