# 🤝 HAND-OFF — Progres Pengerjaan Karinakas (detail)

Dokumen agar **pindah room chat langsung paham** dan bisa **dipelajari mendalam**.
Baca **[CONTEXT.md](CONTEXT.md)** dulu untuk arsitektur & referensi endpoint.

**Diperbarui:** 16 September 2026 · **Status:** fungsional end-to-end, semua modul data ke API; **SKPL Bab I–III selesai**; **DPPL Bab 1, 2.1, 2.2, 2.3 selesai** (tersisa 2.4 Perancangan Antarmuka); skenario uji kebergunaan siap dijalankan; data kontak dan rekening sudah memakai data resmi yayasan.

> **Melanjutkan di room chat baru:** baca berkas ini dan `CONTEXT.md`. Khusus untuk melanjutkan
> naskah DPPL, baca **`docs/dppl/CHECKLIST.md`** — memuat daftar periksa tiap subbab, hal yang
> perlu dilengkapi penyusun, dan keputusan yang masih menggantung.

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
11. **Naskah DPPL** (25–26 Agustus): Bab 1, 2.1, 2.2, dan 2.3 selesai beserta dua berkas diagram `.drawio`. Nama produk pada DPPL memakai **Website Karinakas**, bukan SIKAS.
12. **Skenario uji kebergunaan** (28 Agustus): `SKENARIO-TUGAS.md` — 15 tugas untuk pengujian bersama pengguna nyata, lembar pengamatan, dan kuesioner SUS.
13. **Penyaring ekspor & data lembaga** (29 Agustus): penyaring kegiatan dan rentang tanggal pada admin Donasi & Relawan; nomor kontak, surel, dan rekening donasi diperbarui ke data resmi yayasan.
14. **Verifikasi DPPL 2.3** (30 Agustus): isi Subbab 2.3 dibandingkan langsung ke basis data MySQL yang berjalan. Skema cocok seluruhnya; tiga kolom *Range Nilai* diperbaiki agar sesuai nilai yang benar-benar dipakai kode.

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
- Admin: **verifikasi status, edit, hapus, bukti transfer, dan export rekap Excel khusus Super Admin** (sejak 14 September, Opsi A — §3.20). Admin biasa hanya memantau daftar donatur, kegiatan, dan status tanpa data keuangan.
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

> **Sudah tidak berlaku sejak 16 September 2026.** Alur OTP di bawah ini diganti **tautan sekali pakai** yang dikirim ke surel — lihat §3.21. Bagian ini disimpan sebagai catatan riwayat.
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

### 3.15 Penyaring ekspor rekapitulasi (29 Agustus)
- Admin **Donasi** dan **Relawan** kini punya penyaring **kegiatan** dan **rentang tanggal**, ditambah tombol **Reset** dan penghitung **"x dari y data"**.
- Penyaring **Jenis** pada Relawan diperbaiki: pilihannya diambil dari data yang benar-benar ada, sehingga **jenis khusus yang ditetapkan admin per kegiatan ikut muncul**. Sebelumnya hanya memakai daftar tetap `['Lansia','Kebencanaan']` — ini butir kosmetik lama yang akhirnya beres.
- Isi berkas ekspor mengikuti penyaring aktif, dan **penyaringnya ikut tercatat di kepala berkas** agar pembaca tahu datanya sudah tersaring.
- FE: `SectionDonasi.jsx`, `SectionRelawan.jsx`. Ditambahkan medan `tanggalRaw` pada `relawanFE` karena `tanggal` sudah berupa teks terformat sehingga tak bisa dibandingkan.
- **Tanpa perubahan backend sama sekali** — penyaringan dikerjakan di peramban.
- **Dokumen ikut disesuaikan:** `FR SIKAS 501` dan `FR SIKAS 507` di SKPL 3.2 (enumerasi penyaringnya eksplisit), serta langkah 2 Basic Flow UC-16 di SKPL 3.3. FR lain memakai kalimat generik sehingga tetap berlaku. DPPL tidak berubah karena controller tidak disentuh.

