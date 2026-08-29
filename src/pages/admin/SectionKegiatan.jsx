import { useState } from 'react'
import AdminModal from './shared/AdminModal'
import ConfirmDelete from './shared/ConfirmDelete'
import { STATUS_KEGIATAN, KATEGORI_KEGIATAN, KATEGORI_LABEL, JENIS_RELAWAN, MINAT_RELAWAN, fmtTanggal } from '../../data/store'
import useResource from '../../hooks/useResource'
import { kegiatanService } from '../../services/resources'

const statusMap = STATUS_KEGIATAN
const empty = {
  judul: '', kategori: 'sosial', lokasi: '', tanggal: '', status: 'aktif',
  butuhRelawan: false, butuhDonasi: false, kuotaRelawan: 0,
  jenisRelawan: [], bidangMinat: [],
  img: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500&h=280&fit=crop',
  deskripsi: '',
}

// Editor daftar opsi (tag) — untuk Jenis Relawan & Bidang Minat
function TagEditor({ label, hint, values = [], onChange, suggestions = [] }) {
  const [input, setInput] = useState('')
  const add = (raw) => {
    const v = (raw || '').trim()
    if (!v || values.includes(v)) { setInput(''); return }
    onChange([...values, v]); setInput('')
  }
  const remove = (v) => onChange(values.filter(x => x !== v))
  return (
    <div className="ad-form-group full">
      <label className="ad-form-label">{label}</label>
      {values.length > 0 && (
        <div className="kg-tags">
          {values.map(v => (
            <span key={v} className="kg-tag">{v}
              <button type="button" onClick={() => remove(v)} aria-label={`Hapus ${v}`}><i className="bi bi-x"></i></button>
            </span>
          ))}
        </div>
      )}
      <div className="d-flex gap-2 mt-1">
        <input
          className="ad-form-input"
          placeholder="Ketik nama opsi lalu tekan Enter..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(input) } }}
        />
        <button type="button" className="btn btn-outline-secondary rounded-pill px-3" onClick={() => add(input)}><i className="bi bi-plus-lg"></i></button>
      </div>
      {suggestions.filter(s => !values.includes(s)).length > 0 && (
        <div className="kg-suggest">
          <span className="ad-form-hint me-1">Cepat tambah:</span>
          {suggestions.filter(s => !values.includes(s)).map(s => (
            <button key={s} type="button" className="kg-suggest-chip" onClick={() => add(s)}>+ {s}</button>
          ))}
        </div>
      )}
      {hint && <p className="ad-form-hint">{hint}</p>}
    </div>
  )
}

