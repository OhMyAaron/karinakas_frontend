# PERENCANAAN DAN DESKRIPSI HASIL UJI PERANGKAT LUNAK

**Website Karinakas**

Disusun oleh: Aaron Risang Panji Bharata — 220711818
Program Studi Informatika, Fakultas Teknologi Industri, Universitas Atma Jaya Yogyakarta


---

## 1. Pendahuluan

### 1.1 Tujuan

Dokumen Perencanaan, Deskripsi, dan Hasil Uji Perangkat Lunak (PDHUPL) ini berisi
informasi yang dibutuhkan untuk merencanakan dan melaksanakan pengujian perangkat lunak
Website Karinakas. Dokumen ini menjadi acuan teknis bagi penguji agar pengujian
dilakukan sesuai spesifikasi yang tercantum pada dokumen SKPL dan DPPL Website
Karinakas. Dokumen ini digunakan oleh peneliti sebagai referensi pelaksanaan pengujian,
serta oleh dosen pembimbing dan penguji Tugas Akhir sebagai bukti bahwa pengujian
sistem telah direncanakan dan dilaksanakan secara sistematis.

### 1.2 Deskripsi Umum Sistem

Website Karinakas merupakan perangkat lunak berbasis web untuk mendukung operasional
Yayasan Karinakas, dibangun dengan arsitektur *Single Page Application* — *frontend*
React 19.2 dan *backend* Laravel 13.7 di atas PHP 8.3, dengan basis data MySQL 8.
Sistem menyediakan modul-modul utama sebagai berikut.

1. **Autentikasi & Manajemen Akun** — registrasi, masuk dan keluar sistem, pemulihan
   kata sandi melalui tautan sekali pakai yang dikirim ke email, penggantian kata sandi,
   dan pembaruan profil.
2. **Publikasi Informasi** — profil lembaga, daftar dan detail kegiatan sosial, berita
   dan kampanye, galeri dokumentasi kegiatan, serta informasi kontak.
3. **Partisipasi Masyarakat** — pendaftaran relawan sesuai opsi jenis dan bidang minat
   per kegiatan, serta pengajuan donasi terikat kegiatan dengan unggah bukti pembayaran.
4. **Pengelolaan Konten** — tambah, ubah, hapus, dan pengaturan status untuk kegiatan,
   berita, dan galeri, khusus admin dan super admin.
5. **Verifikasi dan Pengawasan** — verifikasi pendaftaran relawan (admin dan super
   admin), verifikasi pembayaran donasi beserta pengendalian akses data keuangan
   (**khusus super admin**), manajemen akun pengguna (**khusus super admin**), dan
   jejak audit (**khusus super admin**).
6. **Pelaporan** — dasbor statistik sadar-peran dan rekapitulasi donasi, relawan, serta
   laporan keseluruhan lembaga dalam format lembar kerja Excel, dibentuk pada sisi
   klien.

### 1.3 Definisi, Akronim, dan Singkatan

| Definisi | Keterangan |
|---|---|
| *Black-Box Testing* | Pengujian fungsional yang menguji keluaran sistem terhadap masukan tanpa melihat struktur kode internal. |
| Butir Uji | Satu skenario pengujian spesifik terhadap suatu fungsi. |
| Handal | Kesimpulan bahwa keluaran aktual sesuai dengan keluaran yang diharapkan. |
| Opsi A | Keputusan perancangan yang membatasi seluruh akses data keuangan donasi dan fungsi verifikasinya hanya untuk peran Super Admin, dijelaskan pada DPPL Subbab 4.3.4/4.4.7. |
| SUS | *System Usability Scale*, instrumen kuesioner baku 10 butir untuk mengukur usability, dikembangkan John Brooke (1986). |

| Akronim dan Singkatan | Kepanjangan |
|---|---|
| PDHUPL | Perencanaan, Deskripsi, dan Hasil Uji Perangkat Lunak |
| SKPL | Spesifikasi Kebutuhan Perangkat Lunak |
| DPPL | Deskripsi Perancangan Perangkat Lunak |
| FR Karinakas | *Functional Requirement* Website Karinakas — kode kebutuhan fungsional pada SKPL (pola "FR Karinakas <nomor>") |
| API | *Application Programming Interface* |
| KTP | Kartu Tanda Penduduk |
| QRIS | *Quick Response Code Indonesian Standard* |

### 1.4 Referensi

1. Standard IEEE nomor ANSI/IEEE Std 829-2008, *Standard for Software and System Test Documentation*.
2. Dokumen SKPL Website Karinakas (`docs/skpl/`).
3. Dokumen DPPL Website Karinakas (`docs/dppl/`).
4. Laravel 13 Documentation, 2026; React 19 Documentation, 2026.
5. `TC_Blackbox_Testing_Karinakas.pdf` — rencana uji kotak hitam disusun peneliti.
6. Kuesioner Pengujian Fungsionalitas dan Usability Website Karinakas, disebar 3–26
   September 2026, 40 responden.

---

## 2. Lingkungan Pengujian Perangkat Lunak

### 2.1 Perangkat Lunak Pengujian

1. Sistem Website Karinakas versi produksi pada domain `karinakas.com` — *backend*
   Laravel 13.7 (PHP 8.3) dengan basis data MySQL 8.
2. Peramban Google Chrome / Microsoft Edge versi terbaru untuk mengakses website,
   diuji pula pada tampilan *mobile* (lihat catatan responsivitas Bab 6.4).
3. phpMyAdmin untuk verifikasi data pada basis data.
4. Google Form untuk penyebaran kuesioner usability.

### 2.2 Perangkat Keras Pengujian

1. Komputer/laptop untuk mengakses website (peran pengunjung umum, admin, super admin).
2. *Smartphone* untuk menguji tampilan responsif, mengingat mayoritas pengguna
   mengakses lewat *smartphone* (lihat SKPL Subbab 2.3).
3. Koneksi internet stabil untuk mengakses situs produksi.

### 2.3 Material Pengujian

1. Akun uji untuk tiap peran: pengunjung umum (tanpa akun), pengguna terdaftar,
   admin (`admin@karinakas.org`), dan super admin (`superadmin@karinakas.org`).
2. Data uji: kegiatan sosial beserta opsi jenis relawan dan bidang minat, berita,
   foto galeri, pendaftaran relawan, dan pengajuan donasi.
3. Contoh berkas bukti pembayaran (gambar JPG/PNG, maksimal 4 MB).

### 2.4 Sumber Daya Manusia

1. Penguji fungsional (*black-box*): peneliti sendiri, sebagai pengembang sistem.
2. Responden pengujian usability: 40 orang, terdiri atas 29 pengunjung umum/pengguna
   terdaftar dan 11 pengelola (10 admin, 1 super admin), direkrut dari kalangan umat
   dan pengurus Karinakas serta rekan sejawat.

### 2.5 Prosedur Umum Pengujian

#### 2.5.1 Pengenalan dan Latihan

Pengenalan sistem kepada responden usability dilakukan melalui skenario tugas
tertulis yang disertakan pada kuesioner — responden diminta mencoba tahapan
tertentu (menjelajahi halaman publik, mendaftar, atau mengelola data sesuai peran)
sebelum mengisi penilaian SUS, sebagaimana tercermin pada kolom "Apakah Anda sudah
mencoba tahapan pengujian di atas?" pada kuesioner.

#### 2.5.2 Persiapan Awal

**Persiapan prosedural.** Sistem versi produksi dipastikan aktif pada `karinakas.com`
sebelum pengujian dimulai. Akun uji untuk setiap peran disiapkan lebih dahulu beserta
data master yang diperlukan (kegiatan, opsi relawan, dsb).

**Persiapan perangkat keras.** Disiapkan komputer/laptop dan *smartphone* dengan
koneksi internet stabil untuk menguji tampilan pada kedua jenis perangkat.

**Persiapan perangkat lunak.** Dipastikan peramban dalam versi terbaru, dan tautan
kuesioner Google Form disiapkan untuk disebarkan kepada responden usability.

#### 2.5.3 Pelaksanaan

Pengujian kotak hitam dilaksanakan per kelas uji dan per butir uji mengikuti tabel
identifikasi pada Bab 3.1, dengan prosedur dan masukan pada Bab 4 dan Bab 5. Untuk
setiap butir uji, penguji menjalankan prosedur dengan masukan yang telah ditentukan,
mengamati keluaran aktual sistem, kemudian membandingkannya dengan keluaran yang
diharapkan. Pengujian usability dilaksanakan secara terpisah melalui kuesioner SUS
yang disebarkan pada rentang 3–26 September 2026.

#### 2.5.4 Pelaporan Hasil

Hasil pengujian kotak hitam dicatat pada tabel Bab 5 untuk setiap butir uji dengan
kesimpulan **Handal** apabila keluaran aktual sesuai keluaran yang diharapkan, atau
**Tidak Handal** apabila tidak sesuai, disertai catatan temuan bila ada. Hasil
pengujian usability direkapitulasi sebagai skor SUS pada Bab 6. Rekapitulasi kedua
jenis pengujian dilaporkan sebagai bagian dari Bab V (Hasil dan Pembahasan) laporan
Tugas Akhir.

---

---

## 3. Identifikasi dan Rencana Pengujian

### 3.1 Identifikasi Pengujian

Seluruh pengujian bersifat Pengujian Unit — *Black Box*, dijadwalkan pada fase pengujian Tugas Akhir September 2026. Kolom "Identifikasi SKPL" merujuk pada kode FR Karinakas pada dokumen SKPL Website Karinakas.

