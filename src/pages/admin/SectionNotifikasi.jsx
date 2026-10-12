import { useState, useEffect, useCallback } from 'react'
import { notifikasiService } from '../../services/resources'
import usePaging from './shared/usePaging'
import { AdminSort, AdminPager } from './shared/AdminPager'

// Kartu templat: kunci = kunci di backend (TemplateNotifikasi), variabel = yang diganti saat surel dikirim
const TEMPLATE_KARTU = [
  { key: 'relawan', title: 'Template Relawan Disetujui', icon: 'bi-person-heart',
    variabel: '[nama], [jenis], [kegiatan]' },
  { key: 'donatur', title: 'Template Terima Kasih Donatur', icon: 'bi-cash-coin',
    variabel: '[nama], [nominal], [tujuan], [kegiatan], [tanggal], [metode], [id_transaksi]' },
]

const STATUS_NOTIF = {
  terkirim: { cls: 'green', label: '✓ Terkirim' },
  gagal:    { cls: 'red',   label: '✕ Gagal' },
}

function SectionNotifikasi() {
  const [tab, setTab] = useState('history')
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')
  const [tpl, setTpl] = useState(null)              // null = belum dimuat dari server
  const [tplLoading, setTplLoading] = useState(false)
  const [tplError, setTplError] = useState('')
  const [saving, setSaving] = useState(false)
  const [savedMsg, setSavedMsg] = useState(false)

  const loadHistory = useCallback(async () => {
    setLoading(true); setError('')
    try { setHistory(await notifikasiService.listAdmin()) }
    catch (e) { setError(e.message || 'Gagal memuat riwayat notifikasi.'); setHistory([]) }
    finally { setLoading(false) }
  }, [])
  useEffect(() => { loadHistory() }, [loadHistory])

  const pg = usePaging(history, n => n.createdAt)

  // Templat dibaca dari server saat tab Template dibuka pertama kali
  const loadTpl = useCallback(async () => {
    setTplLoading(true); setTplError('')
    try { setTpl(await notifikasiService.getTemplates()) }
    catch (e) { setTplError(e.message || 'Gagal memuat template dari server.') }
    finally { setTplLoading(false) }
  }, [])
  const bukaTemplate = () => {
    setTab('template')
    if (tpl === null && !tplLoading) loadTpl()
  }

  const saveTpl = async () => {
    setSaving(true); setTplError('')
    try {
      setTpl(await notifikasiService.saveTemplates(tpl))
      setSavedMsg(true)
      setTimeout(() => setSavedMsg(false), 2500)
    } catch (e) {
      setTplError(e.message || 'Gagal menyimpan template.')
    } finally { setSaving(false) }
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
        <button className={`ad-subtab${tab === 'template' ? ' active' : ''}`} onClick={bukaTemplate}><i className="bi bi-file-text me-1"></i>Template</button>
      </div>

      {tab === 'history' && (
        <>
        <div className="ad-filter-bar">
          <AdminSort pg={pg} />
          <span className="ad-filter-count">{history.length} notifikasi</span>
        </div>
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
                  : pg.pageItems.map(n => (
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
                      <td>
                        <span className={`ad-badge ${(STATUS_NOTIF[n.status] || STATUS_NOTIF.terkirim).cls}`}>
                          {(STATUS_NOTIF[n.status] || STATUS_NOTIF.terkirim).label}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {!loading && !error && <AdminPager pg={pg} satuan="notifikasi" />}
          <p className="ad-table-note"><i className="bi bi-info-circle me-1"></i>Pemberitahuan dikirim melalui surel. Riwayat pengiriman dicatat otomatis oleh sistem.</p>
        </div>
        </>
      )}

      {tab === 'template' && (
        <div>
          {savedMsg && <div className="pf-alert-success mb-3"><i className="bi bi-check-circle-fill me-2"></i>Template berhasil disimpan dan langsung dipakai pada surel berikutnya.</div>}
          {tplError && <div className="alert alert-danger mb-3"><i className="bi bi-exclamation-triangle-fill me-2"></i>{tplError}</div>}
          {tplLoading || !tpl ? (
            tplError
              ? <button className="ad-add-btn" onClick={loadTpl}><i className="bi bi-arrow-clockwise me-1"></i>Coba lagi</button>
              : <p className="ad-empty-row">Memuat template dari server...</p>
          ) : (
            <>
              <p className="ad-table-note mb-3"><i className="bi bi-info-circle me-1"></i>Isi di bawah ini yang dikirim ke penerima. Tulis variabel dengan kurung siku, misalnya <strong>[nama]</strong>; sistem menggantinya dengan data nyata saat surel dikirim. Untuk donasi, rincian transaksi tetap ditampilkan otomatis di bawah pesan.</p>
              <div className="row g-3">
                {TEMPLATE_KARTU.map(({ key, title, icon, variabel }) => (
                  <div key={key} className="col-md-6">
                    <div className="ad-card" style={{ padding: '1.25rem' }}>
                      <h3 className="pf-card-title mb-3"><i className={`bi ${icon} me-2 text-danger`}></i>{title}</h3>
                      <label className="ad-form-label">Judul</label>
                      <input className="ad-form-input mb-2" value={tpl[key].judul} maxLength={150}
                        onChange={e => setTpl(t => ({ ...t, [key]: { ...t[key], judul: e.target.value } }))} />
                      <label className="ad-form-label">Isi Pesan</label>
                      <textarea rows={10} className="ad-form-input ad-form-textarea" value={tpl[key].isi} maxLength={5000}
                        onChange={e => setTpl(t => ({ ...t, [key]: { ...t[key], isi: e.target.value } }))} />
                      <p className="ad-form-hint">Variabel: {variabel}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="ad-add-btn mt-3" onClick={saveTpl} disabled={saving}>
                <i className="bi bi-check2 me-1"></i>{saving ? 'Menyimpan...' : 'Simpan Template'}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default SectionNotifikasi
