# 🧪 USE CASE & SKENARIO PENGUJIAN — Website Yayasan Karinakas

Dokumen pengujian **black-box** untuk Sistem Informasi Yayasan Karinakas.
Disusun agar bisa dipakai langsung sebagai lampiran pengujian skripsi/TA.

**Dibuat:** 8 Agustus 2026 · **Metode:** Black-box testing (equivalence partitioning + skenario positif & negatif)
**Dokumen terkait:** [CONTEXT.md](CONTEXT.md) (arsitektur & endpoint) · [HANDOFF.md](HANDOFF.md) (status fitur) · [DEPLOY.md](DEPLOY.md)

---

## 1. Persiapan Lingkungan Uji

```bash
# Terminal 1 — backend WAJIB menyala
cd tugas_akhir
php artisan serve            # http://127.0.0.1:8000

# Terminal 2 — frontend
cd frontend_karinakas
npm run dev                  # http://localhost:5173
```

Checklist sebelum menguji:

- [ ] Backend menyala (buka `http://127.0.0.1:8000/api/v1/kegiatan` → tampil JSON)
- [ ] `php artisan storage:link` sudah dijalankan (foto & bukti transfer bisa tampil)
- [ ] Database `karinakas` sudah dimigrasi & di-seed
- [ ] File `public/qris-karinakas.png` sudah ada (untuk pengujian donasi QRIS)
- [ ] Browser dalam mode normal, cache dibersihkan (Ctrl+F5) sebelum sesi uji

### Akun uji

| Peran | Email | Username | Password |
|---|---|---|---|
| Super Admin | `superadmin@karinakas.org` | `superadmin` | `password123` |
| Admin | `admin@karinakas.org` | `admin` | `password123` |
| Pengguna | `user1@test.com` … `user10@test.com` | `user1`…`user10` | `password123` |

### Cara mengisi hasil

Kolom **Status** diisi salah satu: ✅ **Berhasil** · ❌ **Gagal** · ⚠️ **Sebagian**.
Bila ❌/⚠️, tulis temuan di kolom **Catatan** (nomor error, pesan, atau perilaku yang muncul).

---

## 2. Daftar Use Case (Ringkas)

| Kode | Use Case | Aktor |
|---|---|---|
| UC-01 | Melihat informasi publik (beranda, tentang, galeri, kegiatan, berita, kontak) | Pengunjung |
| UC-02 | Mendaftar akun | Pengunjung |
| UC-03 | Login & logout | Semua pengguna terdaftar |
| UC-04 | Mengelola profil & melihat riwayat | Pengguna |
| UC-05 | Berdonasi (QRIS / transfer) & unggah bukti | Pengguna |
| UC-06 | Mendaftar sebagai relawan | Pengguna |
| UC-07 | Mengelola kegiatan, berita, galeri | Admin, Super Admin |
| UC-08 | Memverifikasi donasi & relawan | Admin, Super Admin |
| UC-09 | Melihat statistik dashboard | Admin, Super Admin |
| UC-10 | Mengunduh rekapan (donasi, relawan, laporan) | Super Admin |
| UC-11 | Mengelola pengguna & melihat audit log | Super Admin |
| UC-12 | Melihat riwayat notifikasi | Admin, Super Admin |

### Matriks hak akses (acuan pengujian UC-13 Keamanan)

| Fitur | Pengunjung | Pengguna | Admin | Super Admin |
|---|:--:|:--:|:--:|:--:|
| Lihat halaman publik | ✔ | ✔ | ✔ | ✔ |
| Donasi & daftar relawan | ✖ | ✔ | ✔ | ✔ |
| Panel admin | ✖ | ✖ | ✔ | ✔ |
| **Nominal donasi** | ✖ | (miliknya) | ✖ | ✔ |
| Edit data donasi | ✖ | ✖ | ✖ | ✔ |
| Export rekapan | ✖ | ✖ | ✖ | ✔ |
| Manajemen Pengguna | ✖ | ✖ | ✖ | ✔ |
| Audit Log | ✖ | ✖ | ✖ | ✔ |

---

## 3. UC-01 — Halaman Publik

