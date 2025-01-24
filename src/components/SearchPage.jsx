import  { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://api.unsplash.com/search/photos";
const CLIENT_ID = "4lO6lGmS1TrSyHyIdW28qsmKlLni5xIqGpzgX-p2qXs"; 

const SearchPage = () => {
  const [query, setQuery] = useState(""); 
  const [results, setResults] = useState([]); 
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
      setResults(data.results); 
    } catch (error) {
      alert(error.message); 
    }
  };

  const handleEdit = (imageUrl) => {
    navigate(`/edit?img=${imageUrl}`); 
  };

  return (
    <div>
      <h1>Image Search</h1>
      <input
        type="text"
        placeholder="Search for images..."
        value={query}
        onChange={(e) => setQuery(e.target.value)} 
      />
      <button onClick={handleSearch}>Search</button>
      <div className="results">
        {results.map((image) => (
          <div key={image.id} className="image-result">
            <img src={image.urls.thumb} alt={image.alt_description} />
            <button onClick={() => handleEdit(image.urls.thumb)}>Add Captions</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
