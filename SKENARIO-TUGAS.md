# 🧪 SKENARIO TUGAS — Pengujian Kebergunaan Website Karinakas

Dokumen ini memuat **skenario tugas (*task scenario*)** untuk pengujian kebergunaan
(*usability testing*) bersama pengguna nyata, beserta perangkat pencatatan dan kuesioner SUS.

> **Berbeda dengan [TESTING.md](TESTING.md).** Berkas itu memuat 179 kasus uji fungsional
> (*black-box*) yang dijalankan penyusun untuk memastikan fitur bekerja. Dokumen ini menguji
> hal yang berbeda: **apakah orang lain bisa memakainya** — dijalankan bersama peserta,
> penyusun hanya mengamati.

**Metode:** pengujian berbasis tugas dengan *think-aloud*, ditutup kuesioner *System Usability Scale* (SUS).
**Kaitan dengan penelitian:** menjadi tahap evaluasi pada pendekatan *Human-Centered Design*.

---

## 1. Tujuan pengujian

1. Mengukur **tingkat keberhasilan** pengguna menyelesaikan tugas inti tanpa bantuan.
2. Mengukur **efisiensi** melalui waktu penyelesaian dan jumlah kesalahan.
3. Mengukur **kepuasan** melalui skor SUS.
4. Menemukan **hambatan nyata** pada antarmuka yang tidak terlihat dari pengujian fungsional.

---

## 2. Profil peserta

Peserta dibagi dua kelompok karena perannya berbeda.

| Kelompok | Siapa | Jumlah disarankan | Lama sesi |
|---|---|---|---|
| **A — Masyarakat** | Calon donatur dan calon relawan. Sertakan **minimal 2 peserta berusia di atas 55 tahun**, karena antarmuka dirancang ramah lansia | 5–8 orang | ± 35 menit |
| **B — Pengelola** | Pengurus Yayasan Karinakas yang akan menjadi admin | 2–3 orang | ± 30 menit |

> **Mengapa 5 peserta per kelompok sudah memadai.** Pengujian kebergunaan bertujuan menemukan
> masalah, bukan menghasilkan angka yang mewakili populasi. Lima peserta pada satu kelompok
> umumnya sudah menyingkap sebagian besar hambatan utama. Bila hendak melaporkan skor SUS
> sebagai angka, tambah peserta kelompok A hingga sekitar 8–10 orang.

---

## 3. Persiapan sebelum pengujian

### 3.1 Lingkungan

- [ ] Peladen menyala: `php artisan serve` dan `npm run dev`
- [ ] Peramban dalam mode **jendela penyamaran** untuk tiap peserta, agar layar pengantar
      (*intro screen*) dan sesi peserta sebelumnya tidak terbawa
- [ ] Sediakan **berkas gambar contoh** untuk tugas unggah bukti pembayaran dan unggah foto galeri
- [ ] Siapkan pencatat waktu dan lembar pengamatan (Bagian 7)

### 3.2 Akun peserta — wajib berbeda tiap orang

Sistem menerapkan batasan **satu pengguna hanya boleh mendaftar sekali pada satu kegiatan**.
Bila seluruh peserta memakai akun yang sama, peserta kedua dan seterusnya **akan gagal**
mengerjakan tugas pendaftaran relawan, dan kegagalan itu bukan karena antarmukanya.

| Peserta | Akun | Kata sandi |
|---|---|---|
| A1 | `user1@test.com` | `password123` |
| A2 | `user2@test.com` | `password123` |
| A3 | `user3@test.com` | `password123` |
| … | … sampai `user10@test.com` | `password123` |
| B1–B3 | `admin@karinakas.org` · `superadmin@karinakas.org` | `password123` |

### 3.3 Ketersediaan data — periksa sebelum mulai

