# 🧭 CONTEXT — Sistem Informasi Yayasan Karinakas

Gambaran **menyeluruh & detail** sistem (frontend **dan** backend digabung).
Untuk status pengerjaan & cara melanjutkan, lihat **[HANDOFF.md](HANDOFF.md)**.

---

## 1. Apa ini?
Website Yayasan Karinakas — lembaga sosial di bawah Keuskupan Agung Semarang,
fokus pelayanan lansia/kesehatan/sosial. Proyek skripsi/TA. Fungsi:
- **Publik**: profil yayasan, kegiatan, berita/kampanye, galeri foto, kontak.
- **Pengguna terdaftar**: donasi (transfer + upload bukti), daftar relawan, profil & riwayat, notifikasi.
- **Admin / Super Admin**: kelola semua data, dashboard statistik, notifikasi & audit log.

---

## 2. Arsitektur & Teknologi

| Lapisan | Teknologi | Folder |
|---|---|---|
| **Frontend** (SPA) | React 19 + Vite + Bootstrap 5 + React Router | `frontend_karinakas/` |
| **Backend** (REST API) | Laravel 13 + Sanctum (token) + MySQL | `tugas_akhir/` |

```
Browser (React SPA :5173)
   │  fetch JSON  ┌───────────────────────────────┐
   ├────────────► │  Laravel API  (/api/v1/...)    │──► MySQL (database "karinakas")
   │              │  Sanctum token, UUID, roles    │
   │  <img src>   └───────────────┬───────────────┘
   └──────────────────────────────┴──► /storage/... (foto galeri & bukti transfer, via storage:link)
```

- Frontend & backend **terpisah**; frontend memanggil API → **backend wajib menyala**.
- **URL API**: `frontend_karinakas/.env` → `VITE_API_URL`. **Wajib berakhiran `/api/v1`** (prefix `/api` dari `bootstrap/app.php` + grup `v1` dari `routes/api.php`); akhiran itu juga dipakai `resources.js` untuk membentuk alamat `/storage`. Dev `http://127.0.0.1:8000/api/v1`; produksi satu domain `/api/v1`. **Dibakar saat `npm run build`.**
- **DB**: MySQL, database `karinakas` (host/port di `tugas_akhir/.env`; dev via Laragon).

---

## 3. Autentikasi & Peran
- **Sanctum bearer token** — disimpan di `localStorage` key **`kk_token`**, dikirim `Authorization: Bearer ...`.
- **Login** pakai **email ATAU username** (frontend kirim `email` bila ada `@`, else `username`).
- **3 peran**: `user`, `admin`, `super_admin`. Backend `super_admin` ↔ frontend `superadmin`.
- **Ability**: `Gate::before` (AppServiceProvider) memberi semua ability ke admin & super_admin; pembatasan **super-admin-only** (Manajemen Pengguna, Audit Log) dicek manual di controller.
- **Beda peran**: Super Admin **memverifikasi pembayaran donasi** dan melihat **data keuangan donasi**, **Manajemen Pengguna**, **Audit Log**. Admin biasa tidak — di menu Donasi hanya memantau donatur, kegiatan, dan status (sejak 14 September 2026).

### Akun demo (seeder)
| Peran | Email | Username | Password |
|---|---|---|---|
| Super Admin | `superadmin@karinakas.org` | `superadmin` | `password123` |
| Admin | `admin@karinakas.org` | `admin` | `password123` |
| User | `user1@test.com` … `user10@test.com` | `user1`…`user10` | `password123` |

---

## 4. Struktur FRONTEND

```
src/
├── services/
│   ├── api.js          # klien fetch: get/post/put/patch/del + upload(multipart); tempel token; olah error
│   └── resources.js    # MAPPER field BE↔FE + service CRUD per resource (INTI integrasi)
├── hooks/useResource.js# hook data async: {items,loading,error,reload,add,update,remove}
├── utils/excel.js      # helper export tabel Excel bersama (Donasi, Relawan, Laporan Dashboard)
├── context/AuthContext.jsx  # login/register/logout/me/updateProfile + mapUser (role, field)
├── pages/              # halaman publik + pages/admin/Section*.jsx
├── components/         # Navbar, Footer, Hero, CTA, Galeri, Kegiatan, IntroScreen, PageHero, Breadcrumb, ...
└── data/store.js       # konstanta (STATUS_*, KATEGORI_*, JENIS/MINAT_RELAWAN default, fmtRp, fmtTanggal)
```

