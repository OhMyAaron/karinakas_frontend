# 🤝 HAND-OFF — Progres Pengerjaan Karinakas (detail)

Dokumen agar **pindah room chat langsung paham** dan bisa **dipelajari mendalam**.
Baca **[CONTEXT.md](CONTEXT.md)** dulu untuk arsitektur & referensi endpoint.

**Diperbarui:** 23 Agustus 2026 · **Status:** fungsional end-to-end, semua modul data ke API; dokumen SKPL Bab I–III selesai; autentikasi diperkeras & pemulihan kata sandi berfungsi nyata; **formulir Kontak dihapus** (diganti WhatsApp) — tidak ada lagi fitur UI yang menggantung.

---

## 1. Cara menjalankan (dev)
```bash
# Terminal 1 — backend
cd tugas_akhir
php artisan serve            # http://127.0.0.1:8000

# Terminal 2 — frontend
cd frontend_karinakas
npm run dev                  # http://localhost:5173

# Bila skema DB berubah / baru clone:
cd tugas_akhir
php artisan migrate          # JANGAN migrate:fresh kalau tak mau data hilang
php artisan storage:link     # agar foto galeri & bukti transfer tampil
```
Login: akun demo ada di CONTEXT.md §3.

---

## 2. Perjalanan pengerjaan (kronologis — biar paham konteksnya)
1. **Awal**: frontend UI sudah ada tapi **pakai localStorage**; backend Laravel **belum jalan** (Sanctum belum terpasang, route API belum didaftarkan, model User rusak, nama file model tidak PSR-4, tak ada CORS/middleware role).
2. **Perbaikan backend total** → bisa jalan: pasang Sanctum, daftarkan route, perbaiki/rename model, CORS, middleware `role`, `Gate::before`, migrasi + seeder. Divalidasi via curl.
3. **Integrasi bertahap** frontend → API, modul demi modul (Auth → Kegiatan → Berita → Galeri → Donasi → Relawan → Pengguna → Dashboard → Notifikasi/Audit), memakai fondasi reusable (`api.js`, `resources.js`, `useResource`).
4. **Penyempurnaan fitur** sesuai permintaan: donasi transfer + bukti, donasi wajib kegiatan, galeri album + lightbox + bulk upload + nama foto + auto-batch, opsi relawan per kegiatan, email relawan-diterima.
5. **UX/branding**: intro screen, font besar, merah lembut, kontras (ramah lansia), tombol publik terhubung, kontak & sosmed asli, loading state.
6. **Dokumentasi**: PROGRESS.md, DEPLOY.md, CONTEXT.md, HANDOFF.md.
7. **Pembayaran QRIS** (Agustus): metode QRIS statis ditambahkan di samping transfer bank; layar instruksi pembayaran dibuat bercabang sesuai metode.
8. **Export rekapan dirapikan** (Agustus): dari CSV mentah → **berkas Excel bertabel**. Dibuat helper bersama `utils/excel.js`; ditambah rekap **Relawan** untuk Super Admin.
9. **Dokumen skripsi** (Agustus): `TESTING.md` (176 kasus uji) lalu naskah **SKPL** lengkap Bab I–III beserta diagram use case dan ERD.
10. **Sinkronisasi database** (23 Agustus): audit skema vs kode, perbaikan counter relawan yang tertinggal, dan **formulir Kontak dihapus** — pertanyaan pengunjung diarahkan ke WhatsApp yang sudah aktif.

---

## 3. Fitur SELESAI ✅ — detail per modul
> Format: **Modul** — apa yang jadi · file frontend kunci · endpoint/backend · logika penting.

### 3.1 Autentikasi
- Login (email/username), register data lengkap, logout, `me`, update profil, ganti sandi; pulihkan sesi saat reload; rute terproteksi + **redirect balik** ke tujuan.
- FE: `context/AuthContext.jsx`, `pages/Login.jsx`, `pages/Register.jsx`, `App.jsx` (`RequireAuth`/`RequireAdmin`).
- BE: `AuthController`, rute `/login /register /me /profile /logout`.
- Catatan: `/me` balikan `{success, user}` → FE baca `res.user`.