| Kebutuhan tugas | Kondisi saat dokumen ini disusun | Tindakan |
|---|---|---|
| Kegiatan yang **menerima donasi** | Hanya **1** — "Bakti Sosial di Panti Asuhan Kasih Harapan" | Cukup untuk pengujian. Bila ingin peserta punya pilihan, aktifkan `butuh_donasi` pada kegiatan aktif lain |
| Kegiatan yang **membuka relawan** | 3 kegiatan aktif | Perhatikan **"Bagi-bagi Nasi" hanya berkuota 1 orang** — akan penuh setelah satu peserta. Arahkan peserta ke kegiatan berkuota besar, atau naikkan kuotanya |
| Gambar QRIS | ✅ Tersedia di `public/qris-karinakas.png` | Metode QRIS dapat diuji |
| Berita terbit | 3 berita | Memadai |
| Album galeri | 6 album, 468 foto | Memadai |

### 3.4 Dua hambatan teknis yang harus diselesaikan lebih dulu

**Tautan pemulihan kata sandi harus benar-benar sampai ke surel peserta.**
Sejak 16 September 2026 pemulihan kata sandi memakai **tautan sekali pakai** yang dikirim lewat surel,
bukan kode OTP. Agar Tugas A8 dapat dikerjakan peserta sendiri, dua hal wajib benar pada `.env` peladen:

- **Blok `MAIL_*`** harus memakai SMTP sungguhan supaya surel benar-benar terkirim. Sejak 16 September 2026
  pengirimnya kotak surel hosting `noreply@karinakas.com` lewat `mail.karinakas.com` porta 587 (STARTTLS).
  Bila `MAIL_MAILER` masih `log`, isi surel hanya tertulis di `storage/logs/laravel.log` dan peserta tidak
  akan menerima apa pun.
- **`FRONTEND_URL`** harus menunjuk alamat situs yang dipakai peserta, karena nilai itulah yang menyusun
  tautan di dalam surel. Bila salah, tautan mengarah ke alamat yang keliru meskipun surelnya terkirim.

Pakai alamat surel yang benar-benar dapat dibuka peserta, dan siapkan satu akun uji cadangan.
Fasilitator membacakan tautan dari berkas log **tidak boleh diklaim** sebagai pengujian alur yang utuh.

**Pembatasan laju permintaan dapat memblokir peserta berikutnya.**
Rute masuk dan daftar dibatasi **5 permintaan per menit per alamat IP**, begitu pula permintaan tautan pada halaman Lupa Kata Sandi. Halaman penyetelan ulang kata sandi memakai jatah tersendiri yang lebih longgar (20 per menit), sehingga memuat ulang halaman itu tidak memblokir peserta yang hendak masuk.
Bila beberapa peserta diuji berurutan pada jaringan yang sama, permintaan ke-6 akan dibalas galat.
Beri jeda ± 1 menit antarpeserta pada tugas yang menyentuh ketiga rute tersebut.

### 3.5 Etika dan data pribadi

- Formulir relawan meminta **nomor KTP**. **Jangan pernah meminta peserta mengisi nomor asli.**
  Sediakan nomor contoh, misalnya `3374010101900001`, dan katakan itu data karangan.
- Mintalah persetujuan lisan sebelum merekam layar atau suara.
- Sampaikan di awal: **yang diuji adalah websitenya, bukan pesertanya.** Kesulitan yang muncul
  adalah temuan berharga, bukan kesalahan peserta.

---

## 4. Aturan fasilitator

1. **Bacakan situasinya, jangan sebutkan nama menu.** Tugas menyebut tujuan, bukan langkah.
   Menyebut "klik menu Donasi" berarti jawabannya sudah diberikan.
2. **Jangan membantu** selama peserta masih berusaha. Diam adalah data.
3. Bila peserta buntu lebih dari **2 menit**, tawarkan petunjuk bertingkat, dan **catat tingkat
   petunjuk yang dipakai**:
   - *Petunjuk 1* — "Coba lihat lagi bagian atas halaman."
   - *Petunjuk 2* — "Menu yang Anda cari ada di bilah navigasi."
   - *Petunjuk 3* — tunjukkan langsung, lalu tandai tugas sebagai **gagal**.