| Kelas Uji | Butir Uji | Identifikasi SKPL | Identifikasi PDHUPL | Tingkat Pengujian | Jenis Pengujian | Jadwal |
|---|---|---|---|---|---|---|
| Registrasi | Registrasi field kosong | FR Karinakas 201 | SR-01 | Unit | Black Box | September 2026 |
|  | Registrasi valid | FR Karinakas 201 | SR-02 | Unit | Black Box | September 2026 |
|  | Registrasi email duplikat | FR Karinakas 202 | SR-12 | Unit | Black Box | September 2026 |
|  | Registrasi kata sandi kurang dari 8 karakter | FR Karinakas 201; NFR 3.4.4.1 | SR-13 | Unit | Black Box | September 2026 |
| Login | Email atau kata sandi salah | FR Karinakas 203 | SR-03 | Unit | Black Box | September 2026 |
|  | Login valid | FR Karinakas 203 | SR-04 | Unit | Black Box | September 2026 |
| Hak Akses | Login Super Admin | FR Karinakas 206, 513 | SR-05 | Unit | Black Box | September 2026 |
|  | Login Admin | FR Karinakas 206 | SR-06 | Unit | Black Box | September 2026 |
|  | Login pengguna biasa | FR Karinakas 205 | SR-07 | Unit | Black Box | September 2026 |
| Logout | Keluar sistem | FR Karinakas 207 | SR-08 | Unit | Black Box | September 2026 |
| Profil | Ubah data profil | FR Karinakas 208 | SR-09 | Unit | Black Box | September 2026 |
| Ubah Kata Sandi | Kata sandi lama salah | FR Karinakas 209 | SR-10 | Unit | Black Box | September 2026 |
|  | Kata sandi lama benar | FR Karinakas 209 | SR-11 | Unit | Black Box | September 2026 |
| Pemulihan Kata Sandi | Minta tautan reset | FR Karinakas 213 | RP-01 | Unit | Black Box | September 2026 |
|  | Minta tautan reset, email tidak terdaftar | FR Karinakas 213 | RP-04 | Unit | Black Box | September 2026 |
|  | Buka tautan dan set sandi baru (token valid) | FR Karinakas 213 | RP-02 | Unit | Black Box | September 2026 |
|  | Tautan tidak valid ditolak | FR Karinakas 213 | RP-03 | Unit | Black Box | September 2026 |
| Halaman Publik | Halaman Beranda | FR Karinakas 101, 104, 107 | PU-01 | Unit | Black Box | September 2026 |
|  | Tentang Kami | FR Karinakas 101 | PU-02 | Unit | Black Box | September 2026 |
|  | Daftar Kegiatan | FR Karinakas 104 | PU-03 | Unit | Black Box | September 2026 |
|  | Detail Kegiatan | FR Karinakas 106 | PU-04 | Unit | Black Box | September 2026 |
|  | Daftar Berita | FR Karinakas 107 | PU-05 | Unit | Black Box | September 2026 |
|  | Detail Berita | FR Karinakas 108 | PU-06 | Unit | Black Box | September 2026 |
|  | Galeri | FR Karinakas 109, 110, 111 | PU-07 | Unit | Black Box | September 2026 |
|  | Kontak | FR Karinakas 103 | PU-08 | Unit | Black Box | September 2026 |
|  | Filter Kegiatan | FR Karinakas 104 | PU-09 | Unit | Black Box | September 2026 |
|  | Pencarian Kegiatan | FR Karinakas 104 | PU-10 | Unit | Black Box | September 2026 |
| Relawan | Pendaftaran relawan, field kosong | FR Karinakas 309 | UT-01 | Unit | Black Box | September 2026 |
|  | Pendaftaran relawan, data valid | FR Karinakas 309, 310, 311 | UT-02 | Unit | Black Box | September 2026 |
|  | Validasi nomor KTP | FR Karinakas 309 | UT-03 | Unit | Black Box | September 2026 |
|  | Pendaftaran relawan ganda pada kegiatan yang sama | FR Karinakas 309 | UT-12 | Unit | Black Box | September 2026 |
|  | Riwayat relawan | FR Karinakas 211 | UT-04 | Unit | Black Box | September 2026 |
|  | Batalkan pendaftaran relawan | (FR belum tercantum di SKPL) | UT-05 | Unit | Black Box | September 2026 |
| Donasi | Donasi, field kosong | FR Karinakas 302 | UT-06 | Unit | Black Box | September 2026 |
|  | Donasi, data valid | FR Karinakas 301, 302, 304 | UT-07 | Unit | Black Box | September 2026 |
|  | Donasi pada kegiatan yang tidak membuka donasi | FR Karinakas 303 | UT-11 | Unit | Black Box | September 2026 |
| Upload Bukti Transfer | Format didukung | FR Karinakas 307 | UT-08 | Unit | Black Box | September 2026 |
|  | Format tidak didukung | FR Karinakas 307 | UT-09 | Unit | Black Box | September 2026 |
| Riwayat Donasi | Lihat riwayat | FR Karinakas 210 | UT-10 | Unit | Black Box | September 2026 |
| Dashboard | Tampilkan statistik | FR Karinakas 601, 602, 603 | AD-01 | Unit | Black Box | September 2026 |
| Kelola Kegiatan | Field kosong | FR Karinakas 401 | AD-02 | Unit | Black Box | September 2026 |
|  | Tambah valid | FR Karinakas 401 | AD-03 | Unit | Black Box | September 2026 |
|  | Tanggal selesai sebelum tanggal mulai | FR Karinakas 401 | AD-37 | Unit | Black Box | September 2026 |
|  | Tampilkan daftar | FR Karinakas 401 | AD-04 | Unit | Black Box | September 2026 |
|  | Ubah data | FR Karinakas 401 | AD-05 | Unit | Black Box | September 2026 |
|  | Hapus | FR Karinakas 401, 411 | AD-06 | Unit | Black Box | September 2026 |
|  | Ubah status | FR Karinakas 404 | AD-07 | Unit | Black Box | September 2026 |
| Kelola Berita | Field kosong | FR Karinakas 405 | AD-08 | Unit | Black Box | September 2026 |
|  | Tambah valid | FR Karinakas 405, 406 | AD-09 | Unit | Black Box | September 2026 |
|  | Tampilkan daftar | FR Karinakas 405 | AD-10 | Unit | Black Box | September 2026 |
|  | Ubah data | FR Karinakas 405 | AD-11 | Unit | Black Box | September 2026 |
|  | Hapus | FR Karinakas 405, 411 | AD-12 | Unit | Black Box | September 2026 |
| Kelola Galeri | Unggah format didukung | FR Karinakas 407 | AD-17 | Unit | Black Box | September 2026 |
|  | Unggah format tidak didukung | FR Karinakas 407 | AD-18 | Unit | Black Box | September 2026 |
|  | Unggah massal | FR Karinakas 408, 409 | AD-19 | Unit | Black Box | September 2026 |
|  | Tampilkan daftar | FR Karinakas 407 | AD-20 | Unit | Black Box | September 2026 |
|  | Ubah data | FR Karinakas 410 | AD-21 | Unit | Black Box | September 2026 |
|  | Hapus foto | FR Karinakas 410, 411 | AD-22 | Unit | Black Box | September 2026 |
| Kelola Relawan | Tampilkan daftar | FR Karinakas 501 | AD-23 | Unit | Black Box | September 2026 |
|  | Ubah status | FR Karinakas 503, 504, 505 | AD-24 | Unit | Black Box | September 2026 |
|  | Hapus data | FR Karinakas 501 | AD-25 | Unit | Black Box | September 2026 |
|  | Filter per kegiatan | FR Karinakas 501 | AD-26 | Unit | Black Box | September 2026 |
| Kelola Donasi | Tampilkan daftar donasi | FR Karinakas 507, 512 | AD-13 | Unit | Black Box | September 2026 |
|  | Mengubah status pembayaran | FR Karinakas 509 | AD-14 | Unit | Black Box | September 2026 |
| Kelola Donasi (negatif) | Admin mencoba mengubah status, ditolak | FR Karinakas 509, 513 | AD-14N | Unit | Black Box | September 2026 |
| Kelola Donasi | Menghapus donasi | FR Karinakas 511 | AD-15 | Unit | Black Box | September 2026 |
| Kelola Donasi (negatif) | Admin mencoba menghapus donasi, ditolak | FR Karinakas 511, 513 | AD-15N | Unit | Black Box | September 2026 |
| Kelola Donasi | Pencarian donasi | FR Karinakas 507 | AD-16 | Unit | Black Box | September 2026 |
| Kelola Pengguna | Tambah field kosong | FR Karinakas 514 | AD-27 | Unit | Black Box | September 2026 |
|  | Tambah valid | FR Karinakas 514 | AD-28 | Unit | Black Box | September 2026 |
| Kelola Pengguna (negatif) | Admin mencoba menambah pengguna, ditolak | FR Karinakas 513, 514 | AD-28N | Unit | Black Box | September 2026 |
| Kelola Pengguna | Tampilkan daftar | FR Karinakas 514 | AD-29 | Unit | Black Box | September 2026 |
| Kelola Pengguna (negatif) | Admin mencoba membuka daftar pengguna, ditolak | FR Karinakas 513, 514 | AD-29N | Unit | Black Box | September 2026 |
| Kelola Pengguna | Ubah data | FR Karinakas 514 | AD-30 | Unit | Black Box | September 2026 |
| Kelola Pengguna (negatif) | Admin mencoba mengubah data pengguna, ditolak | FR Karinakas 513, 514 | AD-30N | Unit | Black Box | September 2026 |
| Kelola Pengguna | Ubah peran akun sendiri ditolak | FR Karinakas 515 | AD-39 | Unit | Black Box | September 2026 |
|  | Hapus pengguna | FR Karinakas 514, 515 | AD-31 | Unit | Black Box | September 2026 |
|  | Hapus akun super admin ditolak | FR Karinakas 515 | AD-38 | Unit | Black Box | September 2026 |
| Kelola Pengguna (negatif) | Admin mencoba menghapus pengguna, ditolak | FR Karinakas 513, 514 | AD-31N | Unit | Black Box | September 2026 |
| Kelola Pengguna | Reset kata sandi | FR Karinakas 514 | AD-32 | Unit | Black Box | September 2026 |
| Kelola Pengguna (negatif) | Admin mencoba mereset kata sandi pengguna, ditolak | FR Karinakas 513, 514 | AD-32N | Unit | Black Box | September 2026 |
| Jejak Audit | Super admin melihat jejak audit | FR Karinakas 516, 517 | AL-01 | Unit | Black Box | September 2026 |
|  | Admin ditolak mengakses jejak audit | FR Karinakas 513, 517 | AL-02 | Unit | Black Box | September 2026 |
| Rekapan Data | Rekapan relawan | FR Karinakas 605, 513 | AD-33 | Unit | Black Box | September 2026 |
|  | Rekapan kegiatan | (titik akhir tidak dipakai klien) | AD-34 | Unit | Black Box | September 2026 |
|  | Rekapan donasi | FR Karinakas 604, 513 | AD-35 | Unit | Black Box | September 2026 |
|  | Ekspor rekapan (umum) | FR Karinakas 604–608 | AD-36 | Unit | Black Box | September 2026 |
| Riwayat Notifikasi | Melihat riwayat notifikasi | FR Karinakas 506 | NL-01 | Unit | Black Box | September 2026 |

### 3.2 Rencana Pengujian

#### 3.2.1 Urutan Pelaksanaan Pengujian

Urutan pelaksanaan pengujian mengikuti nomor identifikasi pada tabel Bab 3.1, dimulai dari kelas Autentikasi, Akun, dan Pemulihan Kata Sandi (SR, RP), disusul Halaman Publik (PU), Partisipasi Pengguna Terdaftar (UT), Dasbor dan Pengelolaan Konten (AD), Verifikasi Relawan dan Donasi (AD), Manajemen Pengguna dan Jejak Audit (AD, AL), hingga Rekapitulasi dan Notifikasi (AD, NL). Butir uji negatif berakhiran huruf N (AD-14N, AD-15N, AD-28N, AD-29N, AD-30N, AD-31N, AD-32N) dijalankan segera setelah butir positif pasangannya. Butir "(negatif)" hanya dipasangkan pada fungsi yang benar-benar dibatasi khusus Super Admin di kode (`wajibSuperAdmin()`/`isSuperAdmin()`) — donasi (ubah status, hapus) dan seluruh submodul Pengguna (tambah, lihat daftar, ubah, hapus, reset kata sandi) — bukan pada validasi masukan biasa (field kosong, format berkas) yang berlaku merata di semua modul; lihat catatan analisis pada `docs/PDHUPL-CATATAN.md`.

#### 3.2.2 Data Pengujian

Data pengujian meliputi akun untuk keempat peran (pengunjung tanpa akun, pengguna terdaftar, admin, dan super admin), data kegiatan sosial beserta opsi jenis relawan dan bidang minat, data berita berstatus draft dan published, data foto galeri, data pendaftaran relawan, data pengajuan donasi, serta contoh berkas bukti pembayaran (JPG/PNG ≤ 4 MB) dan berkas bukan gambar untuk pengujian penolakan format.

---

## 4. Deskripsi Pengujian

### 4.1 Identifikasi Kelas Pengujian Autentikasi, Akun, dan Pemulihan Kata Sandi

Kelas pengujian ini meliputi 17 butir uji (SR-01 hingga RP-03).

#### 4.1.1 Identifikasi Butir Pengujian Registrasi field kosong (SR-01)
Butir pengujian ini melakukan pengujian terhadap fungsi registrasi dengan field wajib kosong. Masukan untuk pengujian ini berupa nama, email, dan kata sandi dikosongkan.

#### 4.1.2 Identifikasi Butir Pengujian Registrasi valid (SR-02)
Butir pengujian ini melakukan pengujian terhadap fungsi registrasi valid. Masukan untuk pengujian ini berupa nama, email yang belum terdaftar, kata sandi minimal 8 karakter.

#### 4.1.3 Identifikasi Butir Pengujian Registrasi email duplikat (SR-12)
Butir pengujian ini melakukan pengujian terhadap fungsi registrasi dengan email yang sudah terdaftar. Masukan untuk pengujian ini berupa email yang sudah ada di basis data.

#### 4.1.4 Identifikasi Butir Pengujian Registrasi kata sandi kurang dari 8 karakter (SR-13)
Butir pengujian ini melakukan pengujian terhadap fungsi registrasi dengan kata sandi pendek. Masukan untuk pengujian ini berupa kata sandi "1234".

#### 4.1.5 Identifikasi Butir Pengujian Email atau kata sandi salah (SR-03)
Butir pengujian ini melakukan pengujian terhadap fungsi login dengan kredensial salah. Masukan untuk pengujian ini berupa email terdaftar dengan kata sandi salah.

#### 4.1.6 Identifikasi Butir Pengujian Login valid (SR-04)
Butir pengujian ini melakukan pengujian terhadap fungsi login dengan kredensial valid. Masukan untuk pengujian ini berupa email dan kata sandi yang benar.

#### 4.1.7 Identifikasi Butir Pengujian Login Super Admin (SR-05)
Butir pengujian ini melakukan pengujian terhadap fungsi login dengan akun super admin. Masukan untuk pengujian ini berupa email dan kata sandi akun super admin.

#### 4.1.8 Identifikasi Butir Pengujian Login Admin (SR-06)
Butir pengujian ini melakukan pengujian terhadap fungsi login dengan akun admin. Masukan untuk pengujian ini berupa email dan kata sandi akun admin.

#### 4.1.9 Identifikasi Butir Pengujian Login pengguna biasa (SR-07)
Butir pengujian ini melakukan pengujian terhadap fungsi login dengan akun pengguna biasa. Masukan untuk pengujian ini berupa email dan kata sandi akun berperan pengguna (pola user{N}@test.com yang tersimpan di basis data).

#### 4.1.10 Identifikasi Butir Pengujian Keluar sistem (SR-08)
Butir pengujian ini melakukan pengujian terhadap fungsi logout. Masukan untuk pengujian ini berupa token sesi yang aktif.

#### 4.1.11 Identifikasi Butir Pengujian Ubah data profil (SR-09)
Butir pengujian ini melakukan pengujian terhadap fungsi perubahan data profil. Masukan untuk pengujian ini berupa data profil yang valid (misalnya nama dan nomor telepon).

#### 4.1.12 Identifikasi Butir Pengujian Kata sandi lama salah (SR-10)
Butir pengujian ini melakukan pengujian terhadap fungsi penggantian kata sandi dengan kata sandi lama salah. Masukan untuk pengujian ini berupa kata sandi lama tidak sesuai.

#### 4.1.13 Identifikasi Butir Pengujian Kata sandi lama benar (SR-11)
Butir pengujian ini melakukan pengujian terhadap fungsi penggantian kata sandi dengan kata sandi lama benar. Masukan untuk pengujian ini berupa kata sandi lama benar; kata sandi baru ≥ 8 karakter beserta konfirmasi.

#### 4.1.14 Identifikasi Butir Pengujian Minta tautan reset (RP-01)
Butir pengujian ini melakukan pengujian terhadap fungsi permintaan tautan pemulihan kata sandi. Masukan untuk pengujian ini berupa email yang terdaftar.

#### 4.1.15 Identifikasi Butir Pengujian Minta tautan reset, email tidak terdaftar (RP-04)
Butir pengujian ini melakukan pengujian terhadap fungsi permintaan tautan pemulihan dengan email tidak terdaftar. Masukan untuk pengujian ini berupa email yang tidak ada di basis data.

#### 4.1.16 Identifikasi Butir Pengujian Buka tautan dan set sandi baru (token valid) (RP-02)
Butir pengujian ini melakukan pengujian terhadap fungsi penyetelan kata sandi baru melalui tautan valid. Masukan untuk pengujian ini berupa tautan dengan token valid yang belum kedaluwarsa (60 menit); kata sandi baru ≥ 8 karakter beserta konfirmasi.

#### 4.1.17 Identifikasi Butir Pengujian Tautan tidak valid ditolak (RP-03)
Butir pengujian ini melakukan pengujian terhadap fungsi penolakan tautan pemulihan yang tidak valid. Masukan untuk pengujian ini berupa token acak, kedaluwarsa, atau yang sudah dipakai.

### 4.2 Identifikasi Kelas Pengujian Halaman Publik

Kelas pengujian ini meliputi 10 butir uji (PU-01 hingga PU-10).

#### 4.2.1 Identifikasi Butir Pengujian Halaman Beranda (PU-01)
Butir pengujian ini melakukan pengujian terhadap fungsi penyajian halaman Beranda. Masukan untuk pengujian ini berupa akses ke alamat utama situs tanpa login.

#### 4.2.2 Identifikasi Butir Pengujian Tentang Kami (PU-02)
Butir pengujian ini melakukan pengujian terhadap fungsi penyajian halaman Tentang Kami. Masukan untuk pengujian ini berupa akses ke halaman Tentang Kami.

#### 4.2.3 Identifikasi Butir Pengujian Daftar Kegiatan (PU-03)
Butir pengujian ini melakukan pengujian terhadap fungsi penyajian daftar kegiatan. Masukan untuk pengujian ini berupa akses ke halaman Kegiatan.

#### 4.2.4 Identifikasi Butir Pengujian Detail Kegiatan (PU-04)
Butir pengujian ini melakukan pengujian terhadap fungsi penyajian detail kegiatan. Masukan untuk pengujian ini berupa kegiatan yang tersimpan.

#### 4.2.5 Identifikasi Butir Pengujian Daftar Berita (PU-05)
Butir pengujian ini melakukan pengujian terhadap fungsi penyajian daftar berita. Masukan untuk pengujian ini berupa akses ke halaman Berita.

#### 4.2.6 Identifikasi Butir Pengujian Detail Berita (PU-06)
Butir pengujian ini melakukan pengujian terhadap fungsi penyajian detail berita. Masukan untuk pengujian ini berupa berita berstatus terbit.

