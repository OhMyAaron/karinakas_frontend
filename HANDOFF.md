# 🤝 HANDOFF — Progres Pengerjaan Website Karinakas

Berkas ini menjawab *"sudah sampai mana, apa yang masih bermasalah, dan apa langkah berikutnya"*.
Gambaran sistem (arsitektur, endpoint, konfigurasi) ada di **[CONTEXT.md](CONTEXT.md)** — baca itu lebih dulu.

**Diperbarui:** 5 Oktober 2026

> **Untuk AI / room chat baru:** baca `CONTEXT.md` → berkas ini → bila menyentuh DPPL, `docs/dppl/CHECKLIST.md`.
> Bagian §7 menjelaskan cara bekerja yang disukai penyusun — ikuti itu.

> 🔴 **PENTING — baca sebelum menyentuh Bab IV/V/VI laporan TA:** ada **dua naskah Bab V/VI yang
> kini tidak identik**, masing-masing lebih maju di sisi berbeda — jangan asumsikan salah satunya
> usang begitu saja:
> 1. **`D:\KULIAH\Sems 7\SKRIPSI\TUGAS AKHIR\Laporan Tugas Akhir\LAPORAN TUGAS AKHIR TERBARU.docx`**
>    (satu tingkat di luar folder `Project TA\`) — satu-satunya yang punya **43 tangkapan layar
>    sungguhan tertanam**. Sudah direvisi ke 2 tujuan, dan 2 dari 3 inkonsistensi §4.16 sudah
>    diperbaiki langsung di berkas ini 2 Okt malam (lihat §4.17); **1 sisanya ("35 vs 27
>    responden") masih menunggu konfirmasi Anda**. Backup pra-sunting ada di folder yang sama:
>    `LAPORAN TUGAS AKHIR TERBARU.backup-20261002-210355.docx`. **Belum** memakai gaya penelusuran
>    4 tahap HCD maupun kebijakan hapus-rujukan-Subbab di bawah ini.
> 2. **`docs/laporan/BAB-V-LENGKAP.md`** dan **`BAB-VI-LENGKAP.md`** di repo ini — direvisi
>    terpisah 2–3 Okt atas permintaan Anda (§4.18–§4.19): kerangka 2 tujuan, Pembahasan Bab V
>    menelusuri **keempat tahap HCD (ISO 9241-210)** secara eksplisit, **seluruh rujukan
>    "(Subbab X.Y)" dihapus**, dan paragraf usability tidak lagi membandingkan skor SUS dengan
>    studi lain. **Belum** punya screenshot asli (masih penanda *Sisipkan Gambar*), dan **belum
>    disebarkan** ke `TERBARU.docx` — pertanyaan ini masih terbuka, lihat §6. Sejak 4 Okt, Pembahasan
>    5.2.4 di `.md` ini juga memuat **penjelasan 10 grafik SUS (Gambar 5.21–5.30)** — lihat §4.20.
> 3. **`Laporan Tugas Akhir\REVISI\LAPORAN TUGAS AKHIR TERBARU.docx`** (+ salinan di `REVISI\nest\`) —
>    🆕 **ditemukan 4 Okt, diubah 3 Okt 21:43, 12 MB** (lebih kecil dari `TERBARU.docx` di folder induk
>    yang 16 MB, 2 Okt 21:14). **Belum dibuka/dibandingkan** — belum diketahui apakah ini versi terbaru,
>    hasil revisi dosen, atau salinan kerja. **Tanyakan ke penyusun mana yang aktif sebelum menyunting
>    `.docx` apa pun.**

---

## 1. Status saat ini (ringkas)

| Aspek | Status |
|---|---|
| **Aplikasi** | ✅ Fungsional end-to-end, semua modul terhubung ke API |
| **Hosting** | ✅ Live di **https://karinakas.com** — backend & frontend versi 17 Sept terpasang · ⚠️ **perbaikan `AdminController` 19 Sept (lihat §4.7) belum di-deploy** |
| **Pemulihan kata sandi** | ✅ Kode selesai & teruji (tautan sekali pakai) · ⚠️ **pengiriman surel dari peladen belum terbukti berhasil** |
| **Manajemen pengguna** | ✅ Celah `isSuperAdmin()` **sudah diperbaiki dan diuji** di kode lokal (19 Sept, §4.7) · ⚠️ belum di-push/di-deploy |
| **Git** | ✅ Perbaikan `AdminController.php` sudah di-commit backend `9582191` dan di-*push* (28 Sept, penanda lokal `main...origin/main` tanpa selisih) · ⚠️ **aktif di karinakas.com belum terverifikasi** — Anda sudah mencoba `git pull` di cPanel; uji admin → `GET /admin/users` harus 403 (`docs/PDHUPL-STATUS-DAN-KODE.md` §4.3). Frontend masih `88b825c` |
| **SKPL** | ✅ Bab I–III selesai, **disinkronkan ulang 19–20 Sept** (lihat §4.8): 66 titik akhir, UC-24 Memulihkan Kata Sandi, NFR 3.4.4.8 dipersempit sesuai FR 516 |
| **DPPL** | ✅ Bab 1, 2.1, 2.2, 2.3 (juga disinkronkan 19–20 Sept) · ⬜ **2.4 Perancangan Antarmuka belum** — draf materi sudah ada di `docs/laporan/4.3-4.4-...md` §4.3.7–4.3.9 |
| **Bab IV Laporan TA** | ✅ **Naskah siap tempel** di `docs/laporan/BAB-IV-LENGKAP.md` (§4.12) — konsolidasi draf lama, penomoran final 4.1–4.6 disamakan dengan Word, "catatan revisi" (gaya "naskah sebelumnya salah...") ditulis ulang jadi prosa langsung, jumlah antarmuka **diputuskan 24** (11 publik/5 terdaftar/8 admin) · ⬜ SKPL/DPPL belum ikut memakai angka 24 ini |
| **Bab IV/V/VI Laporan TA** | 🔴 **Dua naskah Bab V/VI tidak identik, baca §4.16–§4.19 sebelum menyentuh.** `TERBARU.docx` (di luar repo): punya 43 screenshot nyata; 2 dari 3 inkonsistensi §4.16 sudah diperbaiki 2 Okt (✅ "tujuan ketiga" & selisih 87/87 vs 86/87); ⬜ "35 vs 27 responden" masih menunggu konfirmasi Anda. `docs/laporan/BAB-V/VI-LENGKAP.md`: direvisi terpisah 2–3 Okt — 2 tujuan, 4 tahap HCD ditelusuri eksplisit di Pembahasan, rujukan Subbab dihapus, paragraf usability tidak lagi membandingkan ke studi lain; ⬜ belum disebarkan ke `TERBARU.docx`, belum punya screenshot asli. **4 Okt:** Pembahasan 5.2.4 `.md` kini memuat penjelasan 10 grafik SUS (Gambar 5.21–5.30, §4.20) — grafiknya dipindah dari Hasil ke Pembahasan. 🆕 Ada folder `REVISI/` berisi `.docx` lain (3 Okt) yang belum diperiksa. |
| **PDHUPL** | ✅ **88 butir uji, Bab 5 & Bab 6 (SUS) lengkap** di `docs/PDHUPL.md` (§4.10–§4.13) — Bab 5 lewat **penelusuran kode**; **UT-03 (validasi KTP) diperbaiki 30 Sept, kini Handal** (§4.13, kode lokal belum di-deploy); **Bab 6 kini memuat data mentah P1–P10 seluruh 40 responden** (§4.12), bukan hanya skor akhir · ⬜ **verifikasi nyata di situs live masih perlu dilakukan sebelum dianggap final**. ⚠️ Berkas Word terpisah yang pernah diserahkan penyusun ("PDHUPL FX.pdf") adalah **ekspor lama** — sempat kurang 3 subbab (AD-28N/30N/32N di Bab 4.6); `docs/PDHUPL.md` sudah benar, tinggal ekspor ulang |
| **TESTING.md** | ✅ 181 kasus tersusun · ⬜ belum dijalankan/diisi |
| **Uji kebergunaan (SUS)** | ✅ **Sudah dijalankan — 40 responden nyata, skor rata-rata 72,56** (Baik/*Acceptable*), lihat §4.10 |
| **Laporan TA (.docx)** | ⚠️ Belum selaras dengan SKPL/DPPL — draf perbaikan sudah siap di `docs/laporan/`, tinggal dipindahkan |

**Yang paling mendesak:** (1) **konfirmasi angka 35 vs 27 responden** (§4.17/§6) — satu-satunya
inkonsistensi `TERBARU.docx` yang masih tersisa; (2) **putuskan apakah `docs/laporan/BAB-V/VI-LENGKAP.md`
yang sudah direvisi (2 tujuan, 4 tahap HCD, tanpa rujukan Subbab) perlu disebarkan ke `TERBARU.docx`**
(§4.18–§4.19, §6) — saat ini isi keduanya sengaja dibiarkan berbeda konvensi menunggu keputusan Anda;
(3) **commit & deploy perbaikan `AdminController.php`** (§4.7) — sudah teruji lokal tapi belum sampai
ke situs live; (4) memastikan surel reset kata sandi terkirim dari peladen (§5 butir lama 1);
(5) eksekusi nyata `TESTING.md` dan `docs/PDHUPL.md` supaya Bab V laporan punya angka hasil sungguhan,
bukan rencana uji kosong.

> **Tambahan 4–5 Okt (sesi chat terakhir sebelum pindah room):** (a) **cek folder `REVISI/`** dan
> tentukan `.docx` mana yang aktif (§6); (b) angka responden kuesioner kebutuhan **tidak hanya beda di
> Word, tapi juga di repo**: `BAB-IV-LENGKAP.md` memakai **27**, `BAB-V/VI-LENGKAP.md` memakai **35** —
> harus dipastikan dari data mentah Google Form (§4.20, §6); (c) paragraf Bab IV 4.5.2 sudah dirapikan
> di chat tapi **belum diterapkan** ke `BAB-IV-LENGKAP.md` (§4.20).

---

## 2. Cara menjalankan (dev, Windows + Laragon)

```bash
# 0. MySQL Laragon (porta 3307) — nyalakan lewat Laragon, atau:
"C:/laragon/bin/mysql/mysql-8.0.30-winx64/bin/mysqld.exe" --defaults-file="C:/laragon/bin/mysql/mysql-8.0.30-winx64/my.ini"

# 1. Backend
cd tugas_akhir
php artisan serve              # http://127.0.0.1:8000   (PHP: C:\laragon\bin\php\php-8.3.13-nts-Win32-vs16-x64)

# 2. Frontend
cd frontend_karinakas
npm run dev                    # http://localhost:5173

# Bila skema berubah / baru clone
php artisan migrate            # JANGAN migrate:fresh
php artisan storage:link
```

- Gejala **"semua data kosong / 500"** di lokal hampir selalu karena **MySQL mati**.
- `php artisan serve` **memuat ulang otomatis bila `.env` berubah** — permintaan yang sedang berjalan bisa terputus.
- Untuk menguji surel tanpa mengirim sungguhan: set sementara `MAIL_MAILER=log`, isi surel masuk `storage/logs/laravel.log`.

---

## 3. Riwayat pengerjaan (kronologis)

| # | Tanggal | Pekerjaan |
|---|---|---|
| 1 | Mei–Jun | UI frontend awal memakai `localStorage`; backend Laravel belum bisa jalan |
| 2 | Jun | **Backend diperbaiki total** (Sanctum, rute, model, CORS, middleware `role`, `Gate::before`, migrasi, seeder) |
| 3 | Jun–Jul | **Integrasi frontend → API** modul demi modul lewat `api.js`, `resources.js`, `useResource` |
| 4 | Jul–Agu | Fitur: donasi + bukti, donasi wajib kegiatan, galeri album + lightbox + unggah massal, opsi relawan per kegiatan, surel relawan diterima, intro screen, tampilan ramah lansia |
| 5 | Agu | **QRIS statis** + transfer bank; ekspor rekap **Excel** (`utils/excel.js`) |
| 6 | Agu | `TESTING.md`, naskah **SKPL** Bab I–III |
| 7 | 22–23 Agu | Audit kode: `min:8` semua jalur, pembatasan laju, pemulihan sandi nyata (versi OTP), `SESSION_DRIVER=file`, **formulir Kontak dihapus** (diganti WhatsApp), perbaikan counter relawan |
| 8 | 25–26 Agu | Naskah **DPPL** Bab 1, 2.1, 2.2, 2.3 + `class-diagram.drawio`, `pdm-diagram.drawio` |
| 9 | 28 Agu | `SKENARIO-TUGAS.md` (uji kebergunaan + SUS) |
| 10 | 29 Agu | Penyaring kegiatan & tanggal di admin; data kontak & rekening resmi yayasan |
| 11 | 30 Agu | Verifikasi DPPL 2.3 langsung ke MySQL (116 medan cocok) |
| 12 | 31 Agu | **Hosting pertama:** 5 berkas PHP tak PSR-4 → 500 di Linux (diganti nama); `VITE_API_URL` kurang `/v1` → 404 |
| 13 | 1 Sep | **Black-box testing lewat API (~80 pemeriksaan)** — temuan di §4.1; DPPL 2.3.2 dipecah jadi berkas sendiri |
| 14 | 14 Sep | Revisi pascahosting: penyaring **bulan**, muat semua halaman, logo & favicon, Linktree, **alamat & peta Sleman**; **Opsi A kunci donasi** |
| 15 | 15 Sep | Audit dokumen fitur audit log / manajemen pengguna / ekspor terhadap laporan TA, SKPL, DPPL |
| 16 | 16 Sep | **Reset sandi via tautan** (OTP dihapus), petunjuk akun admin dihapus dari Login, **WhatsApp otomatis ditiadakan**, pembatas laju bernama, `.htaccess` SPA |
| 17 | 16–17 Sep | Surel: Resend → **SMTP kotak surel hosting** `noreply@karinakas.com`; verifikasi situs live |
| 18 | 19 Sep | **Perbaikan celah manajemen pengguna**: `AdminController::users()` dan `deleteUser()` diberi `isSuperAdmin()`, diuji API+MySQL (§4.7) — **belum di-commit** |
| 19 | 19–20 Sep | **Sinkronisasi SKPL/DPPL menyeluruh** terhadap kode nyata: hapus klaim Blade PHP & ekspor PDF, betulkan 65→66 titik akhir, tambah **UC-24 Memulihkan Kata Sandi** (diagram + spesifikasi + `use-case-diagram.drawio`), persempit NFR 3.4.4.8 agar sesuai FR 516, perbaiki 5 kelas hilang di ringkasan diagram kelas DPPL (§4.8) |
| 20 | 21–25 Sep | **Draf Bab IV laporan TA lengkap** — 5 *user persona* dari 27 data kuesioner nyata, *pain points*, kebutuhan fungsional/nonfungsional diperbaiki, arsitektur & desain visual dikoreksi, evaluasi mockup *high-fidelity* (masukan warna & ukuran huruf dari Karinakas), kode fungsi utama — ditulis di `docs/laporan/4.3-4.4-Perancangan-Implementasi-Pengujian.md` (§4.9) |
| 21 | 26 Sep | **PDHUPL disusun** (`docs/PDHUPL.md`) — 67 kasus uji kotak hitam asli disinkronkan ke kode nyata (peran Super Admin pada Donasi/Pengguna, nilai enum status), 6 kasus baru ditambahkan (reset sandi, audit, notifikasi); **skor SUS nyata dihitung dari 40 responden: 72,56** (§4.10) |
| 22 | 26 Sep | **Format PDHUPL disamakan** dengan contoh PDHUPL teman penyusun (SIGO Dental) — Bab 3.1 diberi kolom Tingkat/Jenis Pengujian, Bab 4 dipecah satu subbab per butir uji, Bab 5 diberi kolom Kriteria Evaluasi Hasil + prosedur berlangkah; catatan kerja dipisah ke `docs/PDHUPL-CATATAN.md` |
| 23 | 28 Sep | **Bab 5 PDHUPL diisi via penelusuran kode** (bukan eksekusi langsung) — 85→**88 butir** setelah menambah 3 butir negatif yang kelewatan (AD-28N, AD-30N, AD-32N); ditemukan **UT-03 Tidak Handal** (validasi 16 digit KTP tak ditegakkan); lokasi tempel *screenshot* kuesioner + cara ekspor data mentah SUS ditambahkan ke Bab 6 (§4.11) |
| 24 | 28 Sep | **PDHUPL dicocokkan dengan SKPL Word `Aaron (2).pdf`** (memuat FR 213/UC-24): awalan kode **FR SIKAS → FR Karinakas**; SR-12 → FR 202, PU-04 → FR 106, PU-07 +FR 111, AD-09 +FR 406, AD-33/35 +FR 513; AD-33/AD-35 diperbaiki (tombol ekspor rekap **hanya super admin**). **Temuan utama:** FR 509/511 dan UC-16 pada SKPL Word masih menyebut admin ikut memverifikasi/menghapus donasi, bertentangan dengan kode Opsi A dan butir AD-14N/15N — SKPL Word perlu diperbarui. Rincian, asal kode SR/AD/UT, dan status backend `9582191` ada di `docs/PDHUPL-STATUS-DAN-KODE.md`. Berkas `.md` SKPL/DPPL belum disinkronkan awalannya |
| 25 | 29 Sep | **Kesalahan pada PDHUPL Word ("PDHUPL FX.pdf") ditemukan dan dicek balik ke `docs/PDHUPL.md`:** Bab 4.6 pada Word itu kurang 3 subbab (AD-28N, AD-30N, AD-32N) dan salah tulis "12 butir uji" (seharusnya 15) — **`docs/PDHUPL.md` sudah benar**, jadi Word itu ternyata ekspor lama, bukan `.md` yang salah. Ditemukan pula typo "epran" → "peran" di Word (tidak ada di `.md`). **Bab 4 laporan TA dikonsolidasi** jadi `docs/laporan/BAB-IV-LENGKAP.md`: 5 rujukan "FR SIKAS" tersisa diganti "FR Karinakas" (di dua berkas draf lama sekaligus), gaya "naskah sebelumnya keliru..." ditulis ulang jadi prosa langsung tanpa mengubah fakta, dan jumlah antarmuka diputuskan **24** (rekomendasi lama, belum pernah dieksekusi) |
| 26 | 29–30 Sep | **`docs/PDHUPL.md` Bab 6 dilengkapi data mentah SUS.** Data jawaban P1–P10 milik 40 responden (yang sebelumnya diminta diekspor manual via CSV) ternyata sudah tersedia — sempat tersalin ke PDHUPL Word ("PDHUPL FX.pdf") tapi belum pernah dibawa balik ke `docs/PDHUPL.md`. Ditambahkan Bab 6.2 (10 pernyataan SUS), 6.3 (jawaban mentah per responden, dua tabel), 6.4 (rekapitulasi per pernyataan — distribusi 1–5, rata-rata, kontribusi); Bab 6.2–6.4 lama diberi nomor baru 6.5–6.7. Seluruh angka dicocokkan ulang terhadap skor akhir di 6.5/6.6 sebelum ditulis (tidak ada beda). Dikonfirmasi ke penyusun: `docs/PDHUPL.md` **tidak** punya bagian "Daftar Revisi" (beda dari templat Word resmi) — kerangkanya ditawarkan tapi belum ditambahkan, menunggu keputusan |
| 27 | 30 Sep | **Perbaikan validasi nomor KTP relawan (menutup UT-03).** `RelawanController::store` diubah dari `nomor_ktp` => `nullable\|string\|max:20` menjadi `required\|digits:16`; `DaftarRelawan.jsx` diberi `required`, `minLength`/`maxLength={16}`, `pattern="\d{16}"`, dan pemeriksaan panjang sisi klien sebelum kirim. Kolom `nomor_ktp` di tabel `relawan` **tetap nullable** (tidak ada migrasi) supaya baris lama tak terdampak — hanya pendaftaran baru yang kini wajib 16 digit. `docs/PDHUPL.md` (UT-03), `docs/PDHUPL-CATATAN.md`, `docs/PDHUPL-STATUS-DAN-KODE.md` diperbarui dari Tidak Handal menjadi Handal. **Belum di-commit/deploy.** |
| 28 | 30 Sep | **Bab V laporan TA disusun pertama kali** (`docs/laporan/BAB-V-LENGKAP.md`, §4.14) — ditemukan bahwa Bab V pada `docs/LAPORAN TUGAS AKHIR.docx` ternyata masih 100% teks instruksi templat kampus (belum pernah ditulis penyusun), bukan sekadar "kurang detail". Naskah baru disusun dari bahan yang sudah ada: `BAB-IV-LENGKAP.md` dan `docs/PDHUPL.md`, mengikuti struktur pembanding contoh PDHUPL teman (walkthrough per-antarmuka + rekap pengujian + tabel SUS + pembahasan yang menjawab tujuan penelitian) |
| 29 | 30 Sep | **Bab V diperdalam per permintaan penyusun** (`docs/laporan/BAB-V-LENGKAP.md`, §4.14) — kedua puluh subbab 5.2.1 diperluas dari 2–4 kalimat menjadi beberapa paragraf dengan rincian kolom data model, aturan ON DELETE, dan kaitan eksplisit ke persona Bab IV. **Bab VI (Kesimpulan dan Saran) disusun pertama kali** (`docs/laporan/BAB-VI-LENGKAP.md`, §4.15) — sama seperti Bab V, Bab VI pada `docs/LAPORAN TUGAS AKHIR.docx` juga masih teks templat; naskah baru menyintesis kesimpulan dari 3 tujuan penelitian dan menyusun saran dua audiens (pengembang selanjutnya, pihak Karinakas) dari temuan nyata §5/§6, bukan saran generik |
| 30 | 1–2 Okt | **Bab VI ditulis ulang dengan nada *forward-looking*** (§4.15) — penyusun meminta saran tidak terkesan "menjatuhkan" progres proyek. Kesimpulan dan kelima belas butir Saran disusun ulang: dibuka dengan capaian ("berhasil mencapai ketiga tujuan"), dan tiap butir saran diubah dari bingkai "perbaiki celah/belum selesai" menjadi "lanjutkan/perkuat/tingkatkan" — **substansi teknis tiap butir tidak berubah sama sekali**, hanya framing-nya. Bab V sengaja **tidak** ikut diubah karena pengakuan keterbatasan pengujian di sana memang harus apa adanya. `HANDOFF.md`/`CONTEXT.md` disinkronkan ulang agar siap dipakai di room chat baru. |
| 31 | 2 Okt | **Ditemukan `TERBARU.docx` (di luar repo) jauh lebih maju** dari ketiga draf `.md` — sudah punya 43 screenshot nyata dan Bab I 2 tujuan, tapi punya 3 inkonsistensi nyata (§4.16). |
| 32 | 2 Okt (malam) | **2 dari 3 inkonsistensi diperbaiki langsung di `TERBARU.docx`** lewat unzip + sunting `word/document.xml` + zip ulang (§4.17) — ditemukan juga bug isi lebih serius di sana (5.2.1.19 "Riwayat Notifikasi" ternyata salinan persis "Kelola Pengguna"; paragraf 5.2.2 rusak teknis, hilang huruf "L" dari "PDHUPL"), ikut diperbaiki. Backup pra-sunting dibuat sebelum menimpa berkas hidup. |
| 33 | 2–3 Okt | **`docs/laporan/BAB-V-LENGKAP.md` dan `BAB-VI-LENGKAP.md` direvisi terpisah** atas permintaan penyusun (§4.18–§4.19): kerangka 3 tujuan → 2 tujuan, Pembahasan Bab V kini menelusuri **4 tahap HCD (ISO 9241-210)** eksplisit dengan buktinya masing-masing, **seluruh rujukan "(Subbab X.Y)" dihapus** (±63 kemunculan, kode butir uji PU-xx/AD-xx dst. dipertahankan), dan paragraf "Tujuan kedua" (usability) ditulis ulang agar tidak membandingkan skor SUS dengan studi lain — paragraf "Keterbatasan sistem" dihapus dari Pembahasan karena isinya sudah tercakup di Saran Bab VI. Kedua `.md` ini sekarang **sengaja berbeda konvensi** dari `TERBARU.docx`, menunggu keputusan apakah perlu disebarkan ke sana juga. |
| 34 | 4–5 Okt | **Grafik SUS dipindah ke Pembahasan Bab V + paragraf Bab IV 4.5.2 dirapikan** (§4.20): penanda gambar 5.21–5.30 dihapus dari Hasil 5.2.3 dan dijelaskan satu per satu di Pembahasan 5.2.4 (`BAB-V-LENGKAP.md`), seluruh persentase dicocokkan ke data mentah PDHUPL Bab 6.4; paragraf 4.5.2 ("dibakar" dst.) ditulis ulang dan diverifikasi ke kode; folder `REVISI/` ditemukan; konflik 35 vs 27 responden terlacak ke repo. |

---

## 4. Keputusan & perubahan penting (perlu diketahui sebelum menyentuh kode)

### 4.1 Hasil black-box testing 1 September
**Terbukti handal:** penyamaran nominal donasi, invarian counter relawan (0→0→1→0), 6 aturan validasi donasi,
opsi relawan per kegiatan, proteksi 401, pembatasan laju, CRUD kegiatan & berita, jejak audit & notifikasi, logout
mencabut token. **Temuan yang masih terbuka** tercantum di §5.

### 4.2 Kunci data keuangan donasi — Opsi A (14 Sep)
- **Keputusan penyusun:** verifikasi donasi **khusus super admin** (bendahara). Alasan: memverifikasi berarti
  mencocokkan bukti dengan mutasi rekening, dan pemegang rekening pasti melihat nominal.
- Sebelum perbaikan ditemukan 4 kebocoran, termasuk `/admin/donasi/search` yang tidak menyamarkan apa pun dan
  `PUT /admin/donasi/{id}` tanpa cek peran di server.
- Kode: `DonasiController::sembunyikanKeuangan()` + `wajibSuperAdmin()`; `SectionDonasi.jsx` menyembunyikan
  aksi keuangan dari admin. **Diuji 18/18 lulus.**
- Dokumen yang ikut diubah: SKPL (F-15, F-19, FR 508–513, AK-03/04, UC-16, NFR 3.4.4.4, Lampiran B), diagram use
  case, DPPL (definisi peran, DonasiController), TESTING (TC-ADN-10–12), SKENARIO (B4 jadi tugas super admin).

### 4.3 Revisi pascahosting (14 Sep)
- Dua kotak tanggal di admin (sebenarnya satu rentang) → **satu pilihan Bulan**; pengelompokan memakai jam lokal.
- `DonasiController::index` dulu mengabaikan `per_page` sehingga daftar & ekspor **diam-diam berhenti di 20 baris**
  → klien kini `ambilSemuaHalaman()`, server menerima `per_page` 1–100.
- Logo hati → logo Karinakas (Login/Register/Forgot); favicon bawaan Vite diganti; ikon Linktree jadi SVG.
- Alamat Footer & Kontak salah (Semarang / "Jl. Panuluh") → dipusatkan di `src/data/lembaga.js`.

### 4.4 Pemulihan kata sandi berbasis tautan (16 Sep)
- **Tidak ada lagi OTP maupun WhatsApp.** Pengguna mengisi email → menerima tautan → mengeklik → mengisi sandi baru.
- BE: `forgotPassword`, `checkResetToken`, `resetPassword` + privat `kunciToken`, `kunciTokenPengguna`,
  `ambilDataTautan`; `app/Mail/TautanResetSandi.php`; `config('app.frontend_url')`. Berkas `KodeOtpReset` dihapus.
- FE: `ForgotPassword.jsx` (satu langkah) + halaman baru `ResetPassword.jsx` di rute `/reset-password`.
- **Diuji 13/13 lulus** (token benar/palsu, surel tak cocok, tautan lama dibatalkan, sekali pakai, sandi < 8, login).
- **Temuan saat pengujian:** `throttle:5,1` polos berbagi jatah antar semua rute autentikasi, sehingga memuat ulang
  halaman reset bisa memblokir login → diganti pembatas bernama `masuk`, `lupa-sandi`, `reset-sandi`.
- Dokumen: SKPL FR 213, antarmuka 12a/12b, NFR 3.4.4.5; DPPL 2.2 (72 → **75** tabel fungsi); TESTING (**181** kasus).

### 4.5 Pemberitahuan khusus surel (16 Sep)
- Pencatatan `NotifikasiLog` berkanal `whatsapp`, fungsi `kirimWhatsApp()`, dan parameter `$channel` dihapus.
- Tombol WhatsApp di **Footer dan Kontak tetap ada** — itu kanal tanya-jawab pengunjung, bukan notifikasi otomatis.

### 4.6 Perjalanan konfigurasi surel (16–17 Sep)
1. Semula **Resend** dengan pengirim `onboarding@resend.dev` → hanya bisa mengirim ke **pemilik akun Resend**,
   sehingga pengguna lain tidak pernah menerima surel. Inilah penyebab reset gagal di situs live.
2. Penyusun memberi kotak surel **`noreply@karinakas.com`**. DNS menunjukkan kotak surel **hosting (cPanel)**,
   bukan Gmail → tidak perlu App Password.
3. Diuji dari luar: porta **587 + `smtp`** dan **465 + `smtps`** sama-sama lolos autentikasi; Laravel lokal berhasil
   mengirim; kata sandi terbaca utuh 16 karakter.
4. Situs live diverifikasi memakai backend & frontend terbaru (`/reset-password/check` → 422, `/verify-otp` → 404).
5. **Penyusun melaporkan reset masih gagal dari situs live.** Saran terakhir: pakai **465 + `MAIL_SCHEME=smtps`**
   (hosting bersama sering memblokir 587), pastikan `MAIL_PASSWORD` dikutip, tidak ada baris `MAIL_*` ganda,
   `FRONTEND_URL=https://karinakas.com`, lalu `php artisan config:clear`. **Belum ada kabar hasilnya.**

### 4.7 Perbaikan celah manajemen pengguna (19 Sep)
- **Akar masalah:** `AdminController::users()` dan `deleteUser()` memakai `$this->authorize()` bawaan Laravel,
  yang selalu lolos untuk admin **dan** super admin karena `Gate::before`. Admin biasa bisa membaca seluruh
  daftar akun dan menghapus akun pengguna — padahal `donasi.user_id` memakai `ON DELETE CASCADE`, sehingga
  menghapus akun ikut melenyapkan riwayat donasi milik akun itu.
- **Perbaikan:** kedua fungsi kini memakai pemeriksaan manual `isSuperAdmin()`, pola yang sama dengan
  `storeUser`/`updateUser`/`resetUserPassword` yang sejak awal sudah aman. `deleteUser` diberi parameter
  `Request $request` agar bisa memanggil `$request->user()`.
- **Diuji nyata 19–20 Sep** lewat API sungguhan: admin menerima 403 pada `GET /admin/users` dan
  `DELETE /admin/users/{id}`; keberadaan baris di basis data diverifikasi langsung (bukan lewat percobaan
  login, yang sempat memberi hasil menyesatkan karena kena pembatas laju `masuk`). Super admin tetap berhasil.
- **Status:** perbaikan ini **hanya ada di berkas lokal**, belum di-commit maupun di-deploy. DPPL Subbab 2.2.2
  (`users()`, `deleteUser()`) dan `docs/dppl/CHECKLIST.md` sudah diperbarui mengikuti kode yang benar.

### 4.8 Sinkronisasi SKPL/DPPL terhadap kode nyata (19–20 Sep)
Pemeriksaan menyeluruh menemukan naskah SKPL/DPPL (baik `docs/skpl/`, `docs/dppl/`, maupun `SKPL.md`/`DPPL.md`)
berbeda dari kode yang sesungguhnya berjalan pada beberapa hal:
- **§2.3.2 DPPL salah menyebut "Hybrid REST API dan Blade PHP"** — kenyataannya Blade hanya dipakai untuk dua
  templat email, seluruh halaman publik murni React SPA. Diperbaiki, disamakan dengan §4.4.2 yang sudah benar.
- **Klaim ekspor "PDF dan Excel"** — sistem hanya menghasilkan **Excel** (`.xls`), dibentuk sisi klien. Ekspor
  sisi server (`exportRekapan`) tidak pernah selesai, `download_url` selalu kosong.
- **Jumlah titik akhir 65 → dikoreksi jadi 66** (64 fungsional + 2 *webhook*), dihitung ulang langsung dari
  `routes/api.php`.
- **UC-24 Memulihkan Kata Sandi ditambahkan** — sebelumnya FR SIKAS 213 (pemulihan kata sandi) tidak punya
  padanan *use case* sama sekali. Ditambahkan ke `use-case-diagram.drawio` (simpul, asosiasi aktor, relasi
  «include» ke UC-22) dan ke tabel penelusuran SKPL 3.3.4. Total use case: 23 → **24**.
  Total FR tetap 71.
- **NFR 3.4.4.8 dipersempit** agar sesuai cakupan FR SIKAS 516 yang sejak awal memang hanya menuntut pencatatan
  pada tindakan transaksional dan akun — bukan seluruh tindakan pengelola. Ini menutup kesenjangan lama (11
  fungsi kegiatan/berita/galeri tidak tercatat jejak auditnya) **lewat dokumen**, bukan menambah kode.
- **CORS diperbaiki** — SKPL sebelumnya menyatakan *frontend*/*backend* selalu lintas asal; kenyataannya di
  produksi keduanya satu domain (`karinakas.com`), sehingga CORS hanya relevan di lingkungan pengembangan.
- **Diagram kelas DPPL kehilangan 5 kelas** (`BeritaDetailView`, `TentangKamiView`, `KontakView`,
  `SectionBeritaView`, `SectionNotifikasiView`) pada ringkasan Mermaid — sudah ditambahkan beserta garis
  penghubungnya. Ditambahkan pula catatan bahwa `ForgotPasswordView` mewakili dua berkas halaman
  (`ForgotPassword.jsx` + `ResetPassword.jsx`) sebagai satu kelas.

### 4.9 Draf Bab IV Laporan TA (21–25 Sep)
Seluruh subbab yang diminta dosen pembimbing untuk Bab 4.3 (Perancangan Sistem) dan 4.4 (Implementasi dan
Pengujian) sudah ditulis lengkap dalam bentuk narasi (bukan poin-poin) di
**`docs/laporan/4.3-4.4-Perancangan-Implementasi-Pengujian.md`**, meliputi:
- **5 *user persona*** (Dina, Bimo, Pak Herman, Wulan, Reno) disusun dari klaster nyata pada 27 data kuesioner
  analisis kebutuhan (bukan kuesioner SUS pada §4.10 — dua instrumen berbeda), dengan kerangka atribut yang
  seragam (Demografi, Perilaku Digital, Tujuan, *Pain Points*, Kebutuhan, Kutipan, Relevansi Rancangan).
- Kebutuhan fungsional/nonfungsional yang diperbaiki (gabung "lupa/reset sandi" jadi satu alur, hapus klaim
  PDF, tambah kunci keuangan donasi & jejak audit yang sebelumnya tak disebut).
- Evaluasi mockup *high-fidelity*: pihak Karinakas meminta warna diredupkan dan huruf diperbesar. Diverifikasi
  ke kode — huruf **sudah** 18,5px, merah **sudah** diredupkan (`#C0392B`), tetapi **kuning aksen `#FFD700`
  belum ditindaklanjuti** (lihat §5 butir baru).
- Evaluasi *low-fidelity* **masih kosong** — menunggu catatan tinjauan wireframe yang sesungguhnya dari
  penyusun, sengaja tidak diisi konten karangan.

### 4.10 PDHUPL & hasil SUS nyata (26 Sep)
- **`docs/PDHUPL.md`** dibuat mengikuti kerangka resmi (Bab 1–5) + Bab 6 SUS, menyinkronkan 67 kasus uji kotak
  hitam asli penyusun (`TC_Blackbox_Testing_Karinakas.pdf`) ke kode nyata. Temuan penting: kasus **AD-14/15
  (ubah/hapus donasi)** dan **AD-27…32 (kelola pengguna)** pada berkas asli mensyaratkan "Login sebagai Admin",
  padahal keduanya **khusus Super Admin** sejak Opsi A dan perbaikan §4.7 — diperbaiki, ditambah kasus negatif
  (AD-14N, AD-15N, AD-29N, AD-31N) yang menguji admin **ditolak**. Nilai enum status juga diperbaiki
  (`pending/berhasil/gagal` untuk donasi, `pending/diterima/ditolak` untuk relawan — bukan istilah bebas di
  berkas asli). Ditambahkan 6 kasus uji baru untuk fitur yang sama sekali belum tercakup: pemulihan kata sandi
  (RP-01…03), jejak audit (AL-01/02), riwayat notifikasi (NL-01).
- **Kolom hasil pada PDHUPL sengaja dikosongkan (🔲)** — berkas asli penyusun juga belum berisi hasil apa pun,
  jadi ini rencana uji yang belum dieksekusi, bukan hasil yang sudah jadi.
- **Skor SUS dihitung nyata dari 40 responden** (kuesioner `Kuesioner Pengujian Fungsionalitas dan Usability
  Website Karinakas`, disebar 3–26 Sep 2026) — **bukan** kuesioner 27-responden di §4.9. Hasil: Pengunjung
  Umum (n=29) 71,38 · Admin & Super Admin (n=11) 75,68 · **gabungan 72,56** — di atas ambang 68, kategori
  "Baik"/*Acceptable*. Satu responden menjawab "Sangat Setuju" ke seluruh 10 butir (termasuk yang negatif),
  pola *straight-lining* yang justru menurunkan skornya jadi 50 — dicatat sebagai catatan analisis jujur,
  bukan disembunyikan.

### 4.11 Bab 5 PDHUPL diisi via penelusuran kode & simetri butir negatif diperbaiki (26–28 Sep)
- Atas permintaan penyusun, kolom "Hasil yang Didapat"/"Kesimpulan" Bab 5 (yang sebelumnya sengaja dikosongkan,
  lihat §4.10) kini diisi lewat **penelusuran kode statis** — membaca langsung `app/Http/Controllers/*.php` dan
  berkas React terkait, mencocokkan pesan/kode HTTP/perilaku terhadap "Keluaran yang Diharapkan" tiap butir.
  **Ini bukan eksekusi dinamis ke `karinakas.com`** — perbedaan metode ini dicatat di awal Bab 5 pada
  `docs/PDHUPL.md` dan di `docs/PDHUPL-CATATAN.md`, supaya jelas ke dosen pembimbing bila ditanya.
- **Temuan: UT-03 (validasi 16 digit KTP) = Tidak Handal.** `DaftarRelawan.jsx` hanya membatasi
  `maxLength={16}` (batas maksimum, bukan mewajibkan tepat 16 digit) dan `RelawanController::store` memvalidasi
  `nomor_ktp` sebagai `nullable|string|max:20` tanpa aturan panjang sama sekali — nomor KTP kurang dari 16 digit
  tetap dapat dikirim dan tersimpan. Ini bukan salah tulis dokumen, memang begitu perilaku kodenya (konsisten
  dengan temuan lama §5 butir 14 di bawah).
- **Simetri butir negatif diperbaiki.** Ternyata AD-27/28 (tambah pengguna), AD-30 (ubah data pengguna), dan
  AD-32 (reset kata sandi) sama-sama dibatasi `isSuperAdmin()` di kode seperti AD-29/AD-31, tapi kelewatan
  tidak diberi pasangan butir "(negatif)" saat PDHUPL pertama kali disusun (§4.10) — murni salinan cakupan dari
  `TC_Blackbox_Testing_Karinakas.pdf` yang memang hanya mengoreksi AD-14/15 dan AD-29/31. Ditambahkan **AD-28N,
  AD-30N, AD-32N**; total butir uji naik dari 85 menjadi **88**.
- **Bab 6 SUS dilengkapi lokasi tempel *screenshot* kuesioner** dan cara mengekspor data mentah Google Form
  (Responses → Download .csv) untuk melengkapi tabel jawaban per butir (P1–P10) — data mentah itu tidak ada
  di folder proyek, hanya skor akhir yang tersimpan.
- **Pesan validasi berbahasa Inggris ditemukan** pada SR-12 (email duplikat), RP-04 (email tidak terdaftar),
  dan AD-37 (tanggal kegiatan) — ketiganya memakai pesan bawaan Laravel (`unique`, `exists`, `after_or_equal`),
  bukan pesan Indonesia kustom seperti tempat lain di kode. Belum diperbaiki, dicatat sebagai temuan.
- Rincian lengkap ada di `docs/PDHUPL-CATATAN.md` (bagian "Bab 5 kini sudah terisi").

### 4.12 Verifikasi silang PDHUPL Word, konsolidasi Bab IV, dan pelengkapan Bab 6 SUS (29–30 Sep)
- **PDHUPL Word ("PDHUPL FX.pdf") diverifikasi terhadap `docs/PDHUPL.md`.** Ditemukan dua kekeliruan pada Word
  itu: Bab 4.6 kurang 3 subbab (AD-28N, AD-30N, AD-32N — padahal ketiganya sudah ada di Bab 3.1 dan Bab 5 versi
  Word yang sama) dan salah tulis "meliputi 12 butir uji" (seharusnya 15, konsisten dengan total 88). Setelah
  dicek balik, **`docs/PDHUPL.md` sudah benar di kedua titik itu** — Word yang diserahkan penyusun ternyata
  ekspor lama, dari sebelum ketiga subbab ditambahkan (§4.11). Kesimpulannya: ekspor ulang `docs/PDHUPL.md` ke
  Word, jangan pakai salinan Word yang lama. Ditemukan pula salah ketik "epran" → "peran" pada Word (tidak ada
  di `.md`).
- **Bab IV laporan TA dikonsolidasi** menjadi `docs/laporan/BAB-IV-LENGKAP.md`, siap tempel ke Word:
  - 5 rujukan **"FR SIKAS"** yang tersisa di draf lama (`docs/laporan/4.3-4.4-...md` dan
    `4.3-Prototipe-dan-Evaluasi-Desain.md`) diganti **"FR Karinakas"** — persona Bimo (FR 512), persona Wulan
    (FR 102), *pain points* dan bagian prototipe (FR 104/109–110).
  - **Gaya "catatan revisi"** yang tersebar di banyak subbab (kalimat pola "naskah sebelumnya menyebutkan X,
    ini tidak sesuai kode, berikut yang benar") ditulis ulang jadi prosa akademik langsung, tanpa mengubah
    fakta apa pun di dalamnya — kalimat semacam itu membocorkan riwayat draf ke pembaca skripsi dan janggal
    untuk naskah akhir.
  - Penomoran subbab disamakan dengan Word (4.1 Pengantar … 4.6 Evaluasi Sistem), mengikuti struktur yang
    sudah dipakai penyusun, bukan penomoran datar 4.3.x/4.4.x pada draf lama.
  - **Jumlah antarmuka diputuskan 24** (11 publik, 5 pengguna terdaftar, 8 admin) — rekomendasi lama (§5 butir
    15 versi sebelumnya) yang belum pernah benar-benar dijalankan, sekarang dipakai langsung di naskah. **SKPL
    dan DPPL belum ikut disamakan ke angka ini.**
- **`docs/PDHUPL.md` Bab 6 (SUS) dilengkapi data mentah.** Sebelumnya Bab 6 hanya memuat skor SUS akhir per
  responden dan meminta penyusun mengekspor CSV dari Google Form untuk data mentah P1–P10. Data itu ternyata
  **sudah ada** — sempat masuk ke PDHUPL Word ("PDHUPL FX.pdf") tapi tidak pernah dibawa balik ke `docs/PDHUPL.md`.
  Ditambahkan: **6.2** 10 pernyataan SUS baku, **6.3** jawaban mentah 40 responden (dua tabel, Pengunjung Umum &
  Admin/Super Admin), **6.4** rekapitulasi per pernyataan (distribusi skor 1–5, rata-rata jawaban, rata-rata
  kontribusi). Subbab lama 6.2–6.4 (Hasil SUS per kelompok, Rekapitulasi) diberi nomor baru **6.5–6.7**. Seluruh
  angka mentah dicocokkan ulang terhadap skor akhir yang sudah ada sebelum ditulis (tidak ada selisih).
- **Dikonfirmasi:** `docs/PDHUPL.md` **tidak** memiliki bagian "Daftar Revisi" (tabel Revisi A–F + Ditulis/
  Diperiksa/Disetujui oleh), berbeda dari templat Word resmi kampus yang punya halaman itu (kosong di templat).
  Wajar karena PDHUPL belum pernah direview dosen pembimbing — kerangkanya ditawarkan ke penyusun tapi **belum**
  ditambahkan, menunggu keputusan.

### 4.13 Perbaikan validasi nomor KTP relawan (30 Sep)
- **Akar masalah (temuan §4.11, UT-03):** `RelawanController::store` memvalidasi `nomor_ktp` sebagai
  `nullable|string|max:20` (tanpa aturan panjang), dan `DaftarRelawan.jsx` hanya membatasi `maxLength={16}`
  (batas maksimum, bukan mewajibkan tepat 16 digit) — nomor KTP kosong atau kurang dari 16 digit tetap bisa
  dikirim dan tersimpan, bertentangan dengan label formulir yang menjanjikan "16 digit".
- **Perbaikan backend:** `nomor_ktp` diubah jadi `required|digits:16` — menolak kosong, bukan-angka, atau
  bukan tepat 16 digit dengan HTTP 422.
- **Perbaikan frontend:** input diberi atribut `required`, `minLength={16}`, `maxLength={16}`,
  `pattern="\d{16}"`, serta pemeriksaan `form.ktp.length !== 16` sebelum mengirim (pesan Indonesia
  "Nomor KTP harus diisi tepat 16 digit."), dan pembersihan input dipotong ke 16 karakter di `onChange`.
  Label diubah dari "(opsional, 16 digit)" menjadi wajib bertanda `*`.
- **Keputusan skema:** kolom `nomor_ktp` di tabel `relawan` **tetap `nullable`** — tidak ada migrasi basis
  data. Ini murni perbaikan validasi aplikasi; baris lama yang sudah terlanjur kosong/tidak lengkap tidak
  disentuh, hanya pendaftaran baru yang wajib mengikuti aturan ini.
- **Status:** perbaikan ini **hanya ada di berkas lokal**, belum di-commit maupun di-deploy — sama seperti
  perbaikan §4.7, tinggal dikirim ke `karinakas.com`. Belum diuji lewat panggilan API sungguhan (baru
  ditelusuri kodenya); disarankan uji manual sebelum atau sesudah deploy: kirim `nomor_ktp` kosong dan
  15-digit lewat `POST /relawan`, harus 422.
- **Dokumen yang ikut diperbarui:** `docs/PDHUPL.md` (UT-03: Tidak Handal → Handal), `docs/PDHUPL-CATATAN.md`,
  `docs/PDHUPL-STATUS-DAN-KODE.md` (ringkasan Bab 5 dan tabel tindakan).

### 4.14 Bab V laporan TA disusun pertama kali (30 Sep)
- **Penyusun membandingkan Bab V miliknya dengan contoh milik teman** (Putra Palampang Tarung,
  Bab V "SIGO Dental" — walkthrough per-fitur dengan screenshot, hasil pengujian 144 butir, tabel SUS
  per responden, pembahasan yang mengaitkan ke Bab I/II) dan bertanya kenapa punya sendiri "sangat simpel".
- **Diagnosis setelah membuka `docs/LAPORAN TUGAS AKHIR.docx`:** Bab V pada berkas itu **bukan simpel,
  tapi memang belum pernah ditulis** — isinya 100% teks instruksi templat kampus ("Subbab ini berisi
  pemaparan hasil... Mahasiswa wajib menyajikan hasil secara faktual..."), bukan konten Karinakas. Bagian
  akhir Bab IV (Perancangan Sistem/Implementasi dan Pengujian/Evaluasi Sistem) di berkas yang sama juga
  masih placeholder — hanya Identifikasi Masalah s.d. Daftar Aktor Sistem yang sudah diisi nyata. Ini
  konsisten dengan catatan lama bahwa "Subbab Evaluasi (Bab V–VI) masih teks templat".
- **Naskah baru disusun** di `docs/laporan/BAB-V-LENGKAP.md`, mengikuti kerangka yang sama dengan contoh
  Putra (5.1 Pengantar → 5.2.1 hasil implementasi per antarmuka → 5.2.2 hasil pengujian fungsional →
  5.2.3 hasil SUS → 5.2.4 pembahasan), tapi seluruh isinya ditarik dari bahan yang sudah nyata ada di
  proyek — **bukan dikarang**:
  - 5.2.1: 20 subbab walkthrough (Publik/Pengguna Terdaftar/Admin & Super Admin) ditarik dari
    `BAB-IV-LENGKAP.md` dan `CONTEXT.md`, masing-masing diberi penanda *(Sisipkan Gambar ...)* karena
    belum ada tangkapan layar situs live yang bisa disisipkan dari sesi ini.
  - 5.2.2: rekap 88 butir PDHUPL per kelas uji (Tabel 5.1), termasuk AD-34 Tidak Berlaku dan perbaikan
    UT-03, **plus pengakuan eksplisit bahwa `TESTING.md` (181 kasus) belum dieksekusi** — tidak ditutupi
    seperti draf lama sempat mengisyaratkan.
  - 5.2.3: tabel skor SUS per responden (29 pengunjung umum + 11 admin/super admin) disalin apa adanya
    dari `docs/PDHUPL.md` Bab 6, termasuk catatan *straight-lining* R19.
  - 5.2.4: pembahasan yang secara eksplisit menyatakan tujuan 1 dan 2 (Bab I) **tercapai** dengan bukti
    tertelusur ke persona Bab IV, tapi tujuan 3 (pengujian & kepuasan) **tercapai sebagian** — usability
    sudah terukur nyata, fungsionalitas baru sebagian (PDHUPL) sementara TESTING.md belum jalan — dan
    kelebihan/keterbatasan sistem ditulis eksplisit di akhir.
- **Yang masih tersisa:** placeholder screenshot (Gambar 5.1–5.30) belum diisi — perlu tangkapan layar
  `karinakas.com` sungguhan dari penyusun; setelah itu draf ini siap ditempel ke Word menyusul
  `BAB-IV-LENGKAP.md`.
- **Diperdalam 30 Sep (permintaan penyusun):** kedua puluh subbab 5.2.1 (walkthrough per antarmuka)
  diperluas dari 2–4 kalimat menjadi beberapa paragraf per subbab, menambahkan rincian kolom data
  model (mis. `jenis_relawan`/`bidang_minat` JSON per kegiatan, lima medan keuangan donasi yang
  disembunyikan, sembilan titik pemanggilan `AuditLog::record()`), aturan ON DELETE antar tabel, dan
  kaitan eksplisit tiap fitur ke persona/pain point Bab IV — tanpa mengarang fakta baru, seluruhnya
  ditarik dari `CONTEXT.md` dan `BAB-IV-LENGKAP.md` yang sudah ada.

### 4.15 Bab VI (Kesimpulan dan Saran) laporan TA disusun pertama kali (30 Sep)
- Penyusun menempelkan teks instruksi templat kampus untuk subbab Saran dan meminta isinya
  dilengkapi. Pengecekan ke `docs/LAPORAN TUGAS AKHIR.docx` mengonfirmasi **Bab VI juga masih
  100% teks templat**, sama seperti temuan Bab V pada §4.14 — belum pernah ditulis dengan
  konten Karinakas.
- **Naskah baru disusun** di `docs/laporan/BAB-VI-LENGKAP.md`:
  - **6.1 Kesimpulan** — menyintesis capaian tiga tujuan penelitian Bab I: tujuan 1 (bangun
    sistem) dan tujuan 2 (terapkan HCD) dinyatakan **tercapai penuh**, tujuan 3 (uji fungsionalitas
    & usability) dinyatakan **tercapai sebagian** — konsisten dengan kesimpulan yang sudah
    dibangun pada Bab V Subbab 5.2.4, tidak mengulang isi pembahasan melainkan meringkasnya.
  - **6.2.1 Saran bagi Pengembang Selanjutnya** (8 butir) — seluruhnya ditarik dari temuan nyata
    pada §5/§6 di atas: deploy perbaikan `AdminController`/validasi KTP yang masih tertahan
    lokal, tuntaskan verifikasi email produksi, jalankan `TESTING.md` dan verifikasi dinamis
    PDHUPL, perbaiki celah `nama_lengkap max:150` vs kolom `varchar(100)` dan `kegiatan_id`
    nullable tanpa batasan unik, redupkan warna `--yellow`, putuskan nasib endpoint
    `/admin/rekapan/*` yang tak terpakai, perkuat keamanan produksi (kata sandi demo, APP_DEBUG,
    CORS), dan opsi perluasan cakupan jejak audit.
  - **6.2.2 Saran bagi Pihak Karinakas** (7 butir) — pelatihan Super Admin untuk alur verifikasi
    donasi, jadwal pembaruan konten rutin (menjawab keluhan responden SUS soal konten tidak
    diperbarui), ganti kata sandi kotak surel yang sempat tertulis di riwayat chat, pencadangan
    basis data berkala, konfirmasi ulang rekening/QRIS, narasi dampak kegiatan (menjawab
    kebutuhan persona "Bimo"), dan penunjukan penanggung jawab teknis notifikasi gagal kirim.
- **Status:** siap ditempel ke Word menyusul `BAB-IV-LENGKAP.md` dan `BAB-V-LENGKAP.md` — tidak
  ada placeholder *screenshot* pada bab ini karena sifatnya naratif/rekomendasi, bukan walkthrough
  visual.
- **Pembaruan 1–2 Okt (permintaan penyusun):** nada 6.1 dan 6.2 ditulis ulang supaya tidak terkesan
  "menjatuhkan" progres proyek — **substansi 15 butir saran tidak berubah**, hanya bingkainya:
  dari "perbaiki celah/belum dieksekusi" menjadi "lanjutkan/perkuat/tingkatkan" sebagai arah
  pengembangan berkelanjutan. Bab V sengaja dibiarkan apa adanya karena pengakuan keterbatasan
  pengujian di sana memang tempatnya untuk jujur, bukan di Bab VI yang memang konvensinya
  forward-looking.

### 4.16 Penemuan: naskah Word `TERBARU.docx` sudah jauh lebih maju dari draf `.md` — 3 inkonsistensi ditemukan (2 Okt)
- **Konteks:** saat menyiapkan ringkasan untuk pindah room chat, ditemukan bahwa di luar `Project TA/`
  ada folder `TUGAS AKHIR/Laporan Tugas Akhir/` berisi **tiga** salinan `.docx`: `LAPORAN TUGAS AKHIR.docx`
  (17 Sep, usang), `~$PORAN TUGAS AKHIR.docx` (berkas kunci sementara Word, abaikan), dan
  **`LAPORAN TUGAS AKHIR TERBARU.docx`** (diubah **1 Okt 2026**, 17 MB) — inilah naskah yang
  sesungguhnya sedang dikerjakan penyusun, bukan salinan mana pun di `docs/`.
- **Isi `TERBARU.docx` sejauh ditelusuri** (diekstrak lewat `unzip` + Node.js, karena tidak ada
  `pandoc`/`soffice` terpasang — lihat §9 gotcha baru bila perlu mengulang):
  - **Bab I direvisi:** Rumusan Masalah, Pertanyaan Penelitian, dan Tujuan Penelitian **dipadatkan
    jadi 2 tujuan** — (1) mengembangkan website dengan pendekatan HCD, (2) mengevaluasi usability
    dengan SUS. Tujuan lama #3 ("menguji fungsionalitas") **tidak lagi berdiri sendiri** — berbeda
    dari versi yang dipakai BAB-V/VI-LENGKAP.md (3 tujuan). Kapan dan oleh siapa perubahan ini
    dibuat belum diketahui sesi ini — tanyakan ke penyusun bila perlu konteks (kemungkinan masukan
    dosen pembimbing).
  - **Bab IV** jauh lebih lengkap dari `docs/LAPORAN TUGAS AKHIR.docx` versi lama — mencakup s.d.
    4.5 Implementasi dan Pengujian, sejalan dengan `BAB-IV-LENGKAP.md`.
  - **Bab V sudah memuat 20 subbab 5.2.1 walkthrough + Tabel 5.1 PDHUPL + tabel SUS**, hampir
    identik kata-per-kata dengan `docs/laporan/BAB-V-LENGKAP.md` (§4.14) — penyusun sudah
    menyalinnya ke Word **dan menambahkan 43 tangkapan layar sungguhan** (Gambar 5.1 dst., dicek
    lewat folder `word/media/` dalam arsip `.docx`). Bab V 5.2.4 Pembahasan **belum disesuaikan**
    dengan Bab I 2-tujuan baru — lihat inkonsistensi (a) di bawah.
  - **Bab VI Kesimpulan ditulis ulang total** (bukan dari draf saya) mengikuti struktur 2-tujuan
    baru, dengan angka-angka baru — lihat inkonsistensi (b) dan (c) di bawah.
  - **Bab VI Saran** memakai nada *forward-looking* hasil tulis ulang saya (§4.15) tapi **tampak
    hanya sebagian butir yang disalin**: pada "Saran bagi Pengembang Selanjutnya" hanya terlihat
    butir 7 (hardening) dan 8 (perluasan audit) dari 8 butir asli; pada "Saran bagi Pihak
    Karinakas" hanya terlihat 3 dari 7 butir (pencadangan data, tinjau rekening/QRIS, penanggung
    jawab notifikasi). **Belum jelas** apakah ini trim sengaja oleh penyusun atau belum selesai
    ditempel — tanyakan ke penyusun, jangan diasumsikan salah satu.
- **🔴 Tiga inkonsistensi nyata ditemukan, perlu diperbaiki sebelum naskah final:**
  1. **Bab V Subbab 5.2.4 Pembahasan masih menyebut "Tujuan ketiga... tercapai sebagian"** —
     padahal Bab I sekarang cuma punya 2 tujuan. Pembahasan ini perlu ditulis ulang mengikuti pola
     yang sudah dipakai Bab V 5.1 Pengantar sendiri (tujuan 1 = HCD, dibuktikan lewat implementasi
     + pengujian fungsional; tujuan 2 = usability, dibuktikan lewat SUS) — bukan menghapus
     pengakuan bahwa `TESTING.md` 181 kasus belum dieksekusi, hanya mengubah pemetaannya ke 2
     tujuan.
  2. **Angka keberhasilan pengujian tidak konsisten.** Bab V (5.2.2 dan 5.2.4) secara eksplisit
     menyatakan **87 Handal + 1 Tidak Berlaku dari 88 butir PDHUPL** (artinya 87/87 = 100% dari
     butir yang berlaku). Bab VI Kesimpulan yang baru ditulis menyatakan **"tingkat keberhasilan
     98,85% (86 dari 87 butir uji yang berlaku dinyatakan Handal)"** — angka ini **tidak cocok**
     dengan klaim 87 Handal di Bab V. Perlu dicek ulang: apakah ada 1 butir tambahan yang kini
     dianggap tidak Handal (lalu Bab V juga perlu diperbarui), atau Bab VI salah hitung (lalu
     ganti jadi "87 dari 87 (100%)"). **Jangan asal pilih salah satu tanpa mengecek `docs/PDHUPL.md`
     Bab 5 ulang.**
  3. **Jumlah responden kuesioner analisis kebutuhan salah ketik di Bab VI.** Bab IV (Subbab 4.3.3,
     dicek lagi di `TERBARU.docx` baris konsisten dengan draf) secara konsisten menyebut **27
     responden** untuk kuesioner *persona*/*pain points*. Bab VI Kesimpulan yang baru menulis
     **"35 responden kuesioner"** — kemungkinan tertukar dengan angka lain atau salah ketik.
     Perbaiki jadi 27, kecuali penyusun memang punya data tambahan yang belum diberitahukan ke
     sesi sebelumnya (tanyakan dulu, jangan asumsi).
- **Implikasi untuk sesi berikutnya:** `docs/laporan/BAB-V-LENGKAP.md` dan `BAB-VI-LENGKAP.md` di
  repo ini **sudah tertinggal** dari `TERBARU.docx` — jangan jadikan acuan utama lagi untuk status
  Bab V/VI, gunakan sebagai referensi riwayat saja. Perbaikan atas tiga inkonsistensi di atas
  sebaiknya dilakukan **langsung di `TERBARU.docx`** (lewat skrip `unzip` + sunting `word/document.xml`
  + `zip` ulang, karena `pandoc`/`soffice` tidak tersedia di mesin ini — lihat catatan skill `docx`
  tentang pendekatan edit berkas yang sudah ada), bukan di berkas markdown.

### 4.17 Perbaikan langsung di `TERBARU.docx`: 2 dari 3 inkonsistensi §4.16 ditutup, plus bug isi baru ditemukan (2 Okt malam)
- Penyusun menempelkan isi lengkap Bab I–VI dari `TERBARU.docx` (lewat ekspor PDF) ke sesi chat dan
  mengeluhkan tata bahasa Bab V/VI yang terasa janggal. Penelusuran kalimat per kalimat terhadap
  **`word/document.xml` asli** (bukan hasil ekspor PDF, yang ternyata sempat menyamarkan sebagian
  kerusakan) menemukan masalah yang lebih parah dari sekadar gaya bahasa:
  - **Subbab 5.2.2 (Hasil Pengujian Fungsional) paragraf pembuka rusak secara teknis** — satu run
    XML terpotong sehingga kata "PDHUPL" kehilangan huruf terakhirnya ("PDHUP"), dan kalimat
    terpecah jadi dua klausa yang tidak nyambung ("...memuat 88 butir uji yang sudah dilaksanakan.
    hasilnya lewat penelusuran kode..."). Paragraf ini juga merujuk **"Subbab 5.2.4" yang tidak ada**
    (naskah cuma sampai 5.2.3 lalu 5.3) — sisa penomoran draf lama yang tidak ikut disesuaikan.
  - **Subbab 5.2.1.19 "Riwayat Notifikasi" isinya adalah salinan persis dari 5.2.1.18 "Kelola
    Pengguna"** (membahas AD-27 s.d. AD-32, celah `AdminController`) — judul dan gambar (Gambar 5.19,
    tangkapan layar panel Notifikasi) sudah benar, tapi dua paragraf teks di bawahnya salah total,
    kemungkinan besar sisa copy-paste yang lupa diganti.
  - Dua kalimat comma-splice (anak kalimat disambung koma tanpa konjungsi, bikin alur kalimat
    kabur) di Subbab 5.2.1.5 (Berita) dan 5.2.2 (kalimat UT-03).
  - Typo murni: "Sebagai kelanjutakn dari capaian..." dan "Saran bagi Pengmbang Selanjutnya" di Bab
    VI 6.2.
  - **Temuan baru, bukan dari catatan lama:** di dalam Bab IV sendiri ada kontradiksi jumlah
    responden kuesioner kebutuhan — Subbab 4.3.1 dan 4.3.2 menyebut **35 responden**, tapi Subbab
    4.3.3 (Pain Points) masih menyebut **27 responden**. Ini membalikkan dugaan lama di §4.16(c):
    "35 responden" di Bab VI kemungkinan besar **sudah benar** (konsisten dengan mayoritas Bab IV),
    dan yang perlu dikoreksi justru satu angka "27" yang tersisa di 4.3.3. **Belum diperbaiki** —
    menunggu konfirmasi penyusun bahwa ini memang salah ketik, bukan dua kelompok data yang sengaja
    dibedakan (lihat §6).
- **Diperbaiki langsung di `TERBARU.docx`** (unzip `word/document.xml` → cari paragraf lewat
  `w14:paraId` unik → ganti isi `<w:t>` → zip ulang dengan path forward-slash secara manual karena
  `System.IO.Compression.ZipFile.CreateFromDirectory` di PowerShell 5.1 ternyata menulis path
  berbackslash yang tidak valid untuk OOXML — divalidasi well-formed lewat `[xml]` .NET parser
  sebelum ditimpakan):
  1. Paragraf pembuka 5.2.2 ditulis ulang bersih, rujukan "Subbab 5.2.4" diperbaiki jadi "Subbab 5.3".
  2. Kalimat Berita (5.2.1.5) dan kalimat UT-03 (5.2.2) dipecah agar tidak comma-splice.
  3. **Subbab 5.2.1.19 ditulis ulang total** sesuai subjeknya yang benar (panel Notifikasi, kolom
     `NotifikasiLog`, butir uji NL-01, dan catatan bahwa panel ini — beda dari Pengguna/Audit —
     bisa diakses admin **dan** super admin karena `authorize('viewAdminDashboard', ...)`).
  4. Pembahasan (5.3): paragraf "Tujuan ketiga" **dihapus** (Bab I sekarang cuma 2 tujuan) — bukti
     pengujian fungsional (88 butir PDHUPL, pengakuan TESTING.md 181 kasus belum jalan) dipindah
     jadi penguat paragraf "Tujuan pertama"; hasil pengukuran SUS (72,56, perbandingan ke studi
     Kurniawan/Husseini, catatan *straight-lining*) dipindah jadi paragraf baru menyusul "Tujuan
     kedua". Ditambahkan satu kalimat reflektif yang menghubungkan siklus revisi 4.4.2↔4.6.2 sebagai
     bukti HCD iteratif benar-benar jalan di dalam kerangka Waterfall — closing-loop ke Bab III,
     bukan pengulangan definisi metodologi.
  5. Bab VI 6.1: angka **"98,85% (86 dari 87 Handal)" diganti "100% dari butir yang berlaku (87 dari
     87 Handal, 1 Tidak Berlaku)"**, konsisten dengan Bab V dan `docs/PDHUPL.md` (digrep ulang: 0
     baris "Tidak Handal" di `docs/PDHUPL.md` per sesi sebelumnya).
  6. Typo "kelanjutakn" → "kelanjutan", "Pengmbang" → "Pengembang" di Bab VI 6.2.
