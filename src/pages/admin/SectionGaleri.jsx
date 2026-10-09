import { useState } from 'react'
import AdminModal from './shared/AdminModal'
import ConfirmDelete from './shared/ConfirmDelete'
import usePaging from './shared/usePaging'
import { AdminSort, AdminPager } from './shared/AdminPager'
import useResource from '../../hooks/useResource'
import { galeriService } from '../../services/resources'
import { fmtTanggal } from '../../data/store'

const empty = { judul: '', namaFoto: '', kategori: 'sosial', tanggal: '', img: '' }
const stripExt = (name) => (name || '').replace(/\.[^.]+$/, '')
const PLACEHOLDER = 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=260&fit=crop'

function SectionGaleri() {
  const { items, loading, error, update, remove, reload } = useResource(galeriService)
  const [view,         setView]         = useState('albums') // 'albums' | 'detail'
  const [activeAlbum,  setActiveAlbum]  = useState(null)
  const [search,       setSearch]       = useState('')
  const [modal,        setModal]        = useState(null)
  const [form,         setForm]         = useState(empty)
  const [files,        setFiles]        = useState([])
  const [fileNames,    setFileNames]    = useState([]) // nama tiap foto saat bulk upload
  const [saving,       setSaving]       = useState(false)
  const [progress,     setProgress]     = useState(null) // {done,total} saat bulk upload
  const [formErr,      setFormErr]      = useState('')
  const [deletePhoto,  setDeletePhoto]  = useState(null)
  const [deleteAlbum,  setDeleteAlbum]  = useState(null)

  // Kelompokkan foto per nama kegiatan (album)
  const albumMap = items.reduce((acc, it) => {
    const key = it.judul || '(Tanpa nama)'
    ;(acc[key] = acc[key] || []).push(it)
    return acc
  }, {})
  const albums = Object.entries(albumMap).map(([name, photos]) => ({
    name,
    photos,
    cover: photos[0]?.img,
    count: photos.length,
    latest: photos.reduce((m, p) => (p.tanggal && (!m || p.tanggal > m) ? p.tanggal : m), ''),
  }))
  const albumNames = albums.map(a => a.name)

  const filteredAlbums = albums.filter(a => a.name.toLowerCase().includes(search.toLowerCase()))
  const currentPhotos  = activeAlbum ? (albumMap[activeAlbum] || []) : []

  // Paging terpisah untuk daftar album dan foto di dalam album (12 kartu per halaman)
  const pgAlbum = usePaging(filteredAlbums, a => a.latest, search, 12)
  const pgFoto  = usePaging(currentPhotos, p => p.tanggal, activeAlbum || '', 12)

  // ── Navigasi ──
  const openAlbum   = name => { setActiveAlbum(name); setView('detail') }
  const backToList  = () => { setView('albums'); setActiveAlbum(null) }

  // ── Modal ──
  const openNewAlbum   = () => { setForm(empty); setFiles([]); setFileNames([]); setFormErr(''); setModal({ mode: 'new-album' }) }
  const openAddPhotos  = name => { setForm({ ...empty, judul: name }); setFiles([]); setFileNames([]); setFormErr(''); setModal({ mode: 'add-photos' }) }
  const openEditPhoto  = it => { setForm({ ...it }); setFiles([]); setFileNames([]); setFormErr(''); setModal({ mode: 'edit-photo', item: it }) }

  // Pilih file → simpan file + isi nama default dari nama file
  const handleFilesChange = (e) => {
    const list = Array.from(e.target.files || [])
    setFiles(list)
    setFileNames(list.map(f => stripExt(f.name)))
  }

  const handleSave = async e => {
    e.preventDefault()
    setSaving(true)
    setFormErr('')
    try {
      if (modal.mode === 'edit-photo') {
        if (files.length > 0) await update(modal.item.id, { ...form, file: files[0] })
        else                  await update(modal.item.id, { ...form, img: form.img || PLACEHOLDER })
      } else {
        // new-album / add-photos → upload banyak foto ke satu judul
        if (files.length === 0 && !form.img) {
          setFormErr('Pilih minimal satu foto (atau isi URL gambar).')
          setSaving(false)
          return
        }
        if (files.length > 0) {
          setProgress({ done: 0, total: files.length })
          await galeriService.bulkUpload({
            judul: form.judul, kategori: form.kategori, tanggal: form.tanggal, files, names: fileNames,
            onProgress: (done, total) => setProgress({ done, total }),
          })
        } else {
          await galeriService.create({ ...form, img: form.img || PLACEHOLDER })
        }
        await reload()
        if (modal.mode === 'new-album') openAlbum(form.judul) // langsung buka album baru
      }
      setModal(null)
    } catch (err) {
      setFormErr(err.message || 'Gagal menyimpan ke server.')
    } finally {
      setSaving(false)
      setProgress(null)
    }
  }

  // Hapus seluruh album (semua foto dengan judul tsb)
  const confirmDeleteAlbum = async () => {
    try {
      const target = albumMap[deleteAlbum] || []
      await Promise.all(target.map(p => galeriService.remove(p.id)))
      await reload()
    } catch { /* abaikan */ }
    setDeleteAlbum(null)
    backToList()
  }

  const editItemJudul = modal?.mode === 'edit-photo'

  return (
    <div>
      {/* ── Header ── */}
      <div className="ad-section-head">
        {view === 'albums' ? (
          <>
            <div>
              <h2 className="ad-section-title">Galeri Kegiatan</h2>
              <p className="ad-section-sub">Kelola album dokumentasi per kegiatan Karinakas</p>
            </div>
            <button className="ad-add-btn" onClick={openNewAlbum}><i className="bi bi-folder-plus me-1"></i>Tambah Kegiatan</button>
          </>
        ) : (
          <>
            <div>
              <button className="btn btn-link p-0 mb-1" style={{ textDecoration: 'none' }} onClick={backToList}>
                <i className="bi bi-arrow-left me-1"></i>Kembali ke daftar album
              </button>
              <h2 className="ad-section-title">{activeAlbum}</h2>
              <p className="ad-section-sub">{currentPhotos.length} foto dalam album ini</p>
            </div>
            <button className="ad-add-btn" onClick={() => openAddPhotos(activeAlbum)}><i className="bi bi-plus-lg me-1"></i>Tambah Foto</button>
          </>
        )}
      </div>

      {/* ── Search (hanya di daftar album) ── */}
      {view === 'albums' && (
        <div className="ad-filter-bar">
          <div className="ad-sf-wrap">
            <i className="bi bi-search ad-sf-icon"></i>
            <input className="ad-sf-input" placeholder="Cari nama kegiatan..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <AdminSort pg={pgAlbum} />
          <span className="ad-filter-count">{filteredAlbums.length} album</span>
        </div>
      )}

      {/* ── Urutan foto (hanya di dalam album) ── */}
      {view === 'detail' && !loading && !error && currentPhotos.length > 0 && (
        <div className="ad-filter-bar">
          <AdminSort pg={pgFoto} />
          <span className="ad-filter-count">{currentPhotos.length} foto</span>
        </div>
      )}

      {/* ── Konten ── */}
      {loading ? (
        <div className="ad-card"><div className="ad-empty-row" style={{ padding: '3rem' }}>Memuat data dari server...</div></div>
      ) : error ? (
        <div className="ad-card"><div className="ad-empty-row" style={{ padding: '3rem' }}><i className="bi bi-wifi-off me-2"></i>{error}</div></div>
      ) : view === 'albums' ? (
        filteredAlbums.length === 0 ? (
          <div className="ad-card"><div className="ad-empty-row" style={{ padding: '3rem' }}><i className="bi bi-collection me-2"></i>Belum ada album. Klik "Tambah Kegiatan".</div></div>
        ) : (
          <>
          <div className="ad-galeri-grid">
            {pgAlbum.pageItems.map(al => (
              <div key={al.name} className="ad-galeri-card" style={{ cursor: 'pointer' }} onClick={() => openAlbum(al.name)}>
                <div className="ad-galeri-thumb">
                  <img src={al.cover || PLACEHOLDER} alt={al.name} onError={e => { e.target.src = PLACEHOLDER }} />
                  <div className="ad-galeri-overlay">
                    <button className="ad-galeri-ov-btn" onClick={e => { e.stopPropagation(); openAlbum(al.name) }} title="Buka album"><i className="bi bi-folder2-open"></i></button>
                    <button className="ad-galeri-ov-btn delete" onClick={e => { e.stopPropagation(); setDeleteAlbum(al.name) }} title="Hapus album"><i className="bi bi-trash-fill"></i></button>
                  </div>
                </div>
                <div className="ad-galeri-body">
                  <p className="ad-galeri-title">{al.name}</p>
                  <p className="ad-galeri-date"><i className="bi bi-images me-1"></i>{al.count} foto</p>
                </div>
              </div>
            ))}
          </div>
          <div className="ad-card mt-3"><AdminPager pg={pgAlbum} satuan="album" /></div>
          </>
        )
      ) : (
        /* ── Detail album: foto-foto di dalamnya ── */
        currentPhotos.length === 0 ? (
          <div className="ad-card"><div className="ad-empty-row" style={{ padding: '3rem' }}><i className="bi bi-images me-2"></i>Belum ada foto. Klik "Tambah Foto".</div></div>
        ) : (
          <>
          <div className="ad-galeri-grid">
            {pgFoto.pageItems.map(it => (
              <div key={it.id} className="ad-galeri-card">
                <div className="ad-galeri-thumb">
                  <img src={it.img || PLACEHOLDER} alt={it.judul} onError={e => { e.target.src = PLACEHOLDER }} />
                  <div className="ad-galeri-overlay">
                    <button className="ad-galeri-ov-btn" onClick={() => openEditPhoto(it)} title="Edit / ganti foto"><i className="bi bi-pencil-fill"></i></button>
                    <button className="ad-galeri-ov-btn delete" onClick={() => setDeletePhoto(it)} title="Hapus foto"><i className="bi bi-trash-fill"></i></button>
                  </div>
                </div>
                <div className="ad-galeri-body">
                  <p className="ad-galeri-title">{it.namaFoto || <span className="text-muted fw-normal">Tanpa nama</span>}</p>
                  <p className="ad-galeri-date"><i className="bi bi-calendar3 me-1"></i>{it.tanggal ? fmtTanggal(it.tanggal) : '—'}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="ad-card mt-3"><AdminPager pg={pgFoto} satuan="foto" /></div>
          </>
        )
      )}

      {/* ── Modal tambah/edit ── */}
      {modal && (
        <AdminModal
          title={modal.mode === 'new-album' ? 'Tambah Kegiatan Baru' : modal.mode === 'add-photos' ? `Tambah Foto — ${form.judul}` : 'Edit Foto'}
          icon="bi-image-fill"
          onClose={() => setModal(null)}
        >
          <form onSubmit={handleSave}>
            <div className="ad-form-body">
              {/* Nama kegiatan: bebas diisi di new-album & edit; dikunci di add-photos */}
              <div className="ad-form-group full">
                <label className="ad-form-label">Nama Kegiatan / Album <span className="text-danger">*</span></label>
                {modal.mode === 'add-photos' ? (
                  <input className="ad-form-input" value={form.judul} readOnly />
                ) : (
                  <>
                    <input required list="galeri-album-list" className="ad-form-input" placeholder="Ketik nama kegiatan..." value={form.judul} onChange={e => setForm(f => ({ ...f, judul: e.target.value }))} />
                    <datalist id="galeri-album-list">
                      {albumNames.map(a => <option key={a} value={a} />)}
                    </datalist>
                  </>
                )}
              </div>

              {/* Nama foto — untuk edit 1 foto, atau saat menambah via URL.
                  Saat bulk upload (banyak file dipilih), nama diisi per-foto di bawah. */}
              {(editItemJudul || files.length === 0) && (
                <div className="ad-form-group full">
                  <label className="ad-form-label">
                    Nama Foto {editItemJudul ? '' : <span className="text-muted fw-normal">(opsional — untuk foto via URL)</span>}
                  </label>
                  <input
                    className="ad-form-input"
                    placeholder="mis. Pemeriksaan tekanan darah"
                    value={form.namaFoto || ''}
                    onChange={e => setForm(f => ({ ...f, namaFoto: e.target.value }))}
                  />
                </div>
              )}

              <div className="ad-form-group full">
                <label className="ad-form-label">
                  {editItemJudul ? 'Ganti Foto (opsional)' : 'Upload Foto (bisa pilih banyak sekaligus)'}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple={!editItemJudul}
                  className="ad-form-input"
                  onChange={handleFilesChange}
                />
                {files.length > 0 && (
                  <p className="ad-form-hint"><i className="bi bi-check-circle me-1"></i>{files.length} file dipilih{!editItemJudul ? ' — beri nama tiap foto di bawah' : ''}</p>
                )}
              </div>

              {files.length === 0 && (
                <div className="ad-form-group full">
                  <label className="ad-form-label">atau tempel URL Gambar</label>
                  <input className="ad-form-input" placeholder="https://... (kosongkan untuk placeholder)" value={form.img} onChange={e => setForm(f => ({ ...f, img: e.target.value }))} />
                </div>
              )}

              <div className="ad-form-group full">
                <label className="ad-form-label">Tanggal</label>
                <input type="date" className="ad-form-input" value={form.tanggal || ''} onChange={e => setForm(f => ({ ...f, tanggal: e.target.value }))} />
              </div>

              {/* Bulk: preview + nama tiap foto */}
              {files.length > 0 && !editItemJudul ? (
                <div className="ad-form-group full">
                  <label className="ad-form-label">Nama Tiap Foto <span className="text-muted fw-normal">(kosongkan = pakai nama file)</span></label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 320, overflowY: 'auto' }}>
                    {files.map((f, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <img src={URL.createObjectURL(f)} alt={`foto ${i + 1}`} style={{ width: 64, height: 48, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />
                        <input
                          className="ad-form-input"
                          style={{ flex: 1 }}
                          placeholder={`Nama foto ${i + 1}`}
                          value={fileNames[i] ?? ''}
                          onChange={e => setFileNames(prev => { const n = [...prev]; n[i] = e.target.value; return n })}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : files.length > 0 && editItemJudul ? (
                <div className="ad-galeri-preview">
                  <img src={URL.createObjectURL(files[0])} alt="preview" style={{ width: 120, height: 90, objectFit: 'cover', borderRadius: 8 }} />
                </div>
              ) : form.img && (
                <div className="ad-galeri-preview">
                  <img src={form.img} alt="preview" onError={e => { e.target.src = PLACEHOLDER }} />
                </div>
              )}
            </div>
            {formErr && <div className="lg-error" style={{ margin: '0 1.5rem' }}><i className="bi bi-exclamation-circle-fill me-2"></i>{formErr}</div>}
            <div className="ad-modal-footer">
              <button type="button" className="btn btn-outline-secondary rounded-pill px-4" onClick={() => setModal(null)}>Batal</button>
              <button type="submit" className="btn btn-danger rounded-pill px-4" disabled={saving}>
                {saving
                  ? <><span className="lg-spinner" /> {progress ? `Mengupload ${progress.done}/${progress.total} foto...` : 'Menyimpan...'}</>
                  : <><i className="bi bi-check2 me-1"></i>{editItemJudul ? 'Simpan' : (files.length > 1 ? `Upload ${files.length} Foto` : 'Simpan')}</>}
              </button>
            </div>
          </form>
        </AdminModal>
      )}

      {/* Hapus 1 foto */}
      {deletePhoto && (
        <ConfirmDelete
          label={`foto ini dari album "${deletePhoto.judul}"`}
          onConfirm={async () => { try { await remove(deletePhoto.id) } catch { /* abaikan */ } setDeletePhoto(null) }}
          onCancel={() => setDeletePhoto(null)}
        />
      )}

      {/* Hapus 1 album (semua fotonya) */}
      {deleteAlbum && (
        <ConfirmDelete
          label={`album "${deleteAlbum}" beserta ${(albumMap[deleteAlbum] || []).length} foto di dalamnya`}
          onConfirm={confirmDeleteAlbum}
          onCancel={() => setDeleteAlbum(null)}
        />
      )}
    </div>
  )
}

export default SectionGaleri
