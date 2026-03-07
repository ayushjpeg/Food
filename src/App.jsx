import { useEffect, useMemo, useState } from 'react'
import { AddDishForm } from './components/AddDishForm'
import { MealColumn } from './components/MealColumn'
import { LogCookForm } from './components/LogCookForm'
import { PhotoGallery } from './components/PhotoGallery'
import { meals } from './data/initialDishes'
import { addDishPhoto, createDish, fetchDishes, patchDish, updateDish } from './api/foodApi'

const ensurePhotosArray = (dish) => {
  const photos = Array.isArray(dish.photos) ? dish.photos : []
  if (photos.length) return dish
  if (!dish.image) return { ...dish, photos: [] }
  return {
    ...dish,
    photos: [
      {
        id: `photo-${dish.id}`,
        url: dish.image,
        recordedAt: dish.lastMade ?? null,
      },
    ],
  }
}

function App() {
  const [dishes, setDishes] = useState([])
  const [filter, setFilter] = useState('All')
  const [drawerState, setDrawerState] = useState({ mode: null, dish: null })
  const [logDish, setLogDish] = useState(null)
  const [galleryDish, setGalleryDish] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState(null)

  const applyUpdate = (updater) => {
    setDishes((prev) => {
      const normalizedPrev = prev.map(ensurePhotosArray)
      const next = typeof updater === 'function' ? updater(normalizedPrev) : updater
      return next.map(ensurePhotosArray)
    })
  }

  const loadDishes = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchDishes()
      setDishes(data.map(ensurePhotosArray))
    } catch (err) {
      setError(err.message || 'Unable to load dishes')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadDishes()
  }, [])

  const normalizedDishes = useMemo(() => dishes.map(ensurePhotosArray), [dishes])

  const grouped = useMemo(() => {
    const base = meals.reduce((acc, meal) => ({ ...acc, [meal]: [] }), {})
    const source = filter === 'All' ? normalizedDishes : normalizedDishes.filter((dish) => dish.meal === filter)
    source.forEach((dish) => {
      base[dish.meal] = [...(base[dish.meal] ?? []), dish]
    })
    return base
  }, [normalizedDishes, filter])

  const stats = useMemo(() => {
    const perMeal = meals.map((meal) => ({
      meal,
      count: normalizedDishes.filter((dish) => dish.meal === meal).length,
    }))
    return { total: normalizedDishes.length, perMeal }
  }, [normalizedDishes])

  const handleSaveDish = async (dish) => {
    setIsSaving(true)
    setError(null)
    try {
      if (drawerState.mode === 'edit' && drawerState.dish) {
        const updated = await updateDish({ ...dish, id: drawerState.dish.id })
        applyUpdate((prev) => prev.map((item) => (item.id === updated.id ? updated : item)))
      } else {
        const created = await createDish(dish)
        applyUpdate((prev) => [created, ...prev])
      }
      setDrawerState({ mode: null, dish: null })
    } catch (err) {
      setError(err.message || 'Unable to save dish')
    } finally {
      setIsSaving(false)
    }
  }

  const openCreateDrawer = () => setDrawerState({ mode: 'create', dish: null })
  const openEditDrawer = (dish) => setDrawerState({ mode: 'edit', dish })
  const closeDrawer = () => setDrawerState({ mode: null, dish: null })

  const isDrawerOpen = drawerState.mode !== null

  const openLogCook = (dish) => setLogDish(dish)
  const closeLogCook = () => setLogDish(null)

  const handleSaveCook = async ({ dishId, entry }) => {
    setIsSaving(true)
    setError(null)
    try {
      const updated = await addDishPhoto(dishId, entry)
      applyUpdate((prev) => prev.map((item) => (item.id === updated.id ? updated : item)))
      closeLogCook()
    } catch (err) {
      setError(err.message || 'Unable to log cook')
    } finally {
      setIsSaving(false)
    }
  }

  const handleUpdateLastMade = async (dishId, date) => {
    setIsSaving(true)
    setError(null)
    try {
      const updated = await patchDish(dishId, { lastMade: date })
      applyUpdate((prev) => prev.map((item) => (item.id === updated.id ? updated : item)))
    } catch (err) {
      setError(err.message || 'Unable to update date')
    } finally {
      setIsSaving(false)
    }
  }

  const openGallery = (dish) => setGalleryDish(dish)
  const closeGallery = () => setGalleryDish(null)

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Personal food studio</p>
          <h1>Plan, cook, and iterate on your favorite meals</h1>
          <p className="subtitle">
            Keep every recipe, shopping note, and plating snapshot in one snack-friendly workspace.
          </p>
        </div>
        <div className="hero__stats">
          <div>
            <span>Total dishes</span>
            <strong>{stats.total}</strong>
          </div>
          {stats.perMeal.map((stat) => (
            <div key={stat.meal}>
              <span>{stat.meal}</span>
              <strong>{stat.count}</strong>
            </div>
          ))}
        </div>
      </header>

      {error && <div className="field-error">{error}</div>}
      {isLoading && <p className="subtitle">Loading dishes...</p>}

      <section className="controls">
        <div className="chip-group">
          {['All', ...meals].map((meal) => (
            <button
              key={meal}
              className={meal === filter ? 'chip chip--active' : 'chip'}
              onClick={() => setFilter(meal)}
            >
              {meal}
            </button>
          ))}
        </div>
        <div className="control-actions">
          <button className="btn-secondary" onClick={() => setFilter('All')}>
            Reset filter
          </button>
          <button className="btn-primary" onClick={openCreateDrawer}>
            + Add dish
          </button>
        </div>
      </section>

      <main className="meal-layout">
        {meals.map((meal) => (
          <MealColumn
            key={meal}
            meal={meal}
            dishes={grouped[meal]}
            onEdit={openEditDrawer}
            onLogCook={openLogCook}
            onShowGallery={openGallery}
            onUpdateLastMade={handleUpdateLastMade}
          />
        ))}
      </main>

      {isDrawerOpen && (
        <AddDishForm
          mode={drawerState.mode}
          initialDish={drawerState.dish}
          onSave={handleSaveDish}
          onCancel={closeDrawer}
          isSaving={isSaving}
        />
      )}
      {logDish && <LogCookForm dish={logDish} onSave={handleSaveCook} onCancel={closeLogCook} isSaving={isSaving} />}
      {galleryDish && <PhotoGallery dish={galleryDish} onClose={closeGallery} />}
    </div>
  )
}

export default App