- **Sengaja TIDAK diubah:** angka "27 responden" di Subbab 4.3.3 — ini perlu konfirmasi penyusun
  dulu (lihat §6), bukan keputusan AI sepihak karena menyangkut data, bukan cuma bahasa.
- **Verifikasi sebelum ditimpakan:** XML hasil sunting dicek *well-formed* lewat `[xml]` .NET
  parser, jumlah berkas dalam paket zip (76 berkas) dan ukuran seluruh bagian lain (styles, media,
  dll.) dipastikan identik dengan versi asli lewat `diff`, dan isi `word/document.xml` hasil susun
  ulang diverifikasi cocok 100% sebelum menimpa berkas hidup. Backup pra-sunting disimpan di folder
  yang sama: `LAPORAN TUGAS AKHIR TERBARU.backup-20261002-210355.docx`.

### 4.18 `docs/laporan/BAB-V-LENGKAP.md` dan `BAB-VI-LENGKAP.md` direvisi: 2 tujuan, 4 tahap HCD ditelusuri eksplisit, seluruh rujukan "Subbab X.Y" dihapus (2 Okt malam)
- Penyusun meminta draf `.md` ini (bukan `TERBARU.docx`) ikut disamakan ke kerangka 2 tujuan, dan
  secara eksplisit meminta Pembahasan Bab V menelusuri tahap *understand and specify the context
  of use* pada HCD, bukan cuma tahap perumusan kebutuhan dan evaluasi seperti draf sebelumnya.
