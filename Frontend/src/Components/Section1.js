import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "./Styles.css";



const searchSchema = Yup.object().shape({
  source: Yup.string()
    .required("Source is required")
    .matches(/^[A-Za-z\s]+$/, "Source must contain only letters"),
  destination: Yup.string()
    .required("Destination is required")
    .matches(/^[A-Za-z\s]+$/, "Destination must contain only letters"),
  tripDate: Yup.date()
    .required("Trip date is required")
    .min(new Date(), "Trip date cannot be in the past")
  ,
});

function Section1() {
  const [source, setFrom] = useState("");
  const [destination, setTo] = useState("");
  const [tripDate, setDate] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

   const handleSearch = async () => {
    setErrors({}); // Clear previous errors

    try {
      await searchSchema.validate(
        { source, destination, tripDate },
        { abortEarly: false }
      );

      // Navigate if validation passes
      navigate(
        `/viewtrips?source=${source}&destination=${destination}&tripDate=${tripDate}`
      );
    } catch (err) {
      const errorMap = {};
      err.inner.forEach((e) => {
        errorMap[e.path] = e.message;
      });
      setErrors(errorMap);
    }
  };

  return (
  <div className="search-container">
    <h2 className="search-title">Your Trusted Travel Partner!</h2>
    <div className="search-grid">
      <div className="input-group">
        <input
          type="text"
          placeholder="source"
          value={source}
          onChange={(e) => setFrom(e.target.value)}
          className="search-input"
        />
        {errors.source && <p className="error-text">{errors.source}</p>}
      </div>

      <div className="input-group">
        <input
          type="text"
          placeholder="destination"
          value={destination}
          onChange={(e) => setTo(e.target.value)}
          className="search-input"
        />
        {errors.destination && <p className="error-text">{errors.destination}</p>}
      </div>

      <div className="input-group">
        <input
          type="date"
          value={tripDate}
          onChange={(e) => setDate(e.target.value)}
          className="search-input"
          min={new Date().toISOString().split("T")[0]}
        />
        {errors.tripDate && <p className="error-text">{errors.tripDate}</p>}
      </div>

      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  </div>
);

}

export default Section1;
