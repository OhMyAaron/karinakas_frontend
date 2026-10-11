# 🧭 CONTEXT — Website Yayasan Karinakas

Referensi **keadaan sistem saat ini** (frontend + backend). Isi berkas ini menjawab *"sistemnya seperti apa"*.
Untuk riwayat pengerjaan, masalah terbuka, dan langkah berikutnya, baca **[HANDOFF.md](HANDOFF.md)**.

**Diperbarui:** 11 Oktober 2026

> **Untuk AI / room chat baru:** baca berkas ini lalu `HANDOFF.md` (blok 🆕 di awalnya merangkum sesi 6–11 Okt) lalu
> `D:\KULIAH\Sems 7\SKRIPSI\TUGAS AKHIR\docs\final\_PROGRES.md`. Semua pernyataan teknis di sini
> sudah diverifikasi langsung ke kode, basis data, atau situs yang berjalan — bukan dari ingatan.
> Bila berbeda dengan kode, **kode yang benar**; laporkan perbedaannya.
>
> 📁 **Folder `docs/` tidak lagi di repo ini** (dipindah penyusun 9 Okt) — kini `D:\KULIAH\Sems 7\SKRIPSI\TUGAS AKHIR\docs\`.
> Semua jalur `docs/...` di berkas ini berarti lokasi baru itu.
> ⚠️ Hal yang ditulis di sini adalah **kode di repo (commit 9 Okt)**; **apakah sudah aktif di karinakas.com belum terverifikasi**.

---

## 1. Apa ini?

Website **Yayasan Karinakas** — lembaga sosial di bawah Keuskupan Agung Semarang yang berkantor di Sleman, DIY,
bergerak di pelayanan lansia, kesehatan, pendidikan, dan sosial. Dikerjakan sebagai **skripsi/tugas akhir**
dengan pendekatan *Human-Centered Design*.

- **Penyusun:** Aaron Risang Panji Bharata (NPM 220711818), GitHub `OhMyAaron`.
- **Situs live:** **https://karinakas.com** (frontend dan backend satu domain).
- **Nama produk di dokumen:** SKPL memakai **SIKAS**, DPPL memakai **Website Karinakas**.

| Pengguna | Yang bisa dilakukan |
|---|---|
| **Pengunjung** | Profil yayasan, kegiatan, berita, galeri album, kontak (WhatsApp & surel) |
| **Pengguna terdaftar** | Donasi (QRIS/transfer + unggah bukti), daftar relawan, profil, riwayat, notifikasi, pemulihan kata sandi |
| **Admin** | Kelola kegiatan, berita, galeri; verifikasi relawan; **memantau** donasi tanpa data keuangan |
| **Super Admin** | Semua kewenangan admin + **verifikasi donasi & data keuangan**, manajemen pengguna, jejak audit, ekspor rekap |

---

## 2. Arsitektur & teknologi

| Lapisan | Teknologi | Folder / repo |
|---|---|---|
| **Frontend** (SPA) | React 19, Vite 8, Bootstrap 5.3, React Router 7 | `frontend_karinakas/` |
| **Backend** (REST API) | **Laravel 13**, Sanctum (token), **PHP ≥ 8.3** | `tugas_akhir/` → `github.com/OhMyAaron/karinakas_backend` |
| **Basis data** | MySQL, database `karinakas` | dev: Laragon porta **3307** |
| **Surel** | SMTP kotak surel hosting `noreply@karinakas.com` | lihat §10 |

```
Browser ──► https://karinakas.com/            → React SPA (dist/, SPA fallback lewat .htaccess)
        ──► https://karinakas.com/api/index.php/api/v1/...  → Laravel API ──► MySQL
        ──► https://karinakas.com/api/storage/...           → foto galeri & bukti transfer
Laravel ──► mail.karinakas.com (SMTP) ──► kotak masuk pengguna
```

### Alamat API (penting — sering salah)
- Rute Laravel = prefix `/api` (dari `bootstrap/app.php`) **+** grup `v1` (dari `routes/api.php`).
- **Produksi** (`frontend_karinakas/.env`):
  ```env
  VITE_API_URL=/api/index.php/api/v1
  VITE_STORAGE_URL=/api/storage
  ```
  `index.php` ada di alamat karena backend di hosting dilayani tanpa *URL rewrite*.
- **Pengembangan** (`frontend_karinakas/.env.development`): `VITE_API_URL=http://127.0.0.1:8000/api/v1`.
- `resources.js` membentuk alamat foto dari `VITE_STORAGE_URL`; bila kosong, memotong akhiran `/api/v1` dari
  `VITE_API_URL` lalu menggantinya dengan `/storage`.
- **Kedua nilai dibakar saat `npm run build`** — mengubahnya di peladen tidak berpengaruh.

---

## 3. Autentikasi & peran

