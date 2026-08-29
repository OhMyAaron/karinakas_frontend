/** Logo Yayasan Karinakas.
 *  `bleed` melebihkan gambar agar ruang putih bawaan berkas terpangkas oleh
 *  wadah bundar. Berkas logo yang sudah rapat tepinya cukup memakai bleed 100. */
function KarinakasLogo({ size = 56, bleed = 142, className = '' }) {
  return (
    <span
      className={className}
      style={{
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: '50%',
        flexShrink: 0,
      }}
    >
      <img
        src="/karinakas-logo.png"
        alt="Logo Yayasan Karinakas"
        style={{ width: `${bleed}%`, height: `${bleed}%`, objectFit: 'contain' }}
      />
    </span>
  )
}

export default KarinakasLogo
