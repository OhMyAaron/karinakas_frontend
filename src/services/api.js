// ════════════════════════════════════════════════════════════
//  Klien API — pembungkus fetch ke backend Laravel (Sanctum token).
//  Semua panggilan ke backend lewat sini.
// ════════════════════════════════════════════════════════════

const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/v1'

const TOKEN_KEY = 'kk_token'

export const getToken = () => localStorage.getItem(TOKEN_KEY) || ''
export const setToken = (t) => {
  if (t) localStorage.setItem(TOKEN_KEY, t)
  else localStorage.removeItem(TOKEN_KEY)
}

async function request(method, path, body) {
  const headers = { Accept: 'application/json' }
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`

  const opts = { method, headers }
  if (body !== undefined) {
    headers['Content-Type'] = 'application/json'
    opts.body = JSON.stringify(body)
  }

  let res
  try {
    res = await fetch(BASE_URL + path, opts)
  } catch {
    throw { network: true, message: 'Tidak dapat terhubung ke server. Pastikan backend (php artisan serve) berjalan.' }
  }

  let data = null
  try { data = await res.json() } catch { /* respons bukan JSON */ }

  if (!res.ok) {
    // Ambil pesan error pertama yang berguna
    let msg = data?.message
    if (data?.errors) {
      const first = Object.values(data.errors)[0]
      if (Array.isArray(first) && first[0]) msg = first[0]
    }
    throw { status: res.status, message: msg || `Terjadi kesalahan (${res.status})`, errors: data?.errors }
  }

  return data
}

// Upload file (multipart/form-data). Jangan set Content-Type manual.
async function upload(path, formData) {
  const headers = { Accept: 'application/json' }
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`

  let res
  try {
    res = await fetch(BASE_URL + path, { method: 'POST', headers, body: formData })
  } catch {
    throw { network: true, message: 'Tidak dapat terhubung ke server. Pastikan backend berjalan.' }
  }

  let data = null
  try { data = await res.json() } catch { /* bukan JSON */ }

  if (!res.ok) {
    let msg = data?.message
    if (data?.errors) {
      const first = Object.values(data.errors)[0]
      if (Array.isArray(first) && first[0]) msg = first[0]
    }
    throw { status: res.status, message: msg || `Terjadi kesalahan (${res.status})`, errors: data?.errors }
  }
  return data
}

export const api = {
  get:    (path)        => request('GET', path),
  post:   (path, body)  => request('POST', path, body),
  put:    (path, body)  => request('PUT', path, body),
  patch:  (path, body)  => request('PATCH', path, body),
  del:    (path)        => request('DELETE', path),
  upload: (path, fd)    => upload(path, fd),
}