- **Sanctum bearer token** disimpan di `localStorage` kunci **`kk_token`**, dikirim sebagai `Authorization: Bearer ...`.
- **Masuk** memakai **email atau username** (frontend mengirim `email` bila ada `@`, selain itu `username`).
- **Peran:** `user`, `admin`, `super_admin` (backend) ↔ `user`, `admin`, `superadmin` (frontend).
- **`Gate::before`** di `AppServiceProvider` meloloskan **semua** `$this->authorize()` untuk admin dan super admin.
  Akibatnya pembatasan khusus super admin **wajib dicek manual** di controller (`isSuperAdmin()` /
  `wajibSuperAdmin()`) — pola ini dipakai konsisten sejak 19 Sept di `storeUser`, `updateUser`,
  `resetUserPassword`, `users`, dan `deleteUser` (`AdminController`), serta `updateStatus`/`update`/`destroy`
  (`DonasiController`). **Perbaikan `users()`/`deleteUser()` sudah diuji lokal tapi belum di-deploy** — lihat
  HANDOFF §4.7/§5.
- **Kata sandi minimal 8 karakter** di seluruh jalur.

### Pembatasan laju (pembatas bernama di `AppServiceProvider`)
| Nama | Rute | Batas per IP |
|---|---|---|
| `masuk` | `/register`, `/login` | 5 / menit |
| `lupa-sandi` | `/forgot-password` | 5 / menit |
| `reset-sandi` | `/reset-password`, `/reset-password/check` | 20 / menit |

Harus bernama: `throttle:5,1` polos berkunci *domain|IP* sehingga semua rute berbagi satu jatah.

### Akun demo (seeder)
| Peran | Email | Username | Sandi |
|---|---|---|---|
| Super Admin | `superadmin@karinakas.org` | `superadmin` | `password123` |
| Admin | `admin@karinakas.org` | `admin` | `password123` |
| User | `user2@test.com` … `user10@test.com` | `user2`…`user10` | `password123` |

`user1@test.com` **tidak ada** di basis data. Ada juga akun nyata penyusun (`panjiaaron@gmail.com`, `buatsteam222@gmail.com`).

---

## 4. Struktur frontend

```
src/
├── services/api.js         # klien fetch + token + penanganan galat
├── services/resources.js   # INTI integrasi: mapper BE↔FE + service per resource + ambilSemuaHalaman()
├── hooks/useResource.js    # hook data async
├── context/AuthContext.jsx # login/register/logout/me/updateProfile
├── utils/excel.js          # pembangkit berkas rekap .xls (workbook HTML)
├── data/store.js           # konstanta STATUS_*, KATEGORI_*, fmtRp, fmtTanggal
├── data/lembaga.js         # ALAMAT, ALAMAT_LENGKAP, PETA_SEMATAN, PETA_TAUTAN
├── pages/                  # halaman publik
├── pages/admin/Section*.jsx# panel admin
├── pages/admin/shared/     # AdminModal, ConfirmDelete, useCrud, usePaging.js (paging+urutan), AdminPager.jsx (AdminSort, AdminPager)
└── components/             # Navbar, Footer, KarinakasLogo, IntroScreen, ...
public/
├── .htaccess               # SPA fallback Apache (ikut tersalin ke dist/)
├── karinakas-logo.png, favicon-karinakas.png, apple-touch-icon.png
└── qris-karinakas.png      # gambar QRIS statis
```

- **Halaman publik:** Home, TentangKami, Galeri, Kegiatan, Berita, BeritaDetail, Kontak, Login, Register,
  **ForgotPassword**, **ResetPassword**, Donasi, DaftarRelawan, Profil.
- **Panel admin:** `AdminDashboard.jsx` merender `Section{Berita,Kegiatan,Relawan,Galeri,Donasi,Pengguna,Notifikasi,Audit}.jsx`.
- **Service:** `kegiatanService`, `beritaService`, `galeriService`, `donasiService`, `relawanService`,
  `penggunaService`, `notifikasiService`, `auditService`, `adminService`.
- **Semua daftar admin memuat seluruh halaman** (`ambilSemuaHalaman()`: kegiatan, berita, donasi, relawan, pengguna, notifikasi, audit; galeri
  punya pemuat sendiri 300/halaman), karena penyaringan dikerjakan di peramban. (Sebelum 9 Okt kegiatan/berita/notifikasi/audit/pengguna hanya
  memuat 100 baris pertama dan pengguna 20.)
- **Paging + urutan di 8 bagian admin** (`usePaging(items, getDate, resetKey, ukuranAwal)` + `<AdminSort>`/`<AdminPager>`): 10/20/50 per halaman
  (Galeri 12 kartu), urutan **Terbaru/Terlama** menurut `tanggal`/`publishedAt`/`tanggalRaw`/`createdAt`. Hanya memengaruhi tampilan;
  **Export Rekap tetap memakai seluruh data tersaring**. State halaman disesuaikan saat render (bukan `useEffect`).

---

## 5. Struktur backend

```
tugas_akhir/
├── app/Models/              # User, Kegiatan, Kampanye, Galeri, Donasi, Relawan, AuditLog, NotifikasiLog
├── app/Http/Controllers/    # Auth, Kegiatan, Kampanye, Galeri, Donasi, Relawan, Admin, Notifikasi
├── app/Http/Middleware/     # RoleMiddleware (alias `role` di bootstrap/app.php)
├── app/Mail/                # RelawanDiterima, TautanResetSandi, DonasiDiverifikasi (baru 7 Okt)
├── app/Providers/           # AppServiceProvider: Gate::before + pembatas laju bernama
├── resources/views/emails/  # relawan-diterima, tautan-reset-sandi, donasi-diverifikasi
├── config/app.php           # frontend_url ← FRONTEND_URL
├── routes/api.php
└── database/{migrations,seeders}
```

