import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, WidthType, BorderStyle, ShadingType,
  UnderlineType, Header, Footer, PageNumber, NumberFormat,
  convertInchesToTwip, LevelFormat, SectionType,
} from 'docx'
import { writeFileSync } from 'fs'

// ── Warna tema ──────────────────────────────────────────────────────────────
const RED   = 'CC0000'
const DARK  = '1A1A1A'
const GRAY  = '666666'
const LIGHT = 'F5F5F5'
const WHITE = 'FFFFFF'
const GREEN = '1A6B3A'
const BLUE  = '1D4ED8'

// ── Helper: heading ──────────────────────────────────────────────────────────
const h1 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_1,
  spacing: { before: 400, after: 160 },
  children: [new TextRun({ text, bold: true, size: 32, color: RED, font: 'Calibri' })],
})

const h2 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_2,
  spacing: { before: 320, after: 120 },
  children: [new TextRun({ text, bold: true, size: 26, color: DARK, font: 'Calibri' })],
})

const h3 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_3,
  spacing: { before: 200, after: 80 },
  children: [new TextRun({ text, bold: true, size: 22, color: RED, font: 'Calibri' })],
})

const p = (text, opts = {}) => new Paragraph({
  spacing: { after: 120 },
  children: [new TextRun({ text, size: 22, color: DARK, font: 'Calibri', ...opts })],
})

const pGray = (text) => new Paragraph({
  spacing: { after: 80 },
  children: [new TextRun({ text, size: 20, color: GRAY, font: 'Calibri', italics: true })],
})

const bullet = (text, level = 0) => new Paragraph({
  bullet: { level },
  spacing: { after: 80 },
  children: [new TextRun({ text, size: 22, color: DARK, font: 'Calibri' })],
})

const boldBullet = (label, desc) => new Paragraph({
  bullet: { level: 0 },
  spacing: { after: 80 },
  children: [
    new TextRun({ text: label, size: 22, bold: true, color: DARK, font: 'Calibri' }),
    new TextRun({ text: ` — ${desc}`, size: 22, color: GRAY, font: 'Calibri' }),
  ],
})

const spacer = (n = 1) => Array.from({ length: n }, () =>
  new Paragraph({ spacing: { after: 80 }, children: [new TextRun('')] })
)

// ── Helper: tabel ─────────────────────────────────────────────────────────────
const cell = (text, opts = {}) => new TableCell({
  shading: opts.header ? { fill: RED, type: ShadingType.CLEAR, color: RED } : undefined,
  margins: { top: 80, bottom: 80, left: 120, right: 120 },
  width: opts.width ? { size: opts.width, type: WidthType.PERCENTAGE } : undefined,
  children: [new Paragraph({
    alignment: AlignmentType.LEFT,
    children: [new TextRun({
      text,
      bold: opts.header || opts.bold,
      color: opts.header ? WHITE : (opts.color || DARK),
      size: opts.small ? 18 : 20,
      font: 'Calibri',
    })],
  })],
})

const tableRow = (cells, isHeader = false) => new TableRow({
  tableHeader: isHeader,
  children: cells,
})

const makeTable = (headers, rows, widths) => new Table({
  width: { size: 100, type: WidthType.PERCENTAGE },
  borders: {
    top:           { style: BorderStyle.SINGLE, size: 4, color: 'E0E0E0' },
    bottom:        { style: BorderStyle.SINGLE, size: 4, color: 'E0E0E0' },
    left:          { style: BorderStyle.SINGLE, size: 4, color: 'E0E0E0' },
    right:         { style: BorderStyle.SINGLE, size: 4, color: 'E0E0E0' },
    insideH:       { style: BorderStyle.SINGLE, size: 4, color: 'E0E0E0' },
    insideV:       { style: BorderStyle.SINGLE, size: 4, color: 'E0E0E0' },
  },
  rows: [
    tableRow(
      headers.map((h, i) => cell(h, { header: true, width: widths?.[i] })),
      true
    ),
    ...rows.map(row =>
      tableRow(row.map((c, i) => typeof c === 'string'
        ? cell(c, { width: widths?.[i] })
        : cell(c.text, { ...c, width: widths?.[i] })
      ))
    ),
  ],
})

// ── Divider ───────────────────────────────────────────────────────────────────
const divider = () => new Paragraph({
  spacing: { before: 200, after: 200 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: RED, space: 4 } },
  children: [new TextRun('')],
})

// ═══════════════════════════════════════════════════════════════════════════════
// KONTEN DOKUMEN
// ═══════════════════════════════════════════════════════════════════════════════

