import { useState, useEffect, useCallback } from 'react'
import { notifikasiService } from '../../services/resources'

const DEFAULT_TEMPLATES = {
  relawan: {
    judul: 'Selamat Datang Relawan Karinakas',
    isi: 'Halo [nama],\n\nSelamat! Pendaftaran Anda sebagai relawan [jenis] telah disetujui. Data Anda sudah terdaftar di sistem kami.\n\nSalam hangat,\nTim Karinakas',
  },
  donatur: {
    judul: 'Terima Kasih atas Donasi Anda',
    isi: 'Halo [nama],\n\nTerima kasih atas donasi sebesar [nominal] untuk [tujuan]. Kontribusi Anda sangat berarti bagi mereka yang membutuhkan.\n\nSalam hormat,\nTim Karinakas',
  },
}

function loadTemplates() {
  try { return { ...DEFAULT_TEMPLATES, ...JSON.parse(localStorage.getItem('kk_notif_templates')) } }
  catch { return DEFAULT_TEMPLATES }
}

function SectionNotifikasi() {
  const [tab, setTab] = useState('history')
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')
  const [tpl, setTpl] = useState(loadTemplates)
  const [savedMsg, setSavedMsg] = useState(false)

  const loadHistory = useCallback(async () => {
    setLoading(true); setError('')
    try { setHistory(await notifikasiService.listAdmin()) }
    catch (e) { setError(e.message || 'Gagal memuat riwayat notifikasi.'); setHistory([]) }
    finally { setLoading(false) }
  }, [])
  useEffect(() => { loadHistory() }, [loadHistory])

  const saveTpl = () => {
    localStorage.setItem('kk_notif_templates', JSON.stringify(tpl))
    setSavedMsg(true)
    setTimeout(() => setSavedMsg(false), 2500)
  }

  return (
    <div>
      <div className="ad-section-head">
        <div>
          <h2 className="ad-section-title">Notifikasi &amp; Automasi</h2>
          <p className="ad-section-sub">Ucapan terima kasih otomatis terkirim saat donasi diverifikasi atau relawan disetujui.</p>
        </div>
      </div>

      <div className="ad-subtabs">
        <button className={`ad-subtab${tab === 'history' ? ' active' : ''}`} onClick={() => setTab('history')}><i className="bi bi-clock-history me-1"></i>Riwayat Terkirim</button>
        <button className={`ad-subtab${tab === 'template' ? ' active' : ''}`} onClick={() => setTab('template')}><i className="bi bi-file-text me-1"></i>Template</button>
      </div>

      {tab === 'history' && (
        <div className="ad-card">
          <div className="ad-table-wrap">
            <table className="ad-table">
              <thead><tr><th>Tipe</th><th>Penerima</th><th>Judul</th><th>Pemicu</th><th>Waktu</th><th>Status</th></tr></thead>
              <tbody>
                {loading
                  ? <tr><td colSpan={6} className="ad-empty-row">Memuat data dari server...</td></tr>
                  : error
                  ? <tr><td colSpan={6} className="ad-empty-row"><i className="bi bi-wifi-off me-2"></i>{error}</td></tr>
                  : history.length === 0
                  ? <tr><td colSpan={6} className="ad-empty-row"><i className="bi bi-inbox me-2"></i>Belum ada notifikasi terkirim</td></tr>
                  : history.map(n => (
                    <tr key={n.id}>
                      <td>
                        <span className={`ad-badge ${n.tipe === 'email' ? 'blue' : 'gray'}`}>
                          <i className={`bi ${n.tipe === 'email' ? 'bi-envelope-fill' : 'bi-gear-fill'} me-1`}></i>{n.tipe}
                        </span>
                      </td>
                      <td className="ad-td-bold">{n.penerima}</td>
                      <td className="ad-td-muted">{n.judul}</td>
                      <td className="ad-td-muted">{n.trigger === 'donasi_verified' ? 'Donasi diverifikasi' : 'Relawan disetujui'}</td>
                      <td className="ad-td-muted">{n.tanggal}</td>
                      <td><span className="ad-badge green">✓ Terkirim</span></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <p className="ad-table-note"><i className="bi bi-info-circle me-1"></i>Pemberitahuan dikirim melalui surel. Riwayat pengiriman dicatat otomatis oleh sistem.</p>
        </div>
      )}

      {tab === 'template' && (
        <div>
          {savedMsg && <div className="pf-alert-success mb-3"><i className="bi bi-check-circle-fill me-2"></i>Template berhasil disimpan!</div>}
          <div className="row g-3">
            {[
              ['relawan', 'Template Relawan Disetujui', 'bi-person-heart'],
              ['donatur', 'Template Terima Kasih Donatur', 'bi-cash-coin'],
            ].map(([key, title, icon]) => (
              <div key={key} className="col-md-6">
                <div className="ad-card" style={{ padding: '1.25rem' }}>
                  <h3 className="pf-card-title mb-3"><i className={`bi ${icon} me-2 text-danger`}></i>{title}</h3>
                  <label className="ad-form-label">Judul</label>
                  <input className="ad-form-input mb-2" value={tpl[key].judul}
                    onChange={e => setTpl(t => ({ ...t, [key]: { ...t[key], judul: e.target.value } }))} />
                  <label className="ad-form-label">Isi Pesan</label>
                  <textarea rows={7} className="ad-form-input ad-form-textarea" value={tpl[key].isi}
                    onChange={e => setTpl(t => ({ ...t, [key]: { ...t[key], isi: e.target.value } }))} />
                  <p className="ad-form-hint">Variabel: [nama], [jenis], [nominal], [tujuan]</p>
                </div>
              </div>
            ))}
          </div>
          <button className="ad-add-btn mt-3" onClick={saveTpl}><i className="bi bi-check2 me-1"></i>Simpan Template</button>
        </div>
      )}
    </div>
  )
}

export default SectionNotifikasi