- **Bab V** (5.1 Pengantar dan 5.2.4 Pembahasan): paragraf "Tujuan ketiga" dihapus, isinya
  disebar ke "Tujuan pertama" (bukti pengujian fungsional) dan "Tujuan kedua" (bukti SUS).
  Pembahasan "Tujuan pertama" ditulis ulang menelusuri **keempat tahap HCD berbasis ISO 9241-210
  satu per satu dengan buktinya masing-masing**: tahap *understand & specify context of use*
  (wawancara pengurus Karinakas 20 Okt 2025, observasi kanal komunikasi lama, kuesioner 35
  responden), *specify user requirements* (5 persona, *pain points*, kebutuhan fungsional/
  nonfungsional), *produce design solutions* (wireframe, mockup), dan *evaluate designs* (evaluasi
  *high-fidelity* yang terbukti memicu revisi nyata ke ukuran huruf & warna — bukti siklus HCD
  iteratif berjalan di dalam kerangka Waterfall yang linear).
- **Bab VI** (6.1 Kesimpulan): "berhasil mencapai ketiga tujuan" → "kedua tujuan", poin HCD dan
  poin fungsional lama digabung jadi satu poin.
- **Seluruh rujukan "(Subbab X.Y...)" dan "(lihat HANDOFF.md §X)" dihapus dari kedua berkas** (±63
  kemunculan) atas permintaan eksplisit penyusun, supaya tiap paragraf bisa dibaca berdiri sendiri
  tanpa perlu melompat ke bagian lain. **Kode butir uji (PU-xx, AD-xx, SR-xx, UT-xx, RP-xx, AL-xx,
  NL-xx) dan kode FR/NFR/K sengaja dipertahankan** — itu bukti ke PDHUPL/SKPL, bukan sekadar
  penunjuk bagian, jadi tidak termasuk permintaan ini. Referensi ke Bab I/II/III/IV sebagai satu
  kesatuan (bukan ke subbab tertentu) juga dipertahankan karena berfungsi sebagai kerangka
  argumen, bukan sekadar "lihat di sana".
