// ShowDetails.jsx
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchShows } from "./ShowService"; // Correct import path

function ShowDetails({ showId }) {
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchShowData() {
      try {
        setLoading(true);
        const showData = await fetchShows(showId);
        setShow(showData);
        setLoading(false);
      } catch (error) {
        console.error(`Failed to load show ${showId} data:`, error);
        setLoading(false);
      }
    }

    fetchShowData();
  }, [showId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!show) {
    return <p>No show found</p>;
  }

  // Ensure seasons is always an array
  const seasons = Array.isArray(show.seasons) ? show.seasons : [show.seasons];

  return (
    <div>
      <h1>{show.title}</h1>
      <p>{show.description}</p>
      <p>Seasons: {seasons.join(", ")}</p>
    </div>
  );
}

ShowDetails.propTypes = {
  showId: PropTypes.string.isRequired,
};

export default ShowDetails;
