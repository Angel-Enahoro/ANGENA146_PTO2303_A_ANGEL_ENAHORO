import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchShows } from "./ShowService";
import Fuse from "fuse.js";

/**
 * Component to display a list of TV shows with filtering and sorting options.
 * @param {Object} props - Props for the ShowList component.
 * @param {Function} props.onShowClick - Function to handle clicks on a show.
 * @returns {JSX.Element} JSX for the ShowList component.
 */
function ShowList({ onShowClick }) {
  // State variables
  const [loadingInitialData, setLoadingInitialData] = useState(true);
  const [originalShows, setOriginalShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortBy, setSortBy] = useState("");

  // Fetch initial shows data
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

  // Initialize Fuse instance for searching shows
  const fuse = React.useMemo(() => {
    const fuseOptions = {
      keys: ["title"],
      threshold: 0.3,
    };
    return new Fuse(originalShows, fuseOptions);
  }, [originalShows]);

  // Perform search when search term changes
  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }
    const results = fuse.search(searchTerm);
    setSearchResults(results.map((result) => result.item));
  }, [searchTerm, fuse]);

  // Event handlers
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  // Function to sort shows based on selected sorting option
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

  // List of genres
  const genres = [
    "Personal Growth",
    "True Crime and Investigative Journalism",
    "History",
    "Comedy",
    "Entertainment",
    "Business",
    "Fiction",
    "News",
    "Kids and Family",
  ];

  // JSX rendering
  return (
    <div>
      <h1>All Shows</h1>
      <div style={{ marginBottom: "10px" }}>
        {/* Search input */}
        <input
          type="text"
          placeholder="Search shows"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {/* Sort by dropdown */}
        <select value={sortBy} onChange={handleSortByChange}>
          <option value="">Sort By</option>
          <option value="titleAsc">Title (A-Z)</option>
          <option value="titleDesc">Title (Z-A)</option>
          <option value="dateAsc">Date Updated (Ascending)</option>
          <option value="dateDesc">Date Updated (Descending)</option>
        </select>
        {/* Genre filter dropdown */}
        <select value={selectedGenre} onChange={handleGenreChange}>
          <option value="all">All Genres</option>
          {genres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      {/* Show cards */}
      <div className="show-cards">
        {(searchResults.length > 0 ? searchResults : sortedShows())
          .filter((show) =>
            selectedGenre === "all"
              ? true
              : show.genres.some((genreId) => genres[genreId] === selectedGenre)
          )
          .map((show) => (
            <div
              className="show-card"
              key={show.id}
              onClick={() => onShowClick(show)}
            >
              <img
                src={show.image}
                alt={show.title}
                style={{ maxWidth: "100%", height: "auto" }}
              />
              <h3>{show.title}</h3>
              <p>Last Updated: {new Date(show.updated).toLocaleDateString()}</p>
              <p>Seasons: {show.seasons}</p>{" "}
              {/* Displaying the number of seasons */}
              <p>
                Genres: {show.genres.map((genre) => genres[genre]).join(", ")}
              </p>
            </div>
          ))}
      </div>
      {loadingInitialData && <div>Loading initial data...</div>}
    </div>
  );
}

// Prop type validation
ShowList.propTypes = {
  onShowClick: PropTypes.func.isRequired,
};

export default ShowList;