4. Dorong peserta **bersuara** ("apa yang sedang Anda cari sekarang?").
5. Catat **kalimat asli** peserta saat bingung. Kutipan langsung lebih berguna daripada rangkuman.

---

## 5. Skenario tugas — Kelompok A (Masyarakat)

Delapan tugas, berurutan dari yang paling umum ke yang paling terlibat.

---

### A1 — Mencari kegiatan yang sedang berjalan

> **Situasi.** Anda mendengar Yayasan Karinakas sering mengadakan kegiatan sosial.
> Anda ingin tahu kegiatan apa saja yang sedang berjalan saat ini dan kapan dilaksanakan.

| | |
|---|---|
| **Tujuan** | Menemukan daftar kegiatan beserta tanggal pelaksanaannya |
| **Berhasil bila** | Peserta menyebutkan minimal satu nama kegiatan beserta tanggalnya |
| **Perlu masuk?** | Tidak |
| **Perkiraan waktu** | 1 menit |
| **Yang diamati** | Apakah peserta langsung menemukan menu kegiatan, atau menelusuri beranda lebih dulu |

---

### A2 — Melihat dokumentasi foto kegiatan

> **Situasi.** Anda ingin melihat foto-foto dokumentasi dari salah satu kegiatan yayasan
> untuk memastikan kegiatannya benar-benar terlaksana.

| | |
|---|---|
| **Tujuan** | Membuka album foto salah satu kegiatan dan melihat foto di dalamnya |
| **Berhasil bila** | Peserta membuka satu album dan menampilkan foto dalam tampilan layar penuh |
| **Perlu masuk?** | Tidak |
| **Perkiraan waktu** | 1–2 menit |
| **Yang diamati** | Apakah konsep "album per kegiatan" langsung dipahami; apakah cara menutup tampilan layar penuh jelas |

---

### A3 — Mencari cara menghubungi yayasan

> **Situasi.** Anda punya pertanyaan yang ingin ditanyakan langsung kepada pengurus yayasan.
> Cari tahu bagaimana cara menghubungi mereka.

| | |
|---|---|
| **Tujuan** | Menemukan kanal kontak dan menyebutkan salah satunya |
| **Berhasil bila** | Peserta menyebutkan nomor WhatsApp, alamat, atau surel yayasan |
| **Perlu masuk?** | Tidak |
| **Perkiraan waktu** | 1 menit |
| **Yang diamati** | Apakah peserta mencari formulir pesan terlebih dahulu. Halaman ini **sengaja tanpa formulir** — pertanyaan diarahkan ke WhatsApp. Bila banyak peserta mencari formulir, itu temuan yang perlu dilaporkan |

---

### A4 — Membuat akun

> **Situasi.** Anda memutuskan ingin ikut berpartisipasi. Untuk itu Anda perlu punya akun
> di website yayasan. Buatlah akun dengan data diri Anda.

| | |
|---|---|
| **Tujuan** | Menyelesaikan pendaftaran akun hingga masuk ke sistem |
| **Berhasil bila** | Akun terbentuk dan peserta berada dalam keadaan sudah masuk |
| **Data** | Pakai nama dan surel karangan yang disediakan fasilitator |
| **Perkiraan waktu** | 3–4 menit |
| **Yang diamati** | Formulirnya bertahap — apakah peserta paham sedang di tahap berapa; apakah syarat kata sandi minimal 8 karakter tersampaikan sebelum peserta terlanjur salah |

---

### A5 — Mendaftar sebagai relawan

> **Situasi.** Anda tertarik membantu langsung di lapangan pada salah satu kegiatan yayasan.
> Daftarkan diri Anda sebagai relawan.