#### 4.2.7 Identifikasi Butir Pengujian Galeri (PU-07)
Butir pengujian ini melakukan pengujian terhadap fungsi penyajian galeri. Masukan untuk pengujian ini berupa akses ke halaman Galeri.

#### 4.2.8 Identifikasi Butir Pengujian Kontak (PU-08)
Butir pengujian ini melakukan pengujian terhadap fungsi penyajian halaman Kontak. Masukan untuk pengujian ini berupa akses ke halaman Kontak.

#### 4.2.9 Identifikasi Butir Pengujian Filter Kegiatan (PU-09)
Butir pengujian ini melakukan pengujian terhadap fungsi penyaringan kegiatan menurut kategori. Masukan untuk pengujian ini berupa kategori (sosial, pendidikan, kesehatan, bantuan, atau lainnya).

#### 4.2.10 Identifikasi Butir Pengujian Pencarian Kegiatan (PU-10)
Butir pengujian ini melakukan pengujian terhadap fungsi pencarian kegiatan. Masukan untuk pengujian ini berupa kata kunci yang ada pada judul kegiatan.

### 4.3 Identifikasi Kelas Pengujian Partisipasi Pengguna Terdaftar

Kelas pengujian ini meliputi 12 butir uji (UT-01 hingga UT-10).

#### 4.3.1 Identifikasi Butir Pengujian Pendaftaran relawan, field kosong (UT-01)
Butir pengujian ini melakukan pengujian terhadap fungsi pendaftaran relawan dengan field wajib kosong. Masukan untuk pengujian ini berupa jenis relawan dikosongkan.

#### 4.3.2 Identifikasi Butir Pengujian Pendaftaran relawan, data valid (UT-02)
Butir pengujian ini melakukan pengujian terhadap fungsi pendaftaran relawan valid. Masukan untuk pengujian ini berupa kegiatan aktif, jenis dan bidang minat sesuai opsi kegiatan, KTP 16 digit, motivasi.

#### 4.3.3 Identifikasi Butir Pengujian Validasi nomor KTP (UT-03)
Butir pengujian ini melakukan pengujian terhadap fungsi validasi nomor KTP pada formulir. Masukan untuk pengujian ini berupa nomor KTP kurang dari 16 digit.

#### 4.3.4 Identifikasi Butir Pengujian Pendaftaran relawan ganda pada kegiatan yang sama (UT-12)
Butir pengujian ini melakukan pengujian terhadap fungsi penolakan pendaftaran ganda. Masukan untuk pengujian ini berupa pendaftaran kedua pada kegiatan yang sama oleh pengguna yang sama.

#### 4.3.5 Identifikasi Butir Pengujian Riwayat relawan (UT-04)
Butir pengujian ini melakukan pengujian terhadap fungsi penyajian riwayat pendaftaran relawan. Masukan untuk pengujian ini berupa pengguna yang memiliki pendaftaran.

#### 4.3.6 Identifikasi Butir Pengujian Batalkan pendaftaran relawan (UT-05)
Butir pengujian ini melakukan pengujian terhadap fungsi pembatalan pendaftaran relawan. Masukan untuk pengujian ini berupa pendaftaran berstatus pending milik sendiri; pendaftaran berstatus diterima.

#### 4.3.7 Identifikasi Butir Pengujian Donasi, field kosong (UT-06)
Butir pengujian ini melakukan pengujian terhadap fungsi pengajuan donasi dengan field wajib kosong. Masukan untuk pengujian ini berupa kegiatan dan nominal tidak diisi.

#### 4.3.8 Identifikasi Butir Pengujian Donasi, data valid (UT-07)
Butir pengujian ini melakukan pengujian terhadap fungsi pengajuan donasi valid. Masukan untuk pengujian ini berupa kegiatan aktif yang membuka donasi, nominal ≥ 1, metode pembayaran.

#### 4.3.9 Identifikasi Butir Pengujian Donasi pada kegiatan yang tidak membuka donasi (UT-11)
Butir pengujian ini melakukan pengujian terhadap fungsi penolakan donasi pada kegiatan yang tidak membuka donasi. Masukan untuk pengujian ini berupa kegiatan dengan butuh_donasi tidak aktif, atau kegiatan yang sudah selesai.

#### 4.3.10 Identifikasi Butir Pengujian Format didukung (UT-08)
Butir pengujian ini melakukan pengujian terhadap fungsi unggah bukti pembayaran berformat gambar. Masukan untuk pengujian ini berupa berkas JPG atau PNG berukuran ≤ 4 MB.

#### 4.3.11 Identifikasi Butir Pengujian Format tidak didukung (UT-09)
Butir pengujian ini melakukan pengujian terhadap fungsi unggah bukti pembayaran dengan berkas bukan gambar atau melebihi 4 MB. Masukan untuk pengujian ini berupa berkas selain gambar, atau gambar > 4 MB.

#### 4.3.12 Identifikasi Butir Pengujian Lihat riwayat (UT-10)
Butir pengujian ini melakukan pengujian terhadap fungsi penyajian riwayat donasi. Masukan untuk pengujian ini berupa pengguna yang memiliki donasi.

### 4.4 Identifikasi Kelas Pengujian Dasbor dan Pengelolaan Konten

Kelas pengujian ini meliputi 19 butir uji (AD-01 hingga AD-22).

#### 4.4.1 Identifikasi Butir Pengujian Tampilkan statistik (AD-01)
Butir pengujian ini melakukan pengujian terhadap fungsi penyajian dasbor statistik sadar-peran. Masukan untuk pengujian ini berupa akun admin, kemudian akun super admin.

#### 4.4.2 Identifikasi Butir Pengujian Field kosong (AD-02)
Butir pengujian ini melakukan pengujian terhadap fungsi penambahan kegiatan dengan field wajib kosong. Masukan untuk pengujian ini berupa judul, deskripsi, lokasi, kategori, tanggal, dan kuota relawan dikosongkan.

#### 4.4.3 Identifikasi Butir Pengujian Tambah valid (AD-03)
Butir pengujian ini melakukan pengujian terhadap fungsi penambahan kegiatan valid. Masukan untuk pengujian ini berupa judul, deskripsi, lokasi, kategori valid, tanggal mulai dan selesai, kuota relawan.

#### 4.4.4 Identifikasi Butir Pengujian Tanggal selesai sebelum tanggal mulai (AD-37)
Butir pengujian ini melakukan pengujian terhadap fungsi validasi urutan tanggal kegiatan. Masukan untuk pengujian ini berupa tanggal selesai lebih awal daripada tanggal mulai.

#### 4.4.5 Identifikasi Butir Pengujian Tampilkan daftar (AD-04)
Butir pengujian ini melakukan pengujian terhadap fungsi penyajian daftar kegiatan pada panel admin. Masukan untuk pengujian ini berupa akun admin.

#### 4.4.6 Identifikasi Butir Pengujian Ubah data (AD-05)
Butir pengujian ini melakukan pengujian terhadap fungsi perubahan data kegiatan. Masukan untuk pengujian ini berupa data kegiatan yang valid.

#### 4.4.7 Identifikasi Butir Pengujian Hapus (AD-06)
Butir pengujian ini melakukan pengujian terhadap fungsi penghapusan kegiatan. Masukan untuk pengujian ini berupa kegiatan yang tersimpan.

#### 4.4.8 Identifikasi Butir Pengujian Ubah status (AD-07)
Butir pengujian ini melakukan pengujian terhadap fungsi perubahan status kegiatan. Masukan untuk pengujian ini berupa status aktif, selesai, atau dibatalkan.

#### 4.4.9 Identifikasi Butir Pengujian Field kosong (AD-08)
Butir pengujian ini melakukan pengujian terhadap fungsi penambahan berita dengan field wajib kosong. Masukan untuk pengujian ini berupa judul, konten, dan kategori dikosongkan.

#### 4.4.10 Identifikasi Butir Pengujian Tambah valid (AD-09)
Butir pengujian ini melakukan pengujian terhadap fungsi penambahan berita valid. Masukan untuk pengujian ini berupa judul, konten, kategori valid, status draft atau published.

#### 4.4.11 Identifikasi Butir Pengujian Tampilkan daftar (AD-10)
Butir pengujian ini melakukan pengujian terhadap fungsi penyajian daftar berita pada panel admin. Masukan untuk pengujian ini berupa akun admin.

#### 4.4.12 Identifikasi Butir Pengujian Ubah data (AD-11)
Butir pengujian ini melakukan pengujian terhadap fungsi perubahan data berita. Masukan untuk pengujian ini berupa data berita yang valid.

#### 4.4.13 Identifikasi Butir Pengujian Hapus (AD-12)
Butir pengujian ini melakukan pengujian terhadap fungsi penghapusan berita. Masukan untuk pengujian ini berupa berita yang tersimpan.

#### 4.4.14 Identifikasi Butir Pengujian Unggah format didukung (AD-17)
Butir pengujian ini melakukan pengujian terhadap fungsi unggah foto galeri berformat gambar. Masukan untuk pengujian ini berupa berkas JPG atau PNG berukuran ≤ 5 MB.

#### 4.4.15 Identifikasi Butir Pengujian Unggah format tidak didukung (AD-18)
Butir pengujian ini melakukan pengujian terhadap fungsi unggah foto galeri dengan berkas bukan gambar. Masukan untuk pengujian ini berupa berkas selain gambar.

#### 4.4.16 Identifikasi Butir Pengujian Unggah massal (AD-19)
Butir pengujian ini melakukan pengujian terhadap fungsi unggah foto galeri secara massal. Masukan untuk pengujian ini berupa lebih dari satu berkas gambar valid sekaligus (misalnya 25 berkas).

#### 4.4.17 Identifikasi Butir Pengujian Tampilkan daftar (AD-20)
Butir pengujian ini melakukan pengujian terhadap fungsi penyajian daftar foto galeri pada panel admin. Masukan untuk pengujian ini berupa akun admin.

#### 4.4.18 Identifikasi Butir Pengujian Ubah data (AD-21)
Butir pengujian ini melakukan pengujian terhadap fungsi perubahan data foto galeri. Masukan untuk pengujian ini berupa judul atau deskripsi yang valid.

#### 4.4.19 Identifikasi Butir Pengujian Hapus foto (AD-22)
Butir pengujian ini melakukan pengujian terhadap fungsi penghapusan foto galeri. Masukan untuk pengujian ini berupa foto yang tersimpan.

### 4.5 Identifikasi Kelas Pengujian Verifikasi Relawan dan Donasi

Kelas pengujian ini meliputi 10 butir uji (AD-23 hingga AD-16).

#### 4.5.1 Identifikasi Butir Pengujian Tampilkan daftar (AD-23)
Butir pengujian ini melakukan pengujian terhadap fungsi penyajian daftar pendaftar relawan. Masukan untuk pengujian ini berupa akun admin.

#### 4.5.2 Identifikasi Butir Pengujian Ubah status (AD-24)
Butir pengujian ini melakukan pengujian terhadap fungsi perubahan status pendaftaran relawan. Masukan untuk pengujian ini berupa status pending, diterima, atau ditolak.

#### 4.5.3 Identifikasi Butir Pengujian Hapus data (AD-25)
Butir pengujian ini melakukan pengujian terhadap fungsi penghapusan data pendaftar relawan. Masukan untuk pengujian ini berupa pendaftar yang tersimpan.

#### 4.5.4 Identifikasi Butir Pengujian Filter per kegiatan (AD-26)
Butir pengujian ini melakukan pengujian terhadap fungsi penyaringan pendaftar relawan menurut kegiatan. Masukan untuk pengujian ini berupa satu kegiatan yang memiliki pendaftar.

#### 4.5.5 Identifikasi Butir Pengujian Tampilkan daftar donasi (AD-13)
Butir pengujian ini melakukan pengujian terhadap fungsi penyajian daftar donasi sadar-peran. Masukan untuk pengujian ini berupa akun admin, kemudian akun super admin.

#### 4.5.6 Identifikasi Butir Pengujian Mengubah status pembayaran (AD-14)
Butir pengujian ini melakukan pengujian terhadap fungsi perubahan status pembayaran donasi oleh super admin. Masukan untuk pengujian ini berupa status pending, berhasil, atau gagal.

#### 4.5.7 Identifikasi Butir Pengujian Admin mencoba mengubah status, ditolak (AD-14N)
Butir pengujian ini melakukan pengujian terhadap fungsi penolakan perubahan status donasi oleh admin biasa. Masukan untuk pengujian ini berupa permintaan ubah status donasi dari akun admin.

#### 4.5.8 Identifikasi Butir Pengujian Menghapus donasi (AD-15)
Butir pengujian ini melakukan pengujian terhadap fungsi penghapusan donasi oleh super admin. Masukan untuk pengujian ini berupa donasi yang tersimpan.

#### 4.5.9 Identifikasi Butir Pengujian Admin mencoba menghapus donasi, ditolak (AD-15N)
Butir pengujian ini melakukan pengujian terhadap fungsi penolakan penghapusan donasi oleh admin biasa. Masukan untuk pengujian ini berupa permintaan hapus donasi dari akun admin.

#### 4.5.10 Identifikasi Butir Pengujian Pencarian donasi (AD-16)
Butir pengujian ini melakukan pengujian terhadap fungsi pencarian donasi oleh admin. Masukan untuk pengujian ini berupa kata kunci yang cocok dengan data donasi.

### 4.6 Identifikasi Kelas Pengujian Manajemen Pengguna dan Jejak Audit

Kelas pengujian ini meliputi 15 butir uji (AD-27 hingga AL-02). Tiga butir uji negatif
(AD-28N, AD-30N, AD-32N) ditambahkan agar seluruh fungsi khusus Super Admin pada
submodul ini diuji simetris dengan AD-29N dan AD-31N — lihat catatan Bab 3.2.1.

#### 4.6.1 Identifikasi Butir Pengujian Tambah field kosong (AD-27)
Butir pengujian ini melakukan pengujian terhadap fungsi penambahan pengguna dengan field wajib kosong. Masukan untuk pengujian ini berupa nama, email, kata sandi, dan peran dikosongkan.

#### 4.6.2 Identifikasi Butir Pengujian Tambah valid (AD-28)
Butir pengujian ini melakukan pengujian terhadap fungsi penambahan pengguna valid. Masukan untuk pengujian ini berupa nama, email baru, kata sandi ≥ 8 karakter, peran.

#### 4.6.3 Identifikasi Butir Pengujian Admin mencoba menambah pengguna, ditolak (AD-28N)
Butir pengujian ini melakukan pengujian terhadap fungsi penolakan penambahan pengguna oleh admin biasa. Masukan untuk pengujian ini berupa permintaan POST /admin/users dari akun admin.

