import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import './ShowAllTrips.css';
import Navbar from '../Components/Navbar';
import { BUS_SERVICE_API_BASE_URL } from '../BaseURLs/BaseURLs';

function ShowAllTrips() {
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = sessionStorage.getItem("userId");

  // Extract query parameters
  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get("source");
  const destination = queryParams.get("destination");
  const tripDate = queryParams.get("tripDate");

  useEffect(() => {
    if (source && destination && tripDate) {
      const fetchTrips = async () => {
        try {
          const response = await axios.get(BUS_SERVICE_API_BASE_URL+"/getTripsByFilters", {
            params: { source, destination, tripDate },
          });
          setTrips(response.data);
        } catch (err) {
          setError(err.response?.data || "Something went wrong!");
        }
      };
      fetchTrips();
    }
  }, [source, destination, tripDate]);

  const handleViewSeatsClick = (tripId) => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      navigate(`/customer/viewseats?tripId=${tripId}`);
    } else {
      toast.warn("Login to view seats!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="container1">
      <Navbar />
      <ToastContainer />
      <h1 className="title">Available Trips</h1>
      {error && <div className="error-message">{error}</div>}
      {trips.length === 0 ? (
        <div className="no-trips-message">No trips available for the selected route and date.</div>
      ) : (
        <div className="trips-list">
          {trips.map((trip) => (
            <div key={trip.tripId} className="trip-card-horizontal">
              <div className="trip-details">
                <h2 className="bus-name">
                  <span style={{ color: "black" }}>Bus Name: </span>{trip.bus?.busName || 'N/A'}
                </h2>
                <p className="route">{trip.source} to {trip.destination}</p>
                <p className="schedule">
                  Departure: {trip.departureTime} | Arrival: {trip.arrivalTime}
                </p>
                <p className="trip-date">Trip Date: {formatDate(trip.tripDate)}</p>
                <p className="bus-info">Bus Number: {trip.bus?.busNumber || 'N/A'}</p>
                <p className="capacity">Capacity: {trip.bus?.capacity ?? 0}</p>
                <p className="type">Type: {trip.bus?.type || 'N/A'}</p>
                <p className="price">Price: INR {trip.price}</p>
              </div>
              <button
                className="view-seats-button"
                onClick={() => handleViewSeatsClick(trip.tripId)}
              >
                View Seats
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowAllTrips;