### 3.2 Kegiatan (+ opsi relawan per kegiatan)
- Publik: list + modal detail + kuota. Admin: CRUD + ubah status.
- **Admin menentukan opsi Jenis Relawan & Bidang Minat** per kegiatan (editor tag), dipakai form pendaftaran relawan.
- FE: `pages/Kegiatan.jsx`, `pages/admin/SectionKegiatan.jsx` (komponen `TagEditor`), `kegiatanService`.
- BE: `KegiatanController` (validasi `jenis_relawan[]`,`bidang_minat[]`), kolom JSON di `kegiatan`.

### 3.3 Berita/Kampanye
- Publik list + detail + terkait; admin CRUD.
- FE: `pages/Berita.jsx`, `pages/BeritaDetail.jsx`, `pages/admin/SectionBerita.jsx`, `beritaService`.
- BE: `KampanyeController`.

### 3.4 Galeri (album + lightbox + bulk + nama foto)
- Publik **berbasis album per kegiatan** (`judul`) → klik album → semua fotonya → **lightbox** (geser, keyboard, Esc). Tiap foto punya **`nama_foto`**.
- Admin: kelola album, **bulk upload** banyak foto dengan **nama per foto**, **auto-batch 20/request** (aman ratusan foto), **indikator progres**.
- FE: `pages/Galeri.jsx` (publik), `components/Galeri.jsx` (beranda), `pages/admin/SectionGaleri.jsx`, `galeriService` (`list` ambil **semua halaman**, `latest`, `bulkUpload` batching, `update`).
- BE: `GaleriController` (`index/latest/store/bulkUpload/update/destroy`), kolom `nama_foto`.
- Fix penting: dulu publik **nol foto** karena bug reveal-animation + fetch 100. Sudah beres.

### 3.5 Donasi
- **Wajib pilih kegiatan yang membuka donasi** (tak ada donasi umum), **2 metode: QRIS (default) & transfer BNI**, **upload bukti**, riwayat di Profil.
- **QRIS statis** (NMID `ID2026479922646` a.n. YAYASAN KARINAKAS, terminal A01): QR ditampilkan di layar instruksi + tombol simpan gambar + tombol salin nominal + langkah cara bayar. Nominal **tidak** tertanam di QR → donatur mengetik sendiri, lalu unggah bukti untuk diverifikasi admin (sama seperti transfer, bukan payment gateway).
- Gambar QR: `public/qris-karinakas.png` (petunjuk di `public/README-QRIS.txt`). Bila file tak ada, halaman menampilkan pesan ramah + arahan ke transfer bank, bukan gambar rusak.
- Admin: verifikasi status, edit, hapus, **export rekap Excel** (Super Admin; ikut filter aktif + blok ringkasan & total); **nominal disembunyikan untuk Admin biasa**.
- FE: `pages/Donasi.jsx` (konstanta `QRIS` & `BANK`), `pages/admin/SectionDonasi.jsx`, `donasiService`.
- BE: `DonasiController` (`store` cek kegiatan, `uploadBukti`, `index` masking, `update/updateStatus/destroy`), kolom `bukti_transfer`.

### 3.6 Relawan
- Daftar publik (wajib login, data pribadi dari profil); admin verifikasi status & hapus; riwayat di Profil.
- **Export rekap Excel (Super Admin)** — mengikuti filter/pencarian aktif, lengkap dengan ringkasan per status, per jenis, dan per kegiatan. Berisi data pribadi (alamat, HP, KTP) → berkasnya memuat baris PERHATIAN.
- Saat **diterima** → `jumlah_relawan_terdaftar++`, **email otomatis**, catat notifikasi.
- FE: `pages/DaftarRelawan.jsx` (dropdown ikut opsi kegiatan), `pages/admin/SectionRelawan.jsx`, `relawanService`.
- BE: `RelawanController` (`store` validasi opsi kegiatan, `index/updateStatus/destroy`).

### 3.7 Manajemen Pengguna (Super Admin)
- Daftar akun, ubah role, tambah, reset password, hapus. **Anti lock-out** (tak bisa ubah/hapus akun sendiri).
- FE: `pages/admin/SectionPengguna.jsx`, `penggunaService` (map role).
- BE: `AdminController` (`users/storeUser/updateUser/resetUserPassword/deleteUser`, semua super-admin-only).

### 3.8 Dashboard
- Statistik dari `/admin/dashboard` (sadar-peran), breakdown relawan per jenis, tabel donasi/relawan terkini, aktivitas dari data asli, export laporan Excel.
- FE: `pages/AdminDashboard.jsx`, `adminService.dashboard()`.
- BE: `AdminController.dashboard` (nominal hanya super).

