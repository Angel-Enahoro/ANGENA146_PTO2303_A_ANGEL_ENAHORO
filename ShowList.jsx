import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchShows } from "./ShowService";
import Fuse from "fuse.js";

function ShowList({ onSelectShow, onAddToFavorites }) {
  const [loadingInitialData, setLoadingInitialData] = useState(true);
  const [originalShows, setOriginalShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all"); // State for selected genre
  const [sortBy, setSortBy] = useState(""); // State for sort by option

  useEffect(() => {
    const fetchInitialShows = async () => {
      try {
        setLoadingInitialData(true);
        const data = await fetchShows();
        setOriginalShows(data);
        setLoadingInitialData(false);
      } catch (error) {
        console.error("Error fetching shows:", error);
        setLoadingInitialData(false);
      }
    };

    fetchInitialShows();
  }, []);

  const fuse = React.useMemo(() => {
    const fuseOptions = {
      keys: ["title"],
      threshold: 0.3,
    };
    return new Fuse(originalShows, fuseOptions);
  }, [originalShows]);

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }
    const results = fuse.search(searchTerm);
    setSearchResults(results.map((result) => result.item));
  }, [searchTerm, fuse]);

  const handleShowClick = (show) => {
    onSelectShow(show);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleAddToFavorites = (show) => {
    onAddToFavorites(show);
  };

  // Extracting all unique genres from the originalShows
  const genres = [...new Set(originalShows.map((show) => show.genre))];

  const sortedShows = () => {
    let sorted = [...originalShows];
    if (sortBy === "titleAsc") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "titleDesc") {
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === "dateAsc") {
      sorted.sort((a, b) => new Date(a.updated) - new Date(b.updated));
    } else if (sortBy === "dateDesc") {
      sorted.sort((a, b) => new Date(b.updated) - new Date(a.updated));
    }
    return sorted;
  };

  return (
    <div>
      <h1>All Shows</h1>
      <div>
        <input
          type="text"
          placeholder="Search shows"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {/* Dropdown for sorting */}
        <select value={sortBy} onChange={handleSortByChange}>
          <option value="">Sort By</option>
          <option value="titleAsc">Title (A-Z)</option>
          <option value="titleDesc">Title (Z-A)</option>
          <option value="dateAsc">Date Updated (Ascending)</option>
          <option value="dateDesc">Date Updated (Descending)</option>
        </select>
        {/* Dropdown for filtering by genre */}
        <select value={selectedGenre} onChange={handleGenreChange}>
          <option value="all">All Genres</option>
          {genres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <div className="show-cards">
        {(searchResults.length > 0 ? searchResults : sortedShows())
          .filter((show) =>
            selectedGenre === "all" ? true : show.genre === selectedGenre
          )
          .map((show) => (
            <div
              className="show-card"
              key={show.id}
              onClick={() => handleShowClick(show)}
            >
              <h3>{show.title}</h3>
              <p>Last Updated: {new Date(show.updated).toLocaleDateString()}</p>
              <img
                src={show.image}
                alt={show.title}
                style={{ maxWidth: "100%", height: "auto" }}
              />
              <button onClick={() => handleAddToFavorites(show)}>
                Add to Favorites
              </button>
            </div>
          ))}
      </div>
      {loadingInitialData && <div>Loading initial data...</div>}
    </div>
  );
}

ShowList.propTypes = {
  onSelectShow: PropTypes.func.isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
};

export default ShowList;
