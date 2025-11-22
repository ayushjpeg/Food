import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

export function DishCard({ dish, onEdit, onLogCook, onShowGallery, onUpdateLastMade }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isEditingDate, setIsEditingDate] = useState(false)
  const [tempDate, setTempDate] = useState(dish.lastMade ?? '')

  useEffect(() => {
    setTempDate(dish.lastMade ?? '')
  }, [dish])

  const toggleExpanded = () => setIsExpanded((prev) => !prev)
  const coverPhoto = dish.photos?.length ? dish.photos[dish.photos.length - 1] : null
  const summaryImage = coverPhoto?.url || dish.image

  const startEditDate = () => {
    setTempDate(dish.lastMade ?? '')
    setIsEditingDate(true)
  }

  const saveDate = () => {
    if (!tempDate) return
    onUpdateLastMade(dish.id, tempDate)
    setIsEditingDate(false)
  }

  return (
    <article className={`dish-card ${isExpanded ? 'is-expanded' : ''}`}>
      <button
        type="button"
        className="dish-card__summary"
        onClick={toggleExpanded}
        aria-expanded={isExpanded}
        aria-controls={`dish-details-${dish.id}`}
      >
        {summaryImage ? (
          <img src={summaryImage} alt={`${dish.name} plating`} loading="lazy" />
        ) : (
          <div className="dish-card__placeholder" aria-hidden="true">
            {dish.name.charAt(0)}
          </div>
        )}
        <div className="dish-card__summary-meta">
          <p>{dish.meal}</p>
          <h3>{dish.name}</h3>
          {dish.lastMade && <span>Last made {dish.lastMade}</span>}
        </div>
        <span className="dish-card__chevron" aria-hidden="true">
          {isExpanded ? '−' : '+'}
        </span>
      </button>
      {isExpanded && (
        <div className="dish-card__details" id={`dish-details-${dish.id}`}>
          <div className="dish-card__detail-header">
            <div>
              <p className="dish-card__meal">{dish.meal}</p>
              <div className="dish-card__date-row">
                {isEditingDate ? (
                  <div className="date-editor">
                    <input type="date" value={tempDate} onChange={(event) => setTempDate(event.target.value)} />
                    <button type="button" className="text-button" onClick={saveDate}>
                      Save
                    </button>
                    <button type="button" className="text-button" onClick={() => setIsEditingDate(false)}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <small>
                    Last made {dish.lastMade || '—'}{' '}
                    <button type="button" className="pill-button" onClick={startEditDate}>
                      Edit date
                    </button>
                  </small>
                )}
              </div>
            </div>
            <button type="button" className="text-button" onClick={() => onEdit(dish)}>
              Edit details
            </button>
          </div>
          {dish.recipe && (
            <div className="dish-card__section">
              <h4>Recipe</h4>
              <p>{dish.recipe}</p>
            </div>
          )}
          <div className="dish-card__section">
            <h4>Ingredients</h4>
            <ul>
              {dish.ingredients.map((ingredient) => (
                <li key={ingredient.id}>
                  <span>{ingredient.name}</span>
                  <em>{ingredient.amount}</em>
                </li>
              ))}
            </ul>
          </div>
          {dish.notes && (
            <div className="dish-card__notes">
              <h4>Notes</h4>
              <p>{dish.notes}</p>
            </div>
          )}
          <div className="dish-card__detail-actions">
            <button type="button" className="btn-secondary" onClick={() => onLogCook(dish)}>
              Log cook
            </button>
            <button type="button" className="btn-secondary" onClick={() => onShowGallery(dish)}>
              View gallery
            </button>
          </div>
        </div>
      )}
    </article>
  )}

DishCard.propTypes = {
  dish: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    meal: PropTypes.string.isRequired,
    recipe: PropTypes.string,
    notes: PropTypes.string,
    image: PropTypes.string,
    lastMade: PropTypes.string,
    ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        amount: PropTypes.string.isRequired,
      })
    ).isRequired,
    photos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        recordedAt: PropTypes.string,
        caption: PropTypes.string,
      })
    ),
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onLogCook: PropTypes.func.isRequired,
  onShowGallery: PropTypes.func.isRequired,
  onUpdateLastMade: PropTypes.func.isRequired,
}
