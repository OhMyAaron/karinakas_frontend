import { useState, useEffect, useCallback } from 'react'
import { auditService } from '../../services/resources'

function SectionAudit() {
  const [logs,    setLogs]    = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')
  const [search,  setSearch]  = useState('')

  const load = useCallback(async () => {
    setLoading(true); setError('')
    try { setLogs(await auditService.list()) }
    catch (e) { setError(e.message || 'Gagal memuat audit log.'); setLogs([]) }
    finally { setLoading(false) }
  }, [])
  useEffect(() => { load() }, [load])

  const filtered = logs.filter(l =>
    (l.user || '').toLowerCase().includes(search.toLowerCase()) ||
    (l.aksi || '').toLowerCase().includes(search.toLowerCase()) ||
    (l.target || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="ad-section-head">
        <div>
          <h2 className="ad-section-title">
            Audit Log
            <span className="ad-super-badge-sm ms-2">Super Admin</span>
          </h2>
          <p className="ad-section-sub">Catatan aksi pada data sensitif: siapa, kapan, dan data apa yang diubah.</p>
        </div>
        <button className="ad-add-btn" style={{ background: '#1a6b3a' }} onClick={load} disabled={loading}>
          <i className={`bi ${loading ? 'bi-arrow-repeat' : 'bi-arrow-clockwise'} me-1`}></i>Muat Ulang
        </button>
      </div>

      <div className="ad-filter-bar">
        <div className="ad-sf-wrap">
          <i className="bi bi-search ad-sf-icon"></i>
          <input className="ad-sf-input" placeholder="Cari user / aksi / target..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <span className="ad-filter-count">{filtered.length} log</span>
      </div>

      <div className="ad-card">
        <div className="ad-table-wrap">
          <table className="ad-table">
            <thead><tr><th>Pengguna</th><th>Aksi</th><th>Target Data</th><th>Waktu</th></tr></thead>
            <tbody>
              {loading
                ? <tr><td colSpan={4} className="ad-empty-row">Memuat data dari server...</td></tr>
                : error
                ? <tr><td colSpan={4} className="ad-empty-row"><i className="bi bi-wifi-off me-2"></i>{error}</td></tr>
                : filtered.length === 0
                ? <tr><td colSpan={4} className="ad-empty-row"><i className="bi bi-inbox me-2"></i>Belum ada catatan</td></tr>
                : filtered.map(l => (
                  <tr key={l.id}>
                    <td>
                      <div className="ad-donor">
                        <div className="ad-donor-av role-admin">{(l.user || '?')[0]}</div>
                        <div className="ad-donor-name">{l.user}</div>
                      </div>
                    </td>
                    <td><span className="ad-badge gray">{l.aksi}</span></td>
                    <td className="ad-td-muted">{l.target}</td>
                    <td className="ad-td-muted">{l.tanggal}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <p className="ad-table-note"><i className="bi bi-shield-lock-fill me-1"></i>Log tercatat otomatis di server saat admin mengubah status, mengelola pengguna, atau menghapus data.</p>
      </div>
    </div>
  )
}

export default SectionAudit