#### 4.6.4 Identifikasi Butir Pengujian Tampilkan daftar (AD-29)
Butir pengujian ini melakukan pengujian terhadap fungsi penyajian daftar pengguna oleh super admin. Masukan untuk pengujian ini berupa akun super admin.

#### 4.6.5 Identifikasi Butir Pengujian Admin mencoba membuka daftar pengguna, ditolak (AD-29N)
Butir pengujian ini melakukan pengujian terhadap fungsi penolakan pembacaan daftar pengguna oleh admin biasa. Masukan untuk pengujian ini berupa permintaan GET /admin/users dari akun admin.

#### 4.6.6 Identifikasi Butir Pengujian Ubah data (AD-30)
Butir pengujian ini melakukan pengujian terhadap fungsi perubahan data pengguna. Masukan untuk pengujian ini berupa data pengguna yang valid.

#### 4.6.7 Identifikasi Butir Pengujian Admin mencoba mengubah data pengguna, ditolak (AD-30N)
Butir pengujian ini melakukan pengujian terhadap fungsi penolakan perubahan data pengguna oleh admin biasa. Masukan untuk pengujian ini berupa permintaan PUT /admin/users/{id} dari akun admin.

#### 4.6.8 Identifikasi Butir Pengujian Ubah peran akun sendiri ditolak (AD-39)
Butir pengujian ini melakukan pengujian terhadap fungsi penolakan perubahan peran akun sendiri. Masukan untuk pengujian ini berupa perubahan peran pada akun super admin yang sedang login.

#### 4.6.9 Identifikasi Butir Pengujian Hapus pengguna (AD-31)
Butir pengujian ini melakukan pengujian terhadap fungsi penghapusan akun pengguna oleh super admin. Masukan untuk pengujian ini berupa akun berperan pengguna atau admin.

#### 4.6.10 Identifikasi Butir Pengujian Hapus akun super admin ditolak (AD-38)
Butir pengujian ini melakukan pengujian terhadap fungsi penolakan penghapusan akun super admin. Masukan untuk pengujian ini berupa akun berperan super admin sebagai target.

#### 4.6.11 Identifikasi Butir Pengujian Admin mencoba menghapus pengguna, ditolak (AD-31N)
Butir pengujian ini melakukan pengujian terhadap fungsi penolakan penghapusan pengguna oleh admin biasa. Masukan untuk pengujian ini berupa permintaan DELETE pengguna dari akun admin.

#### 4.6.12 Identifikasi Butir Pengujian Reset kata sandi (AD-32)
Butir pengujian ini melakukan pengujian terhadap fungsi reset kata sandi pengguna oleh super admin. Masukan untuk pengujian ini berupa pengguna yang tersimpan.

#### 4.6.13 Identifikasi Butir Pengujian Admin mencoba mereset kata sandi pengguna, ditolak (AD-32N)
Butir pengujian ini melakukan pengujian terhadap fungsi penolakan reset kata sandi pengguna oleh admin biasa. Masukan untuk pengujian ini berupa permintaan POST /admin/users/{id}/reset-password dari akun admin.

#### 4.6.14 Identifikasi Butir Pengujian Super admin melihat jejak audit (AL-01)
Butir pengujian ini melakukan pengujian terhadap fungsi penyajian jejak audit oleh super admin. Masukan untuk pengujian ini berupa akun super admin.

#### 4.6.15 Identifikasi Butir Pengujian Admin ditolak mengakses jejak audit (AL-02)
Butir pengujian ini melakukan pengujian terhadap fungsi penolakan akses jejak audit oleh admin biasa. Masukan untuk pengujian ini berupa permintaan GET /admin/audit dari akun admin.

### 4.7 Identifikasi Kelas Pengujian Rekapitulasi dan Notifikasi

Kelas pengujian ini meliputi 5 butir uji (AD-33 hingga NL-01).

#### 4.7.1 Identifikasi Butir Pengujian Rekapan relawan (AD-33)
Butir pengujian ini melakukan pengujian terhadap fungsi ekspor rekap relawan. Masukan untuk pengujian ini berupa data relawan tersedia; penyaring aktif (opsional).

#### 4.7.2 Identifikasi Butir Pengujian Rekapan kegiatan (AD-34)
Butir pengujian ini melakukan pengujian terhadap fungsi rekap kegiatan. Masukan untuk pengujian ini berupa tidak diuji lewat titik akhir sisi layanan.

#### 4.7.3 Identifikasi Butir Pengujian Rekapan donasi (AD-35)
Butir pengujian ini melakukan pengujian terhadap fungsi ekspor rekap donasi oleh super admin. Masukan untuk pengujian ini berupa data donasi tersedia.

#### 4.7.4 Identifikasi Butir Pengujian Ekspor rekapan (umum) (AD-36)
Butir pengujian ini melakukan pengujian terhadap fungsi ekspor rekap melalui antarmuka. Masukan untuk pengujian ini berupa data tersedia; kemudian data kosong.

#### 4.7.5 Identifikasi Butir Pengujian Melihat riwayat notifikasi (NL-01)
Butir pengujian ini melakukan pengujian terhadap fungsi penyajian riwayat notifikasi surel. Masukan untuk pengujian ini berupa akun admin.

---

## 5. Hasil Pengujian

> **Catatan metode (bukan bagian naskah, hapus sebelum ditempel ke Word).** Kolom "Hasil yang
> Didapat" pada bab ini diisi lewat **penelusuran kode sumber** (statis) — membaca langsung
> `app/Http/Controllers/*.php` dan berkas React terkait untuk memastikan pesan, kode HTTP, dan
> perilaku yang dijelaskan pada "Keluaran yang Diharapkan" benar-benar ada di kode yang berjalan.
> **Ini bukan pengujian dinamis** (mengeklik langsung di `karinakas.com` atau memanggil API
> sungguhan) — dua di antaranya berbeda dari cara mengisi Bab 5 yang lazim di PDHUPL, dan
> sebaiknya disebutkan begitu ke dosen pembimbing bila ditanya. Satu butir (**UT-03**) sempat
> **Tidak Handal** setelah ditelusuri — validasi 16 digit KTP yang dijanjikan formulir tidak
> benar-benar ditegakkan — **sudah diperbaiki 30 September 2026** (lihat baris UT-03 pada Subbab
> 5.3 dan HANDOFF.md §4.13); kesimpulannya kini Handal. Sebelum dianggap final, jalankan ulang
> secara nyata di `karinakas.com` untuk butir yang melibatkan tampilan visual, unggah berkas
> sungguhan, dan pengiriman surel — penelusuran kode tidak menggantikan pengamatan layar langsung
> untuk hal-hal itu.

### 5.1 Modul Autentikasi, Akun, dan Pemulihan Kata Sandi

| Identifikasi | Deskripsi | Prosedur Pengujian | Masukan | Keluaran yang Diharapkan | Kriteria Evaluasi Hasil | Hasil yang Didapat | Kesimpulan |
|---|---|---|---|---|---|---|---|
| SR-01 | Registrasi field kosong | 1) Buka halaman registrasi. 2) Kosongkan nama, email, dan kata sandi. 3) Klik Daftar. | nama, email, dan kata sandi dikosongkan | Pesan validasi tampil pada setiap field wajib (HTTP 422); akun tidak terbentuk | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | Frontend (Register.jsx) memvalidasi lebih dulu di sisi klien dan menampilkan SATU pesan pada satu waktu sesuai urutan pengecekan (nama → username → email → kata sandi), bukan pesan per field sekaligus; akun tidak terbentuk. Diuji langsung ke API (tanpa lewat formulir), AuthController::register memvalidasi ulang seluruh field dan membalas HTTP 422 dengan pesan per field sekaligus. | Handal (dengan catatan: pesan tampil satu per satu lewat antarmuka web, sekaligus bila diuji lewat API) |
| SR-02 | Registrasi valid | 1) Buka halaman registrasi. 2) Isi nama, email baru, dan kata sandi ≥ 8 karakter. 3) Klik Daftar. | nama, email yang belum terdaftar, kata sandi minimal 8 karakter | Pesan "Registrasi berhasil" (HTTP 201); akun berperan pengguna terbentuk dan token sesi diterbitkan | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | Respons `{success:true, message:'Registrasi berhasil', user, token}` dengan kode HTTP 201; baris pengguna baru tersimpan berperan `user`; token Sanctum diterbitkan. | Handal |
| SR-12 | Registrasi email duplikat | 1) Buka halaman registrasi. 2) Isi email yang sudah terdaftar dan data lain yang valid. 3) Klik Daftar. | email yang sudah ada di basis data | Pesan validasi email sudah digunakan (HTTP 422); akun tidak terbentuk | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | Validasi `unique:users,email` menolak dengan HTTP 422; pesan bawaan Laravel ("The email has already been taken.", belum diterjemahkan ke Bahasa Indonesia); akun tidak terbentuk. | Handal (dengan catatan: pesan validasi masih berbahasa Inggris bawaan Laravel) |
| SR-13 | Registrasi kata sandi kurang dari 8 karakter | 1) Buka halaman registrasi. 2) Isi data valid dengan kata sandi "1234". 3) Klik Daftar. | kata sandi "1234" | Pesan validasi kata sandi minimal 8 karakter (HTTP 422); akun tidak terbentuk | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | Frontend menolak di sisi klien dengan pesan persis "Kata sandi minimal 8 karakter." sebelum permintaan terkirim ke server; akun tidak terbentuk. | Handal |
| SR-03 | Email atau kata sandi salah | 1) Buka halaman login. 2) Isi email terdaftar dan kata sandi yang salah. 3) Klik Masuk. | email terdaftar dengan kata sandi salah | Pesan "Email atau password salah." (HTTP 422); pesan tidak menyebut bagian mana yang salah | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | AuthController::login melempar ValidationException dengan pesan persis "Email atau password salah." (HTTP 422); pesan yang sama dipakai baik email maupun kata sandi keliru. | Handal |
| SR-04 | Login valid | 1) Buka halaman login. 2) Isi email dan kata sandi yang benar. 3) Klik Masuk. | email dan kata sandi yang benar | Pesan "Login berhasil"; token sesi diterbitkan; pengguna diarahkan sesuai perannya | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | Respons `{success:true, message:'Login berhasil', user, token, role}`; token Sanctum diterbitkan; frontend mengarahkan berdasarkan `role` yang dikembalikan. | Handal |
| SR-05 | Login Super Admin | 1) Buka halaman login. 2) Isi kredensial super admin. 3) Klik Masuk. 4) Buka panel admin. | email dan kata sandi akun super admin | Dasbor menampilkan total nominal donasi; menu Pengguna dan Jejak Audit tersedia | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | AdminController::dashboard menyertakan `total_nominal_donasi` hanya bila `isSuperAdmin()`; AdminDashboard.jsx menandai menu Pengguna dan Audit Log `superOnly:true` dan menampilkannya hanya ketika `user.role === 'superadmin'` (baris `visibleSideNav`). | Handal |
| SR-06 | Login Admin | 1) Buka halaman login. 2) Isi kredensial admin. 3) Klik Masuk. 4) Buka panel admin. | email dan kata sandi akun admin | Dasbor tanpa total nominal donasi; menu Pengguna dan Jejak Audit tidak tersedia | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | Field `total_nominal_donasi` tidak disertakan pada respons dasbor untuk admin biasa; menu Pengguna dan Audit Log disaring keluar dari `visibleSideNav` karena `isSuper` bernilai salah. | Handal |
| SR-07 | Login pengguna biasa | 1) Buka halaman login. 2) Isi kredensial pengguna biasa. 3) Klik Masuk. | email dan kata sandi akun berperan pengguna (pola user{N}@test.com yang tersimpan di basis data) | Berhasil masuk ke halaman publik; menu panel admin tidak tersedia | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | Tidak ada middleware yang membatasi pengguna biasa mengakses halaman publik; rute panel admin (`/admin/*`) dilindungi middleware peran sehingga tidak dapat diakses pengguna biasa. | Handal |
| SR-08 | Keluar sistem | 1) Login sebagai pengguna. 2) Klik tombol keluar. | token sesi yang aktif | Pesan "Logout berhasil"; token dicabut sehingga permintaan berikutnya dengan token tersebut ditolak (HTTP 401); pengguna kembali ke halaman login | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | `currentAccessToken()->delete()` mencabut token yang sedang dipakai; respons `{success:true, message:'Logout berhasil'}`; permintaan berikutnya dengan token yang sama akan ditolak middleware `auth:sanctum` (HTTP 401). | Handal |
| SR-09 | Ubah data profil | 1) Login sebagai pengguna. 2) Buka halaman Profil. 3) Ubah data lalu klik Simpan. | data profil yang valid (misalnya nama dan nomor telepon) | Pesan "Profil berhasil diperbarui"; data baru tampil pada profil | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | Respons `{success:true, message:'Profil berhasil diperbarui', user}` memuat data terbaru. | Handal |
| SR-10 | Kata sandi lama salah | 1) Login sebagai pengguna. 2) Buka Profil, menu ubah kata sandi. 3) Isi kata sandi lama yang salah dan kata sandi baru ≥ 8 karakter. 4) Klik Simpan. | kata sandi lama tidak sesuai | Pesan "Password lama tidak sesuai." (HTTP 422); kata sandi tidak berubah | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | AuthController::changePassword melempar ValidationException dengan pesan persis "Password lama tidak sesuai." (HTTP 422); kolom kata sandi tidak diperbarui. | Handal |
| SR-11 | Kata sandi lama benar | 1) Login sebagai pengguna. 2) Buka Profil, menu ubah kata sandi. 3) Isi kata sandi lama, baru, dan konfirmasi. 4) Klik Simpan. | kata sandi lama benar; kata sandi baru ≥ 8 karakter beserta konfirmasi | Pesan "Password berhasil diubah"; login berikutnya memakai kata sandi baru | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | Respons `{success:true, message:'Password berhasil diubah'}`; kata sandi disimpan ter-hash melalui `Hash::make`. | Handal |
| RP-01 | Minta tautan reset | 1) Buka halaman "Lupa kata sandi?". 2) Isi email terdaftar. 3) Klik Kirim. | email yang terdaftar | Pesan bahwa tautan penyetelan ulang telah dikirim; surel berisi tautan diterima; pengiriman tercatat pada riwayat notifikasi | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | Respons `{success:true, message:'Tautan penyetelan ulang kata sandi telah dikirim ke email Anda. Tautan berlaku 60 menit.'}` selalu tampil sukses walau pengiriman surel gagal (disengaja); kegagalan dicatat ke `laravel.log` dan `NotifikasiLog` berstatus `gagal`. | Handal |
| RP-04 | Minta tautan reset, email tidak terdaftar | 1) Buka halaman "Lupa kata sandi?". 2) Isi email yang tidak terdaftar. 3) Klik Kirim. | email yang tidak ada di basis data | Pesan validasi email tidak terdaftar (HTTP 422); tidak ada surel terkirim | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | Validasi `exists:users,email` menolak dengan HTTP 422, namun pesannya adalah pesan bawaan Laravel ("The selected email is invalid."), bukan pesan Indonesia kustom; tidak ada surel terkirim. | Handal (dengan catatan: pesan validasi masih berbahasa Inggris bawaan Laravel) |
| RP-02 | Buka tautan dan set sandi baru (token valid) | 1) Buka tautan dari surel. 2) Isi kata sandi baru dan konfirmasi. 3) Klik Simpan. 4) Login dengan kata sandi baru. | tautan dengan token valid yang belum kedaluwarsa (60 menit); kata sandi baru ≥ 8 karakter beserta konfirmasi | Pesan "Kata sandi berhasil diperbarui. Silakan masuk dengan kata sandi baru."; seluruh token sesi lama dicabut; tautan tidak dapat dipakai lagi | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | Respons persis "Kata sandi berhasil diperbarui. Silakan masuk dengan kata sandi baru."; `$user->tokens()->delete()` mencabut seluruh token sesi lama; token dihapus dari cache (`Cache::forget`) sehingga tidak dapat dipakai ulang. | Handal |
| RP-03 | Tautan tidak valid ditolak | 1) Buka tautan reset dengan token acak, atau tautan yang sudah dipakai, atau yang lebih dari 60 menit. | token acak, kedaluwarsa, atau yang sudah dipakai | Halaman "Tautan Tidak Berlaku" tampil; permintaan ditolak (HTTP 422); kata sandi tidak berubah | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | `ambilDataTautan()` melempar ValidationException (HTTP 422) untuk token tidak ditemukan/kedaluwarsa; ResetPassword.jsx menangkap galat ini dan menampilkan halaman "Tautan Tidak Berlaku" dengan tombol "Minta Tautan Baru", persis seperti yang diharapkan. | Handal |