| | |
|---|---|
| **Tujuan** | Menyelesaikan pendaftaran relawan pada satu kegiatan |
| **Berhasil bila** | Pendaftaran tersimpan dan peserta melihat konfirmasinya |
| **Data** | Nomor KTP **karangan** — `3374010101900001` |
| **Perhatian** | Hindari kegiatan **"Bagi-bagi Nasi"** (kuota hanya 1 orang) bila peserta lebih dari satu |
| **Perkiraan waktu** | 4–5 menit |
| **Yang diamati** | Apakah peserta sadar pilihan jenis relawan dan bidang minat **berubah mengikuti kegiatan** yang dipilih; apakah data diri yang terisi otomatis dari profil disadari |

---

### A6 — Berdonasi dan mengunggah bukti

> **Situasi.** Anda ingin menyumbang dana sebesar Rp 100.000 untuk salah satu kegiatan yayasan.
> Lakukan sampai bukti pembayaran Anda terkirim.

| | |
|---|---|
| **Tujuan** | Mengajukan donasi, memilih metode pembayaran, lalu mengunggah bukti |
| **Berhasil bila** | Donasi tercatat dan bukti pembayaran berhasil diunggah |
| **Data** | Berkas gambar contoh yang disediakan fasilitator |
| **Perhatian** | Hanya kegiatan **"Bakti Sosial di Panti Asuhan Kasih Harapan"** yang menerima donasi |
| **Perkiraan waktu** | 5–7 menit |
| **Yang diamati** | **Tugas terpenting.** Apakah peserta paham donasi harus terikat kegiatan; apakah petunjuk pembayaran QRIS atau transfer dapat diikuti; apakah peserta sadar nominal harus **diketik sendiri** karena QRIS statis; apakah langkah unggah bukti terlihat sebagai keharusan atau terlewat |

---

### A7 — Memeriksa status pengajuan

> **Situasi.** Beberapa hari berlalu. Anda ingin memastikan donasi dan pendaftaran relawan Anda
> sudah diterima pihak yayasan.

| | |
|---|---|
| **Tujuan** | Menemukan riwayat donasi dan riwayat relawan milik sendiri beserta statusnya |
| **Berhasil bila** | Peserta menyebutkan status kedua pengajuannya |
| **Perkiraan waktu** | 2 menit |
| **Yang diamati** | Apakah peserta tahu harus membuka profil; apakah arti status "menunggu" tersampaikan dengan jelas |

---

### A8 — Memulihkan kata sandi yang lupa

> **Situasi.** Anda kembali membuka website setelah sekian lama dan lupa kata sandi Anda.
> Usahakan agar Anda bisa masuk kembali.

| | |
|---|---|
| **Tujuan** | Menyelesaikan pemulihan kata sandi hingga berhasil masuk dengan sandi baru |
| **Berhasil bila** | Peserta masuk memakai kata sandi barunya |
| **Prasyarat** | **SMTP sungguhan harus sudah diatur** (lihat 3.4), selain itu tugas ini tidak dapat dijalankan secara wajar |
| **Perkiraan waktu** | 4–5 menit |
| **Yang diamati** | Apakah peserta menemukan tautan lupa kata sandi; apakah paham kode berlaku 10 menit dan sekali pakai |

---

## 6. Skenario tugas — Kelompok B (Pengelola)

Tujuh tugas. Tugas B4–B7 khusus super admin.

---

### B1 — Menerbitkan berita baru

> **Situasi.** Yayasan baru saja menyelesaikan kegiatan bakti sosial. Anda diminta
> mengumumkannya di website agar masyarakat mengetahuinya.

| | |
|---|---|
| **Tujuan** | Membuat satu berita baru hingga terbit dan tampil di halaman publik |
| **Berhasil bila** | Berita berstatus terbit dan terlihat pada halaman berita |
| **Perkiraan waktu** | 4–5 menit |
| **Yang diamati** | Apakah perbedaan status draf dan terbit dipahami; apakah pengelola memeriksa hasilnya di halaman publik tanpa diminta |

