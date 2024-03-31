// import { useState, useEffect, useMemo } from "react";
// import Fuse from "fuse.js";

// function LandingPage() {
//   const [originalShows, setOriginalShows] = useState([]);
//   const [shows, setShows] = useState([]);
//   const [loadingInitialData, setLoadingInitialData] = useState(true);
//   const [sortBy, setSortBy] = useState("titleAsc"); // Default sort by title ascending
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedGenres, setSelectedGenres] = useState([]);

//   const genreMapping = useMemo(
//     () => ({
//       1: "Personal Growth",
//       2: "True Crime and Investigative Journalism",
//       3: "History",
//       4: "Comedy",
//       5: "Entertainment",
//       6: "Business",
//       7: "Fiction",
//       8: "News",
//       9: "Kids and Family",
//     }),
//     []
//   );

//   useEffect(() => {
//     const fetchShows = async () => {
//       try {
//         setLoadingInitialData(true);
//         const response = await fetch("https://podcast-api.netlify.app/shows");
//         const data = await response.json();
//         setOriginalShows(data);
//         setShows(data);
//         setLoadingInitialData(false);
//       } catch (error) {
//         console.error("Error fetching shows:", error);
//         setLoadingInitialData(false);
//       }
//     };

//     fetchShows();
//   }, []);

//   useEffect(() => {
//     // Sort shows based on selected sorting option
//     const sortShows = () => {
//       const sorted = [...shows].sort((a, b) => {
//         if (sortBy === "titleAsc" || sortBy === "titleDesc") {
//           return sortBy === "titleAsc"
//             ? a.title.localeCompare(b.title)
//             : b.title.localeCompare(a.title);
//         } else if (sortBy === "dateAsc" || sortBy === "dateDesc") {
//           return sortBy === "dateAsc"
//             ? new Date(a.updated) - new Date(b.updated)
//             : new Date(b.updated) - new Date(a.updated);
//         }
//       });
//       setShows(sorted);
//     };

//     sortShows();
//   }, [shows, sortBy]);

//   useEffect(() => {
//     // Filter shows based on search term
//     const fuse = new Fuse(originalShows, {
//       keys: ["title"],
//       includeScore: true,
//     });
//     const results = fuse.search(searchTerm).map((result) => result.item);

//     // Update the state with the original list of shows, not the filtered list
//     if (searchTerm.trim() !== "") {
//       setShows(results);
//     } else {
//       // If search term is empty, reset to the original list of shows
//       setShows(originalShows);
//     }
//   }, [originalShows, searchTerm]);

//   const handleSortChange = (e) => {
//     setSortBy(e.target.value);
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleGenreClick = (genre) => {
//     setSelectedGenres((prevGenres) => {
//       if (prevGenres.includes(genre)) {
//         return prevGenres.filter((g) => g !== genre);
//       } else {
//         return [...prevGenres, genre];
//       }
//     });
//   };

//   const filteredByGenre = useMemo(() => {
//     if (selectedGenres.length === 0) return shows;
//     return shows.filter((show) =>
//       show.genres.some((genreId) => selectedGenres.includes(genreId.toString()))
//     );
//   }, [shows, selectedGenres]);

//   return (
//     <div>
//       <h1>All Shows</h1>
//       <div>
//         <label htmlFor="sortBy">Sort By:</label>
//         <select id="sortBy" value={sortBy} onChange={handleSortChange}>
//           <option value="titleAsc">Title (A-Z)</option>
//           <option value="titleDesc">Title (Z-A)</option>
//           <option value="dateAsc">Date Updated (Ascending)</option>
//           <option value="dateDesc">Date Updated (Descending)</option>
//         </select>
//         <input
//           type="text"
//           placeholder="Search by title"
//           value={searchTerm}
//           onChange={handleSearchChange}
//         />
//       </div>
//       <div>
//         <h2>Genres</h2>
//         {Object.entries(genreMapping).map(([id, genre]) => (
//           <button key={id} onClick={() => handleGenreClick(id)}>
//             {genre}
//           </button>
//         ))}
//       </div>
//       <ul>
//         {filteredByGenre.map((show) => (
//           <li key={show.id}>
//             <div>
//               <h3>{show.title}</h3>
//               <p>Last Updated: {new Date(show.updated).toLocaleDateString()}</p>
//               <p>
//                 Genres:{" "}
//                 {show.genres.map((genreId) => genreMapping[genreId]).join(", ")}
//               </p>
//               <img
//                 src={show.image}
//                 alt={show.title}
//                 style={{ maxWidth: "200px" }}
//               />
//             </div>
//           </li>
//         ))}
//       </ul>
//       {loadingInitialData && <div>Loading initial data...</div>}
//     </div>
//   );
// }

// export default LandingPage;
