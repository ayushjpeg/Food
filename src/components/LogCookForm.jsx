import { nanoid } from 'nanoid'
import PropTypes from 'prop-types'
import { useState } from 'react'

const todayISO = () => new Date().toISOString().slice(0, 10)

export function LogCookForm({ dish, onSave, onCancel }) {
  const [photoUrl, setPhotoUrl] = useState('')
  const [caption, setCaption] = useState('')
  const [date, setDate] = useState(todayISO())
  const [error, setError] = useState(null)

  const handleUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      setPhotoUrl(typeof reader.result === 'string' ? reader.result : '')
      setError(null)
    }
    reader.onerror = () => setError('Unable to read that file. Try another image.')
    reader.readAsDataURL(file)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!photoUrl.trim()) {
      setError('Add a photo URL or upload an image to continue.')
      return
    }
    onSave({
      dishId: dish.id,
      entry: {
        id: nanoid(),
        url: photoUrl,
        caption: caption.trim(),
        recordedAt: date,
      },
    })
    setPhotoUrl('')
    setCaption('')
    setDate(todayISO())
  }

  return (
    <div className="drawer">
      <div className="drawer__panel">
        <header>
          <h2>Log a new cook</h2>
          <p>Attach a fresh plating photo for {dish.name} and update the last-made date.</p>
        </header>
        <form className="dish-form" onSubmit={handleSubmit}>
          <label>
            Cooked on
            <input type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
          </label>

          <label>
            Photo URL
            <input
              type="url"
              value={photoUrl}
              onChange={(event) => setPhotoUrl(event.target.value)}
              placeholder="Paste an image link"
            />
          </label>

          <label className="file-upload">
            <input type="file" accept="image/*" onChange={handleUpload} />
            Upload photo
          </label>

          <label>
            Caption / Notes (optional)
            <input type="text" value={caption} onChange={(event) => setCaption(event.target.value)} placeholder="e.g. Added more chillies" />
          </label>

          {error && <p className="field-error">{error}</p>}

          <div className="drawer__actions">
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save photo
            </button>
          </div>
        </form>
      </div>
      <button className="drawer__scrim" onClick={onCancel} aria-label="Close log cook panel" />
    </div>
  )}

LogCookForm.propTypes = {
  dish: PropTypes.shape({ id: PropTypes.string.isRequired, name: PropTypes.string.isRequired }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}