- **Catatan penting:** kebijakan hapus-rujukan-subbab ini **baru diterapkan ke kedua berkas `.md`
  ini, belum ke `TERBARU.docx`** — `TERBARU.docx` masih memuat banyak "(Subbab X.Y)" peninggalan
  dari sebelum permintaan ini. Tanyakan ke penyusun apakah kebijakan yang sama perlu disebar ke
  `TERBARU.docx` juga sebelum melakukannya (pekerjaan XML yang jauh lebih besar, >50 kemunculan).
- **Status:** `docs/laporan/BAB-V-LENGKAP.md` dan `BAB-VI-LENGKAP.md` kini punya kerangka tujuan
  dan gaya rujukan yang **berbeda** dari `TERBARU.docx` (yang masih pakai rujukan Subbab dan belum
  menelusuri 4 tahap HCD eksplisit) — jangan asumsikan keduanya identik lagi saat membandingkan.

### 4.19 Paragraf "Tujuan kedua" di `BAB-V-LENGKAP.md` ditulis ulang agar tidak terkesan membela skor SUS (3 Okt)
- Penyusun meminta paragraf "Tujuan kedua" (usability) di Pembahasan Bab V tidak lagi membandingkan
  skor SUS 72,56 terhadap studi Kurniawan (2022)/Husseini dkk. (2021) yang lebih tinggi (84,5–94%)
  dengan nada "Perbedaan ini beralasan, bukan tanda kegagalan..." — nada itu terasa seperti membela
  kekurangan, padahal yang diinginkan adalah pembahasan yang lebih mendalam tentang *website yang
  sudah dikembangkan* itu sendiri.
