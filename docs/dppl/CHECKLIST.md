# ✅ CHECKLIST DPPL — Website Karinakas

Daftar periksa penyusunan **Dokumen Perancangan Perangkat Lunak**.
Dibuat agar perpindahan room chat tidak kehilangan konteks.

> **Cara melanjutkan di room chat baru:** cukup instruksikan
> *"baca `docs/dppl/CHECKLIST.md`, lalu lanjutkan dari subbab yang belum selesai"*.
> Untuk konteks sistem secara menyeluruh, baca juga `CONTEXT.md` dan `HANDOFF.md`.

**Acuan format:** seluruh subbab disusun mengikuti contoh DPPL pembanding milik rekan penyusun
(sistem *Grande Pet Zone Platform*). Bila ada perbedaan bentuk, itu karena sistemnya memang
berbeda — alasannya dicatat pada kolom keterangan.

---

## Ringkasan

| Subbab | Status | Berkas |
|---|---|---|
| Halaman muka, Daftar Revisi, Daftar Isi | ✅ Selesai | `DPPL.md` |
| 1. Pendahuluan | ✅ Selesai | `DPPL.md` |
| 1.1 Tujuan Penulisan Dokumen | ✅ Selesai | `DPPL.md` |
| 1.2 Ruang Lingkup | ✅ Selesai | `DPPL.md` |
| 1.3 Definisi, Akronim, dan Singkatan | ✅ Selesai | `DPPL.md` |
| 1.4 Referensi | ✅ Selesai | `DPPL.md` |
| 2.1 Perancangan Arsitektur | ✅ Selesai | `DPPL.md` |
| 2.1.1 Overview Sistem | ✅ Selesai | `DPPL.md` |
| 2.1.2 Arsitektur Perangkat Lunak | ✅ Selesai | `DPPL.md` |
| 2.1.3 Deployment Diagram | ✅ Selesai | `DPPL.md` |
| 2.2 Perancangan Rinci | ✅ Selesai | `docs/dppl/2.2-Perancangan-Rinci.md` |
| 2.2.1 Kelas Diagram | ✅ Selesai | idem + `class-diagram.drawio` |
| 2.2.2 Deskripsi Kelas dan Atribut | ✅ Selesai | idem |
| 2.3 Perancangan Data | ✅ Selesai | `docs/dppl/2.3-Perancangan-Data.md` |
| 2.3.1 Dekomposisi Data | ✅ Selesai | idem |
| 2.3.2 Physical Data Model | ✅ Selesai | `docs/dppl/2.3.2-Physical-Data-Model.md` + `pdm-diagram.drawio` |
| **2.4 Perancangan Antarmuka** | ⬜ **Belum dikerjakan** | — |
| 2.4.1 Antarmuka Website | ⬜ Belum dikerjakan | — |

---

## Rincian yang sudah selesai

### ✅ Halaman muka dan bagian depan — `DPPL.md`

- [x] Halaman muka: judul dokumen, nama penyusun, penanda isian NIM dan identitas prodi
- [x] Tabel kop dokumen (Nomor Dokumen, Halaman, Revisi, Tanggal)
- [x] **DAFTAR REVISI** — tabel Revisi A–F
- [x] Tabel Ditulis / Diperiksa / Disetujui oleh
- [x] **Daftar Isi**

### ✅ 1. Pendahuluan — `DPPL.md`

- [x] Paragraf pembuka dengan nama produk terisi
- [x] Paragraf penghubung ke SKPL beserta rantai penelusuran
- [x] **1.1** Tujuan penulisan + 4 kelompok pembaca sasaran + batas dokumen
- [x] **1.2** Ruang Lingkup — 3 anak subbab
  - [x] 1.2.1 Identifikasi Produk (tabel 6 komponen)
  - [x] 1.2.2 Batas Cakupan Perancangan (5 tercakup, 5 di luar cakupan)
  - [x] 1.2.3 Manfaat dan Sasaran Penerapan
