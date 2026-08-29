import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import CTA from '../components/CTA'
import Breadcrumb from '../components/Breadcrumb'
import PageHero from '../components/PageHero'
import { useAuth } from '../context/AuthContext'
import { fmtTanggal } from '../data/store'
import useResource from '../hooks/useResource'
import { kegiatanService, donasiService } from '../services/resources'

const presetAmounts = [50000, 100000, 250000, 500000, 1000000, 2500000]

// Rekening tujuan transfer
const BANK = {
  bank: 'Mandiri',
  norek: '1370013862012',
  nama: 'YAYASAN KARINAKAS',
}

// QRIS statis Karinakas — gambar QR ada di public/qris-karinakas.png
const QRIS = {
  nama: 'YAYASAN KARINAKAS',
  nmid: 'ID2026479922646',
  terminal: 'A01',
  img: '/qris-karinakas.png',
}

// Virtual Account di-skip dulu — QRIS & transfer bank
const payMethods = [
  { id: 'qris',     icon: 'bi-qr-code-scan', label: 'QRIS',                     desc: 'Scan dari GoPay, OVO, DANA, ShopeePay, atau m-banking', metode: 'QRIS' },
  { id: 'transfer', icon: 'bi-bank',         label: `Transfer Bank (${BANK.bank})`, desc: `Transfer manual ke rekening ${BANK.bank}`,          metode: `Transfer ${BANK.bank}` },
]

const fmt = n => 'Rp ' + n.toLocaleString('id-ID')