| ID | Skenario | Langkah | Hasil yang diharapkan | Status | Catatan |
|---|---|---|---|:--:|---|
| TC-PUB-01 | Layar intro muncul | Buka `http://localhost:5173` pertama kali di sesi baru | Layar intro (scroll story + foto Karinakas) tampil, ada tombol "Mulai Menjelajah" | | |
| TC-PUB-02 | Intro hanya sekali per sesi | Setelah masuk beranda, pindah halaman lalu kembali ke `/` | Intro **tidak** muncul lagi | | |
| TC-PUB-03 | Beranda tampil lengkap | Buka `/` | Hero, statistik, kegiatan terbaru, galeri, CTA, footer tampil tanpa gambar rusak | | |
| TC-PUB-04 | Navigasi menu | Klik satu per satu: Beranda, Tentang Kami, Galeri, Kegiatan, Kontak, Berita | Semua halaman terbuka, breadcrumb sesuai | | |
| TC-PUB-05 | Tombol Donasi di navbar | Klik "Donasi" tanpa login | Diarahkan ke halaman Login | | |
| TC-PUB-06 | Halaman Tentang Kami | Buka `/tentang-kami` | Profil yayasan, visi-misi, nilai tampil | | |
| TC-PUB-07 | Data kontak benar | Buka `/kontak` | WhatsApp **+62 851-5621-7359**, IG `@yayasankarinakas`, YouTube `@karinakasofficial` tampil | | |
| TC-PUB-08 | Tautan sosial media aktif | Klik ikon IG & YouTube di footer | Membuka tab baru ke akun yang benar | | |
| TC-PUB-09 | Kanal WhatsApp di halaman Kontak | Buka `/kontak`, klik tombol "Chat +62 851-5621-7359" lalu salah satu tombol topik | WhatsApp terbuka di tab baru ke nomor yang benar; tombol topik membuat pesan awal otomatis terisi sesuai topik | | |
| TC-PUB-10 | Halaman tidak ditemukan | Buka `/halaman-tidak-ada` | Diarahkan ke beranda / tidak menampilkan layar putih | | |

---

## 4. UC-02 & UC-03 — Registrasi, Login, Logout

| ID | Skenario | Langkah | Hasil yang diharapkan | Status | Catatan |
|---|---|---|---|:--:|---|
| TC-AUT-01 | Registrasi 2 langkah | `/register` → isi data akun (langkah 1) → Lanjut → isi data pribadi (langkah 2) → Daftar | Akun dibuat, otomatis login, diarahkan ke beranda/profil | | |
| TC-AUT-02 | Validasi langkah 1 | Kosongkan email lalu Lanjut | Tidak bisa lanjut, muncul pesan wajib isi | | |
| TC-AUT-03 | Email sudah terdaftar | Daftar dengan `user1@test.com` | Muncul pesan email sudah digunakan, akun tidak dibuat | | |
| TC-AUT-04 | Konfirmasi sandi tidak cocok | Isi sandi & konfirmasi berbeda | Muncul pesan konfirmasi tidak cocok | | |
| TC-AUT-05 | Tombol kembali di langkah 2 | Di langkah 2 klik kembali | Kembali ke langkah 1, data yang sudah diisi tidak hilang | | |
| TC-AUT-06 | Login dengan email | `/login` → `user1@test.com` / `password123` | Berhasil masuk, nama tampil di navbar | | |
| TC-AUT-07 | Login dengan username | `/login` → `user1` / `password123` | Berhasil masuk (sistem mendeteksi username karena tanpa `@`) | | |
| TC-AUT-08 | Login sandi salah | `user1@test.com` / `salah123` | Gagal, muncul pesan kredensial tidak sesuai, tetap di halaman login | | |
| TC-AUT-09 | Login akun tidak ada | `tidakada@test.com` / `password123` | Gagal dengan pesan yang jelas (bukan layar error) | | |
| TC-AUT-10 | Sesi bertahan saat refresh | Setelah login, tekan F5 | Tetap login (token dipulihkan dari `localStorage` `kk_token`) | | |
| TC-AUT-11 | Redirect balik ke tujuan | Logout → buka `/donasi` → diarahkan ke login → login | Setelah login langsung diarahkan ke `/donasi`, bukan beranda | | |
| TC-AUT-12 | Logout | Klik menu akun → Keluar | Sesi berakhir, navbar kembali menampilkan tombol Masuk, `/profil` tidak bisa dibuka | | |
| TC-AUT-13 | Lupa password — kode terkirim | `/forgot-password` → isi email terdaftar → Kirim | Muncul langkah pengisian OTP. Kode 6 digit tercatat di `storage/logs/laravel.log` (karena `MAIL_MAILER=log`) | | |
| TC-AUT-14 | Lupa password — ganti sandi | Masukkan kode dari log → isi sandi baru ≥ 8 karakter → Simpan | Muncul konfirmasi berhasil; **sandi baru bisa dipakai login** dan sandi lama ditolak | | |
| TC-AUT-15 | Kode OTP salah | Masukkan kode asal 6 digit | Ditolak dengan pesan "Kode verifikasi salah", kembali ke langkah pengisian kode | | |
| TC-AUT-16 | Kode sekali pakai | Ulangi reset memakai kode yang sudah terpakai | Ditolak dengan pesan kode sudah kedaluwarsa | | |
| TC-AUT-17 | Kode kedaluwarsa | Tunggu >10 menit lalu pakai kodenya | Ditolak dengan pesan kode sudah kedaluwarsa | | |
| TC-AUT-18 | Sandi baru < 8 karakter | Isi sandi 6 karakter | Ditolak dengan pesan minimal 8 karakter | | |
| TC-AUT-19 | Lupa password email asing | Isi email yang tidak terdaftar | Ditolak dengan pesan email tidak terdaftar | | |
| TC-AUT-20 | Sesi lama dicabut | Login di perangkat A → reset sandi lewat perangkat B → gunakan lagi perangkat A | Perangkat A tidak lagi berwenang; token lama sudah dicabut | | |
| TC-AUT-21 | **Pembatasan laju login** | Salah memasukkan sandi 6 kali berturut-turut dalam satu menit | Percobaan ke-6 ditolak dengan `429 Too Many Requests` | | |

