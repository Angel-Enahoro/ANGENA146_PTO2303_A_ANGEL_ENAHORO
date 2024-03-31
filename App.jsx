// App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShowList from "./ShowList";
import ShowOverlay from "./ShowOverlay";
import Favourites from "./Favourites";

function App() {
  const handleSelectShow = (show) => {
    // Handle show selection logic here
    console.log("Selected show:", show);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<ShowList onSelectShow={handleSelectShow} />} // Provide onSelectShow prop
        />
        <Route path="/show/:id" element={<ShowOverlay />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </Router>
  );
}

export default App;