**`resources.js` (paling penting)** — tiap resource punya:
- `xxxFE(obj)` ubah data backend → bentuk frontend; `xxxBE(form)` sebaliknya.
- `xxxService` = kumpulan fungsi API.
- Service tersedia: `kegiatanService`, `beritaService` (kampanye), `galeriService`, `donasiService`, `relawanService`, `penggunaService`, `notifikasiService`, `auditService`, `adminService` (dashboard).
- Helper: `fileUrl(path)` bangun URL foto dari `VITE_API_URL` (ganti `/api/v1`→`/storage`); `unwrapList/unwrapOne` seragamkan bentuk respons paginator.

**Halaman publik**: Home, TentangKami, Galeri, Kegiatan, Berita(+Detail), Kontak, Login, Register, ForgotPassword, Donasi, DaftarRelawan, Profil.
**Panel admin**: `AdminDashboard.jsx` (sidebar) merender `Section{Berita,Kegiatan,Relawan,Galeri,Donasi,Pengguna,Notifikasi,Audit}.jsx`.

---

## 5. Struktur BACKEND (Laravel)

```
tugas_akhir/
├── app/Models/            # User, Kegiatan, Kampanye, Galeri, Donasi, Relawan, AuditLog, NotifikasiLog
├── app/Http/Controllers/  # Auth, Kegiatan, Kampanye, Galeri, Donasi, Relawan, Admin, Notifikasi
├── app/Mail/              # RelawanDiterima (Mailable)
├── app/Providers/         # AppServiceProvider (Gate::before)
├── database/migrations/   # skema tabel (lihat §8)
├── database/seeders/      # DatabaseSeeder (akun demo + data contoh)
├── routes/api.php         # semua endpoint (lihat §7)
├── config/cors.php        # CORS (dev: allow all origins)
├── config/logging.php     # channel 'notifikasi' (log notifikasi)
└── resources/views/emails/relawan-diterima.blade.php  # template email
```

- **PK = UUID** (`HasUuids`) di semua model.
- **Middleware**: grup admin `middleware('role:admin,super_admin')`; alias `role` didaftarkan di `bootstrap/app.php`.

### Controller & method (ringkas fungsinya)
- **AuthController**: `register, login, logout, me, updateProfile, changePassword, forgotPassword, checkResetToken, resetPassword`.
- **KegiatanController**: `index, show, store, update, destroy, search, availableForVolunteer, updateStatus`.
- **KampanyeController**: `index, show, store, update, destroy, search, byKategori, recent`.
- **GaleriController**: `index, byKegiatan, latest, store, bulkUpload, update, destroy, search`.
- **DonasiController**: `store, uploadBukti, myDonations, index (admin), update, destroy, updateStatus, report, search`.
- **RelawanController**: `store, myRegistrations, status, cancel, index (admin), pending, byKegiatan, updateStatus, destroy`.
- **AdminController**: `dashboard, users, storeUser, updateUser, resetUserPassword, deleteUser, auditLogs, notifikasiLogs, rekapanRelawan, rekapanKegiatan, rekapanDonasi, exportRekapan`.
- **NotifikasiController**: `myNotifications, kirimNotifikasiDonasi` (+ stub `kirimNotifikasiRelawan/Registrasi/PembatalanKegiatan/KeAdmin`).

---