- [x] **1.3** Definisi (25 istilah) + Akronim dan Singkatan (34 butir), keduanya urut abjad
- [x] **1.4** Referensi — 18 rujukan, seluruhnya terbitan 2021–2026

### ✅ 2.1 Perancangan Arsitektur — `DPPL.md`

- [x] Paragraf pengantar subbab
- [x] **2.1.1 Overview Sistem** — pernyataan produk baru, 2 komponen utama, Gambar 2.1 diagram konteks
- [x] **2.1.2 Arsitektur Perangkat Lunak** — pola MVC, tiga lapisan bernama
      *Presentation Layer*, *Business Logic Layer*, *Data Access Layer & Data Storage*
  - [x] Gambar 2.2 arsitektur berlapis
  - [x] Tabel 2.1 tanggung jawab lapisan
  - [x] Dekomposisi *business logic layer* menjadi 8 paket
  - [x] Gambar 2.3 *package dependency diagram*
  - [x] 3 keputusan perancangan
- [x] **2.1.3 Deployment Diagram** — Gambar 2.4, Tabel 2.2 simpul, Tabel 2.3 porta pengembangan

### ✅ 2.2 Perancangan Rinci — `docs/dppl/2.2-Perancangan-Rinci.md`

- [x] Pengantar pola **Boundary–Control–Entity** + tabel ringkasan jumlah kelas
- [x] **2.2.1 Kelas Diagram**
  - [x] Gambar 2.5 dalam tiga pita mendatar sesuai stereotip
  - [x] Berkas `class-diagram.drawio` — 39 kelas, 49 garis, tiap garis berjalur sendiri, berwarna per kontroler
  - [x] Penjelasan empat cara pemisahan garis agar tidak menumpuk
- [x] **2.2.2 Deskripsi Kelas dan Atribut** — **9 kelas kontroler, dinomori 1–9**
  - [x] Cakupan dibatasi pada kelas `«control»` saja: 8 kontroler Laravel + `RoleMiddleware`
  - [x] Tiap kelas: kalimat deskripsi + tabel *Deskripsi atribut kelas* + tabel *Deskripsi fungsi pada kelas*
  - [x] **75 tabel fungsi** — satu tabel per fungsi, berisi Input / Output / Deskripsi. Semula 70; bertambah
      dua fungsi privat DonasiController (`sembunyikanKeuangan`, `wajibSuperAdmin`) pada 14 September 2026,
      lalu pada 16 September 2026 `otpKey` diganti empat fungsi pemulihan kata sandi berbasis tautan
      (`checkResetToken`, `kunciToken`, `kunciTokenPengguna`, `ambilDataTautan`)
  - [x] **Disesuaikan 14 September 2026 (Opsi A kunci donasi):** DonasiController — deskripsi kelas, konstanta `MEDAN_KEUANGAN`, tanda tangan `destroy(Request $request, $id)`, penolakan 403 pada `updateStatus`, `update`, `destroy`, penyamaran pada `index` & `search`, serta dua fungsi privat baru. `class-diagram.drawio` ikut diperbarui; **PNG Gambar 2.5 perlu diekspor ulang**
  - [x] Paragraf penjelas cakupan: `«entity»` dirinci di 2.3, `«boundary»` di 2.4,
        dan sistem tidak memiliki kelas *service* tersendiri pada sisi layanan data
- [x] Catatan penyusunan: 3 bagian kode yang masih berupa kerangka, ditulis apa adanya

### ✅ 2.3 Perancangan Data — `docs/dppl/2.3-Perancangan-Data.md`

- [x] **2.3.1 Dekomposisi Data** — 9 tabel, 116 medan
  - [x] Kolom: Nama Field, Tipe Data, Null, Konstrain, Range Nilai, Default, Keterangan
  - [x] `created_at` dan `updated_at` dicantumkan pada setiap tabel
  - [x] Catatan batasan unik gabungan pada tabel `relawan`
