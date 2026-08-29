import { useState, useEffect, useCallback } from 'react'

/**
 * Hook data async untuk satu resource API (pengganti useCrud localStorage).
 * service: objek dengan list/create/update/remove.
 * Setelah create/update/remove, list otomatis di-reload.
 */
export default function useResource(service, params) {
  const [items,   setItems]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')

  const paramKey = JSON.stringify(params || {})

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await service.list(params)
      setItems(data)
    } catch (e) {
      setError(e.message || 'Gagal memuat data dari server.')
      setItems([])
    } finally {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service, paramKey])

  useEffect(() => { load() }, [load])

  const add    = async (data)     => { await service.create(data); await load() }
  const update = async (id, data) => { await service.update(id, data); await load() }
  const remove = async (id)       => { await service.remove(id); await load() }

  return { items, loading, error, reload: load, add, update, remove }
}