const titlePage = [
  ...spacer(3),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 160 },
    children: [new TextRun({ text: 'LAPORAN PROGRES PENGEMBANGAN', size: 28, color: GRAY, font: 'Calibri' })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 240 },
    children: [new TextRun({ text: 'Frontend Website Karinakas', bold: true, size: 56, color: RED, font: 'Calibri' })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    children: [new TextRun({ text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', size: 24, color: RED, font: 'Calibri' })],
  }),
  ...spacer(2),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    children: [new TextRun({ text: 'Yayasan Karinakas Semarang', bold: true, size: 28, color: DARK, font: 'Calibri' })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    children: [new TextRun({ text: 'Tanggal: 4 Juni 2026', size: 22, color: GRAY, font: 'Calibri' })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    children: [new TextRun({ text: 'Teknologi: React 19 + Vite + Bootstrap 5', size: 22, color: GRAY, font: 'Calibri' })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 80 },
    children: [new TextRun({ text: 'Status: Pengembangan Aktif', bold: true, size: 22, color: GREEN, font: 'Calibri' })],
  }),
  ...spacer(3),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'Generated by Claude Code', size: 18, color: GRAY, font: 'Calibri', italics: true })],
  }),
]

const ringkasan = [
  h1('1. RINGKASAN EKSEKUTIF'),
  p('Website Karinakas adalah platform web milik Yayasan Karinakas Semarang, sebuah lembaga sosial yang bergerak di bidang kemanusiaan, pendidikan, kesehatan, dan pemberdayaan masyarakat. Frontend website ini dibangun menggunakan React 19 dengan Vite sebagai build tool, Bootstrap 5 untuk komponen UI, dan Bootstrap Icons untuk ikon.'),
  p('Progres pengembangan saat ini telah mencakup pembangunan seluruh halaman publik, sistem autentikasi berbasis role (Admin / Super Admin / Pengguna Biasa), dashboard admin, halaman donasi, halaman pendaftaran relawan, serta berbagai komponen reusable untuk menjaga konsistensi desain.'),
  ...spacer(1),
  h2('Statistik Proyek'),
  makeTable(
    ['Indikator', 'Detail'],
    [
      ['Total halaman', '11 halaman (8 publik + 3 khusus)'],
      ['Total komponen', '12 komponen React'],
      ['File CSS', '1 file index.css (~3.500 baris)'],
      ['Teknologi utama', 'React 19, Vite, Bootstrap 5, React Router v6'],
      ['Sistem auth', 'Role-based (Admin, Super Admin, User) via localStorage'],
      ['Status backend', 'Belum ada — semua data masih mock/static'],
    ],
    [30, 70]
  ),
]

const halamanPublik = [
  h1('2. HALAMAN-HALAMAN WEBSITE'),
  h2('2.1 Halaman Publik (Dapat Diakses Semua Orang)'),
  p('Halaman-halaman berikut dapat diakses oleh siapa saja tanpa perlu login terlebih dahulu:'),
  ...spacer(1),
  makeTable(
    ['Nama Halaman', 'Route / Alamat URL', 'Deskripsi'],
    [
      ['Beranda', '/', 'Halaman utama dengan hero, nilai, statistik, kegiatan, galeri, dan CTA'],
      ['Tentang Kami', '/tentang-kami', 'Profil lembaga, visi misi, nilai inti, struktur organisasi'],
      ['Galeri', '/galeri', 'Foto-foto dokumentasi kegiatan dengan filter kategori dan pagination'],
      ['Kegiatan', '/kegiatan', 'Daftar program kegiatan dengan filter status dan kategori'],
      ['Berita', '/berita', 'Artikel berita terbaru dengan sidebar dan fungsi pencarian'],
      ['Detail Berita', '/berita/:id', 'Halaman detail satu artikel berita lengkap dengan artikel terkait'],
      ['Kontak', '/kontak', 'Form kirim pesan dan informasi kontak lengkap dengan peta'],
      ['Login', '/login', 'Halaman masuk akun dengan animasi visual dan deteksi role otomatis'],
      ['Daftar Akun', '/register', 'Pendaftaran akun baru 2 langkah dengan indikator kekuatan password'],
    ],
    [20, 22, 58]
  ),
  ...spacer(1),
  h2('2.2 Halaman Khusus (Perlu Login)'),
  p('Halaman-halaman berikut hanya bisa diakses setelah login. Jika tidak login dan mencoba mengakses, pengguna akan otomatis diarahkan ke halaman Login:'),
  ...spacer(1),
  makeTable(
    ['Nama Halaman', 'Route', 'Akses Untuk', 'Deskripsi'],
    [
      ['Dashboard Admin', '/admin', 'Admin & Super Admin', 'Panel manajemen dengan sidebar, statistik, tabel donasi, feed aktivitas'],
      ['Donasi', '/donasi', 'Pengguna yang sudah login', 'Form donasi online dengan pilihan program, nominal, dan metode pembayaran'],
      ['Daftar Relawan', '/daftar-relawan', 'Pengguna yang sudah login', 'Formulir pendaftaran relawan dengan bidang minat dan motivasi'],
    ],
    [22, 18, 25, 35]
  ),
]

