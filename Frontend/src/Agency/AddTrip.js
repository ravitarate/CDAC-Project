import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Agency from "./Agency";
import "./AddTrip.css";
import { BUS_SERVICE_API_BASE_URL } from "../BaseURLs/BaseURLs";

function AddTrip() {
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

  const [buses, setBuses] = useState([]);
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [data, setData] = useState({ trips: [], isFetching: false });
  const [searchText, setSearchText] = useState("");

  const agentId = sessionStorage.getItem("userId");

  // Fetch all buses from API
  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };
        const response = await axios.get(
          `${BUS_SERVICE_API_BASE_URL}/agency/getBusesByAgent/${agentId}`,
          config
        );
        setBuses(response.data);
      } catch (error) {
        toast.error("Failed to load buses", {
          position: "top-center",
          autoClose: 1000,
        });
      }
    };
    fetchBuses();
  }, []);

  // Fetch trips from API
  const fetchTrips = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };
    try {
      setData({ trips: [], isFetching: true });
      const response = await axios.get(
        `${BUS_SERVICE_API_BASE_URL}/agency/getTripsByAgent/${agentId}`,
        config
      );
      setData({ trips: response.data, isFetching: false });
    } catch (error) {
      console.error("Error fetching trips:", error);
      setData({ trips: [], isFetching: false });
      toast.error("Failed to fetch trips.");
    }
  };

  // Formik for form handling
  const formik = useFormik({
    initialValues: {
      busId: "",
      source: "",
      destination: "",
      tripDate: "",
      departureTime: "",
      arrivalTime: "",
      price: "",
    },
    validationSchema: Yup.object({
      busId: Yup.string()
        .required("Bus is required")
        .matches(/^[0-9A-Za-z]{1,10}$/, "Invalid Bus ID format"),
      source: Yup.string().required("Source location is required"),
      destination: Yup.string()
        .required("Destination is required")
        .notOneOf(
          [Yup.ref("source")],
          "Source and destination must be different"
        ),

      tripDate: Yup.date()
        .required("Trip date is required")
        .min(new Date(), "Trip date cannot be in the past"),

      departureTime: Yup.string()
        .required("Departure time is required")
        .matches(
          /^([01]\d|2[0-3]):([0-5]\d)$/,
          "Departure time must be in HH:mm (24-hour) format"
        ),

      arrivalTime: Yup.string()
        .required("Arrival time is required")
        .matches(
          /^([01]\d|2[0-3]):([0-5]\d)$/,
          "Arrival time must be in HH:mm (24-hour) format"
        )
        .test(
          "is-after-departure",
          "Arrival time must be after departure time",
          function (value) {
            const { departureTime } = this.parent;
            return !departureTime || value > departureTime;
          }
        ),

      price: Yup.number()
        .typeError("Ticket price must be a valid number")
        .required("Ticket price is required")
        .min(1, "Ticket price must be at least ₹1")
        .max(10000, "Ticket price cannot exceed ₹10,000"),
    }),

    onSubmit: async (values) => {
      const formattedDepartureTime = `${values.departureTime}:00`;
      const formattedArrivalTime = `${values.arrivalTime}:00`;
      const tripData = {
        departureTime: formattedDepartureTime,
        arrivalTime: formattedArrivalTime,
        source: values.source,
        destination: values.destination,
        tripDate: values.tripDate,
        price: values.price,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };

      try {
        const url = `${BUS_SERVICE_API_BASE_URL}/agency/createTrip/${agentId}/${values.busId}`;

        await axios.post(url, tripData, config);
        toast.success("Trip added successfully!", {
          position: "top-center",
          autoClose: 500,
        });

        setTimeout(() => {
          fetchTrips(); // Reload trip data
          formik.resetForm(); // Reset form fields
        }, 2000);
      } catch (error) {
        console.error("Error adding trip:", error);
        toast.error("Failed to add trip.");
      }
    },
  });

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <Agency>
      <ToastContainer />
      <div className="container">
        <div className="content">
          <div className="form-section">
            <h3>Add Trip</h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label>Bus</label>
                <select
                  {...formik.getFieldProps("busId")}
                  className="form-control"
                  style={{ height: "35px" }}
                >
                  <option value="">Select Bus</option>
                  {buses.map((bus) => (
                    <option key={bus.busId} value={bus.busId}>
                      {bus.busName}
                    </option>
                  ))}
                </select>
                {formik.touched.busId && formik.errors.busId && (
                  <div className="text-danger">{formik.errors.busId}</div>
                )}
              </div>

              <div className="form-group">
                <label>Source Location</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter source location"
                  {...formik.getFieldProps("source")}
                />
                {formik.touched.source && formik.errors.source && (
                  <div className="text-danger">{formik.errors.source}</div>
                )}
              </div>

              <div className="form-group">
                <label>Destination</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter destination"
                  {...formik.getFieldProps("destination")}
                />
                {formik.touched.destination && formik.errors.destination && (
                  <div className="text-danger">{formik.errors.destination}</div>
                )}
              </div>

              <div className="form-group">
                <label>Trip Date</label>
                <input
                  type="date"
                  className="form-control"
                  {...formik.getFieldProps("tripDate")}
                />
                {formik.touched.tripDate && formik.errors.tripDate && (
                  <div className="text-danger">{formik.errors.tripDate}</div>
                )}
              </div>

              <div className="form-group">
                <label>Departure Time</label>
                <input
                  type="time"
                  className="form-control"
                  {...formik.getFieldProps("departureTime")}
                />
                {formik.touched.departureTime &&
                  formik.errors.departureTime && (
                    <div className="text-danger">
                      {formik.errors.departureTime}
                    </div>
                  )}
              </div>

              <div className="form-group">
                <label>Arrival Time</label>
                <input
                  type="time"
                  className="form-control"
                  {...formik.getFieldProps("arrivalTime")}
                />
                {formik.touched.arrivalTime && formik.errors.arrivalTime && (
                  <div className="text-danger">{formik.errors.arrivalTime}</div>
                )}
              </div>

              <div className="form-group">
                <label>Ticket Price</label>
                <input
                  type="number"
                  className="form-control"
                  {...formik.getFieldProps("price")}
                />
                {formik.touched.price && formik.errors.price && (
                  <div className="text-danger">{formik.errors.price}</div>
                )}
              </div>

              <button type="submit" className="btn btn-primary">
                Add Trip
              </button>
            </form>
          </div>

          {/* View Trips Section */}
          <div className="view-section">
            <div className="view-header">
              <h2>View Trip Details</h2>
              {/* <input
                type="text"
                className="form-control search-bar"
                placeholder="Search by Start Location or End Location"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              /> */}
            </div>
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Id</th>
                  <th>Bus</th>
                  <th>Start Location</th>
                  <th>End Location</th>
                  <th>Trip Date</th>
                  <th>Departure Time</th>
                  <th>Arriving Time</th>
                  <th>Ticekt Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.trips
                  .filter((trip) =>
                    searchText
                      ? trip.source
                          .toLowerCase()
                          .includes(searchText.toLowerCase()) ||
                        trip.destination
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
                      : true
                  )
                  .map(
                    ({
                      tripId,
                      bus,
                      source,
                      destination,
                      tripDate,
                      departureTime,
                      arrivalTime,
                      price,
                    }) => {
                      const formattedTripDate = tripDate
                        ? new Date(tripDate).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })
                        : "";

                      return (
                        <tr key={tripId}>
                          <td>{tripId}</td>
                          <td>{bus?.busName ?? "N/A"}</td>
                          <td>{source}</td>
                          <td>{destination}</td>
                          <td>{formattedTripDate}</td>
                          <td>{departureTime}</td>
                          <td>{arrivalTime}</td>
                          <td>{price}</td>
                          <td>
                            <button
                              className="btn btn-warning btn-sm"
                              onClick={() =>
                                navigate(`/agency/viewbookings/${tripId}`)
                              }
                            >
                              View Bookings
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          max-width: 95%;
          margin: 20px auto;
        }
        .content {
          display: flex;
          gap: 20px;
        }
        .form-section {
          flex: 1;
          background: rgb(235, 239, 243);
          color: black;
          padding: 20px;
          border-radius: 8px;
        }
        .form-group {
          margin-bottom: 15px;
        }
        .form-control {
          width: 100%;
          padding: 8px;
          margin-top: 5px;
        }
        .view-section {
          flex: 2;
        }
        .view-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .search-bar {
          max-width: 300px;
        }
      `}</style>
    </Agency>
  );
}

export default AddTrip;
