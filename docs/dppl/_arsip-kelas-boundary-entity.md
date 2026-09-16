# 📦 Arsip — kelas «boundary» dan «entity»

> Kedua bagian ini **dikeluarkan dari Subbab 2.2.2** karena deskripsi kelas dibatasi pada
> kelas kontroler saja. Isinya tidak dibuang karena masih berguna:
>
> - **Kelas «boundary»** menjadi bahan mentah **Subbab 2.4 Perancangan Antarmuka** —
>   nama keadaan dan penangan peristiwanya sudah diambil langsung dari kode.
> - **Kelas «entity»** sebagian besar sudah tercakup pada **Subbab 2.3 Perancangan Data**.
>   Yang tidak ada di sana hanya perilaku model (relasi, *scope*, dan pendengar peristiwa).
>
> Berkas ini **bukan bagian naskah** dan tidak perlu disalin ke skripsi.

---

### A. Kelas «boundary»

Kelas `«boundary»` merupakan komponen antarmuka pada aplikasi klien yang menyajikan halaman dan menerima masukan pengguna. Kelas-kelas ini dibangun sebagai komponen fungsional React, sehingga atributnya berwujud keadaan komponen (*state*) beserta data hasil pengambilan dari layanan, sedangkan fungsinya berwujud penangan peristiwa (*event handler*) yang dipicu tindakan pengguna.

**1. HomeView** : Kelas antarmuka yang menyajikan halaman beranda, tersusun atas beberapa komponen yang masing-masing mengambil datanya sendiri dari layanan.

Deskripsi atribut kelas HomeView

| Nama atribut | Tipe Data | Deskripsi |
|---|---|---|
| Hero | Komponen | Bagian sambutan utama beserta ajakan berdonasi dan mendaftar relawan |
| Stats | Komponen | Ringkasan angka capaian lembaga |
| Kegiatan | Komponen | Cuplikan kegiatan terbaru yang diambil dari layanan |
| Galeri | Komponen | Cuplikan delapan foto dokumentasi terbaru |
| CTA | Komponen | Ajakan penutup menuju halaman donasi dan relawan |

Deskripsi fungsi pada kelas HomeView

| **tampilkanBeranda()** | |
|---|---|
| Input | – |
| Output | Tampilan halaman beranda |
| Deskripsi | Menyusun seluruh komponen penyusun beranda menurut urutannya. Kelas ini tidak menyimpan keadaan sendiri; pengambilan data dilakukan masing-masing komponen anak |

---

**2. TentangKamiView** : Kelas antarmuka yang menyajikan profil lembaga meliputi identitas, visi dan misi, nilai yang dianut, serta bidang pelayanan.

Deskripsi atribut kelas TentangKamiView

| Nama atribut | Tipe Data | Deskripsi |
|---|---|---|
| count | number | Nilai pencacah untuk animasi angka capaian lembaga |
| galeriPhotos | array | Foto pendukung yang ditampilkan pada bagian profil |

Deskripsi fungsi pada kelas TentangKamiView

| **tampilkanProfil()** | |
|---|---|
| Input | – |
| Output | Tampilan halaman profil lembaga |
| Deskripsi | Menyajikan uraian profil lembaga beserta animasi angka capaian dan foto pendukung |

---

**3. GaleriView** : Kelas antarmuka yang menyajikan dokumentasi kegiatan dalam bentuk album, lengkap dengan penampil gambar layar penuh.

Deskripsi atribut kelas GaleriView

| Nama atribut | Tipe Data | Deskripsi |
|---|---|---|
| activeAlbum | string | Judul album yang sedang dibuka; bernilai kosong ketika menampilkan daftar album |
| search | string | Kata kunci penyaringan album |
| lightbox | object | Keadaan penampil gambar layar penuh beserta indeks foto yang sedang ditampilkan |

Deskripsi fungsi pada kelas GaleriView

| **backToAlbums()** | |
|---|---|
| Input | – |
| Output | Tampilan daftar album |
| Deskripsi | Menutup album yang sedang dibuka dan kembali ke daftar album |

| **showPrev()** | |
|---|---|
| Input | – |
| Output | Foto sebelumnya pada penampil layar penuh |
| Deskripsi | Menggeser tampilan ke foto sebelumnya dalam album yang sama |

| **showNext()** | |
|---|---|
| Input | – |
| Output | Foto berikutnya pada penampil layar penuh |
| Deskripsi | Menggeser tampilan ke foto berikutnya dalam album yang sama |

---

**4. KegiatanView** : Kelas antarmuka yang menyajikan daftar kegiatan sosial beserta detailnya, termasuk sisa kuota relawan.

Deskripsi atribut kelas KegiatanView

| Nama atribut | Tipe Data | Deskripsi |
|---|---|---|
| currentPage | number | Halaman daftar kegiatan yang sedang ditampilkan |
| items | array | Data kegiatan hasil pengambilan dari layanan |

Deskripsi fungsi pada kelas KegiatanView

| **handlePage(halaman)** | |
|---|---|
| Input | Nomor halaman yang dituju |
| Output | Daftar kegiatan pada halaman tersebut |
| Deskripsi | Memindahkan tampilan ke halaman daftar kegiatan yang dipilih |

---

**5. BeritaView** : Kelas antarmuka yang menyajikan daftar berita dan kampanye lembaga beserta penyaringan dan pengurutannya.

Deskripsi atribut kelas BeritaView

| Nama atribut | Tipe Data | Deskripsi |
|---|---|---|
| search | string | Kata kunci pencarian berita |
| activeCategory | string | Kategori berita yang sedang disaring |
| sort | string | Cara pengurutan daftar berita |
| currentPage | number | Halaman daftar berita yang sedang ditampilkan |

Deskripsi fungsi pada kelas BeritaView

| **handleSearch(kataKunci)** | |
|---|---|
| Input | Kata kunci pencarian |
| Output | Daftar berita yang sesuai kata kunci |
| Deskripsi | Menyaring daftar berita menurut kecocokan judul atau isi |

| **handleCategory(kategori)** | |
|---|---|
| Input | Kategori berita |
| Output | Daftar berita pada kategori tersebut |
| Deskripsi | Menyaring daftar berita menurut kategori yang dipilih |

| **handlePage(halaman)** | |
|---|---|
| Input | Nomor halaman yang dituju |
| Output | Daftar berita pada halaman tersebut |
| Deskripsi | Memindahkan tampilan ke halaman daftar berita yang dipilih |

---

**6. BeritaDetailView** : Kelas antarmuka yang menyajikan isi lengkap satu berita beserta daftar berita terkait.

Deskripsi atribut kelas BeritaDetailView