### 5.2 Modul Halaman Publik

| Identifikasi | Deskripsi | Prosedur Pengujian | Masukan | Keluaran yang Diharapkan | Kriteria Evaluasi Hasil | Hasil yang Didapat | Kesimpulan |
|---|---|---|---|---|---|---|---|
| PU-01 | Halaman Beranda | 1) Buka karinakas.com tanpa login. | akses ke alamat utama situs tanpa login | Ringkasan profil, kegiatan terbaru, dan berita terbaru tampil | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | Home.jsx merender bagian Hero, Stats, Kegiatan (ringkasan terbaru), Values, Galeri (ringkasan), dan CTA sebagai satu halaman beranda yang dapat diakses tanpa login. | Handal |
| PU-02 | Tentang Kami | 1) Buka menu Tentang Kami. | akses ke halaman Tentang Kami | Profil, visi, dan misi lembaga tampil | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | TentangKami.jsx memuat bagian profil lembaga serta bagian "Visi & Misi" secara eksplisit. | Handal |
| PU-03 | Daftar Kegiatan | 1) Buka menu Kegiatan. | akses ke halaman Kegiatan | Daftar kegiatan tampil beserta fitur penyaring dan pencarian | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | Kegiatan.jsx merender grid kegiatan dengan kolom pencarian ("Cari Kegiatan..."), penyaring kategori, dan urutan (terbaru/terlama/A-Z) dalam satu halaman. | Handal |
| PU-04 | Detail Kegiatan | 1) Buka menu Kegiatan. 2) Klik salah satu kegiatan. | kegiatan yang tersimpan | Judul, deskripsi, lokasi, tanggal, dan kuota relawan kegiatan tampil | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | Kegiatan.jsx menampilkan detail (`selected`) memuat judul, kategori berlencana, dan (dari model Kegiatan) deskripsi, lokasi, tanggal, serta kuota relawan. | Handal |
| PU-05 | Daftar Berita | 1) Buka menu Berita. | akses ke halaman Berita | Hanya berita berstatus terbit (published) yang tampil | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | KampanyeController::index menyaring `published()` untuk pengunjung tanpa peran admin/super_admin; Berita.jsx memfilter `isPublished` di sisi klien sebagai lapisan kedua. | Handal |
| PU-06 | Detail Berita | 1) Buka menu Berita. 2) Klik salah satu berita. | berita berstatus terbit | Isi lengkap berita tampil | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | KampanyeController::show menolak (404) berita berstatus selain `published` bagi pengunjung tanpa peran admin; detail lengkap (`konten`, `penulis`, `tags`, dsb.) dikembalikan untuk berita terbit. | Handal |
| PU-07 | Galeri | 1) Buka menu Galeri. 2) Klik salah satu album. | akses ke halaman Galeri | Foto dikelompokkan per album; foto dapat dibuka pada tampilan lightbox | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | Galeri.jsx mengelompokkan foto per album (nama kegiatan) dan membuka `lightbox` dengan navigasi sebelum/berikutnya serta penutupan lewat tombol atau tombol Escape. | Handal |
| PU-08 | Kontak | 1) Buka menu Kontak. | akses ke halaman Kontak | Alamat, telepon, surel, tautan WhatsApp, dan peta lembaga tampil | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | Kontak.jsx menampilkan tautan WhatsApp (`wa.me/6281392777710`), alamat dari `src/data/lembaga.js`, dan peta (`PETA_SEMATAN`/`PETA_TAUTAN`). | Handal |
| PU-09 | Filter Kegiatan | 1) Buka menu Kegiatan. 2) Pilih satu kategori pada penyaring. | kategori (sosial, pendidikan, kesehatan, bantuan, atau lainnya) | Hanya kegiatan dengan kategori terpilih yang tampil | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | Kegiatan.jsx menyaring array `allKegiatan` berdasarkan `catFilter === kategori terpilih` sebelum dirender; kategori yang tidak dipilih tidak tampil pada grid. | Handal |
| PU-10 | Pencarian Kegiatan | 1) Buka menu Kegiatan. 2) Isi kata kunci pada kolom pencarian. | kata kunci yang ada pada judul kegiatan | Hanya kegiatan yang sesuai kata kunci yang tampil | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | Kegiatan.jsx menyaring berdasarkan `judul.toLowerCase().includes(search)`; hanya kegiatan yang judulnya memuat kata kunci yang tampil. | Handal |

### 5.3 Modul Partisipasi Pengguna Terdaftar

| Identifikasi | Deskripsi | Prosedur Pengujian | Masukan | Keluaran yang Diharapkan | Kriteria Evaluasi Hasil | Hasil yang Didapat | Kesimpulan |
|---|---|---|---|---|---|---|---|
| UT-01 | Pendaftaran relawan, field kosong | 1) Login sebagai pengguna. 2) Buka Daftar Relawan, pilih kegiatan. 3) Kosongkan field wajib. 4) Klik Kirim. | jenis relawan dikosongkan | Pesan validasi tampil; pendaftaran tidak tersimpan | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | RelawanController::store memvalidasi `jenis` wajib diisi (`required\|string\|max:100`); permintaan tanpa `jenis` ditolak HTTP 422 dan tidak ada baris relawan tersimpan. | Handal |
| UT-02 | Pendaftaran relawan, data valid | 1) Login sebagai pengguna. 2) Buka Daftar Relawan, pilih kegiatan aktif. 3) Isi jenis, bidang minat, KTP, dan motivasi. 4) Klik Kirim. | kegiatan aktif, jenis dan bidang minat sesuai opsi kegiatan, KTP 16 digit, motivasi | Pesan "Pendaftaran relawan berhasil" (HTTP 201); pendaftaran tersimpan berstatus pending | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | Kondisi kegiatan aktif, opsi jenis/minat sesuai, dan kuota belum penuh semuanya lolos; respons `{success:true, message:'Pendaftaran relawan berhasil'}` (HTTP 201) dengan `status` awal `pending`. | Handal |
| UT-03 | Validasi nomor KTP | 1) Login sebagai pengguna. 2) Buka formulir Daftar Relawan. 3) Isi nomor KTP kurang dari 16 digit, atau kosongkan. 4) Klik Kirim. | nomor KTP kosong atau kurang dari 16 digit | Formulir menolak pengiriman di sisi klien; permintaan ke layanan juga ditolak (HTTP 422) bila tetap dipaksa | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | Kolom masukan pada DaftarRelawan.jsx kini memakai `required`, `minLength={16}`, `maxLength={16}`, dan `pattern="\d{16}"`, ditambah pemeriksaan sisi klien sebelum kirim (`form.ktp.length !== 16` menampilkan "Nomor KTP harus diisi tepat 16 digit."). RelawanController::store memvalidasi `nomor_ktp` sebagai `required\|digits:16`; permintaan dengan KTP kosong atau bukan 16 digit ditolak HTTP 422 dan tidak tersimpan. | Handal — validasi 16 digit kini ditegakkan di klien (required + minLength/maxLength/pattern) maupun di layanan (`required\|digits:16`); perbaikan dilakukan 30 September 2026, menutup temuan Tidak Handal sebelumnya (lihat HANDOFF.md §4.13) |
| UT-12 | Pendaftaran relawan ganda pada kegiatan yang sama | 1) Login sebagai pengguna yang sudah mendaftar pada suatu kegiatan. 2) Daftar kembali pada kegiatan yang sama. | pendaftaran kedua pada kegiatan yang sama oleh pengguna yang sama | Pesan "Anda sudah terdaftar di kegiatan ini" (HTTP 400); tidak ada pendaftaran baru | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | Blok pengecekan `$existing = Relawan::where('user_id', ...)->where('kegiatan_id', ...)->first()` menolak dengan pesan persis "Anda sudah terdaftar di kegiatan ini" (HTTP 400); tidak ada baris kedua tersimpan. | Handal |
| UT-04 | Riwayat relawan | 1) Login sebagai pengguna. 2) Buka Profil, tab Riwayat Relawan. | pengguna yang memiliki pendaftaran | Daftar pendaftaran milik pengguna tersebut tampil beserta statusnya | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | RelawanController::myRegistrations mengembalikan seluruh pendaftaran milik `user_id` yang login, diurutkan terbaru lebih dulu, beserta relasi kegiatan. | Handal |
| UT-05 | Batalkan pendaftaran relawan | 1) Login sebagai pengguna. 2) Buka Profil, tab Riwayat Relawan. 3) Klik Batalkan pada pendaftaran pending. 4) Ulangi pada pendaftaran berstatus diterima. | pendaftaran berstatus pending milik sendiri; pendaftaran berstatus diterima | Pendaftaran pending: pesan "Pendaftaran berhasil dibatalkan" dan data terhapus. Pendaftaran diterima: pesan "Pendaftaran yang sudah diterima tidak bisa dibatalkan" (HTTP 400) | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | Pendaftaran `pending`: `RelawanController::cancel` menghapus baris (bukan mengubah status) dan membalas "Pendaftaran berhasil dibatalkan". Pendaftaran `diterima`: ditolak dengan pesan persis "Pendaftaran yang sudah diterima tidak bisa dibatalkan" (HTTP 400). | Handal (catatan: keluaran yang diharapkan menyebut "data terhapus" — ini akurat, karena pembatalan memang menghapus baris, bukan mengubah kolom status menjadi "dibatalkan") |
| UT-06 | Donasi, field kosong | 1) Login sebagai pengguna. 2) Buka halaman Donasi. 3) Kosongkan kegiatan dan nominal. 4) Klik Kirim. | kegiatan dan nominal tidak diisi | Pesan validasi tampil, di antaranya "Silakan pilih kegiatan yang ingin Anda donasikan."; donasi tidak tersimpan | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | DonasiController::store memvalidasi `kegiatan_id` wajib dengan pesan kustom persis "Silakan pilih kegiatan yang ingin Anda donasikan." dan `jumlah` wajib (`required\|numeric\|min:1`); keduanya ditolak HTTP 422; donasi tidak tersimpan. | Handal |
| UT-07 | Donasi, data valid | 1) Login sebagai pengguna. 2) Buka halaman Donasi. 3) Pilih kegiatan, isi nominal, pilih metode (QRIS atau transfer). 4) Klik Kirim. | kegiatan aktif yang membuka donasi, nominal ≥ 1, metode pembayaran | Pesan "Transaksi donasi berhasil dibuat" (HTTP 201); donasi tersimpan berstatus pending | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | Kondisi kegiatan aktif dan `butuh_donasi` terpenuhi; respons "Transaksi donasi berhasil dibuat" (HTTP 201) dengan `status_pembayaran` awal `pending`. | Handal |
| UT-11 | Donasi pada kegiatan yang tidak membuka donasi | 1) Login sebagai pengguna. 2) Kirim donasi untuk kegiatan yang tidak membuka donasi. | kegiatan dengan butuh_donasi tidak aktif, atau kegiatan yang sudah selesai | Pesan "Kegiatan ini tidak membuka donasi" atau "Kegiatan ini sudah tidak menerima donasi" (HTTP 400); donasi tidak tersimpan | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | `if (!$kegiatan->isAktif())` membalas "Kegiatan ini sudah tidak menerima donasi"; `if (!$kegiatan->butuh_donasi)` membalas "Kegiatan ini tidak membuka donasi"; keduanya HTTP 400, donasi tidak tersimpan. | Handal |
| UT-08 | Format didukung | 1) Buat donasi terlebih dahulu. 2) Klik unggah bukti. 3) Pilih berkas JPG/PNG ≤ 4 MB. 4) Klik Kirim. | berkas JPG atau PNG berukuran ≤ 4 MB | Pesan "Bukti transfer berhasil diunggah. Menunggu verifikasi admin."; bukti tertaut ke donasi | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | `uploadBukti` memvalidasi `bukti` sebagai `required\|image\|max:4096` (KB, ≈4 MB); respons "Bukti transfer berhasil diunggah. Menunggu verifikasi admin." dengan `url` berkas dan data donasi diperbarui. | Handal |
| UT-09 | Format tidak didukung | 1) Buat donasi terlebih dahulu. 2) Klik unggah bukti. 3) Pilih berkas PDF atau gambar > 4 MB. 4) Klik Kirim. | berkas selain gambar, atau gambar > 4 MB | Galat validasi berkas (HTTP 422); bukti tidak tersimpan | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | Validasi `image\|max:4096` menolak berkas non-gambar atau melebihi 4096 KB dengan HTTP 422; kolom `bukti_transfer` tidak berubah. | Handal |
| UT-10 | Lihat riwayat | 1) Login sebagai pengguna. 2) Buka Profil, tab Riwayat Donasi. | pengguna yang memiliki donasi | Daftar donasi milik pengguna tersebut tampil beserta statusnya | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | DonasiController::myDonations mengembalikan donasi milik `user_id` yang login, diurutkan berdasarkan `tanggal_donasi` terbaru, beserta relasi kegiatan. | Handal |