### 3.16 Pemutakhiran data lembaga (29 Agustus)
- **Kontak** → WhatsApp/telepon `081392777710`, surel `karinakas.office@gmail.com`. Menggantikan tiga alamat surel berbeda yang sebelumnya berserakan.
- **Rekening donasi** → **Mandiri `1370013862012` a.n. YAYASAN KARINAKAS**. Sebelumnya rekening **pribadi** (BNI a.n. Aaron Risang Panji Bharata) — cukup penting terkoreksi untuk halaman donasi yayasan.
- **Sidebar panel admin** → ikon hati diganti logo Karinakas lewat komponen `KarinakasLogo` yang kini punya parameter `bleed`.
- Dua ketidakcocokan lama ikut dibetulkan: halaman Kontak sempat menampilkan **dua nomor berbeda** (kartu atas vs daftar rincian), dan halaman Login menulis domain akun admin `@karinakas.or.id` padahal yang benar `@karinakas.org`.

### 3.17 Verifikasi DPPL Subbab 2.3 Perancangan Data (30 Agustus)
- Naskah `docs/dppl/2.3-Perancangan-Data.md` **dibandingkan langsung ke basis data MySQL `karinakas` yang berjalan** lewat `information_schema`, bukan ke berkas migrasi saja maupun ke catatan terdahulu.
- **Cocok seluruhnya:** 116 medan pada 9 tabel (nama, tipe, *nullability*, nilai bawaan), urutan kolom termasuk sisipan `nama_foto`/`bukti_transfer`/`jenis_relawan`/`bidang_minat`, indeks unik, batasan unik gabungan pada `relawan`, dan **5 aturan ON DELETE** pada Tabel 10.
- **Tiga perbaikan:** `donasi.metode_pembayaran` dari `QRIS, Transfer Bank` menjadi **`QRIS, Transfer Mandiri`** (menyusul pergantian rekening 29 Agustus; data lama masih memuat `Transfer BNI` dan `Virtual Account`); `notifikasi_logs.status` dari `terkirim, gagal` menjadi **`terkirim`** karena nilai `gagal` tidak pernah ditulis jalur kode mana pun — pencatatan kegagalan berhenti di berkas log kanal `notifikasi`; `personal_access_tokens.tokenable_*` ditegaskan memakai **satu indeks gabungan**, bukan dua indeks terpisah.
- Rincian verifikasi ditulis pada blok **Catatan penyusunan** di akhir berkas 2.3 (blok itu **tidak** disalin ke naskah akhir).

### 3.18 Perbaikan hosting: PSR-4 dan `VITE_API_URL` (31 Agustus)
Dua cacat terpisah yang muncul bersamaan saat situs pertama kali dihosting. Gejalanya bercampur sehingga sempat sulit dipisahkan: sebagian data tidak masuk, disertai `500` di konsol peramban.

**a. Lima berkas PHP tidak PSR-4 → galat 500.** Windows tidak peka huruf besar/kecil, Linux peka. Autoloader mencari `GaleriController.php` tetapi berkas di disk bernama `galeriController.php`, sehingga `Class not found` → 500. Kegagalannya **selektif**, itulah sebabnya sebagian data tetap masuk:

| Berkas (lama → baru) | Dampak saat rusak |
|---|---|
| `donasiController.php` → `DonasiController.php` | Donasi 500 |
| `galeriController.php` → `GaleriController.php` | Galeri 500 |
| `kampanyeController.php` → `KampanyeController.php` | Berita 500 |
| `relawanController.php` → `RelawanController.php` | Relawan 500 |
| `roleMiddleware.php` → `RoleMiddleware.php` | **Seluruh `/admin/*` 500** |

`AuthController`, `KegiatanController`, `AdminController`, dan `NotifikasiController` namanya sudah benar sehingga Login dan Kegiatan tetap hidup. Penggantian nama dilakukan dengan `git mv` dua langkah karena `core.ignorecase=true` di Windows membuat Git tidak melihat perubahan kapitalisasi. Diverifikasi dengan `composer dump-autoload -o` lalu `class_exists()` — ketujuh kelas kunci **OK**.