| Nama atribut | Tipe Data | Deskripsi |
|---|---|---|
| id | string | Pengenal berita yang dibaca dari parameter alamat |
| allBerita | array | Seluruh berita yang dipakai untuk menentukan berita terkait |
| loading | boolean | Penanda bahwa pengambilan data sedang berlangsung |

Deskripsi fungsi pada kelas BeritaDetailView

| **tampilkanDetail()** | |
|---|---|
| Input | Pengenal berita dari parameter alamat |
| Output | Tampilan isi lengkap berita beserta berita terkait |
| Deskripsi | Mencari berita yang sesuai pengenal, menampilkan isinya, lalu menyusun daftar berita terkait berdasarkan kesamaan kategori |

---

**7. KontakView** : Kelas antarmuka yang menyajikan informasi kontak lembaga dan mengarahkan pertanyaan pengunjung ke kanal WhatsApp resmi.

Deskripsi atribut kelas KontakView

| Nama atribut | Tipe Data | Deskripsi |
|---|---|---|
| infoCards | array | Kartu ringkas berisi alamat, telepon, surel, dan WhatsApp |
| topikWa | array | Pilihan topik yang dipakai sebagai pesan awal WhatsApp |

Deskripsi fungsi pada kelas KontakView

| **waLink(topik)** | |
|---|---|
| Input | Topik pertanyaan yang dipilih pengunjung |
| Output | Alamat WhatsApp beserta pesan awal yang telah terisi |
| Deskripsi | Menyusun tautan WhatsApp dengan pesan pembuka sesuai topik, sehingga pengunjung tidak perlu mengetik dari awal |

---

**8. LoginView** : Kelas antarmuka yang menerima kredensial pengguna dan meneruskan proses masuk ke layanan.

Deskripsi atribut kelas LoginView

| Nama atribut | Tipe Data | Deskripsi |
|---|---|---|
| form | object | Isian alamat surel atau nama pengguna beserta kata sandi |
| error | string | Pesan kesalahan yang ditampilkan bila kredensial ditolak |
| loading | boolean | Penanda bahwa proses masuk sedang berlangsung |

Deskripsi fungsi pada kelas LoginView

| **handleSubmit(event)** | |
|---|---|
| Input | Peristiwa pengiriman formulir berisi surel atau nama pengguna dan kata sandi |
| Output | Sesi pengguna beserta pengalihan halaman sesuai peran, atau pesan kesalahan |
| Deskripsi | Mengirimkan kredensial ke AuthController. Bila berhasil, token disimpan dan pengguna dialihkan ke halaman tujuan sebelumnya atau ke panel pengelolaan sesuai perannya |

---

**9. RegisterView** : Kelas antarmuka yang menerima data pendaftaran akun baru melalui formulir bertahap.

Deskripsi atribut kelas RegisterView

| Nama atribut | Tipe Data | Deskripsi |
|---|---|---|
| form | object | Isian data diri calon pengguna |
| showConfirm | boolean | Penanda bahwa tahap peninjauan data sedang ditampilkan |

Deskripsi fungsi pada kelas RegisterView

| **handleStep1(event)** | |
|---|---|
| Input | Peristiwa pengiriman tahap pertama formulir |
| Output | Tampilan tahap berikutnya |
| Deskripsi | Memeriksa kelengkapan isian tahap pertama sebelum pengguna melanjutkan ke tahap peninjauan |

| **handleSubmit(event)** | |
|---|---|
| Input | Peristiwa pengiriman formulir berisi seluruh data diri |
| Output | Akun baru beserta sesi pengguna, atau pesan kesalahan |
| Deskripsi | Mengirimkan data pendaftaran ke AuthController lalu menyimpan token yang diterima, sehingga pengguna langsung masuk tanpa perlu login ulang |

---

**10. ForgotPasswordView** : Kelas antarmuka permintaan pemulihan kata sandi. Sejak 16 September 2026 halaman ini hanya meminta alamat surel, karena kata sandi baru diisikan pada halaman tujuan tautan.

Deskripsi atribut kelas ForgotPasswordView

| Nama atribut | Tipe Data | Deskripsi |
|---|---|---|
| email | string | Alamat surel akun yang akan dikirimi tautan |
| terkirim | boolean | Penanda bahwa keterangan "tautan telah dikirim" sedang ditampilkan |
| loading | boolean | Penanda bahwa permintaan sedang diproses |

Deskripsi fungsi pada kelas ForgotPasswordView

| **kirimTautan(event)** | |
|---|---|
| Input | Alamat surel terdaftar |
| Output | Keterangan bahwa tautan penyetelan ulang telah dikirim ke surel tersebut |
| Deskripsi | Meminta AuthController membangkitkan token, menyusun tautan, dan mengirimkannya melalui surel |

---

**10a. ResetPasswordView** : Kelas antarmuka tujuan tautan penyetelan ulang kata sandi, dibuka pada alamat `/reset-password?token=...&email=...`. Pada Gambar 2.5 kelas ini dan ForgotPasswordView digambarkan menyatu sebagai satu kelas «boundary» pemulihan kata sandi, sehingga jumlah kelas pada diagram tetap tiga puluh sembilan.

Deskripsi atribut kelas ResetPasswordView

| Nama atribut | Tipe Data | Deskripsi |
|---|---|---|
| token | string | Token tautan yang dibaca dari parameter alamat |
| email | string | Alamat surel akun yang dibaca dari parameter alamat |
| memeriksa | boolean | Penanda bahwa keabsahan tautan sedang diperiksa ke layanan |
| tautanSah | boolean | Penanda bahwa tautan masih berlaku sehingga formulir boleh ditampilkan |
| pass, confirm | string | Kata sandi baru beserta konfirmasinya |

Deskripsi fungsi pada kelas ResetPasswordView

| **periksaTautan()** | |
|---|---|
| Input | Token dan alamat surel dari parameter alamat |
| Output | Formulir kata sandi baru, atau keterangan bahwa tautan tidak berlaku |
| Deskripsi | Dijalankan saat halaman dimuat. Memanggil checkResetToken agar pengguna tidak mengisi formulir yang pasti ditolak |

| **simpan(event)** | |
|---|---|
| Input | Token, alamat surel, kata sandi baru, dan konfirmasinya |
| Output | Pemberitahuan keberhasilan, atau pesan kesalahan bila tautan sudah tidak berlaku |
| Deskripsi | Mengirimkan token beserta kata sandi baru ke AuthController untuk diperiksa dan disimpan |

---

**11. DonasiView** : Kelas antarmuka pengajuan donasi yang menampilkan petunjuk pembayaran dan menerima unggahan bukti transfer.

Deskripsi atribut kelas DonasiView