const autentikasi = [
  h1('3. SISTEM AUTENTIKASI & KEAMANAN'),
  h2('3.1 Cara Kerja Login'),
  p('Sistem login mendeteksi secara otomatis apakah pengguna adalah admin atau pengguna biasa berdasarkan email dan password yang dimasukkan:'),
  ...spacer(1),
  makeTable(
    ['Skenario Login', 'Kondisi', 'Hasil'],
    [
      ['Login Admin', 'Email @karinakas.or.id + password benar', 'Diarahkan ke /admin (Dashboard)'],
      ['Login Super Admin', 'Email superadmin@karinakas.or.id + password benar', 'Diarahkan ke /admin (Dashboard)'],
      ['Login Pengguna', 'Email biasa + password yang sudah terdaftar', 'Diarahkan ke / (Beranda, dengan fitur tambahan)'],
      ['Password salah (admin)', 'Email @karinakas.or.id + password salah', 'Muncul pesan error'],
      ['Akun tidak ditemukan', 'Email belum pernah daftar', 'Pesan error + link ke halaman Daftar'],
      ['Password salah (user)', 'Email terdaftar + password salah', 'Muncul pesan "kata sandi salah"'],
    ],
    [25, 40, 35]
  ),
  ...spacer(1),
  h2('3.2 Akun Bawaan (Hardcoded untuk Demo)'),
  makeTable(
    ['Role', 'Email', 'Password'],
    [
      ['Admin', 'admin@karinakas.or.id', 'admin123'],
      ['Super Admin', 'superadmin@karinakas.or.id', 'super123'],
      ['Pengguna Biasa', 'Email apa saja yang sudah didaftarkan', 'Password saat daftar'],
    ],
    [15, 42, 43]
  ),
  ...spacer(1),
  h2('3.3 Proteksi Route'),
  p('Sistem proteksi route memastikan pengguna hanya dapat mengakses halaman yang sesuai dengan perannya:'),
  bullet('RequireAuth: Jika belum login dan mencoba akses /donasi atau /daftar-relawan → redirect ke /login'),
  bullet('RequireAdmin: Jika bukan admin dan mencoba akses /admin → redirect ke /'),
  bullet('Login page: Jika sudah login dan mencoba akses /login → redirect ke halaman yang sesuai'),
  ...spacer(1),
  h2('3.4 Penyimpanan Data Auth'),
  p('Data autentikasi disimpan menggunakan localStorage browser dengan key:'),
  boldBullet('kk_auth', 'Menyimpan data pengguna yang sedang login (nama, email, role)'),
  boldBullet('kk_users', 'Menyimpan daftar semua akun pengguna yang pernah mendaftar'),
  pGray('⚠️ Catatan: Penyimpanan di localStorage hanya untuk keperluan demo/prototyping. Untuk production, harus menggunakan backend + JWT token atau session yang aman.'),
]

const halLogin = [
  h1('4. DETAIL HALAMAN LOGIN & REGISTER'),
  h2('4.1 Halaman Login (/login)'),
  p('Halaman login dirancang dengan layout split 50/50 — panel kiri visual dan panel kanan form:'),
  ...spacer(1),
  h3('Panel Kiri (Visual)'),
  bullet('Latar belakang gradien merah animasi yang bergerak perlahan'),
  bullet('3 bola cahaya melayang (orb) dengan ukuran dan timing berbeda'),
  bullet('2 cincin berputar — satu solid, satu putus-putus (dashed)'),
  bullet('Pola titik-titik transparan di background'),
  bullet('Branding Karinakas dengan ikon dan teks'),
  bullet('Judul besar "Masuk & Bergabung" dengan aksen warna kuning'),
  bullet('Daftar fitur dengan ikon (Donasi, Relawan, Dashboard, Statistik)'),
  bullet('Statistik mini: 5.000+ penerima, 120+ program, 15+ tahun'),
  ...spacer(1),
  h3('Panel Kanan (Form)'),
  bullet('Animasi slide-up bertahap (staggered) untuk setiap elemen form'),
  bullet('Input email dengan ikon amplop yang berubah warna saat fokus'),
  bullet('Input password dengan tombol show/hide'),
  bullet('Checkbox "Ingat saya" dengan animasi custom'),
  bullet('Tombol submit dengan shimmer effect berulang dan loading spinner'),
  bullet('Deteksi error: password salah vs akun tidak ditemukan'),
  bullet('Hint khusus admin: "Gunakan akun @karinakas.or.id"'),
  bullet('Link ke halaman Register'),
  ...spacer(1),
  h2('4.2 Halaman Register (/register)'),
  p('Halaman register menggunakan sistem 2 langkah (multi-step form):'),
  ...spacer(1),
  h3('Langkah 1: Info Akun'),
  bullet('Preview avatar: lingkaran merah yang menampilkan inisial nama secara real-time saat mengetik'),
  bullet('Input nama lengkap (minimal 2 karakter)'),
  bullet('Input email'),
  bullet('Step indicator di atas menunjukkan progress langkah 1 dari 2'),
  ...spacer(1),
  h3('Langkah 2: Kata Sandi'),
  bullet('Menampilkan email yang dipilih di langkah 1'),
  bullet('Input password dengan indikator kekuatan (Lemah/Cukup/Kuat/Sangat Kuat)'),
  bullet('Progress bar warna-warni untuk kekuatan password'),
  bullet('Input konfirmasi password dengan indikator cocok/tidak cocok secara real-time'),
  bullet('Checkbox persetujuan syarat & ketentuan'),
  bullet('Tombol "Kembali" untuk kembali ke langkah 1'),
  bullet('Validasi email duplikat — tidak boleh daftar dengan email yang sudah ada'),
]