## 6. Model & field (fillable)
| Model | Field |
|---|---|
| **User** | nama_lengkap, email, username, password, role, jenis_kelamin, tanggal_lahir, usia, no_telepon, alamat, kota, tentang, asal_paroki |
| **Kegiatan** | judul, deskripsi, lokasi, kategori, gambar_url, tanggal_mulai, tanggal_selesai, status, butuh_relawan, butuh_donasi, kuota_relawan, jumlah_relawan_terdaftar, **jenis_relawan** (JSON), **bidang_minat** (JSON) |
| **Kampanye** (berita) | judul, konten, ringkasan, gambar_url, penulis, penulis_avatar, tags, waktu_baca, kategori, status, tanggal_publish |
| **Galeri** | kegiatan_id, judul (=nama album/kegiatan), **nama_foto** (nama tiap foto), deskripsi, gambar_url, kategori, tanggal, tipe |
| **Donasi** | user_id, kegiatan_id, jumlah, metode_pembayaran, status_pembayaran, keterangan, tujuan_donasi, biaya_transfer, kode_transaksi, rekening_pengirim, **bukti_transfer**, anonim, notifikasi_terkirim, tanggal_donasi |
| **Relawan** | user_id, kegiatan_id, jenis, minat, kemampuan_diri, motivasi, nomor_ktp, kebutuhan_khusus, status, tanggal_daftar |
| **AuditLog** | user_id, user_nama, aksi, target |
| **NotifikasiLog** | user_id, tipe, penerima, judul, isi, trigger, status |

**Enum status:** Kegiatan `aktif/selesai/dibatalkan`; Donasi `pending/berhasil/gagal`; Relawan `pending/diterima/ditolak`; Kampanye `draft/published/archived`.

---

## 7. Referensi Endpoint LENGKAP (`/api/v1`)

### Publik (tanpa login)
| Method | Path | Fungsi |
|---|---|---|
| POST | `/register` | daftar akun (data lengkap) |
| POST | `/login` | login (email/username) → token |
| POST | `/forgot-password`, `/reset-password` | reset sandi |
| GET | `/kegiatan`, `/kegiatan/{id}` | daftar & detail kegiatan |
| GET | `/kegiatan/available/volunteer` | kegiatan yang membuka relawan |
| GET | `/kampanye`, `/kampanye/{id}` | berita/kampanye |
| GET | `/kampanye/kategori/{kategori}`, `/kampanye/recent/list` | filter & terbaru |
| GET | `/galeri` | galeri (paginated) |
| GET | `/galeri/kegiatan/{kegiatanId}`, `/galeri/latest/list` | per kegiatan & terbaru |

### User terdaftar (auth:sanctum)
| Method | Path | Fungsi |
|---|---|---|
| GET | `/me` | data user (respons `{success, user}`) |
| POST | `/logout` · PUT `/profile` · POST `/change-password` | akun |
| POST | `/donasi` | buat donasi (wajib kegiatan yang butuh donasi) |
| POST | `/donasi/{id}/bukti` | upload bukti transfer |
| GET | `/donasi/my-donations` | riwayat donasi |
| POST | `/relawan` | daftar relawan |
| GET | `/relawan/my-registrations` | riwayat relawan |
| GET | `/relawan/{id}/status` · DELETE `/relawan/{id}/cancel` | status & batal |
| GET | `/notifikasi/my-notifications` | notifikasi milik user |

### Admin & Super Admin (role:admin,super_admin)
| Method | Path | Fungsi |
|---|---|---|
| GET | `/admin/dashboard` | statistik (nominal hanya super) |
| POST/PUT/DELETE | `/admin/kegiatan`, `/{id}` · PATCH `/{id}/status` · GET `/search` | CRUD kegiatan |
| POST/PUT/DELETE | `/admin/kampanye`, `/{id}` · GET `/search` | CRUD berita |
| POST | `/admin/galeri/upload` | **bulk upload** foto |
| POST/PUT/DELETE | `/admin/galeri`, `/{id}` · GET `/search` | CRUD galeri |
| GET | `/admin/donasi` | daftar (data keuangan disembunyikan utk admin biasa) |
| PUT/DELETE | `/admin/donasi/{id}` · PATCH `/{id}/status` · GET `/search`,`/report` | kelola donasi — ubah, hapus, dan status **khusus super admin** |
| GET | `/admin/relawan`, `/pending`, `/kegiatan/{id}` · PATCH `/{id}/status` · DELETE `/{id}` | kelola relawan |
| GET | `/admin/notifikasi` | riwayat notifikasi |
| GET | `/admin/audit` | **audit log (super admin)** |
| GET/POST/PUT/DELETE | `/admin/users`, `/{id}` · POST `/{id}/reset-password` | **Manajemen Pengguna (super admin)** |
| GET | `/admin/rekapan/{relawan,kegiatan,donasi}` · POST `/export` | rekapan |

