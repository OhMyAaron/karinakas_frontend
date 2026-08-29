// ════════════════════════════════════════════════════════════
//  Shared data store (localStorage) — satu sumber data untuk
//  panel admin, form publik, dan halaman profil.
//  Nanti saat backend siap, cukup ganti helper di bawah ke API.
// ════════════════════════════════════════════════════════════

import { allBerita } from './beritaData'

export const KEYS = {
  berita:     'kk_admin_berita_v2',
  kegiatan:   'kk_admin_kegiatan_v2',
  relawan:    'kk_admin_relawan',
  galeri:     'kk_admin_galeri_v2',
  donasi:     'kk_admin_donasi',
  pengguna:   'kk_admin_pengguna',
  notifikasi: 'kk_admin_notifikasi',
  audit:      'kk_audit_log',
}

// ── Opsi dropdown (dipakai bersama form & admin) ──
export const JENIS_RELAWAN = ['Lansia', 'Kebencanaan']
export const MINAT_RELAWAN = [
  'Kegiatan Sosial', 'Pendidikan & Pelatihan', 'Layanan Kesehatan',
  'Bantuan Bencana', 'Administrasi & Dokumentasi', 'Media & Komunikasi',
]
export const TUJUAN_DONASI = [
  'Bantuan Bencana', 'Beasiswa Anak', 'Layanan Kesehatan',
  'Pemberdayaan Masyarakat', 'Operasional Lembaga', 'Donasi Umum',
]
// Dua yang pertama = metode yang dipakai form donasi publik; sisanya untuk data lama
export const METODE_BAYAR = ['QRIS', 'Transfer BNI', 'Transfer BCA', 'Transfer Mandiri', 'Virtual Account']

// Label umum untuk kategori berita & galeri
export const LABEL_UMUM = {
  sosial: 'Sosial', pendidikan: 'Pendidikan', kesehatan: 'Kesehatan', bantuan: 'Bantuan',
  relawan: 'Relawan', kegiatan: 'Kegiatan', pengumuman: 'Pengumuman', lainnya: 'Lainnya',
}
export const BERITA_KATEGORI = ['sosial', 'pendidikan', 'kesehatan', 'bantuan', 'kegiatan', 'pengumuman', 'lainnya']
export const GALERI_KATEGORI = ['sosial', 'pendidikan', 'kesehatan', 'bantuan', 'relawan', 'lainnya']

export const STATUS_RELAWAN = {
  pending:  { label: 'Pending',  cls: 'orange' },
  diterima: { label: 'Diterima', cls: 'green' },
  ditolak:  { label: 'Ditolak',  cls: 'red' },
}
export const STATUS_KEGIATAN = {
  aktif:      { label: 'Aktif',      cls: 'blue' },
  selesai:    { label: 'Selesai',    cls: 'green' },
  dibatalkan: { label: 'Dibatalkan', cls: 'red' },
}

// Kategori kegiatan — TANPA 'relawan' (kebutuhan relawan kini berupa flag)
export const KATEGORI_KEGIATAN = ['bantuan', 'pendidikan', 'kesehatan', 'sosial', 'lainnya']
export const KATEGORI_LABEL = {
  bantuan:    'Bantuan',
  pendidikan: 'Pendidikan',
  kesehatan:  'Kesehatan',
  sosial:     'Kegiatan Sosial',
  lainnya:    'Lainnya',
}
export const KATEGORI_STYLE = {
  bantuan:    { color: '#d97000', bg: '#FFF3E6' },
  pendidikan: { color: '#1d4ed8', bg: '#EFF6FF' },
  kesehatan:  { color: '#C0392B', bg: '#FFEBEE' },
  sosial:     { color: '#1a6b3a', bg: '#E8F5E9' },
  lainnya:    { color: '#555',    bg: '#F5F5F5' },
}

// Format tanggal ISO → "17 Juni 2026"
export const fmtTanggal = (iso) => {
  if (!iso) return '-'
  const d = new Date(iso)
  if (isNaN(d)) return iso
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}
export const STATUS_DONASI = {
  pending:  { label: 'Pending',  cls: 'orange' },
  berhasil: { label: 'Berhasil', cls: 'green' },
  gagal:    { label: 'Gagal',    cls: 'red' },
}