---

## 5. UC-01 — Kegiatan, Berita, Galeri (Publik)

### Kegiatan

| ID | Skenario | Langkah | Hasil yang diharapkan | Status | Catatan |
|---|---|---|---|:--:|---|
| TC-KEG-01 | Daftar kegiatan tampil | Buka `/kegiatan` | Kartu kegiatan tampil dari database (bukan data contoh) | | |
| TC-KEG-02 | Detail kegiatan | Klik salah satu kegiatan | Modal detail tampil: deskripsi, lokasi, tanggal, kuota relawan | | |
| TC-KEG-03 | Penanda kebutuhan | Amati kartu kegiatan | Kegiatan yang butuh relawan/donasi punya penanda yang sesuai | | |
| TC-KEG-04 | Tombol donasi dari kegiatan | Pada kegiatan yang membuka donasi, klik tombol donasi | Diarahkan ke `/donasi` dengan kegiatan tersebut sudah terpilih | | |
| TC-KEG-05 | Kuota relawan terbaca | Bandingkan kuota di modal dengan data admin | Angka terdaftar/kuota sama dengan panel admin | | |

### Berita

| ID | Skenario | Langkah | Hasil yang diharapkan | Status | Catatan |
|---|---|---|---|:--:|---|
| TC-BER-01 | Daftar berita | Buka `/berita` | Daftar berita berstatus published tampil | | |
| TC-BER-02 | Detail berita | Klik satu berita | Isi lengkap, penulis, tanggal, waktu baca tampil | | |
| TC-BER-03 | Berita terkait | Gulir ke bawah pada detail | Muncul berita terkait, bisa diklik | | |
| TC-BER-04 | Berita draft tidak bocor | Buat berita status `draft` di admin → cek halaman publik | Berita draft **tidak** tampil di publik | | |

### Galeri

| ID | Skenario | Langkah | Hasil yang diharapkan | Status | Catatan |
|---|---|---|---|:--:|---|
| TC-GAL-01 | Album tampil | Buka `/galeri` | Foto dikelompokkan sebagai **album per kegiatan**, bukan foto lepas | | |
| TC-GAL-02 | Isi album | Klik satu album | Seluruh foto album tersebut tampil | | |
| TC-GAL-03 | Semua foto termuat | Album dengan >100 foto | Semua foto tampil (frontend mengambil seluruh halaman, bukan 100 pertama) | | |
| TC-GAL-04 | Lightbox | Klik satu foto | Foto tampil besar; navigasi panah kiri/kanan berfungsi | | |
| TC-GAL-05 | Keyboard di lightbox | Tekan ←, →, Esc | Pindah foto & menutup lightbox sesuai tombol | | |
| TC-GAL-06 | Nama foto tampil | Amati foto yang punya `nama_foto` | Nama foto tertulis di bawah/atas foto | | |

---

## 6. UC-05 — Donasi

### Alur utama

| ID | Skenario | Langkah | Hasil yang diharapkan | Status | Catatan |
|---|---|---|---|:--:|---|
| TC-DON-01 | Wajib login | Logout → buka `/donasi` | Diarahkan ke login | | |
| TC-DON-02 | Hanya kegiatan berdonasi | Buka dropdown kegiatan | Hanya kegiatan `aktif` **dan** `butuh_donasi` yang muncul | | |
| TC-DON-03 | Tidak ada donasi umum | Amati form | Tidak ada opsi donasi tanpa kegiatan | | |
| TC-DON-04 | Nominal preset | Klik tombol Rp 100.000 | Nominal terpilih, ringkasan kanan ikut berubah | | |
| TC-DON-05 | Nominal bebas | Ketik 75000 di kolom nominal lain | Nominal terpakai, preset otomatis batal | | |
| TC-DON-06 | Validasi belum lengkap | Klik Donasikan tanpa memilih kegiatan | Tombol nonaktif / muncul pesan lengkapi data | | |
| TC-DON-07 | Data donatur otomatis | Amati bagian Data Donatur | Nama & email terisi dari akun, tidak bisa diubah | | |
| TC-DON-08 | Kirim donasi | Lengkapi semua → Donasikan | Donasi tersimpan, tampil layar instruksi pembayaran | | |
| TC-DON-09 | Donasi anonim | Centang "Tampilkan sebagai anonim" lalu kirim | Di panel admin donatur tertulis **Anonim** | | |

### Metode QRIS