### 5.4 Modul Dasbor dan Pengelolaan Konten

| Identifikasi | Deskripsi | Prosedur Pengujian | Masukan | Keluaran yang Diharapkan | Kriteria Evaluasi Hasil | Hasil yang Didapat | Kesimpulan |
|---|---|---|---|---|---|---|---|
| AD-01 | Tampilkan statistik | 1) Login sebagai admin, buka dasbor. 2) Keluar, lalu login sebagai super admin, buka dasbor. | akun admin, kemudian akun super admin | Admin: statistik tanpa total nominal donasi. Super admin: statistik beserta total nominal donasi | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | Admin: `stats` tanpa `total_nominal_donasi`. Super admin: `stats['total_nominal_donasi']` disertakan (`Donasi::where('status_pembayaran','berhasil')->sum('jumlah')`); grafik bulanan juga menambahkan `total_nominal` hanya untuk super admin. | Handal |
| AD-02 | Field kosong | 1) Login sebagai admin. 2) Buka menu Kegiatan, klik Tambah. 3) Kosongkan field wajib. 4) Klik Simpan. | judul, deskripsi, lokasi, kategori, tanggal, dan kuota relawan dikosongkan | Pesan validasi tampil (HTTP 422); kegiatan tidak tersimpan | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | KegiatanController::store mewajibkan `judul`, `deskripsi`, `lokasi`, `kategori`, `tanggal_mulai`, `tanggal_selesai`, dan `kuota_relawan`; permintaan tanpa field ini ditolak HTTP 422, kegiatan tidak tersimpan. | Handal |
| AD-03 | Tambah valid | 1) Login sebagai admin. 2) Buka menu Kegiatan, klik Tambah. 3) Isi seluruh field wajib. 4) Klik Simpan. | judul, deskripsi, lokasi, kategori valid, tanggal mulai dan selesai, kuota relawan | Kegiatan tersimpan dan tampil pada daftar | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | Seluruh field wajib valid → `Kegiatan::create($validated)` berhasil; respons "Kegiatan berhasil ditambahkan" (HTTP 201) dan kegiatan tampil pada daftar berikutnya. | Handal |
| AD-37 | Tanggal selesai sebelum tanggal mulai | 1) Login sebagai admin. 2) Buka menu Kegiatan, klik Tambah. 3) Isi tanggal selesai lebih awal dari tanggal mulai. 4) Klik Simpan. | tanggal selesai lebih awal daripada tanggal mulai | Pesan validasi tanggal selesai harus sama dengan atau setelah tanggal mulai (HTTP 422); kegiatan tidak tersimpan | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | Aturan `tanggal_selesai' => 'required\|date\|after_or_equal:tanggal_mulai'` menolak tanggal selesai yang lebih awal dengan HTTP 422 (pesan bawaan Laravel "The tanggal selesai field must be a date after or equal to tanggal mulai."); kegiatan tidak tersimpan. | Handal (dengan catatan: pesan validasi masih berbahasa Inggris bawaan Laravel, bukan terjemahan Indonesia) |
| AD-04 | Tampilkan daftar | 1) Login sebagai admin. 2) Buka menu Kegiatan. | akun admin | Daftar seluruh kegiatan tampil | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | KegiatanController::index (tanpa penyaring) mengembalikan seluruh kegiatan, tidak dibatasi status. | Handal |
| AD-05 | Ubah data | 1) Login sebagai admin. 2) Buka menu Kegiatan, klik Ubah pada satu kegiatan. 3) Ubah data. 4) Klik Simpan. | data kegiatan yang valid | Data kegiatan diperbarui | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | `Kegiatan::update($validated)` menerima perubahan parsial (`sometimes`); respons "Kegiatan berhasil diperbarui" beserta data terbaru. | Handal |
| AD-06 | Hapus | 1) Login sebagai admin. 2) Buka menu Kegiatan, klik Hapus. 3) Konfirmasi penghapusan. | kegiatan yang tersimpan | Kegiatan terhapus; data turunan mengikuti aturan integritas (pendaftaran relawan ikut terhapus, donasi dan foto galeri kehilangan tautan kegiatan) | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | `Kegiatan::delete()` (soft/hard sesuai model) memicu `ON DELETE CASCADE` pada `relawan.kegiatan_id` (pendaftaran ikut terhapus) dan `SET NULL` pada `donasi.kegiatan_id`/`galeri.kegiatan_id` (kehilangan tautan, baris tetap ada) — sesuai relasi yang didokumentasikan di CONTEXT.md §6. | Handal |
| AD-07 | Ubah status | 1) Login sebagai admin. 2) Buka menu Kegiatan. 3) Pilih status baru pada satu kegiatan. | status aktif, selesai, atau dibatalkan | Status kegiatan diperbarui sesuai pilihan | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | `updateStatus` memvalidasi `status` sebagai `required\|in:aktif,selesai,dibatalkan`; kolom `status` diperbarui sesuai pilihan, respons "Status kegiatan berhasil diperbarui". | Handal |
| AD-08 | Field kosong | 1) Login sebagai admin. 2) Buka menu Berita, klik Tambah. 3) Kosongkan field wajib. 4) Klik Simpan. | judul, konten, dan kategori dikosongkan | Pesan validasi tampil (HTTP 422); berita tidak tersimpan | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | KampanyeController::store mewajibkan `judul`, `konten`, dan `kategori`; permintaan tanpa field ini ditolak HTTP 422, berita tidak tersimpan. | Handal |
| AD-09 | Tambah valid | 1) Login sebagai admin. 2) Buka menu Berita, klik Tambah. 3) Isi judul, konten, kategori, dan status. 4) Klik Simpan. | judul, konten, kategori valid, status draft atau published | Berita tersimpan; berstatus published tampil pada halaman publik, berstatus draft tidak tampil | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | Field wajib valid → `Kampanye::create($validated)` berhasil; jika `status=published` dan `tanggal_publish` kosong, sistem otomatis mengisi `now()`. Berita `published` tampil di `KampanyeController::index` publik (melalui `published()`), sedangkan `draft` disaring keluar untuk pengunjung. | Handal |
| AD-10 | Tampilkan daftar | 1) Login sebagai admin. 2) Buka menu Berita. | akun admin | Daftar berita tampil, termasuk yang berstatus draft | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | KampanyeController::index untuk pengguna berperan admin/super_admin TIDAK menerapkan `published()`, sehingga berita berstatus `draft` ikut tampil pada panel admin. | Handal |
| AD-11 | Ubah data | 1) Login sebagai admin. 2) Buka menu Berita, klik Ubah. 3) Ubah data. 4) Klik Simpan. | data berita yang valid | Data berita diperbarui | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | `Kampanye::update($validated)` menerima perubahan parsial; respons "Kampanye berhasil diperbarui". | Handal |
| AD-12 | Hapus | 1) Login sebagai admin. 2) Buka menu Berita, klik Hapus. 3) Konfirmasi penghapusan. | berita yang tersimpan | Berita terhapus | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | `Kampanye::delete()` menghapus baris; respons "Kampanye berhasil dihapus". | Handal |
| AD-17 | Unggah format didukung | 1) Login sebagai admin. 2) Buka menu Galeri, klik Unggah. 3) Isi nama album, pilih berkas JPG/PNG ≤ 5 MB. 4) Klik Simpan. | berkas JPG atau PNG berukuran ≤ 5 MB | Foto tersimpan dan tampil pada album | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | GaleriController::store memvalidasi `gambar` sebagai `image\|max:5120` (KB, ≈5 MB) ketika berkas disertakan; berkas tersimpan di `storage/galeri` dan baris `Galeri` terbentuk, respons "Galeri berhasil ditambahkan" (HTTP 201). | Handal |
| AD-18 | Unggah format tidak didukung | 1) Login sebagai admin. 2) Buka menu Galeri, klik Unggah. 3) Pilih berkas PDF. 4) Klik Simpan. | berkas selain gambar | Galat validasi berkas (HTTP 422); foto tidak tersimpan | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | Validasi `image` menolak berkas PDF/non-gambar dengan HTTP 422; tidak ada baris tersimpan. | Handal |
| AD-19 | Unggah massal | 1) Login sebagai admin. 2) Buka menu Galeri, klik Unggah. 3) Pilih 25 berkas gambar. 4) Klik Simpan. | lebih dari satu berkas gambar valid sekaligus (misalnya 25 berkas) | Seluruh foto tersimpan; klien memecah pengiriman menjadi maksimal 20 berkas per permintaan | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | `bulkUpload` memvalidasi `gambar.*` sebagai `image\|max:5120` per berkas dan menerima array `gambar`; seluruh berkas yang valid tersimpan sebagai baris `Galeri` terpisah dalam satu permintaan. Pemecahan menjadi maksimal 20 berkas per permintaan dilakukan di sisi klien (React), bukan di `bulkUpload` itu sendiri. | Handal |
| AD-20 | Tampilkan daftar | 1) Login sebagai admin. 2) Buka menu Galeri. | akun admin | Daftar foto tampil | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | GaleriController::index (tanpa penyaring) mengembalikan seluruh foto, diurutkan terbaru lebih dulu. | Handal |
| AD-21 | Ubah data | 1) Login sebagai admin. 2) Buka menu Galeri, klik Ubah pada satu foto. 3) Ubah judul atau deskripsi. 4) Klik Simpan. | judul atau deskripsi yang valid | Data foto diperbarui | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | `Galeri::update($validated)` menerima `judul`/`deskripsi` (`sometimes`); jika berkas baru disertakan, berkas lama yang tersimpan lokal dihapus (`Storage::disk('public')->delete`) sebelum berkas baru disimpan. | Handal |
| AD-22 | Hapus foto | 1) Login sebagai admin. 2) Buka menu Galeri, klik Hapus pada satu foto. 3) Konfirmasi penghapusan. | foto yang tersimpan | Data foto dan berkas fisiknya terhapus | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | `Galeri::delete()` menghapus baris; berkas fisik lokal turut dihapus (`Storage::disk('public')->delete`) bila `gambar_url` bukan tautan eksternal (`http`). | Handal |

### 5.5 Modul Verifikasi Relawan dan Donasi

| Identifikasi | Deskripsi | Prosedur Pengujian | Masukan | Keluaran yang Diharapkan | Kriteria Evaluasi Hasil | Hasil yang Didapat | Kesimpulan |
|---|---|---|---|---|---|---|---|
| AD-23 | Tampilkan daftar | 1) Login sebagai admin. 2) Buka menu Relawan. | akun admin | Daftar seluruh pendaftar relawan tampil | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | RelawanController::index (tanpa penyaring) mengembalikan seluruh pendaftar relawan lintas kegiatan. | Handal |
| AD-24 | Ubah status | 1) Login sebagai admin. 2) Buka menu Relawan. 3) Pilih status diterima pada satu pendaftar. | status pending, diterima, atau ditolak | Pesan "Status relawan berhasil diperbarui"; untuk status diterima, jumlah relawan terdaftar kegiatan bertambah dan surel pemberitahuan terkirim | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | `updateStatus` memvalidasi `status` sebagai `required\|in:pending,diterima,ditolak`; untuk status `diterima`, `Mail::to($u->email)->send(new RelawanDiterima(...))` dikirim dan `NotifikasiLog::record` mencatat status `terkirim`/`gagal`; `jumlah_relawan_terdaftar` kegiatan dijaga oleh event model `Relawan`. | Handal |
| AD-25 | Hapus data | 1) Login sebagai admin. 2) Buka menu Relawan, klik Hapus. 3) Konfirmasi penghapusan. | pendaftar yang tersimpan | Pesan "Data relawan berhasil dihapus"; tindakan tercatat pada jejak audit | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | `RelawanController::destroy` menghapus baris dan memanggil `AuditLog::record($request->user(), 'Menghapus relawan', ...)`; respons "Data relawan berhasil dihapus". | Handal |
| AD-26 | Filter per kegiatan | 1) Login sebagai admin. 2) Buka menu Relawan. 3) Pilih satu kegiatan pada penyaring. | satu kegiatan yang memiliki pendaftar | Hanya pendaftar kegiatan tersebut yang tampil | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | `RelawanController::index` menerapkan `where('kegiatan_id', $request->kegiatan_id)` ketika parameter diisi; hanya pendaftar kegiatan tersebut yang tampil. | Handal |
| AD-13 | Tampilkan daftar donasi | 1) Login sebagai admin, buka menu Donasi. 2) Keluar, lalu login sebagai super admin, buka menu Donasi. | akun admin, kemudian akun super admin | Admin: daftar tanpa nominal, biaya transfer, kode transaksi, rekening pengirim, dan bukti. Super admin: daftar lengkap | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | `sembunyikanKeuangan()` memanggil `$paginator->getCollection()->makeHidden([...])` untuk lima medan keuangan (`jumlah`, `biaya_transfer`, `kode_transaksi`, `rekening_pengirim`, `bukti_transfer`) bila `!$request->user()->isSuperAdmin()`; medan-medan ini benar-benar hilang dari respons JSON bagi admin biasa, sedangkan super admin menerima seluruhnya. | Handal |
| AD-14 | Mengubah status pembayaran | 1) Login sebagai super admin. 2) Buka menu Donasi. 3) Pilih status berhasil pada satu donasi yang buktinya sudah diunggah. | status pending, berhasil, atau gagal | Pesan "Status donasi berhasil diperbarui"; tindakan tercatat pada jejak audit; untuk status berhasil, surel pemberitahuan terkirim | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | `wajibSuperAdmin()` meloloskan super admin; `updateStatus` memvalidasi `in:pending,berhasil,gagal`, mencatat `AuditLog::record`, dan untuk status `berhasil` memanggil `NotifikasiController::kirimNotifikasiDonasi` serta mencatat `NotifikasiLog`. Respons "Status donasi berhasil diperbarui". | Handal |
| AD-14N | Admin mencoba mengubah status, ditolak | 1) Login sebagai admin. 2) Coba ubah status donasi (melalui antarmuka atau permintaan API langsung). | permintaan ubah status donasi dari akun admin | Ditolak dengan HTTP 403 ("Hanya Super Admin yang dapat ..."); status donasi tidak berubah | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | `wajibSuperAdmin($request, 'memverifikasi pembayaran donasi')` memanggil `abort(403, "Hanya Super Admin yang dapat memverifikasi pembayaran donasi.")` untuk admin biasa sebelum baris donasi disentuh; status tidak berubah. | Handal |
| AD-15 | Menghapus donasi | 1) Login sebagai super admin. 2) Buka menu Donasi, klik Hapus. 3) Konfirmasi penghapusan. | donasi yang tersimpan | Pesan "Data donasi berhasil dihapus"; tindakan tercatat pada jejak audit | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | `wajibSuperAdmin()` meloloskan super admin; `destroy` menghapus baris dan mencatat `AuditLog::record(auth()->user(), 'Menghapus donasi', ...)`. Respons "Data donasi berhasil dihapus". | Handal |
| AD-15N | Admin mencoba menghapus donasi, ditolak | 1) Login sebagai admin. 2) Coba hapus donasi (melalui antarmuka atau permintaan API langsung). | permintaan hapus donasi dari akun admin | Ditolak dengan HTTP 403; donasi tetap ada | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | `wajibSuperAdmin($request, 'menghapus data donasi')` mengembalikan HTTP 403 untuk admin biasa sebelum baris donasi dihapus; donasi tetap ada. | Handal |
| AD-16 | Pencarian donasi | 1) Login sebagai admin. 2) Buka menu Donasi. 3) Isi kata kunci pada kolom pencarian. | kata kunci yang cocok dengan data donasi | Hasil pencarian tampil tanpa medan keuangan bagi admin | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | `search()` memanggil `sembunyikanKeuangan()` yang sama dengan `index()` sebelum membalas hasil; medan keuangan tersembunyi bagi admin biasa pada hasil pencarian (celah ini sudah ditutup, lihat komentar kode "Dulu jalur ini tidak menyamarkan apa pun"). | Handal |