**b. `VITE_API_URL` kurang `/v1` → galat 404.** Berkas `.env` sempat berisi `/api`, padahal rute berada di `/api/v1`. Terbukti dari bundel yang sudah terlanjur diunggah: `var Wn = "/api"` pada `dist/assets/index-BcVjpcUO.js`. Efek keduanya, `STORAGE_BASE` di `resources.js` memotong akhiran `/api/v1` untuk membentuk `/storage`; dengan nilai `/api` pemotongan gagal sehingga **seluruh foto galeri dan bukti transfer tidak tampil**. Sudah dibetulkan menjadi `/api/v1`, `.env.development` menjadi `http://127.0.0.1:8000/api/v1`, lalu `npm run build` diulang dan `dist.zip` dibuat ulang. Bundel baru terverifikasi memuat `/api/v1` dan `STORAGE_BASE` yang benar.

> **Pelajaran yang mudah tertukar:** rute yang tidak cocok menghasilkan **404**, sedangkan kelas yang tidak ditemukan menghasilkan **500**. Kalau di tab Network tercampur keduanya, memang ada dua masalah — jangan berhenti setelah salah satunya diperbaiki.

### 3.19 Revisi pascahosting (14 September)
Hasil peninjauan penyusun setelah situs dihosting.

- **Penyaring tanggal di admin Relawan & Donasi** — dua kotak `type="date"` itu sebenarnya satu rentang (*sejak* dan *sampai*) yang hanya dibedakan lewat *tooltip*, sehingga tampak dobel. Diganti **satu pilihan "Bulan"** yang isinya diambil dari bulan yang benar-benar ada pada data (terbaru di atas); kepala berkas ekspor kini mencatat *Bulan daftar/donasi*. Pengelompokan bulan memakai jam lokal, bukan `toISOString()` yang dulu menggeser data pukul 00.00–06.59 WIB ke hari sebelumnya.
- **Tabel admin kini memuat seluruh data.** Penyaring bulan berjalan di peramban, jadi hanya benar bila semua baris dimuat. Ternyata `DonasiController::index` memakai `paginate(20)` dan mengabaikan `per_page`, sehingga daftar & ekspor donasi **diam-diam berhenti di 20 baris**. Perbaikan: helper `ambilSemuaHalaman()` di `resources.js` untuk Donasi & Relawan, dan peladen kini menghormati `per_page` (1–100).
- **Logo hati → logo Karinakas** pada Login, Register, ForgotPassword (6 titik). **Favicon** diganti dari logo bawaan Vite menjadi potongan logo Karinakas 64 px + `apple-touch-icon` 180 px. Ikon hati bermakna "donasi" sengaja dipertahankan.
- **Linktree** — `bi-linktree` tidak ada di Bootstrap Icons 1.13.1, jadi tombolnya kosong. Diganti SVG lambang Linktree.
- **Alamat** — Footer (`Jl. Panuluh…`) dan Kontak (`Jl. Pandanaran No. 13, Semarang`) sama-sama salah, begitu pula petanya. Kini keduanya membaca `src/data/lembaga.js`: **Jl. Empu Panuluh No.377A, Pringwulung, Condongcatur, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta**, dengan sematan Google Maps berbasis alamat + tautan "Buka di Google Maps".
- **Dokumen ikut disesuaikan:** SKPL FR SIKAS 501 & 507 dan UC-15 (*rentang tanggal* → *bulan*), DPPL 2.2 keluaran `index` Donasi & Relawan, arsip bahan 2.4, CONTEXT §9 & §11.
- **Kunci donasi** — diputuskan **Opsi A** dan sudah dikerjakan, lihat §3.20.

### 3.20 Kunci data keuangan donasi — Opsi A (14 September)
- **Keputusan penyusun:** verifikasi pembayaran donasi **khusus Super Admin** (berperan sebagai bendahara). Alasannya: verifikasi berarti mencocokkan bukti dengan mutasi rekening atau QRIS, dan siapa pun yang memegang akses rekening pasti melihat nominalnya. "Admin memverifikasi tetapi nominal disembunyikan" tidak mungkin konsisten.
- **Kebocoran yang ditemukan sebelum perbaikan:**
  1. Gambar bukti transfer tampil ke admin, dan nominal terbaca di gambarnya.
  2. `index` hanya menghapus `jumlah`; kode transaksi, rekening pengirim, biaya, dan bukti tetap dikirim.
  3. **`/admin/donasi/search` sama sekali tidak menyamarkan** — nominal lengkap sampai ke admin.
  4. **`PUT /admin/donasi/{id}` tanpa pengecekan Super Admin di server** — admin bisa mengubah nominal lewat API; hanya tombolnya yang disembunyikan.
  Butir 3 dan 4 melanggar FR SIKAS 510/512/513, NFR 3.4.4.4, dan K-15 yang sudah tertulis di SKPL. Akarnya sama dengan celah Manajemen Pengguna: `Gate::before` meloloskan semua `authorize()` untuk admin.
