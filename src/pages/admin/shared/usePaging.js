import { useMemo, useState } from 'react'

export const PAGE_SIZES = [10, 20, 50]

const toTime = (v) => {
  if (!v) return null
  const t = new Date(v).getTime()
  return Number.isNaN(t) ? null : t
}

/**
 * Paging + urutan terbaru/terlama untuk tabel admin (sisi klien).
 * items    : daftar yang sudah disaring (hasil `filtered`).
 * getDate  : fungsi (item) => tanggal (ISO/Date) sebagai dasar urutan; opsional.
 *            Tanpa getDate atau bila tanggal kosong, dipakai urutan dari server
 *            (server mengirim data terbaru lebih dulu).
 * resetKey : string; saat berubah (mis. kata cari/filter) halaman kembali ke 1.
 *
 * Paging hanya memengaruhi tampilan. Ekspor rekap tetap memakai seluruh `items`.
 */
export default function usePaging(items, getDate, resetKey = '', initialSize = 10) {
  const [page, setPage]         = useState(1)
  const [pageSize, setPageSize] = useState(initialSize)
  const [order, setOrder]       = useState('baru') // 'baru' | 'lama'

  // Kembali ke halaman 1 saat penyaring, urutan, atau ukuran halaman berubah
  // (disesuaikan saat render, bukan lewat efek, sesuai anjuran React)
  const kunci = `${resetKey}|${order}|${pageSize}`
  const [kunciLama, setKunciLama] = useState(kunci)
  if (kunci !== kunciLama) {
    setKunciLama(kunci)
    setPage(1)
  }

  const sorted = useMemo(() => {
    const arah = order === 'lama' ? 1 : -1
    return items
      .map((item, i) => ({ item, i, t: getDate ? toTime(getDate(item)) : null }))
      .sort((a, b) => {
        if (a.t !== b.t) {
          // tanggal kosong dianggap paling baru
          const ta = a.t == null ? Infinity : a.t
          const tb = b.t == null ? Infinity : b.t
          if (ta !== tb) return (ta < tb ? -1 : 1) * arah
        }
        // urutan sama: ikuti urutan server (terbaru lebih dulu), dibalik untuk "terlama"
        return order === 'lama' ? b.i - a.i : a.i - b.i
      })
      .map(x => x.item)
  }, [items, getDate, order])

  const total      = sorted.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage   = Math.min(page, totalPages)
  const start      = (safePage - 1) * pageSize
  const pageItems  = sorted.slice(start, start + pageSize)

  return {
    pageItems,
    page: safePage,
    setPage,
    pageSize,
    setPageSize,
    order,
    setOrder,
    total,
    totalPages,
    from: total === 0 ? 0 : start + 1,
    to: Math.min(total, start + pageSize),
  }
}