| ID | Skenario | Langkah | Hasil yang diharapkan | Status | Catatan |
|---|---|---|---|:--:|---|
| TC-DON-10 | QRIS metode bawaan | Buka `/donasi`, lihat Langkah 3 | QRIS terpilih sebagai metode bawaan | | |
| TC-DON-11 | QR tampil | Kirim donasi dengan metode QRIS | Kode QR tampil beserta nama merchant **YAYASAN KARINAKAS** & NMID `ID2026479922646` | | |
| TC-DON-12 | QR bisa dipindai | Scan QR dengan aplikasi berlogo QRIS (GoPay/OVO/DANA/m-banking) | Aplikasi mengenali merchant Yayasan Karinakas | | |
| TC-DON-13 | Simpan gambar QRIS | Klik "Simpan gambar QRIS" | Gambar terunduh sebagai `qris-karinakas.png` | | |
| TC-DON-14 | Salin nominal | Klik "Salin nominal" | Nominal tersalin ke papan klip, tombol berubah "Nominal tersalin" | | |
| TC-DON-15 | QRIS statis disebutkan | Baca langkah cara bayar | Tertulis jelas bahwa nominal diketik sendiri (tidak tertanam di QR) | | |
| TC-DON-16 | Gambar QRIS hilang | Ubah sementara nama `public/qris-karinakas.png` → ulangi donasi QRIS | Muncul pesan "Gambar QRIS belum tersedia" + arahan transfer bank, **bukan** ikon gambar rusak | | |

### Metode transfer & bukti

| ID | Skenario | Langkah | Hasil yang diharapkan | Status | Catatan |
|---|---|---|---|:--:|---|
| TC-DON-17 | Pilih transfer bank | Pilih metode Transfer Bank → Donasikan | Tampil rekening **BNI 725318271 a.n. Aaron Risang Panji Bharata** | | |
| TC-DON-18 | Salin nomor rekening | Klik Salin | Nomor tersalin, tombol berubah "Tersalin" | | |
| TC-DON-19 | Upload bukti | Pilih gambar JPG/PNG → Kirim Bukti | Muncul konfirmasi berhasil, menunggu verifikasi admin | | |
| TC-DON-20 | Bukti file terlalu besar | Unggah gambar > 4MB | Ditolak dengan pesan yang jelas | | |
| TC-DON-21 | Bukti bukan gambar | Coba unggah PDF/dokumen | Ditolak (input hanya menerima gambar) | | |
| TC-DON-22 | Bukti terbaca admin | Login admin → Donasi → Detail donasi tadi | Gambar bukti tampil dan bisa dibuka ukuran penuh | | |
| TC-DON-23 | Riwayat donasi | Buka `/profil` → tab Riwayat Donasi | Donasi tadi tercatat dengan status Pending | | |
| TC-DON-24 | Donasi lagi | Klik "Donasi Lagi" di layar instruksi | Form kembali kosong & siap diisi ulang | | |

---

## 7. UC-06 — Pendaftaran Relawan

| ID | Skenario | Langkah | Hasil yang diharapkan | Status | Catatan |
|---|---|---|---|:--:|---|
| TC-REL-01 | Wajib login | Logout → buka `/daftar-relawan` | Diarahkan ke login | | |
| TC-REL-02 | Data pribadi otomatis | Buka form setelah login | Nama, email, kontak terisi dari profil | | |
| TC-REL-03 | Opsi ikut kegiatan | Pilih kegiatan yang punya opsi khusus | Dropdown Jenis Relawan & Bidang Minat berisi opsi yang ditentukan admin untuk kegiatan itu | | |
| TC-REL-04 | Ganti kegiatan | Pilih kegiatan lain dengan opsi berbeda | Isi dropdown ikut berubah | | |
| TC-REL-05 | Validasi wajib isi | Kirim tanpa memilih jenis relawan | Ditolak dengan pesan wajib isi | | |
| TC-REL-06 | Kirim pendaftaran | Lengkapi semua → Kirim | Tersimpan, muncul konfirmasi | | |
| TC-REL-07 | Kuota penuh | Daftar pada kegiatan yang kuotanya sudah penuh | Muncul pemberitahuan kuota penuh, tidak bisa mendaftar | | |
| TC-REL-08 | Riwayat relawan | `/profil` → tab Kegiatan Relawan | Pendaftaran tampil dengan status Pending | | |
| TC-REL-09 | Verifikasi admin | Login admin → Relawan → ubah status jadi **Diterima** | Status berubah; `jumlah_relawan_terdaftar` kegiatan bertambah 1 | | |
| TC-REL-10 | Email relawan diterima | Setelah TC-REL-09, buka `tugas_akhir/storage/logs/laravel.log` | Isi email "Relawan Diterima" tercatat lengkap. **Belum masuk inbox** karena `MAIL_MAILER=log` (lihat §12) | | |
| TC-REL-11 | Notifikasi tercatat | Panel admin → Notifikasi | Muncul catatan notifikasi email & WhatsApp untuk relawan tadi | | |
| TC-REL-12 | Status ditolak | Ubah status pendaftar lain jadi Ditolak | Status berubah, jumlah relawan terdaftar **tidak** bertambah | | |

