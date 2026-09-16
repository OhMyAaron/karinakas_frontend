// Data resmi lembaga yang tampil di lebih dari satu halaman.
// Ubah di sini saja — Footer dan halaman Kontak membaca dari berkas ini.

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
