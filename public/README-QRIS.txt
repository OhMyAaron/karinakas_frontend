GAMBAR QRIS UNTUK HALAMAN DONASI
================================

Simpan gambar QRIS Yayasan Karinakas di folder ini (public/) dengan nama PERSIS:

    qris-karinakas.png

Gambar itulah yang ditampilkan di halaman Donasi setelah donatur menekan
tombol "Donasikan" dan memilih metode QRIS.

Ketentuan:
- Nama file harus sama persis (huruf kecil, ekstensi .png).
- Gunakan gambar QRIS asli yang dicetak/diterbitkan penyelenggara
  (yang memuat NMID ID2026479922646 a.n. YAYASAN KARINAKAS, terminal A01).
- Sebaiknya crop hanya bagian kode QR-nya + sedikit margin putih, supaya
  QR terlihat besar dan mudah discan di layar HP. Nama merchant & NMID
  sudah ditulis ulang oleh sistem di bawah gambar, jadi tidak wajib ikut.
- Resolusi disarankan minimal 800x800 px, latar putih, tanpa bayangan.
- Selama file belum ada, halaman donasi otomatis menampilkan pesan
  "Gambar QRIS belum tersedia" dan menyarankan transfer bank — jadi
  donatur tidak melihat gambar rusak.

Mengubah data merchant (nama, NMID, terminal) atau path gambar:
    src/pages/Donasi.jsx  ->  konstanta QRIS

Catatan: QRIS ini bersifat STATIS, artinya nominal TIDAK ikut tertanam di
QR. Donatur mengetik sendiri nominalnya di aplikasi pembayaran, lalu
mengunggah bukti untuk diverifikasi admin (sama seperti alur transfer).