- **PK semua model = UUID** (`HasUuids`), kecuali `personal_access_tokens` (bigint bawaan Sanctum).
- **Nama berkas PHP wajib sama persis dengan nama kelas** (hosting Linux peka huruf besar/kecil).

### Controller & fungsi
| Controller | Fungsi |
|---|---|
| **AuthController** | `register, login, logout, me, updateProfile, changePassword, forgotPassword, checkResetToken, resetPassword` + privat `kunciToken, kunciTokenPengguna, ambilDataTautan` |
| **KegiatanController** | `index, show, store, update, destroy, search, availableForVolunteer, updateStatus` |
| **KampanyeController** | `index, show, store, update, destroy, search, byKategori, recent` |
| **GaleriController** | `index, byKegiatan, latest, store, bulkUpload, update, destroy, search` |
| **DonasiController** | `store, uploadBukti, myDonations, index, report, update, destroy, updateStatus, search` + privat `sembunyikanKeuangan, wajibSuperAdmin` |
| **RelawanController** | `store, myRegistrations, status, cancel, index, pending, byKegiatan, updateStatus, destroy` |
| **AdminController** | `dashboard, users, storeUser, updateUser, resetUserPassword, deleteUser, auditLogs, notifikasiLogs, rekapanRelawan, rekapanKegiatan, rekapanDonasi, exportRekapan` |
| **NotifikasiController** | `myNotifications, kirimNotifikasiDonasi` (**kini mengirim surel nyata** sejak 7 Okt; `null` bila sudah terkirim, 422 bila status bukan `berhasil`) + privat `kirimEmail` (`Mail::to()->send(DonasiDiverifikasi)`), `getTemplate` (tak dipanggil lagi), `logNotifikasi` (kanal log `notifikasi`) + kerangka `kirimNotifikasiRegistrasi/Relawan/PembatalanKegiatan/KeAdmin` (masih TODO) |

---

## 6. Model & kolom

| Model | Kolom |
|---|---|
| **User** | nama_lengkap *(varchar 100)*, email, username, password, role, jenis_kelamin, tanggal_lahir, usia, no_telepon, alamat, kota, tentang, asal_paroki |
| **Kegiatan** | judul, deskripsi, lokasi, kategori, gambar_url, tanggal_mulai, tanggal_selesai, status, butuh_relawan, butuh_donasi, kuota_relawan, jenis_relawan *(JSON)*, bidang_minat *(JSON)*, jumlah_relawan_terdaftar |
| **Kampanye** (berita) | judul, konten, ringkasan, gambar_url, penulis, penulis_avatar, tags, waktu_baca, kategori, status, tanggal_publish |
| **Galeri** | kegiatan_id, judul *(= nama album)*, nama_foto, deskripsi, gambar_url, kategori, tanggal, tipe |
| **Donasi** | user_id, kegiatan_id, jumlah, metode_pembayaran, status_pembayaran, keterangan, tujuan_donasi, biaya_transfer, kode_transaksi, rekening_pengirim, bukti_transfer, anonim, notifikasi_terkirim, tanggal_donasi |
| **Relawan** | user_id, kegiatan_id, jenis, minat, kemampuan_diri, motivasi, nomor_ktp, kebutuhan_khusus, status, tanggal_daftar |
| **AuditLog** | user_id, user_nama, aksi, target |
| **NotifikasiLog** | user_id, tipe *(email/system)*, penerima, judul, isi, trigger, status *(terkirim/gagal)* |

**Status:** Kegiatan `aktif/selesai/dibatalkan` · Donasi `pending/berhasil/gagal` · Relawan `pending/diterima/ditolak` · Kampanye `draft/published/archived`.

**Relasi & ON DELETE:** `donasi.user_id` CASCADE · `donasi.kegiatan_id` SET NULL · `galeri.kegiatan_id` SET NULL ·
`relawan.user_id` CASCADE · `relawan.kegiatan_id` CASCADE · `audit_logs`/`notifikasi_logs` sengaja **tanpa** FK.
Unik gabungan `relawan(user_id, kegiatan_id)`.

**Migrasi (14 berkas):** users, kegiatan, `craete_kampanye` *(salah ketik dibiarkan)*, donasi, relawan, galeri,
personal_access_tokens *(uuidMorphs)*, add_bukti_transfer, audit_logs, notifikasi_logs, add_nama_foto,
add_relawan_options_to_kegiatan, + cache & jobs. **Jangan pernah `migrate:fresh`** di data asli.

---

## 7. Endpoint (`/api/v1`)