### 3.9 Notifikasi & Audit Log
- **Dicatat otomatis di server** (`audit_logs`, `notifikasi_logs`). Panel admin + tab Profil membaca dari API.
- FE: `pages/admin/SectionNotifikasi.jsx`, `SectionAudit.jsx`, `notifikasiService`, `auditService`.
- BE: `AdminController.auditLogs/notifikasiLogs`, model `AuditLog::record()` & `NotifikasiLog::record()` dipanggil di titik aksi.

### 3.10 UI/UX & branding
- **IntroScreen** (scroll story + foto Karinakas + "Mulai Menjelajah", sekali/sesi) — `components/IntroScreen.jsx`.
- Font **18.5px**, merah **#C0392B**, kontras dinaikkan.
- Semua tombol publik terhubung; kontak & sosmed asli; `ConfirmDelete` ada state "Menghapus...".

### 3.11 Export rekapan (Excel)
- Helper bersama **`src/utils/excel.js`** dipakai tiga tempat: rekap **Donasi**, rekap **Relawan**, dan **Laporan Dashboard**. Sebelumnya masing-masing menyalin logika CSV sendiri dan **tak satu pun meng-*escape* nilai** — nama donatur bermuatan `;` bisa menggeser seluruh kolom.
- Berkas berbentuk workbook HTML berekstensi `.xls` (tanpa pustaka tambahan), sehingga bisa mengatur hal yang mustahil di CSV: **lebar kolom auto-fit**, teks membungkus, **baris judul dibekukan**, angka berformat ribuan tapi tetap bisa di-`SUM`, dan **No. KTP / No. HP dipaksa teks** agar 16 digit tidak jadi notasi ilmiah dan angka 0 di depan tidak hilang.
- Isi berkas **mengikuti filter & pencarian yang sedang aktif** di layar; tombol nonaktif bila tidak ada data.
- Ketiganya **hanya untuk Super Admin**.

### 3.12 Pemulihan kata sandi & pengerasan autentikasi (23 Agustus)
- **Pemulihan kata sandi kini berfungsi nyata.** Sebelumnya frontend memakai `localStorage` dan backend hanya berisi `// TODO`, sehingga sandi baru tidak pernah berlaku.
- Alur: `POST /forgot-password {email}` → kode **6 digit** disimpan di cache (`otp_reset:{email}`, TTL **10 menit**) + surel `KodeOtpReset` → `POST /reset-password {email, otp, new_password, new_password_confirmation}` → verifikasi `hash_equals` → sandi diganti → kode dihapus (**sekali pakai**) → **seluruh token lama dicabut** → dicatat ke `notifikasi_logs`.
- FE: `pages/ForgotPassword.jsx` (tidak lagi menyentuh `localStorage`). BE: `AuthController`, `app/Mail/KodeOtpReset.php`, `resources/views/emails/kode-otp-reset.blade.php`.
- **Kata sandi `min:8` di seluruh jalur** dan **`throttle:5,1`** pada empat rute autentikasi.
- Karena `MAIL_MAILER=log`, **kode OTP terbaca di `storage/logs/laravel.log`** selama SMTP belum diisi — ini yang dipakai saat menguji.
- Sudah diuji ujung ke ujung: OTP masuk cache → reset 200 → login sandi baru **berhasil** → login sandi lama **ditolak** → OTP dipakai ulang **ditolak** → percobaan login ke-6 **429**.

### 3.13 Formulir Kontak dihapus — diganti WhatsApp (23 Agustus)
- **Keputusan:** formulir pesan di halaman Kontak **dihapus**, bukan disambungkan ke server. Alasannya WhatsApp sudah aktif dan dipakai; menambah kotak masuk kedua berarti admin harus memantau dua tempat.
- Halaman Kontak kini: kartu **"Hubungi Kami lewat WhatsApp"** (tombol chat + empat pilihan topik yang otomatis mengisi pesan awal via parameter `text=`), alternatif surel, plus informasi kontak & peta yang sudah ada.
- **Tidak ada tabel maupun endpoint** untuk pesan kontak — ini disengaja. Jangan tambahkan lagi tanpa alasan baru.
- FE: `pages/Kontak.jsx` (konstanta `topikWa` + helper `waLink`). Tidak ada state form, tidak ada panggilan API.
- Konsekuensinya halaman Kontak **murni statis** — tidak terpengaruh backend mati.
- **Dokumen skripsi ikut disisir** agar tidak bertentangan: `TESTING.md` (TC-PUB-09 kini menguji kanal WhatsApp; tabel keterbatasan §15 diperbarui), `SKPL.md` Lampiran B, `docs/skpl/3.1` (catatan form + catatan penyusunan) dan `docs/skpl/3.2`. Angka **65 titik akhir** pada SKPL 3.1.4 tetap akurat.