### Webhook
`POST /v1/webhook/payment/callback` (update status donasi), `POST /v1/webhook/notifikasi/donasi/{id}`.

---

## 8. Migrasi & Skema DB
Urutan migrasi (di `database/migrations/`):
1. `create_users_table`, `create_kegiatan_table`, `craete_kampanye_table` *(typo nama file dibiarkan)*, `create_donasi_table`, `create_relawan_table`, `create_galeri_table`
2. `create_personal_access_tokens_table` — **uuidMorphs** (Sanctum + UUID)
3. `add_bukti_transfer_to_donasi_table`
4. `create_audit_logs_table`, `create_notifikasi_logs_table`
5. `add_nama_foto_to_galeri_table`
6. `add_relawan_options_to_kegiatan` — tambah `jenis_relawan`,`bidang_minat` (JSON) di kegiatan; ubah `relawan.jenis` **enum→string**

> Jalankan dengan `php artisan migrate` (**bukan** `migrate:fresh` di data asli).

---

## 9. Logika bisnis penting
- **Kunci data keuangan donasi** (Opsi A, 14 September 2026): verifikasi, ubah, dan hapus donasi **khusus Super Admin** — `wajibSuperAdmin()` membalas 403. Bagi admin biasa, `GET /admin/donasi` dan `/admin/donasi/search` menyembunyikan `jumlah`, `biaya_transfer`, `kode_transaksi`, `rekening_pengirim`, `bukti_transfer` lewat `sembunyikanKeuangan()`; dashboard menghapus total nominal. Bukti ikut disembunyikan karena nominal terbaca pada gambarnya.
- **Donasi wajib kegiatan**: `store` menolak bila tanpa `kegiatan_id` atau kegiatan tidak `butuh_donasi`/tidak aktif.
- **Metode pembayaran**: **QRIS** (default) atau **Transfer Mandiri**; dikirim sebagai string `metode_pembayaran` (backend hanya validasi `string|max:50`, tak ada enum). Keduanya **manual** — donatur bayar lalu unggah bukti, admin memverifikasi. QRIS **statis**: nominal tidak tertanam di QR, diketik sendiri oleh donatur.
- **Relawan → diterima**: otomatis `kegiatan.jumlah_relawan_terdaftar++` (event model), dan **kirim email** `RelawanDiterima` + catat `NotifikasiLog` (surel saja — kanal WhatsApp ditiadakan 16 September 2026).
- **Opsi relawan per kegiatan**: admin isi `jenis_relawan`/`bidang_minat`; form pendaftaran memakai opsi itu; backend memvalidasi pilihan user sesuai opsi (kalau ditentukan).
- **Audit otomatis**: aksi admin (ubah status/hapus/kelola pengguna) dicatat ke `audit_logs` via `AuditLog::record()`.
- **Galeri**: `judul` mengelompokkan foto jadi **album**; `bulkUpload` menyimpan banyak foto sekaligus (nama per foto); frontend **auto-batch 20/request** & **ambil semua halaman**.
- **Penyaringan & ekspor admin** (Donasi dan Relawan): penyaringan dikerjakan **di peramban** atas data yang sudah dimuat, bukan lewat query baru ke API. Penyaring yang tersedia: pencarian, status, **kegiatan**, dan **bulan** (satu pilihan yang diisi dari bulan yang benar-benar ada pada data — menggantikan dua kotak rentang tanggal sejak 14 September 2026); khusus Relawan ditambah **jenis** yang pilihannya diambil dari data nyata sehingga jenis khusus per kegiatan ikut muncul. Isi berkas ekspor mengikuti penyaring aktif, dan penyaring tersebut dicatat pada kepala berkas. ✅ **Seluruh halaman dimuat** — `listAdmin` Donasi & Relawan memakai `ambilSemuaHalaman()` di `resources.js` (14 September 2026). Sebelumnya donasi terpotong di **20** baris karena `DonasiController::index` mengabaikan `per_page`; kini peladen menghormati `per_page` 1–100.
- **Counter relawan**: `kegiatan.jumlah_relawan_terdaftar` dijaga oleh event model `Relawan` — `created` (dibuat langsung berstatus `diterima`), `updated` (status berubah ke/dari `diterima`), dan `deleted`. Invarian: counter = jumlah relawan berstatus `diterima` pada kegiatan itu.
- **Halaman Kontak tanpa formulir**: pertanyaan pengunjung diarahkan ke **WhatsApp** (tombol chat + pilihan topik yang mengisi pesan awal) dan surel. Tidak ada tabel/endpoint pesan — memang disengaja, bukan fitur yang belum jadi.