function SectionKegiatan() {
  const { items, loading, error, add, update, remove } = useResource(kegiatanService)
  const [search,       setSearch]       = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [modal,        setModal]        = useState(null)
  const [form,         setForm]         = useState(empty)
  const [saving,       setSaving]       = useState(false)
  const [formErr,      setFormErr]      = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)

  const filtered = items.filter(it =>
    (it.judul.toLowerCase().includes(search.toLowerCase()) ||
     (it.lokasi || '').toLowerCase().includes(search.toLowerCase())) &&
    (!filterStatus || it.status === filterStatus)
  )

  const openAdd  = () => { setForm(empty); setFormErr(''); setModal({ mode: 'add' }) }
  const openEdit = it => { setForm({ ...empty, ...it }); setFormErr(''); setModal({ mode: 'edit', item: it }) }

  const handleSave = async e => {
    e.preventDefault()
    setSaving(true)
    setFormErr('')
    try {
      if (modal.mode === 'add') await add(form)
      else await update(modal.item.id, form)
      setModal(null)
    } catch (err) {
      setFormErr(err.message || 'Gagal menyimpan ke server.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="ad-section-head">
        <div>
          <h2 className="ad-section-title">Program &amp; Kegiatan</h2>
          <p className="ad-section-sub">Kelola kegiatan. Tandai apakah kegiatan membuka pendaftaran relawan dan/atau menerima donasi.</p>
        </div>
        <button className="ad-add-btn" onClick={openAdd}><i className="bi bi-plus-lg me-1"></i>Tambah Kegiatan</button>
      </div>

      <div className="ad-filter-bar">
        <div className="ad-sf-wrap">
          <i className="bi bi-search ad-sf-icon"></i>
          <input className="ad-sf-input" placeholder="Cari judul / lokasi..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="ad-filter-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="">Semua Status</option>
          {Object.entries(statusMap).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
        <span className="ad-filter-count">{filtered.length} data</span>
      </div>

      <div className="ad-card">
        <div className="ad-table-wrap">
          <table className="ad-table">
            <thead><tr><th>Nama Kegiatan</th><th>Kategori</th><th>Kebutuhan</th><th>Lokasi</th><th>Tanggal</th><th>Status</th><th>Aksi</th></tr></thead>
            <tbody>
              {loading
                ? <tr><td colSpan={7} className="ad-empty-row">Memuat data dari server...</td></tr>
                : error
                ? <tr><td colSpan={7} className="ad-empty-row"><i className="bi bi-wifi-off me-2"></i>{error}</td></tr>
                : filtered.length === 0
                ? <tr><td colSpan={7} className="ad-empty-row"><i className="bi bi-inbox me-2"></i>Tidak ada data</td></tr>
                : filtered.map(it => (
                  <tr key={it.id}>
                    <td><span className="ad-td-bold">{it.judul}</span></td>
                    <td className="ad-td-muted">{KATEGORI_LABEL[it.kategori] || it.kategori}</td>
                    <td>
                      <div className="d-flex gap-1 flex-wrap align-items-center">
                        {it.butuhRelawan && (
                          <span className="ad-badge" style={{ background: '#F3E8FF', color: '#6d28d9' }}>
                            Relawan {Number(it.kuotaRelawan) > 0 ? `${it.terisi}/${it.kuotaRelawan}` : '∞'}
                          </span>
                        )}
                        {it.butuhDonasi  && <span className="ad-badge red">Donasi</span>}
                        {!it.butuhRelawan && !it.butuhDonasi && <span className="ad-td-muted" style={{ fontSize: '0.75rem' }}>—</span>}
                      </div>
                    </td>
                    <td className="ad-td-muted"><i className="bi bi-geo-alt-fill me-1 text-danger"></i>{it.lokasi}</td>
                    <td className="ad-td-muted">{fmtTanggal(it.tanggal)}</td>
                    <td><span className={`ad-badge ${statusMap[it.status]?.cls || 'gray'}`}>{statusMap[it.status]?.label || it.status}</span></td>
                    <td><div className="ad-actions">
                      <button className="ad-action-btn edit" onClick={() => openEdit(it)} title="Edit"><i className="bi bi-pencil-fill"></i></button>
                      <button className="ad-action-btn delete" onClick={() => setDeleteTarget(it)} title="Hapus"><i className="bi bi-trash-fill"></i></button>
                    </div></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <AdminModal title={modal.mode === 'add' ? 'Tambah Kegiatan' : 'Edit Kegiatan'} icon="bi-calendar2-check-fill" onClose={() => setModal(null)}>
          <form onSubmit={handleSave}>
            <div className="ad-form-body">
              <div className="ad-form-group full">
                <label className="ad-form-label">Nama Kegiatan <span className="text-danger">*</span></label>
                <input required className="ad-form-input" value={form.judul} onChange={e => setForm(f => ({ ...f, judul: e.target.value }))} />
              </div>
              <div className="ad-form-row">
                <div className="ad-form-group">
                  <label className="ad-form-label">Kategori</label>
                  <select className="ad-form-input ad-form-select" value={form.kategori} onChange={e => setForm(f => ({ ...f, kategori: e.target.value }))}>
                    {KATEGORI_KEGIATAN.map(k => <option key={k} value={k}>{KATEGORI_LABEL[k]}</option>)}
                  </select>
                </div>
                <div className="ad-form-group">
                  <label className="ad-form-label">Lokasi</label>
                  <input className="ad-form-input" value={form.lokasi} onChange={e => setForm(f => ({ ...f, lokasi: e.target.value }))} />
                </div>
              </div>
              <div className="ad-form-row">
                <div className="ad-form-group">
                  <label className="ad-form-label">Tanggal</label>
                  <input type="date" className="ad-form-input" value={form.tanggal} onChange={e => setForm(f => ({ ...f, tanggal: e.target.value }))} />
                </div>
                <div className="ad-form-group">
                  <label className="ad-form-label">Status</label>
                  <select className="ad-form-input ad-form-select" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                    {Object.entries(statusMap).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="ad-form-group full">
                <label className="ad-form-label">URL Gambar</label>
                <input className="ad-form-input" value={form.img} onChange={e => setForm(f => ({ ...f, img: e.target.value }))} />
              </div>
              <div className="ad-form-group full">
                <label className="ad-form-label">Deskripsi</label>
                <textarea rows={2} className="ad-form-input ad-form-textarea" value={form.deskripsi} onChange={e => setForm(f => ({ ...f, deskripsi: e.target.value }))} />
              </div>
              <div className="ad-form-group full">
                <label className="ad-form-label">Kebutuhan Kegiatan</label>
                <div className="d-flex gap-3 flex-wrap mt-1">
                  <label className="kg-check">
                    <input type="checkbox" checked={form.butuhRelawan} onChange={e => setForm(f => ({ ...f, butuhRelawan: e.target.checked }))} />
                    <span><i className="bi bi-person-heart me-1 text-danger"></i>Membuka pendaftaran relawan</span>
                  </label>
                  <label className="kg-check">
                    <input type="checkbox" checked={form.butuhDonasi} onChange={e => setForm(f => ({ ...f, butuhDonasi: e.target.checked }))} />
                    <span><i className="bi bi-heart-fill me-1 text-danger"></i>Menerima donasi</span>
                  </label>
                </div>
              </div>
              {form.butuhRelawan && (
                <>
                  <div className="ad-form-group full">
                    <label className="ad-form-label">Batas / Kuota Pendaftar Relawan</label>
                    <input type="number" min="0" className="ad-form-input" placeholder="0 = tidak dibatasi"
                      value={form.kuotaRelawan} onChange={e => setForm(f => ({ ...f, kuotaRelawan: Number(e.target.value) || 0 }))} />
                    <p className="ad-form-hint">Isi 0 jika pendaftaran relawan tidak dibatasi. Jika kuota tercapai, pendaftaran otomatis ditutup.</p>
                  </div>

                  <TagEditor
                    label="Jenis Relawan yang Dibutuhkan"
                    values={form.jenisRelawan}
                    onChange={v => setForm(f => ({ ...f, jenisRelawan: v }))}
                    suggestions={JENIS_RELAWAN}
                    hint="Opsi ini yang akan muncul saat pengguna mendaftar relawan untuk kegiatan ini. Kosongkan untuk memakai pilihan bawaan."
                  />
                  <TagEditor
                    label="Bidang Minat yang Tersedia"
                    values={form.bidangMinat}
                    onChange={v => setForm(f => ({ ...f, bidangMinat: v }))}
                    suggestions={MINAT_RELAWAN}
                    hint="Pilihan bidang minat khusus untuk kegiatan ini. Kosongkan untuk memakai pilihan bawaan."
                  />
                </>
              )}
            </div>
            {formErr && <div className="lg-error" style={{ margin: '0 1.5rem' }}><i className="bi bi-exclamation-circle-fill me-2"></i>{formErr}</div>}
            <div className="ad-modal-footer">
              <button type="button" className="btn btn-outline-secondary rounded-pill px-4" onClick={() => setModal(null)}>Batal</button>
              <button type="submit" className="btn btn-danger rounded-pill px-4" disabled={saving}>
                {saving ? <><span className="lg-spinner" /> Menyimpan...</> : <><i className="bi bi-check2 me-1"></i>{modal.mode === 'add' ? 'Tambah' : 'Simpan'}</>}
              </button>
            </div>
          </form>
        </AdminModal>
      )}

      {deleteTarget && (
        <ConfirmDelete
          label={`kegiatan "${deleteTarget.judul}"`}
          onConfirm={async () => { try { await remove(deleteTarget.id) } catch { /* abaikan */ } setDeleteTarget(null) }}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  )
}

export default SectionKegiatan