---

## 8. UC-04 — Profil Pengguna

| ID | Skenario | Langkah | Hasil yang diharapkan | Status | Catatan |
|---|---|---|---|:--:|---|
| TC-PRF-01 | Buka profil | Login → `/profil` | 4 tab tampil: Info Pribadi, Riwayat Donasi, Kegiatan Relawan, Notifikasi | | |
| TC-PRF-02 | Ubah data pribadi | Ubah alamat/telepon → Simpan | Muncul konfirmasi tersimpan | | |
| TC-PRF-03 | Perubahan bertahan | Refresh halaman | Data baru tetap tampil (tersimpan di server) | | |
| TC-PRF-04 | Riwayat donasi milik sendiri | Tab Riwayat Donasi | Hanya donasi akun tersebut yang tampil | | |
| TC-PRF-05 | Riwayat relawan | Tab Kegiatan Relawan | Hanya pendaftaran akun tersebut yang tampil | | |
| TC-PRF-06 | Notifikasi pribadi | Tab Notifikasi | Notifikasi milik akun tersebut tampil dari API | | |
| TC-PRF-07 | Isolasi antar akun | Logout → login `user2` → buka Riwayat Donasi | **Tidak** melihat data milik `user1` | | |

---

## 9. UC-07 & UC-08 — Panel Admin

### Dashboard

| ID | Skenario | Langkah | Hasil yang diharapkan | Status | Catatan |
|---|---|---|---|:--:|---|
| TC-DSH-01 | Akses panel | Login admin → `/admin` | Dashboard tampil dengan sidebar | | |
| TC-DSH-02 | Statistik nyata | Bandingkan angka kartu dengan isi database | Angka sesuai (berasal dari `/admin/dashboard`) | | |
| TC-DSH-03 | Breakdown relawan | Amati bagian relawan | Jumlah per jenis relawan tampil | | |
| TC-DSH-04 | Tabel terkini | Amati tabel donasi & relawan terbaru | Berisi data terbaru, bukan data contoh | | |
| TC-DSH-05 | Nominal disembunyikan | Login **admin biasa** → lihat kartu total donasi | Nominal tertutup (`Rp •••••`) | | |
| TC-DSH-06 | Nominal terlihat | Login **super admin** → kartu yang sama | Nominal asli tampil | | |

### Kegiatan (admin)

| ID | Skenario | Langkah | Hasil yang diharapkan | Status | Catatan |
|---|---|---|---|:--:|---|
| TC-AKG-01 | Tambah kegiatan | Tambah → isi semua field → Simpan | Kegiatan baru muncul di daftar admin & halaman publik | | |
| TC-AKG-02 | Ubah kegiatan | Edit judul kegiatan → Simpan | Perubahan tampil di publik setelah refresh | | |
| TC-AKG-03 | Opsi relawan | Isi Jenis Relawan & Bidang Minat lewat editor tag → Simpan | Opsi tersimpan dan muncul di form pendaftaran relawan | | |
| TC-AKG-04 | Ubah status | Ubah status jadi `selesai` | Status berubah, kegiatan tidak lagi tampil sebagai aktif | | |
| TC-AKG-05 | Hapus kegiatan | Hapus → konfirmasi | Muncul status "Menghapus...", data hilang dari daftar | | |
| TC-AKG-06 | Batal hapus | Klik hapus → Batal | Data tidak terhapus | | |

### Galeri (admin)

| ID | Skenario | Langkah | Hasil yang diharapkan | Status | Catatan |
|---|---|---|---|:--:|---|
| TC-AGL-01 | Unggah 1 foto | Unggah satu foto dengan nama foto | Foto tampil di album yang sesuai di halaman publik | | |
| TC-AGL-02 | Bulk upload | Pilih 10 foto sekaligus + isi nama tiap foto | Semua foto tersimpan dengan namanya masing-masing | | |
| TC-AGL-03 | Auto-batch >20 foto | Unggah 45 foto sekaligus | Semua 45 foto tersimpan (dikirim otomatis 20 per permintaan) | | |
| TC-AGL-04 | Indikator progres | Amati saat bulk upload berjalan | Progres tampil dan bertambah | | |
| TC-AGL-05 | Ubah nama foto | Edit `nama_foto` salah satu foto | Nama baru tampil di publik | | |
| TC-AGL-06 | Hapus foto | Hapus satu foto | Foto hilang dari admin & publik | | |
| TC-AGL-07 | Foto besar ditolak | Unggah gambar melebihi batas | Ditolak dengan pesan jelas, bukan gagal diam-diam | | |

### Berita (admin)

