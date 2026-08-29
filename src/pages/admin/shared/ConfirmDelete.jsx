import { useEffect, useRef, useState } from 'react'

/** Dialog konfirmasi hapus yang dipakai semua section admin.
 *  Menampilkan spinner "Menghapus..." selama proses berjalan. */
function ConfirmDelete({ onConfirm, onCancel, label = 'data ini' }) {
  const [busy, setBusy] = useState(false)
  const mounted = useRef(true)

  useEffect(() => {
    mounted.current = true
    return () => { mounted.current = false }
  }, [])

  useEffect(() => {
    const onEsc = e => { if (e.key === 'Escape' && !busy) onCancel() }
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [onCancel, busy])

  const handleConfirm = async () => {
    if (busy) return
    setBusy(true)
    try {
      await onConfirm()
    } finally {
      // Modal biasanya di-unmount parent setelah sukses; hindari set state jika sudah lepas
      if (mounted.current) setBusy(false)
    }
  }

  return (
    <div className="ad-modal-overlay" onClick={busy ? undefined : onCancel}>
      <div className="ad-confirm" onClick={e => e.stopPropagation()}>
        <div className="ad-confirm-icon"><i className="bi bi-exclamation-triangle-fill"></i></div>
        <h3 className="ad-confirm-title">Hapus Data?</h3>
        <p className="ad-confirm-text">
          Apakah Anda yakin ingin menghapus {label}? Tindakan ini tidak dapat dibatalkan.
        </p>
        <div className="ad-confirm-actions">
          <button className="btn btn-outline-secondary rounded-pill px-4" onClick={onCancel} disabled={busy}>Batal</button>
          <button className="btn btn-danger rounded-pill px-4" onClick={handleConfirm} disabled={busy}>
            {busy
              ? <><span className="lg-spinner" /> Menghapus...</>
              : <><i className="bi bi-trash-fill me-1"></i>Hapus</>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDelete
