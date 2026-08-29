# 📋 Progress & Todo — Website Yayasan Karinakas

**Proyek:** Sistem Informasi Yayasan Karinakas (Skripsi/TA)
**Update terakhir:** 7 Agustus 2026 · **Status:** fungsional end-to-end, semua modul data sudah ke API

| Bagian | Teknologi | Lokasi folder |
|---|---|---|
| Frontend | React 19 + Vite + Bootstrap 5 | `frontend_karinakas/` |
| Backend  | Laravel 13 + Sanctum + MySQL | `tugas_akhir/` |

> Dokumen ini = **checklist ringkas**. Untuk detail per modul & cara melanjutkan → **[HANDOFF.md](HANDOFF.md)**.
> Untuk arsitektur, skema DB & daftar endpoint → **[CONTEXT.md](CONTEXT.md)**. Untuk hosting → **[DEPLOY.md](DEPLOY.md)**.
> Untuk use case & skenario pengujian → **[TESTING.md](TESTING.md)**.

---

## 🚀 Cara Menjalankan

```bash
# 1) Backend (terminal 1)
cd tugas_akhir
php artisan serve            # http://127.0.0.1:8000

# 2) Frontend (terminal 2)
cd frontend_karinakas
npm run dev                  # http://localhost:5173

# Jika skema DB berubah / baru clone:
cd tugas_akhir
php artisan migrate          # ⚠️ JANGAN migrate:fresh kalau tak mau data hilang
php artisan storage:link     # agar foto galeri & bukti transfer tampil
```

> ⚠️ Frontend memanggil API, jadi **backend wajib menyala** saat login & membuka data.
> URL API diatur di `frontend_karinakas/.env` → `VITE_API_URL` (**dibakar saat `npm run build`**).

### Akun demo (dari seeder backend)
| Role | Email | Username | Password |
|---|---|---|---|
| Super Admin | `superadmin@karinakas.org` | `superadmin` | `password123` |
| Admin | `admin@karinakas.org` | `admin` | `password123` |
| User | `user1@test.com` … `user10@test.com` | `user1`…`user10` | `password123` |

> Login bisa pakai **email atau username**. Rekening donasi: **BNI 725318271 a.n. Aaron Risang Panji Bharata**.

---

## ✅ SUDAH SELESAI

### Frontend (UI)
- [x] Halaman publik: Beranda, Tentang Kami, Galeri, Kegiatan, Berita (+ detail), Kontak
- [x] Autentikasi: Login, Register (2 langkah, data lengkap), Logout, Forgot Password (simulasi OTP)
- [x] Halaman Profil pengguna (info pribadi, riwayat donasi, kegiatan relawan, notifikasi)
- [x] Donasi (pilih kegiatan + tujuan + nominal + transfer + upload bukti)
- [x] Daftar Relawan (jenis, keterbatasan, kemampuan, kuota per kegiatan)
- [x] Dashboard Admin + Super Admin (sidebar, statistik, role-based)
- [x] Section admin: Berita, Kegiatan, Relawan, Galeri, Donasi, Pengguna, Notifikasi, Audit Log
- [x] Komponen reusable: Breadcrumb, PageHero, CTA, Logo (pakai gambar asli)
- [x] Kegiatan: kategori + flag butuh relawan / butuh donasi + kuota relawan

### Backend (Laravel)
- [x] Perbaikan fatal: model User, rename file model (PSR-4), pasang Sanctum, daftarkan route API, CORS
- [x] Skema DB diselaraskan dengan kebutuhan frontend (field baru di users, kegiatan, kampanye, donasi, relawan, galeri)
- [x] Auth API: register (data lengkap), login (email/username), logout, me, update profil, ganti sandi
- [x] CRUD: kegiatan, kampanye/berita, galeri, donasi, relawan, users (middleware `role:admin,super_admin`)
- [x] Kolom & endpoint upload **bukti transfer** donasi + `storage:link`
- [x] Seeder data contoh + akun demo

### Integrasi Frontend ↔ Backend (semua sudah ke database)
- [x] **Autentikasi** — login/register/logout/profil + token Sanctum + pulihkan sesi + redirect balik ke tujuan
- [x] **Kegiatan** — publik (list + modal + kuota) & admin (CRUD + ubah status)
- [x] **Berita** — publik (list + detail + terkait) & admin (CRUD)
- [x] **Galeri** — publik (grid) & admin (CRUD)
- [x] **Donasi** — **wajib pilih kegiatan yang membuka donasi** (tidak ada donasi umum), transfer BNI, **upload bukti**, riwayat di Profil
- [x] **Admin Donasi** — daftar dari API, verifikasi status (pending→berhasil), lihat **bukti transfer**, edit (Super Admin), hapus, export rekap CSV, masking nominal untuk Admin biasa
- [x] **Relawan** — form publik kirim ke API (wajib login, data pribadi dari profil), admin verifikasi status & hapus, riwayat di tab Profil "Kegiatan Relawan"
- [x] **Manajemen Pengguna** (Super Admin) — daftar akun asli, ubah role, tambah akun, reset password, hapus (+ proteksi anti lock-out: tidak bisa ubah/hapus akun sendiri)
- [x] **Statistik Dashboard** — kartu statistik, breakdown relawan per jenis, tabel donasi/relawan terkini, aktivitas & export laporan dari `/admin/dashboard` (nominal hanya untuk Super Admin)
- [x] **Notifikasi & Audit Log** — dicatat **otomatis di server** (tabel `audit_logs` & `notifikasi_logs`); panel admin Notifikasi/Audit & tab Notifikasi di Profil membaca dari API
- [x] Fondasi reusable: `services/api.js`, `services/resources.js`, `hooks/useResource.js`

### Penyempurnaan fitur (Agustus 2026)
- [x] **Galeri berbasis album** — publik dikelompokkan per kegiatan (`judul`) → klik album → semua fotonya → **lightbox** (geser, keyboard, Esc)
- [x] **Nama per foto** (`nama_foto`) — diisi saat upload, tampil di publik & bisa diedit admin
- [x] **Bulk upload galeri** dengan **auto-batch 20 foto/request** + indikator progres (aman untuk ratusan foto, menyiasati `max_file_uploads` PHP)
- [x] Fix galeri publik kosong (bug reveal-animation + fetch dibatasi 100) → kini **ambil semua halaman**
- [x] **Opsi relawan per kegiatan** — admin menentukan Jenis Relawan & Bidang Minat (komponen `TagEditor`), dipakai & divalidasi di form pendaftaran relawan
- [x] **Email otomatis "Relawan Diterima"** — `app/Mail/RelawanDiterima.php` + template Blade, dipicu di `RelawanController.updateStatus`; saat status → `diterima` juga `jumlah_relawan_terdaftar++` & catat notifikasi
- [x] **UI/UX & branding** — IntroScreen (scroll story, sekali per sesi), font 18.5px, merah `#C0392B`, kontras dinaikkan (ramah lansia), semua tombol publik terhubung, kontak & sosmed asli, loading state & `ConfirmDelete` "Menghapus..."
- [x] **Pembayaran QRIS** — metode QRIS (statis, NMID `ID2026479922646` a.n. YAYASAN KARINAKAS) di halaman Donasi: pilihan metode QRIS/Transfer BNI, tampil QR + tombol simpan gambar + salin nominal + langkah cara bayar, lalu upload bukti seperti alur transfer. Gambar QR: `public/qris-karinakas.png`
- [x] **Export rekapan jadi tabel Excel rapi** — helper bersama `src/utils/excel.js`: lebar kolom diatur (teks tak terpotong), header tebal berwarna & dibekukan, angka berformat ribuan tapi tetap bisa di-SUM, No. KTP/No. HP dipaksa teks (16 digit tidak jadi notasi ilmiah, angka 0 di depan tidak hilang), status diberi warna, plus blok RINGKASAN & CATATAN. Dipakai rekap **Donasi**, **Relawan** (Super Admin), dan **Laporan Dashboard**; semuanya mengikuti filter & pencarian yang aktif
- [x] **Dokumentasi** — CONTEXT.md, HANDOFF.md, DEPLOY.md, PROGRESS.md

---

## ⏳ BELUM SELESAI (Todo berikutnya)

### Layanan eksternal (perlu keputusan/akun)
- [ ] **Aktifkan email nyata** — kode siap, tinggal isi SMTP di `tugas_akhir/.env` (Mailtrap untuk uji / Gmail App Password). Sekarang `MAIL_MAILER=log` → email tertulis ke `storage/logs/laravel.log` (sudah diuji, isinya lengkap)
- [ ] **WhatsApp nyata** — sekarang baru **dicatat**, belum dikirim. Perlu gateway (Fonnte/Wablas/WA Cloud API) + API key. Titik sambung: `RelawanController.updateStatus` (blok `diterima`)
- [ ] *(opsional)* Email/WA **donasi berhasil** mengikuti pola relawan → `DonasiController.updateStatus`
- [x] **Forgot password / OTP** ✅ nyata sejak 23 Agustus — OTP 6 digit, berlaku 10 menit, sekali pakai, token lama dicabut
- [ ] **Payment gateway** otomatis (QRIS dinamis / Virtual Account dengan verifikasi otomatis) — saat ini QRIS statis & transfer, keduanya manual + upload bukti