const adminDash = [
  h1('5. DASHBOARD ADMIN'),
  p('Dashboard admin adalah halaman terpisah yang hanya bisa diakses oleh akun admin. Halaman ini memiliki layout sendiri (tanpa Navbar dan Footer publik).'),
  ...spacer(1),
  h2('5.1 Sidebar Navigasi'),
  makeTable(
    ['Menu', 'Ikon', 'Status'],
    [
      ['Dashboard', 'Grid', 'Aktif (menampilkan konten)'],
      ['Relawan', 'Orang-orang', 'Badge angka 3 (notifikasi)'],
      ['Program & Kegiatan', 'Clipboard', 'Coming Soon'],
      ['Donasi & Keuangan', 'Koin', 'Coming Soon'],
      ['Berita & Konten', 'Koran', 'Coming Soon'],
      ['Galeri', 'Gambar', 'Coming Soon'],
      ['Pengaturan', 'Roda gigi', 'Coming Soon'],
    ],
    [35, 20, 45]
  ),
  ...spacer(1),
  h2('5.2 Topbar'),
  bullet('Judul halaman dinamis berubah sesuai menu yang dipilih'),
  bullet('Tanggal saat ini'),
  bullet('Input pencarian dengan border focus merah'),
  bullet('Tombol notifikasi dengan titik merah indikator'),
  bullet('Avatar dan nama pengguna yang sedang login'),
  bullet('Sapaan dinamis: Selamat Pagi/Siang/Sore/Malam sesuai jam'),
  ...spacer(1),
  h2('5.3 Kartu Statistik (4 kartu)'),
  makeTable(
    ['Statistik', 'Nilai', 'Progres Bar', 'Target'],
    [
      ['Donasi Bulan Ini', 'Rp 48,5 Jt', '48.5%', 'Rp 100 Jt'],
      ['Relawan Aktif', '847 orang', '84.7%', '1.000 orang'],
      ['Program Berjalan', '23 program', '76.7%', '30 program'],
      ['Penerima Manfaat', '5.214 orang', '86.9%', '6.000 orang'],
    ],
    [30, 20, 20, 30]
  ),
  pGray('Catatan: Data di atas adalah data dummy/simulasi untuk keperluan tampilan UI.'),
  ...spacer(1),
  h2('5.4 Tabel Donasi Terkini'),
  p('Tabel menampilkan 5 baris data donasi terbaru dengan kolom:'),
  bullet('Donatur (nama + avatar inisial + tanggal)'),
  bullet('Program yang didonasikan'),
  bullet('Nominal donasi'),
  bullet('Metode pembayaran'),
  bullet('Status: Diterima (hijau) atau Menunggu (oranye)'),
  ...spacer(1),
  h2('5.5 Feed Aktivitas Terkini'),
  p('Menampilkan 6 item aktivitas terbaru: relawan baru, donasi masuk, pembaruan program, publikasi berita, jadwal rapat, penambahan foto galeri.'),
  ...spacer(1),
  h2('5.6 Tombol Aksi Cepat'),
  bullet('Tambah Berita — publikasikan konten baru'),
  bullet('Tambah Kegiatan — jadwalkan program baru'),
  bullet('Kelola Relawan — atur data relawan'),
  bullet('Export Laporan — unduh data lengkap'),
  pGray('Catatan: Tombol-tombol ini saat ini hanya tampilan (belum fungsional karena belum ada backend).'),
]

