// Data resmi lembaga yang tampil di lebih dari satu halaman.
// Ubah di sini saja — Footer, halaman Kontak, dan semua tampilan statistik membaca dari berkas ini.

// Angka dampak (statis, sengaja tidak dihitung dari basis data). Dipakai seragam di
// Beranda, Tentang Kami, layar Intro, serta panel Masuk dan Daftar.
export const STATISTIK = {
  penerimaManfaat: { nilai: 5000, label: 'Penerima Manfaat', icon: 'bi-people-fill' },
  kegiatan:        { nilai: 120,  label: 'Kegiatan Sosial',  icon: 'bi-calendar-check-fill' },
  relawan:         { nilai: 800,  label: 'Relawan Aktif',    icon: 'bi-heart-fill' },
  tahun:           { nilai: 15,   label: 'Tahun Berkarya',   icon: 'bi-award-fill' },
}

// Keempat angka dalam urutan tetap; semua tempat menampilkan seluruhnya, tanpa memilih sebagian
export const DAFTAR_STATISTIK = [STATISTIK.penerimaManfaat, STATISTIK.kegiatan, STATISTIK.relawan, STATISTIK.tahun]

// Bentuk tampilan statis, mis. "5.000+"
export const fmtStatistik = (s) => `${s.nilai.toLocaleString('id-ID')}+`

export const ALAMAT = {
  jalan:    'Jl. Empu Panuluh No.377A, Pringwulung',
  wilayah:  'Condongcatur, Kec. Depok, Kabupaten Sleman',
  provinsi: 'Daerah Istimewa Yogyakarta',
}

export const ALAMAT_LENGKAP = `${ALAMAT.jalan}, ${ALAMAT.wilayah}, ${ALAMAT.provinsi}`

const kueri = encodeURIComponent(ALAMAT_LENGKAP)

// Sematan Google Maps tanpa kunci API — penanda diletakkan sesuai alamat di atas
export const PETA_SEMATAN = `https://maps.google.com/maps?q=${kueri}&z=17&output=embed`

// Tautan untuk membuka lokasi yang sama di situs/aplikasi Google Maps
export const PETA_TAUTAN = `https://www.google.com/maps/search/?api=1&query=${kueri}`