function Donasi() {
  const { user } = useAuth()
  const [params] = useSearchParams()
  const { items: allKegiatan } = useResource(kegiatanService)

  // Kegiatan yang membuka donasi & masih aktif
  const kegiatanDonasi = allKegiatan.filter(k => k.butuhDonasi && k.status === 'aktif')

  const initialKeg = params.get('kegiatan') || ''
  const [kegiatanId, setKegiatanId] = useState(initialKeg)
  const [tujuan,   setTujuan]   = useState('')
  const [amount,   setAmount]   = useState(null)
  const [custom,   setCustom]   = useState('')
  const [method,   setMethod]   = useState('qris') // QRIS atau transfer bank
  const [form,     setForm]     = useState({ anonim: false, pesan: '' })
  const [sending,  setSending]  = useState(false)
  const [error,    setError]    = useState('')
  const [sent,     setSent]     = useState(false)
  const [copied,   setCopied]   = useState(false)
  const [copiedNom, setCopiedNom] = useState(false)
  const [qrisError, setQrisError] = useState(false)
  const [donasiId,  setDonasiId]  = useState(null)
  const [buktiFile, setBuktiFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploaded,  setUploaded]  = useState(false)
  const [uploadErr, setUploadErr] = useState('')

  const finalAmount    = amount ?? (custom ? parseInt(custom.replace(/\D/g, ''), 10) || 0 : 0)
  const selectedKeg    = kegiatanDonasi.find(k => String(k.id) === String(kegiatanId))
  const selectedMethod = payMethods.find(m => m.id === method)
  const isQris         = method === 'qris'

  const copyNorek = () => {
    navigator.clipboard?.writeText(BANK.norek)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const copyNominal = () => {
    navigator.clipboard?.writeText(String(finalAmount))
    setCopiedNom(true)
    setTimeout(() => setCopiedNom(false), 1500)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!kegiatanId)   { setError('Pilih kegiatan yang ingin Anda donasikan.'); return }
    if (!tujuan)       { setError('Pilih tujuan donasi (untuk apa).'); return }
    if (!finalAmount)  { setError('Masukkan jumlah donasi.'); return }
    if (!method)       { setError('Pilih metode pembayaran.'); return }
    setSending(true)
    setError('')
    try {
      const created = await donasiService.create({
        kegiatanId,
        nominal: finalAmount,
        metode: selectedMethod?.metode || `Transfer ${BANK.bank}`,
        tujuan,
        pesan: form.pesan,
        anonim: form.anonim,
      })
      setDonasiId(created?.id || null)
      setSent(true)
    } catch (err) {
      setError(err.message || 'Gagal mengirim donasi. Pastikan Anda sudah login & backend berjalan.')
    } finally {
      setSending(false)
    }
  }

  const handleUpload = async () => {
    if (!buktiFile || !donasiId) return
    setUploading(true)
    setUploadErr('')
    try {
      await donasiService.uploadBukti(donasiId, buktiFile)
      setUploaded(true)
    } catch (err) {
      setUploadErr(err.message || 'Gagal mengunggah bukti transfer.')
    } finally {
      setUploading(false)
    }
  }

  if (sent) return (
    <>
      <Breadcrumb items={[{ label: 'Donasi' }]} />
      <div className="dn-success-page">
        <div className="dn-success-card" style={{ maxWidth: 520 }}>
          <div className="dn-success-icon" style={{ color: '#d97000' }}><i className={`bi ${isQris ? 'bi-qr-code-scan' : 'bi-bank2'}`}></i></div>
          <h2 className="dn-success-title">Selesaikan Pembayaran</h2>
          <p className="dn-success-sub">
            Donasi Anda untuk <strong>{tujuan}</strong>{selectedKeg ? <> (kegiatan: <strong>{selectedKeg.judul}</strong>)</> : ''} sudah tercatat.
            {isQris
              ? <> Silakan <strong>scan QRIS</strong> di bawah ini dan bayar sejumlah:</>
              : <> Silakan <strong>transfer</strong> sejumlah berikut ke rekening Karinakas:</>}
          </p>

          {/* Nominal */}
          <div style={{ background: '#FFF5F5', border: '1.5px solid #ffd9d9', borderRadius: 14, padding: '1rem', margin: '1.25rem 0' }}>
            <p style={{ fontSize: '0.8rem', color: '#606060', margin: 0 }}>{isQris ? 'Total Pembayaran' : 'Total Transfer'}</p>
            <p style={{ fontSize: '1.8rem', fontWeight: 900, color: '#C0392B', margin: 0 }}>{fmt(finalAmount)}</p>
            {isQris && (
              <button className="btn btn-sm btn-outline-danger rounded-pill px-3 mt-2" onClick={copyNominal}>
                <i className={`bi ${copiedNom ? 'bi-check2' : 'bi-clipboard'} me-1`}></i>{copiedNom ? 'Nominal tersalin' : 'Salin nominal'}
              </button>
            )}
          </div>

          {isQris ? (
            /* QRIS statis */
            <div style={{ background: '#fafafa', border: '1.5px solid #eee', borderRadius: 14, padding: '1rem 1.2rem' }}>
              <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
                <i className="bi bi-qr-code-scan text-danger"></i>
                <span style={{ fontWeight: 800 }}>Scan QRIS</span>
              </div>

              {qrisError ? (
                <div className="lg-error" style={{ textAlign: 'left' }}>
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  Gambar QRIS belum tersedia. Silakan gunakan metode <strong>Transfer Bank</strong>,
                  atau hubungi admin Karinakas.
                </div>
              ) : (
                <>
                  <img
                    src={QRIS.img}
                    alt={`QRIS ${QRIS.nama}`}
                    onError={() => setQrisError(true)}
                    style={{ width: '100%', maxWidth: 320, height: 'auto', display: 'block', margin: '0 auto', background: '#fff', border: '1px solid #eee', borderRadius: 12, padding: 8 }}
                  />
                  <p style={{ fontWeight: 800, margin: '0.75rem 0 0.1rem' }}>{QRIS.nama}</p>
                  <p style={{ fontSize: '0.8rem', color: '#606060', margin: 0 }}>
                    NMID: {QRIS.nmid} · {QRIS.terminal}
                  </p>
                  <a
                    href={QRIS.img}
                    download="qris-karinakas.png"
                    className="btn btn-sm btn-outline-danger rounded-pill px-3 mt-2"
                  >
                    <i className="bi bi-download me-1"></i>Simpan gambar QRIS
                  </a>
                </>
              )}

              <div style={{ textAlign: 'left', marginTop: '1rem', fontSize: '0.9rem', color: '#404040' }}>
                <p style={{ fontWeight: 800, marginBottom: '0.4rem' }}>Cara bayar:</p>
                <ol style={{ paddingLeft: '1.2rem', margin: 0 }}>
                  <li>Buka aplikasi berlogo QRIS (GoPay, OVO, DANA, ShopeePay, atau m-banking).</li>
                  <li>Pilih menu <strong>Scan/Bayar</strong>, lalu arahkan ke QR di atas (atau unggah gambar yang sudah disimpan).</li>
                  <li>Masukkan nominal <strong>{fmt(finalAmount)}</strong> — QRIS ini tidak memuat nominal otomatis.</li>
                  <li>Selesaikan pembayaran, lalu <strong>screenshot bukti</strong> dan unggah di bawah.</li>
                </ol>
              </div>
            </div>
          ) : (
            /* Rekening tujuan */
            <div style={{ background: '#fafafa', border: '1.5px solid #eee', borderRadius: 14, padding: '1rem 1.2rem', textAlign: 'left' }}>
              <div className="d-flex align-items-center gap-2 mb-2">
                <i className="bi bi-bank2 text-danger"></i>
                <span style={{ fontWeight: 800 }}>Bank {BANK.bank}</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#606060', margin: '0 0 0.1rem' }}>Nomor Rekening</p>
              <div className="d-flex align-items-center justify-content-between">
                <span style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: 1 }}>{BANK.norek}</span>
                <button className="btn btn-sm btn-outline-danger rounded-pill px-3" onClick={copyNorek}>
                  <i className={`bi ${copied ? 'bi-check2' : 'bi-clipboard'} me-1`}></i>{copied ? 'Tersalin' : 'Salin'}
                </button>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#606060', margin: '0.6rem 0 0.1rem' }}>Atas Nama</p>
              <p style={{ fontWeight: 600, margin: 0 }}>{BANK.nama}</p>
            </div>
          )}

          {/* Upload bukti pembayaran */}
          <div style={{ marginTop: '1.25rem', textAlign: 'left' }}>
            <label className="kt-label"><i className="bi bi-receipt me-1 text-danger"></i>Upload Bukti {isQris ? 'Pembayaran' : 'Transfer'}</label>
            {uploaded ? (
              <div className="pf-alert-success"><i className="bi bi-check-circle-fill me-2"></i>Bukti pembayaran berhasil dikirim! Menunggu verifikasi admin.</div>
            ) : (
              <>
                <input type="file" accept="image/*" className="kt-input" onChange={e => setBuktiFile(e.target.files?.[0] || null)} />
                {buktiFile && <p className="dn-form-hint mt-1"><i className="bi bi-paperclip me-1"></i>{buktiFile.name}</p>}
                {uploadErr && <div className="lg-error mt-2"><i className="bi bi-exclamation-circle-fill me-2"></i>{uploadErr}</div>}
                <button className="btn btn-danger rounded-pill px-4 mt-2 w-100" disabled={!buktiFile || uploading} onClick={handleUpload}>
                  {uploading ? <><span className="lg-spinner" /> Mengunggah...</> : <><i className="bi bi-cloud-arrow-up-fill me-2"></i>Kirim Bukti {isQris ? 'Pembayaran' : 'Transfer'}</>}
                </button>
                <p className="dn-form-hint mt-1">Format gambar (JPG/PNG), maks 4MB. Bisa juga diunggah nanti lewat menu Riwayat Donasi.</p>
              </>
            )}
          </div>

          <div className="dr-privacy-note" style={{ marginTop: '1rem', textAlign: 'left' }}>
            <i className="bi bi-info-circle-fill me-2"></i>
            <span>
              {isQris ? 'Bayar' : 'Transfer'} <strong>sesuai nominal di atas</strong>. Status donasi <strong>menunggu pembayaran</strong> dan akan diperbarui setelah bukti Anda diverifikasi admin.
            </span>
          </div>

          <div className="d-flex gap-3 justify-content-center flex-wrap mt-3">
            <Link to="/profil" className="btn btn-danger rounded-pill px-4">Cek Status di Riwayat</Link>
            <button className="btn btn-outline-secondary rounded-pill px-4" onClick={() => { setSent(false); setAmount(null); setCustom(''); setForm({ anonim: false, pesan: '' }); setDonasiId(null); setBuktiFile(null); setUploaded(false); setUploadErr('') }}>Donasi Lagi</button>
          </div>
        </div>
      </div>
      <CTA />
    </>
  )

  return (
    <>
      <Breadcrumb items={[{ label: 'Donasi' }]} />

      <PageHero
        label="DONASI ONLINE"
        title={<>Berbagi Kebaikan,<br /><span className="text-danger">Ubah Kehidupan</span></>}
        desc="Pilih kegiatan yang ingin Anda dukung dan tentukan tujuan donasi Anda."
        image={false}
      />

      <section className="dn-section">
        <div className="container">
          <div className="row g-4 align-items-start">

            {/* Left: form */}
            <div className="col-lg-8">

              {/* Step 1: Kegiatan + Tujuan */}
              <div className="dn-card mb-4">
                <div className="dn-card-header">
                  <span className="dn-step-num">1</span>
                  <h3 className="dn-step-title">Kegiatan &amp; Tujuan Donasi</h3>
                </div>

                <label className="kt-label">Donasi untuk Kegiatan <span className="text-danger">*</span></label>
                <select required className="kt-input kt-select-input mb-3" value={kegiatanId} onChange={e => setKegiatanId(e.target.value)} disabled={kegiatanDonasi.length === 0}>
                  <option value="">{kegiatanDonasi.length === 0 ? 'Belum ada kegiatan yang membuka donasi' : 'Pilih kegiatan...'}</option>
                  {kegiatanDonasi.map(k => (
                    <option key={k.id} value={k.id}>{k.judul} — {k.lokasi}</option>
                  ))}
                </select>

                <label className="kt-label">Tujuan Donasi <span className="text-danger">*</span> <span className="text-muted fw-normal">(untuk apa)</span></label>
                <textarea
                  required
                  rows={2}
                  className="kt-input kt-textarea"
                  placeholder="Tuliskan tujuan donasi Anda. Contoh: Membantu korban bencana banjir di Semarang"
                  value={tujuan}
                  onChange={e => setTujuan(e.target.value)}
                />

                {selectedKeg ? (
                  <div className="dn-keg-preview mt-3">
                    <img src={selectedKeg.img} alt={selectedKeg.judul} />
                    <div>
                      <p className="dn-keg-title">{selectedKeg.judul}</p>
                      <p className="dn-keg-meta">
                        <i className="bi bi-calendar3 me-1"></i>{fmtTanggal(selectedKeg.tanggal)}
                        <span className="mx-2">·</span>
                        <i className="bi bi-geo-alt-fill me-1"></i>{selectedKeg.lokasi}
                      </p>
                      <p className="dn-keg-desc">{selectedKeg.deskripsi}</p>
                    </div>
                  </div>
                ) : (
                  <p className="dn-form-hint mt-2">
                    <i className="bi bi-info-circle me-1"></i>
                    {kegiatanDonasi.length === 0
                      ? 'Saat ini belum ada kegiatan yang membuka donasi. Silakan cek kembali nanti.'
                      : 'Pilih salah satu kegiatan di atas untuk disumbang.'}
                  </p>
                )}
              </div>

              {/* Step 2: Amount */}
              <div className="dn-card mb-4">
                <div className="dn-card-header">
                  <span className="dn-step-num">2</span>
                  <h3 className="dn-step-title">Jumlah Donasi</h3>
                </div>
                <div className="dn-amounts-grid">
                  {presetAmounts.map(n => (
                    <button key={n} type="button" className={`dn-amount-btn${amount === n ? ' active' : ''}`} onClick={() => { setAmount(n); setCustom('') }}>
                      {fmt(n)}
                    </button>
                  ))}
                </div>
                <div className="dn-custom-wrap">
                  <span className="dn-custom-prefix">Rp</span>
                  <input type="text" className="dn-custom-input" placeholder="Atau masukkan jumlah lain..." value={custom} onChange={e => { setCustom(e.target.value); setAmount(null) }} />
                </div>
                <p className="dn-form-hint mt-2"><i className="bi bi-infinity me-1"></i>Nominal donasi bebas — tidak ada batas maksimal.</p>
              </div>

              {/* Step 3: Method */}
              <div className="dn-card mb-4">
                <div className="dn-card-header">
                  <span className="dn-step-num">3</span>
                  <h3 className="dn-step-title">Metode Pembayaran</h3>
                </div>
                <div className="dn-methods-grid">
                  {payMethods.map(m => (
                    <button key={m.id} type="button" className={`dn-method-card${method === m.id ? ' active' : ''}`} onClick={() => setMethod(m.id)}>
                      <i className={`bi ${m.icon} dn-method-icon`}></i>
                      <span className="dn-method-label">{m.label}</span>
                      <span className="dn-method-desc">{m.desc}</span>
                    </button>
                  ))}
                </div>
                {isQris ? (
                  <div className="dn-keg-preview mt-3" style={{ background: '#fafafa', borderColor: '#eee' }}>
                    <div style={{ width: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFF3E6', borderRadius: 10, flexShrink: 0 }}>
                      <i className="bi bi-qr-code-scan" style={{ fontSize: '1.8rem', color: '#d97000' }}></i>
                    </div>
                    <div>
                      <p className="dn-keg-title">Bayar dengan scan QRIS</p>
                      <p className="dn-keg-meta mb-0"><strong>{QRIS.nama}</strong> · NMID {QRIS.nmid}</p>
                      <p className="dn-keg-meta mb-0">Bisa dari GoPay, OVO, DANA, ShopeePay, LinkAja, atau m-banking apa pun.</p>
                      <p className="dn-keg-desc mb-0">Kode QR akan ditampilkan setelah Anda klik Donasikan. Nominal diketik sendiri di aplikasi.</p>
                    </div>
                  </div>
                ) : (
                  <div className="dn-keg-preview mt-3" style={{ background: '#fafafa', borderColor: '#eee' }}>
                    <div style={{ width: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFF3E6', borderRadius: 10, flexShrink: 0 }}>
                      <i className="bi bi-bank2" style={{ fontSize: '1.8rem', color: '#d97000' }}></i>
                    </div>
                    <div>
                      <p className="dn-keg-title">Transfer ke rekening Karinakas</p>
                      <p className="dn-keg-meta mb-0">Bank <strong>{BANK.bank}</strong> · <strong>{BANK.norek}</strong></p>
                      <p className="dn-keg-meta mb-0">a.n. {BANK.nama}</p>
                      <p className="dn-keg-desc mb-0">Nomor rekening lengkap & nominal akan ditampilkan setelah Anda klik Donasikan.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Step 4: Donor info */}
              <div className="dn-card mb-4">
                <div className="dn-card-header">
                  <span className="dn-step-num">4</span>
                  <h3 className="dn-step-title">Data Donatur</h3>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="kt-label">Nama Donatur</label>
                      <div className="lg-input-wrap">
                        <i className="bi bi-person-fill lg-iicon"></i>
                        <input type="text" className="lg-input" value={user?.name || ''} readOnly style={{ background: '#f5f5f5' }} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label className="kt-label">Email</label>
                      <div className="lg-input-wrap">
                        <i className="bi bi-envelope-fill lg-iicon"></i>
                        <input type="email" className="lg-input" value={user?.email || ''} readOnly style={{ background: '#f5f5f5' }} />
                      </div>
                    </div>
                    <div className="col-12">
                      <p className="dn-form-hint" style={{ marginTop: '-0.25rem' }}><i className="bi bi-info-circle me-1"></i>Donasi tercatat atas nama akun Anda.</p>
                    </div>
                    <div className="col-12">
                      <label className="kt-label">Pesan Dukungan <span className="text-muted fw-normal">(opsional)</span></label>
                      <textarea rows={3} className="kt-input kt-textarea" placeholder="Tulis pesan semangat Anda..." value={form.pesan} onChange={e => setForm(f => ({ ...f, pesan: e.target.value }))} />
                    </div>
                    <div className="col-12">
                      <label className="lg-check-label">
                        <input type="checkbox" className="lg-checkbox" checked={form.anonim} onChange={e => setForm(f => ({ ...f, anonim: e.target.checked }))} />
                        <span className={`lg-checkmark${form.anonim ? ' checked' : ''}`}>{form.anonim && <i className="bi bi-check2"></i>}</span>
                        <span>Tampilkan sebagai anonim</span>
                      </label>
                    </div>
                  </div>

                  {error && <div className="lg-error mt-3"><i className="bi bi-exclamation-circle-fill me-2"></i>{error}</div>}

                  <button type="submit" className="dn-submit-btn mt-4" disabled={!kegiatanId || !tujuan || !finalAmount || !method || sending}>
                    {sending ? <><span className="lg-spinner" /> Mengirim...</> : <>
                      <i className="bi bi-heart-fill me-2"></i>
                      Donasikan {finalAmount ? fmt(finalAmount) : 'Sekarang'}
                      <i className="bi bi-arrow-right-circle-fill ms-2"></i>
                    </>}
                  </button>
                  {(!kegiatanId || !tujuan || !finalAmount || !method) && <p className="dn-form-hint">Lengkapi kegiatan, tujuan, jumlah, dan metode pembayaran dulu.</p>}
                </form>
              </div>
            </div>

            {/* Right: summary */}
            <div className="col-lg-4">
              <div className="dn-summary-card">
                <h4 className="dn-summary-title"><i className="bi bi-receipt me-2 text-danger"></i>Ringkasan</h4>
                <div className="dn-summary-list">
                  <div className="dn-summary-row">
                    <span className="dn-summary-key">Kegiatan</span>
                    <span className="dn-summary-val">{selectedKeg ? selectedKeg.judul : <span className="text-muted">Belum dipilih</span>}</span>
                  </div>
                  <div className="dn-summary-row">
                    <span className="dn-summary-key">Tujuan</span>
                    <span className="dn-summary-val">{tujuan || <span className="text-muted">Belum dipilih</span>}</span>
                  </div>
                  <div className="dn-summary-row">
                    <span className="dn-summary-key">Nominal</span>
                    <span className="dn-summary-val">{finalAmount ? fmt(finalAmount) : <span className="text-muted">Belum dipilih</span>}</span>
                  </div>
                  <div className="dn-summary-row">
                    <span className="dn-summary-key">Metode</span>
                    <span className="dn-summary-val">{selectedMethod?.label ?? <span className="text-muted">Belum dipilih</span>}</span>
                  </div>
                  <div className="dn-summary-divider" />
                  <div className="dn-summary-row dn-summary-total">
                    <span>Total</span>
                    <span className="dn-total-value">{finalAmount ? fmt(finalAmount) : 'Rp 0'}</span>
                  </div>
                </div>

                <div className="dn-trust-badges">
                  {[
                    ['bi-shield-check-fill', 'Transaksi Aman'],
                    ['bi-patch-check-fill',  'Terverifikasi'],
                    ['bi-eye-slash-fill',    'Data Terlindungi'],
                  ].map(([icon, label]) => (
                    <div key={label} className="dn-trust-item">
                      <i className={`bi ${icon} text-danger`}></i>
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="dn-impact-card">
                <h5 className="dn-impact-title">Dampak Donasi Anda</h5>
                {[
                  ['Rp 50.000',    '5 anak dapat akses buku pelajaran'],
                  ['Rp 100.000',   '2 keluarga terbantu sembako darurat'],
                  ['Rp 500.000',   '10 orang mendapat layanan kesehatan gratis'],
                  ['Rp 1.000.000', '1 beasiswa anak kurang mampu selama 1 bulan'],
                ].map(([nom, desc]) => (
                  <div key={nom} className="dn-impact-item">
                    <span className="dn-impact-nom">{nom}</span>
                    <span className="dn-impact-desc">{desc}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <CTA />
    </>
  )
}

export default Donasi
