# Status PDHUPL, Asal Kode Butir Uji, dan Sinkronisasi dengan SKPL

**Website Karinakas** — catatan kerja untuk penyusun (Aaron Risang Panji Bharata, 220711818)
Disusun: 28 September 2026

> Berkas ini catatan kerja, bukan bagian naskah PDHUPL. Isinya empat hal:
> (1) posisi pengerjaan PDHUPL saat ini, (2) asal kode butir uji seperti SR, AD, UT dan kaitannya dengan SKPL,
> (3) hasil pencocokan PDHUPL dengan SKPL (`Software Requirements Specification Aaron (2).pdf`) beserta
> temuan pada SKPL itu sendiri, (4) status pembaruan backend `AdminController.php`.

---

## 1. Posisi pengerjaan PDHUPL

Berkas naskah: `docs/PDHUPL.md`. Total **88 butir uji** kotak hitam.

| Bagian | Status | Keterangan |
|---|---|---|
| Bab 1 Pendahuluan | Selesai | |
| Bab 2 Lingkungan Pengujian | Selesai | |
| Bab 3 Identifikasi dan Rencana | Selesai | Tabel 3.1 memuat 7 kolom, sama dengan PDHUPL contoh |
| Bab 4 Deskripsi Pengujian | Selesai | Satu subbab per butir uji |
| Bab 5 Hasil Pengujian | Terisi, belum final | Diisi lewat **penelusuran kode statis**, bukan eksekusi langsung di karinakas.com |
| Bab 6 Hasil SUS | Skor selesai, lampiran belum | 40 responden, skor gabungan **72,56** (Baik/*Acceptable*) |

**Ringkasan hasil Bab 5:** 87 butir Handal (sebagian dengan catatan, lihat tabel), 1 butir
Tidak berlaku (AD-34). **UT-03 sempat Tidak Handal, sudah diperbaiki 30 September 2026** (lihat tabel).

| Butir | Kesimpulan | Alasan |
|---|---|---|
| UT-03 | Handal (sejak 30 Sept 2026) | Sebelumnya validasi 16 digit KTP tidak ditegakkan (`DaftarRelawan.jsx` hanya `maxLength={16}`; `RelawanController` hanya `nullable\|string\|max:20`). Diperbaiki: klien memakai `required`+`minLength`/`maxLength={16}`+`pattern`, layanan memakai `required\|digits:16`. |
| SR-01 | Handal dengan catatan | Antarmuka menampilkan satu pesan per waktu; API menampilkan pesan per field sekaligus. |
| SR-12, RP-04, AD-37 | Handal dengan catatan | Pesan validasi masih berbahasa Inggris bawaan Laravel. |
| AD-34 | Tidak berlaku | Endpoint `/admin/rekapan/kegiatan` tidak dipakai klien. |

**Yang masih perlu Anda kerjakan**

1. Jalankan ulang butir uji secara nyata di karinakas.com, terutama tampilan visual, unggah berkas, dan pengiriman surel.
2. Ekspor data mentah kuesioner SUS (Google Form → Responses → Download .csv) agar tabel P1–P10 per responden bisa dibuat.
3. Tempel *screenshot* kuesioner (Gambar 6.1 sampai 6.12).
4. Putuskan nasib UT-03: tambah validasi 16 digit di `RelawanController`, atau catat sebagai keterbatasan di Bab V.
5. Ambil halaman sampul, Daftar Revisi, dan Daftar Isi dari template Word resmi.
6. Hapus dua kotak catatan di dalam naskah sebelum ke Word: "Catatan metode" di awal Bab 5 dan "Bukti pengisian kuesioner" di Bab 6.1.

### Perbaikan yang dilakukan pada sesi ini

Saat mencocokkan PDHUPL dengan kode dan SKPL, ditemukan tiga kekeliruan pada PDHUPL, semuanya sudah diperbaiki di `docs/PDHUPL.md`:

| Butir | Sebelumnya | Sekarang | Dasar |
|---|---|---|---|
| AD-33 (rekap relawan) | Prosedur "Login sebagai admin" | "Login sebagai super admin"; hasil mencatat tombol ekspor tidak tampil bagi admin | `SectionRelawan.jsx` baris 159: `{isSuper && (` membungkus tombol Export Rekap. Sesuai FR 513 dan UC-21. |
| AD-35 (rekap donasi) | Hasil menyebut halaman Donasi "khusus dapat dibuka super admin" | Admin tetap bisa membuka halaman Donasi (tanpa nominal), tombol ekspor hanya untuk super admin | `SectionDonasi.jsx` baris 176: `{isSuper && (` |
| AD-39 dan UT-11 (kolom SKPL Tabel 3.1) | AD-39 → FR 514; UT-11 → FR 302 | AD-39 → FR 515; UT-11 → FR 303 | FR 515 mencegah super admin mengubah peran akun sendiri; FR 303 menolak donasi tanpa kegiatan yang sah |

---

## 2. Asal kode butir uji (SR, RP, PU, UT, AD, AL, NL)

### 2.1 Dari mana kode itu berasal

Kode butir uji berasal dari rencana uji **Anda sendiri**, `TC_Blackbox_Testing_Karinakas.pdf` (67 kasus asli).
Berkas itu tercantum di Referensi PDHUPL nomor 5 dan tidak ada di folder proyek saat ini. Kode-kode tersebut dipertahankan
di `docs/PDHUPL.md` supaya kaitannya dengan rencana uji asli tidak putus.

**Batasan yang perlu diketahui:** singkatan kode tidak didefinisikan di dokumen mana pun di proyek. Kolom "Arti yang
disimpulkan" di bawah adalah **kesimpulan dari isi butirnya**, bukan definisi resmi. Bila Anda masih ingat arti yang Anda
maksud saat menyusun berkas asli, pakai itu.

| Awalan | Arti yang disimpulkan | Cakupan | Jumlah butir | Asal |
|---|---|---|---|---|
| **SR** | Autentikasi dan akun (registrasi, login, hak akses, logout, profil, ubah sandi) | SR-01 s.d. SR-13 | 13 | Berkas asli Anda; SR-12 dan SR-13 ditambahkan kemudian |
| **RP** | *Reset Password* (pemulihan kata sandi) | RP-01 s.d. RP-04 | 4 | Ditambahkan saat penyusunan PDHUPL (26 September), karena fitur reset via tautan belum tercakup |
| **PU** | *Public* (halaman publik) | PU-01 s.d. PU-10 | 10 | Berkas asli Anda |
| **UT** | Pengguna Terdaftar (relawan, donasi, riwayat) | UT-01 s.d. UT-12 | 12 | Berkas asli Anda; UT-11 dan UT-12 ditambahkan kemudian |
| **AD** | *Admin* (dasbor, kelola konten, verifikasi, manajemen pengguna, rekapan) | AD-01 s.d. AD-39 | 46 | Berkas asli Anda; AD-37, AD-38, AD-39 dan semua butir berakhiran N ditambahkan kemudian |
| **AL** | *Audit Log* (jejak audit) | AL-01, AL-02 | 2 | Ditambahkan 26 September |
| **NL** | Notifikasi *Log* (riwayat notifikasi) | NL-01 | 1 | Ditambahkan 26 September |

Jumlah: 13 + 4 + 10 + 12 + 46 + 2 + 1 = **88**.

**Kenapa nomornya tidak berurutan.** Butir tambahan diberi nomor lanjutan, bukan disisipkan, supaya nomor lama tidak
bergeser. Itu sebabnya SR-12 dan SR-13 berada di antara SR-02 dan SR-03 pada Tabel 3.1, dan AD-37 sampai AD-39 muncul
setelah AD-36.

**Akhiran N** (AD-14N, AD-15N, AD-28N, AD-29N, AD-30N, AD-31N, AD-32N) berarti butir **negatif**: menguji bahwa admin biasa
**ditolak** pada fungsi yang khusus Super Admin. Butir ini hanya dibuat untuk fungsi yang benar-benar dibatasi
`wajibSuperAdmin()` atau `isSuperAdmin()` di kode, bukan untuk validasi masukan biasa.

### 2.2 Tiga sistem kode yang berbeda di proyek ini

| Sistem kode | Contoh | Milik dokumen | Fungsi |
|---|---|---|---|
| Kode butir uji PDHUPL | SR-01, AD-14N | `docs/PDHUPL.md` | Mengidentifikasi satu butir uji kotak hitam |
| Kode kebutuhan SKPL | FR Karinakas 201, NFR 3.4.4.5, UC-16 | SKPL Word/PDF (salinan `.md` di `SKPL.md`, `docs/skpl/`) | Mengidentifikasi satu kebutuhan; dipakai di kolom "Identifikasi SKPL" Tabel 3.1 |
| Kode kasus `TESTING.md` | TC-AUT-01, TC-DON-05 | `TESTING.md` | 181 kasus uji internal, **belum dijalankan**; bukan padanan 1:1 dengan PDHUPL |

Kode `TESTING.md` memakai awalan TC-AUT, TC-DON, TC-EXP, TC-REL, TC-ADN, TC-PUB, TC-SEC dan lainnya. Dokumen itu lebih
rinci (181 kasus dibanding 88 butir) dan tidak saling merujuk dengan PDHUPL.

### 2.3 Sinkronisasi butir PDHUPL dengan SKPL

Kolom "Identifikasi SKPL" pada Tabel 3.1 memakai kode **FR Karinakas** sesuai SKPL PDF yang benar. Rincian
pencocokan dan perubahan yang dibuat ada di bagian 3. Dua keputusan lama yang tetap terbuka:

1. **UT-05.** Tambahkan satu FR pembatalan pendaftaran relawan di SKPL, atau biarkan bertanda "belum tercantum".
2. **AD-34.** Kolom SKPL berisi "(titik akhir tidak dipakai klien)". Putuskan nasib endpoint `rekapanKegiatan` dan `exportRekapan`.

---

## 3. Pencocokan PDHUPL dengan SKPL

**Versi SKPL yang dipakai sebagai acuan: `Software Requirements Specification Aaron (2).pdf`.** Berkas ini lebih lengkap
daripada `Aaron.pdf` (versi tanpa FR 213, tanpa UC-24, dengan FR 202 dan FR 206 yang rusak). Semua rujukan pada kolom
"Identifikasi SKPL" Tabel 3.1 PDHUPL sudah diperiksa satu per satu terhadap dokumen ini.

### 3.1 Penyesuaian pada `docs/PDHUPL.md`

| Hal | Sebelumnya | Sekarang | Alasan |
|---|---|---|---|
| Awalan kode kebutuhan | FR SIKAS | **FR Karinakas** (semua) | SKPL memakai pola "FR Karinakas <nomor>" |
| SR-12 (email duplikat) | FR 201 | **FR 202** | FR 202 = memvalidasi keunikan identitas akun (ada pada SKPL ini) |
| SR-13 (sandi < 8 karakter) | FR 201 | FR 201; **NFR 3.4.4.1** | Batas 8 karakter dimuat NFR 3.4.4.1, bukan FR 202 |
| PU-04 (detail kegiatan) | FR 105 | **FR 106** | Pada SKPL ini FR 105 = daftar kegiatan yang membuka relawan, FR 106 = detail kegiatan |
| PU-07 (galeri) | FR 109, 110 | FR 109, 110, **111** | FR 111 = foto pada tampilan layar penuh (*lightbox*) |
| AD-09 (tambah berita) | FR 405 | FR 405, **406** | FR 406 = status terbit (draft/published) |
| AD-33, AD-35 (rekap) | FR 605 dan FR 604 | FR 605, **513** dan FR 604, **513** | FR 513 membatasi pengunduhan rekapitulasi hanya untuk Super Admin |
| UT-11, AD-39 | FR 302 dan FR 514 | FR **303** dan FR **515** | FR 303 = menolak donasi tanpa kegiatan sah; FR 515 = mencegah ubah peran akun sendiri |
| RP-01 sampai RP-04 | FR 213 | FR 213 (tetap) | FR 213, UC-24, antarmuka 12a/12b **ada** pada SKPL ini |
| Bab 6.4 (SUS) | Hanya membandingkan dengan ambang 68 | Menyebut NFR 3.4.3.4 | SKPL mensyaratkan SUS minimal 68; hasil 72,56 memenuhinya |

**Rujukan yang sudah cocok tanpa perubahan:** SR-01 sampai SR-11 (FR 201, 203, 205–209), PU-01 sampai PU-10 lainnya
(FR 101–104, 107–110), UT-01 sampai UT-12 lainnya (FR 210, 211, 301–312), AD-01 sampai AD-32 lainnya (FR 401–411,
501–517, 601–608), AL-01, AL-02, NL-01 (FR 506, 513, 516, 517). Batas berkas (4 MB bukti bayar, 5 MB foto, 20 berkas per
permintaan) dan aturan sandi 8 karakter selaras dengan K-09, K-10, FR 307, 407, 409, dan NFR 3.4.4.1.

### 3.2 Temuan pada SKPL itu sendiri

Setelah mencocokkan, PDHUPL sudah selaras dengan SKPL ini **kecuali satu hal yang penting** (butir A). Sisanya adalah
perbaikan kecil pada dokumen SKPL.

| # | Temuan | Dampak | Saran |
|---|---|---|---|
| **A** | **Pembatasan verifikasi donasi ke Super Admin (Opsi A) belum masuk ke teks kebutuhan.** FR **509** (status donasi) dan FR **511** (hapus donasi) menyebut "**pengelola**". FR 513 tidak memuat verifikasi maupun penghapusan donasi. **UC-16** menyebut aktor "Admin, Super Admin" dan alur alternatif 2a "Bagi Admin, kolom nominal ditampilkan terkunci sehingga verifikasi dilakukan berdasarkan kesesuaian bukti". Yang sudah selaras hanya Tabel 2.1 (Super Admin "memverifikasi donasi"; Admin hanya "memverifikasi pendaftaran relawan"), FR 510, dan FR 512. Kode membatasi status dan hapus donasi ke Super Admin (`wajibSuperAdmin()`, 403 untuk admin). | Butir **AD-14N** dan **AD-15N** (admin harus ditolak) bertentangan dengan bunyi FR 509, FR 511, dan UC-16. Penguji dapat menilai perilaku kode "melanggar" SKPL | Ubah FR 509 dan FR 511 menjadi "super admin ... tidak boleh tersedia bagi admin biasa"; tambahkan verifikasi dan penghapusan donasi pada FR 513; ubah aktor UC-16 menjadi Super Admin dan hapus alur 2a |
| B | 3.1.4 butir 2 menulis **65** titik akhir. Hasil hitung dari `routes/api.php` adalah **66** (64 fungsional + 2 *webhook*). | Angka tidak sesuai kode | Ubah menjadi 66 |
| C | **NFR 3.4.4.8** dan K-16 menuntut *seluruh* tindakan pengelola yang mengubah data tercatat pada jejak audit (100%). Kode hanya mencatat verifikasi/hapus donasi dan relawan serta pengelolaan akun, **tidak** mencatat kegiatan, berita, dan galeri. FR 516 sendiri sudah dipersempit dengan benar. | Kebutuhan non-fungsional lebih luas daripada kebutuhan fungsional dan kode | Persempit NFR 3.4.4.8 agar sama dengan FR 516 (sudah dilakukan pada `.md`, tinggal disalin ke Word) |
| D | 3.1.4 butir 5 menyatakan aplikasi antarmuka dan layanan server "berjalan pada asal yang berbeda". Di produksi keduanya satu domain (`karinakas.com`); CORS hanya relevan saat pengembangan. | Klaim tidak sesuai kondisi produksi | Ganti dengan uraian "pada pengembangan berbeda asal; pada produksi satu domain" (sudah pada `.md`) |
| E | FR 213 (pemulihan kata sandi) tidak punya induk fungsi: F-06 hanya menyebut "pemulihan sesi", bukan pemulihan kata sandi, dan Subbab 1.2 tidak menyebutnya | Penelusuran F-xx → FR terputus | Tambahkan "pemulihan kata sandi melalui tautan sekali pakai" pada F-06 dan Subbab 1.2 |
| F | UC-16: prakondisi masih menyebut "pendaftaran relawan berstatus menunggu" (seharusnya donasi). UC-02 berjudul "Melihat Informasi Lembaga" (seharusnya Melihat Kegiatan). 3.1.5 butir 1 menulis "SIKAS". NFR 3.4.7.1 merujuk "ambang NFR 3.4.4.1" (seharusnya 3.4.1.1). | Kesalahan salin | Betulkan |
| G | Daftar Isi masih berupa templat (menampilkan "3.2.1 Mencatat Registrasi Pemustaka", "3.4.4 (Sebutkan yang lain...)", "A. Lampiran", nomor halaman 1–7). Nomor Dokumen dan Daftar Revisi kosong. | Tampak belum selesai | Perbarui bidang Daftar Isi, isi nomor dokumen dan revisi |
| H | Salah ketik: "tiken" (FR 213), "pendaftarn" (F-14, 1.3, FR 310), "fota" (K-09), "D-4" (seharusnya D-04), "tujuan tujuan" (FR 302), "Pribadi Pribadi" (3.2.35), tanda petik terbalik pada "`429`" di UC-24 | Kesalahan ketik | Betulkan |

**Berkas `.md` proyek (`docs/skpl/`, `SKPL.md`) dan DPPL** masih memakai awalan "FR SIKAS". Isi `.md` justru lebih maju
daripada Word ini pada butir A, B, C, dan D. Setelah Word diperbarui, awalan pada `.md` dan DPPL perlu disamakan
menjadi "FR Karinakas" (saya kerjakan bila Anda minta).

---

## 4. Pembaruan backend `AdminController.php`

### 4.1 Apa yang diubah

`AdminController.php` ada di repositori **backend** (`tugas_akhir`, GitHub `OhMyAaron/karinakas_backend`).

Laravel punya `Gate::before` di `AppServiceProvider` yang meloloskan **semua** `$this->authorize()` untuk admin **dan**
super admin. Akibatnya dua fungsi ini tidak pernah benar-benar membatasi admin biasa:

| Fungsi | Dampak sebelum perbaikan |
|---|---|
| `users()` | Admin biasa dapat membaca **seluruh daftar akun pengguna** |
| `deleteUser()` | Admin biasa dapat **menghapus akun**. Karena `donasi.user_id` memakai `ON DELETE CASCADE`, donasi milik akun itu ikut terhapus |

Perbaikannya: kedua fungsi memakai pemeriksaan manual `isSuperAdmin()` dan membalas 403 untuk admin, sama dengan
`storeUser`, `updateUser`, dan `resetUserPassword`.

### 4.2 Hasil pemeriksaan (28 September 2026)

| Pemeriksaan | Hasil |
|---|---|
| Commit ada | Ya: `9582191` "perubahan admin controller", di atas `d2e0528` |
| Sudah di-*push* | Ya menurut penanda lokal: `main...origin/main` tanpa selisih. Saya **tidak dapat memastikan langsung ke GitHub** karena `git fetch` gagal (kesalahan sertifikat SSL pada komputer ini) |
| Sintaks PHP | Lolos (`php -l`: tidak ada galat) |
| Isi kode | Sesuai: pemeriksaan `isSuperAdmin()` ada pada `users()` (baris 264) dan `deleteUser()` (baris 443), beserta pesan 403 yang dipakai PDHUPL AD-29N dan AD-31N |
| Berkas lain berubah | Tidak. Status kerja bersih |
| **Sudah aktif di karinakas.com** | **Belum terverifikasi.** Saya tidak dapat masuk ke cPanel maupun menguji situs live tanpa akun Anda |

### 4.3 Cara memastikan di situs live (2 menit)

1. Di cPanel (Terminal atau File Manager), pastikan berkas di peladen sudah baru:
   ```bash
   cd <folder backend>
   git log --oneline -1                      # harus 9582191
   grep -n "Hanya Super Admin yang dapat melihat daftar" app/Http/Controllers/AdminController.php
   ```
   Baris kedua harus menghasilkan satu baris. Bila kosong, `git pull` belum berjalan di folder yang benar.
2. Bersihkan *cache*: `php artisan optimize:clear`. Pada hosting bersama, OPcache kadang menahan kode lama beberapa menit.
3. Uji dari luar dengan **akun admin biasa** Anda (bukan super admin):
   ```bash
   # masuk sebagai admin, salin token dari respons
   curl -X POST https://karinakas.com/api/index.php/api/v1/login -H "Content-Type: application/json" \
        -d '{"email":"<email admin>","password":"<sandi admin>"}'
   # panggil daftar pengguna dengan token itu
   curl https://karinakas.com/api/index.php/api/v1/admin/users -H "Authorization: Bearer <token>" -H "Accept: application/json"
   ```
   Hasil yang benar: **HTTP 403** dengan pesan "Hanya Super Admin yang dapat melihat daftar akun pengguna."
   Hasil 200 berarti kode lama masih berjalan.
4. Ulangi dengan akun **super admin**: hasilnya harus 200 dan daftar tampil.
5. **Jangan** uji `DELETE` pada akun sungguhan di situs live. Langkah 3 dan 4 sudah cukup untuk `users()`, dan
   `deleteUser()` memakai pola penjagaan yang sama.

Setelah langkah 3 dan 4 lolos, AD-29N dan AD-31N dapat dianggap terverifikasi di situs live dan HANDOFF.md dapat diperbarui.

---

## 5. Ringkasan tindakan

| Prioritas | Tindakan | Siapa |
|---|---|---|
| 1 | Perbaiki SKPL butir A: FR 509, 511, 513, dan UC-16 agar verifikasi/hapus donasi khusus Super Admin (bagian 3.2) | Anda / Claude website |
| 2 | Verifikasi backend di karinakas.com dengan langkah bagian 4.3 (admin harus 403, super admin 200) | Anda |
| 3 | Perbaiki SKPL butir B sampai H (65 → 66, NFR 3.4.4.8, CORS, F-06, salah ketik, Daftar Isi) | Anda / Claude website |
| 4 | Sinkronkan awalan "FR SIKAS" pada `docs/skpl/`, `SKPL.md`, dan DPPL menjadi "FR Karinakas" | Saya, bila Anda minta |
| 5 | Verifikasi 88 butir uji secara nyata di karinakas.com | Anda |
| 6 | ~~Putuskan nasib UT-03 (validasi KTP)~~ **selesai 30 Sept 2026** — validasi ditambahkan; putuskan UT-05 (FR pembatalan relawan) | Anda |
| 7 | Ekspor data mentah SUS dan tempel *screenshot* kuesioner | Anda |
