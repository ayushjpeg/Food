const DEFAULT_BASE_URL = 'https://common-backend.ayux.in/api'
const stripTrailingSlash = (value) => value.replace(/\/$/, '')

const API_BASE_URL = stripTrailingSlash(import.meta.env.VITE_API_BASE_URL || DEFAULT_BASE_URL)
const API_ORIGIN = (() => {
  try {
    return new URL(API_BASE_URL).origin
  } catch (err) {
    return ''
  }
})()
const DEFAULT_API_KEY = 'Iloveanna'
const API_KEY = (() => {
  if (import.meta.env?.VITE_API_KEY) return import.meta.env.VITE_API_KEY
  if (typeof window !== 'undefined' && window.__FOOD_API_KEY__) {
    return window.__FOOD_API_KEY__
  }
  return DEFAULT_API_KEY
})()

const isDataUrl = (value = '') => value.startsWith('data:')
const cleanObject = (input) => Object.fromEntries(Object.entries(input || {}).filter(([, value]) => value !== undefined))

const buildHeaders = (body, extraHeaders = {}) => {
  const headers = new Headers(extraHeaders)
  if (API_KEY) headers.set('X-API-Key', API_KEY)
  if (body && !(body instanceof FormData)) headers.set('Content-Type', 'application/json')
  return headers
}

const request = async (path, { method = 'GET', body, headers = {} } = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    body,
    headers: buildHeaders(body, headers),
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(detail || `Request failed with status ${response.status}`)
  }

  if (response.status === 204) return null
  const text = await response.text()
  return text ? JSON.parse(text) : null
}

const mapIngredients = (ingredients = []) => ingredients.map((item) => ({
  id: item.id,
  name: item.name,
  amount: item.amount,
}))

const normalizeMediaUrl = (url = '') => {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url
  if (API_ORIGIN && url.startsWith('/')) return `${API_ORIGIN}${url}`
  return url
}

const fromApiDish = (payload) => {
  const photos = (payload.photos || []).map((photo) => ({
    id: photo.id,
    url: normalizeMediaUrl(photo.url || photo.file_path),
    caption: photo.caption || '',
    recordedAt: photo.recorded_at || (photo.uploaded_at ? photo.uploaded_at.slice(0, 10) : ''),
  }))
  const cover = normalizeMediaUrl(payload.image_url || (photos.length ? photos[photos.length - 1].url : ''))
  return {
    id: payload.id,
    name: payload.name,
    meal: payload.meal,
    recipe: payload.recipe || '',
    notes: payload.notes || '',
    image: cover,
    lastMade: payload.last_made || '',
    ingredients: mapIngredients(payload.ingredients || []),
    photos,
  }
}

const toApiDishPayload = (dish, { partial = false } = {}) => {
  const payload = {
    name: dish.name,
    meal: dish.meal,
    recipe: dish.recipe,
    notes: dish.notes,
    last_made: dish.lastMade,
    ingredients: Array.isArray(dish.ingredients) ? mapIngredients(dish.ingredients) : undefined,
  }

  if (dish.image) {
    if (isDataUrl(dish.image)) payload.image_data_url = dish.image
    else payload.image_url = dish.image
  }

  return partial ? cleanObject(payload) : payload
}

const toPhotoPayload = (entry) => {
  const payload = {
    recorded_at: entry.recordedAt || null,
    caption: entry.caption || '',
  }
  if (isDataUrl(entry.url)) payload.image_data_url = entry.url
  else payload.image_url = entry.url
  return payload
}

export const fetchDishes = async () => {
  const data = await request('/food/meals')
  return data.map(fromApiDish)
}

export const createDish = async (dish) => {
  const payload = toApiDishPayload(dish)
  const data = await request('/food/meals', { method: 'POST', body: JSON.stringify(payload) })
  return fromApiDish(data)
}

export const updateDish = async (dish) => {
  const payload = toApiDishPayload(dish, { partial: true })
  const data = await request(`/food/meals/${dish.id}`, { method: 'PATCH', body: JSON.stringify(payload) })
  return fromApiDish(data)
}

export const patchDish = async (dishId, patch) => {
  const payload = toApiDishPayload(patch, { partial: true })
  const data = await request(`/food/meals/${dishId}`, { method: 'PATCH', body: JSON.stringify(payload) })
  return fromApiDish(data)
}

export const deleteDish = async (dishId) => {
  await request(`/food/meals/${dishId}`, { method: 'DELETE' })
}

export const addDishPhoto = async (dishId, entry) => {
  const payload = toPhotoPayload(entry)
  const data = await request(`/food/meals/${dishId}/photos`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  return fromApiDish(data)
}
