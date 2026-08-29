import { useState, useEffect } from 'react'

/**
 * Hook CRUD sederhana berbasis localStorage.
 * Dipakai semua section admin agar pola konsisten (Module 4–10).
 *
 * @param {string} storageKey  key localStorage
 * @param {Array}  seed        data awal jika belum ada di localStorage
 */
export default function useCrud(storageKey, seed) {
  const [items, setItems] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey))
      return Array.isArray(saved) ? saved : seed
    } catch {
      return seed
    }
  })

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items))
  }, [storageKey, items])

  const add    = (data)          => setItems(prev => [{ id: Date.now(), ...data }, ...prev])
  const update = (id, data)      => setItems(prev => prev.map(i => (i.id === id ? { ...i, ...data } : i)))
  const remove = (id)            => setItems(prev => prev.filter(i => i.id !== id))
  const patch  = (id, partial)   => setItems(prev => prev.map(i => (i.id === id ? { ...i, ...partial } : i)))

  return { items, add, update, remove, patch, setItems }
}