| ID | Skenario | Langkah | Hasil yang diharapkan | Status | Catatan |
|---|---|---|---|:--:|---|
| TC-ABR-01 | Tambah berita | Tambah → isi judul, konten, kategori → Simpan | Berita tersimpan | | |
| TC-ABR-02 | Publikasi | Ubah status jadi `published` | Berita tampil di halaman publik | | |
| TC-ABR-03 | Ubah berita | Edit isi → Simpan | Perubahan tampil di detail publik | | |
| TC-ABR-04 | Hapus berita | Hapus → konfirmasi | Berita hilang dari daftar & publik | | |

### Donasi (admin)

| ID | Skenario | Langkah | Hasil yang diharapkan | Status | Catatan |
|---|---|---|---|:--:|---|
| TC-ADN-01 | Daftar donasi | Buka menu Donasi | Seluruh donasi tampil dari API | | |
| TC-ADN-02 | Masking nominal | Login **admin biasa** | Kolom nominal tertutup `Rp •••••` | | |
| TC-ADN-03 | Verifikasi donasi | Ubah status Pending → Berhasil | Status tersimpan, tercatat di Audit Log | | |
| TC-ADN-04 | Lihat bukti | Klik Detail pada donasi yang ada buktinya | Gambar bukti tampil, bisa dibuka penuh | | |
| TC-ADN-05 | Edit donasi (super) | Login super admin → Edit donasi | Bisa mengubah nominal, metode, biaya, kode transaksi | | |
| TC-ADN-06 | Edit ditolak (admin) | Login admin biasa | Tombol edit tidak tersedia | | |
| TC-ADN-07 | Cari & filter | Ketik nama donatur & pilih status | Tabel tersaring sesuai, jumlah data ikut berubah | | |
| TC-ADN-08 | Hapus donasi | Hapus satu donasi → konfirmasi | Terhapus dari daftar | | |
| TC-ADN-09 | Metode QRIS tercatat | Cek donasi yang dibuat lewat QRIS | Kolom Metode tertulis **QRIS** | | |

### Relawan (admin)

| ID | Skenario | Langkah | Hasil yang diharapkan | Status | Catatan |
|---|---|---|---|:--:|---|
| TC-ARL-01 | Daftar pendaftar | Buka menu Relawan | Seluruh pendaftar tampil | | |
| TC-ARL-02 | Detail relawan | Klik ikon detail | Data lengkap tampil (alamat, KTP, motivasi, dll.) | | |
| TC-ARL-03 | Cari & filter | Cari nama, filter jenis & status | Tabel tersaring sesuai | | |
| TC-ARL-04 | Terima dari modal | Buka detail → "Terima Relawan" | Status berubah Diterima, modal tertutup | | |
| TC-ARL-05 | Hapus pendaftar | Hapus → konfirmasi | Data terhapus | | |
| TC-ARL-06 | Muat ulang | Klik "Muat Ulang" | Data diambil ulang dari server | | |
| TC-ARL-07 | Audit tercatat | Setelah ubah status/hapus → buka Audit Log | Aksi tercatat dengan nama admin pelaku | | |

---

## 10. UC-10 — Export Rekapan (Super Admin)

| ID | Skenario | Langkah | Hasil yang diharapkan | Status | Catatan |
|---|---|---|---|:--:|---|
| TC-EXP-01 | Tombol khusus super admin | Login **admin biasa** → menu Donasi & Relawan | Tombol "Export Rekap" **tidak** tampil | | |
| TC-EXP-02 | Export donasi | Login super admin → Donasi → Export Rekap | Berkas `Rekapan-Donasi-YYYY-MM-DD.xls` terunduh | | |
| TC-EXP-03 | Berkas terbuka | Buka berkas di Excel | Tekan "Yes" pada peringatan format → tabel tampil rapi | | |
| TC-EXP-04 | Kolom tidak terpotong | Amati kolom Donatur, Email, Kegiatan | Isi terbaca penuh; teks panjang membungkus ke bawah, tidak tertutup kolom sebelah | | |
| TC-EXP-05 | Header beku | Gulir tabel ke bawah | Baris judul kolom tetap terlihat | | |
| TC-EXP-06 | Angka bisa dijumlah | Blok kolom Nominal → lihat Sum di status bar Excel | Menghasilkan total (nominal tersimpan sebagai angka, bukan teks) | | |
| TC-EXP-07 | Ringkasan benar | Bandingkan blok RINGKASAN dengan tabel | Jumlah per status & total nominal cocok | | |
| TC-EXP-08 | Export ikut filter | Filter status = Pending → Export | Berkas hanya berisi baris Pending; jumlah baris sesuai angka di tombol | | |
| TC-EXP-09 | Export kosong | Cari kata kunci yang tidak ada → lihat tombol | Tombol Export nonaktif | | |
| TC-EXP-10 | Export relawan | Menu Relawan → Export Rekap | Berkas `Rekapan-Relawan-YYYY-MM-DD.xls` terunduh | | |
| TC-EXP-11 | No. KTP utuh | Buka kolom No. KTP di berkas relawan | 16 digit tampil utuh, **bukan** `3,37401E+15` | | |
| TC-EXP-12 | No. HP utuh | Buka kolom No. HP | Angka 0 di depan tidak hilang | | |
| TC-EXP-13 | Peringatan privasi | Baca bagian atas berkas relawan | Ada baris PERHATIAN tentang data pribadi | | |
| TC-EXP-14 | Laporan dashboard | Dashboard → Quick Action "Export Laporan" | Berkas `Laporan-Karinakas-YYYY-MM-DD.xls` terunduh & rapi | | |
| TC-EXP-15 | Nominal laporan per peran | Export laporan sebagai admin biasa | Baris "Total donasi berhasil" **tidak** ada | | |

