import PropTypes from "prop-types";

function Favourites({ favourites, onRemoveFromFavourites }) {
  return (
    <div>
      <h1>Favourites</h1>
      {favourites.map((favourite) => (
        <div key={favourite.id}>
          <h3>{favourite.title}</h3>
          <p>Seasons: {favourite.seasons}</p>{" "}
          {/* Display seasons instead of season */}
          <button
            onClick={() =>
              onRemoveFromFavourites && onRemoveFromFavourites(favourite)
            }
          >
            Remove from Favourites
          </button>
        </div>
      ))}
    </div>
  );
}

Favourites.propTypes = {
  favourites: PropTypes.array.isRequired,
  onRemoveFromFavourites: PropTypes.func.isRequired, // Make it optional
};

export default Favourites;
