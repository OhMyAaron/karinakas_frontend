import { PAGE_SIZES } from './usePaging'

// Urutan data: Terbaru / Terlama (diletakkan di baris filter)
export function AdminSort({ pg }) {
  return (
    <select
      className="ad-filter-select"
      value={pg.order}
      onChange={e => pg.setOrder(e.target.value)}
      aria-label="Urutkan data"
    >
      <option value="baru">Terbaru</option>
      <option value="lama">Terlama</option>
    </select>
  )
}

// Nomor halaman dengan elipsis: 1 … 4 5 6 … 12
function daftarHalaman(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const set = new Set([1, total, current - 1, current, current + 1])
  const nums = [...set].filter(n => n >= 1 && n <= total).sort((a, b) => a - b)
  const out = []
  nums.forEach((n, i) => {
    if (i > 0 && n - nums[i - 1] > 1) out.push('…')
    out.push(n)
  })
  return out
}

// Pengatur halaman (diletakkan di bawah tabel/daftar)
export function AdminPager({ pg, satuan = 'data' }) {
  if (pg.total === 0) return null
  const halaman = daftarHalaman(pg.page, pg.totalPages)
  return (
    <div className="ad-pager">
      <span className="ad-pager-info">
        Menampilkan {pg.from}–{pg.to} dari {pg.total} {satuan}
      </span>
      <div className="ad-pager-nav">
        <button
          type="button"
          className="ad-pager-btn"
          onClick={() => pg.setPage(pg.page - 1)}
          disabled={pg.page <= 1}
          aria-label="Halaman sebelumnya"
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        {halaman.map((h, i) => h === '…'
          ? <span key={`e${i}`} className="ad-pager-gap">…</span>
          : (
            <button
              key={h}
              type="button"
              className={`ad-pager-btn${h === pg.page ? ' active' : ''}`}
              onClick={() => pg.setPage(h)}
              aria-current={h === pg.page ? 'page' : undefined}
            >{h}</button>
          ))}
        <button
          type="button"
          className="ad-pager-btn"
          onClick={() => pg.setPage(pg.page + 1)}
          disabled={pg.page >= pg.totalPages}
          aria-label="Halaman berikutnya"
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
      <label className="ad-pager-size">
        Tampilkan
        <select
          className="ad-filter-select"
          value={pg.pageSize}
          onChange={e => pg.setPageSize(Number(e.target.value))}
        >
          {[...new Set([...PAGE_SIZES, pg.pageSize])].sort((a, b) => a - b).map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        per halaman
      </label>
    </div>
  )
}
