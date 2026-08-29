import { Link } from 'react-router-dom'

/**
 * Breadcrumb selalu dimulai "Beranda /".
 * items: Array<{ label: string, path?: string, truncate?: boolean }>
 *   - path    → render sebagai link
 *   - tanpa path → render sebagai teks (current page)
 *   - truncate → potong teks panjang (untuk judul artikel di BeritaDetail)
 */
function Breadcrumb({ items = [] }) {
  return (
    <div className="tk-breadcrumb">
      <div className="container d-flex align-items-center flex-wrap" style={{ gap: '0.1rem' }}>
        <Link to="/" className="tk-breadcrumb-link">Beranda</Link>
        {items.map((item) => (
          <span key={item.label} className="d-flex align-items-center">
            <i className="bi bi-chevron-right mx-2" style={{ fontSize: '0.7rem', color: '#606060' }} />
            {item.path ? (
              <Link to={item.path} className="tk-breadcrumb-link">{item.label}</Link>
            ) : (
              <span className={`text-muted${item.truncate ? ' bt-breadcrumb-title' : ''}`}>
                {item.label}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Breadcrumb