| Nama atribut | Tipe Data | Deskripsi |
|---|---|---|
| kegiatanId | string | Pengenal kegiatan yang dipilih sebagai tujuan donasi |
| buktiFile | File | Berkas gambar bukti pembayaran yang dipilih donatur |
| uploading | boolean | Penanda bahwa pengunggahan bukti sedang berlangsung |
| uploadErr | string | Pesan kesalahan pengunggahan bukti |
| copiedNom | boolean | Penanda bahwa nominal telah disalin ke papan klip |
| qrisError | boolean | Penanda bahwa gambar QRIS tidak tersedia |

Deskripsi fungsi pada kelas DonasiView

| **handleSubmit(event)** | |
|---|---|
| Input | Kegiatan tujuan, nominal, metode pembayaran, tujuan donasi, dan penanda anonim |
| Output | Donasi berstatus menunggu beserta tampilan petunjuk pembayaran |
| Deskripsi | Mengirimkan pengajuan donasi ke DonasiController, lalu menampilkan petunjuk pembayaran yang bercabang sesuai metode yang dipilih, yaitu QRIS atau transfer bank |

| **handleUpload(event)** | |
|---|---|
| Input | Berkas gambar bukti pembayaran, maksimal 4 MB |
| Output | Pemberitahuan bahwa bukti telah diunggah dan menunggu verifikasi |
| Deskripsi | Mengunggah bukti pembayaran ke DonasiController. Bila gambar QRIS tidak tersedia, tampilan mengarahkan donatur ke metode transfer bank |

---

**12. DaftarRelawanView** : Kelas antarmuka pendaftaran relawan yang pilihan jenis dan bidang minatnya mengikuti opsi kegiatan yang dipilih.

Deskripsi atribut kelas DaftarRelawanView

| Nama atribut | Tipe Data | Deskripsi |
|---|---|---|
| kegiatan | object | Kegiatan yang dipilih beserta opsi jenis relawan dan bidang minatnya |
| form | object | Isian jenis, minat, kemampuan diri, motivasi, nomor identitas, dan keterbatasan diri |

Deskripsi fungsi pada kelas DaftarRelawanView

| **handleSubmit(event)** | |
|---|---|
| Input | Kegiatan tujuan beserta isian formulir pendaftaran |
| Output | Pendaftaran berstatus menunggu verifikasi, atau pesan penolakan |
| Deskripsi | Mengirimkan pendaftaran ke RelawanController. Data diri pendaftar diambil dari profil sehingga tidak perlu diisi ulang. Pilihan jenis dan bidang minat dibatasi opsi yang ditetapkan pengelola pada kegiatan tersebut |

---

**13. ProfilView** : Kelas antarmuka profil pengguna yang menyajikan data diri beserta riwayat donasi, keikutsertaan relawan, dan notifikasi.

Deskripsi atribut kelas ProfilView

| Nama atribut | Tipe Data | Deskripsi |
|---|---|---|
| activeTab | string | Tab yang sedang dibuka, yaitu data diri, donasi, relawan, atau notifikasi |
| editMode | boolean | Penanda bahwa data diri sedang disunting |
| form | object | Salinan data diri yang sedang disunting |
| myDonasi | array | Riwayat donasi milik pengguna |
| myRelawan | array | Riwayat keikutsertaan relawan milik pengguna |
| myNotif | array | Riwayat notifikasi yang diterima pengguna |

Deskripsi fungsi pada kelas ProfilView

| **handleSave(event)** | |
|---|---|
| Input | Data diri hasil penyuntingan |
| Output | Profil yang telah diperbarui |
| Deskripsi | Mengirimkan pembaruan data diri ke AuthController lalu memperbarui tampilan dengan data terbaru |

| **handleLogout()** | |
|---|---|
| Input | – |
| Output | Sesi berakhir dan pengguna dialihkan ke halaman masuk |
| Deskripsi | Mengakhiri sesi dengan meminta AuthController mencabut token yang sedang dipakai |

---

**14. AdminDashboardView** : Kelas antarmuka panel pengelolaan yang menyajikan statistik lembaga dan menjadi kerangka bagi seluruh seksi pengelolaan.

Deskripsi atribut kelas AdminDashboardView

| Nama atribut | Tipe Data | Deskripsi |
|---|---|---|
| active | string | Seksi pengelolaan yang sedang dibuka |
| stat | object | Angka statistik hasil pengambilan dari layanan |
| recentDonasi | array | Lima donasi terbaru |
| recentRelawan | array | Lima pendaftaran relawan terbaru |
| loadingStats | boolean | Penanda bahwa pengambilan statistik sedang berlangsung |

Deskripsi fungsi pada kelas AdminDashboardView

| **handleQuickAction(aksi)** | |
|---|---|
| Input | Aksi pintas yang dipilih pengelola |
| Output | Seksi pengelolaan yang bersesuaian |
| Deskripsi | Memindahkan tampilan langsung ke seksi pengelolaan yang dituju melalui tombol pintas pada dasbor |

| **exportLaporan()** | |
|---|---|
| Input | Statistik dan data terkini yang sedang ditampilkan |
| Output | Berkas laporan berformat lembar kerja |
| Deskripsi | Menyusun laporan keseluruhan dari data yang telah dimuat, lalu mengunduhnya sebagai berkas lembar kerja. Hanya tersedia bagi super admin |

| **handleLogout()** | |
|---|---|
| Input | – |
| Output | Sesi berakhir dan pengelola dialihkan ke halaman masuk |
| Deskripsi | Mengakhiri sesi pengelola dan membersihkan token yang tersimpan |

---

**15. SectionBeritaView** : Kelas antarmuka pengelolaan berita dan kampanye lembaga.

Deskripsi atribut kelas SectionBeritaView

| Nama atribut | Tipe Data | Deskripsi |
|---|---|---|
| items | array | Daftar berita hasil pengambilan dari layanan |
| loading | boolean | Penanda bahwa pengambilan data sedang berlangsung |
| error | string | Pesan kesalahan pengambilan data |
| deleteTarget | object | Berita yang sedang dikonfirmasi penghapusannya |

Deskripsi fungsi pada kelas SectionBeritaView

| **handleSave(form)** | |
|---|---|
| Input | Isian judul, isi, ringkasan, kategori, status, dan gambar berita |
| Output | Berita baru atau berita yang telah diperbarui |
| Deskripsi | Mengirimkan penambahan atau penyuntingan berita ke KampanyeController, lalu memuat ulang daftar |

| **remove(id)** | |
|---|---|
| Input | Pengenal berita |
| Output | Daftar berita tanpa berita yang dihapus |
| Deskripsi | Menghapus berita setelah pengelola menyatakan konfirmasi pada dialog penghapusan |

---

**16. SectionKegiatanView** : Kelas antarmuka pengelolaan kegiatan beserta penetapan opsi jenis relawan dan bidang minat.

