// ════════════════════════════════════════════════════════════
//  Service per-resource: memetakan field backend (snake_case ID)
//  ↔ field frontend, + fungsi CRUD ke API.
// ════════════════════════════════════════════════════════════
import { api } from './api'
import { LABEL_UMUM, fmtTanggal } from '../data/store'

// Backend index mengembalikan paginator: { data: { data: [...] } }.
// Endpoint lain bisa { data: [...] }. Helper ini menyamakan.
const unwrapList = (res) => (Array.isArray(res?.data) ? res.data : (res?.data?.data ?? []))
const unwrapOne  = (res) => res?.data ?? res

// Ambil SEMUA halaman dari endpoint berpaginasi. Tanpa ini tabel & ekspor rekap
// admin diam-diam hanya berisi halaman pertama (dulu donasi terpotong di 20 baris).
async function ambilSemuaHalaman(path, params = {}, perPage = 100) {
  let page = 1
  let all = []
  for (;;) {
    const qs = new URLSearchParams({ per_page: perPage, page, ...params }).toString()
    const pg = (await api.get(`${path}?${qs}`))?.data
    const rows = Array.isArray(pg?.data) ? pg.data : (Array.isArray(pg) ? pg : [])
    all = all.concat(rows)
    if (page >= (Number(pg?.last_page) || 1) || rows.length === 0) break
    page++
  }
  return all
}

// Bangun URL file dari path storage (mis. bukti transfer)
const STORAGE_BASE = import.meta.env.VITE_STORAGE_URL || (import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/v1').replace(/\/api\/v1\/?$/, '/storage')
const fileUrl = (p) => (p ? (p.startsWith('http') ? p : `${STORAGE_BASE}/${p}`) : null)

// ── KEGIATAN ────────────────────────────────────────────────
const kegiatanFE = (k) => ({
  id: k.id,
  judul: k.judul,
  deskripsi: k.deskripsi || '',
  lokasi: k.lokasi || '',
  kategori: k.kategori || 'sosial',
  img: k.gambar_url || '',
  tanggal: k.tanggal_mulai,
  tanggalSelesai: k.tanggal_selesai,
  status: k.status,
  butuhRelawan: !!k.butuh_relawan,
  butuhDonasi: !!k.butuh_donasi,
  kuotaRelawan: Number(k.kuota_relawan) || 0,
  terisi: Number(k.jumlah_relawan_terdaftar) || 0,
  jenisRelawan: Array.isArray(k.jenis_relawan) ? k.jenis_relawan : [],
  bidangMinat: Array.isArray(k.bidang_minat) ? k.bidang_minat : [],
})
const kegiatanBE = (f) => ({
  judul: f.judul,
  deskripsi: f.deskripsi || '-',
  lokasi: f.lokasi || '-',
  kategori: f.kategori,
  gambar_url: f.img || null,
  tanggal_mulai: f.tanggal,
  tanggal_selesai: f.tanggalSelesai || f.tanggal,
  status: f.status,
  butuh_relawan: !!f.butuhRelawan,
  butuh_donasi: !!f.butuhDonasi,
  kuota_relawan: Number(f.kuotaRelawan) || 0,
  jenis_relawan: Array.isArray(f.jenisRelawan) ? f.jenisRelawan : [],
  bidang_minat: Array.isArray(f.bidangMinat) ? f.bidangMinat : [],
})

export const kegiatanService = {
  async list(params = {}) {
    return (await ambilSemuaHalaman('/kegiatan', params)).map(kegiatanFE)
  },
  async get(id)        { return kegiatanFE(unwrapOne(await api.get(`/kegiatan/${id}`))) },
  async create(data)   { return api.post('/admin/kegiatan', kegiatanBE(data)) },
  async update(id, d)  { return api.put(`/admin/kegiatan/${id}`, kegiatanBE(d)) },
  async remove(id)     { return api.del(`/admin/kegiatan/${id}`) },
}

// ── BERITA / KAMPANYE ───────────────────────────────────────
const beritaFE = (b) => ({
  id: b.id,
  title: b.judul,
  category: b.kategori || 'sosial',
  categoryLabel: LABEL_UMUM[b.kategori] || b.kategori,
  img: b.gambar_url || '',
  excerpt: b.ringkasan || '',
  author: b.penulis || '',
  authorAvatar: b.penulis_avatar || 'https://randomuser.me/api/portraits/lego/5.jpg',
  date: b.tanggal_publish ? fmtTanggal(b.tanggal_publish) : '',
  publishedAt: b.tanggal_publish || null,
  time: '',
  readTime: b.waktu_baca || '3 menit',
  tags: Array.isArray(b.tags) ? b.tags : [],
  content: typeof b.konten === 'string'
    ? b.konten.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean)
    : (Array.isArray(b.konten) ? b.konten : []),
  status: b.status || 'published',
})
const beritaBE = (f) => ({
  judul: f.title,
  konten: Array.isArray(f.content) ? f.content.join('\n\n') : (f.content || ''),
  ringkasan: f.excerpt || null,
  gambar_url: f.img || null,
  penulis: f.author || null,
  penulis_avatar: f.authorAvatar || null,
  tags: Array.isArray(f.tags) ? f.tags : [],
  waktu_baca: f.readTime || null,
  kategori: f.category,
  status: f.status || 'published',
})

