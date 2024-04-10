import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShowList from "./assets/components/ShowList";
import ShowOverlay from "./assets/components/ShowOverlay";
import Favourites from "./assets/components/Favourites";
import Carousel from "./assets/components/Carousel";
import { fetchShows } from "./assets/components/ShowService";
/**
 * Main application component.
 * @returns {JSX.Element} The JSX element representing the application.
 */
function App() {
  /**
   * State for storing favourite shows.
   * @type {[Object[], Function]} An array containing the favourite shows and a function to update it.
   */
  const [favourites, setFavourites] = useState([]);

  /**
   * State for storing the currently selected show.
   * @type {[Object, Function]} The currently selected show and a function to update it.
   */
  const [selectedShow, setSelectedShow] = useState(null);

  /**
   * State for storing recommended shows.
   * @type {[Object[], Function]} An array containing recommended shows and a function to update it.
   */
  const [recommendedShows, setRecommendedShows] = useState([]);

  /**
   * Effect hook to fetch recommended shows on component mount.
   */
  useEffect(() => {
    /**
     * Fetch recommended shows from the server.
     * @async
     * @function
     * @returns {Promise<void>} A promise that resolves when recommended shows are fetched.
     */
    const fetchRecommendedShows = async () => {
      try {
        const data = await fetchShows(); // Fetch recommended shows
        setRecommendedShows(data);
      } catch (error) {
        console.error("Error fetching recommended shows:", error);
      }
    };

    fetchRecommendedShows();
  }, []);

  /**
   * Function to add a show to favourites.
   * @param {Object} show The show to add to favourites.
   */
  const handleAddToFavourites = (show) => {
    setFavourites([...favourites, show]);
  };

  /**
   * Function to remove a show from favourites.
   * @param {Object} showToRemove The show to remove from favourites.
   */
  const handleRemoveFromFavourites = (showToRemove) => {
    setFavourites(
      favourites.filter((favourite) => favourite.id !== showToRemove.id)
    );
  };

  /**
   * Function to close the show overlay.
   */
  const handleCloseOverlay = () => {
    setSelectedShow(null);
  };

  /**
   * Function to handle click on a show.
   * @param {Object} show The clicked show.
   */
  const handleShowClick = (show) => {
    setSelectedShow(show);
  };

  return (
    <Router>
      <div>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
          }}
        >
          <h1 style={{ fontFamily: "cursive" }}>SpeakEasy</h1>
          <nav>
            <ul style={{ listStyle: "none", display: "flex", gap: "10px" }}>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/favourites">Favourites</a>
              </li>
            </ul>
          </nav>
        </header>
      </div>
      <Carousel shows={recommendedShows} onShowClick={handleShowClick} />
      <Routes>
        <Route path="/" element={<ShowList onShowClick={handleShowClick} />} />
        <Route
          path="/favourites"
          element={
            <Favourites
              favourites={favourites}
              onRemoveFromFavourites={handleRemoveFromFavourites}
            />
          }
        />
      </Routes>
      {selectedShow && (
        <ShowOverlay
          show={selectedShow}
          onClose={handleCloseOverlay}
          onAddToFavourites={handleAddToFavourites}
        />
      )}
    </Router>
  );
}

export default App;