---

## 10. Penyimpanan foto (ringkas; detail di DEPLOY.md)
- Upload → `storage/app/public/...`; diakses via `php artisan storage:link` → `/storage/...`.
- Frontend `fileUrl()`: `gambar_url` berupa path (`galeri/x.jpg`) → `http://host/storage/galeri/x.jpg`; kalau `http...` dipakai apa adanya (mendukung URL eksternal & file upload).

---

## 11. Konvensi & data penting
- **Warna brand**: merah lembut `#C0392B`; font dasar `18.5px`; kontras tinggi (ramah lansia).
- **Kontak** (diperbarui 29 Agustus 2026): WhatsApp/telepon **+62 813-9277-7710** (`wa.me/6281392777710`), surel **karinakas.office@gmail.com**, IG `@yayasankarinakas`, YouTube `@karinakasofficial`. Dipakai di `components/Footer.jsx`, `pages/Kontak.jsx`, dan `pages/DaftarRelawan.jsx` — **belum dipusatkan ke satu konstanta**, jadi bila berubah lagi harus disunting di tiga berkas.
- **Pembayaran donasi** (konstanta di `src/pages/Donasi.jsx`):
  - **QRIS statis** — `QRIS`: YAYASAN KARINAKAS, NMID `ID2026479922646`, terminal `A01`; gambar **sudah tersedia** di `public/qris-karinakas.png` (lihat `public/README-QRIS.txt`).
  - **Transfer bank** — `BANK`: **Mandiri 1370013862012 a.n. YAYASAN KARINAKAS** (diperbarui 29 Agustus 2026; sebelumnya rekening pribadi). Seluruh tampilan metode pembayaran, layar petunjuk transfer, tombol salin rekening, dan ringkasan donasi membaca konstanta ini, jadi cukup diubah di satu tempat.
- **Logo**: `public/karinakas-logo.png`, dipakai lewat komponen `components/KarinakasLogo.jsx` (parameter `size` dan `bleed`). Dipasang di Navbar, Footer, IntroScreen, sidebar panel admin, serta Login, Register, dan ForgotPassword (sejak 14 September 2026, menggantikan ikon hati). **Favicon** = `public/favicon-karinakas.png` (64 px) + `apple-touch-icon.png` (180 px), dipotong dari logo yang sama — sebelumnya tab peramban masih menampilkan logo bawaan Vite. Ikon hati yang tersisa bersifat **makna** (tombol/penanda Donasi, nilai "Humanis"), bukan lambang merek, sehingga sengaja dipertahankan.
- **Alamat & peta** (14 September 2026): **Jl. Empu Panuluh No.377A, Pringwulung, Condongcatur, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta**. **Sudah dipusatkan** di `src/data/lembaga.js` (`ALAMAT`, `ALAMAT_LENGKAP`, `PETA_SEMATAN`, `PETA_TAUTAN`) dan dibaca Footer serta Kontak. Peta memakai sematan Google Maps tanpa kunci API berbasis kueri alamat. Sebelumnya Footer menulis "Jl. Panuluh" dengan sematan peta palsu, sedangkan Kontak masih beralamat Semarang.
- **Ikon Linktree** di Footer digambar sebagai SVG karena Bootstrap Icons tidak menyediakan `bi-linktree` (dulu tombolnya kosong). Tautannya `linktr.ee/prjct88`.
- **Dokumen lain**: `HANDOFF.md` (progres detail), `PROGRESS.md` (checklist), `DEPLOY.md` (hosting), `TESTING.md` (179 kasus uji fungsional), `SKENARIO-TUGAS.md` (skenario uji kebergunaan + kuesioner SUS), `SKPL.md` + `docs/skpl/` (naskah SKPL), dan `DPPL.md` + `docs/dppl/` (naskah DPPL).