### Kosmetik / opsional
- [ ] Template notifikasi di panel admin masih konfigurasi lokal (teks saja, bukan data transaksional)
- [ ] Filter "Jenis" di admin Relawan belum ikut opsi kustom per kegiatan

### Keamanan & produksi (tahap akhir — detail di DEPLOY.md)
- [ ] Batasi CORS ke domain frontend (sekarang izinkan semua origin untuk dev)
- [ ] `APP_ENV=production` + `APP_DEBUG=false` (sekarang `local`/`true`)
- [ ] Ganti password default akun admin setelah seed
- [ ] HTTPS, SPA fallback, `storage:link`, `max_file_uploads=100` di server
- [ ] Enkripsi data sensitif + rate limiting tambahan

---

## 🗂️ Struktur penting

```
frontend_karinakas/
├── .env                      # VITE_API_URL
├── src/
│   ├── services/
│   │   ├── api.js            # klien fetch + token + upload
│   │   └── resources.js      # mapper field BE↔FE + CRUD per resource
│   ├── hooks/useResource.js  # hook data async (list + CRUD)
│   ├── context/AuthContext.jsx
│   ├── pages/                # halaman publik + pages/admin/Section*.jsx
│   ├── components/           # Navbar, Footer, Hero, IntroScreen, Galeri, ...
│   └── data/store.js         # konstanta (STATUS_*, KATEGORI_*, fmtRp, fmtTanggal)
tugas_akhir/
├── app/Http/Controllers/     # auth, kegiatan, kampanye, donasi, relawan, galeri, admin, notifikasi
├── app/Models/               # User, Kegiatan, Kampanye, Donasi, Relawan, Galeri, AuditLog, NotifikasiLog
├── app/Mail/                 # RelawanDiterima (+ resources/views/emails/)
├── database/migrations/      # 14 migrasi (lihat CONTEXT.md §8)
└── routes/api.php            # semua endpoint /api/v1/...
```

---

## 📝 Catatan & riwayat perbaikan

### Gotcha yang sering bikin bingung
- **Backend mati** → gejalanya "semua data kosong / gagal fetch". Jalankan `php artisan serve`.
- **Ganti `VITE_API_URL`** harus `npm run build` ulang (nilainya dibakar saat build).
- **`/me` balikan `{success, user}`** (bukan `data`) → frontend baca `res.user`.
- **Email belum sampai inbox** → wajar, `MAIL_MAILER=log`. Isi SMTP dulu.
- **Upload > 20 foto terpotong** → limit PHP `max_file_uploads` (default 20); sudah diatasi auto-batch di frontend, php.ini dev dinaikkan ke 100.
- **JANGAN `migrate:fresh`** di data asli — tabel kosong & foto di `storage/` jadi yatim.
- Beberapa data uji coba mungkin masih ada di database (mis. "Kegiatan Tes Integrasi", donasi tes) — bisa dihapus lewat panel admin.

### Perbaikan bug backend (16 Juni 2026)
- **Log channel `notifikasi` tidak ada** → ditambahkan di `config/logging.php`. Sebelumnya, saat donasi diverifikasi "berhasil" (memicu notifikasi), Laravel mencatat error `Log [notifikasi] is not defined` dan jatuh ke emergency logger. Sekarang ditulis ke `storage/logs/notifikasi.log`.
- **`rekapanRelawan` bisa crash** bila ada relawan umum (tanpa kegiatan) karena akses `->kegiatan->judul` pada nilai null → dibuat null-safe ("Relawan Umum").
- Fitur status akun "Aktif/Nonaktif" di Manajemen Pengguna dihapus (tidak ada kolomnya di tabel `users`); fokus ke role, agar tak perlu migrasi tambahan.

### Perbaikan & penambahan (7 Agustus 2026)
- Galeri publik kosong → penyebabnya reveal-animation + fetch dibatasi 100 item; kini ambil semua halaman tanpa reveal.
- Migrasi baru: `add_nama_foto_to_galeri_table`, `add_relawan_options_to_kegiatan` (kolom JSON `jenis_relawan` & `bidang_minat` di kegiatan; `relawan.jenis` enum → string).