- [x] **2.3.2 Physical Data Model** — sejak 1 September 2026 naskahnya berada pada berkas terpisah
      [`2.3.2-Physical-Data-Model.md`](2.3.2-Physical-Data-Model.md)
  - [x] Gambar 2.6 + berkas `pdm-diagram.drawio` (dibangkitkan dari skema MySQL)
  - [x] Relasi dikelompokkan: One-to-Many dengan FK, One-to-Many tanpa FK, Polimorfik, tabel berdiri sendiri
  - [x] Tabel 10 aturan `ON DELETE` beserta alasan perancangannya
  - [x] 4 aturan integritas lain
- [x] **Diverifikasi ulang 30 Agustus 2026** terhadap basis data MySQL yang berjalan (`information_schema`),
      bukan terhadap catatan terdahulu. 116 medan, urutan kolom, indeks unik, batasan unik gabungan,
      dan 5 aturan ON DELETE **cocok seluruhnya**. Tiga kolom *Range Nilai* diperbaiki
      (`donasi.metode_pembayaran`, `notifikasi_logs.status`, indeks gabungan `personal_access_tokens`).
      Rinciannya ada pada blok *Catatan penyusunan* di akhir berkas 2.3

---

## ⬜ Yang belum dikerjakan

### 2.4 Perancangan Antarmuka

Hanya **2.4.1 Antarmuka Website**. Sistem ini tidak memiliki aplikasi bergerak,
sehingga tidak ada 2.4.2 sebagaimana dokumen pembanding.

**Format tiap halaman** (mengikuti contoh pembanding):

```
A1. Nama Halaman
[tangkapan layar]
Deskripsi : ...
Input     : ...
Output    : ...
```

**Perlu diputuskan lebih dulu — tangkapan layar disiapkan bagaimana:**

- [ ] **Pilihan A** — penyusun menyiapkan sendiri tangkapan layarnya, lalu deskripsi/input/output dituliskan
- [ ] **Pilihan B** — aplikasi dijalankan lebih dulu (`php artisan serve` + `npm run dev`) untuk mengambil tangkapan layar

> **Bahan mentah sudah tersedia.** Uraian tiap halaman beserta nama keadaan dan penangan
> peristiwanya — seluruhnya diambil langsung dari kode — tersimpan pada
> [`_arsip-kelas-boundary-entity.md`](_arsip-kelas-boundary-entity.md). Tinggal diubah bentuknya
> menjadi Deskripsi / Input / Output dan disisipi tangkapan layar.

**Daftar halaman yang perlu dicakup** — 23 halaman:

| No | Halaman | Berkas |
|---|---|---|
| A1 | Beranda | `pages/Home.jsx` |
| A2 | Tentang Kami | `pages/TentangKami.jsx` |
| A3 | Galeri | `pages/Galeri.jsx` |
| A4 | Kegiatan | `pages/Kegiatan.jsx` |
| A5 | Berita | `pages/Berita.jsx` |
| A6 | Detail Berita | `pages/BeritaDetail.jsx` |
| A7 | Kontak | `pages/Kontak.jsx` |
| A8 | Masuk | `pages/Login.jsx` |
| A9 | Pendaftaran Akun | `pages/Register.jsx` |
| A10 | Lupa Kata Sandi | `pages/ForgotPassword.jsx` |
| A10a | Penyetelan Ulang Kata Sandi | `pages/ResetPassword.jsx` |
| A11 | Donasi | `pages/Donasi.jsx` |
| A12 | Pendaftaran Relawan | `pages/DaftarRelawan.jsx` |
| A13 | Profil Pengguna | `pages/Profil.jsx` |
| A14 | Dasbor Pengelolaan | `pages/AdminDashboard.jsx` |
| A15 | Kelola Berita | `pages/admin/SectionBerita.jsx` |
| A16 | Kelola Kegiatan | `pages/admin/SectionKegiatan.jsx` |
| A17 | Kelola Relawan | `pages/admin/SectionRelawan.jsx` |
| A18 | Kelola Galeri | `pages/admin/SectionGaleri.jsx` |
| A19 | Kelola Donasi | `pages/admin/SectionDonasi.jsx` |
| A20 | Manajemen Pengguna | `pages/admin/SectionPengguna.jsx` |
| A21 | Riwayat Notifikasi | `pages/admin/SectionNotifikasi.jsx` |
| A22 | Jejak Audit | `pages/admin/SectionAudit.jsx` |

