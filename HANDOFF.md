# 🤝 HANDOFF — Progres Pengerjaan Website Karinakas

Berkas ini menjawab *"sudah sampai mana, apa yang masih bermasalah, dan apa langkah berikutnya"*.
Gambaran sistem (arsitektur, endpoint, konfigurasi) ada di **[CONTEXT.md](CONTEXT.md)** — baca itu lebih dulu.

**Diperbarui:** 14 Oktober 2026 (memuat pekerjaan 13 Okt)

> **Untuk AI / room chat baru:** baca `CONTEXT.md` → berkas ini (**blok "STATUS TERBARU 13 Okt" lalu "12 Okt" tepat di bawah ini dulu**, lalu §4.27–§4.30, §6 blok 13 Okt)
> → **`D:\KULIAH\Sems 7\SKRIPSI\TUGAS AKHIR\docs\final\BAHAN-BELAJAR-SIDANG.md`** (bahan sidang + **§13 daftar perbaikan terpadu** untuk laporan/SKPL/DPPL/PDHUPL)
> → `D:\...\docs\final\_PROGRES.md` (titik simpan 6–11 Okt) → bila menyentuh DPPL, `docs\dppl\CHECKLIST.md` (lokasi baru, lihat di bawah).
> Bagian §7 menjelaskan cara bekerja yang disukai penyusun — ikuti itu.

> 🆕🆕🆕 **STATUS TERBARU 13 Okt 2026 (rincian §4.30)** — ringkasan 1 layar untuk room baru:
> 1. **Template notifikasi admin kini NYATA:** isi yang diedit Admin/Super Admin disimpan di server dan dipakai pada surel relawan-diterima & donasi-terverifikasi (dulu hanya `localStorage`, tidak berpengaruh).
>    Lencana status di Riwayat Notifikasi membaca status asli (Terkirim/Gagal) → **K-9 selesai**.
> 2. **Beranda → "Kegiatan Kami" dinamis** (3 kegiatan berstatus aktif dari API, kartu bisa diklik ke `/kegiatan?detail=<id>`, halaman Kegiatan membuka modal detail dari parameter itu).
> 3. **Statistik diseragamkan** (sumber tunggal `src/data/lembaga.js`): **5.000+ Penerima Manfaat · 120+ Kegiatan Sosial · 800+ Relawan Aktif · 15+ Tahun Berkarya** di Beranda, Tentang Kami, layar Intro, Login, Register.
>    ⚠️ Ini **menggantikan** keputusan 11 Okt "angka statistik dibiarkan" (permintaan penyusun 13 Okt).
> 4. **Perbaikan hasil pengecekan menyeluruh:** pesan 429 berbahasa Indonesia (`api.js`), pengalihan HTTP→HTTPS (`public/.htaccess`), impor tak terpakai di `Berita.jsx`.
> 5. **Pengecekan fungsional menyeluruh 13 Okt** (API 50 skenario + Chrome sungguhan, backend MySQL sementara): semua fungsi lulus kecuali **webhook `/webhook/payment/callback` → 500** (cacat nyata, belum diperbaiki; tak dipakai klien).
> 6. **Commit:** frontend `3c1381a`, `ebe0c0b`, `a2507d1`; backend `aca6136`. Working tree frontend: `dist.zip` terhapus (belum di-commit).
> 7. ✅ **Deploy frontend TERBUKTI** (13 Okt): live memuat `index-CoFZiLO3.js`, identik SHA-256 dengan `dist/` lokal; HTTP→HTTPS aktif; 10/10 pemeriksaan Chrome pada situs live lulus. Backend (template notifikasi) juga aktif (rute template → 401 tanpa token).
> 8. **Yang masih menunggu:** uji **surel SMTP asli** ke kotak masuk (hanya terbukti sampai log) → putuskan webhook (501 / hapus) → alamat API via `http://` belum dialihkan → K-8 (label tab), K-2 (`/change-password`) →
>    **titik akhir kini 68 di kode** (66 + 2 rute template; 67 bila K-2) → angka 65 di SKPL/DPPL/§13 perlu diputuskan ulang → terapkan §13 ke `.docx`.