---

## 11. UC-11 & UC-12 — Manajemen Pengguna, Audit, Notifikasi

| ID | Skenario | Langkah | Hasil yang diharapkan | Status | Catatan |
|---|---|---|---|:--:|---|
| TC-USR-01 | Menu khusus super admin | Login admin biasa → lihat sidebar | Menu Manajemen Pengguna & Audit Log **tidak** tampil | | |
| TC-USR-02 | Daftar pengguna | Login super admin → Manajemen Pengguna | Seluruh akun tampil dengan perannya | | |
| TC-USR-03 | Tambah akun | Tambah akun baru → Simpan | Akun dibuat & bisa dipakai login | | |
| TC-USR-04 | Ubah peran | Ubah `user2` jadi `admin` | Peran berubah; setelah login, `user2` bisa membuka `/admin` | | |
| TC-USR-05 | Reset password | Reset password `user3` | Password baru berlaku saat login | | |
| TC-USR-06 | Anti lock-out (ubah) | Coba ubah peran akun sendiri | Ditolak / tombol tidak tersedia | | |
| TC-USR-07 | Anti lock-out (hapus) | Coba hapus akun sendiri | Ditolak, akun tetap ada | | |
| TC-USR-08 | Hapus pengguna lain | Hapus akun uji → konfirmasi | Akun terhapus & tidak bisa login lagi | | |
| TC-AUD-01 | Audit log terisi | Lakukan beberapa aksi admin → buka Audit Log | Setiap aksi tercatat: pelaku, aksi, target, waktu | | |
| TC-AUD-02 | Audit hanya super admin | Login admin biasa → coba akses Audit | Tidak tersedia | | |
| TC-NOT-01 | Riwayat notifikasi | Buka menu Notifikasi | Daftar notifikasi dari server tampil (email & WhatsApp) | | |
| TC-NOT-02 | Notifikasi donasi | Verifikasi donasi jadi Berhasil → cek Notifikasi | Catatan notifikasi donasi bertambah | | |

---

## 12. Pengujian Keamanan & Hak Akses

| ID | Skenario | Langkah | Hasil yang diharapkan | Status | Catatan |
|---|---|---|---|:--:|---|
| TC-SEC-01 | Panel admin tanpa login | Logout → buka `/admin` langsung | Diarahkan ke login, panel tidak terbuka | | |
| TC-SEC-02 | Panel admin sebagai pengguna | Login `user1` → buka `/admin` | Ditolak / diarahkan keluar | | |
| TC-SEC-03 | API tanpa token | Buka `http://127.0.0.1:8000/api/v1/admin/donasi` di browser | Balasan `401 Unauthenticated`, bukan data | | |
| TC-SEC-04 | API dengan token pengguna | Panggil `/admin/users` memakai token `user1` | Ditolak (403) | | |
| TC-SEC-05 | Endpoint super-admin | Panggil `/admin/users` memakai token **admin biasa** | Ditolak (403) | | |
| TC-SEC-06 | Nominal tidak bocor di API | Panggil `/admin/donasi` dengan token admin biasa | Field `jumlah` tidak ada di balasan | | |
| TC-SEC-07 | Token dihapus saat logout | Logout → cek `localStorage` kunci `kk_token` | Token hilang | | |
| TC-SEC-08 | Donasi kegiatan tak valid | Kirim donasi ke kegiatan yang `butuh_donasi = false` lewat API | Ditolak dengan pesan validasi | | |
| TC-SEC-09 | Relawan opsi tak valid | Kirim jenis relawan di luar opsi kegiatan lewat API | Ditolak dengan pesan validasi | | |

---

## 13. Pengujian Ketahanan (Error Handling)