export const beritaService = {
  async list(params = {}) {
    return (await ambilSemuaHalaman('/kampanye', params)).map(beritaFE)
  },
  async get(id)        { return beritaFE(unwrapOne(await api.get(`/kampanye/${id}`))) },
  async create(data)   { return api.post('/admin/kampanye', beritaBE(data)) },
  async update(id, d)  { return api.put(`/admin/kampanye/${id}`, beritaBE(d)) },
  async remove(id)     { return api.del(`/admin/kampanye/${id}`) },
}

// ── GALERI ──────────────────────────────────────────────────
const galeriFE = (g) => ({
  id: g.id,
  judul: g.judul,                       // nama kegiatan / album
  namaFoto: g.nama_foto || '',          // nama tiap foto
  kategori: g.kategori || 'sosial',
  tanggal: g.tanggal,
  img: fileUrl(g.gambar_url) || '',
  deskripsi: g.deskripsi || '',
})
const galeriBE = (f) => ({
  judul: f.judul,
  nama_foto: f.namaFoto || null,
  kategori: f.kategori,
  tanggal: f.tanggal || null,
  gambar_url: f.img,
  deskripsi: f.deskripsi || null,
  tipe: 'foto',
})

export const galeriService = {
  // Ambil SEMUA foto (ikuti pagination) — agar album lama tak "hilang"
  // saat satu album punya ratusan foto.
  async list(params = {}) {
    const perPage = 300
    let page = 1
    let all = []
    for (;;) {
      const qs = new URLSearchParams({ per_page: perPage, page, ...params }).toString()
      const res = await api.get(`/galeri?${qs}`)
      const pg = res?.data
      const rows = Array.isArray(pg?.data) ? pg.data : (Array.isArray(pg) ? pg : [])
      all = all.concat(rows)
      const lastPage = Number(pg?.last_page) || 1
      if (page >= lastPage || rows.length === 0) break
      page++
    }
    return all.map(galeriFE)
  },
  async latest() {
    return unwrapList(await api.get('/galeri/latest/list')).map(galeriFE)
  },
  async create(data)   { return api.post('/admin/galeri', galeriBE(data)) },
  async update(id, d)  {
    // Jika ada file baru, kirim multipart (spoof PUT), selain itu JSON biasa
    if (d.file instanceof File) {
      const fd = new FormData()
      fd.append('_method', 'PUT')
      fd.append('judul', d.judul || '')
      if (d.namaFoto !== undefined) fd.append('nama_foto', d.namaFoto || '')
      if (d.kategori) fd.append('kategori', d.kategori)
      if (d.tanggal)  fd.append('tanggal', d.tanggal)
      fd.append('gambar', d.file)
      return api.upload(`/admin/galeri/${id}`, fd)
    }
    return api.put(`/admin/galeri/${id}`, galeriBE(d))
  },
  async remove(id)     { return api.del(`/admin/galeri/${id}`) },
  // Upload banyak foto untuk satu judul. Otomatis dipecah per batch agar tidak
  // terkena limit PHP `max_file_uploads` (default 20) — berapa pun jumlah fotonya.
  // onProgress(done, total) dipanggil tiap batch selesai.
  async bulkUpload({ judul, kategori, tanggal, deskripsi, files, names, onProgress, batchSize = 20 }) {
    const fileArr = Array.from(files)
    const nameArr = names || []
    const total = fileArr.length
    let done = 0
    for (let start = 0; start < total; start += batchSize) {
      const chunk      = fileArr.slice(start, start + batchSize)
      const chunkNames = nameArr.slice(start, start + batchSize)
      const fd = new FormData()
      fd.append('judul', judul)
      if (kategori)  fd.append('kategori', kategori)
      if (tanggal)   fd.append('tanggal', tanggal)
      if (deskripsi) fd.append('deskripsi', deskripsi)
      chunk.forEach((f, i) => {
        fd.append('gambar[]', f)
        fd.append('nama_foto[]', chunkNames[i] != null ? chunkNames[i] : '')
      })
      await api.upload('/admin/galeri/upload', fd)
      done += chunk.length
      if (onProgress) onProgress(done, total)
    }
    return { success: true, message: `${done} foto berhasil diupload` }
  },
}