### 3.14 Konsistensi counter relawan (23 Agustus)
- **Akar masalah:** model `Relawan` hanya memasang listener `updated` dan `deleted`. Relawan yang **dibuat langsung berstatus `diterima`** (seeder / impor data) tidak pernah menambah `kegiatan.jumlah_relawan_terdaftar`, sehingga kuota di halaman publik tampak lebih longgar dari kenyataan.
- **Perbaikan:** ditambahkan listener `created` di `app/Models/Relawan.php`. Alur normal aplikasi tidak terpengaruh — pendaftaran baru tetap lahir berstatus `pending`, jadi tidak ada hitungan ganda.
- **Data lama diperbaiki:** kegiatan "Bimbingan Belajar Anak Daerah Terpencil" `0 → 3`.

---

## 4. Notifikasi — status terkini ⚠️ (penting)
- **Email relawan-diterima: SUDAH ada** — `app/Mail/RelawanDiterima.php` + `resources/views/emails/relawan-diterima.blade.php`, dipicu di `RelawanController.updateStatus` saat status → `diterima`.
  - Kini `MAIL_MAILER=log` → email **tertulis ke `storage/logs/laravel.log`** (sudah diuji lengkap). **Isi SMTP di `.env`** (Gmail App Password / Mailtrap) → restart server → terkirim asli.
- **WhatsApp: baru DICATAT**, belum dikirim. Perlu **gateway** (Fonnte/Wablas/WA Cloud API) + API key (belum diputuskan). Titik sambung: `RelawanController.updateStatus` (blok `diterima`).
- **Donasi berhasil**: notifikasi baru dicatat; email/WA nyata belum dipasang (bisa mengikuti pola relawan).

---

## 5. Belum / opsional ⏳

**Temuan audit kode (22 Agustus) — sudah dikerjakan ✅ (lihat §3.12):**
- [x] Panjang kata sandi disamakan **`min:8` di seluruh jalur** (registrasi, ganti, reset, tambah/reset akun oleh super admin) — sisi frontend ikut disesuaikan.
- [x] **Pembatasan laju** `throttle:5,1` pada `/register`, `/login`, `/forgot-password`, `/reset-password`. Diuji: percobaan ke-6 dibalas `429`.
- [x] **Pemulihan kata sandi kini nyata** — backend sebelumnya hanya stub `TODO`; sekarang OTP 6 digit, sekali pakai, berlaku 10 menit.
- [x] **`SESSION_DRIVER` diubah ke `file`** — sebelumnya `database` padahal tabel `sessions` tak pernah dimigrasikan.

**Sudah dikerjakan ✅ (lihat §3.13 & §3.14):**
- [x] **Formulir Kontak dihapus** — diganti kanal WhatsApp. Tidak ada lagi fitur UI yang menggantung.
- [x] **Counter relawan konsisten** — listener `created` ditambahkan, data lama diperbaiki.

**Butuh layanan eksternal / keputusan:**
- [ ] WhatsApp nyata (pilih gateway + API key).
- [ ] Aktifkan email nyata (isi SMTP; kode siap). Terapkan juga untuk donasi-berhasil bila mau.
- [ ] Payment gateway otomatis (QRIS dinamis/VA, verifikasi otomatis) — sekarang QRIS **statis** & transfer, keduanya manual + upload bukti.
- [x] ~~Simpan `public/qris-karinakas.png`~~ — **sudah ada** (267 KB, 8 Agustus 2026). Metode QRIS dapat diuji.

**Kosmetik & produksi:**
- [ ] Template notifikasi admin masih konfigurasi lokal.
- [x] ~~Filter "Jenis" di admin Relawan belum ikut opsi kustom~~ — **sudah beres**. Pilihan jenis kini diambil dari data yang ada, jadi jenis khusus per kegiatan ikut muncul. Sekalian ditambah penyaring **kegiatan** dan **rentang tanggal** di admin Donasi dan Relawan, plus tombol Reset dan penghitung "x dari y data".
- [ ] Keamanan produksi: batasi CORS, `APP_DEBUG=false`, ganti password default, HTTPS (DEPLOY.md).

