# 📂 Naskah SKPL — Bab III Kebutuhan Rinci

Folder ini memuat naskah **Bab III** dokumen SKPL Sistem Informasi Yayasan Karinakas (SIKAS),
dipisah per subbab agar mudah disalin ke naskah skripsi.

Bab I dan Bab II berada pada berkas induk: **[../../SKPL.md](../../SKPL.md)**

| Subbab | Berkas | Isi |
|---|---|---|
| 3.1 | [3.1-Kebutuhan-Antarmuka-Eksternal.md](3.1-Kebutuhan-Antarmuka-Eksternal.md) | 28 form, 4 report, antarmuka perangkat keras, perangkat lunak, komunikasi, dan sistem |
| 3.2 | [3.2-Kebutuhan-Fungsional.md](3.2-Kebutuhan-Fungsional.md) | 71 kebutuhan fungsional, FR SIKAS 101–608 |
| 3.3 | [3.3-Diagram-Use-Case.md](3.3-Diagram-Use-Case.md) | 5 aktor, diagram use case, 24 spesifikasi use case, tabel penelusuran |
| 3.4 | [3.4-Kebutuhan-Non-Fungsional.md](3.4-Kebutuhan-Non-Fungsional.md) | 32 kebutuhan terukur (NFR 3.4.1.1–3.4.7.2) + tabel status pemenuhan |
| 3.5 | [3.5-Kebutuhan-Data.md](3.5-Kebutuhan-Data.md) | ERD, 9 entitas, kamus data lengkap, 8 relasi, aturan integritas |

## Berkas gambar

| Berkas | Kegunaan |
|---|---|
| [use-case-diagram.png](use-case-diagram.png) | Gambar 3.1 siap sisip ke naskah Word (2200 × 1360 px) |
| [use-case-diagram.drawio](use-case-diagram.drawio) | Berkas sumber Gambar 3.1, dapat disunting di [app.diagrams.net](https://app.diagrams.net) |
| [erd-diagram.png](erd-diagram.png) | Gambar 3.2 siap sisip ke naskah Word (1330 × 1400 px), notasi tabel |
| [erd-diagram.drawio](erd-diagram.drawio) | Berkas sumber Gambar 3.2 (ERD), dapat disunting di [app.diagrams.net](https://app.diagrams.net) |

## Konvensi penomoran antarbab

| Kode | Arti | Sumber |
|---|---|---|
| `F-01` – `F-21` | Fungsi produk | Subbab 2.2 (berkas induk) |
| `K-01` – `K-20` | Kekangan | Subbab 2.4 (berkas induk) |
| `A-01` – `A-08` | Asumsi | Subbab 2.5 (berkas induk) |
| `D-01` – `D-06` | Kebergantungan | Subbab 2.5 (berkas induk) |
| `FR SIKAS 101` – `608` | Kebutuhan fungsional | Subbab 3.2 |
| `UC-01` – `UC-23` | Use case | Subbab 3.3 |
| `AK-01` – `AK-05` | Aktor | Subbab 3.3 |

## Catatan penggunaan

- **Diagram** ditulis dalam sintaks Mermaid. Salin ke <https://mermaid.live> lalu unduh sebagai
  gambar untuk disisipkan ke naskah Word.
- **Blok kutipan ketentuan** (teks berlatar abu di awal tiap subbab pada berkas induk) hanya
  pengingat aturan penulisan — jangan ikut disalin ke naskah akhir.
- Seluruh pernyataan teknis telah diverifikasi terhadap kode sistem; rinciannya pada
  Lampiran A berkas induk.