> 🆕🆕 **STATUS TERBARU 12 Okt 2026 (sesi 11–12 Okt; rincian §4.27–§4.29)** — ringkasan 1 layar untuk room baru:
> 1. **Naskah final yang akan diserahkan = folder `D:\KULIAH\Sems 7\SKRIPSI\TUGAS AKHIR\FINAL\`**: `220711818_Laporan Tugas Akhir.docx` (+ `.pdf`),
>    `220711818_SKPL.docx`, `220711818_DPPL.docx`, `220711818_PDHUPL.docx` (diubah 7 Okt 17:34–17:42). **Rev2, Rev3, `*_Aaron.docx`, `TERBARU.docx`, `REVISI\` semuanya usang**
>    (pernyataan "naskah aktif = Rev2" di blok bawah **sudah tidak berlaku**). Isi laporan FINAL = Rev3 + perbandingan SUS ke Kitabisa [14] dan PAON [15].
> 2. **Dokumen pendukung final belum sinkron dengan laporan/kode** (65 vs 66 titik akhir; SKPL masih 72 FR/32 NFR; PDHUPL sampul `Tgl: <isi tanggal>` dan sisa `[K-6]`;
>    DPPL masih menulis "kode OTP"; dst.). **Daftar perbaikan lengkap (165 butir, dengan halaman Word hasil ukur, teks pengganti, angka final, daftar periksa) =
>    `docs\final\BAHAN-BELAJAR-SIDANG.md` §13.** Pengeditan `.docx` dikerjakan penyusun sendiri; AI hanya memberi panduan.
> 3. **Keputusan penyusun 11–12 Okt:** judul "…Meningkatkan Konversi…" **dipertahankan** (tak bisa diubah); angka statistik Beranda/Intro/Tentang Kami **dibiarkan**;
>    visi–misi dan pengurus Tentang Kami **diganti ke data resmi** (PDF organigram Karinakas 2026); tombol **Batalkan pendaftaran relawan** dan **Unggah bukti susulan
>    (tab Riwayat Donasi)** **dibuat**; **fitur "ubah kata sandi" ditiadakan** — diganti **pemulihan/reset kata sandi tanpa sandi lama** (hanya tautan surel + reset oleh Super Admin).
> 4. **Kode yang berubah (sudah di-commit penyusun):** frontend `c3de860` (11 Okt 13:52: `TentangKami.jsx`, `Profil.jsx`, `admin/shared/ConfirmDelete.jsx`, dan dokumen ini);
>    backend `0a55219` (11 Okt 11:55: `KegiatanController` tak lagi memuat relawan + tes regresi). **Tidak ada migrasi.**
> 5. 🔴 **Temuan live 12 Okt 01:04 (diperiksa AI, read-only):** (a) `GET /kegiatan` publik **0 relawan** — kebocoran KTP **sudah tertutup di produksi**; (b) **frontend yang
>    aktif di karinakas.com (`/assets/index-C4RUnKxG.js`) LEBIH LAMA daripada `c3de860`**: tidak memuat "Batalkan", "Unggah bukti", visi–misi resmi, maupun rekap
>    "Donasi per Kegiatan"/"Tampilkan semua", dan masih memuat pengurus contoh `randomuser.me`. Bundel yang sempat aktif sebelumnya (`index-DoJwPbZ6.js`, memuat rekap) masih ada di
>    peladen tetapi tidak dirujuk `index.html`. **→ Build ulang dari `c3de860` dan unggah `dist/` (tanpa menimpa folder `api`, sertakan `.htaccess`).**
> 6. **Yang masih menunggu (urut):** deploy frontend terbaru → ubah label tab "Kegiatan Relawan" → **"Riwayat Relawan"** (K-8, 1 baris `Profil.jsx`) → lencana status Notifikasi admin membaca
>    status asli (K-9, `SectionNotifikasi.jsx`) → putuskan K-2 (**hapus rute `POST /change-password` + `AuthController::changePassword`**; kini masih ada di kode dan live, membalas 401 tanpa token)
>    → **uji ulang di situs**: UT-04, UT-05, UT-08 (dua jalur unggah), AD-10 (draft berita di panel admin), NL-01, surel donasi & reset sandi ke kotak surel nyata → terapkan §13 pada `.docx`.
> 7. **Hal yang dilarang diisi dengan asumsi:** hasil uji (Handal/Tidak Handal), tanggal pasti black-box (hanya "September 2026"), nama perwakilan Karinakas, sumber Tabel 6.8 PDHUPL, skor PAON (80).

> 🆕 **BACA INI DULU — sesi 6–11 Okt 2026 mengubah banyak hal (rincian §4.21–§4.26):**
> 1. **Folder `docs/` dipindahkan penyusun keluar repo** ke `D:\KULIAH\Sems 7\SKRIPSI\TUGAS AKHIR\docs\`
>    (isi utuh, termasuk `docs\final\`). Sejak commit frontend `090c107` (9 Okt) `docs/` **tidak lagi dilacak Git**.
>    **Semua jalur `docs/...` di berkas ini kini berarti `D:\...\TUGAS AKHIR\docs\...`.**
> 2. ~~**Naskah aktif sekarang:** `Laporan Tugas Akhir\Terbaru Lagi\LAPORAN_TUGAS_AKHIR_Rev2.docx` + `Dokumentasi Selama TA\{SKPL,DPPL,PDHUPL}_Aaron.docx`.~~
>    **⚠️ USANG per 12 Okt:** naskah final = folder `D:\...\TUGAS AKHIR\FINAL\` (lihat blok STATUS TERBARU di atas). Rev2 (5 Okt), Rev3 (7 Okt 14:51), dan `_Aaron.docx` adalah
>    versi lebih lama; nomor halaman pada `docs\final\PANDUAN-PERBAIKAN-*.md` dihitung pada `_Aaron.docx` dan **tidak berlaku** untuk FINAL (pakai `BAHAN-BELAJAR-SIDANG.md` §13).
>    Blok 🔴 di bawah (soal `TERBARU.docx`, `REVISI\`) adalah **sejarah** dan tidak perlu dikerjakan.
> 3. **Fakta yang DIKONFIRMASI penyusun (anggap benar):** responden kuesioner kebutuhan = **35**; SUS **n=40 tetap**
>    (wawancara super admin = 1 orang yang sama dengan responden pengelola); **OTP dan WhatsApp tidak dipakai**;
>    **black-box dilakukan nyata oleh penyusun + pihak Karinakas, semua Handal** (jangan menulis "penelusuran kode");
>    validasi KTP 16 digit sudah sesuai; di laporan pemeriksaan selain usability(SUS)/black-box **dihapus**;
>    NFR berbasis pengukuran + task success rate **dihapus dari SKPL**; laporan & dokumen pendukung bersifat **final** (nada netral).
> 4. **Hasil kerja sesi ini ada di `docs\final\`** (14 berkas): 4 panduan perbaikan berhalaman Word (`PANDUAN-PERBAIKAN-*.md`),
>    3 dokumen lengkap (`SKPL/DPPL/PDHUPL-LENGKAP.md`), catatan perubahan, `PDHUPL-11-BUTIR-SIAP-TEMPEL.md`,
>    `PENEMPATAN-USECASE-DAN-PDM-LAPORAN.md` (revisi dosen), `SLIDE-PRESENTASI-TA.md`, `_PROGRES.md`.
> 5. **Kode baru, sudah di-commit & ter-push 9 Okt:** surel donasi terverifikasi (backend), paging + urutan Terbaru/Terlama
>    di semua daftar admin, rekap donasi per kegiatan, filter berita tanpa "Kegiatan" (frontend). **Deploy ke karinakas.com belum
>    terverifikasi.**
> 6. 🔴 **Dua hal paling berisiko (status 12 Okt):** (a) ~~`GET /kegiatan` publik memuat relasi relawan (KTP)~~ — **TERTUTUP di produksi** (diverifikasi 11 dan 12 Okt: 0 relawan);
>    (b) nilai kata sandi bawaan reset-sandi **masih tertulis di `PDHUPL.docx` FINAL (butir AD-32, baris hasil, halaman 49)** dan di `docs\PDHUPL.md` ±baris 687 — **hapus nilainya** (PDHUPL P-12 di §13).

> ⚠️ **[SEJARAH 2–5 Okt — USANG, jangan dikerjakan]** Blok di bawah mencatat keadaan sebelum naskah final ada di `FINAL\`.
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
| 🆕🆕 **Naskah FINAL (12 Okt)** | `D:\...\TUGAS AKHIR\FINAL\220711818_{Laporan Tugas Akhir,SKPL,DPPL,PDHUPL}.docx` (7 Okt 17:3x–17:4x; laporan 122 hal., SKPL 59, DPPL 64, PDHUPL 63). Menggantikan Rev2/`_Aaron`. **165 perbaikan terdaftar** (laporan 121, SKPL 18, DPPL 10, PDHUPL 16) di `docs\final\BAHAN-BELAJAR-SIDANG.md` §13, lengkap halaman Word dan teks pengganti. **Pengeditan `.docx` dikerjakan penyusun sendiri** (AI hanya memberi panduan) |
| 🆕🆕 **Bahan belajar sidang** | `docs\final\BAHAN-BELAJAR-SIDANG.md` (±300 KB): kartu angka, ringkasan laporan, metode (Waterfall/HCD/black-box/SUS) + kelebihan–kekurangan, penjelasan pustaka [1]–[15], pemetaan kebutuhan→fitur, penjelasan kode BE/FE, titik rawan T-01…T-28, bank Q&A (Q1–Q63), §6.9 rasional unggah bukti susulan & pembatalan relawan, §6.10 koreksi dokumen ubah-sandi, **§13 daftar perbaikan terpadu** |
| 🆕🆕 **Frontend (12 Okt)** | Kode: `c3de860` memuat Tentang Kami (organigram + visi–misi resmi, kartu berinisial), Profil (tombol **Batalkan** pendaftaran relawan, **Unggah/Ganti bukti** donasi pending), `ConfirmDelete` (props teks opsional). ⚠️ **Live masih bundel lama `index-C4RUnKxG.js`** (tanpa fitur-fitur itu dan tanpa rekap per kegiatan) → perlu build + unggah ulang |
| 🆕🆕 **Backend (12 Okt)** | `0a55219`: `KegiatanController` tidak lagi memuat relawan (publik) + tes `KegiatanPublikTidakMembocorkanRelawanTest` (4 tes). **Aktif di live (0 relawan terkirim).** `POST /change-password` masih ada (tak dipakai klien; direkomendasikan dihapus) |
| 🆕🆕 **Ubah kata sandi** | **Ditiadakan** (keputusan 11 Okt). Satu-satunya jalur pengguna = pemulihan kata sandi (tautan surel). Dokumen yang masih menyebutnya: SKPL FR 209/UC-07/NFR 3.4.4.1/F-07/antarmuka, DPPL 2.1/AuthController/`changePassword`/B5, PDHUPL SR-10 & SR-11, laporan 4.4.5 & 5.2.1.11 — semuanya di §13 |
| 🆕 **Dokumen final `.md`** | `docs\final\{SKPL,DPPL,PDHUPL}-LENGKAP.md` selesai 7 Okt (SKPL: 80 FR, 24 UC, **21 NFR** setelah penghapusan 11 NFR pengukuran; DPPL: 78 fungsi/9 kontroler, 39 kelas, 9 tabel, 28 antarmuka; PDHUPL: 87 Handal + 1 Tidak Berlaku). Berisi penanda `[KONFIRMASI K-n]`/`[diisi penyusun]` yang harus dijawab (§6). **Belum ditempel ke `.docx`** |
| 🆕 **Surel donasi terverifikasi** | ✅ Kode selesai, teruji **lokal** (render + transport `array`); commit backend `41071cc` (7 Okt) + `46c940c` (9 Okt, fallback kegiatan kosong → "-") sudah ter-push · ⚠️ **belum terbukti terkirim dari peladen** (SMTP produksi + alur DB belum diuji) |
| 🆕 **Dasbor admin** | ✅ Paging + urutan Terbaru/Terlama di 8 bagian, **semua daftar kini memuat seluruh halaman** (dulu terpotong 100/20 baris), rekap donasi per kegiatan (Super Admin) · commit frontend `090c107` + `0632105` (9 Okt) · ⚠️ belum diuji di peramban oleh AI; deploy belum terverifikasi |
| **Git (12 Okt)** | Backend `main` @ `0a55219` (kerja bersih); frontend `main` @ `c3de860` (kerja bersih). Status "ter-push"/aktif di cPanel **tidak dapat diverifikasi dari komputer ini** — pakai pemeriksaan live (§4.27). _Catatan lama 11 Okt:_ backend `46c940c`, frontend `0632105`. `.gitignore` frontend memuat `dist`, tetapi `dist.zip` **ikut terlacak**. Catatan: `git fetch` dari komputer ini gagal (SSL "unable to get local issuer certificate") sehingga status "ter-push" hanya dari penanda lokal |

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

> **Tambahan 6–11 Okt:** poin (b) di atas sudah **terjawab** — responden = **35** (konfirmasi penyusun) dan naskah aktif =
> `Rev2.docx`. Yang kini mendesak: lihat **§6 blok "🆕 Menunggu tindakan 11 Okt"** dan `docs\final\_PROGRES.md`.

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
| 35 | 5–6 Okt | **Audit menyeluruh** Rev2 + `SKPL/DPPL/PDHUPL_Aaron.docx` oleh agen read-only (tata bahasa, kelengkapan, kesesuaian dengan kode) — 17 temuan awal Rev2, 139 butir bahasa Rev2, 75 SKPL, 53 DPPL, ±50 PDHUPL (§4.21) |
| 36 | 6–7 Okt | **Panduan perbaikan per dokumen** dengan **nomor halaman Word nyata** (skrip COM `find-pages.ps1` pada salinan berkas) → `docs\final\PANDUAN-PERBAIKAN-{LAPORAN,SKPL,DPPL,PDHUPL}.md`; lalu **dokumen lengkap** `SKPL/DPPL/PDHUPL-LENGKAP.md` + catatan perubahan (isi mengikuti **kode apa adanya**); batas sesi API memutus agen berkali-kali → dipasang titik simpan `_PROGRES.md` (§4.21) |
| 37 | 7 Okt | **Keputusan penyusun:** n SUS tetap 40, NFR pengukuran dihapus (11 dari 32 → **21 NFR**), siap-tempel 11 butir PDHUPL yang bertentangan dengan kode (`PDHUPL-11-BUTIR-SIAP-TEMPEL.md`) (§4.21, §4.24) |
| 38 | 7 Okt | **Kode: surel donasi terverifikasi diperbaiki** — `Mail::send` selama ini dikomentari (TODO) tetapi penanda `notifikasi_terkirim` tetap true dan riwayat "terkirim". Dibuat `DonasiDiverifikasi` + view Blade, `kirimEmail` nyata, riwayat `terkirim`/`gagal` sesuai hasil (§4.23) |
| 39 | 7–9 Okt | **Revisi dosen:** laporan belum punya diagram use case dan PDM → panduan penempatan `PENEMPATAN-USECASE-DAN-PDM-LAPORAN.md` (4.3.7 dan 4.4.6, penomoran gambar Bab IV bergeser, "Dua relasi kunci tamu" harus jadi lima) (§4.25) |
| 40 | 9 Okt | **Frontend:** paging + urutan Terbaru/Terlama semua daftar admin, rekap donasi per kegiatan, filter berita tanpa "Kegiatan", label "tanpa kegiatan"; **commit & push** frontend `090c107`/`0632105`, backend `46c940c`; **`docs/` dipindah keluar repo** (§4.22, §4.26) |
| 41 | 9–11 Okt | Prosedur deploy backend+frontend (cPanel `git pull` + unggah `dist/`), `SLIDE-PRESENTASI-TA.md` (22 slide + Q&A + daftar periksa), pembaruan HANDOFF/CONTEXT ini (§4.26) |
| 42 | 12–13 Okt | **Template notifikasi nyata** (backend `TemplateNotifikasi` + 2 rute + view surel dari templat; frontend tab Template memakai server), **K-9** lencana status asli; tes `TemplateNotifikasiTest` (§4.30) |
| 43 | 13 Okt | **Beranda kegiatan dinamis + tautan detail**, **statistik diseragamkan** (`lembaga.js`), deploy frontend (insiden `index.html` tertimpa & zip ke subfolder `dist/`) (§4.30) |
| 44 | 13 Okt | **Pengecekan fungsional menyeluruh** (API 50 skenario, Chrome, MySQL sementara) + perbaikan 429/HTTPS/impor; verifikasi situs live 10/10 (§4.30) |

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

### 4.21 Audit 5–6 Okt dan pekerjaan dokumen final (5–7 Okt)
- **Naskah yang diaudit** (read-only, oleh agen): `Rev2.docx`, `SKPL_Aaron.docx`, `DPPL_Aaron.docx`, `PDHUPL_Aaron.docx`.
  Tiga jenis tinjauan: tata bahasa, kelengkapan, kesesuaian (dokumen ↔ dokumen ↔ **kode**). Hasil per dokumen ada di
  `docs\final\PANDUAN-PERBAIKAN-*.md` — tiap butir: **penanda** (`[TYPO] [BAKU] [MIRING] [KALIMAT] [LENGKAPI] [HAPUS]
  [REVISI] [KODE] [ANGKA] [RUJUKAN] [NADA] [KONFIRMASI]`), **halaman Word nyata**, kutipan untuk Ctrl+F, saran; plus bagian
  "Penjelasan Kesesuaian dengan Kode" berbahasa awam dan "Butuh Konfirmasi Penyusun". Jumlah butir: Laporan 421 (120 hal.),
  SKPL 304 (57 hal.), DPPL 219 (65 hal.), PDHUPL 243 (62 hal.).
- **Cara mengukur halaman:** `docs\final\tools\find-pages.ps1` membuka **salinan** `.docx` lewat Word COM (read-only,
  antrean mutex) dan mengembalikan halaman fisik tiap kutipan. Pemakaian: `powershell -NoProfile -File find-pages.ps1
  -Docx <docx> -Queries <q.json> -Out <hasil.json>` (`q.json` = larik kutipan ≤100 karakter).
- **Dokumen lengkap `.md`** (`docs\final\`), **berkas BARU** — SKPL/DPPL/PDHUPL lama dan `.docx` **tidak diubah**: isi mengikuti
  **kode apa adanya**; kekurangan kode ditulis di bagian "Catatan Kesesuaian dengan Implementasi" (SKPL Lampiran B, DPPL
  Lampiran A). Dipakai awalan **"FR Karinakas"** (bukan "FR SIKAS"). Gambar tidak bisa dibuat agen → penanda
  `[Gambar n.n: ekspor/tempel oleh penyusun]` (diagram kelas, PDM, wireframe A12/A13/B6/C9 baru).
- **Titik simpan:** karena batas sesi API memutus agen 4×, pekerjaan ditulis bertahap dengan `PROGRESS.md` per agen dan
  `docs\final\_PROGRES.md`. Untuk melanjutkan di chat baru: "Lanjutkan pekerjaan sesuai docs/final/_PROGRES.md".
- **NFR dihapus (7 Okt, keputusan penyusun):** 3.4.1.1, 3.4.1.2, 3.4.1.4, 3.4.1.5, 3.4.2.1, 3.4.3.2 (task success rate),
  3.4.3.3, 3.4.5.1, 3.4.5.2, 3.4.7.1, 3.4.7.2 + kekangan K-20 → **21 NFR**. Pemetaan: 3.4.1.3→3.4.1.1; 3.4.2.2–5→3.4.2.1–4;
  **3.4.3.4 (SUS 68)→3.4.3.2**; 3.4.3.5→3.4.3.3; 3.4.3.6→3.4.3.4; 3.4.5.3→3.4.5.1. Panduan docx: `PANDUAN-HAPUS-NFR-SKPL-DOCX.md`
  (kartu NFR hal. 50–56, K-20 hal. 15, Daftar Isi hal. 3 pada `SKPL_Aaron.docx` versi 7 Okt). **Rujukan usang di
  `PANDUAN-PERBAIKAN-LAPORAN.md`: "NFR 3.4.3.4" → 3.4.3.2** (butir 172 hal. 45, butir 331 hal. 103).
- **FR baru di SKPL-LENGKAP:** 112, 313 (relawan umum), 314, **315 (pembatalan pendaftaran relawan)**, 316, 412, 518, **519 (surel
  donasi terverifikasi)** → total **80 FR** (angka lama 71/72 salah). FR 315 tanpa UC (pilihan agen, belum diputuskan).
- **Temuan paling berat Rev2 (6 Okt), semua masih perlu tindakan penyusun:** Lembar Pengesahan/Pernyataan Instansi masih templat
  (penandatangan Dionisius vs Bernardus Himawan; tanggal 19 Juni vs 1 Okt vs SUS 3–26 Sep); komentar pembimbing II (Abstrak)
  belum di-resolve; angka responden 35/27/25 (Bab IV 4.3.3 dan Persona 4 "25 lain", Bab VI); kolom Hasil PDHUPL penuh nama
  fungsi/berkas; Bagian Keterbatasan 5.3 menyalin "Kelebihan"; janji Bab III tanpa hasil (responsif, task success rate, error
  rate, ISO 25010, UEQ → **dihapus** sesuai keputusan); ambang SUS 70 (Bab III) vs 68; judul "Meningkatkan **Konversi**" tanpa
  definisi/pengukuran; Gambar 4.2 ganda, Gambar 5.28 tanpa caption; "Subbab 4.4.8"/"4.3.1a" tak ada; pustaka [12]/[13] tertukar,
  Bangor 2008/Brooke 1986 tanpa entri, [13] rusak; "Hybrid REST API dan Blade" (2.3.2) vs Bab IV; "Dua relasi kunci tamu" (4.5.3)
  seharusnya **lima**.
- **Perhitungan SUS dihitung ulang (skrip): benar** — 71,38 (n=29) / 75,68 (n=11) / 72,56 (n=40); hanya pembulatan Tabel 6.6
  yang perlu 2,13 / 4,18 / 3,18; 14 responden (35%) di bawah 68 belum dilaporkan di Rev2.

### 4.22 Temuan kode dari audit (dicatat; **belum diperbaiki** kecuali dinyatakan)
Urut prioritas. Semua dari pembacaan kode kecuali dinyatakan teruji:
1. 🔴 **Data pribadi relawan di rute publik:** `GET /kegiatan` (`KegiatanController.php:42-44`, memuat `relawan` berstatus diterima)
   dan `GET /kegiatan/{id}` (`:58`, `relawan.user`) berada di luar `auth:sanctum` (`routes/api.php:37-38`); `User` hanya menyembunyikan
   `password`/`remember_token`, `Relawan` tidak menyembunyikan apa pun → email, telepon, alamat, **nomor KTP** berpotensi terbaca siapa
   pun; `kegiatanService.list` memanggil `per_page=100` dari Beranda. Berkaitan SKPL K-14 (UU PDP).
   🔴 **TERBUKTI di situs live (uji 11 Okt 2026, GET tanpa token ke `karinakas.com/api/index.php/api/v1`):** `/kegiatan?per_page=100` → HTTP 200, 4 kegiatan, 3
   membawa relawan, **7 baris relawan** terkirim ke publik dengan field berisi nilai `nomor_ktp`, `kebutuhan_khusus`, `motivasi`, `kemampuan_diri`; `/kegiatan/{id}` →
   `relawan.user` berisi `no_telepon`, `email`, `asal_paroki` (+`alamat`). Uji hanya mencetak nama field/jumlah (tanpa nilai). **Belum diperbaiki** (kode backend tak berubah
   sejak 46c940c). Frontend **tidak** memakai daftar relawan dari endpoint ini (hanya penghitung `jumlah_relawan_terdaftar`), jadi perbaikan aman: hapus `with(relawan…)` pada
   `index` dan `relawan.user` pada `show` (atau sembunyikan field), admin tetap memakai `/admin/relawan`.
   ✅ **DIPERBAIKI di kode 11 Okt 2026 (belum di-commit, BELUM di-deploy → situs live MASIH bocor sampai deploy):** `KegiatanController::index` tidak lagi `with(relawan)`,
   `show` kini `with(['galeri'])`. Tes regresi baru `tests/Feature/KegiatanPublikTidakMembocorkanRelawanTest.php` (4 tes, data rekaan, SQLite memori): lulus dengan perbaikan; pada
   kode lama (HEAD) **2 dari 4 gagal** (daftar & detail) → tes terbukti menangkap kebocoran. Seluruh suite 6/6 lulus. Menjalankan tes butuh driver SQLite: `php -d extension_dir=<php>\ext
   -d extension=pdo_sqlite -d extension=sqlite3 vendor/bin/phpunit` (driver tidak aktif di `php.ini` Laragon). **Sesudah deploy: ulangi uji live** (skrip GET tanpa token; hasil yang diharapkan 0 relawan).
2. **Lupa kata sandi** memakai `exists:users,email` (`AuthController.php:194`, `:310`) → email tak terdaftar dijawab 422 (enumerasi akun),
   bertentangan dengan rancangan "jawaban sama".
3. **Pendaftaran relawan:** formulir tanpa pemilih kegiatan (kegiatan dari `?kegiatan=`), backend tidak memeriksa `butuh_relawan`.
4. **Rekap/ekspor:** tombol "Export Laporan" di `AdminDashboard.jsx` terbuka untuk admin; `/admin/rekapan/*` tidak dibatasi super admin
   dan `rekapanRelawan` memuat `nomor_ktp`/`no_telepon` (FR 513 menyebut "di sisi layanan").
5. **Dua webhook tanpa autentikasi** (`routes/api.php` ±137, ±140): `payment/callback`→`updateStatus` (butuh `$request->user()`) dan
   `notifikasi/donasi/{id}` (kini hanya mengirim bila status berhasil; tidak menulis `notifikasi_logs`).
6. **CORS `allowed_origins => ['*']`** (`config/cors.php`) vs NFR 3.4.4.6/K-17.
7. **Dugaan:** `KampanyeController::index/show` di rute publik dengan guard bawaan `web` → admin mungkin tidak melihat berita **draf**
   (butir AD-10). Uji: buat berita Draft sebagai admin, lihat apakah muncul.
8. **Tidak ada UI ubah kata sandi** (hanya API `change-password`); `relawanService.cancel` tidak dipanggil → **tombol batal relawan
   tidak ada**; 19 titik akhir tidak dipanggil klien (pencarian admin, rekapan, `available/volunteer`, dsb.).
9. **Template notifikasi** hanya disimpan di `localStorage` (`kk_notif_templates`); layar Notifikasi admin menulis **"✓ Terkirim" statis**
   dan memetakan semua pemicu selain `donasi_verified` sebagai "Relawan disetujui" — **belum diperbaiki** (menunggu keputusan §6).
10. **Beranda berisi data tetap:** `Stats.jsx` 5000+/120+/800+/15+, `components/Kegiatan.jsx` 3 kartu, `IntroScreen.jsx` 500+/1.200+/80+;
    tidak ada bagian berita (butir PU-01).
11. `storeUser`/`updateUser` `nama_lengkap max:150` vs kolom `varchar(100)`; token yatim di `personal_access_tokens` setelah `deleteUser`;
    "Ingat saya" tidak berfungsi; `exportRekapan` placeholder; pesan validasi berbahasa Inggris (locale `en`).
12. **Kata sandi bawaan reset-sandi super admin** tertulis di `docs\PDHUPL.md` ±baris 687 (butir AD-32) dan kemungkinan di `PDHUPL_Aaron.docx`
    — **jangan dikutip di dokumen mana pun** (aturan §7 butir 6); hapus nilainya.

### 4.23 Perbaikan kode: surel donasi terverifikasi (7 Okt; commit backend `41071cc`, `46c940c`)
- **Penyebab "tidak masuk":** `NotifikasiController::kirimEmail` hanya `Log::info`; `Mail::send` berada di blok komentar `// TODO`. Fungsi tetap
  menyetel `notifikasi_terkirim=true` dan `DonasiController::updateStatus` mencatat riwayat "terkirim" — jadi riwayat **berbohong**.
- **Perubahan (4 berkas + 1 kosmetik):** `app/Mail/DonasiDiverifikasi.php` (baru), `resources/views/emails/donasi-diverifikasi.blade.php`
  (baru; gaya sama dengan `relawan-diterima`), `NotifikasiController` (`kirimEmail` kini `Mail::to(...)->send(new DonasiDiverifikasi(...))`;
  melempar galat bila donatur tanpa surel; `kirimNotifikasiDonasi` mengembalikan `null` bila sudah terkirim, **422** bila status bukan
  `berhasil`; sukses → `notifikasi_terkirim=true`), `DonasiController::updateStatus` (riwayat `terkirim`/`gagal` sesuai hasil nyata; tidak
  mencatat bila hasil `null`), dan `46c940c` (baris Kegiatan kosong → "-", bukan "Donasi umum"). `getTemplate`/`logNotifikasi` tetap ada (tidak dipakai/
  tetap tulis kanal log `notifikasi`). **Tanpa migrasi, tanpa perubahan `composer`.**
- **Teruji lokal:** sintaks, render Blade (nama/jumlah/kegiatan/metode/ID/tanggal Indonesia), kirim ke transport `array`. **Belum teruji:**
  alur DB penuh dan SMTP produksi. Donasi yang diverifikasi **sebelum** perbaikan sudah bertanda `notifikasi_terkirim=true` → tidak dikirimi surel.
- **Uji di situs:** donasi baru berstatus pending (akun donatur dengan surel yang bisa dibuka) → super admin ubah ke **Berhasil** → cek kotak
  masuk, riwayat notifikasi, `storage/logs/laravel.log`. Setelah terbukti: hapus penanda `[UJI ULANG DI SITUS]` pada butir AD-14 di `PDHUPL-LENGKAP.md`
  dan tempel teks AD-14 baru dari `PDHUPL-11-BUTIR-SIAP-TEMPEL.md` §8.
- **Donasi tanpa kegiatan:** donasi **baru** wajib terikat kegiatan (`required|uuid|exists`, `DonasiController.php:51`; frontend menolak kosong). Kolom
  `donasi.kegiatan_id` tetap `nullable` + `ON DELETE SET NULL` → baris "tanpa kegiatan" hanya data lama / kegiatan yang dihapus (sengaja: donasi = bukti dana).
  "Donasi Umum" yang masih ada di `store.js` adalah pilihan **tujuan**, bukan kegiatan.

### 4.24 Keputusan penyusun 6–9 Okt dan 11 butir PDHUPL
- **Dikonfirmasi penyusun:** lihat blok 🆕 di awal berkas (35 responden; n=40; OTP/WhatsApp tak dipakai; black-box nyata; KTP 16 digit; hapus
  pemeriksaan non-usability/black-box dari laporan; dokumen final bernada netral; lengkapi FR; 7 Okt: wawancara super admin = 1 orang yang sama,
  NFR pengukuran dihapus).
- **11 butir PDHUPL yang Keluaran Diharapkannya bertentangan dengan kode** (SR-08, SR-10, SR-11, PU-01, UT-04, UT-05, AD-10, AD-14, AD-29, AD-37, NL-01):
  teks pengganti + lokasi halaman ada di `docs\final\PDHUPL-11-BUTIR-SIAP-TEMPEL.md` (versi docx 7 Okt 01:10, 63 hal.). Kesimpulan tetap **Handal** sesuai
  pernyataan penyusun; teks disesuaikan dengan perilaku sistem. **Wajib dicocokkan dengan hasil pengujian nyata penyusun/Karinakas** (teks disusun dari
  kode, bukan catatan uji). AD-10 butuh uji 2 menit (draf tampil/tidak → dua versi teks). AD-37 diselaraskan dengan judul penyusun ("Edit kegiatan lama, ubah
  Tanggal menjadi lebih akhir daripada tanggal selesai tersimpan" — skenario nyata karena UI hanya punya satu isian Tanggal, `resources.js:57-58`).
  **AD-29 kini tidak benar lagi** ("hanya 20 pengguna") karena daftar admin memuat semua halaman (§4.26) → ubah Keluaran/Hasil ke "seluruh pengguna tampil per halaman".
- **Pembenahan kecil di dokumen buatan sesi:** FR pembatalan relawan = **315** (sempat salah 313 di `PDHUPL-LENGKAP.md`, sudah diperbaiki).

### 4.25 Revisi dosen: diagram use case dan PDM (7–9 Okt)
- Rev2 **tidak memuat diagram use case, ERD, maupun PDM** (kata "ERD" hanya janji di Bab III). Panduan: `docs\final\PENEMPATAN-USECASE-DAN-PDM-LAPORAN.md`.
- **Penempatan:** subbab baru **4.3.7 Diagram Use Case** (akhir 4.3.6, Tabel 4.6 hal. 59 → Gambar 4.1) dan **4.4.6 Perancangan Basis Data** (setelah 4.4.5,
  hal. 67 → Gambar 4.6). Teks siap tempel tersedia. **Penomoran gambar Bab IV bergeser:** UC 4.1, wireframe intro 4.2, Beranda 4.3, dashboard admin 4.4, mockup 4.5
  (sekaligus memperbaiki "Gambar 4.2" ganda), PDM 4.6; caption Gambar 5.1 "Gambar 4.3" → **4.5**.
- **Sumber gambar:** ekspor ulang dari `docs\skpl\use-case-diagram.drawio` (19 Sep, memuat UC-24) dan `docs\dppl\pdm-diagram.drawio`. **Jangan** pakai
  `use-case-diagram.png` (21 Agu, usang) atau gambar PDM di `DPPL_Aaron.docx` (tertinggal 14 beda kolom). draw.io tidak terpasang di komputer ini → penyusun yang mengekspor.

### 4.26 Frontend admin, pemindahan `docs/`, deploy, slide (9–11 Okt)
- **Paging + urutan** (`src/pages/admin/shared/usePaging.js`, `AdminPager.jsx`, gaya `.ad-pager*` di `index.css`): Kegiatan, Berita, Galeri (album dan foto, 12 kartu),
  Donasi, Relawan, Pengguna, Notifikasi, Audit; **10/20/50 per halaman**; urutan **Terbaru/Terlama** menurut tanggal tiap data (`tanggal`, `publishedAt`,
  `tanggalRaw`, `createdAt`); kembali ke halaman 1 saat penyaring berubah (state disesuaikan saat render, bukan `useEffect`, karena aturan lint). **Paging hanya
  tampilan — Export Rekap tetap memakai seluruh data tersaring.**
- **Daftar admin kini memuat SEMUA halaman** (`ambilSemuaHalaman`) untuk kegiatan, berita, notifikasi, audit, pengguna (dulu hanya 100 baris pertama; pengguna hanya 20
  karena `paginate(20)` mengabaikan `per_page`). `donasiFE` kini membawa `kegiatanId`.
- **Rekap donasi per kegiatan** (`SectionDonasi.jsx`, hanya super admin): per ID kegiatan — transaksi, menunggu, berhasil, **total diterima** (status berhasil), batang
  persen, tombol "Lihat" (menyaring tabel), 5 teratas/"Tampilkan semua". Baris "Tanpa kegiatan (data lama / kegiatan dihapus)" hanya bila ada data seperti itu.
  Sumber `kegiatan_id` tetap terbaca admin (hanya 5 medan keuangan yang disembunyikan). Teruji logika dengan data contoh (jumlah cocok total).
- **Filter berita:** tombol "Kegiatan" dihapus dari `Berita.jsx` (berita berkategori `kegiatan` tetap tampil di "Semua"; kategori di admin/backend **tidak** diubah).
- **Verifikasi AI:** lint file baru bersih (sisa error lint = pola `useEffect(load)` lama + impor `Link` tak terpakai di `Berita.jsx`), `vite build` ke folder sementara
  sukses. **Belum dicoba di peramban.**
- **`docs/` dipindah** (lihat blok 🆕); di repo frontend Git mencatat 41 berkas terhapus (sudah di-commit `090c107`). `dist.zip` ikut terlacak (commit `0632105`).
- **Prosedur deploy** (jawaban chat 9 Okt, ringkas di CONTEXT §10): backend = cPanel **Git™ Version Control → Update from Remote**, lalu `php artisan config:clear`,
  `route:clear`, `view:clear` (tanpa migrasi/composer); `.env` MAIL_* harus benar; uji surel donasi. Frontend = `npm ci` → `npm run build` (VITE_API_URL=`/api/index.php/api/v1`,
  VITE_STORAGE_URL=`/api/storage`) → ZIP **isi** `dist/` (klik kanan *Compress*, **bukan** `Compress-Archive` PS 5.1) → unggah & Extract ke web root, **jangan timpa folder `api`**,
  pastikan `.htaccess` (tersembunyi) ikut. **Status deploy sesi ini tidak terverifikasi** (AI tidak punya akses ke server).
- **Slide sidang:** `docs\final\SLIDE-PRESENTASI-TA.md` (format Marp; 22 slide + 14 antisipasi pertanyaan + daftar gambar/periksa + pembagian waktu). Slide 14
  ("Pengembangan Terbaru") hanya dipakai bila deploy terbukti.
- **Gotcha baru:** (1) jangan `git stash -u` di repo ini (sempat dipakai untuk uji lint; tidak ada yang hilang tetapi berisiko); (2) jangan `git add -A`/`commit -a` tanpa
  memeriksa — `docs/` tampil terhapus; (3) komputer ini tidak punya Python, draw.io, pandoc, soffice; Node dan Word (COM) ada; (4) `git fetch` gagal SSL; (5) batas sesi API
  bisa memutus agen — pakai `_PROGRES.md`; (6) agen sempat menulis "penyimpangan karena instruksi Anda" untuk keputusan yang sebenarnya pilihannya sendiri (Q-8/23/24/25) — tinjau.

### 4.27 Audit klaim laporan vs kode, keputusan penyusun, dan pemeriksaan live (11–12 Okt)
- **Sumber yang dibaca AI:** naskah `FINAL\*.docx` (teks diekstrak lewat unzip + Node; halaman diukur lewat Word COM pada **salinan** berkas), seluruh kode backend dan frontend,
  `Hasil diskusi 13 April 2026.txt` (masukan Karinakas), catatan bimbingan Dosen II 12 Maret (aturan sitasi/penulisan), dan PDF "Mengenal Karinakas" (visi, misi, program, organigram 2026).
- **Temuan utama (rincian T-01…T-28 di `BAHAN-BELAJAR-SIDANG.md` §9):** (1) Beranda: bagian Kegiatan (3 kartu), Stats, Values, dan Intro berisi **data tetap**, hanya Galeri (6 foto) dinamis — laporan 5.2.1.1
  menulis sebaliknya; (2) Tentang Kami sebelumnya berisi **pengurus fiktif + foto `randomuser.me`**; (3) tidak ada UI **ubah kata sandi** maupun tombol **batal relawan**, dan unggah bukti hanya dari layar pembayaran
  (padahal SKPL FR 307, UC-09, DPPL B2/B4, dan teks di `Donasi.jsx` sudah menjanjikan jalur susulan); (4) `forgotPassword` memvalidasi `exists:users,email` → email tak terdaftar dibalas **422** (laporan 5.2.1.8 menyebut "selalu berhasil");
  (5) penulis/waktu baca Berita **manual** (laporan menyebut otomatis); (6) lencana status di tabel Notifikasi admin selalu "Terkirim"; templat notifikasi hanya `localStorage`; (7) angka responden **35/27/25** tercampur;
  (8) 65 vs 66 titik akhir; (9) PDHUPL AD-10 hasilnya bertentangan dengan keluarannya; AD-32 memuat nilai kata sandi bawaan; (10) SKPL final masih 32 NFR (penghapusan 11 NFR pengukuran **belum diterapkan**);
  (11) DPPL menulis "pemulihan kata sandi melalui kode OTP"; B3/B4 menyebut "kode transaksi" (tidak ada); B5 menyebut username dapat disunting (tidak); (12) Bab III menjanjikan task success rate/error rate/UEQ/responsivitas tanpa hasil;
  (13) citasi: Kurniawan [5] (84,5% = respons baik, bukan efektivitas), Husseniy [2] (angka 94% tak terverifikasi; tiga deskripsi berbeda), Lichas [6] sudah memakai SUS, nomor sitasi tertukar di 2.3.4/2.3.6, entri [1][4][7][11][12][13][15] rusak,
  Brooke/Bangor/Sauro/Royce/ISO tidak ada di Daftar Pustaka; (14) paragraf "Keterbatasan" (5.3) hampir identik dengan "Kelebihan"; paragraf 3.13 masih instruksi templat kampus.
- **Keputusan penyusun:** lihat blok STATUS TERBARU butir 3. Jawaban lain: "deploy sudah" (diverifikasi sebagian, lihat di bawah); black-box "dapat dilihat dari PDHUPL" — PDHUPL hanya menulis *September 2026*, penguji fungsional "pengembang sistem";
  tanggal pasti dan nama perwakilan Karinakas **belum ada** di dokumen mana pun.
- **Fakta lembaga resmi (PDF):** Visi "Terwujudnya Peradaban Kasih di Indonesia yang Sejahtera, Bermartabat dan Beriman"; 4 misi (belarasa/kemanusiaan-keadilan-keutuhan ciptaan; jejaring pelayanan lokal–internasional;
  galang sumber daya; pelayanan terpadu untuk kemandirian). Program: Kesiapsiagaan (Paroki Tangguh KAS, Wreda Loka), Tanggap Darurat (relawan), Pascabencana (ketahanan pangan). **Organigram 2026:** Pembina Uskup Agung KAS;
  Pengawas Ekonom KAS Ibu Njiauw Janti; Pengurus: Rm. Robertus Budi Haryana, Pr (Ketua), Ibu E. Imma Indra Dewi W. (Sekretaris), Ibu F. Reni Retno A. (Bendahara); **Direktur Rm. Bernardus Himawan, Pr**; Elderly Project Manager
  Pramono Murdoko; Finance Manager/HR/GA Felicitas Gita Andriyani; Vinsensius Sudrajat; Ag. Heri Purwadi. ⚠️ Penandatangan Pernyataan Instansi di laporan = **Dionisius Adi Prabu Pamungkas** (tidak ada di organigram; di catatan diskusi ada kontak "Mas Dion").
- **Pemeriksaan live (read-only, 11 dan 12 Okt):** `GET /kegiatan?per_page=100` tanpa token → 4 kegiatan, **0 kunci/baris relawan**; `POST /change-password` tanpa token → 401 (rute masih ada);
  `index.html` merujuk `/assets/index-C4RUnKxG.js` (591 KB) yang **tidak** memuat "Batalkan", "Unggah bukti", "Peradaban Kasih", "Donasi per Kegiatan", "Tampilkan semua", tetapi memuat `randomuser.me` (pengurus contoh).
  Bundel `index-DoJwPbZ6.js` (598 KB; memuat rekap per kegiatan) masih ada di peladen. Kesimpulan: **yang aktif adalah build lama** — cara pemeriksaan ulang: unduh bundel yang dirujuk `index.html` lalu cari penanda di atas.

### 4.28 Perubahan kode 11 Okt (frontend; sudah di-commit `c3de860`; belum diuji di peramban oleh AI, belum terbukti dideploy)
- **`src/pages/TentangKami.jsx`:** `pengurus` (5 data contoh) diganti `pengurusYayasan` (Pembina, Ketua, Sekretaris, Bendahara, Pengawas) + `pelaksanaHarian` (Direktur, Elderly PM, Finance/HR/GA, Vinsensius Sudrajat, Ag. Heri Purwadi);
  komponen `KartuOrang` + `inisialNama()` memakai **inisial** (tanpa foto; tambahkan properti `foto` bila ada); **visi dan 4 misi diganti ke versi resmi**. Statistik (25+/100+/15.000+/500+) **sengaja dibiarkan** (keputusan penyusun).
- **`src/pages/Profil.jsx`:** tab **Kegiatan Relawan** — pendaftaran `pending` punya tombol **Batalkan** (dialog konfirmasi `ConfirmDelete`, memanggil `relawanService.cancel` → `DELETE /relawan/{id}/cancel`, lalu muat ulang);
  tab **Riwayat Donasi** — kolom baru **Bukti**: link "Lihat" bila sudah ada, tombol **Unggah bukti/Ganti** hanya untuk `pending` (dialog pilih berkas, validasi gambar ≤ 4 MB di klien, `donasiService.uploadBukti` → `POST /donasi/{id}/bukti`); pesan sukses/galat via `aksiInfo`.
  **Backend tidak diubah.** ⚠️ Label tab masih **"Kegiatan Relawan"** padahal DPPL/PDHUPL/laporan memakai "Riwayat Relawan" (K-8; SKPL UC-11 memakai "Kegiatan Relawan").
- **`src/pages/admin/shared/ConfirmDelete.jsx`:** props opsional `title`, `text`, `cancelLabel`, `confirmLabel`, `busyLabel`, `confirmIcon` (default sama seperti semula → panel admin tidak berubah).
- **Verifikasi AI:** `eslint` pada berkas yang diubah tidak menambah galat (satu galat lama `react-hooks/set-state-in-effect` di `Profil.jsx` baris ±43 sudah ada sebelumnya); `vite build` ke folder sementara sukses.
- **Fitur yang SENGAJA tidak dibuat:** ubah kata sandi di UI. **Masih ada di kode (diketahui):** rute/fungsi `changePassword`; `forgotPassword` dengan `exists:users,email`; Beranda/Stats/Intro statis; kotak "Cari sesuatu…" dan lonceng di topbar admin tak berfungsi; kotak "Ingat saya" di Login tak berefek;
  lencana "✓ Terkirim" statis di Notifikasi admin; templat notifikasi hanya `localStorage`; penulis Berita manual; kegiatan hanya satu isian Tanggal; menu "Pengaturan" admin placeholder; CORS `*`; KTP tersimpan teks biasa; fallback kata sandi bawaan pada reset oleh Super Admin (`AdminController::resetUserPassword`; **nilainya jangan ditulis di dokumen mana pun**; cari di PDHUPL dengan kata kunci nilai itu, hasil yang benar 0);
  dua webhook tanpa autentikasi; `store.js`/`useCrud.js` berisi sisa kode localStorage.

### 4.29 Bahan belajar sidang dan daftar perbaikan terpadu (12 Okt)
- Dibuat `docs\final\BAHAN-BELAJAR-SIDANG.md` (13 bagian; lihat tabel §1). Isi penting yang tidak ada di tempat lain: perhitungan ulang SUS dari tabel skor (mean 71,38/75,68/72,56; median 71,25; SD 12,85; **14 dari 40 (35%) < 68**; selang kepercayaan 95% ≈ 68,5–76,7;
  tanpa R19 = 73,14; selisih pengelola vs pengunjung tidak signifikan, t≈1,16); rasio kontras warna (`#FFD700` pada putih **1,40:1**; `#C0392B` pada putih 5,44:1); skala grade Sauro–Lewis (72,56 = batas C+/B−) vs Tabel 6.8 PDHUPL ("Grade B"); hasil verifikasi web atas sumber [1],[2],[5],[6],[8],[9],[10],[14].
- **§13** memuat 165 butir perbaikan (A wajib 72 / B 58 / C 35) dengan kutipan Ctrl+F, **halaman Word hasil ukur**, dan teks siap tempel, plus tabel **angka final** yang harus sama di semua dokumen dan asumsi keputusan **K-1…K-9**.
  Angka final yang berlaku bila K-2 dilakukan: butir uji **86** (Handal **85**, Tidak Berlaku 1 = AD-34, "85 dari 85"), titik akhir **65**, antarmuka **24 (+4 pendukung = 28)**, responden kebutuhan **35**, SUS n=**40**, NFR SKPL **21** (setelah penghapusan 11 NFR pengukuran), FR SKPL: FR 209 dikosongkan + **FR 313 (pembatalan relawan) ditambahkan**.
- Cara mengukur halaman Word: `docs\final\tools\find-pages.ps1` (Word COM, salinan berkas). **Kutipan harus ASCII murni** (tanda pisah "–" dan spasi tak-putus U+00A0 membuat pencarian gagal); nomor di kaki halaman SKPL berbeda 5 dari halaman fisik, DPPL tidak berurutan.

### 4.30 Template notifikasi nyata, Beranda dinamis, statistik seragam, pengecekan menyeluruh (12–13 Okt)
**A. Template notifikasi (backend `aca6136`, frontend `3c1381a`)**
- **Penyimpanan:** `app/Support/TemplateNotifikasi.php` menyimpan satu berkas JSON `notifikasi_template.json` di disk `local` (`storage/app/private/`). **Tanpa tabel/migrasi baru** (tabel tetap 9) dan tidak tertimpa `git pull`.
  Bila berkas belum ada/rusak/kolom kosong → templat bawaan dipakai. Kunci: `relawan`, `donatur`. Variabel ditulis `[nama]` (tak dikenal dibiarkan apa adanya).
- **Variabel:** relawan `[nama] [jenis] [kegiatan]`; donatur `[nama] [nominal] [tujuan] [kegiatan] [tanggal] [metode] [id_transaksi]`.
- **Rute baru (admin + super admin, middleware `role`):** `GET /admin/notifikasi/template`, `PUT /admin/notifikasi/template` (validasi: judul ≤150, isi ≤5000, tak boleh kosong; mencatat audit "Mengubah template notifikasi").
- **Surel:** `DonasiDiverifikasi::dari($donasi)` dan `RelawanDiterima::dari($relawan)` menyusun judul+isi dari templat (`tersusun()`, `judulSurel()`); view Blade memakai `{!! nl2br(e($isiSurel)) !!}` sehingga **HTML yang diketik di templat tampil sebagai teks** (tak dieksekusi).
  Tabel rincian donasi tetap otomatis di bawah pesan; kotak "Berkah Dalem" kini bagian dari teks templat. Kolom Judul `notifikasi_logs` ikut mengikuti templat. Frontend: `notifikasiService.getTemplates/saveTemplates`; tab Template memuat dari server (saat tab dibuka), tombol Simpan ke server, lencana status riwayat membaca `status`.
- **Tes:** `tests/Feature/TemplateNotifikasiTest.php` (**7 tes baru**; total suite 13 tes/52 asersi lulus). ⚠️ `php artisan test` di komputer ini gagal "could not find driver" karena `php.ini` Laragon tak mengaktifkan SQLite → jalankan
  `php -d extension=pdo_sqlite -d extension=sqlite3 vendor/bin/phpunit`. (Tes lama `KegiatanPublik…` juga ikut gagal tanpa opsi itu.)
**B. Frontend**
- `components/Kegiatan.jsx`: `kegiatanService.list({status:'aktif', sort_by:'tanggal_mulai', sort_order:'desc'})` → 3 kartu, tautan `/kegiatan?detail=<id>`, status memuat/kosong, fallback gambar. `pages/Kegiatan.jsx`: `useSearchParams` membuka modal detail dari `?detail=`; menutup modal membersihkan parameter.
- `data/lembaga.js`: `STATISTIK` + `DAFTAR_STATISTIK` + `fmtStatistik()` (5000/120/800/15). Dipakai `Stats.jsx`, `TentangKami.jsx`, `IntroScreen.jsx`, `Login.jsx`, `Register.jsx`. CSS `.lg-left-stats` diberi `justify-content:center; flex-wrap:wrap; gap:1.1rem` (empat angka). Label seragam ("Program Aktif/Tahun Berdiri/Tahun Melayani" dihapus).
  ⚠️ Penyusun menulis "+5000 relawan"; yang dipakai angka Beranda (5000 = Penerima Manfaat, relawan 800). Ubah satu baris `relawan` bila ingin lain.
- `services/api.js`: `pesanGalat()` — status **429 → "Terlalu banyak percobaan. Silakan tunggu sekitar satu menit, lalu coba lagi."** (dulu "Too Many Attempts."). `public/.htaccess`: blok **Paksa HTTPS** (301, kecuali `/.well-known/`, penangkal loop `X-Forwarded-Proto`). `Berita.jsx`: impor `Link` dihapus.
**C. Pengecekan fungsional menyeluruh (13 Okt)** — lingkungan terpisah: backend `php -S` dari `public/` dengan MySQL sementara `karinakas_e2e_tmp` (+ `LARAVEL_STORAGE_PATH` sementara, `MAIL_MAILER=log`), Vite dev, Chrome (`puppeteer-core`). Basis data dev `karinakas` tak tersentuh (15 tabel/14 pengguna/4 kegiatan sebelum dan sesudah); DB sementara dan server dihapus/dihentikan.
- **API 50 skenario:** 48 lulus pada percobaan pertama; 2 sisanya = (a) **webhook `/webhook/payment/callback` → 500** karena rute `/payment/callback` mengarah ke `DonasiController::updateStatus($request, $id)` yang butuh `{id}` (cacat nyata; ada juga di produksi; tak membahayakan data karena gagal sebelum mengubah apa pun) dan (b) pendaftaran relawan ganda dijawab **400** (ekspektasi tes saya 409/422 → bukan cacat).
  Terbukti benar: matriks peran (user 403 di `/admin/*`; admin 403 di users/audit; admin tak melihat nominal/bukti & tak boleh verifikasi), donasi + bukti, relawan (KTP 16 digit, batal, setujui → penghitung ±1), CRUD kegiatan/berita(draf tak tampil publik)/galeri(massal), pemulihan sandi sekali pakai (token sesi lama dicabut), template → isi surel berubah, surel tak terkirim dua kali, audit tercatat, pembatas laju 429.
- **Chrome:** halaman publik, registrasi (wizard 2 langkah), lupa/reset sandi, donasi + unggah bukti, bukti susulan, daftar & **batalkan relawan**, edit profil, logout, panel admin & super admin (semua menu, tambah kegiatan/akun, template persisten setelah muat ulang, ubah status donasi → surel, ekspor Excel 28 KB). Kegagalan awal uji peramban adalah **kesalahan skrip uji** (pemilihan elemen, wizard, pembatas laju, admin dialihkan `BlockAdmin` dari halaman publik), dibuktikan satu per satu — bukan cacat aplikasi.
- **Lint:** 10 galat gaya React lama (`react-hooks/set-state-in-effect`, `only-export-components`) tanpa dampak fungsi; sintaks PHP semua valid; build sukses.
**D. Deploy & insiden `index.html` (13 Okt)** — pertama kali `dist/` diekstrak **bersama foldernya** sehingga masuk `public_html/dist/`; akar tetap `index-C4RUnKxG.js`. Setelah diperbaiki, `index.html` sempat **tertimpa versi lama** (diduga zip lama diekstrak lagi). Perbaikan: unggah hanya `dist/index.html` dan `dist/.htaccess` ke akar (berkas `assets/*` sudah identik). Verifikasi akhir: SHA-256 `index.html` server = lokal; bundel `index-CoFZiLO3.js`;
  `http→https` 301 satu kali (tanpa loop, sertifikat valid); 13 rute SPA 200; API 200; rute terlindungi 401; Chrome pada situs live 10/10 (Beranda dinamis, klik kartu → modal detail, statistik 4 angka di 4 halaman). **Aturan emas:** cek `index.html` server, bukan hanya keberadaan berkas.
  Folder `dist/` sisa di server sebaiknya dihapus (cek `https://karinakas.com/dist/`).
**E. Temuan terbuka dari pengecekan:** (1) webhook payment 500 — pilihan: jawab `501` (jumlah titik akhir tetap) atau hapus rute; **belum dikerjakan**; (2) alamat API lewat `http://` masih 200 (folder `api` kemungkinan punya `.htaccess` sendiri) — frontend tak terdampak (alamat relatif HTTPS);
  (3) **surel SMTP asli** belum terbukti sampai kotak masuk; (4) `POST /change-password` masih ada (K-2); (5) titik akhir **68** di kode → perbarui dokumen.

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

### 🆕🆕🆕 Menunggu tindakan 13 Okt (TERBARU; blok 12 Okt di bawahnya masih berlaku kecuali yang dicoret di sini)
- [x] ~~Deploy frontend~~ — **terbukti 13 Okt** (`index-CoFZiLO3.js`). [x] ~~K-9 lencana status Notifikasi~~ — selesai.
- [ ] 🔴 **Uji SMTP asli di situs live:** ubah satu template, setujui 1 relawan uji & verifikasi 1 donasi uji → pastikan surel masuk ke kotak masuk dan isinya mengikuti template (hasilnya jangan diisi dengan asumsi).
- [ ] Putuskan **webhook `/webhook/payment/callback`** (500): `501 Belum tersedia` (titik akhir tetap) atau hapus rute.
- [ ] (opsional) pengalihan `http→https` untuk alamat API (`.htaccess` di folder `api`).
- [ ] **Perbarui angka titik akhir** di SKPL/DPPL/laporan/§13: kode = **68** (66 + 2 template); **67** bila K-2 dikerjakan; angka 65 pada §13 tidak berlaku lagi tanpa keputusan ulang. Tambahkan 2 rute template ke SKPL (FR notifikasi) dan DPPL (NotifikasiController: `templates`, `simpanTemplates`; `TemplateNotifikasi`; surel memakai templat) — ini mengubah angka fungsi/kelas di DPPL.
- [ ] K-8 (label tab → "Riwayat Relawan"), K-2 (hapus `/change-password`) — masih terbuka dari 12 Okt.
- [ ] Hapus folder sisa `dist/` di server bila ada; hapus `dist.zip` terlacak dari Git bila ingin (kini terhapus di working tree, belum di-commit).
- [ ] Uji ulang di situs live butir PDHUPL yang menunggu (UT-04/05/08, AD-10, NL-01, surel donasi & reset) bersama uji template.

### 🆕🆕 Menunggu tindakan 12 Okt (blok-blok di bawahnya sebagian sudah terjawab/usang)
**Kode dan deploy (AI dapat mengerjakan kodenya bila diminta; commit/push/deploy tetap penyusun):**
- [ ] 🔴 **Deploy frontend dari `c3de860`**: `npm ci` → `npm run build` (`.env`: `VITE_API_URL=/api/index.php/api/v1`, `VITE_STORAGE_URL=/api/storage`) → ZIP **isi** `dist/` (klik kanan *Compress*) → unggah & Extract ke web root, **jangan timpa `api`**, sertakan `.htaccess`.
  Cek: bundel yang dirujuk `index.html` memuat "Batalkan", "Unggah bukti", "Peradaban Kasih", "Donasi per Kegiatan" (§4.27). Live saat ini = bundel lama.
- [ ] **K-8** ubah label tab `Kegiatan Relawan` → `Riwayat Relawan` di `src/pages/Profil.jsx` (±baris 122 dan komentar ±355) dan di SKPL UC-11.
- [ ] **K-9** lencana status Notifikasi admin membaca `status` asli (terkirim/gagal) di `SectionNotifikasi.jsx` (saat ini selalu "✓ Terkirim"; ±baris 88).
- [ ] **K-2** hapus `Route::post('/change-password' …)` (`routes/api.php` baris 60) + `AuthController::changePassword` + tes bahwa rute itu 404 → titik akhir 66 → **65** (63 fungsional + 2 webhook). Bila rute dipertahankan, semua "65" di §13 menjadi "66" dan SKPL/DPPL yang diubah.
- [ ] (opsional) K-3: ubah `forgotPassword`/`resetPassword` agar email tak terdaftar tidak dibalas 422 (menutup enumerasi akun) → lalu ubah laporan 5.2.1.8 dan PDHUPL RP-04.
**Uji nyata di situs setelah deploy (hasilnya harus ditulis apa adanya di PDHUPL):** UT-04, UT-05 (Batalkan), UT-08 (dua jalur unggah), AD-10 (berita Draft tampil di panel admin atau tidak),
  NL-01, AD-14 (surel donasi diterima donatur), RP-01–03 (surel reset diterima), `GET /kegiatan` tanpa token = 0 relawan, admin → `GET /admin/users` = 403, KTP < 16 digit → 422.
**Dokumen (`.docx` FINAL — dikerjakan penyusun):**
- [ ] Terapkan `BAHAN-BELAJAR-SIDANG.md` **§13** (165 butir; urutan kerja di §13.0: PDHUPL → SKPL → DPPL → laporan → Daftar Pustaka → perbarui Daftar Isi/Gambar/Tabel → daftar periksa §13.8).
- [ ] Hapus nilai kata sandi bawaan pada PDHUPL AD-32 (hal. 49); hapus `[K-6]` dan isi `Tgl:` pada PDHUPL; hapus "kode OTP" di DPPL 2.1.
- [ ] Terapkan penghapusan 11 NFR pengukuran + K-20 pada SKPL FINAL (belum; panduan: `docs\final\PANDUAN-HAPUS-NFR-SKPL-DOCX.md`, tetapi halaman pakai §13 S-20).
- [ ] Isi data yang hanya penyusun ketahui: tanggal pasti black-box + nama/jabatan perwakilan Karinakas; nama penguji I/II dan Dekan; tanggal Lembar Pengesahan; penandatangan Pernyataan Instansi (Direktur vs Dionisius); sumber Tabel 6.8; skor/penulis PAON [15];
  judul lengkap Kurniawan [5]; penulis [11][12][13]; ekspor ulang diagram (use case UC-24, PDM, kelas tanpa `changePassword`, wireframe B5).
- [ ] Perbarui `docs\final\SLIDE-PRESENTASI-TA.md` (88→86 butir, 87→85, "85 dari 85", 65 titik akhir, slide 14 "Pengembangan Terbaru" hanya bila deploy terbukti) dan siapkan video demo cadangan.
- [ ] Hafalkan kartu angka (`BAHAN-BELAJAR-SIDANG.md` §1) dan latih Q1–Q63 (§10).

### 🆕 Menunggu tindakan 11 Okt (sebagian sudah terjawab/usang — data relawan: TERTUTUP; deploy backend: terbukti; lainnya lihat blok 12 Okt di atas)
**Keputusan (jawab ya/tidak/pilihan — rincian pertanyaan lengkap ada di tiap `PANDUAN-PERBAIKAN-*.md` §Konfirmasi dan `[KONFIRMASI K-n]` di `*-LENGKAP.md`):**
- [ ] **Data relawan di `GET /kegiatan`** — uji dulu di peramban (`/api/index.php/api/v1/kegiatan`), lalu putuskan perbaikan kode (§4.22 butir 1). 🔴
- [ ] **Uji surel donasi di situs** setelah deploy (§4.23); bila gagal, periksa `.env` MAIL_* (porta 465/`smtps` per CONTEXT §10; `DEPLOY.md` masih menulis 587).
- [ ] **Uji AD-10** (berita Draft tampil di panel admin atau tidak) → pilih teks versi A/B di `PDHUPL-11-BUTIR-SIAP-TEMPEL.md` §7.
- [ ] **Cocokkan 11 butir PDHUPL** dengan hasil uji nyata Anda/Karinakas sebelum menempel (§4.24); ubah AD-29 (kini semua pengguna tampil).
- [ ] Putuskan: **tampilan Notifikasi admin** diperbaiki membaca `status` asli (hapus "✓ Terkirim" statis)? **Webhook** donasi: dibiarkan/diamankan/dihapus? (§4.22 butir 5, 9)
- [ ] Putuskan untuk fitur yang dijanjikan tetapi **tidak ada di kode**: ubah-kata-sandi di UI, unggah-bukti dari Riwayat Donasi, tombol batal relawan — **dibuat di kode atau dihapus dari dokumen?** (dokumen lengkap kini menulis "tidak ada")
- [ ] **"Handal" atau "andal"** (templat kampus vs KBBI); **email atau surel**; **dasbor atau dashboard**; versi Laravel produksi (13.7 vs 13.8.0, `composer.lock` = 13.8.0); domain `.org`/`.com`; jumlah antarmuka **24 atau 28**; **label "Grade B (Good)"** (sumber skala?); sumber ambang 68 (Bangor, Kortum & Miller 2008, belum ada di Daftar Pustaka).
- [ ] **Judul "…Meningkatkan Konversi…"**: ubah judul atau beri definisi + bukti (tidak ada pengukuran konversi di Bab I–VI).
- [ ] 3 pertanyaan agen NFR: subbab 3.4.1 dan 3.4.5 yang tinggal 1 kartu dipertahankan atau digabung? kalimat pengantar 3.4 baru disetujui? baris matriks F-01/02/03/04/17 tanpa NFR (tanda hubung) diterima?
- [ ] **Persona 4** "berbeda dari 25 responden lain" → "34 responden lain"?
- [ ] FR 315 (pembatalan relawan) tanpa UC (usulan agen) — diterima? FR 316 dipertahankan? penomoran antarmuka baru A12/A13/B6/C9?

**Pekerjaan penyusun di `.docx` (AI tidak mengedit `.docx`):**
- [ ] Ikuti `PANDUAN-PERBAIKAN-{LAPORAN,SKPL,DPPL,PDHUPL}.md` (halaman Word nyata) + `PANDUAN-HAPUS-NFR-SKPL-DOCX.md`; **abaikan butir panduan yang usang** akibat surel donasi
  (SKPL butir 83/196/227, T-6, K-18, Q-9; DPPL D34/D52/D55/D56/K-05/Q3; PDHUPL U-64/P-2/K-20; LAPORAN butir 300/K-10/pertanyaan 15/5.2.1.17–19) → pakai `*-LENGKAP.md`.
- [ ] Tempel diagram **use case (4.3.7)** dan **PDM (4.4.6)** ke Rev2 (revisi dosen) — ekspor ulang dari `.drawio`; ubah penomoran gambar Bab IV, caption Gambar 5.1 ("4.3"→"4.5"), "Dua relasi kunci tamu"→lima.
- [ ] Isi: Lembar Pengesahan (penguji, dekan), penandatangan Instansi (Dionisius vs Bernardus Himawan), tanggal (19 Juni vs 1 Okt), tanggal+penguji Karinakas untuk black-box, ringkasan wawancara super admin, selesaikan komentar pembimbing II di Abstrak.
- [ ] Hapus nilai kata sandi bawaan di `docs\PDHUPL.md` ±baris 687 dan kolom Hasil AD-32 `PDHUPL_Aaron.docx`.
- [ ] Ekspor ulang gambar: diagram kelas, PDM, use case (UC-24), wireframe baru A12/A13/B6/C9, relasi UC-16→UC-22.
- [ ] Sinkronkan **fitur 9–11 Okt** ke SKPL/DPPL/PDHUPL/Laporan (paging+urutan, rekap per kegiatan, filter berita) — **belum ada di dokumen mana pun**.
- [ ] Perbarui `DEPLOY.md` (contoh domain `api.karinakas.org` ≠ produksi satu domain `karinakas.com` + `/api/index.php`; MAIL_PORT) — ditawarkan, belum dikerjakan.
- [ ] Deploy backend (`git pull` cPanel + `*:clear`) dan frontend (build + unggah `dist/` + `.htaccess`) lalu uji (prosedur §4.26); uji juga perbaikan lama `AdminController` (admin → `GET /admin/users` = 403) dan KTP (<16 digit = 422).

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
- 🆕 **Jawaban harus konsisten dan valid:** sebut asumsi secara eksplisit (kode K-1…K-9 di `BAHAN-BELAJAR-SIDANG.md` §13.0), cocokkan kutipan ke teks sumber, dan ukur halaman Word dengan `find-pages.ps1`; jangan menebak.
- 🆕 **Jangan mengarang hasil uji, tanggal, nama, skor, atau isi jurnal.** Tulis `[diisi]`/`[CEK]` bila datanya tidak ada; isi jurnal hanya dari sumber yang diverifikasi (ditandai ✅/🟡/❓ di §5 bahan belajar).
- 🆕 **Penyusun suka penjelasan alasan** (kelebihan/kekurangan metode dan keputusan desain, mis. `BAHAN-BELAJAR-SIDANG.md` §4, §6.9, §6.10) dan bahan yang langsung bisa ditempel (teks pengganti + halaman).
- 🆕 **Ubah kode lokal hanya bila diminta**; setelah mengubah, jalankan `eslint` pada berkas yang diubah dan `vite build --outDir "$TEMP\..." ` (jangan menimpa `dist/`). Tanyakan dulu keputusan yang memengaruhi dokumen (K-2, K-8, K-9, fitur baru/dihapus).
- 🆕 **Jangan menulis nilai kata sandi bawaan/demo ke dokumen yang dikumpulkan atau berkas yang di-commit.**

---

## 8. Langkah berikutnya (saran urutan)

> 🆕🆕🆕 **Per 13 Okt, urutan yang disarankan:** (1) **uji SMTP asli + template di situs live** → (2) putuskan webhook & K-2/K-8 (kode kecil) → (3) perbarui angka titik akhir (68/67) & fitur template di SKPL/DPPL/laporan → (4) terapkan §13 ke `.docx` → (5) latihan sidang.
> 🆕🆕 **Per 12 Okt, urutan yang disarankan:** (1) K-8, K-9, K-2 (kode kecil) → (2) **build & deploy frontend dari `c3de860`** (live masih bundel lama) → (3) **uji nyata** UT-04/05/08, AD-10, NL-01, surel donasi & reset →
> (4) terapkan `BAHAN-BELAJAR-SIDANG.md` §13 ke `FINAL\*.docx` (PDHUPL → SKPL → DPPL → laporan → pustaka; perbarui daftar isi/gambar/tabel) → (5) perbarui slide → (6) latihan sidang (§10) dan video demo cadangan.
> Daftar bernomor di bawah (dan blok 11 Okt) **sebagian besar usang**: butir 5, 6, 9 menyangkut `TERBARU.docx`/draf `.md` lama; butir 1–2 dan 7 hanya bila belum dikerjakan.

> 🆕 **Per 11 Okt, urutan yang disarankan:** (1) uji & putuskan temuan keamanan data relawan (§4.22-1); (2) deploy backend lalu frontend + uji surel donasi (§4.26);
> (3) tempel use case + PDM ke Rev2 (revisi dosen, §4.25); (4) kerjakan `.docx` mengikuti panduan, mulai dari PDHUPL/Laporan (butir kritis: metode uji, 35 responden,
> templat pengesahan); (5) sinkronkan fitur baru ke dokumen; (6) siapkan slide sidang (`SLIDE-PRESENTASI-TA.md`) dan video demo cadangan. Daftar lama di bawah masih berlaku untuk hal yang belum selesai.

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

- 🆕 **Situs live bisa memuat build lama** meski kode sudah di-commit: cek berkas JS yang dirujuk `https://karinakas.com/` (`index.html`) dan cari teks fitur baru di dalamnya. Per 12 Okt = `index-C4RUnKxG.js` (lama).
- 🆕 **Heredoc Bash dengan backslash/backtick sering gagal** ("unexpected EOF"): tulis skrip dengan tool Write lalu jalankan. Di tabel `.md`, pipe dalam code span ditulis `\|` (hati-hati tool menyunting backslash).
- 🆕 **Mengukur halaman Word:** `docs\final\tools\find-pages.ps1` (Word COM, salinan). Kutipan pencarian harus **ASCII polos** (en dash, NBSP, dan penomoran otomatis membuat Find gagal). Halaman SKPL yang tercetak di footer ≠ halaman fisik; pakai halaman fisik.
- 🆕 **`Remove-Item -Recurse` bisa ditolak** ("protected path"); ekstrak `.docx` ke nama folder baru, jangan menghapus.
- 🆕 **Nama-nama tipis yang mudah tertukar:** "ubah kata sandi" (ditiadakan; hanya pemulihan lewat tautan surel) vs "reset oleh Super Admin" (tetap ada, `POST /admin/users/{id}/reset-password`); "Kegiatan Relawan" (label tab sekarang) vs "Riwayat Relawan" (rencana K-8).
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

- 🆕 **(13 Okt)** Mengunggah `dist/`: ekstrak **isinya**, bukan foldernya, ke akar yang berisi `api`; sesudah itu cek `index.html` server (bundel & SHA-256) — pernah tertimpa versi lama. `.htaccess` tersembunyi (aktifkan *Show Hidden Files*).
- 🆕 **(13 Okt)** Pembatas laju `masuk` (5/menit/IP) ikut memblokir uji otomatis dan pengguna yang mencoba berulang; uji harus mengatur kecepatan login.
- 🆕 **(13 Okt)** PHP CLI Laragon tanpa driver SQLite → jalankan tes dengan `-d extension=pdo_sqlite -d extension=sqlite3`. `php -S` untuk Laravel harus dijalankan **dari folder `public/`** dengan router `server.php`.
- 🆕 **(13 Okt)** Isi template notifikasi ada di `storage/app/private/notifikasi_template.json` di peladen (bukan di Git/DB); cadangkan bersama `.env` bila perlu.