**Konsistensi dokumen skripsi:**
- [ ] UC-15 pada diagram use case masih terhubung ke Admin saja; Super Admin juga berwenang (grup rute `role:admin,super_admin`).
- [ ] Judul batas sistem pada diagram use case masih "WEBSITE KARINAKAS", sedangkan naskah SKPL memakai "SIKAS".

---

## 6. Perubahan skema DB yang sudah dijalankan
`php artisan migrate` membuat semuanya. Yang notable: `personal_access_tokens` (uuidMorphs); `bukti_transfer` di donasi; tabel `audit_logs` & `notifikasi_logs`; `nama_foto` di galeri; `jenis_relawan`+`bidang_minat` (JSON) di kegiatan + `relawan.jenis` enum→string. (Daftar lengkap di CONTEXT.md §8.)

**Hasil audit sinkronisasi 23 Agustus** — dijalankan langsung ke MySQL, bukan asumsi:
- Seluruh **14 migrasi** berstatus `Ran`; tidak ada migrasi tertunda.
- `$fillable` & `$casts` **kedelapan model cocok penuh** dengan kolom nyata — tidak ada kolom yatim maupun fillable tanpa kolom.
- Enum DB **cocok** dengan konstanta frontend: `KATEGORI_KEGIATAN` (5), `GALERI_KATEGORI` (6), `BERITA_KATEGORI` (7).
- **Tidak ada berkas hilang**: 468 foto galeri & 5 bukti transfer semuanya ada di `storage/`. Satu berkas yatim di `storage/app/public/galeri/` (`hib1InD6Po2D9BQeRtyehzuqlqGfDpEtH0PEKfZK.jpg`) — sisa unggahan gagal, aman dihapus.
- `public/storage` (junction Windows) **sudah terpasang** dan mengarah benar.

---

## 7. Gotcha (hal yang mudah bikin bingung)
- **Foto galeri kosong di publik tapi admin aman** → dulu bug reveal-animation + fetch 100. Sudah diperbaiki (fetch semua halaman, tanpa reveal). Bila masih blank: cek `VITE_API_URL`, `storage:link`, hard refresh.
- **Upload > 20 foto terpotong** → limit PHP `max_file_uploads` (default 20). Diatasi **auto-batch 20/request** (frontend). php.ini dev sudah dinaikkan ke 100.
- **Ganti `VITE_API_URL` harus `npm run build` ulang** (dibakar saat build).
- **JANGAN `migrate:fresh`** di data asli (mengosongkan tabel; foto di `storage/` jadi yatim).
- **`/me` balikan `{success, user}`** (bukan `data`).
- **Backend mati** → gejala "semua data kosong / gagal fetch". Jalankan `php artisan serve`.
- **Email belum sampai inbox** → wajar, `MAIL_MAILER=log`. Isi SMTP dulu.
- **Excel memperingatkan "format dan ekstensi tidak cocok"** saat membuka berkas rekapan → **normal**, tekan *Yes*. Berkasnya workbook HTML ber-ekstensi `.xls`; ini konsekuensi metode tanpa pustaka tambahan.
- **PHP harus 8.3+**, bukan 8.2 (`composer.json` → `"php": "^8.3"`). Di PHP 8.2 `composer install` gagal.
- **Jangan pakai `display:flex` pada kotak berisi kalimat campuran** (teks + `<strong>` + variabel) — tiap potongan jadi item terpisah dan tersusun berkolom. Ini pernah terjadi pada `.dr-privacy-note`; sekarang `display:block`.
- **Istilahnya "responsif", bukan "mobile-first"** — 10 dari 11 *media query* di `index.css` memakai `max-width` (pola *desktop-first*).

---