- **Ditulis ulang** untuk menjelaskan skor SUS lewat bukti pengembangan nyata: rincian per
  pernyataan (P3 kemudahan penggunaan, P5 keterpaduan fungsi — keduanya skor tertinggi) dikaitkan
  ke keputusan desain HCD yang sudah diimplementasikan (navigasi datar, integrasi riwayat donasi/
  relawan/notifikasi ke satu halaman Profil), dan selisih skor admin (75,68) vs pengunjung umum
  (71,38) dibingkai positif (kompleksitas panel admin tidak banyak mengorbankan kenyamanan),
  bukan sebagai perbandingan yang mengecilkan hasil sendiri.
- **Paragraf "Keterbatasan sistem" dihapus dari Pembahasan Bab V** — keempat poinnya (perbaikan
  `AdminController`/validasi KTP belum *deploy*, email reset belum terverifikasi, warna kuning
  belum diredupkan, `TESTING.md`/verifikasi PDHUPL belum dijalankan) **sudah seluruhnya tercakup**
  di Bab VI Saran 1/2/3/5 — dicek satu per satu sebelum dihapus, tidak ada informasi yang hilang,
  hanya dipindah sesuai permintaan agar Bab V fokus membahas capaian, bukan kekurangan. "Kelebihan
  sistem" ditutup dengan satu kalimat penunjuk ke Bab VI untuk hal yang masih perlu ditindaklanjuti.