### 5.6 Modul Manajemen Pengguna dan Jejak Audit

| Identifikasi | Deskripsi | Prosedur Pengujian | Masukan | Keluaran yang Diharapkan | Kriteria Evaluasi Hasil | Hasil yang Didapat | Kesimpulan |
|---|---|---|---|---|---|---|---|
| AD-27 | Tambah field kosong | 1) Login sebagai super admin. 2) Buka menu Pengguna, klik Tambah. 3) Kosongkan field wajib. 4) Klik Simpan. | nama, email, kata sandi, dan peran dikosongkan | Pesan validasi tampil (HTTP 422); pengguna tidak tersimpan | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | `storeUser` memvalidasi `nama_lengkap`, `email`, `username`, `password`, dan `role` sebagai wajib; permintaan tanpa field ini ditolak HTTP 422, pengguna tidak tersimpan. | Handal |
| AD-28 | Tambah valid | 1) Login sebagai super admin. 2) Buka menu Pengguna, klik Tambah. 3) Isi seluruh field. 4) Klik Simpan. | nama, email baru, kata sandi ≥ 8 karakter, peran | Pesan "Pengguna berhasil dibuat"; tindakan tercatat pada jejak audit | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | Field wajib valid dan `isSuperAdmin()` lolos → `User::create($validated)` berhasil; `AuditLog::record($request->user(), 'Menambah pengguna', ...)` tercatat. Respons "Pengguna berhasil dibuat" (HTTP 201). | Handal |
| AD-28N | Admin mencoba menambah pengguna, ditolak | 1) Login sebagai admin. 2) Coba tambah pengguna (menu tidak tersedia; uji dengan permintaan API langsung). | permintaan POST /admin/users dari akun admin | Ditolak dengan HTTP 403 ("Hanya Super Admin yang dapat membuat akun pengguna."); tidak ada pengguna baru tersimpan | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | `if (!$request->user()->isSuperAdmin()) abort(403, 'Hanya Super Admin yang dapat membuat akun pengguna.')` dieksekusi sebelum validasi/`User::create` dijalankan; tidak ada baris pengguna baru. | Handal |
| AD-29 | Tampilkan daftar | 1) Login sebagai super admin. 2) Buka menu Pengguna. | akun super admin | Daftar seluruh pengguna tampil | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | `users()` memanggil `isSuperAdmin()` sebelum membalas query `User::query()` berpaginasi; seluruh pengguna tampil bagi super admin. | Handal |
| AD-29N | Admin mencoba membuka daftar pengguna, ditolak | 1) Login sebagai admin. 2) Akses daftar pengguna (menu tidak tersedia; uji dengan permintaan API langsung). | permintaan GET /admin/users dari akun admin | Ditolak dengan HTTP 403; tidak ada data pengguna yang dikembalikan | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | `if (!$request->user()->isSuperAdmin()) abort(403, 'Hanya Super Admin yang dapat melihat daftar akun pengguna.')` dieksekusi sebelum query dijalankan; admin biasa tidak menerima data pengguna sama sekali (perbaikan 19 September 2026, lihat HANDOFF.md §4.7). | Handal |
| AD-30 | Ubah data | 1) Login sebagai super admin. 2) Buka menu Pengguna, klik Ubah. 3) Ubah data. 4) Klik Simpan. | data pengguna yang valid | Pesan "Pengguna berhasil diperbarui" | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | `updateUser` memvalidasi field `sometimes` dan `isSuperAdmin()` lolos; `User::update($validated)` berhasil, `AuditLog::record` mencatat aksi "Mengubah data pengguna" atau "Mengubah role pengguna". Respons "Pengguna berhasil diperbarui". | Handal |
| AD-30N | Admin mencoba mengubah data pengguna, ditolak | 1) Login sebagai admin. 2) Coba ubah data pengguna lain (menu tidak tersedia; uji dengan permintaan API langsung). | permintaan PUT /admin/users/{id} dari akun admin | Ditolak dengan HTTP 403 ("Hanya Super Admin yang dapat mengubah data pengguna."); data pengguna tidak berubah | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | `if (!$request->user()->isSuperAdmin()) abort(403, 'Hanya Super Admin yang dapat mengubah data pengguna.')` dieksekusi sebelum `User::findOrFail($id)`/`update()`; data pengguna tidak berubah. | Handal |
| AD-39 | Ubah peran akun sendiri ditolak | 1) Login sebagai super admin. 2) Buka menu Pengguna, ubah akun sendiri. 3) Ubah peran lalu klik Simpan. | perubahan peran pada akun super admin yang sedang login | Pesan "Anda tidak dapat mengubah role akun Anda sendiri." (HTTP 422); peran tidak berubah | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | Blok `if (array_key_exists('role', $validated) && $user->id === $request->user()->id && $validated['role'] !== 'super_admin')` menolak dengan pesan persis "Anda tidak dapat mengubah role akun Anda sendiri." (HTTP 422) sebelum `update()` dipanggil; peran tidak berubah. | Handal |
| AD-31 | Hapus pengguna | 1) Login sebagai super admin. 2) Buka menu Pengguna, klik Hapus. 3) Konfirmasi penghapusan. | akun berperan pengguna atau admin | Pesan "Pengguna berhasil dihapus"; tindakan tercatat pada jejak audit; donasi milik akun itu ikut terhapus (aturan CASCADE) | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | `isSuperAdmin()` lolos dan target bukan super admin → `$user->delete()` berhasil (donasi milik akun ikut terhapus lewat `ON DELETE CASCADE` pada `donasi.user_id`); `AuditLog::record` mencatat "Menghapus pengguna". Respons "Pengguna berhasil dihapus". | Handal |
| AD-38 | Hapus akun super admin ditolak | 1) Login sebagai super admin. 2) Coba hapus akun berperan super admin. | akun berperan super admin sebagai target | Pesan "Super Admin tidak dapat dihapus" (HTTP 403); akun tetap ada | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | `if ($user->isSuperAdmin())` menolak dengan pesan persis "Super Admin tidak dapat dihapus" (HTTP 403) sebelum `delete()` dipanggil; akun tetap ada — ini berlaku untuk SEMUA akun super admin, bukan hanya akun milik sendiri (lebih ketat daripada yang tersirat pada deskripsi butir uji). | Handal |
| AD-31N | Admin mencoba menghapus pengguna, ditolak | 1) Login sebagai admin. 2) Coba hapus pengguna (uji dengan permintaan API langsung). | permintaan DELETE pengguna dari akun admin | Ditolak dengan HTTP 403 ("Hanya Super Admin yang dapat menghapus akun pengguna."); akun tetap ada | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | `if (!$request->user()->isSuperAdmin()) abort(403, 'Hanya Super Admin yang dapat menghapus akun pengguna.')` dieksekusi sebelum `User::findOrFail($id)`; akun target tetap ada (perbaikan 19 September 2026, lihat HANDOFF.md §4.7). | Handal |
| AD-32 | Reset kata sandi | 1) Login sebagai super admin. 2) Buka menu Pengguna, klik Reset Kata Sandi. 3) Konfirmasi. | pengguna yang tersimpan | Pesan "Kata sandi berhasil direset"; tindakan tercatat pada jejak audit | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | `resetUserPassword` memvalidasi `password` (`string\|min:8`, default `'karinakas123'` bila kosong) dan `isSuperAdmin()` lolos; `User::update(['password' => $newPassword])` di-hash otomatis lewat cast model; `AuditLog::record` mencatat "Reset password pengguna". Respons "Kata sandi berhasil direset" beserta `password_sementara`. | Handal |
| AD-32N | Admin mencoba mereset kata sandi pengguna, ditolak | 1) Login sebagai admin. 2) Coba reset kata sandi pengguna lain (menu tidak tersedia; uji dengan permintaan API langsung). | permintaan POST /admin/users/{id}/reset-password dari akun admin | Ditolak dengan HTTP 403 ("Hanya Super Admin yang dapat mereset kata sandi."); kata sandi pengguna tidak berubah | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | `if (!$request->user()->isSuperAdmin()) abort(403, 'Hanya Super Admin yang dapat mereset kata sandi.')` dieksekusi sebelum `User::findOrFail($id)`/`update()`; kata sandi pengguna tidak berubah. | Handal |
| AL-01 | Super admin melihat jejak audit | 1) Login sebagai super admin. 2) Buka menu Audit. | akun super admin | Daftar tindakan pengelola tampil terurut dari yang terbaru | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | `auditLogs()` memanggil `isSuperAdmin()` lalu membalas `AuditLog::query()->orderBy('created_at', 'desc')->paginate(...)`; daftar tampil terurut dari yang terbaru. | Handal |
| AL-02 | Admin ditolak mengakses jejak audit | 1) Login sebagai admin. 2) Akses jejak audit (menu tidak tersedia; uji dengan permintaan API langsung). | permintaan GET /admin/audit dari akun admin | Ditolak dengan HTTP 403; tidak ada data audit yang dikembalikan | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | `if (!$request->user()->isSuperAdmin()) abort(403, 'Hanya Super Admin yang dapat melihat audit log.')` dieksekusi sebelum query dijalankan; admin biasa tidak menerima data audit. | Handal |

### 5.7 Modul Rekapitulasi dan Notifikasi

| Identifikasi | Deskripsi | Prosedur Pengujian | Masukan | Keluaran yang Diharapkan | Kriteria Evaluasi Hasil | Hasil yang Didapat | Kesimpulan |
|---|---|---|---|---|---|---|---|
| AD-33 | Rekapan relawan | 1) Login sebagai super admin. 2) Buka menu Relawan. 3) Klik tombol ekspor. | data relawan tersedia; penyaring aktif (opsional) | Berkas .xls terunduh dan isinya sesuai penyaring yang sedang diterapkan; tombol ekspor tidak tampil bagi admin biasa | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | SectionRelawan.jsx: tombol "Export Rekap ({filtered.length})" dibungkus `{isSuper && (...)}` sehingga hanya tampil bagi super admin (sesuai FR Karinakas 513 dan UC-21); memanggil `downloadExcel(...)` dari `utils/excel.js` menggunakan array `filtered` (data yang sudah melewati penyaring & pencarian aktif di layar) — bukan memanggil endpoint `AdminController::rekapanRelawan` sisi layanan. Pembatasan ini hanya ada di antarmuka karena berkas dibentuk di sisi klien. | Handal |
| AD-34 | Rekapan kegiatan | 1) Tidak dijalankan; titik akhir /admin/rekapan/kegiatan tidak dipakai aplikasi klien. | tidak diuji lewat titik akhir sisi layanan | Tidak berlaku (lihat catatan penyusunan) | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | Tidak dijalankan — sesuai catatan Bab 4.7.2, `rekapanKegiatan` tidak pernah dipanggil oleh aplikasi klien (diverifikasi: tidak ada `import`/pemanggilan endpoint ini pada berkas `Section*.jsx`). | Tidak berlaku (lihat catatan penyusunan) |
| AD-35 | Rekapan donasi | 1) Login sebagai super admin. 2) Buka menu Donasi. 3) Klik tombol ekspor. | data donasi tersedia | Berkas .xls terunduh dan memuat kolom nominal | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | SectionDonasi.jsx: tombol "Export Rekap ({filtered.length})" memanggil `downloadExcel` dengan kolom nominal disertakan. Tombol dibungkus `{isSuper && (...)}` sehingga hanya tampil bagi super admin; admin biasa tetap dapat membuka halaman Donasi tetapi tanpa nominal dan tanpa tombol ekspor. | Handal |
| AD-36 | Ekspor rekapan (umum) | 1) Buka menu yang memiliki tombol ekspor. 2) Klik tombol ekspor. 3) Ulangi pada kondisi tanpa data. | data tersedia; kemudian data kosong | Berkas .xls terunduh; tombol ekspor nonaktif bila tidak ada data | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | Baik SectionDonasi.jsx maupun SectionRelawan.jsx memberi `disabled={loading \|\| filtered.length === 0}` pada tombol ekspor — tombol benar-benar nonaktif ketika data hasil penyaring kosong. | Handal |
| NL-01 | Melihat riwayat notifikasi | 1) Login sebagai admin. 2) Buka menu Notifikasi. | akun admin | Riwayat pengiriman surel tampil beserta statusnya (terkirim atau gagal) | Sesuai apabila keluaran aktual sama dengan keluaran yang diharapkan | `notifikasiLogs()` menggunakan `authorize('viewAdminDashboard', ...)` (admin ATAU super admin lolos lewat `Gate::before`), membalas `NotifikasiLog::query()->orderBy('created_at','desc')->paginate(...)` yang menyertakan kolom `status` (`terkirim`/`gagal`). | Handal |

---

## 6. Hasil Pengujian Usability (*System Usability Scale*)

### 6.1 Metodologi

Pengujian usability dilakukan menggunakan kuesioner *System Usability Scale* (SUS)
yang disebarkan pada 3–26 September 2026 dan memperoleh **40 responden**. Instrumen
terdiri atas 10 pernyataan baku SUS (Brooke, 1986) dalam terjemahan Bahasa Indonesia,
dengan pernyataan bernomor ganjil bersifat positif dan bernomor genap bersifat
negatif. Responden menjawab dengan skala Likert lima poin (Sangat Tidak Setuju =
1 hingga Sangat Setuju = 5).

