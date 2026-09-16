import { useState, useEffect, useCallback } from 'react'
import AdminModal from './shared/AdminModal'
import ConfirmDelete from './shared/ConfirmDelete'
import { useAuth } from '../../context/AuthContext'
import { JENIS_RELAWAN, STATUS_RELAWAN } from '../../data/store'
import { relawanService } from '../../services/resources'
import { downloadExcel, excelFilename, tanggalHariIni } from '../../utils/excel'

function SectionRelawan() {
  const { user } = useAuth()
  const isSuper = user?.role === 'superadmin'

  const [items,   setItems]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')
  const [search,        setSearch]        = useState('')
  const [filterStatus,  setFilterStatus]  = useState('')
  const [filterJenis,   setFilterJenis]   = useState('')
  const [filterKegiatan, setFilterKegiatan] = useState('')
  const [filterBulan,   setFilterBulan]   = useState('')   // 'YYYY-MM', kosong = semua
  const [detail,       setDetail]       = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const load = useCallback(async () => {
    setLoading(true); setError('')
    try { setItems(await relawanService.listAdmin()) }
    catch (e) { setError(e.message || 'Gagal memuat data relawan.'); setItems([]) }
    finally { setLoading(false) }
  }, [])
  useEffect(() => { load() }, [load])

  // Isi dropdown diambil dari data yang ada, bukan hanya daftar tetap — sebab tiap
  // kegiatan boleh menetapkan opsi jenis relawannya sendiri
  const jenisTersedia = [...new Set([...JENIS_RELAWAN, ...items.map(r => r.jenis).filter(Boolean)])].sort()
  const kegiatanTerpakai = [...new Set(items.map(r => r.kegiatan).filter(Boolean))].sort()

  // Bulan (YYYY-MM) menurut jam lokal peramban. Sengaja tidak memakai toISOString()
  // karena itu mengubah ke UTC: data pukul 00.00–06.59 WIB akan tergeser ke hari —
  // bahkan bulan — sebelumnya.
  const bulanSaja = (v) => {
    if (!v) return ''
    const d = new Date(v)
    return isNaN(d) ? '' : `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  }
  const namaBulan = (ym) => {
    const [y, m] = ym.split('-').map(Number)
    return new Date(y, m - 1, 1).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })
  }
  // Pilihan bulan diambil dari data yang benar-benar ada, terbaru di atas
  const bulanTersedia = [...new Set(items.map(x => bulanSaja(x.tanggalRaw)).filter(Boolean))].sort().reverse()

  const filtered = items.filter(it => {
    return (
      ((it.nama || '').toLowerCase().includes(search.toLowerCase()) ||
       (it.email || '').toLowerCase().includes(search.toLowerCase())) &&
      (!filterStatus   || it.status === filterStatus) &&
      (!filterJenis    || it.jenis === filterJenis) &&
      (!filterKegiatan || (it.kegiatan || '') === filterKegiatan) &&
      (!filterBulan    || bulanSaja(it.tanggalRaw) === filterBulan)
    )
  })

  const adaPenyaring = Boolean(search || filterStatus || filterJenis || filterKegiatan || filterBulan)
  const resetPenyaring = () => {
    setSearch(''); setFilterStatus(''); setFilterJenis('')
    setFilterKegiatan(''); setFilterBulan('')
  }

  // Export rekapan relawan (Super Admin) — mengikuti filter & pencarian aktif.
  // Berisi data pribadi, karena itu diberi peringatan di dalam berkasnya.
  const exportRekap = () => {
    const jenisTerpakai = [...new Set([...JENIS_RELAWAN, ...filtered.map(r => r.jenis).filter(Boolean)])]
    const warnaStatus = Object.fromEntries(
      Object.entries(STATUS_RELAWAN).map(([, v]) => [v.label, { green: '#1a6b3a', orange: '#d97000', red: '#C0392B' }[v.cls] || '#333333'])
    )

    downloadExcel(excelFilename('Rekapan-Relawan'), {
      judul: 'REKAPAN RELAWAN — YAYASAN KARINAKAS',
      sheet: 'Relawan',
      meta: [
        ['Tanggal export', tanggalHariIni()],
        ['Diekspor oleh', `${user?.name || '-'} (Super Admin)`],
        ['Filter jenis', filterJenis || 'Semua jenis'],
        ['Filter status', filterStatus ? STATUS_RELAWAN[filterStatus]?.label : 'Semua status'],
        ['Filter kegiatan', filterKegiatan || 'Semua kegiatan'],
        ['Bulan daftar', filterBulan ? namaBulan(filterBulan) : 'Seluruh periode'],
        ['Kata kunci', search || '(tanpa pencarian)'],
        ['Jumlah baris', `${filtered.length} dari ${items.length} data`],
        ['PERHATIAN', 'Berkas ini memuat data pribadi relawan (alamat, no. HP, no. KTP). Simpan terbatas, jangan disebarkan.'],
      ],
      // Lebar mengikuti isi terpanjang (auto-fit); max = batas sebelum teks dibungkus
      columns: [
        { header: 'No',             align: 'center', max: 50 },
        { header: 'Tanggal Daftar', max: 130 },
        { header: 'Nama',           max: 220 },
        { header: 'Email',          max: 240 },
        { header: 'No. HP/WA',      format: 'text', max: 140 },
        { header: 'Alamat',         max: 260 },
        { header: 'Asal Paroki',    max: 180 },
        { header: 'No. KTP',        format: 'text', max: 160 },
        { header: 'Jenis Relawan',  align: 'center' },
        { header: 'Kegiatan',       max: 230 },
        { header: 'Bidang Minat',   max: 190 },
        { header: 'Keterbatasan',   max: 200 },
        { header: 'Kemampuan',      max: 240 },
        { header: 'Motivasi',       max: 300 },
        { header: 'Status',         align: 'center', colors: warnaStatus },
      ],
      rows: filtered.map((r, i) => [
        i + 1,
        r.tanggal || '',
        r.nama || '',
        r.email || '',
        r.hp || '',
        r.alamat || '',
        r.paroki || '',
        r.ktp || '',
        r.jenis || '',
        r.kegiatan || 'Umum',
        r.minat || '',
        r.keterbatasan || '',
        r.kemampuan || '',
        r.motivasi || '',
        STATUS_RELAWAN[r.status]?.label || r.status || '',
      ]),
      ringkasan: [
        ['Jumlah pendaftar', filtered.length],
        ...Object.entries(STATUS_RELAWAN).map(([k, v]) => [`Status: ${v.label}`, filtered.filter(r => r.status === k).length]),
        ...jenisTerpakai.map(j => [`Jenis: ${j}`, filtered.filter(r => r.jenis === j).length]),
        ...(filtered.some(r => !r.jenis) ? [['Jenis: (tidak diisi)', filtered.filter(r => !r.jenis).length]] : []),
        ...[...new Set(filtered.map(r => r.kegiatan || 'Umum'))]
          .map(k => [`Kegiatan: ${k}`, filtered.filter(r => (r.kegiatan || 'Umum') === k).length]),
      ],
      catatan: [
        ['No. KTP & No. HP', 'Diformat sebagai teks agar 16 digit tidak berubah jadi notasi ilmiah dan angka 0 di depan tidak hilang.'],
        ['Cakupan data', 'Hanya baris yang lolos filter & pencarian saat berkas diunduh.'],
      ],
    })
  }

  // Ubah status — audit & notifikasi dicatat otomatis di server
  const changeStatus = async (it, status) => {
    try {
      await relawanService.updateStatus(it.id, status)
      await load()
    } catch (e) {
      setError(e.message || 'Gagal mengubah status.')
    }
  }

  return (
    <div>
      <div className="ad-section-head">
        <div>
          <h2 className="ad-section-title">Manajemen Relawan</h2>
          <p className="ad-section-sub">Verifikasi pendaftar relawan. Menyetujui pendaftar otomatis mencatat ucapan terima kasih.</p>
        </div>
        <div className="d-flex gap-2 flex-wrap">
          {isSuper && (
            <button
              className="ad-add-btn"
              style={{ background: '#1a6b3a' }}
              onClick={exportRekap}
              disabled={loading || filtered.length === 0}
              title={filtered.length === 0 ? 'Tidak ada data untuk diekspor' : `Unduh ${filtered.length} baris sesuai filter aktif`}
            >
              <i className="bi bi-file-earmark-excel me-1"></i>Export Rekap ({filtered.length})
            </button>
          )}
          <button className="ad-add-btn" style={{ background: '#4b5563' }} onClick={load} disabled={loading}>
            <i className={`bi ${loading ? 'bi-arrow-repeat' : 'bi-arrow-clockwise'} me-1`}></i>Muat Ulang
          </button>
        </div>
      </div>

      <div className="ad-filter-bar">
        <div className="ad-sf-wrap">
          <i className="bi bi-search ad-sf-icon"></i>
          <input className="ad-sf-input" placeholder="Cari nama / email..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="ad-filter-select" value={filterJenis} onChange={e => setFilterJenis(e.target.value)}>
          <option value="">Semua Jenis</option>
          {jenisTersedia.map(j => <option key={j} value={j}>{j}</option>)}
        </select>
        <select className="ad-filter-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="">Semua Status</option>
          {Object.entries(STATUS_RELAWAN).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
        <select className="ad-filter-select" value={filterKegiatan} onChange={e => setFilterKegiatan(e.target.value)}>
          <option value="">Semua Kegiatan</option>
          {kegiatanTerpakai.map(k => <option key={k} value={k}>{k}</option>)}
        </select>
        <select className="ad-filter-select" value={filterBulan} onChange={e => setFilterBulan(e.target.value)}
          title="Saring menurut bulan pendaftaran">
          <option value="">Semua Bulan</option>
          {bulanTersedia.map(b => <option key={b} value={b}>{namaBulan(b)}</option>)}
        </select>
        {adaPenyaring && (
          <button className="ad-filter-select" onClick={resetPenyaring} title="Hapus semua penyaring"
            style={{ cursor: 'pointer' }}>
            <i className="bi bi-x-circle me-1"></i>Reset
          </button>
        )}
        <span className="ad-filter-count">{filtered.length} dari {items.length} data</span>
      </div>

      <div className="ad-card">
        <div className="ad-table-wrap">
          <table className="ad-table">
            <thead><tr><th>Nama</th><th>Kontak</th><th>Jenis</th><th>Kegiatan</th><th>Ubah Status</th><th>Aksi</th></tr></thead>
            <tbody>
              {loading
                ? <tr><td colSpan={6} className="ad-empty-row">Memuat data dari server...</td></tr>
                : error
                ? <tr><td colSpan={6} className="ad-empty-row"><i className="bi bi-wifi-off me-2"></i>{error}</td></tr>
                : filtered.length === 0
                ? <tr><td colSpan={6} className="ad-empty-row"><i className="bi bi-inbox me-2"></i>Belum ada pendaftar relawan</td></tr>
                : filtered.map(it => (
                  <tr key={it.id}>
                    <td>
                      <div className="ad-donor">
                        <div className="ad-donor-av">{(it.nama || '?')[0]}</div>
                        <div className="ad-donor-name">{it.nama}</div>
                      </div>
                    </td>
                    <td className="ad-td-muted">
                      <div>{it.email}</div>
                      <div style={{ fontSize: '0.75rem' }}>{it.hp || '-'}</div>
                    </td>
                    <td><span className={`ad-badge ${it.jenis === 'Lansia' ? 'blue' : 'orange'}`}>{it.jenis || '-'}</span></td>
                    <td className="ad-td-muted">{it.kegiatan || <span className="text-muted">Umum</span>}</td>
                    <td>
                      <select className={`ad-status-select ${STATUS_RELAWAN[it.status]?.cls || 'gray'}`}
                        value={it.status} onChange={e => changeStatus(it, e.target.value)}>
                        {Object.entries(STATUS_RELAWAN).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                      </select>
                    </td>
                    <td><div className="ad-actions">
                      <button className="ad-action-btn" style={{ color: '#1a6b3a' }} onClick={() => setDetail(it)} title="Detail"><i className="bi bi-eye-fill"></i></button>
                      <button className="ad-action-btn delete" onClick={() => setDeleteTarget(it)} title="Hapus"><i className="bi bi-trash-fill"></i></button>
                    </div></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail (lihat data personal) */}
      {detail && (
        <AdminModal title="Detail Relawan" icon="bi-person-vcard" onClose={() => setDetail(null)}>
          <div className="ad-modal-body">
            <div className="ad-modal-grid">
              {[
                ['Nama', detail.nama],
                ['Email', detail.email],
                ['No. HP / WA', detail.hp || '-'],
                ['Alamat', detail.alamat || '-'],
                ['Asal Paroki', detail.paroki || '-'],
                ['No. KTP', detail.ktp || '-'],
                ['Jenis Relawan', detail.jenis || '-'],
                ['Kegiatan Terkait', detail.kegiatan || 'Umum'],
                ['Bidang Minat', detail.minat || '-'],
                ['Keterbatasan', detail.keterbatasan || '-'],
                ['Kemampuan', detail.kemampuan || '-'],
                ['Motivasi', detail.motivasi || '-'],
                ['Tanggal Daftar', detail.tanggal || '-'],
                ['Status', STATUS_RELAWAN[detail.status]?.label],
              ].map(([lbl, val]) => (
                <div key={lbl} className="ad-modal-row">
                  <span className="ad-modal-label">{lbl}</span>
                  <span className="ad-modal-value">{val}</span>
                </div>
              ))}
            </div>
            <div className="ad-privacy-strip"><i className="bi bi-shield-lock-fill me-2"></i>Data personal relawan — akses terbatas untuk admin.</div>
          </div>
          <div className="ad-modal-footer">
            <button className="btn btn-outline-secondary rounded-pill px-4" onClick={() => setDetail(null)}>Tutup</button>
            {detail.status !== 'diterima' && (
              <button className="btn btn-success rounded-pill px-4" onClick={async () => { await changeStatus(detail, 'diterima'); setDetail(null) }}>
                <i className="bi bi-check-circle me-1"></i>Terima Relawan
              </button>
            )}
          </div>
        </AdminModal>
      )}

      {deleteTarget && (
        <ConfirmDelete
          label={`relawan "${deleteTarget.nama}"`}
          onConfirm={async () => { try { await relawanService.remove(deleteTarget.id); await load() } catch { /* abaikan */ } setDeleteTarget(null) }}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  )
}

export default SectionRelawan
