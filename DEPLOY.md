# 🚀 Checklist Deploy — Website Yayasan Karinakas

Panduan langkah-demi-langkah untuk menghosting proyek ini ke server produksi.
Terdiri dari **2 aplikasi** yang di-deploy terpisah:

| Aplikasi | Teknologi | Folder |
|---|---|---|
| Backend (API) | Laravel 13 + Sanctum + MySQL | `tugas_akhir/` |
| Frontend (Web) | React 19 + Vite | `frontend_karinakas/` |

> **Intinya:** kode penyimpanan foto **tidak berubah**. Yang disesuaikan hanya **konfigurasi** (URL, `.env`, `storage:link`, izin folder, CORS, limit upload, dan rewrite SPA).

---

## 0. Prasyarat server
- [ ] PHP **8.3+** dengan ekstensi: `pdo_mysql`, `mbstring`, `openssl`, `fileinfo`, `gd`/`imagick`, `ctype`, `bcmath`
      (`composer.json` mensyaratkan `"php": "^8.3"` — PHP 8.2 akan ditolak saat `composer install`)
- [ ] **Composer**
- [ ] **Node.js 18+** & npm — **hanya di mesin tempat build dijalankan**, bukan di server produksi.
      Hasil `npm run build` adalah berkas statis (`dist/`) yang disajikan Nginx/Apache tanpa Node.js.
- [ ] **MySQL 8** (atau MariaDB)
- [ ] Web server **Nginx/Apache** (idealnya bisa symlink → hindari shared hosting yang melarang symlink)
- [ ] Domain/subdomain, mis. `karinakas.org` (frontend) & `api.karinakas.org` (backend)

---

## A. Deploy BACKEND (Laravel — folder `tugas_akhir/`)

### A1. Upload & dependensi
- [ ] Upload/clone folder `tugas_akhir` ke server (mis. `/var/www/karinakas-api`)
- [ ] `composer install --no-dev --optimize-autoloader`

### A2. Konfigurasi `.env`
- [ ] Salin `.env.example` → `.env` (atau buat baru), lalu set:
```env
APP_NAME=Karinakas
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.karinakas.org        # ← domain backend (dipakai untuk URL storage/foto)
FRONTEND_URL=https://karinakas.org       # ← domain situs React; menyusun tautan reset kata sandi pada surel

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306                              # ← di server biasanya 3306 (dev pakai 3307)
DB_DATABASE=karinakas
DB_USERNAME=<user_db>
DB_PASSWORD=<password_db>

FILESYSTEM_DISK=public
LOG_CHANNEL=stack

# Surel WAJIB aktif: dipakai tautan reset kata sandi & pemberitahuan penerimaan relawan
MAIL_MAILER=smtp
MAIL_SCHEME=smtp
MAIL_HOST=mail.karinakas.com              # kotak surel hosting (cPanel)
MAIL_PORT=587                             # STARTTLS; 465 juga terbuka bila perlu
MAIL_USERNAME=noreply@karinakas.com
MAIL_PASSWORD="<sandi_kotak_surel>"       # WAJIB diapit kutip bila memuat tanda #
MAIL_FROM_ADDRESS="noreply@karinakas.com" # harus sama dengan MAIL_USERNAME
MAIL_FROM_NAME="Yayasan Karinakas"
```
- [ ] `php artisan key:generate`

### A3. Database
- [ ] Buat database `karinakas` di MySQL server
- [ ] Jalankan migrasi (**JANGAN** `migrate:fresh` di produksi — itu menghapus semua data):
```bash
php artisan migrate --force
```
- [ ] (Hanya sekali, opsional) isi data awal + akun demo:
```bash
php artisan db:seed --force
```
> ⚠️ Setelah seed, **segera ganti password** akun `superadmin@karinakas.org` & `admin@karinakas.org` (default `password123`) lewat panel admin.

### A4. Storage foto (galeri & bukti transfer)
- [ ] Buat symlink agar file bisa diakses via URL:
```bash
php artisan storage:link
```
- [ ] Pastikan folder writable oleh web server:
```bash
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache   # sesuaikan user web server
```

### A5. CORS (batasi origin di produksi)
- [ ] Edit `config/cors.php` → ganti `allowed_origins` dari `['*']` menjadi domain frontend:
```php
'allowed_origins' => ['https://karinakas.org'],
```

### A6. Limit upload PHP (untuk foto maks 5MB & bulk upload banyak foto)
- [ ] Di `php.ini` server, pastikan:
```ini
upload_max_filesize = 8M
post_max_size = 64M         # cukup besar untuk bulk upload banyak foto sekaligus
max_file_uploads = 100      # ← WAJIB dinaikkan; default 20 = maksimal 20 foto per sekali upload
```
- [ ] Restart PHP-FPM setelah mengubah `php.ini`
> Cek nilai aktif: `php -r "echo ini_get('max_file_uploads');"`

### A7. Optimasi (opsional tapi disarankan)
- [ ] `php artisan config:cache`
- [ ] `php artisan route:cache`
```
> Jika nanti mengubah `.env` atau route, jalankan `php artisan config:clear` / `route:clear` dulu.
```