- **Catatan konsistensi:** perubahan ini hanya pada `BAB-V-LENGKAP.md`. Bab VI Kesimpulan di
  berkas yang sama **tidak perlu diubah** — poin "Kedua" di sana memang sudah positif sejak awal,
  tidak pernah memuat perbandingan dengan studi lain. `TERBARU.docx` juga belum disentuh dengan
  perubahan ini.

### 4.20 Grafik SUS dipindah ke Pembahasan, paragraf 4.5.2 dirapikan, dan dua temuan baru (4–5 Okt)
- **Latar:** atas arahan revisi, 10 diagram lingkaran jawaban SUS (tangkapan layar tab *Summary* Google
  Form, **Gambar 5.21–5.30**, satu per pernyataan P1–P10, n=40) yang semula di bagian Hasil dipindah ke
  Pembahasan. Penyusun mengirim gambarnya (P1–P8 dulu, lalu P9–P10) dan meminta penjelasan serta
  kalimat pengantar ("untuk hasil grafik dapat dilihat pada gambar berikut").
- **Dikerjakan di `docs/laporan/BAB-V-LENGKAP.md`** (bukan di `.docx`):
  - Penanda *Sisipkan Gambar 5.21 s.d. 5.30* **dihapus dari Hasil 5.2.3** (Tabel 5.2–5.5 dan catatan
    *straight-lining* R19 tetap di Hasil).
  - **Pembahasan 5.2.4**, sesudah paragraf "Tujuan kedua": paragraf pengantar yang merujuk "Gambar 5.21
    sampai Gambar 5.30" + cara membaca butir positif vs negatif, lalu **satu penanda gambar + satu
    paragraf penjelasan per grafik** (persentase, jumlah responden, makna), lalu paragraf penutup.
  - **Verifikasi:** setiap persentase di kesepuluh grafik dicocokkan ke distribusi mentah
    `docs/PDHUPL.md` Bab 6.4 — **semuanya cocok** (mis. P1 = 9/20/11 → 22,5/50/27,5%; P10 = 3/22/6/6/3 →
    7,5/55/15/15/7,5%). Angka turunan ("85% (34 dari 40)") dihitung dari data itu, bukan ditebak.
  - **Temuan isi:** 8 dari 10 butir dinilai baik ≥77,5% responden; **P4 (50% baik) dan P10 (62,5% baik)**
    paling terbuka — keduanya soal bantuan/pembelajaran awal; P10 punya penilaian buruk tertinggi (22,5%)
    dan kontribusi terendah (2,40). Pada tiap butir negatif ada satu jawaban "Sangat Setuju" dari R19
    (*straight-lining*, §4.10). Tafsiran P4 → persona "Pak Herman" adalah **dugaan penulis naskah**, bukan
    temuan data; hapus bila dosen menilai terlalu spekulatif.
- **Paragraf Bab IV 4.5.2 (arsitektur & integrasi komponen) ditulis ulang di chat, BELUM diterapkan ke
  `BAB-IV-LENGKAP.md`** (paragraf itu ditempel penyusun dari Word). Perubahan: "dibakar" (terjemahan
  harfiah *baked in*) → "ditanamkan ke dalam berkas hasil pembangunan" (sama dengan kata di SKPL K-07);
  ditambah nilai `VITE_API_URL` dev (`http://127.0.0.1:8000/api/v1`) dan produksi
  (`/api/index.php/api/v1`); kalimat CORS diperjelas (tidak berlaku pada alur normal produksi
  same-origin; autentikasi dijaga token Sanctum). **Diverifikasi ke kode:** `kk_token` di `api.js:8`,
  `GET /me` di `AuthContext.jsx:37`, `config/cors.php` `allowed_origins => ['*']` +
  `supports_credentials => false`. **Sengaja tidak ditulis** bahwa CORS produksi sudah dibatasi —
  konfigurasinya masih `*` (sudah masuk Saran Bab VI 6.2.1 butir 7).
