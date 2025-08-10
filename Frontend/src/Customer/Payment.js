import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BUS_SERVICE_API_BASE_URL } from "../BaseURLs/BaseURLs";

export default function PaymentForm() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  
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

  const { tripId, busId, selectedSeats, passengerInfo, totalPrice } = location.state || {};

  const validateCardNumber = (number) => /^[0-9]{16}$/.test(number);

  const validateExpirationDate = (date) => {
    const [month, year] = date.split("/").map(Number);
    if (!month || !year || month < 1 || month > 12 || year < new Date().getFullYear()) {
      return false;
    }
    const expirationDate = new Date(year, month - 1);
    return expirationDate >= new Date(new Date().getFullYear(), new Date().getMonth());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!cardNumber || !cardHolderName || !expiration || !cvv) {
      setError("Please fill in all fields.");
      return;
    }

    if (!validateCardNumber(cardNumber)) {
      setError("Card number must be 16 digits.");
      return;
    }

    if (!validateExpirationDate(expiration)) {
      setError("Expiration date is invalid or in the past.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    const userId = sessionStorage.getItem("userId"); // Mock userId; replace with session value if available

    try {
      // Prepare payload for API
      const payload = passengerInfo.map((passenger, index) => ({
        name: passenger.name,
        email: passenger.email,
        phone: passenger.phone,
        tripId,
        seatNumber: selectedSeats[index],
        busId,
        amount: totalPrice / passengerInfo.length,
        userId,
      }));

      console.log("Payload for API:", payload);

      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        BUS_SERVICE_API_BASE_URL+"/customer/bookTickets",
        payload,
        config
      );

      if (response.status === 200) {
        toast.success("Booking confirmed!", {
          position: "top-right",
          autoClose: 1000,
        });

        setTimeout(() => {
          navigate(`/customer/bookings`);
        }, 2000);
      } else {
        throw new Error("Unexpected response from server");
      }
    } catch (error) {
      console.error("Error processing booking", error.response || error);
      setError("Failed to complete the booking. Please try again.");
      toast.error("Something went wrong! Please try again.", {
        position: "top-right",
        autoClose: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!passengerInfo?.length) {
      console.error("No passenger received.");
    }
  }, [passengerInfo]);

  return (
    <MDBContainer fluid className="py-5 gradient-custom">
      <MDBRow className="d-flex justify-content-center py-5">
        <MDBCol md="7" lg="5" xl="4">
          <MDBCard style={{ borderRadius: "15px" }}>
            <MDBCardBody className="p-4">
              <form onSubmit={handleSubmit}>
                <MDBRow className="d-flex align-items-center">
                  <MDBCol size="9">
                    <MDBInput
                      label="Card Number"
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="1234 5678 9012 3457"
                      required
                    />
                  </MDBCol>
                  <MDBCol size="3">
                    <img
                      src="https://img.icons8.com/color/48/000000/visa.png"
                      alt="visa"
                      width="64px"
                    />
                  </MDBCol>

                  <MDBCol size="9">
                    <MDBInput
                      label="Cardholder's Name"
                      type="text"
                      value={cardHolderName}
                      onChange={(e) => setCardHolderName(e.target.value)}
                      placeholder="Cardholder's Name"
                      required
                    />
                  </MDBCol>

                  <MDBCol size="6">
                    <MDBInput
                      label="Expiration"
                      type="text"
                      value={expiration}
                      onChange={(e) => setExpiration(e.target.value)}
                      placeholder="MM/YYYY"
                      required
                    />
                  </MDBCol>

                  <MDBCol size="3">
                    <MDBInput
                      label="CVV"
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="&#9679;&#9679;&#9679;"
                      required
                    />
                  </MDBCol>

                  {error && <div style={{ color: "red" }}>{error}</div>}

                  <MDBCol size="12" className="text-center mt-3">
                    <h5>Total Price: ₹{totalPrice ? totalPrice.toFixed(2) : "0.00"}</h5>
                  </MDBCol>

                  <MDBCol size="3">
                    <MDBBtn
                      color="info"
                      rounded
                      size="lg"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : <MDBIcon fas icon="arrow-right" />}
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <ToastContainer />
    </MDBContainer>
  );
}
