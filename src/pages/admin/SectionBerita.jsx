import { useState } from 'react'
import AdminModal from './shared/AdminModal'
import ConfirmDelete from './shared/ConfirmDelete'
import { BERITA_KATEGORI, LABEL_UMUM } from '../../data/store'
import useResource from '../../hooks/useResource'
import { beritaService } from '../../services/resources'

const DEFAULT_AVATAR = 'https://randomuser.me/api/portraits/lego/5.jpg'
const DEFAULT_IMG = 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=700&h=420&fit=crop'

const katStyle = {
  sosial: { color: '#1a6b3a', bg: '#E8F5E9' }, pendidikan: { color: '#1d4ed8', bg: '#EFF6FF' },
  kesehatan: { color: '#C0392B', bg: '#FFEBEE' }, bantuan: { color: '#d97000', bg: '#FFF3E6' },
  kegiatan: { color: '#6d28d9', bg: '#F3E8FF' }, pengumuman: { color: '#0891b2', bg: '#E0F7FA' },
  lainnya: { color: '#555', bg: '#F5F5F5' },
}
const kc = k => katStyle[k] || katStyle.lainnya

const empty = {
  title: '', category: 'sosial', author: '', date: '', readTime: '3 menit',
  img: DEFAULT_IMG, excerpt: '', content: '', tags: '', status: 'published',
}