## 8. Peta file kunci (untuk belajar cepat)
**Frontend (`frontend_karinakas/src/`)**
- Integrasi: `services/api.js`, `services/resources.js`, `hooks/useResource.js`, `context/AuthContext.jsx`
- Util: `utils/excel.js` (helper export tabel Excel bersama: lebar kolom, header beku, format angka & teks)
- Publik: `pages/{Home,Galeri,Kegiatan,Berita,BeritaDetail,Donasi,DaftarRelawan,Profil,Kontak,Login,Register}.jsx`
- Admin: `pages/AdminDashboard.jsx` + `pages/admin/Section{Berita,Kegiatan,Relawan,Galeri,Donasi,Pengguna,Notifikasi,Audit}.jsx` + `pages/admin/shared/{AdminModal,ConfirmDelete}.jsx`
- Komponen: `components/{Navbar,Footer,Hero,CTA,Galeri,Kegiatan,IntroScreen,PageHero,Breadcrumb}.jsx`
- Data/konstanta: `data/store.js` · Style: `index.css`

**Backend (`tugas_akhir/`)**
- Rute: `routes/api.php` · Middleware/alias: `bootstrap/app.php` · Ability: `app/Providers/AppServiceProvider.php`
- Controller: `app/Http/Controllers/*Controller.php`
- Model: `app/Models/*.php` · Email: `app/Mail/RelawanDiterima.php` + `resources/views/emails/`
- Migrasi: `database/migrations/` (14 berkas) · Seeder: `database/seeders/DatabaseSeeder.php`
- Config: `config/cors.php`, `config/logging.php`, `.env` (DB, MAIL)

**Dokumen (`frontend_karinakas/`)**
- `CONTEXT.md` arsitektur & endpoint · `HANDOFF.md` progres · `PROGRESS.md` checklist · `DEPLOY.md` hosting
- `TESTING.md` — 176 kasus uji black-box beserta rekapitulasinya
- `SKENARIO-TUGAS.md` — skenario tugas pengujian kebergunaan bersama pengguna nyata (15 tugas, lembar pengamatan, kuesioner SUS)
- `SKPL.md` — naskah SKPL Bab I & II + catatan penyusunan
- `docs/skpl/` — naskah SKPL Bab III per subbab:
  `3.1-Kebutuhan-Antarmuka-Eksternal.md` · `3.2-Kebutuhan-Fungsional.md` (71 butir) ·
  `3.3-Diagram-Use-Case.md` (23 use case) · `3.4-Kebutuhan-Non-Fungsional.md` (32 butir) ·
  `3.5-Kebutuhan-Data.md` (ERD + kamus data) · `README.md` (indeks + konvensi kode)
- Diagram: `docs/skpl/use-case-diagram.{drawio,png}` dan `docs/skpl/erd-diagram.{drawio,png}`

**Konvensi kode dokumen SKPL** (dipakai lintas bab, jangan tertukar):
`F-01…F-21` fungsi produk · `K-01…K-20` kekangan · `A-01…A-08` asumsi · `D-01…D-06` kebergantungan ·
`FR SIKAS 101…608` kebutuhan fungsional · `NFR 3.4.x.y` non-fungsional · `UC-01…UC-23` use case · `AK-01…AK-05` aktor.

---

## 9. Langkah berikutnya (saran urutan)
1. ~~Simpan `public/qris-karinakas.png`~~ — **sudah tersedia**, blok TC-DON-10 sampai TC-DON-16 di TESTING.md kini dapat dijalankan.
2. ~~Beresi temuan audit di §5~~ — **sudah selesai semua** (§3.12–§3.14), termasuk penyisiran naskah SKPL & TESTING.md. NFR 3.4.4.1 & 3.4.4.5 kini terpenuhi. Lampiran B pada `SKPL.md` **tidak lagi menyisakan hal yang perlu diputuskan penyusun**.
3. **Aktifkan email nyata**: isi SMTP `.env` (Mailtrap untuk uji) → approve relawan → cek email masuk.
4. **Jalankan pengujian** memakai TESTING.md, isi kolom Status, lalu salin rekapitulasinya ke bab pengujian skripsi.
5. **Pilih gateway WhatsApp** → sambungkan pengiriman WA di `RelawanController.updateStatus` (blok `diterima`).
6. (Opsional) email **donasi berhasil** mengikuti pola relawan (di `DonasiController.updateStatus`).
7. **Deploy** sesuai DEPLOY.md: `VITE_API_URL`, `storage:link`, CORS, SPA fallback, `max_file_uploads`, `APP_DEBUG=false`.

> Untuk melanjutkan di room chat baru: cukup instruksikan *"baca CONTEXT.md & HANDOFF.md di frontend_karinakas"*.