const halamanUser = [
  h1('6. HALAMAN KHUSUS PENGGUNA'),
  h2('6.1 Halaman Donasi (/donasi)'),
  p('Halaman donasi hanya bisa diakses oleh pengguna yang sudah login. Terdiri dari 4 langkah dalam satu form panjang:'),
  ...spacer(1),
  h3('Langkah 1: Pilih Program'),
  makeTable(
    ['Program', 'Ikon', 'Warna Tema'],
    [
      ['Bantuan Bencana', 'Petir', 'Merah'],
      ['Beasiswa Anak', 'Buku', 'Biru'],
      ['Layanan Kesehatan', 'Rumah Sakit', 'Hijau'],
      ['Donasi Umum', 'Hati', 'Oranye'],
    ],
    [40, 30, 30]
  ),
  ...spacer(1),
  h3('Langkah 2: Jumlah Donasi'),
  bullet('6 pilihan nominal preset: Rp 50.000, 100.000, 250.000, 500.000, 1.000.000, 2.500.000'),
  bullet('Input jumlah bebas untuk nominal di luar pilihan'),
  ...spacer(1),
  h3('Langkah 3: Metode Pembayaran'),
  bullet('QRIS — scan dari semua e-wallet & bank'),
  bullet('Transfer Bank — BCA, Mandiri, BNI, BRI'),
  bullet('Virtual Account — via ATM atau mobile banking'),
  ...spacer(1),
  h3('Langkah 4: Data Donatur'),
  bullet('Nama lengkap (wajib)'),
  bullet('Email (wajib, untuk konfirmasi)'),
  bullet('Pesan dukungan (opsional)'),
  bullet('Checkbox: tampil sebagai anonim'),
  ...spacer(1),
  h3('Sidebar Ringkasan (Sticky)'),
  bullet('Menampilkan program, nominal, dan metode yang dipilih secara real-time'),
  bullet('Total yang akan dibayarkan'),
  bullet('Badge kepercayaan: Transaksi Aman, Terverifikasi, Data Terlindungi'),
  bullet('Kartu Dampak Donasi: contoh nyata dampak tiap nominal'),
  ...spacer(1),
  h2('6.2 Halaman Daftar Relawan (/daftar-relawan)'),
  p('Formulir pendaftaran menjadi relawan Karinakas:'),
  bullet('Nama lengkap (wajib)'),
  bullet('Alamat email (wajib)'),
  bullet('Nomor HP/WhatsApp (wajib)'),
  bullet('Bidang minat: Kegiatan Sosial, Pendidikan, Kesehatan, Bencana, Administrasi, Media'),
  bullet('Motivasi bergabung (opsional, textarea)'),
  ...spacer(1),
  p('Sidebar informasi keuntungan bergabung:'),
  bullet('Pelatihan & pembekalan dasar'),
  bullet('Sertifikat kerelawanan resmi'),
  bullet('Jaringan komunitas sosial'),
  bullet('Pengalaman kerja sosial nyata'),
  bullet('Kepuasan membantu sesama'),
]

const komponen = [
  h1('7. KOMPONEN REUSABLE'),
  p('Komponen reusable adalah bagian kode yang dibuat sekali tapi bisa dipakai berulang kali di banyak halaman, sehingga tidak perlu menulis ulang kode yang sama.'),
  ...spacer(1),
  makeTable(
    ['Komponen', 'File', 'Dipakai Di', 'Fungsi'],
    [
      ['Navbar', 'components/Navbar.jsx', 'Semua halaman publik', 'Menu navigasi atas, berubah sesuai status login'],
      ['Footer', 'components/Footer.jsx', 'Semua halaman publik', 'Bagian bawah dengan info & link'],
      ['CTA', 'components/CTA.jsx', '9 halaman', 'Section ajakan donasi & daftar relawan'],
      ['Breadcrumb', 'components/Breadcrumb.jsx', '8 halaman', 'Navigasi jalur (Beranda > Halaman ini)'],
      ['PageHero', 'components/PageHero.jsx', '8 halaman', 'Header hero setiap halaman dengan gambar atau tanpa'],
      ['KarinakasLogo', 'components/KarinakasLogo.jsx', 'Navbar', 'Logo SVG Karinakas'],
      ['Hero', 'components/Hero.jsx', 'Beranda', 'Hero section khusus halaman beranda'],
      ['Values', 'components/Values.jsx', 'Beranda', 'Section nilai-nilai organisasi'],
      ['Stats', 'components/Stats.jsx', 'Beranda', 'Section statistik dengan counter animasi'],
      ['Kegiatan', 'components/Kegiatan.jsx', 'Beranda', 'Preview 3 kegiatan terbaru'],
      ['Galeri', 'components/Galeri.jsx', 'Beranda', 'Preview galeri foto dengan overlay'],
    ],
    [18, 28, 20, 34]
  ),
  ...spacer(1),
  h2('7.1 Detail Komponen Breadcrumb'),
  p('Komponen yang sebelumnya ditulis ulang di 9 halaman berbeda, sekarang cukup ditulis 1 baris:'),
  ...spacer(1),
  new Paragraph({
    spacing: { after: 80 },
    shading: { fill: LIGHT, type: ShadingType.CLEAR, color: LIGHT },
    children: [
      new TextRun({ text: '// Penggunaan sederhana (2 level):', size: 18, color: GRAY, font: 'Courier New' }),
    ],
  }),
  new Paragraph({
    spacing: { after: 80 },
    shading: { fill: LIGHT, type: ShadingType.CLEAR, color: LIGHT },
    children: [new TextRun({ text: '<Breadcrumb items={[{ label: "Kontak" }]} />', size: 18, color: BLUE, font: 'Courier New' })],
  }),
  new Paragraph({
    spacing: { after: 80 },
    shading: { fill: LIGHT, type: ShadingType.CLEAR, color: LIGHT },
    children: [new TextRun({ text: '// Penggunaan 3 level (BeritaDetail):', size: 18, color: GRAY, font: 'Courier New' })],
  }),
  new Paragraph({
    spacing: { after: 120 },
    shading: { fill: LIGHT, type: ShadingType.CLEAR, color: LIGHT },
    children: [new TextRun({ text: '<Breadcrumb items={[{ label: "Berita", path: "/berita" }, { label: judul, truncate: true }]} />', size: 18, color: BLUE, font: 'Courier New' })],
  }),
  ...spacer(1),
  h2('7.2 Detail Komponen PageHero'),
  p('Menggantikan ~20-30 baris HTML yang berulang di setiap halaman. Mendukung 2 mode:'),
  bullet('Mode Full (dengan gambar): untuk Tentang Kami, Berita, Kegiatan, Galeri, Kontak'),
  bullet('Mode Kompak (tanpa gambar): untuk Donasi, Daftar Relawan'),
  ...spacer(1),
  new Paragraph({
    spacing: { after: 80 },
    shading: { fill: LIGHT, type: ShadingType.CLEAR, color: LIGHT },
    children: [new TextRun({ text: '// Mode full — gambar diambil otomatis dari assets', size: 18, color: GRAY, font: 'Courier New' })],
  }),
  new Paragraph({
    spacing: { after: 80 },
    shading: { fill: LIGHT, type: ShadingType.CLEAR, color: LIGHT },
    children: [new TextRun({ text: '<PageHero label="KONTAK" title={...} desc="..." minHeight="45vh" />', size: 18, color: BLUE, font: 'Courier New' })],
  }),
  new Paragraph({
    spacing: { after: 120 },
    shading: { fill: LIGHT, type: ShadingType.CLEAR, color: LIGHT },
    children: [new TextRun({ text: '<PageHero label="DONASI" title={...} desc="..." image={false} />', size: 18, color: BLUE, font: 'Courier New' })],
  }),
]

