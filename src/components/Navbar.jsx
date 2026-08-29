import { Link, useLocation, useNavigate } from 'react-router-dom'
import KarinakasLogo from './KarinakasLogo'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { label: 'Beranda',      path: '/' },
  { label: 'Tentang Kami', path: '/tentang-kami' },
  { label: 'Galeri',       path: '/galeri' },
  { label: 'Kegiatan',     path: '/kegiatan' },
  { label: 'Kontak',       path: '/kontak' },
  { label: 'Berita',       path: '/berita' },
]

function Navbar() {
  const { pathname }    = useLocation()
  const navigate        = useNavigate()
  const { user, logout, isAdmin } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <KarinakasLogo size={72} />
          <span className="fw-bold fs-5 text-dark">KARINAKAS</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto gap-1">
            {navItems.map((item) => (
              <li className="nav-item" key={item.label}>
                <Link
                  className={`nav-link fw-medium px-2 ${pathname === item.path ? 'active text-danger' : 'text-dark'}`}
                  to={item.path}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Not logged in ── */}
          {!user && (
            <Link to="/login" className="btn btn-danger px-4 fw-semibold rounded-pill">
              Gabung / Login
            </Link>
          )}

          {/* ── Logged in as regular user ── */}
          {user && !isAdmin && (
            <div className="d-flex align-items-center gap-2">
              <Link to="/donasi" className="btn btn-danger px-3 fw-semibold rounded-pill btn-sm">
                <i className="bi bi-heart-fill me-1"></i>Donasi
              </Link>
              <div className="dropdown">
                <button
                  className="nb-user-btn dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="nb-avatar">{user.name[0].toUpperCase()}</div>
                  <span className="nb-username d-none d-lg-inline">{user.name}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end nb-dropdown">
                  <li className="nb-dropdown-header">{user.email}</li>
                  <li><hr className="dropdown-divider my-1" /></li>
                  <li>
                    <Link className="dropdown-item nb-dropdown-item" to="/profil">
                      <i className="bi bi-person-circle me-2 text-danger"></i>Profil Saya
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item nb-dropdown-item" to="/daftar-relawan">
                      <i className="bi bi-person-heart me-2 text-danger"></i>Daftar Relawan
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item nb-dropdown-item" to="/donasi">
                      <i className="bi bi-cash-coin me-2 text-danger"></i>Donasi
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider my-1" /></li>
                  <li>
                    <button className="dropdown-item nb-dropdown-item nb-logout" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i>Keluar
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* ── Logged in as admin ── */}
          {user && isAdmin && (
            <div className="d-flex align-items-center gap-2">
              <Link to="/admin" className="btn btn-outline-danger px-3 fw-semibold rounded-pill btn-sm">
                <i className="bi bi-grid-fill me-1"></i>Admin Panel
              </Link>
              <div className="dropdown">
                <button
                  className="nb-user-btn dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="nb-avatar nb-avatar-admin">{user.name[0].toUpperCase()}</div>
                  <span className="nb-username d-none d-lg-inline">{user.name}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end nb-dropdown">
                  <li className="nb-dropdown-header">{user.email}</li>
                  <li><hr className="dropdown-divider my-1" /></li>
                  <li>
                    <Link className="dropdown-item nb-dropdown-item" to="/admin">
                      <i className="bi bi-grid-fill me-2 text-danger"></i>Dashboard Admin
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider my-1" /></li>
                  <li>
                    <button className="dropdown-item nb-dropdown-item nb-logout" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i>Keluar
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}

        </div>
      </div>
    </nav>
  )
}

export default Navbar