---

### B2 — Mengunggah dokumentasi kegiatan

> **Situasi.** Anda punya beberapa foto dari kegiatan kemarin dan ingin memasukkannya
> ke galeri website.

| | |
|---|---|
| **Tujuan** | Mengunggah beberapa foto sekaligus ke dalam satu album kegiatan |
| **Berhasil bila** | Foto tampil pada galeri publik di bawah album yang benar |
| **Data** | Siapkan 5–10 berkas gambar contoh |
| **Perkiraan waktu** | 5–6 menit |
| **Yang diamati** | Apakah konsep "album ditentukan oleh judul" dipahami; apakah pengisian nama tiap foto terasa membebani; apakah indikator kemajuan unggahan menenangkan atau justru membingungkan |

---

### B3 — Memverifikasi pendaftar relawan

> **Situasi.** Ada warga yang mendaftar menjadi relawan. Setelah menimbang, Anda memutuskan
> menerima pendaftarannya.

| | |
|---|---|
| **Tujuan** | Mengubah status satu pendaftar relawan menjadi diterima |
| **Berhasil bila** | Status berubah menjadi diterima dan pendaftar menerima surel pemberitahuan |
| **Perkiraan waktu** | 3 menit |
| **Yang diamati** | Apakah pengelola memeriksa detail pendaftar sebelum memutuskan; apakah pengelola sadar tindakannya **memicu pengiriman surel otomatis** |

---

### B4 — Memverifikasi pembayaran donasi *(super admin)*

> **Situasi.** Seorang donatur mengaku sudah mentransfer dan mengunggah buktinya.
> Periksa dan tetapkan status pembayarannya.

| | |
|---|---|
| **Tujuan** | Membuka bukti pembayaran, lalu menetapkan status donasi |
| **Berhasil bila** | Status pembayaran berubah sesuai keputusan pengelola |
| **Perkiraan waktu** | 3–4 menit |
| **Yang diamati** | Apakah bukti transfer mudah ditemukan dan cukup jelas dilihat, dan apakah nominal pada bukti mudah dicocokkan dengan nominal yang tercatat. Tugas ini memakai akun **super admin** — sejak 14 September 2026 admin biasa tidak lagi memverifikasi donasi |

---

### B5 — Membuat akun admin baru *(super admin)*

> **Situasi.** Ada pengurus baru yang akan ikut mengelola website. Buatkan akun untuknya
> dengan kewenangan admin.

| | |
|---|---|
| **Tujuan** | Membuat satu akun berperan admin |
| **Berhasil bila** | Akun terbentuk dan perannya benar |
| **Perkiraan waktu** | 3 menit |
| **Yang diamati** | Apakah perbedaan peran admin dan super admin dipahami sebelum memilih |

---

### B6 — Mengunduh rekapitulasi donasi *(super admin)*

> **Situasi.** Ketua yayasan meminta rekap donasi yang sudah masuk untuk rapat bulanan.

| | |
|---|---|
| **Tujuan** | Mengunduh berkas rekapitulasi donasi |
| **Berhasil bila** | Berkas terunduh dan dapat dibuka |
| **Perkiraan waktu** | 2–3 menit |
| **Yang diamati** | Apakah pengelola sadar isi berkas **mengikuti penyaringan yang sedang aktif** di layar. Saat berkas dibuka, Excel akan memperingatkan format tidak cocok — amati reaksinya, karena ini akan terjadi pada pemakaian sehari-hari |

---

### B7 — Menelusuri jejak audit *(super admin)*

> **Situasi.** Ada data yang berubah dan Anda ingin tahu siapa yang mengubahnya.

| | |
|---|---|
| **Tujuan** | Menemukan catatan tindakan pengelola beserta pelakunya |
| **Berhasil bila** | Peserta menyebutkan satu tindakan beserta nama pelaku dan waktunya |
| **Perkiraan waktu** | 2 menit |
| **Yang diamati** | Apakah kegunaan jejak audit dipahami tanpa dijelaskan |