> 🔒 **Rute publik `/kegiatan` dan `/kegiatan/{id}` tidak boleh memuat relasi `relawan`** (nomor KTP, telepon, surel, alamat). Sebelum 11 Okt keduanya memuatnya (terbukti di situs live);
> diperbaiki di kode 11 Okt (belum di-commit/deploy) dengan tes regresi `tests/Feature/KegiatanPublikTidakMembocorkanRelawanTest.php`. Jumlah relawan publik = kolom `jumlah_relawan_terdaftar`.

### Publik
| Method | Path | Keterangan |
|---|---|---|
| POST | `/register`, `/login` | pembatas `masuk` |
| POST | `/forgot-password` | kirim tautan reset · pembatas `lupa-sandi` |
| POST | `/reset-password/check` | periksa keabsahan tautan · `reset-sandi` |
| POST | `/reset-password` | simpan sandi baru · `reset-sandi` |
| GET | `/kegiatan`, `/kegiatan/{id}`, `/kegiatan/available/volunteer` | |
| GET | `/kampanye`, `/kampanye/{id}`, `/kampanye/kategori/{k}`, `/kampanye/recent/list` | |
| GET | `/galeri`, `/galeri/kegiatan/{id}`, `/galeri/latest/list` | |

### Pengguna terdaftar (`auth:sanctum`)
`GET /me` *(balikan `{success, user}`)* · `POST /logout` · `PUT /profile` · `POST /change-password` ·
`POST /donasi` · `POST /donasi/{id}/bukti` · `GET /donasi/my-donations` · `POST /relawan` ·
`GET /relawan/my-registrations` · `GET /relawan/{id}/status` · `DELETE /relawan/{id}/cancel` ·
`GET /notifikasi/my-notifications`

### Admin & Super Admin (`role:admin,super_admin`)
| Path | Keterangan |
|---|---|
| `/admin/dashboard` | statistik; total nominal hanya untuk super admin |
| `/admin/kegiatan`, `/admin/kampanye`, `/admin/galeri` (+`/upload`, `/search`) | CRUD konten |
| `GET /admin/donasi`, `/search`, `/report` | data keuangan disembunyikan untuk admin biasa |
| `PUT/DELETE /admin/donasi/{id}`, `PATCH /{id}/status` | **khusus super admin** (403 untuk admin) |
| `/admin/relawan`, `/pending`, `/kegiatan/{id}`, `PATCH /{id}/status`, `DELETE /{id}` | kelola relawan |
| `/admin/notifikasi`, `/admin/audit` | riwayat notifikasi · jejak audit *(audit khusus super admin)* |
| `/admin/users`, `/{id}`, `POST /{id}/reset-password` | manajemen pengguna, **khusus super admin** — `users()`/`deleteUser()` diberi `isSuperAdmin()` 19 Sept (kode lokal; belum di-deploy, lihat HANDOFF §4.7) |
| `/admin/rekapan/{relawan,kegiatan,donasi}`, `POST /export` | **tidak dipakai klien**; `export` masih kerangka |

Webhook: `POST /v1/webhook/payment/callback`, `POST /v1/webhook/notifikasi/donasi/{id}`.

---

## 8. Logika bisnis penting

- **Pemulihan kata sandi = tautan sekali pakai (bukan OTP).**
  `POST /forgot-password {email}` → token acak 64 karakter; yang disimpan di cache hanya **sidik SHA-256**
  (`reset_sandi:{sidik}`, **60 menit**) + penanda `reset_sandi_user:{id}` untuk membatalkan tautan lama →
  surel `TautanResetSandi` berisi `{FRONTEND_URL}/reset-password?token=...&email=...` → halaman memanggil
  `/reset-password/check` dulu → `POST /reset-password {token, email, new_password, new_password_confirmation}`
  → sandi diganti, tautan dihapus, **semua token sesi dicabut**. Layar selalu menjawab "tautan telah dikirim"
  walau surel gagal (disengaja); kegagalan tercatat di `notifikasi_logs` dan `laravel.log`.
- **Kunci data keuangan donasi (Opsi A):** verifikasi, ubah, hapus donasi **khusus super admin**
  (`wajibSuperAdmin()` → 403). Untuk admin biasa, `index` dan `search` menyembunyikan `jumlah`,
  `biaya_transfer`, `kode_transaksi`, `rekening_pengirim`, `bukti_transfer` (`sembunyikanKeuangan()`).
  Bukti ikut disembunyikan karena nominal terbaca di gambarnya.
- **Donasi wajib terikat kegiatan** yang aktif dan `butuh_donasi` (`kegiatan_id` `required|uuid|exists`; frontend menolak kosong). Metode: **QRIS statis**
  (default) atau **Transfer Mandiri** — keduanya manual, donatur unggah bukti, super admin memverifikasi. Kolom `donasi.kegiatan_id` tetap **nullable**
  dengan `ON DELETE SET NULL`: donasi "tanpa kegiatan" hanya data lama atau kegiatan yang dihapus (donasi = bukti penerimaan dana, tidak ikut terhapus).
  "Donasi Umum" di `store.js` adalah pilihan **tujuan**, bukan kegiatan.
