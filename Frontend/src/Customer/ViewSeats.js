import React, { useEffect, useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom"; 
import Navbar from "../Components/Navbar";
import "./ViewSeats.css";
import { BUS_SERVICE_API_BASE_URL } from "../BaseURLs/BaseURLs";

function ViewSeats() {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerInfo, setPassengerInfo] = useState([{ name: "",email: "",phone:"" },]);
  const [searchParams] = useSearchParams();
  const tripId = searchParams.get("tripId");
    const location = useLocation();
const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

const validateName = (name) => {
  const re = /^[A-Za-z\s]+$/;
  return re.test(name.trim());
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validatePhone = (phone) => {
  const re = /^[0-9]{10}$/;
  return re.test(phone) && !phone.startsWith("00");
};


    useEffect(() => {
      if (!sessionStorage.getItem("userName")) {
        navigate("/");
      } else if (sessionStorage.getItem("userRole") === "CUSTOMER") {
        navigate("/");
      } else if (sessionStorage.getItem("userRole") === "AGENT") {
        navigate("/agency");
      } else if (sessionStorage.getItem("userRole") === "ADMIN") {
        navigate("/admin");
      }
    }, [navigate]);


  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const config = {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
            },
          };
        const response = await axios.get(`${BUS_SERVICE_API_BASE_URL}/customer/trip/${tripId}`,config);
        setSeats(response.data);
      } catch (error) {
        toast.error("Failed to fetch seat data!");
      }
    };
    fetchSeats();
  }, [tripId]);

  const handleSeatClick = (seat) => {
    if (seat.status === "BOOKED") return; // Skip already booked seats

    if (selectedSeats.some((s) => s.seatNumber === seat.seatNumber)) {
      // Deselect seat
      setSelectedSeats(selectedSeats.filter((s) => s.seatNumber !== seat.seatNumber));
    } else {
      // Select seat
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  useEffect(() => {
    // Initialize passenger info for selected seats
    setPassengerInfo(selectedSeats.map(() => ({ name: "", email: "", phone: "" })));
  }, [selectedSeats]);

  const handlePassengerInfoChange = (index, field, value) => {
    const updatedInfo = [...passengerInfo];
    updatedInfo[index][field] = value;
    setPassengerInfo(updatedInfo);
  };
  const handleSubmit = () => {
    if (passengerInfo.some((info) => !info.name || !info.email || !info.phone)) {
      toast.error("Please fill out all passenger information!");
      return;
    }
  
    const totalPrice = selectedSeats.length > 0 ? selectedSeats.length * selectedSeats[0].trip.price : 0;
  
    const bookingData = {
      tripId,
      busId: seats[0]?.bus.busId,
      selectedSeats: selectedSeats.map((seat) => seat.seatNumber),
      passengerInfo,
      totalPrice,
    };
  
    // Navigate to payment page with bookingData as state
    navigate("/customer/payement", { state: bookingData });
  } catch (err) {
    if (err.inner && err.inner.length > 0) {
      err.inner.forEach((validationError, index) => {
        toast.error(
          `Passenger ${index + 1}: ${validationError.message}`
        );
      });
    } else {
      toast.error("Validation failed!");
    }
  }
};

  

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className="seat-container">
        <h1 className="seat-title">Select Your Seat</h1>
        <div className="bus-layout">
          <div className="seat-grid">
            {seats.map((seat, index) => (
              <div
                key={index}
                className={`seat-icon ${seat.status === "BOOKED" ? "booked" : selectedSeats.some((s) => s.seatNumber === seat.seatNumber) ? "selected" : "available"}`}
                onClick={() => handleSeatClick(seat)}
              >
                <MdAirlineSeatReclineNormal size={40} />
                <p>{seat.seatNumber}</p>
              </div>
            ))}
          </div>
        </div>

        {selectedSeats.length > 0 && (
          <>
            <h2>Passenger Information</h2>
            <table className="passenger-table">
              <thead>
                <tr>
                  <th>Seat Number</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {selectedSeats.map((seat, index) => (
                  <tr key={seat.seatNumber}>
                    <td>{seat.seatNumber}</td>
                    <td>
                    <input
                      type="text"
                      value={passengerInfo[index]?.name || ""}
                      onChange={(e) => handlePassengerInfoChange(index, "name", e.target.value)}
                      placeholder="Enter name"
                      style={{ borderColor: errors[index]?.name ? "red" : "" }}
                    />
                    {errors[index]?.name && (
                      <div style={{ color: "red", fontSize: "0.8em" }}>{errors[index].name}</div>
                    )}
                  </td>

                    <td>
          <input
            type="email"
                value={passengerInfo[index]?.email || ""}
                  onChange={(e) => handlePassengerInfoChange(index, "email", e.target.value)}
                  placeholder="Enter email"
                   style={{ borderColor: errors[index]?.email ? "red" : "" }}
                   />
                    {errors[index]?.email && (
                  <div style={{ color: "red", fontSize: "0.8em" }}>{errors[index].email}</div>
                  )}
                </td>
                <td>
                  <input
                    type="tel"
                    value={passengerInfo[index]?.phone || ""}
                    onChange={(e) => handlePassengerInfoChange(index, "phone", e.target.value)}
                    placeholder="Enter phone"
                    style={{ borderColor: errors[index]?.phone ? "red" : "" }}
                  />
                  {errors[index]?.phone && (
                    <div style={{ color: "red", fontSize: "0.8em" }}>{errors[index].phone}</div>
                  )}
                </td>

                  </tr>
                ))}
              </tbody>
            </table>
            <h3>Total Price: ₹{selectedSeats.length > 0 ? selectedSeats.length * selectedSeats[0].trip.price : 0}</h3>
            <button className="submit-btn" onClick={handleSubmit}>
              Submit Booking
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ViewSeats;
