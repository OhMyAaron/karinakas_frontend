# Catatan Penyusunan PDHUPL (bukan bagian naskah)

Berkas ini menyertai `docs/PDHUPL.md`. Isinya catatan kerja untuk penyusun — **jangan ditempel ke Word**.

## 1. Mengapa versi sebelumnya kurang detail dibanding contoh teman

Dibandingkan `PDHUPL_Reinaldy (1).pdf`, versi sebelumnya kurang pada empat hal:

| # | Bagian | Contoh teman | Versi sebelumnya | Sekarang |
|---|---|---|---|---|
| 1 | Bab 3.1 | 7 kolom: Kelas Uji, Butir Uji, SKPL, PDHUPL, **Tingkat**, **Jenis**, Jadwal | Kolom Tingkat/Jenis hilang; kolom "Catatan" berisi komentar penyusun | 7 kolom sama; catatan dipindah ke berkas ini |
| 2 | Bab 4 | **Satu subbab per butir uji** ("Butir pengujian ini melakukan pengujian terhadap fungsi … Masukan … berupa …") | Satu paragraf per kelas | Satu subbab per butir (4.x.y) |
| 3 | Bab 5 | 8 kolom: … Keluaran, **Kriteria Evaluasi Hasil**, Hasil, Kesimpulan; prosedur **berlangkah bernomor** | Tanpa kolom Kriteria; prosedur satu kalimat; keluaran umum | 8 kolom; langkah bernomor; keluaran memuat pesan dan kode HTTP nyata dari kode |
| 4 | Bab 6 | Tabel jawaban **per butir P1–P10** + total + skor tiap responden | Hanya skor akhir per responden | Belum — lihat butir 3 di bawah |