---

## 12. Catatan teknis hasil audit kode (22–23 Agustus 2026)

Diperiksa langsung ke kode saat penyusunan SKPL. **Fakta sistem yang mudah salah diingat** — pastikan tidak keliru saat menulis laporan.

| Hal | Fakta sebenarnya | Letak |
|---|---|---|
| **Versi PHP** | `composer.json` mensyaratkan `^8.3`, **bukan** 8.2. `composer install` gagal di PHP 8.2 | `tugas_akhir/composer.json` |
| **Panjang kata sandi** ✅ | Kini **`min:8` di seluruh jalur**: registrasi, ganti sandi, reset, dan tambah/reset akun oleh super admin | `AuthController`, `AdminController` |
| **Pembatasan laju** ✅ | Pembatas laju **bernama** di `AppServiceProvider`: `masuk` (register, login) 5/menit, `lupa-sandi` (forgot-password) 5/menit, `reset-sandi` (reset-password dan /check) 20/menit — seluruhnya per alamat IP. Memakai nama itu penting: `throttle:5,1` polos berkunci "domain\|IP" sehingga semua rute autentikasi berbagi satu jatah | `routes/api.php`, `AppServiceProvider` |
| **Pemulihan kata sandi** ✅ | Sudah nyata: **tautan sekali pakai** dikirim ke surel — token acak 64 karakter, yang disimpan di cache hanya sidik SHA-256-nya, berlaku 60 menit; token sesi lama dicabut setelah sandi diganti | `AuthController.forgotPassword/resetPassword` |
| **`SESSION_DRIVER=file`** | Diubah dari `database` karena tabel `sessions` tidak pernah dibuat migrasinya. Sistem murni API bertoken sehingga tidak memakai session sama sekali | `tugas_akhir/.env` |
| **CSS bersifat *desktop-first*** | 10 dari 11 *media query* memakai `max-width`. Sebut "responsif", **bukan** "mobile-first" | `src/index.css` |

**Sudah beres (23 Agustus 2026):** temuan lama "formulir Kontak belum tersambung ke server" **tidak berlaku lagi** —
**formulirnya dihapus**, bukan disambungkan. Kanal pertanyaan pengunjung memakai **WhatsApp** yang sudah aktif,
sehingga tidak ada dua kotak masuk yang harus dipantau terpisah. `pages/Kontak.jsx` kini murni informasi + tombol WhatsApp.
Tidak ada lagi fitur yang tampil di UI tetapi menggantung tanpa server.

**Cara kerja pemulihan kata sandi** (untuk penelusuran cepat):
`POST /forgot-password {email}` → token acak 64 karakter dibuat, sidik SHA-256-nya disimpan pada cache kunci `reset_sandi:{sidik}` (TTL 60 menit) beserta `reset_sandi_user:{id}` untuk membatalkan tautan lama → surel `TautanResetSandi` berisi `{FRONTEND_URL}/reset-password?token=...&email=...` → halaman memanggil `POST /reset-password/check {token, email}` lebih dulu → `POST /reset-password {token, email, new_password, new_password_confirmation}` → ganti sandi, `Cache::forget` kedua kunci, cabut seluruh token sesi, catat `notifikasi_logs`.
Pengiriman surel memakai **Resend** (`MAIL_MAILER=resend`), sehingga `RESEND_API_KEY` dan `FRONTEND_URL` wajib terisi pada `.env` peladen agar tautan benar-benar sampai dan mengarah ke alamat situs yang benar.

**Batas berkas yang berlaku** (dipakai sebagai acuan kebutuhan non-fungsional): bukti pembayaran maksimal **4 MB**, foto galeri maksimal **5 MB** per berkas, pengunggahan massal dipecah **20 berkas per permintaan**.