- **Kode:** `DonasiController` — konstanta `MEDAN_KEUANGAN`, `sembunyikanKeuangan()` pada `index` & `search` (memakai `makeHidden`), `wajibSuperAdmin()` pada `updateStatus`, `update`, `destroy` (membalas 403). `SectionDonasi.jsx` — admin biasa tidak lagi mendapat kolom Ubah Status, tombol Detail/Bukti, Edit, dan Hapus; statusnya tampil sebagai label.
- **Diuji langsung lewat API — 18/18 lulus.** Admin: 16 baris daftar dan 10 baris hasil cari tanpa satu pun medan keuangan; PATCH status, PUT, dan DELETE dibalas 403; dasbor tetap tanpa total nominal; modul relawan tetap berjalan. Super admin: `jumlah` dan `bukti_transfer` terkirim; tindakan pada ID palsu dibalas 404 (artinya lolos penjaga peran). Seluruh uji memakai ID palsu sehingga tidak ada data yang berubah.
- **Dokumen yang disesuaikan:** SKPL.md (ringkasan produk, glosarium, F-15, F-19, matriks fungsi–peran, karakteristik pengguna, A-04, Lampiran B, rujukan TESTING) · SKPL 3.2 (FR SIKAS 508, 509, 511, 512, 513) · SKPL 3.3 (AK-03, AK-04, UC-16, diagram Mermaid) · SKPL 3.4 (NFR 3.4.4.4) · `use-case-diagram.drawio` (garis Admin–UC-16 dihapus) · DPPL.md (definisi peran, paket Donasi) · DPPL 2.2 (DonasiController: deskripsi kelas, konstanta, 5 fungsi publik, 2 fungsi privat baru — **70 → 72 tabel fungsi**) · `class-diagram.drawio` · TESTING.md (TC-ADN-03/04/06/08 diubah, TC-ADN-10–12 baru — **176 → 179 kasus**) · SKENARIO-TUGAS (B4 menjadi tugas super admin) · CONTEXT §3 & §9.
- **Tindakan penyusun:** ekspor ulang PNG diagram use case dan diagram kelas dari berkas `.drawio`.

### 3.21 Pemulihan kata sandi berbasis tautan & pemberitahuan khusus surel (16 September)
Tiga permintaan penyusun setelah meninjau situs yang sudah dihosting.