const navbar = [
  h1('8. NAVBAR DINAMIS'),
  p('Navbar berubah tampilan secara otomatis berdasarkan status login pengguna:'),
  ...spacer(1),
  makeTable(
    ['Status', 'Tampilan Navbar'],
    [
      ['Belum Login', 'Logo + menu navigasi + tombol "Gabung / Login" merah'],
      ['Login sebagai Pengguna', 'Logo + menu + tombol "Donasi" + avatar dengan dropdown (Daftar Relawan, Donasi, Keluar)'],
      ['Login sebagai Admin', 'Logo + menu + tombol "Admin Panel" + avatar dengan dropdown (Dashboard Admin, Keluar)'],
    ],
    [25, 75]
  ),
  ...spacer(1),
  p('Dropdown avatar menampilkan email pengguna dan pilihan navigasi yang relevan. Tombol logout menghapus data session dan mengarahkan kembali ke beranda.'),
]

const tombol = [
  h1('9. TOMBOL YANG MENGARAH KE LOGIN'),
  p('Semua tombol yang berkaitan dengan aksi "bergabung", "login", atau "jadi relawan" sudah dihubungkan ke halaman login. Lokasinya:'),
  ...spacer(1),
  makeTable(
    ['Lokasi', 'Teks Tombol', 'Route Tujuan'],
    [
      ['Navbar (semua halaman)', 'Gabung / Login', '/login'],
      ['Hero — Beranda', 'Jadi Relawan', '/login'],
      ['Hero — Tentang Kami', 'Jadi Relawan', '/login'],
      ['Hero — Kegiatan', 'Gabung/Login', '/login'],
      ['CTA (semua halaman)', 'Daftar Relawan', '/login'],
    ],
    [35, 30, 35]
  ),
]