// ── DONASI ──────────────────────────────────────────────────
const donasiBE = (f) => ({
  kegiatan_id: f.kegiatanId || null,   // kegiatan mana
  jumlah: Number(f.nominal) || 0,
  metode_pembayaran: f.metode || 'QRIS',
  tujuan_donasi: f.tujuan,             // buat apa (tujuan)
  keterangan: f.pesan || null,
  anonim: !!f.anonim,
})
const donasiFE = (d) => ({
  id: d.id,
  donatur: d.anonim ? 'Anonim' : (d.user?.nama_lengkap || '-'),
  email: d.user?.email || '',
  tujuan: d.tujuan_donasi || '',
  kegiatan: d.kegiatan?.judul || null,
  kegiatanId: d.kegiatan_id || d.kegiatan?.id || null,   // untuk rekap per kegiatan
  nominal: Number(d.jumlah) || 0,
  metode: d.metode_pembayaran || '',
  status: d.status_pembayaran,
  tanggal: d.tanggal_donasi,
  kode: d.kode_transaksi || '',
  rekening: d.rekening_pengirim || '',
  fee: Number(d.biaya_transfer) || 0,
  bukti: fileUrl(d.bukti_transfer),
  pesan: d.keterangan || '',
})

// Edit donasi oleh admin (PUT)
const donasiUpdateBE = (f) => ({
  jumlah: Number(f.nominal) || 0,
  metode_pembayaran: f.metode,
  tujuan_donasi: f.tujuan,
  status_pembayaran: f.status,
  biaya_transfer: Number(f.fee) || 0,
  kode_transaksi: f.kode || null,
  rekening_pengirim: f.rekening || null,
  keterangan: f.pesan || null,
})

// Format tanggal + jam untuk log
const fmtWaktu = (iso) => {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  } catch { return iso }
}

// ── NOTIFIKASI LOG ──────────────────────────────────────────
const notifikasiFE = (n) => ({
  id: n.id,
  tipe: n.tipe || 'email',
  penerima: n.penerima || '-',
  judul: n.judul || '',
  trigger: n.trigger || '',
  status: n.status || 'terkirim',
  tanggal: fmtWaktu(n.created_at),
  createdAt: n.created_at || '',        // bentuk asli untuk pengurutan
})

export const notifikasiService = {
  async listAdmin(params = {}) {
    return (await ambilSemuaHalaman('/admin/notifikasi', params)).map(notifikasiFE)
  },
  async myNotifications() {
    return unwrapList(await api.get('/notifikasi/my-notifications')).map(notifikasiFE)
  },
}

// ── AUDIT LOG ───────────────────────────────────────────────
const auditFE = (a) => ({
  id: a.id,
  user: a.user_nama || 'Sistem',
  aksi: a.aksi || '',
  target: a.target || '',
  tanggal: fmtWaktu(a.created_at),
  createdAt: a.created_at || '',        // bentuk asli untuk pengurutan
})

export const auditService = {
  async list(params = {}) {
    return (await ambilSemuaHalaman('/admin/audit', params)).map(auditFE)
  },
}

// ── DASHBOARD (statistik admin) ─────────────────────────────
export const adminService = {
  async dashboard() {
    const res = await api.get('/admin/dashboard')
    return {
      stats: res?.stats || {},
      grafik: res?.grafik_donasi_per_bulan || [],
    }
  },
}

