import { useState, useEffect, useCallback } from 'react'
import AdminModal from './shared/AdminModal'
import ConfirmDelete from './shared/ConfirmDelete'
import usePaging from './shared/usePaging'
import { AdminSort, AdminPager } from './shared/AdminPager'
import { useAuth } from '../../context/AuthContext'
import { TUJUAN_DONASI, METODE_BAYAR, STATUS_DONASI, fmtRp, fmtTanggal } from '../../data/store'
import { donasiService } from '../../services/resources'
import { downloadExcel, excelFilename, tanggalHariIni } from '../../utils/excel'

function SectionDonasi() {
  const { user } = useAuth()
  const isSuper = user?.role === 'superadmin'

  const [items,   setItems]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')
  const [search,        setSearch]        = useState('')
  const [filterStatus,  setFilterStatus]  = useState('')
  const [filterKegiatan, setFilterKegiatan] = useState('')
  const [filterBulan,   setFilterBulan]   = useState('')   // 'YYYY-MM', kosong = semua
  const [modal,        setModal]        = useState(null)
  const [form,         setForm]         = useState({})
  const [saving,       setSaving]       = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [detailTarget, setDetailTarget] = useState(null)
  const [tampilSemuaKeg, setTampilSemuaKeg] = useState(false)   // rekap per kegiatan: 5 teratas / semua

  const load = useCallback(async () => {
    setLoading(true); setError('')
    try { setItems(await donasiService.listAdmin()) }
    catch (e) { setError(e.message || 'Gagal memuat donasi.'); setItems([]) }
    finally { setLoading(false) }
  }, [])
  useEffect(() => { load() }, [load])

  // Daftar kegiatan yang benar-benar muncul pada data, untuk isi dropdown penyaring
  const kegiatanTerpakai = [...new Set(items.map(d => d.kegiatan).filter(Boolean))].sort()

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
  const bulanTersedia = [...new Set(items.map(x => bulanSaja(x.tanggal)).filter(Boolean))].sort().reverse()

  const filtered = items.filter(it => {
    return (
      ((it.donatur || '').toLowerCase().includes(search.toLowerCase()) ||
       (it.tujuan || '').toLowerCase().includes(search.toLowerCase())) &&
      (!filterStatus   || it.status === filterStatus) &&
      (!filterKegiatan || (it.kegiatan || '') === filterKegiatan) &&
      (!filterBulan    || bulanSaja(it.tanggal) === filterBulan)
    )
  })
  // Paging hanya untuk tampilan; Export Rekap tetap memakai seluruh `filtered`
  const pg = usePaging(filtered, it => it.tanggal, `${search}|${filterStatus}|${filterKegiatan}|${filterBulan}`)

  const adaPenyaring = Boolean(search || filterStatus || filterKegiatan || filterBulan)
  const resetPenyaring = () => {
    setSearch(''); setFilterStatus(''); setFilterKegiatan(''); setFilterBulan('')
  }

  const totalBerhasil = items.filter(d => d.status === 'berhasil').reduce((s, d) => s + Number(d.nominal), 0)
  const countPending  = items.filter(d => d.status === 'pending').length

  // Rekap donasi per kegiatan (Super Admin). Dikelompokkan menurut ID kegiatan, dihitung dari
  // seluruh data (semua periode). "Diterima" hanya donasi berstatus berhasil.
  // Donasi baru wajib terikat kegiatan (DonasiController::store). Baris "tanpa kegiatan" hanya
  // muncul bila ada data lama atau kegiatannya sudah dihapus (donasi.kegiatan_id ON DELETE SET NULL).
  const rekapKegiatan = (() => {
    const peta = new Map()
    items.forEach(d => {
      const kunci = d.kegiatanId || d.kegiatan || '__umum'
      if (!peta.has(kunci)) {
        peta.set(kunci, {
          kunci, nama: d.kegiatan || 'Tanpa kegiatan (data lama / kegiatan dihapus)', umum: !d.kegiatan,
          transaksi: 0, berhasil: 0, pending: 0, gagal: 0, diterima: 0,
        })
      }
      const r = peta.get(kunci)
      r.transaksi++
      if (d.status === 'berhasil') { r.berhasil++; r.diterima += Number(d.nominal) || 0 }
      else if (d.status === 'pending') r.pending++
      else if (d.status === 'gagal') r.gagal++
    })
    return [...peta.values()].sort((a, b) => b.diterima - a.diterima || b.transaksi - a.transaksi)
  })()
  const rekapTampil = tampilSemuaKeg ? rekapKegiatan : rekapKegiatan.slice(0, 5)
  // Admin biasa tidak mendapat kolom Ubah Status, Detail, dan Aksi — verifikasi khusus Super Admin
  const jumlahKolom = isSuper ? 8 : 6

  const changeStatus = async (it, status) => {
    try { await donasiService.updateStatus(it.id, status); await load() }
    catch (e) { setError(e.message || 'Gagal mengubah status.') }
  }

  const openEdit = it => { setForm({ ...it }); setModal({ item: it }); setError('') }

  const handleSave = async e => {
    e.preventDefault()
    setSaving(true)
    try {
      await donasiService.update(modal.item.id, { ...form, nominal: Number(form.nominal) || 0, fee: Number(form.fee) || 0 })
      setModal(null)
      await load()
    } catch (err) {
      setError(err.message || 'Gagal menyimpan.')
    } finally {
      setSaving(false)
    }
  }

  // Export mengikuti filter & pencarian yang sedang aktif di layar
  const exportRekap = () => {
    const num      = n => Number(n || 0)
    const net      = d => num(d.nominal) - num(d.fee)
    const berhasil = filtered.filter(d => d.status === 'berhasil')
    const jumlah   = (arr, f) => arr.reduce((s, d) => s + f(d), 0)

    const warnaStatus = Object.fromEntries(
      Object.entries(STATUS_DONASI).map(([, v]) => [v.label, { green: '#1a6b3a', orange: '#d97000', red: '#C0392B' }[v.cls] || '#333333'])
    )

    downloadExcel(excelFilename('Rekapan-Donasi'), {
      judul: 'REKAPAN DONASI — YAYASAN KARINAKAS',
      sheet: 'Donasi',
      meta: [
        ['Tanggal export', tanggalHariIni()],
        ['Diekspor oleh', `${user?.name || '-'} (Super Admin)`],
        ['Filter status', filterStatus ? STATUS_DONASI[filterStatus]?.label : 'Semua status'],
        ['Filter kegiatan', filterKegiatan || 'Semua kegiatan'],
        ['Bulan donasi', filterBulan ? namaBulan(filterBulan) : 'Seluruh periode'],
        ['Kata kunci', search || '(tanpa pencarian)'],
        ['Jumlah baris', `${filtered.length} dari ${items.length} data`],
      ],
      // Lebar mengikuti isi terpanjang (auto-fit); max = batas sebelum teks dibungkus
      columns: [
        { header: 'No',                   align: 'center', max: 50 },
        { header: 'Tanggal',              max: 130 },
        { header: 'Donatur',              max: 220 },
        { header: 'Email',                max: 240 },
        { header: 'Kegiatan',             max: 230 },
        { header: 'Tujuan Donasi',        max: 280 },
        { header: 'Metode',               max: 130 },
        { header: 'Nominal (Rp)',         format: 'number', min: 110 },
        { header: 'Biaya (Rp)',           format: 'number', min: 90 },
        { header: 'Diterima Bersih (Rp)', format: 'number', min: 130 },
        { header: 'Status',               align: 'center',  colors: warnaStatus },
        { header: 'Kode Transaksi',       format: 'text',   max: 160 },
        { header: 'Bukti',                align: 'center' },
      ],
      rows: filtered.map((d, i) => [
        i + 1,
        fmtTanggal(d.tanggal),
        d.donatur || '',
        d.email || '',
        d.kegiatan || '',
        d.tujuan || '',
        d.metode || '',
        num(d.nominal),
        num(d.fee),
        net(d),
        STATUS_DONASI[d.status]?.label || d.status || '',
        d.kode || '',
        d.bukti ? 'Ada' : 'Belum ada',
      ]),
      ringkasan: [
        ['Jumlah transaksi', filtered.length],
        ...Object.entries(STATUS_DONASI).map(([k, v]) => [v.label, filtered.filter(d => d.status === k).length]),
        ['Total nominal (semua baris)', jumlah(filtered, d => num(d.nominal))],
        ['Total nominal berhasil', jumlah(berhasil, d => num(d.nominal))],
        ['Total biaya', jumlah(filtered, d => num(d.fee))],
        ['Total diterima bersih (berhasil)', jumlah(berhasil, net)],
      ],
      catatan: [
        ['Kolom nominal', 'Ditulis sebagai angka, bisa langsung dijumlah dengan rumus SUM.'],
        ['Cakupan data', 'Hanya baris yang lolos filter & pencarian saat berkas diunduh.'],
      ],
    })
  }

  return (
    <div>
      <div className="ad-section-head">
        <div>
          <h2 className="ad-section-title">
            Donasi {isSuper ? '& Keuangan' : ''}
            <span className={`ms-2 ${isSuper ? 'ad-super-badge-sm' : 'ad-badge gray'}`}>{isSuper ? 'Super Admin' : 'Akses Terbatas'}</span>
          </h2>
          <p className="ad-section-sub">
            {isSuper
              ? 'Verifikasi pembayaran, lihat bukti transfer, dan rekapan keuangan.'
              : 'Anda dapat memantau donasi yang masuk. Verifikasi pembayaran, nominal, dan bukti transfer ditangani Super Admin.'}
          </p>
        </div>
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
      </div>

      {/* Mini summary */}
      <div className="ad-don-summary">
        <div className="ad-don-sum-card">
          <div className="ad-summary-icon" style={{ color: '#1d4ed8', background: '#EFF6FF' }}><i className="bi bi-receipt"></i></div>
          <div><p className="ad-don-sum-val">{items.length}</p><p className="ad-don-sum-lbl">Total Transaksi</p></div>
        </div>
        <div className="ad-don-sum-card">
          <div className="ad-summary-icon" style={{ color: '#d97000', background: '#FFF3E6' }}><i className="bi bi-hourglass-split"></i></div>
          <div><p className="ad-don-sum-val">{countPending}</p><p className="ad-don-sum-lbl">Menunggu Verifikasi</p></div>
        </div>
        <div className="ad-don-sum-card">
          <div className="ad-summary-icon" style={{ color: '#1a6b3a', background: '#E8F5E9' }}><i className="bi bi-cash-stack"></i></div>
          <div>
            <p className="ad-don-sum-val">{isSuper ? fmtRp(totalBerhasil) : 'Rp •••••'}</p>
            <p className="ad-don-sum-lbl">Total Diterima {!isSuper && '(terkunci)'}</p>
          </div>
        </div>
      </div>

      {/* Rekap donasi per kegiatan (Super Admin: nominal terkunci bagi admin biasa) */}
      {isSuper && !loading && !error && rekapKegiatan.length > 0 && (
        <div className="ad-card ad-keg-rekap">
          <div className="ad-keg-rekap-head">
            <h3 className="ad-keg-rekap-title"><i className="bi bi-bar-chart-fill me-2"></i>Donasi per Kegiatan</h3>
            <span className="ad-keg-rekap-note">Total diterima = donasi berstatus Berhasil, semua periode</span>
          </div>
          <div className="ad-table-wrap">
            <table className="ad-table">
              <thead><tr>
                <th>Kegiatan</th><th>Transaksi</th><th>Menunggu</th><th>Berhasil</th><th>Total Diterima</th><th></th>
              </tr></thead>
              <tbody>
                {rekapTampil.map(r => {
                  const aktif = !r.umum && filterKegiatan === r.nama
                  const persen = totalBerhasil > 0 ? Math.round((r.diterima / totalBerhasil) * 100) : 0
                  return (
                    <tr key={r.kunci} className={aktif ? 'ad-keg-row-aktif' : ''}>
                      <td className="ad-td-bold">{r.nama}</td>
                      <td className="ad-td-muted">{r.transaksi}</td>
                      <td className="ad-td-muted">{r.pending}</td>
                      <td className="ad-td-muted">{r.berhasil}</td>
                      <td>
                        <span className="ad-amount">{fmtRp(r.diterima)}</span>
                        <div className="ad-keg-bar" title={`${persen}% dari total diterima`}><span style={{ width: `${persen}%` }}></span></div>
                      </td>
                      <td>
                        {!r.umum && (
                          <button className="ad-bukti-btn" onClick={() => setFilterKegiatan(aktif ? '' : r.nama)}
                            title="Saring tabel donasi di bawah menurut kegiatan ini">
                            <i className={`bi ${aktif ? 'bi-x-circle' : 'bi-funnel'} me-1`}></i>{aktif ? 'Lepas' : 'Lihat'}
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td className="ad-td-bold">Total ({rekapKegiatan.length} kegiatan/kelompok)</td>
                  <td className="ad-td-bold">{items.length}</td>
                  <td className="ad-td-bold">{countPending}</td>
                  <td className="ad-td-bold">{items.filter(d => d.status === 'berhasil').length}</td>
                  <td className="ad-td-bold"><span className="ad-amount">{fmtRp(totalBerhasil)}</span></td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
          {rekapKegiatan.length > 5 && (
            <div className="ad-keg-rekap-foot">
              <button className="ad-bukti-btn" onClick={() => setTampilSemuaKeg(v => !v)}>
                <i className={`bi ${tampilSemuaKeg ? 'bi-chevron-up' : 'bi-chevron-down'} me-1`}></i>
                {tampilSemuaKeg ? 'Tampilkan 5 teratas' : `Tampilkan semua (${rekapKegiatan.length})`}
              </button>
            </div>
          )}
        </div>
      )}

      <div className="ad-filter-bar">
        <div className="ad-sf-wrap">
          <i className="bi bi-search ad-sf-icon"></i>
          <input className="ad-sf-input" placeholder="Cari donatur / tujuan..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="ad-filter-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="">Semua Status</option>
          {Object.entries(STATUS_DONASI).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
        <select className="ad-filter-select" value={filterKegiatan} onChange={e => setFilterKegiatan(e.target.value)}>
          <option value="">Semua Kegiatan</option>
          {kegiatanTerpakai.map(k => <option key={k} value={k}>{k}</option>)}
        </select>
        <select className="ad-filter-select" value={filterBulan} onChange={e => setFilterBulan(e.target.value)}
          title="Saring menurut bulan donasi">
          <option value="">Semua Bulan</option>
          {bulanTersedia.map(b => <option key={b} value={b}>{namaBulan(b)}</option>)}
        </select>
        {adaPenyaring && (
          <button className="ad-filter-select" onClick={resetPenyaring} title="Hapus semua penyaring"
            style={{ cursor: 'pointer' }}>
            <i className="bi bi-x-circle me-1"></i>Reset
          </button>
        )}
        <AdminSort pg={pg} />
        <span className="ad-filter-count">{filtered.length} dari {items.length} data</span>
      </div>

      <div className="ad-card">
        <div className="ad-table-wrap">
          <table className="ad-table">
            <thead><tr>
              <th>Donatur</th><th>Tujuan</th><th>Nominal</th><th>Metode</th><th>Tanggal</th>
              {isSuper
                ? <><th>Ubah Status</th><th>Detail</th><th>Aksi</th></>
                : <th>Status</th>}
            </tr></thead>
            <tbody>
              {loading
                ? <tr><td colSpan={jumlahKolom} className="ad-empty-row">Memuat data dari server...</td></tr>
                : error
                ? <tr><td colSpan={jumlahKolom} className="ad-empty-row"><i className="bi bi-wifi-off me-2"></i>{error}</td></tr>
                : filtered.length === 0
                ? <tr><td colSpan={jumlahKolom} className="ad-empty-row"><i className="bi bi-inbox me-2"></i>Belum ada donasi</td></tr>
                : pg.pageItems.map(it => (
                  <tr key={it.id}>
                    <td>
                      <div className="ad-donor">
                        <div className="ad-donor-av">{(it.donatur || '?')[0]}</div>
                        <div className="ad-donor-name">{it.donatur}</div>
                      </div>
                    </td>
                    <td className="ad-td-muted">{it.tujuan}</td>
                    <td>
                      {isSuper
                        ? <span className="ad-amount">{fmtRp(it.nominal)}</span>
                        : <span className="ad-locked"><i className="bi bi-lock-fill me-1"></i>Rp •••••</span>}
                    </td>
                    <td className="ad-td-muted">{it.metode}</td>
                    <td className="ad-td-muted">{fmtTanggal(it.tanggal)}</td>
                    {isSuper ? (
                      <>
                        <td>
                          <select className={`ad-status-select ${STATUS_DONASI[it.status]?.cls || 'gray'}`}
                            value={it.status} onChange={e => changeStatus(it, e.target.value)}>
                            {Object.entries(STATUS_DONASI).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                          </select>
                        </td>
                        <td>
                          <button className="ad-bukti-btn" onClick={() => setDetailTarget(it)}>
                            <i className={`bi ${it.bukti ? 'bi-receipt-cutoff' : 'bi-eye-fill'} me-1`}></i>{it.bukti ? 'Bukti' : 'Lihat'}
                          </button>
                        </td>
                        <td><div className="ad-actions">
                          <button className="ad-action-btn edit" onClick={() => openEdit(it)} title="Edit"><i className="bi bi-pencil-fill"></i></button>
                          <button className="ad-action-btn delete" onClick={() => setDeleteTarget(it)} title="Hapus"><i className="bi bi-trash-fill"></i></button>
                        </div></td>
                      </>
                    ) : (
                      <td>
                        <span className={`ad-badge ${STATUS_DONASI[it.status]?.cls || 'gray'}`}>
                          {STATUS_DONASI[it.status]?.label || it.status}
                        </span>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {!loading && !error && <AdminPager pg={pg} satuan="donasi" />}
      </div>

      {/* Edit (Super Admin) */}
      {modal && (
        <AdminModal title="Edit Donasi" icon="bi-cash-coin" onClose={() => setModal(null)}>
          <form onSubmit={handleSave}>
            <div className="ad-form-body">
              <div className="ad-form-group full">
                <label className="ad-form-label">Donatur</label>
                <input className="ad-form-input" value={form.donatur || ''} readOnly style={{ background: '#f5f5f5' }} />
              </div>
              <div className="ad-form-row">
                <div className="ad-form-group">
                  <label className="ad-form-label">Tujuan Donasi</label>
                  <input className="ad-form-input" value={form.tujuan || ''} onChange={e => setForm(f => ({ ...f, tujuan: e.target.value }))} list="tujuan-list" />
                  <datalist id="tujuan-list">{TUJUAN_DONASI.map(t => <option key={t} value={t} />)}</datalist>
                </div>
                <div className="ad-form-group">
                  <label className="ad-form-label">Nominal (Rp)</label>
                  <input type="number" min="0" className="ad-form-input" value={form.nominal ?? ''} onChange={e => setForm(f => ({ ...f, nominal: e.target.value }))} />
                </div>
              </div>
              <div className="ad-form-row">
                <div className="ad-form-group">
                  <label className="ad-form-label">Metode</label>
                  <select className="ad-form-input ad-form-select" value={form.metode || ''} onChange={e => setForm(f => ({ ...f, metode: e.target.value }))}>
                    {METODE_BAYAR.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div className="ad-form-group">
                  <label className="ad-form-label">Status</label>
                  <select className="ad-form-input ad-form-select" value={form.status || 'pending'} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                    {Object.entries(STATUS_DONASI).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="ad-form-row">
                <div className="ad-form-group">
                  <label className="ad-form-label">Biaya Transfer/Admin (Rp)</label>
                  <input type="number" min="0" className="ad-form-input" value={form.fee ?? 0} onChange={e => setForm(f => ({ ...f, fee: e.target.value }))} />
                </div>
                <div className="ad-form-group">
                  <label className="ad-form-label">Kode / No. Transaksi</label>
                  <input className="ad-form-input" value={form.kode || ''} onChange={e => setForm(f => ({ ...f, kode: e.target.value }))} />
                </div>
              </div>
              <div className="ad-form-group full">
                <label className="ad-form-label">Rekening / Sumber Dana Pengirim</label>
                <input className="ad-form-input" value={form.rekening || ''} onChange={e => setForm(f => ({ ...f, rekening: e.target.value }))} />
              </div>
            </div>
            {error && <div className="lg-error" style={{ margin: '0 1.5rem' }}><i className="bi bi-exclamation-circle-fill me-2"></i>{error}</div>}
            <div className="ad-modal-footer">
              <button type="button" className="btn btn-outline-secondary rounded-pill px-4" onClick={() => setModal(null)}>Batal</button>
              <button type="submit" className="btn btn-danger rounded-pill px-4" disabled={saving}>
                {saving ? <><span className="lg-spinner" /> Menyimpan...</> : <><i className="bi bi-check2 me-1"></i>Perbarui</>}
              </button>
            </div>
          </form>
        </AdminModal>
      )}

      {/* Detail pembayaran + bukti transfer */}
      {detailTarget && (
        <AdminModal title="Detail Pembayaran" icon="bi-shield-lock-fill" onClose={() => setDetailTarget(null)}>
          <div className="ad-modal-body">
            <div className="ad-modal-grid">
              {[
                ['Donatur', detailTarget.donatur],
                ['Email', detailTarget.email || '-'],
                ['Tujuan', detailTarget.tujuan],
                ...(isSuper ? [
                  ['Nominal (Gross)', fmtRp(detailTarget.nominal)],
                  ['Biaya Transfer/Admin', fmtRp(detailTarget.fee)],
                  ['Diterima Bersih (Net)', fmtRp(Number(detailTarget.nominal) - Number(detailTarget.fee || 0))],
                ] : [['Nominal', 'Terkunci (Super Admin)']]),
                ['Metode', detailTarget.metode],
                ['Kode Transaksi', detailTarget.kode || '-'],
                ['Tanggal', fmtTanggal(detailTarget.tanggal)],
                ['Status', STATUS_DONASI[detailTarget.status]?.label],
              ].map(([lbl, val]) => (
                <div key={lbl} className="ad-modal-row">
                  <span className="ad-modal-label">{lbl}</span>
                  <span className="ad-modal-value">{val}</span>
                </div>
              ))}
            </div>

            {/* Bukti transfer */}
            <p className="ad-form-label mt-3 mb-1">Bukti Transfer</p>
            {detailTarget.bukti ? (
              <a href={detailTarget.bukti} target="_blank" rel="noreferrer">
                <img src={detailTarget.bukti} alt="Bukti transfer" style={{ width: '100%', borderRadius: 12, border: '1px solid #eee', maxHeight: 360, objectFit: 'contain', background: '#fafafa' }} />
                <p className="dn-form-hint mt-1"><i className="bi bi-box-arrow-up-right me-1"></i>Klik untuk buka ukuran penuh</p>
              </a>
            ) : (
              <div className="ad-modal-bukti-area"><i className="bi bi-image ad-modal-bukti-icon"></i><p className="ad-modal-bukti-text">Donatur belum mengunggah bukti transfer.</p></div>
            )}
          </div>
          <div className="ad-modal-footer">
            <button className="btn btn-outline-secondary rounded-pill px-4" onClick={() => setDetailTarget(null)}>Tutup</button>
            {detailTarget.status !== 'berhasil' && (
              <button className="btn btn-danger rounded-pill px-4" onClick={async () => { await changeStatus(detailTarget, 'berhasil'); setDetailTarget(null) }}>
                <i className="bi bi-check-circle me-1"></i>Verifikasi Berhasil
              </button>
            )}
          </div>
        </AdminModal>
      )}

      {deleteTarget && (
        <ConfirmDelete
          label={`donasi dari "${deleteTarget.donatur}"`}
          onConfirm={async () => { try { await donasiService.remove(deleteTarget.id); await load() } catch { /* abaikan */ } setDeleteTarget(null) }}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  )
}

export default SectionDonasi