---

## 7. Lembar pengamatan

Satu lembar untuk satu peserta. Diisi fasilitator selama sesi berlangsung.

**Peserta:** ______  **Kelompok:** A / B  **Usia:** ____  **Tanggal:** __________
**Pengalaman memakai website serupa:** Jarang / Kadang / Sering

| Kode | Tugas | Waktu | Hasil | Petunjuk | Kesalahan | Catatan dan kutipan peserta |
|---|---|---|---|---|---|---|
| A1 | Mencari kegiatan | | ✅ / ⚠️ / ❌ | 0/1/2/3 | | |
| A2 | Melihat galeri | | ✅ / ⚠️ / ❌ | 0/1/2/3 | | |
| A3 | Mencari kontak | | ✅ / ⚠️ / ❌ | 0/1/2/3 | | |
| A4 | Membuat akun | | ✅ / ⚠️ / ❌ | 0/1/2/3 | | |
| A5 | Mendaftar relawan | | ✅ / ⚠️ / ❌ | 0/1/2/3 | | |
| A6 | Berdonasi | | ✅ / ⚠️ / ❌ | 0/1/2/3 | | |
| A7 | Memeriksa status | | ✅ / ⚠️ / ❌ | 0/1/2/3 | | |
| A8 | Memulihkan sandi | | ✅ / ⚠️ / ❌ | 0/1/2/3 | | |

**Arti hasil:** ✅ selesai tanpa bantuan · ⚠️ selesai dengan petunjuk 1–2 · ❌ gagal atau perlu petunjuk 3

**Arti kesalahan:** setiap kali peserta menekan tautan yang keliru, mengisi medan yang salah,
atau harus mengulang langkah.

---

## 8. Kuesioner SUS

Diisi peserta **setelah seluruh tugas selesai**, tanpa didampingi fasilitator.

Petunjuk untuk peserta: *"Beri satu tanda pada tiap pernyataan sesuai perasaan Anda setelah
mencoba website tadi. Tidak ada jawaban benar atau salah."*

| No | Pernyataan | STS 1 | TS 2 | N 3 | S 4 | SS 5 |
|---|---|---|---|---|---|---|
| 1 | Saya rasa saya akan sering menggunakan website ini | ☐ | ☐ | ☐ | ☐ | ☐ |
| 2 | Saya merasa website ini terlalu rumit padahal bisa dibuat lebih sederhana | ☐ | ☐ | ☐ | ☐ | ☐ |
| 3 | Saya rasa website ini mudah digunakan | ☐ | ☐ | ☐ | ☐ | ☐ |
| 4 | Saya rasa saya membutuhkan bantuan orang lain untuk dapat menggunakan website ini | ☐ | ☐ | ☐ | ☐ | ☐ |
| 5 | Saya merasa fungsi-fungsi pada website ini berjalan sebagaimana mestinya | ☐ | ☐ | ☐ | ☐ | ☐ |
| 6 | Saya merasa banyak hal yang tidak konsisten pada website ini | ☐ | ☐ | ☐ | ☐ | ☐ |
| 7 | Saya rasa kebanyakan orang akan cepat memahami cara memakai website ini | ☐ | ☐ | ☐ | ☐ | ☐ |
| 8 | Saya merasa website ini membingungkan | ☐ | ☐ | ☐ | ☐ | ☐ |
| 9 | Saya merasa tidak menemui hambatan saat memakai website ini | ☐ | ☐ | ☐ | ☐ | ☐ |
| 10 | Saya perlu membiasakan diri dahulu sebelum dapat memakai website ini | ☐ | ☐ | ☐ | ☐ | ☐ |

*STS = sangat tidak setuju · TS = tidak setuju · N = netral · S = setuju · SS = sangat setuju*

**Cara menghitung skor**

