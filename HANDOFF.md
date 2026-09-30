# 🤝 HANDOFF — Progres Pengerjaan Website Karinakas

Berkas ini menjawab *"sudah sampai mana, apa yang masih bermasalah, dan apa langkah berikutnya"*.
Gambaran sistem (arsitektur, endpoint, konfigurasi) ada di **[CONTEXT.md](CONTEXT.md)** — baca itu lebih dulu.

**Diperbarui:** 30 September 2026

> **Untuk AI / room chat baru:** baca `CONTEXT.md` → berkas ini → bila menyentuh DPPL, `docs/dppl/CHECKLIST.md`.
> Bagian §7 menjelaskan cara bekerja yang disukai penyusun — ikuti itu.

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
| **PDHUPL** | ✅ **88 butir uji, Bab 5 & Bab 6 (SUS) lengkap** di `docs/PDHUPL.md` (§4.10–§4.13) — Bab 5 lewat **penelusuran kode**; **UT-03 (validasi KTP) diperbaiki 30 Sept, kini Handal** (§4.13, kode lokal belum di-deploy); **Bab 6 kini memuat data mentah P1–P10 seluruh 40 responden** (§4.12), bukan hanya skor akhir · ⬜ **verifikasi nyata di situs live masih perlu dilakukan sebelum dianggap final**. ⚠️ Berkas Word terpisah yang pernah diserahkan penyusun ("PDHUPL FX.pdf") adalah **ekspor lama** — sempat kurang 3 subbab (AD-28N/30N/32N di Bab 4.6); `docs/PDHUPL.md` sudah benar, tinggal ekspor ulang |
| **TESTING.md** | ✅ 181 kasus tersusun · ⬜ belum dijalankan/diisi |
| **Uji kebergunaan (SUS)** | ✅ **Sudah dijalankan — 40 responden nyata, skor rata-rata 72,56** (Baik/*Acceptable*), lihat §4.10 |
| **Laporan TA (.docx)** | ⚠️ Belum selaras dengan SKPL/DPPL — draf perbaikan sudah siap di `docs/laporan/`, tinggal dipindahkan |

**Yang paling mendesak:** (1) **commit & deploy perbaikan `AdminController.php`** (§4.7) — sudah teruji lokal
tapi belum sampai ke situs live; (2) memastikan surel reset kata sandi terkirim dari peladen (§5 butir lama 1);
(3) eksekusi nyata `TESTING.md` dan `docs/PDHUPL.md` supaya Bab V laporan punya angka hasil sungguhan, bukan
rencana uji kosong.

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

---

## 5. Masalah terbuka (diurutkan menurut prioritas)

### 🔴 Tinggi
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
   pengujian dari eksekusi nyata, bukan hanya pembacaan kode. Putuskan juga nasib UT-03 (Tidak Handal).
4. **Ekspor data mentah kuesioner SUS dan tempel *screenshot*** ke Bab 6 PDHUPL (lokasi sudah disiapkan, §4.11).
5. **Pindahkan `docs/laporan/BAB-IV-LENGKAP.md` ke Word** (§4.12) — sudah dalam bentuk siap tempel, penomoran
   4.1–4.6 sudah sama dengan Word Anda; sisipkan tangkapan layar yang masih kurang (§6 daftar tindakan).
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
- **Jangan pernah mengisi kolom hasil pengujian (Handal/Tidak Handal, Sesuai/Tidak Sesuai) dengan asumsi
  "pasti lolos" tanpa dasar** — itu fabrikasi data pengujian. `TESTING.md` masih sengaja kosong. Bab 5
  `docs/PDHUPL.md` **sudah diisi** (28 Sep, §4.11), tapi lewat **penelusuran kode**, bukan eksekusi nyata di
  `karinakas.com` — kedua metode itu berbeda dan penyusun perlu tahu bedanya bila ditanya dosen pembimbing.
  Verifikasi nyata di situs live tetap wajib sebelum dianggap final, khususnya untuk hal yang tidak bisa
  dipastikan dari kode saja (tampilan visual, surel sungguhan, unggah berkas nyata).