function SectionBerita() {
  const { items, loading, error, add, update, remove } = useResource(beritaService)
  const [search,       setSearch]       = useState('')
  const [filterKat,    setFilterKat]    = useState('')
  const [modal,        setModal]        = useState(null)
  const [form,         setForm]         = useState(empty)
  const [saving,       setSaving]       = useState(false)
  const [formErr,      setFormErr]      = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)

  const filtered = items.filter(it =>
    ((it.title || '').toLowerCase().includes(search.toLowerCase()) ||
     (it.author || '').toLowerCase().includes(search.toLowerCase())) &&
    (!filterKat || it.category === filterKat)
  )

  const openAdd  = () => { setForm(empty); setModal({ mode: 'add' }) }
  const openEdit = it => {
    setForm({
      title: it.title, category: it.category, author: it.author, date: it.date,
      readTime: it.readTime || '3 menit', img: it.img, excerpt: it.excerpt,
      content: (it.content || []).join('\n\n'), tags: (it.tags || []).join(', '),
      status: it.status || 'published',
    })
    setModal({ mode: 'edit', item: it })
  }

  const handleSave = async e => {
    e.preventDefault()
    setSaving(true)
    setFormErr('')
    const record = {
      title: form.title,
      category: form.category,
      author: form.author,
      authorAvatar: modal.item?.authorAvatar || DEFAULT_AVATAR,
      readTime: form.readTime || '3 menit',
      img: form.img || DEFAULT_IMG,
      excerpt: form.excerpt,
      content: form.content.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean),
      tags: form.tags.split(',').map(s => s.trim()).filter(Boolean),
      status: form.status,
    }
    try {
      if (modal.mode === 'add') await add(record)
      else await update(modal.item.id, record)
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
          <h2 className="ad-section-title">Berita &amp; Kampanye Sosial</h2>
          <p className="ad-section-sub">Kelola berita. Semua isi (judul, gambar, isi artikel, tags) tampil langsung di website publik.</p>
        </div>
        <button className="ad-add-btn" onClick={openAdd}><i className="bi bi-plus-lg me-1"></i>Tambah Berita</button>
      </div>

      <div className="ad-filter-bar">
        <div className="ad-sf-wrap">
          <i className="bi bi-search ad-sf-icon"></i>
          <input className="ad-sf-input" placeholder="Cari judul / penulis..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="ad-filter-select" value={filterKat} onChange={e => setFilterKat(e.target.value)}>
          <option value="">Semua Kategori</option>
          {BERITA_KATEGORI.map(k => <option key={k} value={k}>{LABEL_UMUM[k]}</option>)}
        </select>
        <span className="ad-filter-count">{filtered.length} data</span>
      </div>

      <div className="ad-card">
        <div className="ad-table-wrap">
          <table className="ad-table">
            <thead><tr><th>Judul</th><th>Kategori</th><th>Penulis</th><th>Tanggal</th><th>Status</th><th>Aksi</th></tr></thead>
            <tbody>
              {loading
                ? <tr><td colSpan={6} className="ad-empty-row">Memuat data dari server...</td></tr>
                : error
                ? <tr><td colSpan={6} className="ad-empty-row"><i className="bi bi-wifi-off me-2"></i>{error}</td></tr>
                : filtered.length === 0
                ? <tr><td colSpan={6} className="ad-empty-row"><i className="bi bi-inbox me-2"></i>Tidak ada data</td></tr>
                : filtered.map(it => (
                  <tr key={it.id}>
                    <td><span className="ad-td-bold">{it.title}</span></td>
                    <td><span className="ad-badge" style={{ background: kc(it.category).bg, color: kc(it.category).color }}>{it.categoryLabel || it.category}</span></td>
                    <td className="ad-td-muted">{it.author}</td>
                    <td className="ad-td-muted">{it.date}</td>
                    <td><span className={`ad-badge ${it.status === 'published' ? 'green' : 'orange'}`}>{it.status === 'published' ? 'Tayang' : 'Draft'}</span></td>
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
        <AdminModal title={modal.mode === 'add' ? 'Tambah Berita' : 'Edit Berita'} icon="bi-newspaper" onClose={() => setModal(null)} wide>
          <form onSubmit={handleSave}>
            <div className="ad-form-body">
              <div className="ad-form-group full">
                <label className="ad-form-label">Judul <span className="text-danger">*</span></label>
                <input required className="ad-form-input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div className="ad-form-row">
                <div className="ad-form-group">
                  <label className="ad-form-label">Kategori</label>
                  <select className="ad-form-input ad-form-select" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    {BERITA_KATEGORI.map(k => <option key={k} value={k}>{LABEL_UMUM[k]}</option>)}
                  </select>
                </div>
                <div className="ad-form-group">
                  <label className="ad-form-label">Penulis</label>
                  <input className="ad-form-input" value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} />
                </div>
              </div>
              <div className="ad-form-row">
                <div className="ad-form-group">
                  <label className="ad-form-label">Tanggal (mis. 1 Juni 2026)</label>
                  <input className="ad-form-input" placeholder="1 Juni 2026" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
                </div>
                <div className="ad-form-group">
                  <label className="ad-form-label">Waktu Baca</label>
                  <input className="ad-form-input" placeholder="3 menit" value={form.readTime} onChange={e => setForm(f => ({ ...f, readTime: e.target.value }))} />
                </div>
              </div>
              <div className="ad-form-group full">
                <label className="ad-form-label">URL Gambar Utama</label>
                <input className="ad-form-input" value={form.img} onChange={e => setForm(f => ({ ...f, img: e.target.value }))} />
              </div>
              {form.img && <div className="ad-galeri-preview mb-2"><img src={form.img} alt="preview" onError={e => { e.target.src = DEFAULT_IMG }} /></div>}
              <div className="ad-form-group full">
                <label className="ad-form-label">Ringkasan / Excerpt</label>
                <textarea rows={2} className="ad-form-input ad-form-textarea" value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} />
              </div>
              <div className="ad-form-group full">
                <label className="ad-form-label">Isi Artikel <span className="text-muted fw-normal">(pisahkan antar paragraf dengan baris kosong)</span></label>
                <textarea rows={7} className="ad-form-input ad-form-textarea" value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} />
              </div>
              <div className="ad-form-row">
                <div className="ad-form-group">
                  <label className="ad-form-label">Tags <span className="text-muted fw-normal">(pisahkan dengan koma)</span></label>
                  <input className="ad-form-input" placeholder="bantuan, banjir, semarang" value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} />
                </div>
                <div className="ad-form-group">
                  <label className="ad-form-label">Status</label>
                  <select className="ad-form-input ad-form-select" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                    <option value="published">Tayang</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
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
          label={`berita "${deleteTarget.title}"`}
          onConfirm={async () => { try { await remove(deleteTarget.id) } catch { /* abaikan */ } setDeleteTarget(null) }}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  )
}

export default SectionBerita