| ID | Skenario | Langkah | Hasil yang diharapkan | Status | Catatan |
|---|---|---|---|:--:|---|
| TC-ERR-01 | Backend mati | Matikan `php artisan serve` → buka `/kegiatan` | Muncul pesan gagal memuat yang ramah, bukan layar putih | | |
| TC-ERR-02 | Backend hidup lagi | Nyalakan backend → muat ulang | Data tampil kembali normal | | |
| TC-ERR-03 | Panel admin saat backend mati | Buka menu admin | Tiap tabel menampilkan pesan gangguan koneksi | | |
| TC-ERR-04 | Koneksi lambat | Aktifkan throttling "Slow 3G" di DevTools | Indikator memuat tampil, tidak ada tampilan kosong tanpa keterangan | | |
| TC-ERR-05 | Sesi kedaluwarsa | Hapus `kk_token` dari localStorage → aksi apa pun | Diarahkan ke login, bukan error mentah | | |
| TC-ERR-06 | Refresh URL dalam | Muat ulang di `/galeri` & `/berita/1` | Halaman tetap terbuka (SPA fallback), tidak 404 | | |

---

## 14. Pengujian Tampilan & Kompatibilitas

| ID | Skenario | Langkah | Hasil yang diharapkan | Status | Catatan |
|---|---|---|---|:--:|---|
| TC-UI-01 | Desktop | Uji di layar 1920×1080 | Tata letak rapi, tidak ada elemen tumpang tindih | | |
| TC-UI-02 | Tablet | Uji di lebar 768px | Menu & kartu menyesuaikan | | |
| TC-UI-03 | Ponsel | Uji di lebar 375px | Navigasi berubah jadi menu ponsel, tabel bisa digeser | | |
| TC-UI-04 | Keterbacaan lansia | Amati ukuran & kontras huruf | Huruf dasar 18.5px, kontras tinggi, warna merah `#C0392B` konsisten | | |
| TC-UI-05 | Lintas peramban | Uji di Chrome, Edge, Firefox | Tampilan & fungsi konsisten | | |
| TC-UI-06 | Catatan info rapi | Buka layar instruksi donasi & form relawan | Kalimat pada kotak catatan biru mengalir normal, tidak terpecah berkolom | | |

---

## 15. Fitur yang BELUM Bisa Diuji Penuh

Bagian ini penting ditulis apa adanya di laporan agar penguji tidak menganggapnya cacat.

| Fitur | Kondisi saat ini | Cara menguji sejauh yang bisa |
|---|---|---|
| **Email nyata** | `MAIL_MAILER=log` — email ditulis ke `storage/logs/laravel.log`, belum masuk inbox | Verifikasi isi email di berkas log (TC-REL-10). Untuk uji nyata, isi SMTP (Mailtrap) di `.env` |
| **WhatsApp** | Baru **dicatat** di `notifikasi_logs`, belum dikirim | Pastikan catatan notifikasi muncul (TC-REL-11). Pengiriman nyata perlu gateway + API key |
| **Pembayaran otomatis** | QRIS bersifat **statis** — tidak ada konfirmasi otomatis | Uji alur manual: bayar → unggah bukti → admin verifikasi |
| **Lupa password** | ✅ **Sudah berfungsi nyata** (23 Agustus) — OTP 6 digit, berlaku 10 menit, sekali pakai | Uji penuh lewat TC-AUT-13 s.d. TC-AUT-20; ambil kode OTP dari `storage/logs/laravel.log` selama SMTP belum diisi |
| **Form Kontak** | ✅ **Tidak lagi menjadi keterbatasan** (23 Agustus) — formulirnya **dihapus**, pertanyaan pengunjung diarahkan ke WhatsApp yang sudah aktif | Uji kanal WhatsApp lewat TC-PUB-09 |
| **Template notifikasi admin** | Masih konfigurasi teks lokal, bukan data transaksional | Cukup uji tampilan formulirnya |

---

## 16. Rekapitulasi Hasil

| Kelompok Pengujian | Jumlah Kasus | Berhasil | Gagal | Sebagian |
|---|:--:|:--:|:--:|:--:|
| Halaman Publik (TC-PUB) | 10 | | | |
| Autentikasi (TC-AUT) | 21 | | | |
| Kegiatan / Berita / Galeri publik | 15 | | | |
| Donasi (TC-DON) | 24 | | | |
| Relawan (TC-REL) | 12 | | | |
| Profil (TC-PRF) | 7 | | | |
| Panel Admin (DSH 6 · AKG 6 · AGL 7 · ABR 4 · ADN 9 · ARL 7) | 39 | | | |
| Export Rekapan (TC-EXP) | 15 | | | |
| Pengguna / Audit / Notifikasi | 12 | | | |
| Keamanan (TC-SEC) | 9 | | | |
| Ketahanan (TC-ERR) | 6 | | | |
| Tampilan (TC-UI) | 6 | | | |
| **TOTAL** | **176** | | | |

**Kesimpulan pengujian:**

> _(Diisi setelah pengujian selesai — mis. "Dari 176 kasus uji, 171 berhasil (97,2%). 5 kasus berstatus sebagian karena bergantung pada layanan eksternal yang belum diaktifkan, sebagaimana dicatat pada §15.")_

**Penguji:** ______________________  **Tanggal:** ______________  **Tanda tangan:** ______________