- **Surel donasi terverifikasi (7 Okt):** `DonasiController::updateStatus` — saat status berubah ke `berhasil` dari status lain memanggil
  `NotifikasiController::kirimNotifikasiDonasi` → `Mail::to(surel donatur)->send(new DonasiDiverifikasi(nama, jumlah, tanggal ID, metode, tujuan,
  kegiatan atau "-", ID transaksi))`; sukses → `notifikasi_terkirim=true`; gagal → galat ditangkap, flag tetap false; riwayat `notifikasi_logs`
  (`trigger=donasi_verified`) berstatus `terkirim`/`gagal` sesuai hasil nyata. Donasi yang sudah `notifikasi_terkirim=true` tidak dikirim ulang.
  ⚠️ Layar Notifikasi admin masih menampilkan "✓ Terkirim" statis (tidak membaca status).
- **Rekap donasi per kegiatan (9 Okt, hanya super admin):** kartu di atas filter menu Donasi, dihitung di peramban per ID kegiatan (transaksi, menunggu,
  berhasil, total diterima = status `berhasil`), semua periode; tombol "Lihat" menyaring tabel.
- **Relawan diterima** → `jumlah_relawan_terdaftar` dijaga event model `Relawan` (`created`, `updated`,
  `deleted`) + surel `RelawanDiterima` + catat `NotifikasiLog`. Opsi jenis/minat ditentukan per kegiatan.
- **Pemberitahuan hanya lewat surel.** Kanal WhatsApp **ditiadakan** (16 September 2026).
- **Jejak audit** otomatis lewat `AuditLog::record()` pada verifikasi/hapus donasi & relawan dan pengelolaan akun
  (9 titik pemanggilan). **Tidak** mencatat perubahan kegiatan, berita, dan galeri — ini sesuai cakupan FR SIKAS
  516 dan NFR 3.4.4.8 yang sejak 19–20 Sept dipersempit secara sengaja ke data transaksional & akun, bukan
  seluruh tindakan pengelola (lihat HANDOFF §4.8).
- **Galeri:** foto dikelompokkan jadi album menurut `judul`; unggah massal otomatis dipecah **20 berkas/permintaan**.
- **Penyaringan admin** Donasi & Relawan di peramban: cari, status, kegiatan, **bulan** (+ jenis untuk relawan).
  Ekspor rekap mengikuti penyaring aktif (bukan halaman yang tampil) — paging hanya tampilan.
- **Filter publik Berita:** Semua, Sosial, Pendidikan, Kesehatan, Pengumuman (tombol "Kegiatan" dihapus 9 Okt; kategori `kegiatan` tetap ada di backend/admin
  dan berita lamanya tetap tampil di "Semua").
- **Halaman Kontak tanpa formulir** — sengaja; pertanyaan diarahkan ke WhatsApp. Tidak ada tabel/endpoint pesan.

---

## 9. Data lembaga & konvensi

| Hal | Nilai | Letak |
|---|---|---|
| **Alamat** | Jl. Empu Panuluh No.377A, Pringwulung, Condongcatur, Kec. Depok, Kab. Sleman, DIY | `src/data/lembaga.js` (terpusat) |
| **WhatsApp / telepon** | +62 813-9277-7710 (`wa.me/6281392777710`) | Footer, Kontak, DaftarRelawan *(belum terpusat)* |
| **Surel kontak** | karinakas.office@gmail.com | idem |
| **Sosial media** | IG `@yayasankarinakas`, YouTube `@karinakasofficial`, Linktree `linktr.ee/prjct88` | Footer |
| **Rekening** | Mandiri 1370013862012 a.n. YAYASAN KARINAKAS | konstanta `BANK` di `pages/Donasi.jsx` |
| **QRIS statis** | YAYASAN KARINAKAS, NMID `ID2026479922646`, terminal `A01` | konstanta `QRIS` + `public/qris-karinakas.png` |
| **Brand** | merah `#C0392B`, font dasar 18.5px, kontras tinggi (ramah lansia) | `index.css` |
| **Logo & favicon** | `karinakas-logo.png` lewat komponen `KarinakasLogo` | Navbar, Footer, Intro, admin, Login/Register/Forgot |

- Ikon hati yang tersisa bermakna "donasi", bukan logo — sengaja dipertahankan.
- Ikon Linktree digambar sebagai SVG karena `bi-linktree` tidak ada di Bootstrap Icons.
- Istilah tampilan: **"responsif"**, bukan "mobile-first" (CSS-nya *desktop-first*).

---

## 10. Konfigurasi surel & deploy

### `.env` backend yang dibutuhkan untuk surel
```env
MAIL_MAILER=smtp
MAIL_SCHEME=smtps          # pasangan porta 465 (587 memakai MAIL_SCHEME=smtp)
MAIL_HOST=mail.karinakas.com
MAIL_PORT=465
MAIL_USERNAME=noreply@karinakas.com
MAIL_PASSWORD="..."        # WAJIB diapit kutip: sandi memuat karakter #
MAIL_FROM_ADDRESS="noreply@karinakas.com"   # harus sama dengan MAIL_USERNAME
MAIL_FROM_NAME="Yayasan Karinakas"
FRONTEND_URL=https://karinakas.com          # lokal: http://localhost:5173
```

