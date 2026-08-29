import { useState, useEffect, useCallback } from 'react'
import AdminModal from './shared/AdminModal'
import ConfirmDelete from './shared/ConfirmDelete'
import { useAuth } from '../../context/AuthContext'
import { penggunaService } from '../../services/resources'

const roleMap = {
  superadmin: { label: 'Super Admin', cls: 'gold', icon: 'bi-shield-fill-check' },
  admin:      { label: 'Admin',       cls: 'blue', icon: 'bi-person-fill-gear' },
  user:       { label: 'Pengguna',    cls: 'gray', icon: 'bi-person-fill' },
}
const emptyAdd = { nama: '', email: '', username: '', password: '', role: 'user' }

function SectionPengguna() {
  const { user } = useAuth()

  const [items,   setItems]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')
  const [search,       setSearch]       = useState('')
  const [filterRole,   setFilterRole]   = useState('')
  const [modal,        setModal]        = useState(null)
  const [form,         setForm]         = useState(emptyAdd)
  const [saving,       setSaving]       = useState(false)
  const [formErr,      setFormErr]      = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [resetTarget,  setResetTarget]  = useState(null)
  const [resetResult,  setResetResult]  = useState(null)

  const load = useCallback(async () => {
    setLoading(true); setError('')
    try { setItems(await penggunaService.list()) }
    catch (e) { setError(e.message || 'Gagal memuat pengguna.'); setItems([]) }
    finally { setLoading(false) }
  }, [])
  useEffect(() => { load() }, [load])

  const filtered = items.filter(it =>
    ((it.nama || '').toLowerCase().includes(search.toLowerCase()) ||
     (it.email || '').toLowerCase().includes(search.toLowerCase()) ||
     (it.username || '').toLowerCase().includes(search.toLowerCase())) &&
    (!filterRole || it.role === filterRole)
  )

  const openAdd  = () => { setForm(emptyAdd); setFormErr(''); setModal({ mode: 'add' }) }
  const openEdit = it => { setForm({ nama: it.nama, email: it.email, username: it.username, role: it.role, password: '' }); setFormErr(''); setModal({ mode: 'edit', item: it }) }

  const handleSave = async e => {
    e.preventDefault()
    setSaving(true); setFormErr('')
    try {
      if (modal.mode === 'add') {
        await penggunaService.create(form)
      } else {
        await penggunaService.update(modal.item.id, form)
      }
      setModal(null)
      await load()
    } catch (err) {
      setFormErr(err.message || 'Gagal menyimpan.')
    } finally {
      setSaving(false)
    }
  }

  const changeRole = async (it, role) => {
    try {
      await penggunaService.update(it.id, { role })
      await load()
    } catch (e) {
      setError(e.message || 'Gagal mengubah role.')
    }
  }

  const doReset = async () => {
    const u = resetTarget
    try {
      const res = await penggunaService.resetPassword(u.id)
      setResetResult({ nama: u.nama, password: res?.password_sementara || 'karinakas123' })
    } catch (e) {
      setError(e.message || 'Gagal reset password.')
    } finally {
      setResetTarget(null)
    }
  }

  return (
    <div>
      <div className="ad-section-head">
        <div>
          <h2 className="ad-section-title">
            Manajemen Pengguna
            <span className="ad-super-badge-sm ms-2">Super Admin</span>
          </h2>
          <p className="ad-section-sub">Kelola akun pengguna dan atur hak akses (role)</p>
        </div>
        <button className="ad-add-btn" onClick={openAdd}><i className="bi bi-plus-lg me-1"></i>Tambah Pengguna</button>
      </div>

      <div className="ad-filter-bar">
        <div className="ad-sf-wrap">
          <i className="bi bi-search ad-sf-icon"></i>
          <input className="ad-sf-input" placeholder="Cari nama / email / username..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="ad-filter-select" value={filterRole} onChange={e => setFilterRole(e.target.value)}>
          <option value="">Semua Role</option>
          {Object.entries(roleMap).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
        <span className="ad-filter-count">{filtered.length} data</span>
      </div>

      <div className="ad-card">
        <div className="ad-table-wrap">
          <table className="ad-table">
            <thead><tr><th>No</th><th>Nama</th><th>Email</th><th>Username</th><th>Atur Role</th><th>Aksi</th></tr></thead>
            <tbody>
              {loading
                ? <tr><td colSpan={6} className="ad-empty-row">Memuat data dari server...</td></tr>
                : error
                ? <tr><td colSpan={6} className="ad-empty-row"><i className="bi bi-wifi-off me-2"></i>{error}</td></tr>
                : filtered.length === 0
                ? <tr><td colSpan={6} className="ad-empty-row"><i className="bi bi-inbox me-2"></i>Tidak ada data</td></tr>
                : filtered.map((it, i) => (
                  <tr key={it.id}>
                    <td className="ad-td-muted">{i + 1}</td>
                    <td>
                      <div className="ad-donor">
                        <div className={`ad-donor-av role-${it.role}`}>{(it.nama || '?')[0]}</div>
                        <div className="ad-donor-name">{it.nama}{it.id === user?.id && <span className="ad-badge gray ms-1" style={{ fontSize: '0.65rem' }}>Anda</span>}</div>
                      </div>
                    </td>
                    <td className="ad-td-muted">{it.email}</td>
                    <td className="ad-td-muted">{it.username}</td>
                    <td>
                      <select
                        className={`ad-status-select ${roleMap[it.role]?.cls || 'gray'}`}
                        value={it.role}
                        disabled={it.id === user?.id}
                        onChange={e => changeRole(it, e.target.value)}
                      >
                        {Object.entries(roleMap).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                      </select>
                    </td>
                    <td><div className="ad-actions">
                      <button className="ad-action-btn" style={{ color: '#d97000' }} onClick={() => setResetTarget(it)} title="Reset Password"><i className="bi bi-key-fill"></i></button>
                      <button className="ad-action-btn edit" onClick={() => openEdit(it)} title="Edit"><i className="bi bi-pencil-fill"></i></button>
                      <button className="ad-action-btn delete" onClick={() => setDeleteTarget(it)} title="Hapus" disabled={it.id === user?.id}><i className="bi bi-trash-fill"></i></button>
                    </div></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit */}
      {modal && (
        <AdminModal title={modal.mode === 'add' ? 'Tambah Pengguna' : 'Edit Pengguna'} icon="bi-person-fill-gear" onClose={() => setModal(null)}>
          <form onSubmit={handleSave}>
            <div className="ad-form-body">
              <div className="ad-form-group full">
                <label className="ad-form-label">Nama Lengkap <span className="text-danger">*</span></label>
                <input required className="ad-form-input" value={form.nama} onChange={e => setForm(f => ({ ...f, nama: e.target.value }))} />
              </div>
              <div className="ad-form-row">
                <div className="ad-form-group">
                  <label className="ad-form-label">Email <span className="text-danger">*</span></label>
                  <input required type="email" className="ad-form-input" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>
                <div className="ad-form-group">
                  <label className="ad-form-label">Username <span className="text-danger">*</span></label>
                  <input required className="ad-form-input" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} />
                </div>
              </div>
              <div className="ad-form-row">
                <div className="ad-form-group">
                  <label className="ad-form-label">Role / Hak Akses</label>
                  <select className="ad-form-input ad-form-select" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
                    {Object.entries(roleMap).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                  </select>
                </div>
                <div className="ad-form-group">
                  <label className="ad-form-label">
                    Kata Sandi {modal.mode === 'add' ? <span className="text-danger">*</span> : <span className="text-muted fw-normal">(kosongkan jika tetap)</span>}
                  </label>
                  <input type="text" className="ad-form-input" minLength={8}
                    required={modal.mode === 'add'}
                    placeholder={modal.mode === 'add' ? 'Min. 8 karakter' : 'Biarkan kosong'}
                    value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
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
          label={`pengguna "${deleteTarget.nama}"`}
          onConfirm={async () => { try { await penggunaService.remove(deleteTarget.id); await load() } catch (e) { setError(e.message || 'Gagal menghapus.') } setDeleteTarget(null) }}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* Konfirmasi reset password */}
      {resetTarget && (
        <div className="ad-modal-overlay" onClick={() => setResetTarget(null)}>
          <div className="ad-confirm" onClick={e => e.stopPropagation()}>
            <div className="ad-confirm-icon" style={{ background: '#FFF3E6', color: '#d97000' }}><i className="bi bi-key-fill"></i></div>
            <h3 className="ad-confirm-title">Reset Kata Sandi?</h3>
            <p className="ad-confirm-text">
              Kata sandi <strong>{resetTarget.nama}</strong> akan direset ke kata sandi sementara
              <strong> karinakas123</strong>. Pengguna diminta menggantinya saat login berikutnya.
            </p>
            <div className="ad-confirm-actions">
              <button className="btn btn-outline-secondary rounded-pill px-4" onClick={() => setResetTarget(null)}>Batal</button>
              <button className="btn btn-warning rounded-pill px-4 text-white" onClick={doReset}><i className="bi bi-key-fill me-1"></i>Reset</button>
            </div>
          </div>
        </div>
      )}

      {/* Hasil reset password */}
      {resetResult && (
        <div className="ad-modal-overlay" onClick={() => setResetResult(null)}>
          <div className="ad-confirm" onClick={e => e.stopPropagation()}>
            <div className="ad-confirm-icon" style={{ background: '#E8F5E9', color: '#1a6b3a' }}><i className="bi bi-check-circle-fill"></i></div>
            <h3 className="ad-confirm-title">Kata Sandi Direset</h3>
            <p className="ad-confirm-text">
              Sandi sementara untuk <strong>{resetResult.nama}</strong>:
            </p>
            <p style={{ fontFamily: 'monospace', fontSize: '1.2rem', fontWeight: 700, color: '#C0392B', textAlign: 'center', letterSpacing: 1 }}>{resetResult.password}</p>
            <div className="ad-confirm-actions">
              <button className="btn btn-danger rounded-pill px-4" onClick={() => setResetResult(null)}>Selesai</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SectionPengguna