Deskripsi atribut kelas SectionKegiatanView

| Nama atribut | Tipe Data | Deskripsi |
|---|---|---|
| items | array | Daftar kegiatan hasil pengambilan dari layanan |
| input | string | Isian sementara pada penyunting opsi jenis relawan dan bidang minat |
| filterStatus | string | Status kegiatan yang sedang disaring |
| deleteTarget | object | Kegiatan yang sedang dikonfirmasi penghapusannya |

Deskripsi fungsi pada kelas SectionKegiatanView

| **handleSave(form)** | |
|---|---|
| Input | Isian judul, deskripsi, lokasi, kategori, tanggal, kuota, penanda kebutuhan relawan dan donasi, serta opsi jenis relawan dan bidang minat |
| Output | Kegiatan baru atau kegiatan yang telah diperbarui |
| Deskripsi | Mengirimkan penambahan atau penyuntingan kegiatan ke KegiatanController. Opsi jenis relawan dan bidang minat yang ditetapkan di sini menjadi pilihan pada formulir pendaftaran relawan |

| **remove(id)** | |
|---|---|
| Input | Pengenal kegiatan |
| Output | Daftar kegiatan tanpa kegiatan yang dihapus |
| Deskripsi | Menghapus kegiatan setelah pengelola menyatakan konfirmasi |

---

**17. SectionRelawanView** : Kelas antarmuka verifikasi pendaftaran relawan beserta pengunduhan rekapitulasinya.

Deskripsi atribut kelas SectionRelawanView

| Nama atribut | Tipe Data | Deskripsi |
|---|---|---|
| items | array | Daftar pendaftaran relawan hasil pengambilan dari layanan |
| loading | boolean | Penanda bahwa pengambilan data sedang berlangsung |
| filterStatus | string | Status pendaftaran yang sedang disaring |
| filterJenis | string | Jenis relawan yang sedang disaring |
| filterKegiatan | string | Kegiatan yang sedang disaring |
| filterBulan | string | Bulan pendaftaran yang disaring, berbentuk YYYY-MM; kosong berarti semua bulan |
| deleteTarget | object | Pendaftaran yang sedang dikonfirmasi penghapusannya |

Deskripsi fungsi pada kelas SectionRelawanView

| **load()** | |
|---|---|
| Input | – |
| Output | Daftar pendaftaran relawan terkini |
| Deskripsi | Mengambil seluruh pendaftaran relawan dari RelawanController |

| **changeStatus(relawan, status)** | |
|---|---|
| Input | Pendaftaran yang dipilih dan status baru |
| Output | Pendaftaran dengan status yang telah diperbarui |
| Deskripsi | Menetapkan status pendaftaran menjadi diterima atau ditolak. Penetapan status diterima memicu pengiriman surel pemberitahuan pada sisi layanan |

| **exportRekap()** | |
|---|---|
| Input | Data yang sedang ditampilkan beserta penyaring dan kata kunci yang aktif |
| Output | Berkas rekapitulasi relawan berformat lembar kerja |
| Deskripsi | Menyusun rekapitulasi relawan mengikuti penyaringan yang sedang aktif. Berkas memuat data pribadi sehingga disertai baris peringatan. Hanya tersedia bagi super admin |

---

**18. SectionGaleriView** : Kelas antarmuka pengelolaan album dokumentasi beserta pengunggahan foto secara massal.

Deskripsi atribut kelas SectionGaleriView

| Nama atribut | Tipe Data | Deskripsi |
|---|---|---|
| items | array | Seluruh foto dokumentasi hasil pengambilan dari layanan |
| loading | boolean | Penanda bahwa pengambilan data sedang berlangsung |
| error | string | Pesan kesalahan pengambilan atau pengunggahan |

Deskripsi fungsi pada kelas SectionGaleriView

| **handleFilesChange(event)** | |
|---|---|
| Input | Sekumpulan berkas gambar yang dipilih pengelola |
| Output | Daftar berkas beserta medan pengisian nama tiap foto |
| Deskripsi | Menerima pilihan berkas dan menyiapkan medan nama untuk masing-masing foto sebelum diunggah |

| **handleSave(form)** | |
|---|---|
| Input | Judul album, kegiatan terkait, kategori, tanggal, serta berkas foto beserta namanya |
| Output | Album baru atau album yang telah diperbarui |
| Deskripsi | Mengunggah foto ke GaleriController. Pengunggahan dipecah menjadi dua puluh berkas per permintaan agar tidak melampaui batas unggahan peladen, disertai penunjuk kemajuan |

| **confirmDeleteAlbum(judul)** | |
|---|---|
| Input | Judul album yang dihapus |
| Output | Daftar album tanpa album yang dihapus |
| Deskripsi | Menghapus seluruh foto yang bernaung pada satu judul album setelah pengelola menyatakan konfirmasi |

---

**19. SectionDonasiView** : Kelas antarmuka verifikasi pembayaran donasi beserta pengunduhan rekapitulasinya.

Deskripsi atribut kelas SectionDonasiView

| Nama atribut | Tipe Data | Deskripsi |
|---|---|---|
| items | array | Daftar donasi hasil pengambilan dari layanan |
| loading | boolean | Penanda bahwa pengambilan data sedang berlangsung |
| filterStatus | string | Status pembayaran yang sedang disaring |
| filterKegiatan | string | Kegiatan tujuan donasi yang sedang disaring |
| filterBulan | string | Bulan donasi yang disaring, berbentuk YYYY-MM; kosong berarti semua bulan |
| detailTarget | object | Donasi yang sedang ditampilkan rinciannya beserta bukti pembayaran |
| deleteTarget | object | Donasi yang sedang dikonfirmasi penghapusannya |

Deskripsi fungsi pada kelas SectionDonasiView

| **load()** | |
|---|---|
| Input | – |
| Output | Daftar donasi terkini |
| Deskripsi | Mengambil seluruh donasi dari DonasiController. Bagi admin biasa, nominal tidak disertakan layanan sehingga tidak dapat ditampilkan |

| **changeStatus(donasi, status)** | |
|---|---|
| Input | Donasi yang dipilih dan status pembayaran baru |
| Output | Donasi dengan status yang telah diperbarui |
| Deskripsi | Menetapkan status pembayaran setelah pengelola memeriksa bukti transfer yang diunggah donatur |

| **handleSave(form)** | |
|---|---|
| Input | Rincian donasi yang disunting pengelola |
| Output | Donasi yang telah diperbarui |
| Deskripsi | Mengirimkan penyuntingan data donasi ke DonasiController |

