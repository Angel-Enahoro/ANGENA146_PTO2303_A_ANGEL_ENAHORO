import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ShowDetails from "./ShowDetail"; // Importing ShowDetails component

/**
 * Overlay component to display detailed information about a TV show.
 * @param {Object} props - Props for the ShowOverlay component.
 * @param {Object} props.show - The TV show object to display details for.
 * @param {Function} props.onClose - Function to handle closing the overlay.
 * @param {Function} props.onAddToFavorites - Function to handle adding the show to favorites.
 * @returns {JSX.Element} JSX for the ShowOverlay component.
 */
function ShowOverlay({ show, onClose, onAddToFavorites }) {
  const [selectedSeason, setSelectedSeason] = useState("all");

  // Event handlers
  const handleSeasonChange = (event) => {
    setSelectedSeason(event.target.value);
  };

  const handleAddToFavoritesClick = () => {
    onAddToFavorites(show);
  };

  const handleClose = () => {
    onClose();
  };

  // Effect hook to handle scrolling behavior
  useEffect(() => {
    // Disable scrolling on the body element when the overlay is active
    document.body.style.overflow = "hidden";

    // Re-enable scrolling when the overlay is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []); // Run only once on component mount

  // JSX rendering
  return (
    <div className="overlay">
      <div className="overlay-content">
        <button className="close-button" onClick={handleClose}>
          Close
        </button>
        {show && (
          <>
            {/* Render ShowDetails component with showId */}
            <ShowDetails showId={show.id} />
            {/* Additional content for the overlay */}
            <div className="overlay-info">
              <img
                src={show.image}
                alt={show.title}
                className="overlay-image"
              />
              <div className="overlay-details">
                <h2>{show.title}</h2>
                <p>{show.description}</p>
                {/* Season selection dropdown */}
                <div className="seasons-dropdown">
                  <label htmlFor="season-select">Select Season:</label>
                  <select
                    id="season-select"
                    value={selectedSeason}
                    onChange={handleSeasonChange}
                  >
                    <option value="all">All Seasons</option>
                    {show.seasons.map((season, index) => (
                      <option key={index} value={season}>
                        Season {season}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Buttons for adding to favorites and playing */}
                <div className="overlay-buttons">
                  <button onClick={handleAddToFavoritesClick}>
                    Add to Favorites
                  </button>
                  <button>Play</button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Prop type validation
ShowOverlay.propTypes = {
  show: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired, // Ensure genres are strings
    seasons: PropTypes.arrayOf(PropTypes.number).isRequired,
  }),
  onClose: PropTypes.func.isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
};

export default ShowOverlay;
