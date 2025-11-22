import { nanoid } from 'nanoid'
import PropTypes from 'prop-types'
import { meals } from '../data/initialDishes'
import { useEffect, useState } from 'react'

const emptyIngredient = () => ({ id: nanoid(), name: '', amount: '' })

const createStateFromDish = (dish) => ({
  name: dish?.name ?? '',
  meal: dish?.meal ?? meals[0],
  recipe: dish?.recipe ?? '',
  notes: dish?.notes ?? '',
  image: dish?.image ?? '',
  lastMade: dish?.lastMade ?? '',
  ingredients:
    dish?.ingredients?.length
      ? dish.ingredients.map((ingredient) => ({
          ...ingredient,
          id: ingredient.id ?? nanoid(),
        }))
      : [emptyIngredient()],
})

export function AddDishForm({ mode = 'create', initialDish = null, onSave, onCancel }) {
  const [form, setForm] = useState(createStateFromDish(initialDish))
  const [imageError, setImageError] = useState(null)

  useEffect(() => {
    setForm(createStateFromDish(initialDish))
    setImageError(null)
  }, [initialDish, mode])

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const updateIngredient = (id, field, value) => {
    setForm((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, [field]: value } : ingredient
      ),
    }))
  }

  const addIngredient = () => {
    setForm((prev) => ({ ...prev, ingredients: [...prev.ingredients, emptyIngredient()] }))
  }

  const removeIngredient = (id) => {
    setForm((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((ingredient) => ingredient.id !== id),
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.name.trim()) return

    const cleanedIngredients = form.ingredients
      .filter((ingredient) => ingredient.name.trim() && ingredient.amount.trim())
      .map((ingredient) => ({ ...ingredient, id: ingredient.id ?? nanoid() }))

    const newDish = {
      id: mode === 'edit' && initialDish ? initialDish.id : nanoid(),
      ...form,
      ingredients: cleanedIngredients.length ? cleanedIngredients : [emptyIngredient()],
    }

    onSave(newDish)
    if (mode === 'create') {
      setForm(createStateFromDish(null))
    }
  }

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setImageError('Please upload a valid image file.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      updateField('image', typeof reader.result === 'string' ? reader.result : '')
      setImageError(null)
    }
    reader.onerror = () => setImageError('Unable to read that file. Please try another image.')
    reader.readAsDataURL(file)
  }

  const clearImage = () => {
    updateField('image', '')
  }

  return (
    <div className="drawer">
      <div className="drawer__panel">
        <header>
          <h2>{mode === 'edit' ? 'Edit dish' : 'Add a new dish'}</h2>
          <p>
            {mode === 'edit'
              ? 'Update notes, tweak quantities, or refresh the plating photo.'
              : 'Document ingredients, notes, and a photo reference for next time.'}
          </p>
        </header>
        <form onSubmit={handleSubmit} className="dish-form">
          <label>
            Dish name
            <input
              type="text"
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
              placeholder="e.g. Veg Club Sandwich"
              required
            />
          </label>

          <label>
            Meal slot
            <select value={form.meal} onChange={(event) => updateField('meal', event.target.value)}>
              {meals.map((meal) => (
                <option key={meal}>{meal}</option>
              ))}
            </select>
          </label>

          <label>
            Recipe / Method
            <textarea
              rows={4}
              value={form.recipe}
              onChange={(event) => updateField('recipe', event.target.value)}
              placeholder="Short cooking instructions"
            />
          </label>

          <label>
            Notes
            <textarea
              rows={3}
              value={form.notes}
              onChange={(event) => updateField('notes', event.target.value)}
              placeholder="Serving ideas, timing, spice tweaks"
            />
          </label>

          <label>
            Last made on
            <input type="date" value={form.lastMade} onChange={(event) => updateField('lastMade', event.target.value)} />
          </label>

          <div className="image-field">
            <label>
              Dish photo
              <input
                type="url"
                value={form.image}
                onChange={(event) => updateField('image', event.target.value)}
                placeholder="Paste an image URL"
              />
            </label>
            <span className="image-field__divider">or</span>
            <label className="file-upload">
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              Upload photo
            </label>
            {imageError && <p className="field-error">{imageError}</p>}
            {form.image && (
              <div className="image-preview">
                <img src={form.image} alt={`${form.name || 'Dish'} preview`} />
                <button type="button" onClick={clearImage}>
                  Remove photo
                </button>
              </div>
            )}
          </div>

          <div className="ingredients-editor">
            <div className="ingredients-editor__header">
              <h3>Ingredients</h3>
              <button type="button" onClick={addIngredient}>
                + Add ingredient
              </button>
            </div>
            {form.ingredients.map((ingredient, index) => (
              <div key={ingredient.id} className="ingredients-editor__row">
                <input
                  type="text"
                  value={ingredient.name}
                  onChange={(event) => updateIngredient(ingredient.id, 'name', event.target.value)}
                  placeholder={`Ingredient ${index + 1}`}
                />
                <input
                  type="text"
                  value={ingredient.amount}
                  onChange={(event) => updateIngredient(ingredient.id, 'amount', event.target.value)}
                  placeholder="Amount"
                />
                {form.ingredients.length > 1 && (
                  <button type="button" onClick={() => removeIngredient(ingredient.id)} aria-label="Remove ingredient">
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="drawer__actions">
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {mode === 'edit' ? 'Save changes' : 'Save dish'}
            </button>
          </div>
        </form>
      </div>
      <button className="drawer__scrim" onClick={onCancel} aria-label="Close add dish panel" />
    </div>
  )}

AddDishForm.propTypes = {
  mode: PropTypes.oneOf(['create', 'edit']),
  initialDish: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    meal: PropTypes.string,
    recipe: PropTypes.string,
    notes: PropTypes.string,
    image: PropTypes.string,
    lastMade: PropTypes.string,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        amount: PropTypes.string,
      })
    ),
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}