| **exportRekap()** | |
|---|---|
| Input | Data yang sedang ditampilkan beserta penyaring yang aktif |
| Output | Berkas rekapitulasi donasi berformat lembar kerja |
| Deskripsi | Menyusun rekapitulasi donasi lengkap dengan blok ringkasan dan total, mengikuti penyaringan yang sedang aktif. Hanya tersedia bagi super admin |

---

**20. SectionPenggunaView** : Kelas antarmuka pengelolaan akun pengguna beserta perannya, khusus super admin.

Deskripsi atribut kelas SectionPenggunaView

| Nama atribut | Tipe Data | Deskripsi |
|---|---|---|
| items | array | Daftar akun pengguna hasil pengambilan dari layanan |
| loading | boolean | Penanda bahwa pengambilan data sedang berlangsung |
| deleteTarget | object | Akun yang sedang dikonfirmasi penghapusannya |

Deskripsi fungsi pada kelas SectionPenggunaView

| **load()** | |
|---|---|
| Input | – |
| Output | Daftar akun pengguna terkini |
| Deskripsi | Mengambil seluruh akun pengguna dari AdminController |

| **handleSave(form)** | |
|---|---|
| Input | Nama lengkap, surel, nama pengguna, kata sandi, dan peran |
| Output | Akun baru atau akun yang telah diperbarui |
| Deskripsi | Mengirimkan penambahan atau penyuntingan akun ke AdminController |

| **changeRole(pengguna, peran)** | |
|---|---|
| Input | Akun yang dipilih dan peran baru |
| Output | Akun dengan peran yang telah diperbarui |
| Deskripsi | Mengubah peran akun. Layanan menolak apabila super admin berusaha menurunkan peran akunnya sendiri, sehingga sistem tidak dapat kehilangan seluruh super admin |

| **doReset(pengguna)** | |
|---|---|
| Input | Akun yang kata sandinya disetel ulang |
| Output | Kata sandi sementara yang ditampilkan kepada pengelola |
| Deskripsi | Meminta AdminController menyetel ulang kata sandi akun, lalu menampilkan kata sandi sementara agar dapat disampaikan kepada pemilik akun |

---

**21. SectionNotifikasiView** : Kelas antarmuka yang menyajikan riwayat notifikasi yang dibentuk sistem beserta penyuntingan templatnya.

Deskripsi atribut kelas SectionNotifikasiView

| Nama atribut | Tipe Data | Deskripsi |
|---|---|---|
| tab | string | Tab yang sedang dibuka, yaitu riwayat atau templat |
| history | array | Riwayat notifikasi hasil pengambilan dari layanan |
| loading | boolean | Penanda bahwa pengambilan data sedang berlangsung |
| error | string | Pesan kesalahan pengambilan data |
| tpl | object | Templat judul dan isi notifikasi |
| savedMsg | boolean | Penanda bahwa templat baru saja disimpan |

Deskripsi fungsi pada kelas SectionNotifikasiView

| **loadHistory()** | |
|---|---|
| Input | – |
| Output | Riwayat notifikasi terkini |
| Deskripsi | Mengambil riwayat notifikasi yang pernah dibentuk sistem dari AdminController |

| **saveTpl()** | |
|---|---|
| Input | Templat judul dan isi notifikasi |
| Output | Templat tersimpan |
| Deskripsi | Menyimpan templat notifikasi. Penyimpanan masih bersifat setempat pada peramban dan belum dipakai layanan ketika menyusun isi notifikasi |

---

**22. SectionAuditView** : Kelas antarmuka yang menyajikan jejak audit tindakan pengelola, khusus super admin.

Deskripsi atribut kelas SectionAuditView

| Nama atribut | Tipe Data | Deskripsi |
|---|---|---|
| logs | array | Catatan jejak audit hasil pengambilan dari layanan |
| loading | boolean | Penanda bahwa pengambilan data sedang berlangsung |
| error | string | Pesan kesalahan pengambilan data |
| search | string | Kata kunci penyaringan catatan |

Deskripsi fungsi pada kelas SectionAuditView

| **load()** | |
|---|---|
| Input | – |
| Output | Daftar jejak audit terkini |
| Deskripsi | Mengambil catatan jejak audit dari AdminController, diurutkan menurun menurut waktu. Layanan menolak permintaan dari peran selain super admin |

---


---

### C. Kelas «entity»

**32. User** : Kelas model yang mewakili akun pengguna sistem beserta peran dan data dirinya.

Deskripsi atribut kelas User

| Nama atribut | Tipe Data | Deskripsi |
|---|---|---|
| nama_lengkap | string | Nama lengkap pemilik akun |
| email | string | Alamat surel, bersifat unik dan dipakai untuk masuk |
| username | string | Nama pengguna, bersifat unik dan dapat dipakai untuk masuk |
| password | string | Kata sandi yang disimpan dalam bentuk *hash* |
| role | string | Peran akun bernilai user, admin, atau super_admin |
| jenis_kelamin, tanggal_lahir, usia, no_telepon, alamat, kota, tentang, asal_paroki | string / date / int | Data diri pelengkap yang seluruhnya boleh kosong |

Deskripsi fungsi pada kelas User

| **donasi() : HasMany** | |
|---|---|
| Input | – |
| Output | Relasi menuju model Donasi |
| Deskripsi | Menyatakan bahwa satu pengguna dapat mengajukan banyak donasi |

| **relawan() : HasMany** | |
|---|---|
| Input | – |
| Output | Relasi menuju model Relawan |
| Deskripsi | Menyatakan bahwa satu pengguna dapat memiliki banyak pendaftaran relawan |

| **isAdmin() : bool** | |
|---|---|
| Input | – |
| Output | Nilai benar atau salah |
| Deskripsi | Memeriksa apakah akun berperan admin. Dipakai DonasiController untuk menentukan penyembunyian nominal donasi |

| **isSuperAdmin() : bool** | |
|---|---|
| Input | – |
| Output | Nilai benar atau salah |
| Deskripsi | Memeriksa apakah akun berperan super admin. Dipakai untuk membuka akses ke nominal donasi, pengelolaan pengguna, dan jejak audit |

| **isUser() : bool** | |
|---|---|
| Input | – |
| Output | Nilai benar atau salah |
| Deskripsi | Memeriksa apakah akun berperan pengguna terdaftar biasa |

| **hasRole(string $role) : bool** | |
|---|---|
| Input | Nama peran yang diperiksa |
| Output | Nilai benar atau salah |
| Deskripsi | Memeriksa apakah akun memiliki satu peran tertentu |

| **hasAnyRole(array $roles) : bool** | |
|---|---|
| Input | Daftar peran yang diperiksa |
| Output | Nilai benar atau salah |
| Deskripsi | Memeriksa apakah akun memiliki salah satu dari sekumpulan peran. Dipakai KampanyeController dan RelawanController untuk membedakan pengelola dari pengguna biasa |