const strukturFile = [
  h1('10. STRUKTUR FILE PROYEK'),
  h2('10.1 Struktur Folder Utama'),
  ...spacer(1),
  new Paragraph({
    spacing: { after: 60 },
    shading: { fill: LIGHT, type: ShadingType.CLEAR, color: LIGHT },
    children: [new TextRun({ text: 'frontend_karinakas/', bold: true, size: 20, font: 'Courier New', color: RED })],
  }),
  ...[
    '├── src/',
    '│   ├── assets/         ← gambar (hero.jpeg, dll)',
    '│   ├── components/     ← komponen reusable',
    '│   │   ├── Navbar.jsx',
    '│   │   ├── Footer.jsx',
    '│   │   ├── CTA.jsx',
    '│   │   ├── Breadcrumb.jsx  ← BARU',
    '│   │   ├── PageHero.jsx    ← BARU',
    '│   │   ├── Hero.jsx',
    '│   │   ├── Values.jsx',
    '│   │   ├── Stats.jsx',
    '│   │   ├── Kegiatan.jsx',
    '│   │   ├── Galeri.jsx',
    '│   │   └── KarinakasLogo.jsx',
    '│   ├── context/',
    '│   │   └── AuthContext.jsx  ← BARU (sistem login)',
    '│   ├── data/',
    '│   │   └── beritaData.js   ← data artikel berita',
    '│   ├── pages/',
    '│   │   ├── Home.jsx',
    '│   │   ├── TentangKami.jsx',
    '│   │   ├── Galeri.jsx',
    '│   │   ├── Kegiatan.jsx',
    '│   │   ├── Berita.jsx',
    '│   │   ├── BeritaDetail.jsx',
    '│   │   ├── Kontak.jsx',
    '│   │   ├── Login.jsx       ← BARU',
    '│   │   ├── Register.jsx    ← BARU',
    '│   │   ├── AdminDashboard.jsx ← BARU',
    '│   │   ├── Donasi.jsx      ← BARU',
    '│   │   └── DaftarRelawan.jsx ← BARU',
    '│   ├── App.jsx            ← routing utama',
    '│   ├── main.jsx           ← entry point',
    '│   └── index.css          ← semua styling (~3.500 baris)',
    '├── package.json',
    '└── vite.config.js',
  ].map(line => new Paragraph({
    spacing: { after: 30 },
    shading: { fill: LIGHT, type: ShadingType.CLEAR, color: LIGHT },
    children: [new TextRun({ text: line, size: 18, font: 'Courier New', color: DARK })],
  })),
  ...spacer(1),
  h2('10.2 File Baru yang Ditambahkan'),
  makeTable(
    ['File', 'Kategori', 'Keterangan'],
    [
      ['context/AuthContext.jsx', 'Context', 'Manajemen state login/logout, fungsi register, deteksi role'],
      ['components/Breadcrumb.jsx', 'Komponen', 'Navigasi breadcrumb yang dipakai 8 halaman'],
      ['components/PageHero.jsx', 'Komponen', 'Hero section yang dipakai 8 halaman, 2 mode tampilan'],
      ['pages/Login.jsx', 'Halaman', 'Halaman login dengan visual panel dan form animasi'],
      ['pages/Register.jsx', 'Halaman', 'Pendaftaran akun 2 langkah dengan preview avatar real-time'],
      ['pages/AdminDashboard.jsx', 'Halaman', 'Panel admin dengan sidebar, topbar, statistik, tabel donasi'],
      ['pages/Donasi.jsx', 'Halaman', 'Form donasi 4 langkah dengan ringkasan dan dampak donasi'],
      ['pages/DaftarRelawan.jsx', 'Halaman', 'Form pendaftaran relawan dengan sidebar keuntungan'],
    ],
    [32, 16, 52]
  ),
]

const status = [
  h1('11. STATUS & PEKERJAAN SELANJUTNYA'),
  h2('11.1 Yang Sudah Selesai ✅'),
  bullet('Semua halaman publik (Beranda, Tentang Kami, Galeri, Kegiatan, Berita, Detail Berita, Kontak)'),
  bullet('Halaman Login dengan visual panel animasi dan form'),
  bullet('Halaman Register dengan multi-step form dan validasi real-time'),
  bullet('Sistem autentikasi berbasis role (Admin / Super Admin / User) menggunakan localStorage'),
  bullet('Dashboard Admin lengkap dengan sidebar, topbar, statistik, tabel donasi, feed aktivitas'),
  bullet('Halaman Donasi dengan form 4 langkah dan sidebar ringkasan'),
  bullet('Halaman Daftar Relawan dengan form lengkap'),
  bullet('Navbar dinamis berubah sesuai status login'),
  bullet('Proteksi route: halaman tertentu hanya bisa diakses setelah login'),
  bullet('Komponen reusable: Breadcrumb dan PageHero untuk semua halaman'),
  bullet('Semua tombol login/relawan/gabung sudah terhubung ke halaman login'),
  ...spacer(1),
  h2('11.2 Yang Belum Selesai / Pekerjaan Selanjutnya ⏳'),
  bullet('Integrasi backend/API — semua data saat ini masih dummy/static'),
  bullet('Database pengguna — saat ini menggunakan localStorage (tidak aman untuk production)'),
  bullet('Halaman-halaman admin lainnya (Relawan, Program, Donasi, Berita, Galeri, Pengaturan) — saat ini tampil "Coming Soon"'),
  bullet('Fungsi tombol aksi cepat di dashboard admin belum fungsional'),
  bullet('Sistem pembayaran donasi nyata (QRIS, transfer bank, virtual account) belum terhubung'),
  bullet('Upload file untuk galeri dan foto profil'),
  bullet('Notifikasi real-time'),
  bullet('Pemecahan index.css menjadi file-file terpisah per halaman/fitur'),
  bullet('Pengujian (testing) untuk memastikan semua fungsi berjalan dengan benar'),
  bullet('Optimasi performa (lazy loading gambar, code splitting)'),
  ...spacer(1),
  h2('11.3 Catatan Teknis Penting'),
  boldBullet('index.css', 'File CSS saat ini berisi ~3.500 baris dalam 1 file. Perlu dipecah menjadi file-file terpisah per halaman/fitur agar lebih mudah dikelola'),
  boldBullet('localStorage Auth', 'Hanya untuk prototyping. Untuk production perlu diganti dengan JWT token atau session berbasis server'),
  boldBullet('Data Mock', 'Semua data (berita, donasi, relawan, statistik) adalah data simulasi. Perlu dihubungkan ke API backend yang nyata'),
  boldBullet('heroImg', 'Semua halaman menggunakan 1 gambar hero yang sama (hero.jpeg). Sebaiknya tiap halaman memiliki gambar hero yang relevan'),
  boldBullet('React 19', 'Menggunakan versi terbaru React. Pastikan dependensi lain kompatibel sebelum deploy ke production'),
]