// ════════════════════ SEEDS ════════════════════

// Kegiatan — sumber data publik & admin. butuhRelawan / butuhDonasi menandai
// apakah kegiatan membuka pendaftaran relawan / menerima donasi.
// kuotaRelawan: batas jumlah pendaftar relawan (0 = tak terbatas).
const seedKegiatanRaw = [
  { id:  1, judul: 'Pengajaran Gratis untuk Anak Terdampak Bencana', kategori: 'pendidikan', lokasi: 'Semarang',    tanggal: '2026-06-17', status: 'aktif',   butuhRelawan: true,  butuhDonasi: false, img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&h=280&fit=crop', deskripsi: 'Program pengajaran sukarela bagi anak-anak yang terdampak bencana agar tetap dapat belajar.' },
  { id:  2, judul: 'Gotong Royong Membersihkan Selokan',            kategori: 'sosial',     lokasi: 'Yogyakarta',  tanggal: '2026-05-11', status: 'aktif',   butuhRelawan: true,  butuhDonasi: false, img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&h=280&fit=crop', deskripsi: 'Kerja bakti membersihkan saluran air bersama warga dan relawan Karinakas.' },
  { id:  3, judul: 'Pengiriman Donasi untuk Korban Bencana Alam',   kategori: 'bantuan',    lokasi: 'Klaten',      tanggal: '2026-02-02', status: 'selesai', butuhRelawan: false, butuhDonasi: true,  img: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500&h=280&fit=crop', deskripsi: 'Penggalangan dan penyaluran donasi logistik untuk korban bencana alam.' },
  { id:  4, judul: 'Pemeriksaan Kesehatan Gratis untuk Lansia',     kategori: 'kesehatan',  lokasi: 'Solo',        tanggal: '2026-04-21', status: 'aktif',   butuhRelawan: true,  butuhDonasi: true,  img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&h=280&fit=crop', deskripsi: 'Layanan periksa kesehatan gratis bagi lansia. Membutuhkan relawan medis dan dukungan donasi obat.' },
  { id:  5, judul: 'Bimbingan Belajar Anak Kurang Mampu',           kategori: 'pendidikan', lokasi: 'Semarang',    tanggal: '2026-03-05', status: 'selesai', butuhRelawan: true,  butuhDonasi: false, img: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500&h=280&fit=crop', deskripsi: 'Bimbingan belajar gratis untuk anak-anak dari keluarga kurang mampu.' },
  { id:  6, judul: 'Bakti Sosial Bersama Komunitas Lokal',          kategori: 'sosial',     lokasi: 'Magelang',    tanggal: '2026-04-28', status: 'aktif',   butuhRelawan: true,  butuhDonasi: true,  img: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=280&fit=crop',    deskripsi: 'Kegiatan bakti sosial bersama komunitas setempat. Terbuka untuk relawan dan donasi.' },
  { id:  7, judul: 'Distribusi Sembako untuk Warga Terdampak',      kategori: 'bantuan',    lokasi: 'Klaten',      tanggal: '2026-03-14', status: 'selesai', butuhRelawan: false, butuhDonasi: true,  img: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=500&h=280&fit=crop', deskripsi: 'Pembagian paket sembako untuk warga yang terdampak musibah.' },
  { id:  8, judul: 'Pelatihan Relawan Karinakas 2026',              kategori: 'sosial',     lokasi: 'Yogyakarta',  tanggal: '2026-01-07', status: 'selesai', butuhRelawan: true,  butuhDonasi: false, img: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=500&h=280&fit=crop', deskripsi: 'Pembekalan dan pelatihan dasar bagi relawan baru Karinakas.' },
  { id:  9, judul: 'Penyuluhan Kesehatan Ibu dan Anak',             kategori: 'kesehatan',  lokasi: 'Purwokerto',  tanggal: '2026-05-03', status: 'aktif',   butuhRelawan: true,  butuhDonasi: false, img: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=500&h=280&fit=crop', deskripsi: 'Penyuluhan kesehatan untuk ibu dan anak di wilayah binaan.' },
  { id: 10, judul: 'Kunjungan ke Panti Asuhan Sejahtera',           kategori: 'sosial',     lokasi: 'Semarang',    tanggal: '2026-03-19', status: 'selesai', butuhRelawan: true,  butuhDonasi: true,  img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&h=280&fit=crop', deskripsi: 'Kunjungan dan pemberian bantuan ke panti asuhan.' },
  { id: 11, judul: 'Workshop Literasi Anak di Pedesaan',            kategori: 'pendidikan', lokasi: 'Temanggung',  tanggal: '2026-04-22', status: 'aktif',   butuhRelawan: true,  butuhDonasi: false, img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&h=280&fit=crop', deskripsi: 'Workshop peningkatan literasi anak-anak di daerah pedesaan.' },
  { id: 12, judul: 'Sunatan Massal Gratis Karinakas',              kategori: 'kesehatan',  lokasi: 'Yogyakarta',  tanggal: '2026-02-10', status: 'selesai', butuhRelawan: true,  butuhDonasi: true,  img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&h=280&fit=crop', deskripsi: 'Layanan sunatan massal gratis untuk anak dari keluarga prasejahtera.' },
  { id: 13, judul: 'Bantuan Logistik Pasca Bencana Banjir',         kategori: 'bantuan',    lokasi: 'Demak',       tanggal: '2026-01-08', status: 'selesai', butuhRelawan: false, butuhDonasi: true,  img: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500&h=280&fit=crop', deskripsi: 'Penyaluran bantuan logistik bagi korban banjir.' },
  { id: 14, judul: 'Aksi Bersih Sungai Code Yogyakarta',            kategori: 'sosial',     lokasi: 'Yogyakarta',  tanggal: '2026-02-15', status: 'selesai', butuhRelawan: true,  butuhDonasi: false, img: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=280&fit=crop',    deskripsi: 'Aksi membersihkan sungai bersama relawan lingkungan.' },
  { id: 15, judul: 'Pembagian Pakaian Layak Pakai',                kategori: 'sosial',     lokasi: 'Salatiga',    tanggal: '2026-03-30', status: 'selesai', butuhRelawan: false, butuhDonasi: true,  img: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500&h=280&fit=crop', deskripsi: 'Pengumpulan dan pembagian pakaian layak pakai untuk yang membutuhkan.' },
  { id: 16, judul: 'Beasiswa Anak Berprestasi Kurang Mampu',        kategori: 'pendidikan', lokasi: 'Semarang',    tanggal: '2026-04-01', status: 'aktif',   butuhRelawan: false, butuhDonasi: true,  img: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=500&h=280&fit=crop', deskripsi: 'Program beasiswa untuk anak berprestasi dari keluarga kurang mampu.' },
  { id: 17, judul: 'Pengadaan Air Bersih Daerah Kekeringan',        kategori: 'bantuan',    lokasi: 'Gunungkidul', tanggal: '2026-06-20', status: 'aktif',   butuhRelawan: false, butuhDonasi: true,  img: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=500&h=280&fit=crop', deskripsi: 'Penyediaan air bersih bagi daerah yang mengalami kekeringan.' },
  { id: 18, judul: 'Program Makan Siang Gratis Anak Yatim',         kategori: 'sosial',     lokasi: 'Semarang',    tanggal: '2026-05-12', status: 'aktif',   butuhRelawan: true,  butuhDonasi: true,  img: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=500&h=280&fit=crop', deskripsi: 'Penyediaan makan siang bergizi untuk anak yatim secara rutin.' },
  { id: 19, judul: 'Pengobatan Gratis Wilayah Terpencil',           kategori: 'kesehatan',  lokasi: 'Wonogiri',    tanggal: '2026-05-25', status: 'aktif',   butuhRelawan: true,  butuhDonasi: true,  img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&h=280&fit=crop', deskripsi: 'Layanan pengobatan gratis untuk masyarakat di wilayah terpencil.' },
  { id: 20, judul: 'Pelatihan Keterampilan Ibu Rumah Tangga',       kategori: 'pendidikan', lokasi: 'Klaten',      tanggal: '2026-06-03', status: 'aktif',   butuhRelawan: true,  butuhDonasi: false, img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&h=280&fit=crop', deskripsi: 'Pelatihan keterampilan untuk pemberdayaan ekonomi ibu rumah tangga.' },
  { id: 21, judul: 'Penyaluran Kursi Roda untuk Difabel',           kategori: 'bantuan',    lokasi: 'Yogyakarta',  tanggal: '2026-04-18', status: 'selesai', butuhRelawan: false, butuhDonasi: true,  img: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500&h=280&fit=crop', deskripsi: 'Pengadaan dan penyaluran kursi roda bagi penyandang difabel.' },
  { id: 22, judul: 'Silaturahmi dan Buka Puasa Bersama',            kategori: 'sosial',     lokasi: 'Magelang',    tanggal: '2026-03-15', status: 'selesai', butuhRelawan: true,  butuhDonasi: true,  img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=500&h=280&fit=crop', deskripsi: 'Acara silaturahmi dan buka puasa bersama warga binaan.' },
  { id: 23, judul: 'Penghijauan dan Tanam Pohon Bersama',           kategori: 'sosial',     lokasi: 'Sleman',      tanggal: '2026-06-05', status: 'aktif',   butuhRelawan: true,  butuhDonasi: false, img: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=500&h=280&fit=crop',    deskripsi: 'Kegiatan penghijauan dan penanaman pohon untuk pelestarian lingkungan.' },
  { id: 24, judul: 'Seminar Kemanusiaan dan Kepedulian Sosial',     kategori: 'lainnya',    lokasi: 'Yogyakarta',  tanggal: '2026-06-08', status: 'aktif',   butuhRelawan: false, butuhDonasi: false, img: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=500&h=280&fit=crop', deskripsi: 'Seminar terbuka mengenai isu kemanusiaan dan kepedulian sosial.' },
]

// Default kuota 25 untuk kegiatan yang membuka relawan (0 = tak terbatas)
export const seedKegiatan = seedKegiatanRaw.map(k => ({ kuotaRelawan: k.butuhRelawan ? 25 : 0, ...k }))

// Berita — sumber data publik & admin (diambil dari beritaData, ditambah status)
export const seedBerita = allBerita.map(b => ({ status: 'published', ...b }))

// Galeri — sumber data publik & admin
export const seedGaleri = [
  { id:  1, judul: 'Pengajaran Gratis Kepada Terdampak Bencana',  kategori: 'pendidikan', tanggal: '2026-06-17', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=260&fit=crop' },
  { id:  2, judul: 'Gotong Royong Membersihkan Selokan',          kategori: 'sosial',     tanggal: '2026-05-11', img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=260&fit=crop' },
  { id:  3, judul: 'Pengiriman Donasi untuk Korban Bencana Alam', kategori: 'bantuan',    tanggal: '2026-02-02', img: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=260&fit=crop' },
  { id:  4, judul: 'Pemeriksaan Gratis Terhadap Lansia',          kategori: 'kesehatan',  tanggal: '2026-04-21', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=260&fit=crop' },
  { id:  5, judul: 'Bimbingan Belajar Anak Kurang Mampu',         kategori: 'pendidikan', tanggal: '2026-03-05', img: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=260&fit=crop' },
  { id:  6, judul: 'Bakti Sosial Bersama Komunitas Lokal',        kategori: 'sosial',     tanggal: '2026-04-28', img: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=260&fit=crop' },
  { id:  7, judul: 'Distribusi Sembako untuk Warga Terdampak',    kategori: 'bantuan',    tanggal: '2026-03-14', img: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&h=260&fit=crop' },
  { id:  8, judul: 'Pelatihan Relawan Karinakas 2026',            kategori: 'relawan',    tanggal: '2026-01-07', img: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=260&fit=crop' },
  { id:  9, judul: 'Penyuluhan Kesehatan Ibu dan Anak',           kategori: 'kesehatan',  tanggal: '2026-05-03', img: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=400&h=260&fit=crop' },
  { id: 10, judul: 'Kunjungan ke Panti Asuhan Sejahtera',         kategori: 'sosial',     tanggal: '2026-03-19', img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=260&fit=crop' },
  { id: 11, judul: 'Workshop Literasi Anak di Pedesaan',          kategori: 'pendidikan', tanggal: '2026-04-22', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=260&fit=crop' },
  { id: 12, judul: 'Sunatan Massal Gratis Karinakas',             kategori: 'kesehatan',  tanggal: '2026-02-10', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=260&fit=crop' },
  { id: 13, judul: 'Bantuan Logistik Pasca Bencana Banjir',       kategori: 'bantuan',    tanggal: '2026-01-08', img: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=260&fit=crop' },
  { id: 14, judul: 'Aksi Bersih Sungai Code Yogyakarta',          kategori: 'relawan',    tanggal: '2026-02-15', img: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=260&fit=crop' },
  { id: 15, judul: 'Pembagian Pakaian Layak Pakai',              kategori: 'sosial',     tanggal: '2026-03-30', img: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=260&fit=crop' },
  { id: 16, judul: 'Beasiswa Anak Berprestasi Kurang Mampu',     kategori: 'pendidikan', tanggal: '2026-04-01', img: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=260&fit=crop' },
]

export const seedRelawan = [
  { id: 1, nama: 'Budi Santoso',    email: 'budi@email.com',  hp: '081234567801', alamat: 'Jl. Pemuda No. 5, Semarang', paroki: 'Paroki Katedral', jenis: 'Kebencanaan', minat: 'Bantuan Bencana',   keterbatasan: '-',                      kemampuan: 'P3K, mengemudi',          tanggal: '2026-06-03', status: 'pending'  },
  { id: 2, nama: 'Siti Rahayu',     email: 'siti@email.com',  hp: '081234567802', alamat: 'Jl. Gajah No. 12, Semarang', paroki: 'Paroki Karangpanas', jenis: 'Lansia',      minat: 'Layanan Kesehatan', keterbatasan: 'Asma ringan',            kemampuan: 'Perawatan lansia',        tanggal: '2026-06-03', status: 'pending'  },
  { id: 3, nama: 'Ahmad Fauzi',     email: 'ahmad@email.com', hp: '081234567803', alamat: 'Jl. Diponegoro No. 8, Ungaran', paroki: '-',               jenis: 'Kebencanaan', minat: 'Bantuan Bencana',   keterbatasan: '-',                      kemampuan: 'Logistik, koordinasi',    tanggal: '2026-05-20', status: 'diterima' },
  { id: 4, nama: 'Dewi Lestari',    email: 'dewi@email.com',  hp: '081234567804', alamat: 'Jl. Sultan Agung No. 3, Demak', paroki: 'Paroki Demak',     jenis: 'Lansia',      minat: 'Pendidikan & Pelatihan', keterbatasan: '-',                 kemampuan: 'Mengajar, public speaking', tanggal: '2026-05-12', status: 'diterima' },
  { id: 5, nama: 'Rendi Kurniawan', email: 'rendi@email.com', hp: '081234567805', alamat: 'Jl. Pandanaran No. 20, Semarang', paroki: '-',             jenis: 'Kebencanaan', minat: 'Media & Komunikasi', keterbatasan: '-',                     kemampuan: 'Fotografi, desain grafis', tanggal: '2026-04-28', status: 'ditolak'  },
]

export const seedDonasi = [
  { id: 1, donatur: 'Budi Santoso',    email: 'budi@email.com',  tujuan: 'Bantuan Bencana',   nominal: 500000,  metode: 'Transfer BCA',    tanggal: '2026-06-03', status: 'berhasil', kode: 'BCA-20260603-0142',  rekening: '1234567890 (BCA) a.n. Budi S', fee: 0,    pesan: '' },
  { id: 2, donatur: 'Siti Rahayu',     email: 'siti@email.com',  tujuan: 'Beasiswa Anak',     nominal: 100000,  metode: 'QRIS',            tanggal: '2026-06-03', status: 'berhasil', kode: 'QRIS-20260603-0891', rekening: 'GoPay 0812****802',           fee: 700,  pesan: 'Semoga bermanfaat' },
  { id: 3, donatur: 'Ahmad Fauzi',     email: 'ahmad@email.com', tujuan: 'Donasi Umum',       nominal: 1000000, metode: 'Transfer Mandiri',tanggal: '2026-06-02', status: 'pending',  kode: '',                   rekening: '-',                          fee: 0,    pesan: '' },
  { id: 4, donatur: 'Dewi Lestari',    email: 'dewi@email.com',  tujuan: 'Layanan Kesehatan', nominal: 250000,  metode: 'Virtual Account', tanggal: '2026-06-02', status: 'berhasil', kode: 'VA-20260602-3310',   rekening: 'VA BNI 8810****310',         fee: 4000, pesan: '' },
  { id: 5, donatur: 'Rendi Kurniawan', email: 'rendi@email.com', tujuan: 'Pemberdayaan Masyarakat', nominal: 200000, metode: 'QRIS',       tanggal: '2026-06-01', status: 'pending',  kode: '',                   rekening: '-',                          fee: 0,    pesan: '' },
]

export const seedNotifikasi = [
  { id: 1, tipe: 'email',    penerima: 'budi@email.com',  judul: 'Terima kasih atas donasi Anda', trigger: 'donasi_verified',   tanggal: '2026-06-03 10:24', status: 'terkirim' },
  { id: 2, tipe: 'whatsapp', penerima: '081234567803',    judul: 'Selamat datang sebagai relawan', trigger: 'relawan_approved', tanggal: '2026-05-20 09:10', status: 'terkirim' },
  { id: 3, tipe: 'email',    penerima: 'dewi@email.com',  judul: 'Terima kasih atas donasi Anda', trigger: 'donasi_verified',   tanggal: '2026-06-02 14:02', status: 'terkirim' },
]

export const seedAudit = [
  { id: 1, user: 'Super Admin', aksi: 'Melihat detail pembayaran', target: 'Donasi #1 - Budi Santoso', tanggal: '2026-06-03 11:00' },
  { id: 2, user: 'Admin Karinakas', aksi: 'Mengubah status relawan', target: 'Relawan #3 - Ahmad Fauzi', tanggal: '2026-05-20 09:05' },
]

// ════════════════════ HELPERS ════════════════════

export function loadCollection(key, seed = []) {
  try {
    const saved = JSON.parse(localStorage.getItem(key))
    return Array.isArray(saved) ? saved : seed
  } catch {
    return seed
  }
}

export function saveCollection(key, arr) {
  localStorage.setItem(key, JSON.stringify(arr))
}

/** Tambah item ke koleksi (prepend) lalu kembalikan list baru. */
export function addToCollection(key, seed, item) {
  const list = loadCollection(key, seed)
  const next = [{ id: Date.now(), ...item }, ...list]
  saveCollection(key, next)
  return next
}

/** Catat aktivitas ke audit log. */
export function logAudit(user, aksi, target) {
  const list = loadCollection(KEYS.audit, seedAudit)
  const entry = {
    id: Date.now(),
    user: user || 'Sistem',
    aksi,
    target,
    tanggal: new Date().toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
  }
  saveCollection(KEYS.audit, [entry, ...list])
}

/** Simulasikan kirim notifikasi (email/WA) + simpan ke history. */
export function pushNotifikasi({ tipe, penerima, judul, trigger }) {
  const list = loadCollection(KEYS.notifikasi, seedNotifikasi)
  const entry = {
    id: Date.now(),
    tipe, penerima, judul, trigger,
    tanggal: new Date().toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    status: 'terkirim',
  }
  saveCollection(KEYS.notifikasi, [entry, ...list])
}

export const fmtRp = n => 'Rp ' + Number(n || 0).toLocaleString('id-ID')

/** Jumlah pendaftar relawan untuk sebuah kegiatan (by id). */
export function countRelawanKegiatan(kegiatanId) {
  return loadCollection(KEYS.relawan, seedRelawan).filter(r => String(r.kegiatanId) === String(kegiatanId)).length
}