| **scopeByRole(query, string $role)** | |
|---|---|
| Input | Pembangun kueri dan peran yang disaring |
| Output | Pembangun kueri yang telah disaring |
| Deskripsi | Menyaring pengguna menurut peran tertentu |

| **scopeAdmins(query)** | |
|---|---|
| Input | Pembangun kueri |
| Output | Pembangun kueri yang telah disaring |
| Deskripsi | Menyaring pengguna yang berperan admin maupun super admin |

| **scopeUsers(query)** | |
|---|---|
| Input | Pembangun kueri |
| Output | Pembangun kueri yang telah disaring |
| Deskripsi | Menyaring pengguna yang berperan pengguna terdaftar biasa |

---

**33. Kegiatan** : Kelas model yang mewakili kegiatan sosial lembaga, berkedudukan sebagai induk bagi donasi, pendaftaran relawan, dan album galeri.

Deskripsi atribut kelas Kegiatan

| Nama atribut | Tipe Data | Deskripsi |
|---|---|---|
| judul, deskripsi, lokasi | string | Identitas dan keterangan kegiatan |
| kategori | string | Kategori kegiatan bernilai bantuan, pendidikan, kesehatan, sosial, atau lainnya |
| tanggal_mulai, tanggal_selesai | date | Rentang waktu pelaksanaan |
| status | string | Status kegiatan bernilai aktif, selesai, atau dibatalkan |
| butuh_relawan, butuh_donasi | bool | Penanda apakah kegiatan membuka pendaftaran relawan dan penerimaan donasi |
| kuota_relawan | int | Batas jumlah relawan yang dapat diterima |
| jumlah_relawan_terdaftar | int | Cacah relawan berstatus diterima, dimutakhirkan otomatis |
| jenis_relawan, bidang_minat | array | Senarai pilihan yang ditetapkan pengelola untuk formulir pendaftaran relawan |

Deskripsi fungsi pada kelas Kegiatan

| **relawan() : HasMany** | |
|---|---|
| Input | – |
| Output | Relasi menuju model Relawan |
| Deskripsi | Menyatakan bahwa satu kegiatan dapat memiliki banyak pendaftaran relawan |

| **galeri() : HasMany** | |
|---|---|
| Input | – |
| Output | Relasi menuju model Galeri |
| Deskripsi | Menyatakan bahwa satu kegiatan dapat memiliki banyak foto dokumentasi |

| **donasi() : HasMany** | |
|---|---|
| Input | – |
| Output | Relasi menuju model Donasi |
| Deskripsi | Menyatakan bahwa satu kegiatan dapat menerima banyak donasi |

| **isAktif() : bool** | |
|---|---|
| Input | – |
| Output | Nilai benar atau salah |
| Deskripsi | Memeriksa apakah kegiatan berstatus aktif. Dipakai DonasiController dan RelawanController sebelum menerima pengajuan |

| **isSelesai() : bool** | |
|---|---|
| Input | – |
| Output | Nilai benar atau salah |
| Deskripsi | Memeriksa apakah kegiatan telah berstatus selesai |

| **isDibatalkan() : bool** | |
|---|---|
| Input | – |
| Output | Nilai benar atau salah |
| Deskripsi | Memeriksa apakah kegiatan telah dibatalkan |

| **isKuotaPenuh() : bool** | |
|---|---|
| Input | – |
| Output | Nilai benar atau salah |
| Deskripsi | Menyatakan kuota telah penuh apabila jumlah relawan terdaftar sudah mencapai atau melampaui kuota |

| **sisaKuota() : int** | |
|---|---|
| Input | – |
| Output | Sisa kuota relawan |
| Deskripsi | Menghitung selisih kuota terhadap jumlah relawan terdaftar. Nilainya tidak pernah negatif |

| **scopeAktif(query)** | |
|---|---|
| Input | Pembangun kueri |
| Output | Pembangun kueri yang telah disaring |
| Deskripsi | Menyaring kegiatan yang berstatus aktif |

| **scopeSelesai(query)** | |
|---|---|
| Input | Pembangun kueri |
| Output | Pembangun kueri yang telah disaring |
| Deskripsi | Menyaring kegiatan yang berstatus selesai |

| **scopeTersedia(query)** | |
|---|---|
| Input | Pembangun kueri |
| Output | Pembangun kueri yang telah disaring |
| Deskripsi | Menyaring kegiatan yang kuotanya belum penuh dengan membandingkan kolom jumlah relawan terdaftar terhadap kolom kuota secara langsung pada basis data |

| **scopeUpcoming(query)** | |
|---|---|
| Input | Pembangun kueri |
| Output | Pembangun kueri yang telah disaring |
| Deskripsi | Menyaring kegiatan yang tanggal mulainya masih akan datang |

---

**34. Kampanye** : Kelas model yang mewakili berita dan kampanye lembaga.

Deskripsi atribut kelas Kampanye

| Nama atribut | Tipe Data | Deskripsi |
|---|---|---|
| judul, konten, ringkasan | string | Isi berita |
| gambar_url, penulis, penulis_avatar | string | Gambar sampul dan identitas penulis |
| tags | array | Senarai label berita |
| waktu_baca | string | Perkiraan lama membaca |
| kategori | string | Kategori berita |
| status | string | Status penerbitan bernilai draft, published, atau archived |
| tanggal_publish | timestamp | Waktu berita diterbitkan |

Deskripsi fungsi pada kelas Kampanye

| **isDraft() : bool** | |
|---|---|
| Input | – |
| Output | Nilai benar atau salah |
| Deskripsi | Memeriksa apakah berita masih berstatus draf |

| **isPublished() : bool** | |
|---|---|
| Input | – |
| Output | Nilai benar atau salah |
| Deskripsi | Memeriksa apakah berita telah terbit. Dipakai KampanyeController untuk menentukan kelayakan tampil bagi pemanggil non-pengelola |

| **isArchived() : bool** | |
|---|---|
| Input | – |
| Output | Nilai benar atau salah |
| Deskripsi | Memeriksa apakah berita telah diarsipkan |

| **scopePublished(query)** | |
|---|---|
| Input | Pembangun kueri |
| Output | Pembangun kueri yang telah disaring |
| Deskripsi | Menyaring berita yang berstatus terbit saja |

| **scopeDraft(query)** | |
|---|---|
| Input | Pembangun kueri |
| Output | Pembangun kueri yang telah disaring |
| Deskripsi | Menyaring berita yang masih berstatus draf |

| **scopeByKategori(query, string $kategori)** | |
|---|---|
| Input | Pembangun kueri dan kategori yang disaring |
| Output | Pembangun kueri yang telah disaring |
| Deskripsi | Menyaring berita menurut kategori tertentu |

