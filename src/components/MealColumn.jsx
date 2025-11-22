import PropTypes from 'prop-types'
import { DishCard } from './DishCard'

export function MealColumn({ meal, dishes, onEdit, onLogCook, onShowGallery, onUpdateLastMade }) {
  return (
    <section className="meal-column">
      <header>
        <div>
          <p className="meal-column__label">{meal}</p>
          <h2>{dishes.length ? `${dishes.length} item${dishes.length > 1 ? 's' : ''}` : 'No dishes logged yet'}</h2>
        </div>
      </header>
      {dishes.length ? (
        <div className="meal-column__grid">
          {dishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              onEdit={onEdit}
              onLogCook={onLogCook}
              onShowGallery={onShowGallery}
              onUpdateLastMade={onUpdateLastMade}
            />
          ))}
        </div>
      ) : (
        <p className="meal-column__empty">Add something tasty for {meal.toLowerCase()}!</p>
      )}
    </section>
  )}

MealColumn.propTypes = {
  meal: PropTypes.string.isRequired,
  dishes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func.isRequired,
  onLogCook: PropTypes.func.isRequired,
  onShowGallery: PropTypes.func.isRequired,
  onUpdateLastMade: PropTypes.func.isRequired,
}
