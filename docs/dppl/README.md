# 📂 Naskah DPPL — Subbab Terpisah

Folder ini memuat subbab DPPL **Website Karinakas** yang naskahnya terlalu panjang untuk
disatukan pada berkas induk, dipisah agar mudah disalin ke naskah skripsi.

Berkas induk: **[../../DPPL.md](../../DPPL.md)** (Bab 1, 2.1, dan penunjuk ke subbab di sini)

> **Pindah room chat?** Baca **[CHECKLIST.md](CHECKLIST.md)** lebih dulu — berisi daftar periksa
> tiap subbab yang sudah dan belum dikerjakan, hal yang perlu dilengkapi penyusun, serta
> keputusan yang masih menggantung.

| Subbab | Berkas | Isi |
|---|---|---|
| — | [CHECKLIST.md](CHECKLIST.md) | Daftar periksa penyusunan dan titik lanjut pengerjaan |
| 2.2 | [2.2-Perancangan-Rinci.md](2.2-Perancangan-Rinci.md) | Kelas diagram pola BCE (39 kelas) + deskripsi atribut dan fungsi 9 kelas kontroler |
| 2.3 | [2.3-Perancangan-Data.md](2.3-Perancangan-Data.md) | Pengantar perancangan data + **2.3.1 Dekomposisi Data** (9 tabel, 116 medan) |
| 2.3.2 | [2.3.2-Physical-Data-Model.md](2.3.2-Physical-Data-Model.md) | **Physical Data Model** — Gambar 2.6, relasi antartabel, Tabel 10 aturan `ON DELETE`, dan 4 aturan integritas |

## Berkas gambar

| Berkas | Kegunaan |
|---|---|
| [class-diagram.drawio](class-diagram.drawio) | Sumber **Gambar 2.5** — kelas diagram pola *Boundary–Control–Entity* dalam tiga pita mendatar, memuat 39 kelas dan 49 garis penghubung. Dapat disunting di [app.diagrams.net](https://app.diagrams.net) lalu diekspor sebagai PNG |
| [pdm-diagram.drawio](pdm-diagram.drawio) | Sumber **Gambar 2.6** — *Physical Data Model* berisi 9 tabel, 116 kolom, dan 8 relasi. Dibangkitkan langsung dari skema MySQL sehingga isinya dijamin sama dengan basis data yang berjalan |

## Berkas kerja

| Berkas | Kegunaan |
|---|---|
| [_arsip-kelas-boundary-entity.md](_arsip-kelas-boundary-entity.md) | **Bukan bagian naskah.** Uraian kelas `«boundary»` dan `«entity»` yang dikeluarkan dari Subbab 2.2.2 ketika cakupannya dibatasi pada kelas kontroler. Bagian `«boundary»` dipakai sebagai bahan mentah Subbab 2.4 |

## Catatan penggunaan

- **Diagram** tersedia dalam dua bentuk. Berkas `.drawio` memuat versi lengkap dengan seluruh
  atribut dan operasi tiap kelas, sedangkan sintaks Mermaid di dalam naskah merupakan ringkasan
  yang hanya menampilkan susunan dan keterhubungan antarkelas agar tetap terbaca ketika dicetak.
  Untuk disisipkan ke naskah, gunakan hasil ekspor dari `.drawio`.
- **Blok kutipan ketentuan** (teks berlatar abu di awal tiap subbab) hanya pengingat aturan
  penulisan — jangan ikut disalin ke naskah akhir.
- Seluruh tanda tangan fungsi, aturan pemeriksaan masukan, dan bentuk tanggapan pada Subbab 2.2
  diturunkan langsung dari kode `app/Http/Controllers/` dan `app/Models/`, sehingga isinya cocok
  bila diperiksa terhadap sistem yang berjalan.

## Konvensi penomoran

Mengikuti berkas induk dan SKPL. Kode kebutuhan fungsional `FR SIKAS 101`–`608` dirujuk apa adanya
dari SKPL, sedangkan nama produk pada DPPL memakai **Website Karinakas**.