1. Pernyataan **ganjil** (1, 3, 5, 7, 9): nilai − 1
2. Pernyataan **genap** (2, 4, 6, 8, 10): 5 − nilai
3. Jumlahkan kedua belas hasil di atas, lalu **kalikan 2,5**
4. Skor akhir berada pada rentang 0–100

**Penafsiran umum**

| Skor | Tingkat penerimaan | Peringkat |
|---|---|---|
| ≥ 80,3 | Sangat baik | A |
| 68 – 80,2 | Baik | B |
| 68 | Rata-rata | C |
| 51 – 67 | Kurang | D |
| < 51 | Buruk | F |

> Skor SUS **bukan persentase**. Skor 68 berarti berada pada rata-rata, bukan "68% memuaskan".

---

## 9. Wawancara penutup

Empat pertanyaan terbuka setelah kuesioner. Rekam jawabannya sebagai kutipan.

1. Bagian mana yang menurut Anda **paling membingungkan**?
2. Bagian mana yang terasa **paling mudah**?
3. Seandainya Anda benar-benar ingin berdonasi, apakah Anda **percaya** menyerahkan uang lewat
   cara yang tadi Anda coba? Mengapa?
4. Kalau boleh mengubah **satu hal saja**, apa yang Anda ubah?

Khusus peserta berusia lanjut, tambahkan:

5. Apakah **ukuran tulisan dan tombol** sudah nyaman dibaca dan ditekan?

---

## 10. Rekapitulasi hasil

Diisi setelah seluruh sesi selesai.

| Kode | Tugas | Berhasil tanpa bantuan | Berhasil dengan petunjuk | Gagal | Rerata waktu |
|---|---|---|---|---|---|
| A1 | Mencari kegiatan | | | | |
| A2 | Melihat galeri | | | | |
| A3 | Mencari kontak | | | | |
| A4 | Membuat akun | | | | |
| A5 | Mendaftar relawan | | | | |
| A6 | Berdonasi | | | | |
| A7 | Memeriksa status | | | | |
| A8 | Memulihkan sandi | | | | |
| B1 | Menerbitkan berita | | | | |
| B2 | Mengunggah galeri | | | | |
| B3 | Verifikasi relawan | | | | |
| B4 | Verifikasi donasi | | | | |
| B5 | Membuat akun admin | | | | |
| B6 | Unduh rekapitulasi | | | | |
| B7 | Jejak audit | | | | |

**Skor SUS**

| Peserta | Skor | Peserta | Skor |
|---|---|---|---|
| A1 | | B1 | |
| A2 | | B2 | |
| A3 | | B3 | |
| A4 | | **Rerata keseluruhan** | |

**Daftar temuan** — urutkan menurut jumlah peserta yang mengalaminya.

| No | Temuan | Tugas | Peserta terdampak | Tingkat keparahan | Usulan perbaikan |
|---|---|---|---|---|---|
| 1 | | | | Tinggi / Sedang / Rendah | |
| 2 | | | | | |

---

## 11. Catatan penyusunan

- Skenario disusun berdasarkan **fungsi yang benar-benar berjalan** pada sistem saat dokumen ini
  dibuat. Fungsi yang masih berupa kerangka tidak dijadikan tugas.
- Tugas **A6 (donasi)** dan **B2 (unggah galeri)** adalah dua alur paling rumit pada sistem.
  Bila waktu terbatas, keduanya yang paling layak dipertahankan.
- **A3 (mencari kontak)** sengaja dirancang untuk menguji sebuah keputusan perancangan:
  halaman Kontak tidak memiliki formulir pesan, melainkan mengarahkan ke WhatsApp. Bila banyak
  peserta justru mencari formulir, keputusan itu perlu ditinjau ulang.
- Hasil pengujian ini menjadi bahan **bab pengujian dan pembahasan** pada naskah skripsi,
  melengkapi hasil pengujian fungsional pada [TESTING.md](TESTING.md).