Selain itu naskah lama memuat kalimat bernada komentar ("skor ini jauh lebih moderat dibanding
proyek lain", kotak catatan di awal). Kalimat itu dihapus dari naskah karena tidak pantas di dokumen resmi.

## 2. Koreksi terhadap kode nyata yang ditemukan saat penulisan ulang

Keluaran yang diharapkan kini dicocokkan ke `AuthController`, `DonasiController`, `RelawanController`,
`AdminController`, `KegiatanController`, `KampanyeController`, `GaleriController`. Akibatnya:

- **UT-05 (batalkan relawan) sebelumnya salah.** Tertulis "status menjadi dibatalkan", padahal `cancel()`
  **menghapus baris** (`$relawan->delete()`), tidak ada status `dibatalkan`. Pendaftaran `diterima` ditolak HTTP 400.
- **AD-31 (hapus pengguna) sebelumnya salah.** Tertulis "bukan akun sendiri". Kode menolak menghapus **semua**
  akun berperan super admin ("Super Admin tidak dapat dihapus", 403), bukan hanya akun sendiri → butir baru **AD-38**.
- **Butir baru** yang punya dasar aturan nyata di kode: SR-12 (email duplikat), SR-13 (sandi < 8), RP-04 (email
  tidak terdaftar → 422), UT-11 (donasi pada kegiatan tidak membuka donasi), UT-12 (relawan ganda), AD-37
  (`tanggal_selesai` sebelum `tanggal_mulai`), AD-39 (ubah peran akun sendiri ditolak).
- Total pada tahap ini **85 butir uji** (sebelumnya 77); kemudian menjadi **88** setelah AD-28N, AD-30N, AD-32N ditambahkan (lihat §3).

## 3. Bab 5 kini sudah terisi — tapi lewat penelusuran kode, bukan eksekusi langsung (26 Sept, revisi ke-2)

Atas permintaan Anda, kolom "Hasil yang Didapat"/"Kesimpulan" pada seluruh 88 butir uji
sudah saya isi dengan membaca langsung kode `app/Http/Controllers/*.php` dan berkas React
terkait — mencocokkan pesan, kode HTTP, dan perilaku yang benar-benar ada di kode terhadap
"Keluaran yang Diharapkan" di setiap baris. **Ini penelusuran kode statis, bukan pengujian
dinamis** (mengeklik `karinakas.com` sungguhan atau memanggil API secara langsung) — beri
tahu dosen pembimbing perbedaan ini bila ditanya metode pengujiannya. Rincian metode ada
di catatan awal Bab 5 pada `docs/PDHUPL.md`.

**Satu butir sempat Tidak Handal, sudah diperbaiki 30 September 2026:** **UT-03** (validasi
16 digit KTP). Semula `DaftarRelawan.jsx` hanya membatasi `maxLength={16}` (batas maksimum,
bukan mewajibkan tepat 16 digit), dan `RelawanController::store` memvalidasi `nomor_ktp`
sebagai `nullable|string|max:20` tanpa aturan panjang sama sekali, sehingga KTP kurang dari
16 digit tetap dapat dikirim dan tersimpan. **Perbaikan:** frontend kini memakai `required`,
`minLength`/`maxLength={16}`, `pattern="\d{16}"`, plus pemeriksaan panjang sebelum kirim;
backend memvalidasi `nomor_ktp` sebagai `required|digits:16` — permintaan KTP kosong atau
bukan 16 digit ditolak HTTP 422. Bab 5 `docs/PDHUPL.md` (UT-03) sudah diperbarui jadi Handal.
Kolom `nomor_ktp` pada tabel `relawan` **tetap nullable** di skema (tidak diubah lewat
migrasi) supaya baris lama yang mungkin berisi KTP kosong tidak rusak — yang berubah hanya
aturan validasi untuk pendaftaran baru.

**Tiga butir uji negatif ditambahkan (AD-28N, AD-30N, AD-32N).** Anda bertanya kenapa hanya
sebagian butir yang punya pasangan "(negatif)" — jawabannya: pasangan negatif hanya berlaku
untuk fungsi yang benar-benar dibatasi khusus Super Admin di kode (lewat
`wajibSuperAdmin()`/`isSuperAdmin()`), bukan untuk validasi masukan biasa (field kosong,
format berkas) yang berlaku merata di semua modul — itu bagian yang memang tidak perlu
pasangan negatif. Tapi dalam submodul Pengguna sendiri, hanya AD-29 (lihat daftar) dan AD-31
(hapus) yang tadinya diberi pasangan; AD-27/28 (tambah), AD-30 (ubah), dan AD-32 (reset kata
sandi) sama-sama dibatasi `isSuperAdmin()` di kode tapi kelewatan tidak diberi pasangan —
itu murni kelalaian saya menyalin cakupan dari `TC_Blackbox_Testing_Karinakas.pdf` milik
Anda (yang memang hanya mengoreksi AD-14/15 dan AD-29/31), bukan karena fungsi itu berbeda
perilaku. Sudah dilengkapi sekarang; total butir uji naik dari 85 menjadi **88**.

## 4. Yang masih perlu Anda lengkapi

| # | Bagian | Yang dibutuhkan |
|---|---|---|
| 1 | Bab 5 (semua tabel) | **Jalankan ulang secara nyata** di `karinakas.com` sebelum menyerahkan naskah — penelusuran kode memastikan perilaku *ada di kode*, tapi tidak menggantikan pengamatan layar langsung untuk hal visual (tampilan, unggah berkas sungguhan, pengiriman surel nyata). Perlakukan isian saat ini sebagai draf kuat, bukan hasil akhir. |
| 2 | Jadwal | Semua butir diberi "September 2026". Ubah bila eksekusi Anda bergeser ke bulan lain. |
| 3 | **Bab 6, tabel per butir P1–P10** | Contoh teman menampilkan jawaban 1–5 tiap responden. Data mentah itu **tidak ada di folder proyek** (yang tersedia hanya skor akhir). Lokasi tempel *screenshot* dan cara mengekspor data mentah sudah saya tambahkan langsung di `docs/PDHUPL.md` Bab 6 (kotak catatan setelah Subbab 6.1). |
| 4 | SR-07 | Pastikan akun `user{N}@test.com` yang dipakai benar-benar ada di basis data. |
| 5 | UT-03 | **Tidak Handal** — putuskan: tambahkan validasi 16 digit di `RelawanController`, atau catat sebagai keterbatasan jujur di Bab V. |
| 6 | UT-05 | Pertimbangkan menambah FR pembatalan pendaftaran relawan di SKPL Subbab 3.2 (kolom SKPL kini bertanda "belum tercantum"). |
| 7 | AD-34 | Putuskan nasib titik akhir `rekapanKegiatan`/`exportRekapan` yang tidak terpakai. |
| 8 | RP-04 | Temuan: `forgotPassword` memakai `exists:users,email`, sehingga email tidak terdaftar dijawab 422 berbahasa Inggris bawaan Laravel. Ini membocorkan apakah suatu email terdaftar. Cukup dicatat sebagai keterbatasan di Bab V, atau ubah agar selalu menjawab sama dan diterjemahkan. |
| 9 | Halaman sampul, Daftar Revisi, Daftar Isi | Contoh teman punya ketiganya. Ambil dari template Word resmi; naskah `.md` hanya memuat isi Bab 1–6. |
| 10 | Bab 6 | Sertakan catatan *straight-lining* (R19) dan saran terbuka responden di Bab V/VI laporan TA. |
| 11 | Pesan validasi berbahasa Inggris | SR-12, RP-04, dan AD-37 memakai pesan validasi bawaan Laravel (belum diterjemahkan). Pertimbangkan menambah pesan kustom Indonesia di `AuthController`/`KegiatanController` agar konsisten dengan pesan kustom di tempat lain. |