- **Petunjuk akun admin dihapus dari halaman Masuk.** Baris "Admin: gunakan akun @karinakas.org" tidak lagi ditampilkan.
- **Pemulihan kata sandi: OTP → tautan sekali pakai.** `POST /forgot-password {email}` kini membangkitkan token acak 64 karakter, menyimpan **sidik SHA-256**-nya pada cache (`reset_sandi:{sidik}`, berlaku **60 menit**), lalu mengirim surel `TautanResetSandi` berisi tautan `{FRONTEND_URL}/reset-password?token=...&email=...`. Halaman tujuan memanggil `POST /reset-password/check` lebih dahulu agar tautan mati langsung ketahuan, lalu `POST /reset-password {token, email, new_password, new_password_confirmation}` menyimpan kata sandi baru, menghapus tautan, dan mencabut seluruh token sesi. Permintaan tautan baru membatalkan tautan sebelumnya. Rute `/verify-otp` diganti `/reset-password/check`; `KodeOtpReset` beserta templatnya dihapus.
- **FE:** `pages/ForgotPassword.jsx` disederhanakan menjadi satu langkah, ditambah halaman baru `pages/ResetPassword.jsx` pada rute `/reset-password`. **BE:** `AuthController`, `app/Mail/TautanResetSandi.php`, `resources/views/emails/tautan-reset-sandi.blade.php`, `config/app.php` (`frontend_url`).
- **⚠️ Wajib diisi saat deploy:** `FRONTEND_URL` pada `.env` peladen. Nilai inilah yang menyusun alamat di dalam tautan; bila kosong, tautan memakai `APP_URL` (domain backend) sehingga mengarah ke alamat yang keliru. Surel juga harus benar-benar aktif (`RESEND_API_KEY`/SMTP) — inilah sebab pengujian di situs yang sudah dihosting sebelumnya gagal.
- **Pembatas laju dipisah per kelompok rute.** Ditemukan saat pengujian: `throttle:5,1` tanpa nama memakai kunci `domain|IP`, bukan per rute, sehingga `/login`, `/register`, `/forgot-password`, `/reset-password`, dan `/reset-password/check` berbagi satu jatah 5 permintaan per menit. Karena halaman penyetelan ulang memanggil `/reset-password/check` otomatis saat dimuat, beberapa kali muat ulang bisa ikut memblokir login pengguna selama semenit. Kini didaftarkan pembatas bernama di `AppServiceProvider`: `masuk` 5/menit, `lupa-sandi` 5/menit, dan `reset-sandi` 20/menit, masing-masing per alamat IP.
- **Pemberitahuan WhatsApp ditiadakan.** Pencatatan `NotifikasiLog` berkanal `whatsapp` dihapus dari `RelawanController` dan `DonasiController`, fungsi `kirimWhatsApp()` beserta templatnya dihapus dari `NotifikasiController`, dan parameter `$channel` pada `kirimNotifikasiDonasi()` dihilangkan. Di layar, ikon kanal pada panel Notifikasi dan tab Profil tidak lagi memakai lambang WhatsApp. Kolom `notifikasi_logs.tipe` tetap menerima nilai `whatsapp`, tetapi sistem tidak lagi menghasilkannya.
- **Diuji langsung lewat API — 13/13 lulus.** Surel dialihkan sementara ke `MAIL_MAILER=log` agar tautannya terbaca dari berkas log: permintaan tautan → 200 dengan token 64 karakter di dalam surel; token benar → 200; token diubah satu karakter → 422; surel tidak cocok dengan token → 422; permintaan tautan baru membatalkan tautan lama (lama → 422, baru → 200); sandi < 8 karakter → 422; sandi sah → 200; tautan dipakai ulang → 422; login dengan sandi baru → 200; rute lama `/verify-otp` → 404. Nilai `.env` dikembalikan dan kata sandi akun uji tetap seperti semula.
- **Dokumen disesuaikan:** SKPL (FR SIKAS 213, antarmuka 12a & 12b, batasan WhatsApp, Lampiran B, kamus data), SKPL 3.5 · DPPL.md (paket autentikasi) · DPPL 2.2 (atribut token, forgotPassword, resetPassword, `otpKey` → empat fungsi, tanda tangan `kirimNotifikasiDonasi`) · DPPL 2.3 · `class-diagram.drawio` · arsip bahan 2.4 (ForgotPasswordView + ResetPasswordView) · TESTING (TC-AUT-13 s.d. 20 ditulis ulang, TC-AUT-19a baru, TC-REL-11, TC-NOT-01, tabel keterbatasan — **179 → 180 kasus**) · SKENARIO-TUGAS §3.4 · CONTEXT · PROGRESS · DEPLOY (blok `.env` + catatan surel).

---

## 4. Notifikasi — status terkini ⚠️ (penting)
- **Email relawan-diterima: SUDAH ada** — `app/Mail/RelawanDiterima.php` + `resources/views/emails/relawan-diterima.blade.php`, dipicu di `RelawanController.updateStatus` saat status → `diterima`.
  - Kini `MAIL_MAILER=log` → email **tertulis ke `storage/logs/laravel.log`** (sudah diuji lengkap). **Isi SMTP di `.env`** (Gmail App Password / Mailtrap) → restart server → terkirim asli.
- **WhatsApp: DITIADAKAN (16 September 2026).** Seluruh pemberitahuan otomatis dikirim lewat surel, sehingga gateway WhatsApp tidak lagi diperlukan. Pencatatan `NotifikasiLog` berkanal `whatsapp` sudah dihapus dari kode.
- **Donasi berhasil**: notifikasi baru dicatat; email/WA nyata belum dipasang (bisa mengikuti pola relawan).

---

## 5. Belum / opsional ⏳

