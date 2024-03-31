// Favorites.jsx
import PropTypes from "prop-types";

function Favorites({ favorites, onRemoveFromFavorites }) {
  return (
    <div>
      <h1>Favorites</h1>
      {favorites.map((favorite) => (
        <div key={favorite.id}>
          <h3>{favorite.title}</h3>
          <p>Season: {favorite.season}</p>
          <button onClick={() => onRemoveFromFavorites(favorite)}>
            Remove from Favorites
          </button>
        </div>
      ))}
    </div>
  );
}

Favorites.propTypes = {
  favorites: PropTypes.array.isRequired,
  onRemoveFromFavorites: PropTypes.func.isRequired,
};

export default Favorites;