| **scopeRecent(query)** | |
|---|---|
| Input | Pembangun kueri |
| Output | Pembangun kueri yang telah diurutkan |
| Deskripsi | Mengurutkan berita menurun menurut tanggal publikasi untuk keperluan penyajian berita terbaru |

| **getExcerptAttribute() : string** | |
|---|---|
| Input | – |
| Output | Cuplikan isi berita |
| Deskripsi | Atribut turunan yang menyusun cuplikan singkat dari isi berita untuk ditampilkan pada daftar |

---

**35. Galeri** : Kelas model yang mewakili satu foto dokumentasi kegiatan. Pengelompokan foto menjadi album dilakukan melalui kesamaan nilai judul.

Deskripsi atribut kelas Galeri

| Nama atribut | Tipe Data | Deskripsi |
|---|---|---|
| kegiatan_id | uuid | Kunci tamu menuju kegiatan induk, boleh kosong |
| judul | string | Nama album; foto dengan judul sama membentuk satu album |
| nama_foto | string | Nama masing-masing foto |
| deskripsi | string | Keterangan foto |
| gambar_url | string | Lintasan berkas pada penyimpanan atau pranala eksternal |
| kategori | string | Kategori dokumentasi |
| tanggal | date | Tanggal pengambilan dokumentasi |
| tipe | string | Jenis berkas bernilai foto atau video |

Deskripsi fungsi pada kelas Galeri

| **kegiatan() : BelongsTo** | |
|---|---|
| Input | – |
| Output | Relasi menuju model Kegiatan |
| Deskripsi | Menyatakan bahwa satu foto dapat dimiliki satu kegiatan |

| **isFoto() : bool** | |
|---|---|
| Input | – |
| Output | Nilai benar atau salah |
| Deskripsi | Memeriksa apakah berkas dokumentasi bertipe foto |

| **isVideo() : bool** | |
|---|---|
| Input | – |
| Output | Nilai benar atau salah |
| Deskripsi | Memeriksa apakah berkas dokumentasi bertipe video |

| **scopeFoto(query)** | |
|---|---|
| Input | Pembangun kueri |
| Output | Pembangun kueri yang telah disaring |
| Deskripsi | Menyaring dokumentasi yang bertipe foto |

| **scopeVideo(query)** | |
|---|---|
| Input | Pembangun kueri |
| Output | Pembangun kueri yang telah disaring |
| Deskripsi | Menyaring dokumentasi yang bertipe video |

| **scopeByKegiatan(query, $kegiatanId)** | |
|---|---|
| Input | Pembangun kueri dan pengenal kegiatan |
| Output | Pembangun kueri yang telah disaring |
| Deskripsi | Menyaring dokumentasi yang bernaung pada satu kegiatan tertentu |

| **getThumbnailAttribute() : ?string** | |
|---|---|
| Input | – |
| Output | Lintasan gambar kecil atau nilai kosong |
| Deskripsi | Atribut turunan yang menyediakan gambar kecil untuk penyajian daftar |

---

**36. Donasi** : Kelas model yang mewakili satu pengajuan donasi beserta status pembayarannya.

Deskripsi atribut kelas Donasi

| Nama atribut | Tipe Data | Deskripsi |
|---|---|---|
| user_id, kegiatan_id | uuid | Kunci tamu menuju donatur dan kegiatan tujuan |
| jumlah | decimal | Nominal donasi |
| metode_pembayaran | string | Metode pembayaran berupa QRIS atau transfer bank |
| status_pembayaran | string | Status bernilai pending, berhasil, atau gagal |
| bukti_transfer | string | Lintasan berkas bukti pembayaran |
| biaya_transfer, kode_transaksi, rekening_pengirim | decimal / string | Rincian pembayaran yang diisi pengelola |
| anonim | bool | Penanda penyembunyian identitas donatur pada tampilan |
| notifikasi_terkirim | bool | Penanda bahwa pemberitahuan terima kasih sudah dikirim |
| tanggal_donasi | timestamp | Waktu pengajuan donasi |

Deskripsi fungsi pada kelas Donasi

| **user() : BelongsTo** | |
|---|---|
| Input | – |
| Output | Relasi menuju model User |
| Deskripsi | Menyatakan bahwa satu donasi dimiliki satu donatur |

| **kegiatan() : BelongsTo** | |
|---|---|
| Input | – |
| Output | Relasi menuju model Kegiatan |
| Deskripsi | Menyatakan bahwa satu donasi ditujukan pada satu kegiatan |

| **isPending() : bool** | |
|---|---|
| Input | – |
| Output | Nilai benar atau salah |
| Deskripsi | Memeriksa apakah pembayaran donasi masih menunggu verifikasi |

| **isBerhasil() : bool** | |
|---|---|
| Input | – |
| Output | Nilai benar atau salah |
| Deskripsi | Memeriksa apakah pembayaran donasi telah diverifikasi berhasil |

| **isGagal() : bool** | |
|---|---|
| Input | – |
| Output | Nilai benar atau salah |
| Deskripsi | Memeriksa apakah pembayaran donasi dinyatakan gagal |

| **scopeBerhasil(query)** | |
|---|---|
| Input | Pembangun kueri |
| Output | Pembangun kueri yang telah disaring |
| Deskripsi | Menyaring donasi yang pembayarannya telah berhasil. Dipakai DonasiController pada penyusunan laporan |

| **scopePending(query)** | |
|---|---|
| Input | Pembangun kueri |
| Output | Pembangun kueri yang telah disaring |
| Deskripsi | Menyaring donasi yang pembayarannya masih menunggu verifikasi |

| **scopeByUser(query, $userId)** | |
|---|---|
| Input | Pembangun kueri dan pengenal donatur |
| Output | Pembangun kueri yang telah disaring |
| Deskripsi | Menyaring donasi milik satu donatur tertentu |

| **scopeByKegiatan(query, $kegiatanId)** | |
|---|---|
| Input | Pembangun kueri dan pengenal kegiatan |
| Output | Pembangun kueri yang telah disaring |
| Deskripsi | Menyaring donasi yang ditujukan pada satu kegiatan tertentu |

| **getFormattedJumlahAttribute() : string** | |
|---|---|
| Input | – |
| Output | Nominal donasi berformat mata uang |
| Deskripsi | Atribut turunan yang menyusun penulisan nominal dalam format rupiah |

---

**37. Relawan** : Kelas model yang mewakili satu pendaftaran relawan pada suatu kegiatan. Kelas ini memiliki pendengar peristiwa yang menjaga kekonsistenan cacah relawan pada kegiatan.

Deskripsi atribut kelas Relawan