Skor tiap butir dihitung dengan aturan baku SUS: untuk pernyataan positif (butir
1, 3, 5, 7, 9), skor = nilai jawaban − 1; untuk pernyataan negatif (butir 2, 4, 6,
8, 10), skor = 5 − nilai jawaban. Jumlah kontribusi kesepuluh butir (rentang 0–40)
dikalikan 2,5 sehingga menghasilkan skor SUS per responden dalam rentang 0–100.
Skor akhir tiap kelompok merupakan rata-rata skor seluruh anggotanya. Identitas
responden dianonimkan pada tabel di bawah demi menjaga kerahasiaan; hanya urutan
dan peran yang dipertahankan.

Responden dikelompokkan menjadi dua, sejalan dengan pembedaan peran pada SKPL: (a)
**Pengunjung Umum**, mewakili pengguna website sebagai calon relawan/donatur, dan
(b) **Admin & Super Admin**, mewakili pengguna internal pengelola sistem — analog
dengan pembedaan pengguna eksternal/internal yang lazim pada pengujian SUS bertingkat
peran.

> **Bukti pengisian kuesioner (tempel *screenshot* di sini sebelum diserahkan).**
> Berkas sumber kuesioner adalah Google Form ("Kuesioner Pengujian Fungsionalitas dan
> Usability Website Karinakas"). Tempelkan sebagai gambar berurutan:
> - **Gambar 6.1** — halaman ringkasan respons Google Form (jumlah total responden, 40).
> - **Gambar 6.2** — grafik sebaran peran responden (Pengunjung Umum / Admin / Super Admin),
>   diambil dari tab *Summary* Google Form.
> - **Gambar 6.3 s.d. 6.12** — satu tangkapan layar per pernyataan (P1–P10) dari tab *Summary*,
>   menunjukkan distribusi jawaban 1–5 untuk tiap butir, sebagaimana dicontohkan pada PDHUPL
>   rujukan Bab 6.4–6.13.
>
### 6.2 Kuesioner SUS (10 Pernyataan Standar)

| No | Pernyataan | Sifat |
|---|---|---|
| P1 | Saya rasa saya akan sering menggunakan website ini. | Positif |
| P2 | Saya merasa website ini terlalu rumit untuk digunakan. | Negatif |
| P3 | Saya merasa website ini mudah digunakan. | Positif |
| P4 | Saya merasa memerlukan bantuan orang teknis untuk dapat menggunakan website ini. | Negatif |
| P5 | Saya merasa berbagai fungsi di website ini terintegrasi dengan baik. | Positif |
| P6 | Saya merasa terlalu banyak ketidakkonsistenan dalam website ini. | Negatif |
| P7 | Saya rasa kebanyakan orang akan dapat mempelajari penggunaan website ini dengan cepat. | Positif |
| P8 | Saya merasa website ini sangat tidak praktis untuk digunakan. | Negatif |
| P9 | Saya merasa sangat percaya diri saat menggunakan website ini. | Positif |
| P10 | Saya perlu belajar banyak hal terlebih dahulu sebelum dapat menggunakan website ini. | Negatif |

### 6.3 Jawaban Kuesioner per Responden (P1–P10)

Tabel berikut memuat skor Likert mentah (1–5) yang diisikan tiap responden untuk kesepuluh
pernyataan, sebelum diterapkan aturan skor SUS (skor positif = jawaban − 1; skor negatif =
5 − jawaban).

**Kelompok Pengunjung Umum**

| Responden | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
|---|---|---|---|---|---|---|---|---|---|---|
| R1 | 5 | 2 | 4 | 2 | 4 | 2 | 4 | 2 | 5 | 2 |
| R2 | 3 | 3 | 3 | 4 | 3 | 3 | 3 | 3 | 3 | 3 |
| R3 | 4 | 3 | 4 | 2 | 4 | 2 | 4 | 2 | 4 | 4 |
| R4 | 5 | 2 | 5 | 2 | 4 | 1 | 4 | 2 | 5 | 2 |
| R5 | 4 | 2 | 4 | 2 | 4 | 2 | 4 | 2 | 4 | 4 |
| R6 | 4 | 2 | 4 | 3 | 4 | 2 | 4 | 2 | 4 | 5 |
| R7 | 3 | 2 | 4 | 3 | 4 | 2 | 4 | 2 | 3 | 4 |
| R8 | 4 | 2 | 5 | 2 | 4 | 2 | 4 | 2 | 4 | 2 |
| R9 | 4 | 2 | 4 | 3 | 4 | 2 | 4 | 2 | 4 | 3 |
| R10 | 4 | 2 | 4 | 3 | 4 | 2 | 4 | 2 | 4 | 3 |
| R11 | 4 | 2 | 4 | 3 | 4 | 2 | 4 | 2 | 4 | 3 |
| R12 | 3 | 1 | 3 | 3 | 4 | 2 | 4 | 2 | 3 | 4 |
| R13 | 4 | 2 | 4 | 4 | 4 | 2 | 3 | 3 | 3 | 4 |
| R14 | 4 | 3 | 3 | 2 | 4 | 2 | 4 | 2 | 3 | 2 |
| R15 | 3 | 2 | 4 | 4 | 3 | 4 | 5 | 2 | 5 | 5 |
| R16 | 5 | 2 | 5 | 1 | 4 | 1 | 5 | 3 | 5 | 2 |
| R17 | 4 | 4 | 4 | 2 | 5 | 2 | 4 | 2 | 5 | 2 |
| R18 | 4 | 1 | 5 | 1 | 4 | 2 | 4 | 2 | 4 | 2 |
| R19 | 5 | 5 | 5 | 5 | 5 | 5 | 5 | 5 | 5 | 5 |
| R20 | 5 | 1 | 5 | 1 | 5 | 1 | 5 | 1 | 5 | 1 |
| R21 | 3 | 2 | 5 | 3 | 4 | 3 | 5 | 2 | 4 | 2 |
| R22 | 3 | 2 | 4 | 3 | 4 | 2 | 3 | 2 | 3 | 3 |
| R23 | 4 | 4 | 3 | 5 | 5 | 5 | 3 | 5 | 5 | 4 |
| R24 | 4 | 2 | 4 | 1 | 4 | 2 | 4 | 1 | 5 | 2 |
| R25 | 4 | 2 | 4 | 2 | 4 | 2 | 4 | 4 | 4 | 2 |
| R26 | 5 | 2 | 5 | 2 | 5 | 1 | 5 | 1 | 5 | 2 |
| R27 | 3 | 2 | 4 | 3 | 4 | 3 | 4 | 2 | 3 | 2 |
| R28 | 3 | 2 | 5 | 2 | 5 | 2 | 4 | 2 | 4 | 2 |
| R29 | 5 | 1 | 5 | 1 | 5 | 1 | 5 | 1 | 5 | 1 |

**Kelompok Admin & Super Admin**

| Responden | Peran | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P8 | P9 | P10 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| M1 | Super Admin | 5 | 1 | 5 | 2 | 4 | 1 | 5 | 1 | 4 | 2 |
| M2 | Admin | 5 | 2 | 4 | 2 | 5 | 2 | 3 | 2 | 5 | 2 |
| M3 | Admin | 4 | 2 | 4 | 2 | 4 | 2 | 4 | 2 | 4 | 3 |
| M4 | Admin | 4 | 2 | 5 | 1 | 5 | 1 | 5 | 2 | 4 | 1 |
| M5 | Admin | 5 | 2 | 5 | 2 | 4 | 2 | 4 | 2 | 4 | 2 |
| M6 | Admin | 4 | 2 | 4 | 3 | 4 | 2 | 4 | 2 | 4 | 2 |
| M7 | Admin | 5 | 2 | 4 | 3 | 4 | 2 | 4 | 2 | 4 | 2 |
| M8 | Admin | 3 | 2 | 2 | 4 | 4 | 2 | 4 | 2 | 4 | 2 |
| M9 | Admin | 4 | 2 | 4 | 3 | 4 | 2 | 4 | 2 | 4 | 2 |
| M10 | Admin | 4 | 2 | 4 | 3 | 4 | 2 | 4 | 2 | 3 | 2 |
| M11 | Admin | 4 | 2 | 4 | 3 | 4 | 2 | 3 | 2 | 3 | 2 |

### 6.4 Rekapitulasi Jawaban per Pernyataan

Kolom 1–5 menunjukkan jumlah responden (dari total 40) yang memilih skor tersebut. "Rata-rata
kontribusi" adalah rata-rata skor butir setelah aturan SUS diterapkan (rentang 0–4, makin
tinggi makin baik untuk butir positif maupun negatif).

| Butir | Sifat | 1 | 2 | 3 | 4 | 5 | Rata-rata Jawaban | Rata-rata Kontribusi |
|---|---|---|---|---|---|---|---|---|
| P1 | Positif | 0 | 0 | 9 | 20 | 11 | 4,05 | 3,05 |
| P2 | Negatif | 5 | 29 | 3 | 2 | 1 | 2,12 | 2,88 |
| P3 | Positif | 0 | 1 | 4 | 22 | 13 | 4,17 | 3,17 |
| P4 | Negatif | 6 | 14 | 14 | 4 | 2 | 2,55 | 2,45 |
| P5 | Positif | 0 | 0 | 2 | 29 | 9 | 4,17 | 3,17 |
| P6 | Negatif | 7 | 27 | 3 | 1 | 2 | 2,10 | 2,90 |
| P7 | Positif | 0 | 0 | 6 | 25 | 9 | 4,08 | 3,08 |
| P8 | Negatif | 5 | 29 | 3 | 1 | 2 | 2,15 | 2,85 |
| P9 | Positif | 0 | 0 | 9 | 19 | 12 | 4,08 | 3,08 |
| P10 | Negatif | 3 | 22 | 6 | 6 | 3 | 2,60 | 2,40 |

Aspek yang paling dinilai baik oleh responden adalah kemudahan penggunaan (P3, rata-rata
kontribusi 3,17) dan keterpaduan fungsi (P5, rata-rata kontribusi 3,17). Aspek yang masih
perlu ditingkatkan berkaitan dengan kurva pembelajaran awal, yaitu kebutuhan mempelajari
banyak hal terlebih dahulu (P10, rata-rata kontribusi 2,40) dan kebutuhan bantuan orang
teknis (P4, rata-rata kontribusi 2,45).

> **Bukti pengisian kuesioner (tempel *screenshot* di sini sebelum diserahkan).** Tempelkan
> tangkapan layar tab *Summary* Google Form sebagai Gambar 6.1 (ringkasan jumlah responden)
> dan Gambar 6.2 s.d. 6.11 (satu per pernyataan P1–P10, menunjukkan diagram lingkaran
> distribusi jawaban) untuk melengkapi bukti bahwa data pada subbab ini berasal dari
> pengisian kuesioner daring, bukan direkayasa.

### 6.5 Hasil SUS — Pengunjung Umum

Kelompok ini memperoleh **29 responden**.

| No | Skor SUS |
|---|---|
| R1 | 80,00 |
| R2 | 47,50 |
| R3 | 67,50 |
| R4 | 85,00 |
| R5 | 70,00 |
| R6 | 65,00 |
| R7 | 62,50 |
| R8 | 77,50 |
| R9 | 70,00 |
| R10 | 70,00 |
| R11 | 70,00 |
| R12 | 62,50 |
| R13 | 57,50 |
| R14 | 67,50 |
| R15 | 57,50 |
| R16 | 87,50 |
| R17 | 75,00 |
| R18 | 82,50 |
| R19 | 50,00 |
| R20 | 100,00 |
| R21 | 72,50 |
| R22 | 62,50 |
| R23 | 42,50 |
| R24 | 82,50 |
| R25 | 70,00 |
| R26 | 92,50 |
| R27 | 65,00 |
| R28 | 77,50 |
| R29 | 100,00 |
| **Rata-rata** | **71,38** |

### 6.6 Hasil SUS — Admin & Super Admin

Kelompok ini memperoleh **11 responden** (10 admin, 1 super admin).

| No | Peran | Skor SUS |
|---|---|---|
| M1 | Super Admin | 90,00 |
| M2 | Admin | 80,00 |
| M3 | Admin | 72,50 |
| M4 | Admin | 90,00 |
| M5 | Admin | 80,00 |
| M6 | Admin | 72,50 |
| M7 | Admin | 75,00 |
| M8 | Admin | 62,50 |
| M9 | Admin | 72,50 |
| M10 | Admin | 70,00 |
| M11 | Admin | 67,50 |
| **Rata-rata** | | **75,68** |

### 6.7 Rekapitulasi dan Kesimpulan Usability

| Kelompok Responden | Jumlah | Skor SUS Rata-rata |
|---|---|---|
| Pengunjung Umum | 29 | 71,38 |
| Admin & Super Admin | 11 | 75,68 |
| **Gabungan** | **40** | **72,56** |

Skor SUS gabungan sebesar **72,56** berada di atas ambang rata-rata industri sebesar
68 (Bangor, Kortum, & Miller, 2008) sekaligus memenuhi kebutuhan NFR 3.4.3.4 pada SKPL (skor SUS minimal 68), sehingga usability Website Karinakas tergolong
**Baik ("Good")** dan **dapat diterima ("Acceptable")**. Kelompok pengelola (Admin &
Super Admin) memberi penilaian sedikit lebih tinggi (75,68) dibanding pengunjung
umum (71,38) — wajar mengingat kelompok pengelola telah lebih terbiasa dengan alur
sistem melalui penggunaan sehari-hari, sedangkan pengunjung umum mencobanya untuk
pertama kali.

**Catatan analisis:**

- Satu responden (R19 pada kelompok Pengunjung Umum) menjawab **Sangat Setuju pada
  seluruh sepuluh pernyataan**, termasuk pernyataan negatif. Ini adalah pola jawaban
  klasik yang dikenal dalam literatur SUS sebagai indikasi responden tidak membaca
  arah tiap pernyataan (hanya menandai jawaban paling positif tanpa memperhatikan
  polaritas butir genap), sehingga skornya justru turun menjadi 50,00 — bukan 100.
  Sebaliknya, dua responden lain (R20, R29) menjawab dengan pola berselang-seling
  yang konsisten dengan arah tiap butir, menghasilkan skor sempurna 100,00. Hal ini dicatat
  sebagai keterbatasan interpretasi data.
- Beberapa saran terbuka dari responden relevan untuk Bab VI Saran laporan TA,
  antara lain permintaan agar konten selalu diperbarui secara berkala, satu laporan
  bug navigasi pada tampilan *mobile* ("tidak mengarah ke link tsb pada layar
  mobile"), dan permintaan perbaikan tampilan halaman Tentang Kami terkait gambar
  ikon "kepedulian".

---