### A8. Web server → docroot ke `public/`
- [ ] Arahkan document root ke **`tugas_akhir/public`** (bukan root Laravel)
- [ ] Aktifkan HTTPS (SSL) — mis. Let's Encrypt
- [ ] Contoh Nginx:
```nginx
server {
    server_name api.karinakas.org;
    root /var/www/karinakas-api/public;
    index index.php;
    location / { try_files $uri $uri/ /index.php?$query_string; }
    location ~ \.php$ {
        fastcgi_pass unix:/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

---

## B. Deploy FRONTEND (React/Vite — folder `frontend_karinakas/`)

### B1. Konfigurasi `.env` (WAJIB sebelum build)
- [ ] Set URL API produksi di `frontend_karinakas/.env`:
```env
VITE_API_URL=https://api.karinakas.org/api/v1
```
> ⚠️ URL ini **"dibakar" saat build**. Jika salah, foto & data tidak muncul. Ganti dulu **sebelum** `npm run build`.

### B2. Build
- [ ] `npm ci` (atau `npm install`)
- [ ] `npm run build` → menghasilkan folder **`dist/`**

### B3. Hosting file statis `dist/`
- [ ] Upload isi `dist/` ke web root frontend (mis. `/var/www/karinakas-web`)
- [ ] **PENTING — SPA fallback:** semua rute diarahkan ke `index.html`, kalau tidak, refresh di halaman seperti `/galeri` akan **404**.
  - Nginx:
```nginx
server {
    server_name karinakas.org;
    root /var/www/karinakas-web;
    index index.html;
    location / { try_files $uri $uri/ /index.html; }
}
```
  - Apache (`.htaccess`):
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```
- [ ] Aktifkan HTTPS (SSL)

---

## C. Verifikasi setelah deploy
- [ ] Buka `https://karinakas.org` → layar intro & beranda tampil
- [ ] Foto **galeri** tampil (uji dari database, per album)
- [ ] **Login** super admin & admin berhasil
- [ ] Admin bisa **upload foto galeri** → foto langsung tampil di publik
- [ ] User bisa **donasi** → **upload bukti transfer** → admin melihat buktinya
- [ ] Metode **QRIS**: gambar QR tampil (tidak rusak) & bisa discan aplikasi pembayaran
- [ ] Daftar **relawan** berhasil terkirim
- [ ] Refresh langsung di URL dalam (mis. `/galeri`, `/kegiatan`) **tidak 404** (SPA fallback bekerja)
- [ ] Cek `storage/logs/laravel.log` bersih dari error

---

## D. Troubleshooting umum
| Gejala | Kemungkinan penyebab | Solusi |
|---|---|---|
| Foto tidak muncul (ikon rusak) | `storage:link` belum jalan / `APP_URL` salah | Jalankan `php artisan storage:link`, betulkan `APP_URL` |
| Semua data kosong / gagal fetch | `VITE_API_URL` salah / belum build ulang | Betulkan `.env` frontend, `npm run build` ulang |
| CORS error di console browser | origin frontend belum diizinkan | Set `allowed_origins` di `config/cors.php` lalu `config:clear` |
| Refresh `/galeri` → 404 | SPA fallback belum diatur | Tambah rewrite ke `index.html` (lihat B3) |
| Upload foto gagal (413/422) | limit PHP terlalu kecil | Naikkan `upload_max_filesize`/`post_max_size`, restart PHP-FPM |
| 500 setelah ubah `.env` | config ter-cache | `php artisan config:clear` |

---

## E. Catatan penting
- **Data & file aman saat update biasa** (`git pull` + `migrate`). **Jangan** `migrate:fresh` di produksi (menghapus semua data; file foto jadi yatim).
- **File foto** ada di `storage/app/public/` — backup folder ini secara berkala bersama database.
- **Rekening donasi** (`Mandiri 1370013862012 a.n. YAYASAN KARINAKAS`) ditulis di frontend `src/pages/Donasi.jsx` (konstanta `BANK`). Ubah di sana bila perlu, lalu build ulang.
- **QRIS**: gambar QR **wajib ada** di `frontend_karinakas/public/qris-karinakas.png` sebelum `npm run build` (ikut tersalin ke `dist/`). Data merchant (NMID `ID2026479922646`, terminal `A01`) ada di konstanta `QRIS` pada file yang sama. Kalau file hilang, halaman donasi menampilkan pesan "Gambar QRIS belum tersedia" dan mengarahkan ke transfer bank.
- **Kontak & sosial media** (WhatsApp `+62 813-9277-7710`, IG, YouTube) ada di `src/components/Footer.jsx` & `src/pages/Kontak.jsx`. Alamat kantor dan peta dipusatkan di `src/data/lembaga.js`.
- **Keamanan produksi**: pastikan `APP_DEBUG=false`, HTTPS aktif, CORS dibatasi, dan password default admin sudah diganti.
- **Email wajib aktif.** Pemulihan kata sandi memakai **tautan** yang dikirim lewat surel, sehingga blok `MAIL_*` dan `FRONTEND_URL` harus terisi benar pada `.env` peladen. Pengiriman memakai kotak surel hosting `noreply@karinakas.com` lewat `mail.karinakas.com` porta **587 (STARTTLS)** — sudah diuji berhasil pada 16 September 2026. Tiga hal yang sering menggagalkan: `MAIL_FROM_ADDRESS` tidak sama dengan `MAIL_USERNAME`; `MAIL_PASSWORD` tidak diapit kutip padahal memuat tanda `#` sehingga sandinya terpotong; dan `FRONTEND_URL` salah sehingga tautan mengarah ke domain backend. Di pengembangan, `MAIL_MAILER=log` membuat seluruh isi surel (termasuk tautannya) tertulis pada `storage/logs/laravel.log`.
- **Payment gateway** belum aktif — verifikasi donasi dilakukan manual melalui bukti transfer. Pengiriman **WhatsApp otomatis ditiadakan** (16 September 2026); seluruh pemberitahuan dikirim lewat surel.