| Nama atribut | Tipe Data | Deskripsi |
|---|---|---|
| user_id, kegiatan_id | uuid | Kunci tamu menuju pendaftar dan kegiatan |
| jenis | string | Jenis relawan sesuai opsi yang ditetapkan pengelola |
| minat | string | Bidang minat sesuai opsi yang ditetapkan pengelola |
| kemampuan_diri, motivasi | string | Keterangan yang diisi pendaftar |
| nomor_ktp | string | Nomor identitas pendaftar |
| kebutuhan_khusus | string | Keterbatasan diri yang perlu diketahui pengelola |
| status | string | Status verifikasi bernilai pending, diterima, atau ditolak |
| tanggal_daftar | timestamp | Waktu pendaftaran diajukan |

Deskripsi fungsi pada kelas Relawan

| **user() : BelongsTo** | |
|---|---|
| Input | – |
| Output | Relasi menuju model User |
| Deskripsi | Menyatakan bahwa satu pendaftaran dimiliki satu pengguna |

| **kegiatan() : BelongsTo** | |
|---|---|
| Input | – |
| Output | Relasi menuju model Kegiatan |
| Deskripsi | Menyatakan bahwa satu pendaftaran tertuju pada satu kegiatan |

| **isPending() : bool** | |
|---|---|
| Input | – |
| Output | Nilai benar atau salah |
| Deskripsi | Memeriksa apakah pendaftaran masih menunggu verifikasi |

| **isDiterima() : bool** | |
|---|---|
| Input | – |
| Output | Nilai benar atau salah |
| Deskripsi | Memeriksa apakah pendaftaran telah diterima. Dipakai RelawanController untuk menolak pembatalan atas pendaftaran yang sudah diterima |

| **isDitolak() : bool** | |
|---|---|
| Input | – |
| Output | Nilai benar atau salah |
| Deskripsi | Memeriksa apakah pendaftaran telah ditolak |

| **hasKebutuhanKhusus() : bool** | |
|---|---|
| Input | – |
| Output | Nilai benar atau salah |
| Deskripsi | Menyatakan apakah pendaftar mencantumkan keterbatasan diri yang perlu diperhatikan pengelola |

| **scopePending(query)** | |
|---|---|
| Input | Pembangun kueri |
| Output | Pembangun kueri yang telah disaring |
| Deskripsi | Menyaring pendaftaran yang belum diverifikasi. Dipakai RelawanController pada fungsi pending |

| **scopeDiterima(query)** | |
|---|---|
| Input | Pembangun kueri |
| Output | Pembangun kueri yang telah disaring |
| Deskripsi | Menyaring pendaftaran yang telah diterima |

| **scopeDitolak(query)** | |
|---|---|
| Input | Pembangun kueri |
| Output | Pembangun kueri yang telah disaring |
| Deskripsi | Menyaring pendaftaran yang telah ditolak |

| **scopeByUser(query, $userId)** | |
|---|---|
| Input | Pembangun kueri dan pengenal pendaftar |
| Output | Pembangun kueri yang telah disaring |
| Deskripsi | Menyaring pendaftaran milik satu pengguna tertentu |

| **scopeByKegiatan(query, $kegiatanId)** | |
|---|---|
| Input | Pembangun kueri dan pengenal kegiatan |
| Output | Pembangun kueri yang telah disaring |
| Deskripsi | Menyaring pendaftaran pada satu kegiatan tertentu |

| **scopeWithKebutuhanKhusus(query)** | |
|---|---|
| Input | Pembangun kueri |
| Output | Pembangun kueri yang telah disaring |
| Deskripsi | Menyaring pendaftaran yang pendaftarnya mencantumkan keterbatasan diri, agar pengelola dapat menyiapkan pendampingan yang sesuai |

| **booted() : void** | |
|---|---|
| Input | – |
| Output | – |
| Deskripsi | Memasang tiga pendengar peristiwa yang menjaga invarian bahwa nilai jumlah_relawan_terdaftar pada kegiatan selalu sama dengan cacah relawan berstatus diterima. Peristiwa `created` menambah cacah apabila pendaftaran langsung dibuat berstatus diterima; peristiwa `updated` menambah atau mengurangi cacah ketika status berubah ke atau dari diterima; peristiwa `deleted` mengurangi cacah apabila pendaftaran yang dihapus berstatus diterima |

---

**38. AuditLog** : Kelas model yang mewakili satu catatan jejak audit atas tindakan pengelola yang mengubah data.

Deskripsi atribut kelas AuditLog

| Nama atribut | Tipe Data | Deskripsi |
|---|---|---|
| user_id | uuid | Kunci tamu menuju pelaku tindakan, boleh kosong |
| user_nama | string | Nama pelaku yang disalin saat pencatatan agar tetap terbaca meski akun dihapus |
| aksi | string | Jenis tindakan yang dilakukan |
| target | string | Data yang menjadi sasaran tindakan |

Deskripsi fungsi pada kelas AuditLog

| **user() : BelongsTo** | |
|---|---|
| Input | – |
| Output | Relasi menuju model User |
| Deskripsi | Menyatakan bahwa satu catatan audit dihasilkan satu pengguna |

| **record($user, string $aksi, ?string $target) : void** | |
|---|---|
| Input | Pelaku tindakan, jenis tindakan, dan sasaran tindakan |
| Output | – |
| Deskripsi | Fungsi statis yang membentuk satu catatan jejak audit. Seluruh badan fungsi dibungkus penanganan galat sehingga kegagalan pencatatan tidak pernah menggagalkan tindakan utama yang sedang berjalan |

---

**39. NotifikasiLog** : Kelas model yang mewakili satu catatan riwayat notifikasi yang dibentuk sistem.

Deskripsi atribut kelas NotifikasiLog

| Nama atribut | Tipe Data | Deskripsi |
|---|---|---|
| user_id | uuid | Kunci tamu menuju penerima notifikasi, boleh kosong |
| tipe | string | Kanal notifikasi bernilai email atau system |
| penerima | string | Alamat surel atau nomor telepon penerima |
| judul, isi | string | Judul dan isi ringkas notifikasi |
| trigger | string | Peristiwa yang memicu notifikasi |
| status | string | Status pengiriman bernilai terkirim atau gagal |

Deskripsi fungsi pada kelas NotifikasiLog

| **user() : BelongsTo** | |
|---|---|
| Input | – |
| Output | Relasi menuju model User |
| Deskripsi | Menyatakan bahwa satu catatan notifikasi ditujukan kepada satu pengguna |

| **record(array $data) : void** | |
|---|---|
| Input | Larik data notifikasi |
| Output | – |
| Deskripsi | Fungsi statis yang membentuk satu catatan riwayat notifikasi dengan status bawaan terkirim. Sebagaimana AuditLog, kegagalan pencatatan tidak menggagalkan tindakan utama |

---