**Temuan audit kode (22 Agustus) — sudah dikerjakan ✅ (lihat §3.12):**
- [x] Panjang kata sandi disamakan **`min:8` di seluruh jalur** (registrasi, ganti, reset, tambah/reset akun oleh super admin) — sisi frontend ikut disesuaikan.
- [x] **Pembatasan laju** aktif pada seluruh rute autentikasi. Sejak 16 September 2026 memakai pembatas **bernama** (`masuk` 5/menit, `lupa-sandi` 5/menit, `reset-sandi` 20/menit per IP) agar jatahnya tidak bercampur. Diuji: percobaan masuk ke-6 dibalas `429`.
- [x] **Pemulihan kata sandi kini nyata** — backend sebelumnya hanya stub `TODO`; sekarang OTP 6 digit, sekali pakai, berlaku 10 menit.
- [x] **`SESSION_DRIVER` diubah ke `file`** — sebelumnya `database` padahal tabel `sessions` tak pernah dimigrasikan.

**Sudah dikerjakan ✅ (lihat §3.13 & §3.14):**
- [x] **Formulir Kontak dihapus** — diganti kanal WhatsApp. Tidak ada lagi fitur UI yang menggantung.
- [x] **Counter relawan konsisten** — listener `created` ditambahkan, data lama diperbaiki.

**Butuh layanan eksternal / keputusan:**
- [x] ~~WhatsApp nyata (pilih gateway + API key)~~ — **dibatalkan 16 September 2026**; pemberitahuan cukup lewat surel.
- [ ] Aktifkan email nyata (isi SMTP; kode siap). Terapkan juga untuk donasi-berhasil bila mau.
- [ ] Payment gateway otomatis (QRIS dinamis/VA, verifikasi otomatis) — sekarang QRIS **statis** & transfer, keduanya manual + upload bukti.
- [x] ~~Simpan `public/qris-karinakas.png`~~ — **sudah ada** (267 KB, 8 Agustus 2026). Metode QRIS dapat diuji.

**Menunggu tindakan penyusun (per 29 Agustus):**
- [ ] **Timpa `public/karinakas-logo.png`** dengan berkas logo HD. Semua kode sudah menunjuk ke nama berkas itu, jadi begitu ditimpa, Navbar, Footer, IntroScreen, dan sidebar admin ikut berubah.
- [ ] **Ekspor ulang PNG diagram** — `docs/skpl/use-case-diagram.png` (garis Admin–UC-16 sudah dihapus dari `.drawio`; elips UC-16 boleh dipindah ke area Super Admin saat mengekspor) dan Gambar 2.5 dari `docs/dppl/class-diagram.drawio` (kotak DonasiController bertambah dua fungsi privat).
- [ ] **Konfirmasi QRIS** — data rekening baru sudah diterapkan ke bagian transfer bank. Bila gambar QRIS juga sudah diganti ke Mandiri, NMID pada konstanta `QRIS` di `Donasi.jsx` perlu diperbarui.
- [x] ~~**Ikon hati pada Login, Register, dan ForgotPassword**~~ — **sudah diganti logo Karinakas** (14 September, §3.19).

