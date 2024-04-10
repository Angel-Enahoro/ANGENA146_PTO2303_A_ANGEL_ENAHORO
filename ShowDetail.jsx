import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchShows } from "./ShowService";

/**
 * Component to display detailed information about a TV show.
 * @param {Object} props - Props for the ShowDetail component.
 * @param {string} props.showId - The ID of the show to display details for.
 * @returns {JSX.Element} JSX for the ShowDetail component.
 */
function ShowDetail({ showId }) {
  const [show, setShow] = useState(null); // State to hold show data
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    /**
     * Function to fetch show data based on showId.
     * @returns {Promise<void>}
     */
    const fetchShowData = async () => {
      try {
        setLoading(true);
        const showData = await fetchShows(showId);
        setShow(showData);
        setLoading(false);
      } catch (error) {
        console.error(`Failed to load show data:`, error);
        setLoading(false);
      }
    };

    fetchShowData();
  }, [showId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!show) {
    return <p>No show found</p>;
  }

  return (
    <div>
      <h1>{show.title}</h1>
      <p>{show.description}</p>
      {show.seasons && (
        <div>
          {show.seasons.map((season) => (
            <div key={season.season}>
              <h2>{season.title}</h2>
              <ul>
                {season.episodes.map((episode) => (
                  <li key={episode.title}>{episode.title}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Prop type validation
ShowDetail.propTypes = {
  showId: PropTypes.string.isRequired,
};

export default ShowDetail;
