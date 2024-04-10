/**
 * Function to fetch TV show data from an external API.
 * @returns {Promise<Object[]>} An array of TV show objects.
 * @throws {Error} If fetching or processing data fails.
 */
export const fetchShows = async () => {
  try {
    const response = await fetch("https://podcast-api.netlify.app/shows");
    if (!response.ok) {
      throw new Error("Failed to fetch shows");
    }
    const data = await response.json();

    // Ensure that seasons property is always an array
    const showsWithArraySeasons = data.map((show) => ({
      ...show,
      seasons: Array.isArray(show.seasons) ? show.seasons : [show.seasons],
      genres: show.genres.map(String), // Convert genre IDs to strings
    }));

    return showsWithArraySeasons;
  } catch (error) {
    throw new Error(`Failed to fetch shows: ${error.message}`);
  }
};