**Temuan kode yang belum diputuskan:**
- [ ] **Empat titik akhir `/admin/rekapan/*` tidak pernah dipanggil klien.** Tiga terimplementasi, satu (`exportRekapan`) hanya kerangka yang membalas `download_url: null`. Ekspor yang berjalan seluruhnya di sisi klien. Bila dihapus, jumlah titik akhir berubah **65 → 61** dan harus disesuaikan di SKPL 3.1.4 serta DPPL 1.2.2.
- [x] ~~**Lima berkas PHP tidak PSR-4**~~ — **sudah diperbaiki 31 Agustus** (lihat §3.18). Risikonya sempat terwujud: galat 500 di hosting Linux.
- [x] ~~**Ekspor rekapitulasi terbatas 100 baris**~~ — **sudah diperbaiki** (14 September, §3.19). Batas sebenarnya ternyata **20 baris** untuk donasi karena `DonasiController::index` mengabaikan `per_page`.
- [ ] **Validasi `nama_lengkap` melebihi lebar kolom** — `AdminController::storeUser` dan `updateUser` memakai `max:150`, padahal `users.nama_lengkap` berupa `varchar(100)`. Nama 101–150 aksara lolos validasi lalu ditolak basis data saat super admin menambah akun. `AuthController` sudah benar `max:100`. Perbaikannya cukup menyamakan angka.
- [x] ~~**Kunci donasi tidak konsisten**~~ — **diputuskan Opsi A dan sudah dikerjakan** (14 September, §3.20).
- [ ] **`SectionNotifikasi.saveTpl`**
- [ ] **Satu berkas yatim** di `storage/app/public/galeri/` — `hib1InD6Po2D9BQeRtyehzuqlqGfDpEtH0PEKfZK.jpg`, sisa unggahan gagal, aman dihapus.
- [ ] **Kode `FR SIKAS 101`–`608`** masih berawalan SIKAS, sedangkan nama produk pada DPPL sudah **Website Karinakas**. Dibiarkan sebagai kode penomoran, atau diganti serentak di SKPL, TESTING.md, dan naskah use case.
- [ ] **`TESTING.md` belum memuat kasus uji penyaring baru** — perkiraan 6–8 kasus (saring per kegiatan, per bulan, gabungan, reset, ekspor mengikuti penyaring).

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
- **`VITE_API_URL` wajib berakhiran `/api/v1`** — rute Laravel = prefix `/api` (bootstrap) + grup `v1` (routes/api.php). Akhiran itu juga dipakai `resources.js` untuk membentuk alamat `/storage`, jadi nilai yang salah membuat **API 404 sekaligus foto tidak tampil**. Satu domain: `/api/v1`. Domain terpisah: `https://api-anda.com/api/v1`.
- **Ganti `VITE_API_URL` harus `npm run build` ulang** (dibakar saat build) — mengubahnya di peladen tidak berpengaruh sama sekali.
- **Nama berkas PHP wajib sama persis dengan nama kelasnya.** Di Windows salah kapitalisasi tidak terasa; di hosting Linux langsung `500 Class not found`.
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
- `TESTING.md` — 179 kasus uji black-box beserta rekapitulasinya
- `SKENARIO-TUGAS.md` — skenario tugas pengujian kebergunaan bersama pengguna nyata (15 tugas, lembar pengamatan, kuesioner SUS)
- `SKENARIO-TUGAS.md` — skenario uji kebergunaan: 15 tugas, lembar pengamatan, kuesioner SUS
- `DPPL.md` — naskah DPPL bagian depan, Bab 1, dan Subbab 2.1
- `docs/dppl/` — naskah DPPL per subbab:
  `CHECKLIST.md` (**baca ini dulu saat melanjutkan DPPL**) · `2.2-Perancangan-Rinci.md` (9 kelas kontroler, 75 tabel fungsi) ·
  `2.3-Perancangan-Data.md` (9 tabel, 116 medan, PDM) · `class-diagram.drawio` · `pdm-diagram.drawio` ·
  `_arsip-kelas-boundary-entity.md` (bukan naskah — bahan mentah Subbab 2.4)
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
3. **Aktifkan email nyata**: isi SMTP `.env` (Mailtrap untuk uji) → approve relawan → cek email masuk. **Ini juga prasyarat pengujian kebergunaan** — tanpa SMTP, tugas pemulihan kata sandi pada `SKENARIO-TUGAS.md` tidak dapat dikerjakan peserta karena kode OTP hanya masuk ke `storage/logs/laravel.log`.
3b. **Selesaikan DPPL Subbab 2.4** — satu-satunya subbab yang tersisa. Butuh tangkapan layar 22 halaman; bahan uraiannya sudah tersedia di `docs/dppl/_arsip-kelas-boundary-entity.md`.
4. **Jalankan pengujian** memakai TESTING.md, isi kolom Status, lalu salin rekapitulasinya ke bab pengujian skripsi.
5. ~~**Pilih gateway WhatsApp**~~ — **dibatalkan**; seluruh pemberitahuan otomatis dikirim lewat surel (§3.21).
6. (Opsional) email **donasi berhasil** mengikuti pola relawan (di `DonasiController.updateStatus`).
7. **Deploy** sesuai DEPLOY.md: `VITE_API_URL`, `storage:link`, CORS, SPA fallback, `max_file_uploads`, `APP_DEBUG=false`.

> Untuk melanjutkan di room chat baru: cukup instruksikan *"baca CONTEXT.md & HANDOFF.md di frontend_karinakas"*.