// ── PENGGUNA / USERS ────────────────────────────────────────
// Role backend: user|admin|super_admin  ↔  frontend: user|admin|superadmin
const roleToFE = (r) => (r === 'super_admin' ? 'superadmin' : r)
const roleToBE = (r) => (r === 'superadmin' ? 'super_admin' : r)
const penggunaFE = (u) => ({
  id: u.id,
  nama: u.nama_lengkap || '-',
  email: u.email || '',
  username: u.username || '',
  role: roleToFE(u.role),
  telepon: u.no_telepon || '',
  kota: u.kota || '',
  paroki: u.asal_paroki || '',
  tanggal: u.created_at ? fmtTanggal(u.created_at) : '',
  createdAt: u.created_at || '',        // bentuk asli untuk pengurutan
})

export const penggunaService = {
  async list(params = {}) {
    return (await ambilSemuaHalaman('/admin/users', params)).map(penggunaFE)
  },
  async create(data) {
    return api.post('/admin/users', {
      nama_lengkap: data.nama, email: data.email, username: data.username,
      password: data.password, role: roleToBE(data.role),
    })
  },
  async update(id, data) {
    const payload = {}
    if (data.nama !== undefined)     payload.nama_lengkap = data.nama
    if (data.email !== undefined)    payload.email = data.email
    if (data.username !== undefined) payload.username = data.username
    if (data.role !== undefined)     payload.role = roleToBE(data.role)
    if (data.password)               payload.password = data.password
    return api.put(`/admin/users/${id}`, payload)
  },
  async resetPassword(id, password) { return api.post(`/admin/users/${id}/reset-password`, password ? { password } : {}) },
  async remove(id)                  { return api.del(`/admin/users/${id}`) },
}

// ── RELAWAN ─────────────────────────────────────────────────
// Data pribadi (nama/email/hp/alamat/paroki) berasal dari profil user.
const relawanFE = (r) => ({
  id: r.id,
  nama: r.user?.nama_lengkap || '-',
  email: r.user?.email || '',
  hp: r.user?.no_telepon || '',
  alamat: r.user?.alamat || '',
  paroki: r.user?.asal_paroki || '',
  jenis: r.jenis || '',
  minat: r.minat || '',
  keterbatasan: r.kebutuhan_khusus || '',
  kemampuan: r.kemampuan_diri || '',
  motivasi: r.motivasi || '',
  ktp: r.nomor_ktp || '',
  kegiatan: r.kegiatan?.judul || '',
  kegiatanId: r.kegiatan_id || null,
  tanggal: r.tanggal_daftar ? fmtTanggal(r.tanggal_daftar) : '',
  tanggalRaw: r.tanggal_daftar || '',   // bentuk asli untuk penyaringan per bulan
  status: r.status,
})
const relawanBE = (f) => ({
  kegiatan_id: f.kegiatanId || null,
  jenis: f.jenis,
  minat: f.minat || null,
  kemampuan_diri: f.kemampuan || null,
  motivasi: f.motivasi || null,
  nomor_ktp: f.ktp || null,
  kebutuhan_khusus: f.keterbatasan || null,
})

export const relawanService = {
  async create(data)      { const res = await api.post('/relawan', relawanBE(data)); return relawanFE(unwrapOne(res)) },
  async myRegistrations() { return unwrapList(await api.get('/relawan/my-registrations')).map(relawanFE) },
  async cancel(id)        { return api.del(`/relawan/${id}/cancel`) },
  async listAdmin(params = {}) {
    return (await ambilSemuaHalaman('/admin/relawan', params)).map(relawanFE)
  },
  async updateStatus(id, status) { return api.patch(`/admin/relawan/${id}/status`, { status }) },
  async remove(id)               { return api.del(`/admin/relawan/${id}`) },
}

export const donasiService = {
  async create(data)      { const res = await api.post('/donasi', donasiBE(data)); return donasiFE(unwrapOne(res)) },
  async uploadBukti(id, file) {
    const fd = new FormData()
    fd.append('bukti', file)
    return api.upload(`/donasi/${id}/bukti`, fd)
  },
  async myDonations()     { return unwrapList(await api.get('/donasi/my-donations')).map(donasiFE) },
  async listAdmin(params = {}) {
    return (await ambilSemuaHalaman('/admin/donasi', params)).map(donasiFE)
  },
  async update(id, data)         { return api.put(`/admin/donasi/${id}`, donasiUpdateBE(data)) },
  async updateStatus(id, status) { return api.patch(`/admin/donasi/${id}/status`, { status_pembayaran: status }) },
  async remove(id)               { return api.del(`/admin/donasi/${id}`) },
}