---

## ⬜ Perlu dilengkapi penyusun sendiri

Hal-hal yang tidak dapat diisikan tanpa data dari penyusun.

- [ ] **Halaman muka** — NIM, program studi, fakultas, universitas
- [ ] **Kop dokumen** — nomor dokumen, nomor revisi, tanggal
- [ ] **Subbab 1.4 butir 1** — identitas resmi dokumen SKPL (program studi dan universitas)
- [ ] **Subbab 1.4 butir 5** — nomor Peraturan Bank Indonesia dikutip dari ingatan,
      cocokkan ke bi.go.id sebelum dipakai
- [ ] **Subbab 1.4 butir 2** — pastikan judul lengkap ISO/IEC/IEEE 42010:2022
- [ ] **Mendeley entri [11]** — nama penulis `I. N. A. A. Ni Wayan Purnama` tercampur antara
      inisial dan nama lengkap; perbaiki agar naskah utama dan DPPL sama
- [ ] **Ekspor gambar** — buka kedua berkas `.drawio` di app.diagrams.net, atur letaknya bila perlu,
      lalu ekspor PNG untuk disisipkan ke naskah Word

---

## ⬜ Keputusan yang masih menggantung

Bukan bagian naskah, tetapi memengaruhi isinya.

- [ ] **Kode `FR SIKAS 101`–`608`** — nama produk sudah diganti menjadi *Website Karinakas*,
      tetapi kode kebutuhan di SKPL masih berawalan `SIKAS`. Pilihannya: dibiarkan sebagai
      kode penomoran, atau diganti serentak di SKPL, TESTING.md, dan naskah use case
- [ ] **Endpoint `/admin/rekapan/*`** — empat titik akhir tidak pernah dipanggil aplikasi klien,
      salah satunya (`exportRekapan`) hanya kerangka. Dihapus atau dibiarkan? Bila dihapus,
      angka **66 titik akhir** pada SKPL 3.1.4 dan DPPL 1.2.2 berubah menjadi 62
- [x] ~~**5 berkas PHP tidak PSR-4**~~ — **sudah diperbaiki 31 Agustus 2026.** Risikonya sempat
      terwujud sebagai galat 500 saat situs dihosting di Linux. Kelima berkas diganti nama menjadi
      berhuruf kapital di awal (`RoleMiddleware.php`, `DonasiController.php`, `GaleriController.php`,
      `KampanyeController.php`, `RelawanController.php`) memakai `git mv` dua langkah, lalu
      diverifikasi dengan `composer dump-autoload -o` dan `class_exists()`. Tidak memengaruhi
      naskah DPPL karena nama kelas pada Subbab 2.2.2 sejak awal sudah ditulis berhuruf kapital
- [x] ~~**`users()` dan `deleteUser()` tidak dijaga `isSuperAdmin()`**~~ — ditemukan dan **diperbaiki 19 September 2026.**
      Keduanya memakai `$this->authorize()`, padahal `Gate::before` pada `AppServiceProvider`
      memberikan seluruh *ability* kepada peran `admin` maupun `super_admin`, sehingga pemeriksaan itu
      selalu lolos. Akibatnya admin biasa dapat membaca seluruh daftar akun dan menghapus akun
      pengguna — dan karena `donasi.user_id` memakai `ON DELETE CASCADE`, penghapusan akun turut
      melenyapkan catatan donasi milik akun tersebut. Bertentangan dengan FR SIKAS 513 dan 514,
      F-19, UC-19, serta definisi Admin pada DPPL. **Dokumen sudah benar; yang perlu menyusul kodenya.**
      Perbaikannya menyamakan pola dengan `storeUser`/`updateUser`/`resetUserPassword` yang sudah aman.
      Diuji lewat API pada 19 September 2026: admin dibalas 403 pada `GET /admin/users` dan
      `DELETE /admin/users/{id}`, baris `users` terbukti masih ada setelahnya, sedangkan super admin
      tetap berhasil. Deskripsi kedua fungsi pada DPPL Subbab 2.2.2 ikut diperbarui