- **Dua temuan baru:**
  1. **Folder `Laporan Tugas Akhir\REVISI\`** (lihat blok 🔴 di awal berkas) — isi belum diperiksa.
  2. **Konflik "35 vs 27 responden" juga ada di repo**: `BAB-IV-LENGKAP.md` (dan draf lama `4.3-4.4-...md`,
     yang menyebut "27 responden dari target awal 40") memakai **27**; `BAB-V-LENGKAP.md` §5.2.4 dan
     `BAB-VI-LENGKAP.md` §6.1 memakai **35**. Dugaan §4.17 (35 yang benar) **belum terbukti** — draf lama
     justru menghitung 27 dari data mentah. Tentukan dari Google Form kuesioner kebutuhan, lalu samakan
     di Bab IV, V, VI (`.md` dan `.docx`).
- **Sisa kecil:** `BAB-V-LENGKAP.md` §5.1 masih menulis pembahasan "ditutup dengan analisis kelebihan
  dan keterbatasan sistem", padahal paragraf Keterbatasan sudah dihapus 3 Okt (§4.19). Belum diperbaiki
  (penyusun ditawari, belum menjawab).
- **Tidak ada commit/push.** `.docx` tidak disentuh sama sekali pada sesi ini.

---

## 5. Masalah terbuka (diurutkan menurut prioritas)

### 🔴 Tinggi
0. ~~**Tiga inkonsistensi di `TERBARU.docx`**~~ (§4.16) — **✅ 2 dari 3 sudah diperbaiki langsung di
   `TERBARU.docx` pada 2 Okt malam (§4.17):** (a) paragraf "tujuan ketiga" di Pembahasan sudah
   dihapus/digabung ke tujuan 1 & 2; (b) angka Bab VI sudah diseragamkan jadi "100% (87 dari 87
   Handal)" mengikuti Bab V. **Yang masih tersisa: (c) "35 vs 27 responden"** — ternyata terbalik
   dari dugaan semula: 35 kemungkinan yang benar (konsisten di Bab IV 4.3.1/4.3.2), dan "27" di
   4.3.3 yang jadi outlier. **Butuh konfirmasi Anda dulu sebelum diubah** (lihat §6) karena ini
   menyangkut data kuesioner, bukan sekadar bahasa. Sesi yang sama juga menemukan dan memperbaiki
   **bug isi yang lebih serius**: Subbab 5.2.1.19 "Riwayat Notifikasi" ternyata berisi salinan
   persis dari 5.2.1.18 "Kelola Pengguna" (subjek salah total), dan paragraf pembuka 5.2.2 rusak
   secara teknis (huruf hilang dari "PDHUPL", kalimat terpecah, rujukan ke subbab yang tidak ada) —
   keduanya sudah ditulis ulang, detail lengkap di §4.17.
1. **Surel reset belum terbukti terkirim dari peladen.** Langkah diagnosis: buka `storage/logs/laravel.log` di
   peladen, cari baris `Gagal mengirim tautan pemulihan kata sandi:` — pesan setelahnya adalah penyebab pastinya.
   Panel admin → Notifikasi juga menunjukkan status `gagal`.
2. ~~**Admin biasa bisa melihat dan menghapus akun pengguna.**~~ **✅ Sudah diperbaiki 19 September** (lihat
   §4.7) — `isSuperAdmin()` ditambahkan pada `users()` dan `deleteUser()`, diuji lolos lewat API sungguhan.
   **Yang masih tersisa: perbaikan ini belum di-commit maupun di-deploy ke `karinakas.com`.**

### 🟠 Sedang
3. **Jejak audit tidak lengkap secara kode** — masih 11 fungsi kegiatan/berita/galeri tak tercatat, sama
   seperti sebelumnya. **Diselesaikan lewat dokumen pada 19–20 September** (§4.8): NFR 3.4.4.8 dipersempit agar
   cakupannya sama dengan FR SIKAS 516, sehingga klaim dokumen kini sesuai kode. Bila suatu saat cakupannya mau
   diperluas ke konten publik, tinggal tambah satu baris `AuditLog::record()` per fungsi.
4. **`nama_lengkap` > 100 aksara → galat 500.** `AdminController` memvalidasi `max:150`, kolom `varchar(100)`.
   Perbaikan: samakan jadi `max:100`. *(belum dikerjakan)*
5. **Relawan tanpa kegiatan bisa didaftarkan berulang.** `kegiatan_id` boleh `null`, dan batasan unik tidak berlaku
   untuk `NULL`. Perbaikan: wajibkan `kegiatan_id` di `RelawanController::store`. *(belum dikerjakan)*
6. **Warna aksen kuning belum diredupkan.** `--yellow: #FFD700` di `index.css` masih saturasi tinggi, padahal
   pihak Karinakas secara eksplisit meminta warna tidak menyala (§4.9). Rekomendasi: ganti ke `#B8860B` (sudah
   dipakai sistem untuk lencana Super Admin). **Belum dikerjakan — menunggu keputusan Anda.**

### 🟡 Rendah
7. **Data:** kegiatan "Pemeriksaan Kesehatan Gratis" mencatat `jumlah_relawan_terdaftar = 15` padahal relawan
   diterima 0 (sisa data awal; per 1 Sep).
8. **`.env` lokal backend memuat `FRONTEND_URL` dua kali** (baris 7 `localhost:5173` dan baris 73 `karinakas.com`) —
   hapus salah satu; untuk lokal pakai `http://localhost:5173`.
9. **11 galat ESLint** (`react-hooks/set-state-in-effect` × 9) — kualitas, bukan fungsi.
10. `/admin/rekapan/*` tidak dipakai klien; `exportRekapan` masih kerangka (bila dihapus: **66 → 62** titik akhir
    di SKPL/DPPL — angka sudah dikoreksi dari 65 pada 19 Sep, lihat §4.8).
11. `SectionNotifikasi.saveTpl` hanya menyimpan templat ke `localStorage`.
12. Satu berkas yatim `storage/app/public/galeri/hib1InD6Po2D9BQeRtyehzuqlqGfDpEtH0PEKfZK.jpg`.
13. Kelas CSS `.fp-otp-demo` / `.fp-otp-code` masih bernama "otp" — sisa penamaan lama, bukan bug fungsional.
14. ~~**Nomor KTP tidak divalidasi 16 digit, baik di layanan maupun di klien.**~~ **✅ Sudah diperbaiki 30
    September** (§4.13) — `RelawanController` kini `required|digits:16`; `DaftarRelawan.jsx` kini `required` +
    `minLength`/`maxLength={16}` + `pattern`. `docs/PDHUPL.md` UT-03 diperbarui jadi Handal. **Yang masih
    tersisa: perbaikan ini belum di-commit maupun di-deploy ke `karinakas.com`.**
15. ~~**Jumlah antarmuka belum direkonsiliasi** antardokumen~~ **✅ Diputuskan 24** pada `docs/laporan/BAB-IV-LENGKAP.md`
    (§4.12), mengikuti angka yang sudah lebih dulu diverifikasi ke kode di DPPL. **Yang masih tersisa: SKPL
    Subbab 3.1.4 dan DPPL Subbab 1.2.2 belum ikut disamakan ke 24** (SKPL masih menulis titik akhir, bukan
    antarmuka — perlu dicek ulang apakah SKPL memang membahas jumlah antarmuka sama sekali).

### 📄 Laporan Tugas Akhir (`Laporan Tugas Akhir/LAPORAN TUGAS AKHIR.docx`)
- Bab IV menulis ekspor **"ke format PDF dan Excel"** — sistem hanya menghasilkan **Excel**. *(sudah diperbaiki
  di draf `docs/laporan/...md`, tinggal dipindah ke Word)*
- **Jejak audit tidak disebut sama sekali**; manajemen pengguna hanya satu butir. *(sudah ditambahkan di draf)*
- Bab II §2.3.2 menulis "Hybrid REST API dan Blade PHP" — salah, bertentangan dengan Bab IV-nya sendiri.
  *(sudah diperbaiki di draf, lihat §4.8)*
- Bab 4.3/4.4 (Perancangan & Implementasi): **draf pengganti lengkap sudah ada**, lihat §4.9 dan
  `docs/laporan/4.3-4.4-Perancangan-Implementasi-Pengujian.md`.
- Subbab **Evaluasi (Bab V–VI)** masih teks templat untuk sebagian, tetapi Bab 4.4.8 (Evaluasi Desain
  *High-Fidelity*) sudah terisi nyata di draf — hanya Evaluasi *Low-Fidelity* yang masih kosong menunggu
  catatan Anda.
- Tidak menyebut OTP maupun WhatsApp (dicek 17 Sep), tetapi masih memecah pemulihan jadi dua butir terpisah
  — "Lupa kata sandi" dan "Reset kata sandi melalui email". Kini keduanya satu alur: tautan reset lewat surel.
  *(sudah digabung jadi satu butir di draf kebutuhan fungsional)*
- **PDHUPL (Bab uji)** — draf lengkap sudah ada di `docs/PDHUPL.md`, mengikuti template resmi + Bab 6 SUS.

### 📄 Konsistensi dokumen lain
- Diagram use case: UC-15 hanya terhubung ke Admin (super admin juga berwenang); judul batas "WEBSITE KARINAKAS" vs "SIKAS".
- Kode `FR SIKAS 101…608` masih berawalan SIKAS, sedangkan DPPL memakai "Website Karinakas".
- `TESTING.md` belum punya kasus uji penyaring bulan/kegiatan (±6–8 kasus), juga belum mencakup pemulihan kata
  sandi/jejak audit/notifikasi seperti yang baru ditambahkan di `docs/PDHUPL.md` (§4.10) — pertimbangkan
  menyamakan cakupan keduanya.

---

## 6. Menunggu tindakan penyusun

- [ ] 🆕 **Tentukan `.docx` mana yang aktif:** `Laporan Tugas Akhir\LAPORAN TUGAS AKHIR TERBARU.docx`
  (2 Okt 21:14, 16 MB, sudah diperbaiki di §4.17) atau `Laporan Tugas Akhir\REVISI\LAPORAN TUGAS AKHIR
  TERBARU.docx` (3 Okt 21:43, 12 MB, belum diperiksa). Bila yang `REVISI` lebih baru, AI perlu
  membandingkannya dulu (lewat `unzip` + Node.js, §9) sebelum menyunting apa pun.
- [ ] 🆕 **Terapkan paragraf 4.5.2 yang sudah dirapikan** (§4.20) ke `BAB-IV-LENGKAP.md` dan/atau Word —
  teksnya ada di riwayat chat 4 Okt; minta AI menyusunnya ulang bila perlu.
- [ ] 🆕 **Sebarkan penjelasan grafik SUS (§4.20) ke Word**: di `.docx`, Gambar 5.21–5.30 sudah ada tetapi
  penjelasan per grafik dan kalimat pengantarnya baru ada di `BAB-V-LENGKAP.md` Pembahasan 5.2.4.
