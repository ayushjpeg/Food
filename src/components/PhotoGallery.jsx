import PropTypes from 'prop-types'

export function PhotoGallery({ dish, onClose }) {
  return (
    <div className="overlay">
      <div className="overlay__panel">
        <header className="overlay__header">
          <div>
            <p className="eyebrow">Gallery</p>
            <h2>{dish.name}</h2>
          </div>
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </header>
        {dish.photos?.length ? (
          <div className="gallery-grid">
            {dish.photos
              .slice()
              .reverse()
              .map((photo) => (
                <figure key={photo.id}>
                  <img src={photo.url} alt={photo.caption || dish.name} loading="lazy" />
                  <figcaption>
                    <strong>{photo.recordedAt || 'Unknown date'}</strong>
                    {photo.caption && <span>{photo.caption}</span>}
                  </figcaption>
                </figure>
              ))}
          </div>
        ) : (
          <p>No photos logged yet.</p>
        )}
      </div>
      <button className="overlay__scrim" onClick={onClose} aria-label="Close gallery" />
    </div>
  )
}

PhotoGallery.propTypes = {
  dish: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        recordedAt: PropTypes.string,
        caption: PropTypes.string,
      })
    ),
  }).isRequired,
  onClose: PropTypes.func.isRequired,
}
