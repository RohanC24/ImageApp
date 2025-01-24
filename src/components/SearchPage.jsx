import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://api.unsplash.com/search/photos";
const CLIENT_ID = "4lO6lGmS1TrSyHyIdW28qsmKlLni5xIqGpzgX-p2qXs"; // Unsplash API Client ID

const SearchPage = () => {
  const [query, setQuery] = useState(""); // User input for the search
  const [results, setResults] = useState([]); // Store search results
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) {
      alert("Please enter a search term.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}?client_id=${CLIENT_ID}&query=${query}&per_page=10`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Error fetching images. Please try again.");
      }

      const data = await response.json();
      setResults(data.results); // Update results with the API response
    } catch (error) {
      alert(error.message); // Handle any errors
    }
  };

  const handleEdit = (imageUrl) => {
    navigate("/edit", { state: { imageUrl } }); // Pass the selected image URL to Canvas
  };

  return (
    <div>
      <h1>Image Search</h1>
      <input
        type="text"
        placeholder="Search for images..."
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update the query state on input change
      />
      <button onClick={handleSearch}>Search</button>
      <div className="results">
        {results.map((image) => (
          <div key={image.id} className="image-result">
            <img src={image.urls.thumb} alt={image.alt_description} />
            <button onClick={() => handleEdit(image.urls.full)}>Add Captions</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