- [ ] 🆕 **Perbaiki kalimat usang §5.1 `BAB-V-LENGKAP.md`** ("ditutup dengan analisis kelebihan dan
  keterbatasan sistem") — Keterbatasan sudah dihapus dari Pembahasan.
- [ ] 🆕 **Kembalikan satu angka responden kuesioner kebutuhan (35 atau 27) dari data mentah Google Form**
  — konflik sekarang ada di repo (`BAB-IV` = 27, `BAB-V/VI` = 35) dan di `TERBARU.docx`.
- [ ] **Konfirmasi angka responden kuesioner kebutuhan: 35 atau 27?** (§4.17) — Bab IV Subbab 4.3.1
  dan 4.3.2 di `TERBARU.docx` menyebut 35 responden, tapi 4.3.3 (Pain Points) masih menyebut 27.
  Dugaan sesi ini: 35 yang benar (sudah konsisten dengan Bab VI) dan "27" di 4.3.3 adalah sisa angka
  lama sebelum data bertambah — tapi belum diubah karena ini keputusan data, bukan bahasa. Tolong
  pastikan sebelum sesi berikutnya mengubahnya.
- [x] ~~Perbaiki 3 inkonsistensi di `TERBARU.docx`~~ **✅ 2 dari 3 sudah diperbaiki langsung di
  `TERBARU.docx` 2 Okt malam** (§4.17: paragraf "tujuan ketiga" dihapus, angka Bab VI diseragamkan
  ke "100%/87 dari 87"); butir ketiga ("35 vs 27 responden") jadi item terpisah di atas.
- [ ] **Putuskan: sebarkan revisi `docs/laporan/BAB-V/VI-LENGKAP.md` ke `TERBARU.docx` juga, atau
  biarkan keduanya beda konvensi?** (§4.18–§4.19) — `.md` kini pakai 2 tujuan + penelusuran 4 tahap
  HCD eksplisit + tanpa rujukan "(Subbab X.Y)" + paragraf usability tanpa perbandingan ke studi
  lain; `TERBARU.docx` belum punya semua itu tapi punya 43 screenshot nyata yang `.md` tidak
  punya. Kalau ingin disamakan, pekerjaannya di `TERBARU.docx` jauh lebih besar (edit XML
  langsung, >50 kemunculan rujukan Subbab).
- [ ] **Konfirmasi status Bab VI Saran di `TERBARU.docx`** (§4.16) — tampaknya hanya sebagian dari
  15 butir saran yang tersalin (2 dari 8 bagi pengembang, 3 dari 7 bagi Karinakas). Beri tahu AI sesi
  berikutnya apakah ini trim sengaja atau belum selesai ditempel, supaya tidak salah tebak.
- [ ] **Commit & deploy `AdminController.php`** — perbaikan celah manajemen pengguna (§4.7) sudah teruji lokal
  tapi belum sampai ke `karinakas.com`. Tidak perlu migrasi, tidak perlu build ulang frontend.
- [ ] **Kabarkan hasil reset di situs live** (atau kirim baris galat dari `laravel.log` peladen).
- [ ] **Ganti kata sandi kotak surel `noreply@karinakas.com`** — pernah tertulis di riwayat chat. Perbarui di `.env` lokal & peladen (tetap dikutip).
- [ ] **Putuskan warna `--yellow`** — ganti ke `#B8860B` di kode sekarang, atau catat sebagai saran pengembangan lanjutan di Bab 6.2 laporan (§5 butir baru).
- [ ] **Kirim catatan tinjauan wireframe *low-fidelity*** (siapa, kapan, temuan apa) agar Bab 4.4.8a bisa diisi — jangan dikarang.
- [ ] **Samakan SKPL/DPPL ke 24 antarmuka** — sudah diputuskan dan dipakai di `docs/laporan/BAB-IV-LENGKAP.md`
  (§4.12), tinggal disebarkan ke dokumen lain bila relevan.
- [ ] **Jalankan `TESTING.md` (181 kasus) secara nyata** — kolom hasil masih kosong; Bab V laporan tidak bisa
  ditulis jujur tanpa angka pengujian sungguhan.
- [ ] **Verifikasi ulang `docs/PDHUPL.md` (88 butir) langsung di `karinakas.com`** — Bab 5 sudah terisi tapi lewat
  penelusuran kode (§4.11), bukan eksekusi nyata; terutama untuk hal yang tidak bisa dipastikan dari kode saja
  (tampilan visual, pengiriman surel sungguhan, unggah berkas nyata).
- [x] ~~Putuskan nasib UT-03~~ **✅ Diperbaiki 30 Sept** (§4.13) — validasi `required|digits:16` ditambahkan
  di `RelawanController` + `DaftarRelawan.jsx`; PDHUPL UT-03 kini Handal. **Tersisa:** commit & deploy, lalu
  uji manual `POST /relawan` dengan KTP kosong/kurang dari 16 digit harus 422.
- [x] ~~Ekspor data mentah kuesioner SUS~~ **✅ Sudah dilengkapi 29–30 Sep** — Bab 6.2–6.4 `docs/PDHUPL.md`
  kini memuat jawaban P1–P10 seluruh 40 responden dan rekapitulasi per pernyataan (§4.12).
- [ ] **Tempel *screenshot* bukti pengisian kuesioner** ke Bab 6 PDHUPL — lokasi dan daftar gambar yang
  dibutuhkan sudah dicatat langsung di `docs/PDHUPL.md` pada akhir Subbab 6.4.
- [ ] Sisipkan 4 tangkapan layar mockup *high-fidelity* dan padanannya di situs jadi ke
  `docs/laporan/BAB-IV-LENGKAP.md` (Subbab 4.4.4/4.5.4).
- [ ] **Sisipkan tangkapan layar Gambar 5.1–5.20** ke `docs/laporan/BAB-V-LENGKAP.md` (§4.14) — satu per
  antarmuka pada Subbab 5.2.1. **Gambar 5.21–5.30 (grafik SUS) kini ada di Pembahasan 5.2.4**, bukan lagi
  di Hasil 5.2.3 (§4.20). Di `.docx` seluruh gambar ini sudah tertanam; hanya `.md` yang masih penanda.
- [ ] **Putuskan apakah `docs/PDHUPL.md` perlu bagian "Daftar Revisi"** seperti templat Word resmi (§4.12) —
  kerangkanya siap ditambahkan bila diminta.
- [ ] **Ekspor ulang PNG** `docs/skpl/use-case-diagram.png` (sudah memuat UC-24 di berkas `.drawio`) dan Gambar 2.5 dari `docs/dppl/class-diagram.drawio`.
- [ ] Timpa `public/karinakas-logo.png` dengan logo HD.
- [ ] Konfirmasi NMID QRIS bila gambar QRIS sudah diganti ke rekening Mandiri.
- [ ] Ganti sandi default `superadmin@` & `admin@karinakas.org` di produksi; `APP_DEBUG=false`; batasi CORS.

---

## 7. Cara bekerja dengan penyusun (penting untuk AI)

- **Bahasa Indonesia** untuk semua jawaban dan dokumen.
- **Commit, push, dan hosting dikerjakan penyusun sendiri** — AI cukup mengarahkan langkahnya, jangan push.
- Penyusun meminta **analisis yang valid dan berbasis bukti**: periksa kode/basis data/situs live sebelum menyimpulkan,
  dan sebutkan bila sesuatu belum terverifikasi.
- **Tanyakan dulu untuk keputusan desain** yang berdampak ke dokumen skripsi (contoh: Opsi A/B kunci donasi).
- **Setiap perubahan kode wajib diselaraskan ke dokumen skripsi** yang terdampak: SKPL, DPPL (+ diagram `.drawio`),
  TESTING (termasuk hitungan total), SKENARIO-TUGAS, CONTEXT, HANDOFF, DEPLOY.
- **Jangan menyalin kata sandi atau kunci rahasia ke dokumen.** Tempatnya hanya `.env`.
- Uji perubahan backend langsung lewat API bila memungkinkan, dan gunakan ID palsu agar data tidak rusak.

---

## 8. Langkah berikutnya (saran urutan)

1. **Commit & deploy perbaikan `AdminController.php`** (§4.7) — sudah teruji, tinggal dikirim.
2. **Selesaikan pengiriman surel dari peladen** (§5 butir 1).
3. **Verifikasi ulang `docs/PDHUPL.md` di `karinakas.com` sungguhan** dan jalankan `TESTING.md` (181 kasus) —
   Bab 5 PDHUPL sudah berisi draf kuat hasil penelusuran kode (§4.11), tapi Bab V laporan TA butuh angka
   pengujian dari eksekusi nyata, bukan hanya pembacaan kode.
4. **Ekspor data mentah kuesioner SUS dan tempel *screenshot*** ke Bab 6 PDHUPL (lokasi sudah disiapkan, §4.11).
5. **Putuskan nasib dua naskah Bab V/VI yang sekarang beda konvensi** (§4.18–§4.19, §6) — kalau
   `docs/laporan/BAB-V/VI-LENGKAP.md` (2 tujuan, 4 tahap HCD, tanpa rujukan Subbab) mau jadi acuan
   final, sebarkan juga ke `TERBARU.docx` (atau sebaliknya); `BAB-IV-LENGKAP.md` masih siap tempel
   seperti sebelumnya (§4.12), Bab IV/V masih perlu tangkapan layar disisipkan.
6. **DPPL Subbab 2.4** — 23 halaman, bahan uraian di `docs/dppl/_arsip-kelas-boundary-entity.md` dan
  `docs/laporan/...md` §4.3.7–4.3.9 (desain visual, wireframe, prototipe sudah tertulis di sana).
7. Perbaiki `nama_lengkap max:100`, wajibkan `kegiatan_id` relawan, dan putuskan warna `--yellow` (§5 butir baru).
8. **Jalankan uji kebergunaan** sesuai `SKENARIO-TUGAS.md` — SUS sudah punya hasil nyata (§4.10), giliran
   pengujian tugas langsung (*task success rate*) yang belum dijalankan.
9. **Selaraskan laporan TA `.docx`** dengan draf yang sudah siap di `docs/laporan/` dan `docs/PDHUPL.md`.

---

## 9. Gotcha (mudah bikin bingung)

- **404 vs 500:** rute tidak cocok → 404; kelas tidak ditemukan → 500. Bila tercampur, ada dua masalah.
- **Nama berkas PHP harus sama persis dengan kelas** — di Windows tidak terasa, di Linux langsung 500.
  Ganti kapitalisasi pakai `git mv` dua langkah (`core.ignorecase=true`).
- **`VITE_*` dibakar saat build** — ubah `.env` frontend lalu `npm run build` ulang.
- **Ubah `.env` peladen → `php artisan config:clear`**, kalau tidak konfigurasi lama tetap dipakai.
- **`MAIL_PASSWORD` bermuatan `#` wajib dikutip**; `MAIL_ENCRYPTION` tidak dibaca Laravel 13 (pakai `MAIL_SCHEME`).
- **Layar lupa sandi selalu "berhasil"** walau surel gagal — cek log, bukan layar.
- **Unggah `dist/` → jangan lupa `.htaccess`** (tersembunyi).
- **JANGAN `migrate:fresh`** di data asli.
- **`/me` membalas `{success, user}`**, bukan `data`.
- **Unggah > 20 foto terpotong** karena `max_file_uploads` PHP → frontend memecah 20/permintaan.
- **Excel memperingatkan "format dan ekstensi tidak cocok"** saat membuka rekap — normal, tekan *Yes*.
- **Jangan `display:flex` pada kotak berisi kalimat campuran** (teks + `<strong>`) — potongannya tersusun berkolom.
- **Ada DUA kuesioner berbeda, jangan tertukar.** (1) Kuesioner *analisis kebutuhan* — 27 responden, dipakai
  untuk *user persona* dan *pain points* di `docs/laporan/...md` §4.3.1–4.3.3. (2) Kuesioner *SUS* — 40
  responden, dipakai untuk skor usability di §4.10/`docs/PDHUPL.md` Bab 6. Keduanya instrumen dan tujuan yang
  sama sekali berbeda, meski sama-sama tentang Website Karinakas.
- **Tidak ada `pandoc` maupun `soffice` (LibreOffice) terpasang di mesin ini**, jadi skill `docx`
  bawaan yang biasanya pakai `pandoc -t markdown` untuk membaca `.docx` tidak akan jalan. Cara yang
  terbukti berhasil (dipakai untuk temuan §4.16): `unzip file.docx -d folder/`, lalu skrip Node.js
  kecil yang mencocokkan regex `/<w:t[^>]*>([\s\S]*?)<\/w:t>/g` per paragraf (dipisah dengan
  `split('</w:p>')`) untuk menarik teks polos dari `word/document.xml` — tulis hasilnya ke berkas di
  scratchpad lalu baca dengan `Grep`/`Read` biasa. Tabel dan beberapa paragraf kompleks (field TOC,
  sel tabel dengan gaya campuran) masih bisa menyisakan XML mentah di output; jangan panik bila
  terlihat tag aneh, cari baris bersih di sekitarnya.
- **Ada BEBERAPA salinan `.docx` laporan TA yang gampang tertukar** — lihat §4.16. `docs/LAPORAN
  TUGAS AKHIR.docx` di repo ini **bukan** yang aktif dikerjakan; yang aktif ada di
  `TUGAS AKHIR/Laporan Tugas Akhir/LAPORAN TUGAS AKHIR TERBARU.docx` (satu tingkat di luar folder
  proyek frontend). Cek tanggal ubah berkas (`ls -la`) sebelum percaya salinan mana yang terbaru —
  jangan asumsi dari nama folder saja.
- **Jangan pernah mengisi kolom hasil pengujian (Handal/Tidak Handal, Sesuai/Tidak Sesuai) dengan asumsi
  "pasti lolos" tanpa dasar** — itu fabrikasi data pengujian. `TESTING.md` masih sengaja kosong. Bab 5
  `docs/PDHUPL.md` **sudah diisi** (28 Sep, §4.11), tapi lewat **penelusuran kode**, bukan eksekusi nyata di
  `karinakas.com` — kedua metode itu berbeda dan penyusun perlu tahu bedanya bila ditanya dosen pembimbing.
  Verifikasi nyata di situs live tetap wajib sebelum dianggap final, khususnya untuk hal yang tidak bisa
  dipastikan dari kode saja (tampilan visual, surel sungguhan, unggah berkas nyata).