const penutup = [
  h1('12. PENUTUP'),
  p('Frontend Website Karinakas telah berhasil dibangun dengan fitur-fitur yang komprehensif, mencakup sistem navigasi publik, autentikasi multi-role, dashboard admin, dan halaman-halaman khusus pengguna. Desain mengikuti tema warna merah Karinakas (#CC0000) dengan aksen kuning (#FFD700) yang konsisten di seluruh halaman.'),
  ...spacer(1),
  p('Seluruh komponen dibangun dengan mempertimbangkan prinsip reusability (dapat dipakai ulang) dan DRY (Don\'t Repeat Yourself), sehingga pemeliharaan dan penambahan fitur ke depan akan lebih efisien.'),
  ...spacer(1),
  p('Langkah terpenting selanjutnya adalah membangun backend API untuk menggantikan semua data mock, serta mengintegrasikan sistem pembayaran yang aman untuk fitur donasi online.'),
  ...spacer(2),
  divider(),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 200, after: 80 },
    children: [new TextRun({ text: 'Karinakas — Bersama Melayani, Mengasihi, Mengubah Hidup', italics: true, size: 20, color: GRAY, font: 'Calibri' })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'Dokumen ini dibuat otomatis oleh Claude Code • 4 Juni 2026', size: 18, color: GRAY, font: 'Calibri' })],
  }),
]

// ═══════════════════════════════════════════════════════════════════════════════
// BUILD DOCUMENT
// ═══════════════════════════════════════════════════════════════════════════════

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: 'Calibri', size: 22, color: DARK } },
    },
  },
  sections: [
    // ── Halaman Judul ──
    {
      properties: { type: SectionType.NEXT_PAGE },
      children: titlePage,
    },
    // ── Isi Dokumen ──
    {
      properties: { type: SectionType.NEXT_PAGE },
      headers: {
        default: new Header({
          children: [new Paragraph({
            border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: RED } },
            children: [
              new TextRun({ text: 'Laporan Progres Frontend Karinakas', size: 18, color: GRAY, font: 'Calibri' }),
              new TextRun({ text: '  |  ', size: 18, color: GRAY, font: 'Calibri' }),
              new TextRun({ text: 'Juni 2026', size: 18, color: RED, font: 'Calibri' }),
            ],
          })],
        }),
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            border: { top: { style: BorderStyle.SINGLE, size: 4, color: 'E0E0E0' } },
            children: [
              new TextRun({ text: 'Halaman ', size: 18, color: GRAY, font: 'Calibri' }),
              new TextRun({ children: [PageNumber.CURRENT], size: 18, color: GRAY, font: 'Calibri' }),
              new TextRun({ text: ' dari ', size: 18, color: GRAY, font: 'Calibri' }),
              new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18, color: GRAY, font: 'Calibri' }),
            ],
          })],
        }),
      },
      children: [
        ...ringkasan,     divider(),
        ...halamanPublik, divider(),
        ...autentikasi,   divider(),
        ...halLogin,      divider(),
        ...adminDash,     divider(),
        ...halamanUser,   divider(),
        ...komponen,      divider(),
        ...navbar,        divider(),
        ...tombol,        divider(),
        ...strukturFile,  divider(),
        ...status,        divider(),
        ...penutup,
      ],
    },
  ],
})

const buffer = await Packer.toBuffer(doc)
const outputPath = 'Laporan-Progres-Frontend-Karinakas.docx'
writeFileSync(outputPath, buffer)
console.log(`✅ Dokumen berhasil dibuat: ${outputPath}`)
console.log(`📄 Lokasi: d:\\KULIAH\\Sems 7\\SKRIPSI\\TUGAS AKHIR\\Project TA\\frontend_karinakas\\${outputPath}`)