- [ ] **Jejak audit tidak mencakup pengelolaan konten** — `AuditLog::record` dipanggil pada 9 titik
      (relawan, donasi, akun pengguna), tetapi tidak pada 11 fungsi pengelolaan kegiatan, berita,
      dan galeri. **Diselesaikan lewat dokumen pada 19 September 2026:** NFR 3.4.4.8 dipersempit
      agar sepadan dengan FR SIKAS 516 yang sejak awal memang hanya menyebut data transaksional
      dan data akun. Bila kelak cakupannya hendak diperluas, cukup menambah satu baris per fungsi

- [ ] **Validasi `nama_lengkap` tidak sepadan dengan skema** — `AdminController::storeUser` dan
      `updateUser` memakai `max:150`, sedangkan kolom `users.nama_lengkap` berupa `varchar(100)`.
      Nama sepanjang 101–150 aksara lolos validasi lalu ditolak basis data. `AuthController` sudah
      benar memakai `max:100`. Ditemukan saat verifikasi 2.3 pada 30 Agustus 2026; tidak memengaruhi
      isi Subbab 2.3 karena skemanya sendiri sudah benar
- [x] ~~**Batas 100 baris pada ekspor rekapitulasi**~~ — **sudah diperbaiki 14 September 2026.** Batas
      sebenarnya 20 baris untuk donasi (`paginate(20)` mengabaikan `per_page`). Kini klien mengambil
      seluruh halaman dan peladen menghormati `per_page` 1–100; keluaran `index` di DPPL 2.2 disesuaikan

---

## Konvensi yang dipakai

| Hal | Ketentuan |
|---|---|
| Nama produk | **Website Karinakas** (bukan SIKAS) |
| Penomoran gambar | Gambar 2.1–2.4 pada 2.1 · Gambar 2.5 kelas diagram · Gambar 2.6 PDM |
| Penomoran tabel | Tabel 2.1–2.3 pada 2.1 · Tabel 1–9 struktur tabel · Tabel 10 aturan ON DELETE |
| Penomoran kelas | 1–9, hanya kelas kontroler; uraian kelas dibatasi pada stereotip `«control»` |
| Cakupan 2.2.2 | Controller saja (dan *service* bila ada — sistem ini tidak punya). `«entity»` → 2.3, `«boundary»` → 2.4 |
| Blok `> Ketentuan penulisan` | Pengingat aturan penulisan — **jangan disalin ke naskah akhir** |
| Sumber pernyataan teknis | Diturunkan langsung dari kode dan skema MySQL, bukan dari catatan terdahulu |

---

## Berkas terkait

| Berkas | Isi |
|---|---|
| `DPPL.md` | Bagian depan, Bab 1, Subbab 2.1 |
| `docs/dppl/2.2-Perancangan-Rinci.md` | Kelas diagram dan deskripsi 39 kelas |
| `docs/dppl/2.3-Perancangan-Data.md` | Pengantar + Subbab 2.3.1 Dekomposisi Data |
| `docs/dppl/2.3.2-Physical-Data-Model.md` | Subbab 2.3.2 Physical Data Model |
| `docs/dppl/class-diagram.drawio` | Sumber Gambar 2.5 |
| `docs/dppl/pdm-diagram.drawio` | Sumber Gambar 2.6 |
| `docs/dppl/README.md` | Indeks folder dan catatan konvensi |
| `docs/dppl/_arsip-kelas-boundary-entity.md` | **Bukan naskah.** Uraian kelas `«boundary»` dan `«entity»` yang dikeluarkan dari 2.2.2. Bagian `«boundary»`-nya menjadi bahan mentah 2.4 |
| `SKPL.md`, `docs/skpl/` | Dokumen kebutuhan — acuan utama DPPL |
| `CONTEXT.md`, `HANDOFF.md` | Konteks sistem dan progres pengembangan |
