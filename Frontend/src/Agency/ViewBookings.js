import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Agency from "./Agency";
import { BUS_SERVICE_API_BASE_URL } from "../BaseURLs/BaseURLs";

function ViewBookings() {
  const { tripId } = useParams(); // Get tripId from URL params
  console.log("trip id : "+tripId);
  const [bookings, setBookings] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
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

  // Fetch bookings for the given tripId
  useEffect(() => {
    const fetchBookings = async () => {
      setIsFetching(true);
      const config = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}` },
      };

      try {
        const response = await axios.get(
          `${BUS_SERVICE_API_BASE_URL}/agency/getBookingsForTrip/${tripId}`,
          config
        );
        setBookings(response.data);
        setIsFetching(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setIsFetching(false);
        toast.error("No bookings.");
      }
    };

    if (tripId) {
      fetchBookings();
    }
  }, [tripId]);

  return (
    <Agency>
      <ToastContainer />
      <div className="container">
        <div className="content">
          <h2>Bookings for Trip ID: {tripId}</h2>
          {isFetching ? (
            <div>Loading...</div>
          ) : (
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Customer Name</th>
                  <th>Seat No</th>
                  <th>Contact Number</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map(({ passengerName, seatNumber, contact}, index) => (
                    <tr key={index}>
                      <td>{passengerName}</td>
                      <td>{seatNumber}</td>
                      <td>{contact}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No bookings found for this trip.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <style jsx>{`
        .container {
          max-width: 95%;
          margin: 20px auto;
        }
        .content {
          display: flex;
          flex-direction: column;
        }
        table {
          width: 100%;
          margin-top: 20px;
        }
        .table th, .table td {
          padding: 12px;
          text-align: left;
        }
      `}</style>
    </Agency>
  );
}

export default ViewBookings;
