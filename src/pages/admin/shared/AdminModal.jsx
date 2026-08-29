import { useEffect } from 'react'

/**
 * Modal generik untuk form tambah/edit di panel admin.
 * Children = isi body + footer (mis. <form> dengan .ad-form-body & .ad-modal-footer).
 */
function AdminModal({ title, icon = 'bi-pencil-square', onClose, children, wide = false }) {
  useEffect(() => {
    const onEsc = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onEsc)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="ad-modal-overlay" onClick={onClose}>
      <div className={`ad-modal${wide ? ' ad-modal-wide' : ''}`} onClick={e => e.stopPropagation()}>
        <div className="ad-modal-head">
          <h3 className="ad-modal-title"><i className={`bi ${icon} me-2 text-danger`}></i>{title}</h3>
          <button className="ad-modal-close" onClick={onClose} aria-label="Tutup">
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default AdminModal
