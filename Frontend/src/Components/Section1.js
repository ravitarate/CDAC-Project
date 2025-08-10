import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles.css";

function Section1() {
  const [source, setFrom] = useState("");
  const [destination, setTo] = useState("");
  const [tripDate, setDate] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/viewtrips?source=${source}&destination=${destination}&tripDate=${tripDate}`);
  };

  return (
    <div className="search-container">
      <h2 className="search-title">Your Trusted Travel Partner!</h2>
      <div className="search-grid">
        <input
          type="text"
          placeholder="source"
          value={source}
          onChange={(e) => setFrom(e.target.value)}
          className="search-input"
        />
        <input
          type="text"
          placeholder="destination"
          value={destination}
          onChange={(e) => setTo(e.target.value)}
          className="search-input"
        />
        <input
          type="date"
          value={tripDate}
          onChange={(e) => setDate(e.target.value)}
          className="search-input"
          min={new Date().toISOString().split("T")[0]}
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
    </div>
  );
}

export default Section1;