- Porta **465 + `smtps`** dan **587 + `smtp`** sama-sama lolos autentikasi saat diuji dari luar. Di hosting bersama
  porta 587 sering diblokir, jadi **peladen memakai 465**.
- `MAIL_ENCRYPTION` **tidak dibaca** Laravel 13 — yang dipakai `MAIL_SCHEME`.
- Setiap mengubah `.env` peladen: **`php artisan config:clear`**.
- `.env` **tidak dilacak Git** (sudah di `.gitignore`, tidak pernah masuk riwayat).
- Kata sandi kotak surel **pernah tertulis di riwayat chat** → sebaiknya diganti.

### Langkah deploy ringkas (rinci di `DEPLOY.md`; prosedur lengkap + pengujian di `HANDOFF.md` §4.26)
Hosting = **cPanel**, satu domain `karinakas.com` (API di `/api/index.php/api/v1`, foto di `/api/storage`).
1. **Backend:** commit & push → cPanel **Git™ Version Control → Update from Remote** (setara `git pull`) → Terminal: `php artisan config:clear`,
   `route:clear`, `view:clear` (tambah `composer install --no-dev --optimize-autoloader` hanya bila `composer.json` berubah; `migrate --force` hanya bila ada
   migrasi baru — **tidak pernah `migrate:fresh`**). Isi `.env` peladen seperti di atas. Backup DB + `.env` dulu.
2. **Frontend:** `.env` → `VITE_API_URL=/api/index.php/api/v1`, `VITE_STORAGE_URL=/api/storage` → `npm ci` → `npm run build` → ZIP **isi** `dist/`
   (klik kanan *Compress*, bukan `Compress-Archive` PS 5.1) → unggah & Extract ke web root, **jangan timpa folder `api`**; **`.htaccess` (tersembunyi, dari
   `public/`) wajib ikut**. `dist` ada di `.gitignore` (tapi `dist.zip` terlacak).
3. **Urutan:** backend dulu, baru frontend.
4. **Cek:** `https://karinakas.com/reset-password` harus menampilkan "Tautan Tidak Berlaku" (bukan 404);
   `.../api/index.php/api/v1/kegiatan` harus JSON; ubah satu donasi uji ke Berhasil → surel diterima donatur.
- ⚠️ `DEPLOY.md` memakai contoh domain terpisah (`api.karinakas.org`) — **bukan** konfigurasi produksi sebenarnya (satu domain); ikuti bagian ini.

---

## 11. Batas & angka acuan

- Bukti pembayaran maks **4 MB** · foto galeri maks **5 MB** per berkas · unggah massal **20 berkas/permintaan**.
- Tautan reset berlaku **60 menit**, sekali pakai.
- Paginasi admin: `per_page` dibatasi **1–100** untuk donasi/relawan; **`users()` selalu `paginate(20)`** (mengabaikan `per_page`); audit/notifikasi tanpa batas atas.
  Klien mengambil **semua halaman** lalu menampilkan per halaman 10/20/50 (Galeri 12) di peramban.
- **PHP ≥ 8.3** (`composer.json`); di PHP 8.2 `composer install` gagal.

---

## 12. Dokumen proyek

