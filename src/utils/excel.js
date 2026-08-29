/**
 * Export tabel rapi ke Excel untuk panel admin.
 *
 * Berkas dibuat sebagai workbook HTML ber-ekstensi .xls — cara ini dipakai
 * karena tidak butuh pustaka tambahan, tapi tetap bisa mengatur hal-hal yang
 * TIDAK mungkin dilakukan CSV:
 *   - lebar kolom (jadi teks tidak terpotong seperti di CSV)
 *   - header tebal, berwarna, dan dibekukan saat digulir
 *   - format angka ribuan (1.000.000) yang tetap bisa dijumlah
 *   - format teks paksa untuk No. KTP & No. HP, supaya 16 digit tidak berubah
 *     jadi 1,23457E+15 dan angka 0 di depan tidak hilang
 *
 * Catatan: saat dibuka, Excel bisa menampilkan peringatan "format dan ekstensi
 * tidak cocok" — tekan "Yes"/"Ya", berkasnya aman dan tampil normal.
 */

const esc = (v) => String(v ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')

// Format sel khas Excel (dibaca dari HTML oleh Excel)
const FMT = {
  text:   'mso-number-format:"\\@";',            // paksa teks (KTP, no. HP, kode)
  number: 'mso-number-format:"\\#\\,\\#\\#0";',  // 1.000.000, tetap angka
}

const BRAND = '#C0392B'

// Perkiraan lebar 1 karakter Calibri 11pt, dipakai untuk auto-fit kolom
const PX_PER_CHAR = 7.2
const PADDING_PX  = 20

/**
 * Hitung lebar kolom dari isi terpanjang (auto-fit), lalu batasi dengan min/max.
 * Kolom yang isinya melebihi batas tidak dipotong — teksnya dibungkus ke bawah.
 */
function lebarKolom(col, idx, rows) {
  if (col.width) return col.width // lebar dipaksa manual

  const isi = [col.header, ...rows.map(r => {
    const v = r[idx]
    // angka ditampilkan dengan pemisah ribuan, jadi hitung panjang versi terformatnya
    return typeof v === 'number' ? v.toLocaleString('id-ID') : String(v ?? '')
  })]

  // untuk teks panjang, cukup ukur baris terpanjang per kata agar tidak kebablasan
  const maks = Math.max(...isi.map(s => s.length))
  const px   = Math.round(maks * PX_PER_CHAR) + PADDING_PX
  return Math.min(Math.max(px, col.min ?? 55), col.max ?? 300)
}

/**
 * columns: [{ header, align, format: 'text'|'number', colors, min, max, width }]
 *   colors → peta { 'Berhasil': '#1a6b3a', ... } untuk mewarnai isi sel
 *   min/max → batas auto-fit (px). width → paksa lebar tetap.
 * rows:    array of array, urutannya mengikuti columns
 * meta:    [[label, nilai]] — ditulis di atas tabel
 * ringkasan / catatan: [[label, nilai]] — ditulis di bawah tabel
 */
export function buildExcelHtml({ judul, sheet = 'Rekapan', meta = [], columns, rows, ringkasan = [], catatan = [] }) {
  const lebar   = columns.length
  const lebarKol = columns.map((c, i) => lebarKolom(c, i, rows))

  // Baris ke berapa header tabel berada (dipakai untuk membekukan panel)
  const barisHeader = 1 + meta.length + 1

  // Atribut style memakai kutip TUNGGAL: isinya mengandung kutip ganda
  // (mso-number-format:"\@"), jadi kalau atributnya juga kutip ganda HTML-nya rusak.
  const sel = (isi, style = '') => `<td style='${style}'>${esc(isi)}</td>`

  const barisData = rows.map((r, i) => {
    const bg = i % 2 ? 'background:#FAFAFA;' : ''
    const td = columns.map((c, j) => {
      const v = r[j]
      const angka = c.format === 'number'
      const style = [
        'border:0.5pt solid #DDDDDD;',
        'padding:3px 6px;',
        bg,
        angka ? FMT.number : c.format === 'text' ? FMT.text : '',
        `text-align:${c.align || (angka ? 'right' : 'left')};`,
        // Semua sel membungkus teks: kalau isinya melebihi lebar kolom, ia turun
        // ke baris berikutnya — bukan tertutup kolom sebelahnya.
        'white-space:normal;vertical-align:top;',
        c.colors?.[v] ? `color:${c.colors[v]};font-weight:bold;` : '',
      ].join('')
      return sel(v, style)
    }).join('')
    return `<tr>${td}</tr>`
  }).join('')

  // Label meta/ringkasan digabung beberapa kolom, karena kolom pertama
  // (mis. "No") sengaja dibuat sempit oleh auto-fit.
  const spanLabelMeta = Math.min(2, Math.max(1, lebar - 1))
  const spanLabel     = Math.min(3, Math.max(1, lebar - 1))
  const spanNilai     = Math.min(2, lebar - spanLabel)
  const sisaKolom     = lebar - spanLabel - spanNilai

  const barisMeta = meta.map(([k, v]) => `
    <tr>
      <td colspan="${spanLabelMeta}" style='font-weight:bold;color:#555555;white-space:normal;vertical-align:top;'>${esc(k)}</td>
      <td colspan="${lebar - spanLabelMeta}" style='white-space:normal;vertical-align:top;'>${esc(v)}</td>
    </tr>`).join('')

  const blok = (nama, isi) => isi.length ? `
    <tr><td colspan="${lebar}" style='height:8px;'></td></tr>
    <tr><td colspan="${lebar}" style='font-weight:bold;background:#F3F4F6;border:0.5pt solid #DDDDDD;padding:4px 6px;'>${esc(nama)}</td></tr>
    ${isi.map(([k, v]) => `
      <tr>
        <td colspan="${spanLabel}" style='border:0.5pt solid #EEEEEE;padding:3px 6px;white-space:normal;vertical-align:top;'>${esc(k)}</td>
        <td colspan="${spanNilai}" style='border:0.5pt solid #EEEEEE;padding:3px 6px;white-space:normal;vertical-align:top;${typeof v === 'number' ? FMT.number + 'text-align:right;' : ''}'>${esc(v)}</td>
        ${sisaKolom > 0 ? `<td colspan="${sisaKolom}"></td>` : ''}
      </tr>`).join('')}` : ''

  return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="utf-8">
<!--[if gte mso 9]><xml>
<x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
<x:Name>${esc(sheet)}</x:Name>
<x:WorksheetOptions>
<x:FreezePanes/><x:SplitHorizontal>${barisHeader}</x:SplitHorizontal>
<x:TopRowBottomPane>${barisHeader}</x:TopRowBottomPane><x:ActivePane>2</x:ActivePane>
</x:WorksheetOptions>
</x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook>
</xml><![endif]-->
<style>td{font-family:Calibri,Arial,sans-serif;font-size:11pt;}</style>
</head>
<body>
<table border="0" cellspacing="0">
  <colgroup>${lebarKol.map(w => `<col width="${w}" style='width:${w}px'>`).join('')}</colgroup>
  <tr>
    <td colspan="${lebar}" style='background:${BRAND};color:#FFFFFF;font-size:14pt;font-weight:bold;height:26px;padding:4px 6px;'>${esc(judul)}</td>
  </tr>
  ${barisMeta}
  <tr><td colspan="${lebar}" style='height:8px;'></td></tr>
  <tr>${columns.map(c => `<td style='background:${BRAND};color:#FFFFFF;font-weight:bold;border:0.5pt solid #FFFFFF;padding:4px 6px;text-align:center;white-space:normal;'>${esc(c.header)}</td>`).join('')}</tr>
  ${barisData}
  ${blok('RINGKASAN', ringkasan)}
  ${blok('CATATAN', catatan)}
</table>
</body></html>`
}

/** Nama berkas dengan tanggal hari ini: Rekapan-Donasi-2026-08-08.xls */
export function excelFilename(nama) {
  return `${nama}-${new Date().toISOString().slice(0, 10)}.xls`
}

/** Bangun berkas lalu picu unduhan di browser. */
export function downloadExcel(filename, opsi) {
  const blob = new Blob(['﻿' + buildExcelHtml(opsi)], { type: 'application/vnd.ms-excel;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename.endsWith('.xls') ? filename : `${filename}.xls`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/** Tanggal Indonesia untuk baris "Tanggal export". */
export const tanggalHariIni = () =>
  new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
