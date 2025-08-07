import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import "./Bookings.css";
import { BUS_SERVICE_API_BASE_URL } from "../BaseURLs/BaseURLs";

function Bookings() {
  const [groupedBookings, setGroupedBookings] = useState([]);
  const id = sessionStorage.getItem("userId");

  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };

      const response = await axios.get(
        `${BUS_SERVICE_API_BASE_URL}/customer/getBookings/${id}`,
        config
      );

      const grouped = groupBookingsByTripId(response.data || []);
      setGroupedBookings(grouped);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const groupBookingsByTripId = (bookings) => {
    const groupedData = {};

    bookings.forEach((booking) => {
      if (!groupedData[booking.tripId]) {
        groupedData[booking.tripId] = {
          tripDetails: {
            tripId: booking.tripId,
            source: booking.source,
            destination: booking.destination,
            departureTime: booking.departureTime,
            arrivalTime: booking.arrivalTime,
            bookingDate: booking.bookingDate,
          },
          passengers: [],
        };
      }

      groupedData[booking.tripId].passengers.push({
        passengerName: booking.passengerName,
        seatNumber: booking.seatNumber,
        price: booking.price,
      });
    });

    return Object.values(groupedData);
  };

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    const [hour, minute] = timeString.split(":");
    return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
  };

  const handleDownloadReceipt = async (trip) => {
    try {
      const userId = sessionStorage.getItem("userId");
      const tripId = trip.tripDetails.tripId;

      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
        responseType: 'blob',
      };

      const response = await axios.get(
        `${BUS_SERVICE_API_BASE_URL}/customer/downloadBookingsPDF/${userId}/${tripId}`,
        config
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Ticket_Trip_${tripId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (error) {
      console.error("Error downloading receipt:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bookings-container">
        <h2 className="bookings-heading">My Bookings</h2>
        {groupedBookings.length > 0 ? (
          groupedBookings.map((group, index) => (
            <div key={index} className="booking-group">
              <div className="booking-info">
                <h4>Trip ID: {group.tripDetails.tripId}</h4>
                <p><strong>From:</strong> {group.tripDetails.source}</p>
                <p><strong>To:</strong> {group.tripDetails.destination}</p>
                <p><strong>Departure:</strong> {formatTime(group.tripDetails.departureTime)}</p>
                <p><strong>Arrival:</strong> {formatTime(group.tripDetails.arrivalTime)}</p>
                <p><strong>Booking Date:</strong> {group.tripDetails.bookingDate}</p>

                <div className="passenger-list">
                  {group.passengers.map((passenger, idx) => (
                    <p key={idx}>
                      <strong>Passenger:</strong> {passenger.passengerName} | 
                      <strong> Seat:</strong> {passenger.seatNumber} | 
                      <strong> Price:</strong> ₹{passenger.price.toFixed(2)}
                    </p>
                  ))}
                </div>
              </div>
              <button
                className="download-receipt-button"
                onClick={() => handleDownloadReceipt(group)}
              >
                Download Receipt
              </button>
            </div>
          ))
        ) : (
          <p className="empty-bookings-message">You have no bookings.</p>
        )}
      </div>
    </div>
  );
}

export default Bookings;