> 📁 **Sejak 9 Okt 2026 folder `docs/` ada di `D:\KULIAH\Sems 7\SKRIPSI\TUGAS AKHIR\docs\`** (di luar repo; Git frontend tidak melacaknya). Baris bertanda `docs/...`
> di bawah merujuk ke sana. **Naskah aktif:** laporan = `Laporan Tugas Akhir\Terbaru Lagi\LAPORAN_TUGAS_AKHIR_Rev2.docx`; pendukung =
> `Dokumentasi Selama TA\{SKPL,DPPL,PDHUPL}_Aaron.docx` — baris `TERBARU.docx`/`REVISI\` di bawah **usang**.
> Dokumen `.md` lama (`SKPL.md`, `DPPL.md`, `docs/PDHUPL.md`, `docs/skpl|dppl|laporan/*`) **tidak diubah** sesi 6–11 Okt dan sebagian sudah usang terhadap versi final di `docs\final\`.

### 🆕 Dokumen final sesi 6–11 Okt — `D:\...\TUGAS AKHIR\docs\final\`
| Berkas | Isi |
|---|---|
| `_PROGRES.md` | **titik simpan** pekerjaan: fakta/keputusan penyusun, status tiap berkas, pertanyaan terbuka, cara melanjutkan |
| `PANDUAN-PERBAIKAN-LAPORAN.md` (421 butir), `-SKPL.md` (304), `-DPPL.md` (219), `-PDHUPL.md` (243) | panduan edit `.docx`: penanda, **halaman Word nyata**, kutipan Ctrl+F, saran, penjelasan kesesuaian kode, pertanyaan konfirmasi, teks siap tempel. Sebagian butir usang akibat surel donasi (HANDOFF §6) |
| `SKPL-LENGKAP.md` | SKPL final: 80 FR, 24 UC, **21 NFR**, 28 antarmuka bernomor, 66 titik akhir, Lampiran A (keterunutan) & B (Catatan Kesesuaian, 33 butir) |
| `DPPL-LENGKAP.md` | DPPL final: 2.1.3 deployment, 78 fungsi/9 kontroler, 39 kelas, 9 tabel/116 kolom, **2.4 28 antarmuka** (A1–A13, B1–B6, C9), keterunutan, Lampiran A (29 butir) |
| `PDHUPL-LENGKAP.md` | PDHUPL final: 88 butir semua kolom, Bab 4 88 subbab, Bab 6 Tabel 6.1–6.11; **87 Handal + 1 Tidak Berlaku**; tanpa kata "penelusuran kode" |
| `CATATAN-PERUBAHAN-{SKPL,DPPL,PDHUPL}.md` | apa yang berubah dari versi lama, jawaban *default* yang dipakai agen, hal tak terverifikasi |
| `PANDUAN-HAPUS-NFR-SKPL-DOCX.md` | penghapusan 11 NFR + K-20 di `SKPL_Aaron.docx` (halaman, pemetaan nomor lama→baru) |
| `PDHUPL-11-BUTIR-SIAP-TEMPEL.md` | teks siap tempel + lokasi 11 butir PDHUPL yang bertentangan dengan kode |
| `PENEMPATAN-USECASE-DAN-PDM-LAPORAN.md` | revisi dosen: penempatan diagram use case (4.3.7) & PDM (4.4.6), penomoran gambar, teks siap tempel |
| `SLIDE-PRESENTASI-TA.md` | slide sidang (Marp), 22 slide + Q&A + daftar periksa |
| `tools\find-pages.ps1` | skrip Word COM: nomor halaman fisik tiap kutipan di `.docx` (membuka **salinan**) |

| Berkas | Isi |
|---|---|
| `HANDOFF.md` | riwayat pengerjaan, masalah terbuka, langkah berikutnya |
| `DEPLOY.md` | panduan hosting |
| `PROGRESS.md` | checklist fitur |
| `TESTING.md` | **181 kasus uji** black-box + rekapitulasi — ⬜ belum dieksekusi |
| `docs/PDHUPL.md` | ⚠️ **Sebagian usang (6 Okt):** penyusun mengonfirmasi black-box **dilakukan nyata** bersama Karinakas, semua Handal (UT-03 sudah Handal) → dokumen final **tidak boleh** menyebut "penelusuran kode"; versi final = `docs\final\PDHUPL-LENGKAP.md`. Masih berisi nilai kata sandi bawaan di butir AD-32 (hapus). Isi lama: PDHUPL resmi (Bab 1–5 + Bab 6 SUS), **88 butir uji** (disusun 26 Sept, format & Bab 5 diperbarui 28 Sept, **Bab 6 dilengkapi data mentah P1–P10 seluruh 40 responden 29–30 Sept**) — Bab 5 terisi lewat **penelusuran kode** (bukan eksekusi langsung), satu butir **UT-03 Tidak Handal**; catatan lengkap di `docs/PDHUPL-CATATAN.md`; **skor SUS nyata dari 40 responden: 72,56** — ⬜ verifikasi nyata di `karinakas.com` masih perlu dilakukan; tempat tempel *screenshot* kuesioner ada di akhir Subbab 6.4. **Tidak ada bagian "Daftar Revisi"** (beda dari templat Word resmi) — belum ditambahkan, menunggu keputusan penyusun. ⚠️ Berkas Word terpisah "PDHUPL FX.pdf" yang pernah diserahkan penyusun adalah **ekspor lama** (sempat kurang 3 subbab di Bab 4.6) — jangan dipakai, ekspor ulang dari berkas ini |
| `docs/PDHUPL-CATATAN.md` | Catatan kerja PDHUPL (bukan bagian naskah) — perbedaan dengan contoh PDHUPL teman, metode penelusuran kode, temuan UT-03, dan daftar isian yang masih perlu dilengkapi penyusun |
| `SKENARIO-TUGAS.md` | uji kebergunaan: 15 tugas, lembar pengamatan, kuesioner SUS *(instrumen lama; SUS yang sudah punya hasil nyata ada di `docs/PDHUPL.md`)* |
| `docs/laporan/BAB-IV-LENGKAP.md` | ⚠️ **Usang untuk angka responden: kini 35 (konfirmasi penyusun 6 Okt), bukan 27.** Naskah aktif adalah `Rev2.docx`. **baru (29–30 Sept)** — naskah Bab IV laporan TA lengkap dan siap tempel ke Word, penomoran final 4.1–4.6 (sama dengan Word penyusun), dikonsolidasi dari kedua berkas di bawah ini: 5 *user persona*, *pain points*, kebutuhan fungsional/nonfungsional, arsitektur, desain visual, implementasi, pengujian, evaluasi. Jumlah antarmuka **24** (diputuskan, belum disebarkan ke SKPL/DPPL). ⚠️ Memakai **27** responden kuesioner kebutuhan (selaras data mentah di draf lama), beda dari `BAB-V/VI-LENGKAP.md` (35). Paragraf 4.5.2 (arsitektur & integrasi, istilah "dibakar") sudah dirapikan di chat 4 Okt tetapi **belum diterapkan** ke berkas ini (`HANDOFF.md` §4.20) |
| `docs/laporan/BAB-V-LENGKAP.md` | **direvisi ulang 2–3 Okt** (`HANDOFF.md` §4.18–§4.19) — kini memakai kerangka **2 tujuan** (sama dengan Bab I `TERBARU.docx`), Pembahasan menelusuri **keempat tahap HCD (ISO 9241-210)** satu per satu dengan buktinya, seluruh rujukan "(Subbab X.Y)" dihapus, dan paragraf usability tidak lagi membandingkan skor SUS dengan studi lain. ⚠️ **Sudah berbeda konvensi dari `TERBARU.docx`** (yang masih 3-tujuan sebagian & masih pakai rujukan Subbab) — jangan asumsikan salah satu usang begitu saja, screenshot nyata (43 buah) baru ada di `TERBARU.docx`, tapi struktur argumen yang lebih baru ada di `.md` ini. **4 Okt:** Pembahasan 5.2.4 kini memuat **penjelasan 10 grafik SUS (Gambar 5.21–5.30)** yang dipindah dari Hasil 5.2.3, persentasenya dicocokkan ke `docs/PDHUPL.md` Bab 6.4 (`HANDOFF.md` §4.20). ⚠️ Masih menyebut **35** responden kuesioner kebutuhan, sedangkan `BAB-IV-LENGKAP.md` memakai **27** — belum dipastikan; kalimat §5.1 tentang "keterbatasan sistem" juga sudah usang |
| `docs/laporan/BAB-VI-LENGKAP.md` | **direvisi ulang 2 Okt** (`HANDOFF.md` §4.18) — kini **2 tujuan** juga, konsisten dengan `BAB-V-LENGKAP.md` di atas, rujukan Subbab dihapus. Kesimpulan di `TERBARU.docx` ditulis terpisah (bukan dari draf ini) dan masih 3-tujuan sebagian; Saran di `TERBARU.docx` tampak hanya sebagian butir tersalin dari draf ini — **untuk isi Saran paling lengkap (8+7 butir) pakai `.md` ini, untuk angka Kesimpulan cek `TERBARU.docx`** |
| `docs/laporan/4.3-4.4-Perancangan-Implementasi-Pengujian.md`, `4.3-Prototipe-dan-Evaluasi-Desain.md` | draf sumber lama (21–25 Sept) yang dikonsolidasi menjadi `BAB-IV-LENGKAP.md` di atas — masih berguna sebagai riwayat, tapi untuk ditempel ke Word pakai `BAB-IV-LENGKAP.md` |
| `SKPL.md` + `docs/skpl/` | SKPL Bab I–III (71 FR, 32 NFR, **24** use case, ERD) — disinkronkan ulang 19–20 Sept (UC-24 ditambahkan, 66 titik akhir). ⚠️ **Digantikan `docs\final\SKPL-LENGKAP.md`** (80 FR, 21 NFR); angka 71/72 FR dan 32 NFR di sini usang |
| `DPPL.md` + `docs/dppl/` | DPPL Bab 1, 2.1, 2.2 (75 tabel fungsi), 2.3 (+ `2.3.2-Physical-Data-Model.md`); **2.4 belum** — draf materinya ada di `docs/laporan/...md` §4.3.7–4.3.9 |
| `docs/dppl/CHECKLIST.md` | **baca dulu bila melanjutkan DPPL** |
| `../../Laporan Tugas Akhir/LAPORAN TUGAS AKHIR TERBARU.docx` | 🔴 **naskah laporan yang sesungguhnya aktif** (di luar repo, path lengkap `TUGAS AKHIR/Laporan Tugas Akhir/`, diubah terakhir **1 Okt 2026**) — **bukan** `docs/LAPORAN TUGAS AKHIR.docx` (usang, 17 Sept) atau `LAPORAN TUGAS AKHIR.docx` tanpa akhiran TERBARU di folder yang sama (juga usang, 17 Sept). Sudah memuat Bab V dengan 43 screenshot nyata dan Bab I yang direvisi jadi 2 tujuan penelitian, tapi punya 3 inkonsistensi belum diperbaiki — baca `HANDOFF.md` §4.16–§4.17 sebelum menyentuh (2 dari 3 inkonsistensi sudah diperbaiki 2 Okt). 🆕 **Ada folder `Laporan Tugas Akhir\REVISI\`** berisi `LAPORAN TUGAS AKHIR TERBARU.docx` lain (diubah 3 Okt 21:43, 12 MB, + salinan di `REVISI\nest\`) yang **belum diperiksa** — tanyakan ke penyusun mana yang aktif. `docs/laporan/BAB-IV/V/VI-LENGKAP.md` di repo ini adalah draf sumber yang sebagian isinya sudah disalin ke sana, bukan status terkini |

**Konvensi kode dokumen:** `F-01…F-21` fungsi produk · `K-01…K-20` kekangan · `A-01…A-08` asumsi ·
`D-01…D-06` kebergantungan · `FR SIKAS 101…608` (71 total) · `NFR 3.4.x.y` · `UC-01…UC-24` (24 total,
UC-24 Memulihkan Kata Sandi ditambahkan 19 Sept) · `AK-01…AK-05`.
