import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Agency from "./Agency";
import { BUS_SERVICE_API_BASE_URL } from "../BaseURLs/BaseURLs";

function AddBus() {
  const navigate = useNavigate();

  // Redirect based on role
  useEffect(() => {
    const role = sessionStorage.getItem("userRole");
    if (!sessionStorage.getItem("userName") || role === "CUSTOMER") {
      navigate("/");
    } else if (role === "AGENT") {
      // Stay on page
    } else if (role === "ADMIN") {
      navigate("/admin");
    }
  }, [navigate]);

  const [busData, setBusData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const id = sessionStorage.getItem("userId");

  // Fetch buses on component load
  useEffect(() => {
    if (id) fetchBusData();
  }, [id]);

  const fetchBusData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };
      const response = await axios.get(
        `${BUS_SERVICE_API_BASE_URL}/agency/getBusesByAgent/${id}`,
        config
      );
      setBusData(response.data);
    } catch (error) {
      toast.error("Failed to load bus data.", { position: "top-center" });
    }
  };

  const formik = useFormik({
    initialValues: {
      busName: "",
      busNumber: "",
      driverName: "",
      type: "AC", // default value
    },
    validationSchema: Yup.object({
      busName: Yup.string().required("Bus name is required"),
      busNumber: Yup.string()
        .matches(/^[A-Z0-9]{1,10}$/, "Bus number must be 1-10 alphanumeric characters")
        .required("Bus number is required"),
      driverName: Yup.string().required("Driver name is required"),
      type: Yup.string().required("Bus type is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };
        await axios.post(
          `${BUS_SERVICE_API_BASE_URL}/agency/addBus/${id}`,
          values,
          config
        );
        toast.success("Bus added successfully!", {
          position: "top-center",
          autoClose: 1000,
        });
        resetForm();
        fetchBusData();
      } catch (error) {
        console.error("Error adding bus:", error);
        toast.error("Failed to add bus.", { position: "top-center" });
      }
    },
  });

  return (
    <Agency>
      <ToastContainer />
      <div className="container">
        <div className="content">
          {/* Add Bus Form */}
          <div className="form-section">
            <h3>Add Bus</h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label>Bus Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Bus Name"
                  {...formik.getFieldProps("busName")}
                />
                {formik.touched.busName && formik.errors.busName && (
                  <div className="text-danger">{formik.errors.busName}</div>
                )}
              </div>

              <div className="form-group">
                <label>Bus Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Bus Number"
                  {...formik.getFieldProps("busNumber")}
                />
                {formik.touched.busNumber && formik.errors.busNumber && (
                  <div className="text-danger">{formik.errors.busNumber}</div>
                )}
              </div>

              <div className="form-group">
                <label>Driver Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Driver Name"
                  {...formik.getFieldProps("driverName")}
                />
                {formik.touched.driverName && formik.errors.driverName && (
                  <div className="text-danger">{formik.errors.driverName}</div>
                )}
              </div>

              <div className="form-group">
                <label>Bus Type</label>
                <select
                  className="form-control"
                  {...formik.getFieldProps("type")}
                >
                  <option value="AC">AC</option>
                  <option value="Non-AC">Non-AC</option>
                </select>
                {formik.touched.type && formik.errors.type && (
                  <div className="text-danger">{formik.errors.type}</div>
                )}
              </div>

              <button type="submit" className="btn btn-primary mt-3">
                Add Bus
              </button>
            </form>
          </div>

          {/* View Bus Section */}
          <div className="view-section">
            <div className="view-header">
              <h2>View Bus Details</h2>
              <input
                type="text"
                className="form-control search-bar"
                placeholder="Search by Bus Name or Number"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Bus ID</th>
                  <th>Bus Name</th>
                  <th>Bus Number</th>
                  <th>Driver Name</th>
                  <th>Bus Type</th>
                </tr>
              </thead>
              <tbody>
                {busData
                  .filter((bus) => {
                    const search = searchText.toLowerCase();
                    return (
                      !searchText ||
                      (bus.busName?.toLowerCase().includes(search) ||
                        bus.busNumber?.toLowerCase().includes(search))
                    );
                  })
                  .map((bus) => (
                    <tr key={bus.busId}>
                      <td>{bus.busId}</td>
                      <td>{bus.busName}</td>
                      <td>{bus.busNumber}</td>
                      <td>{bus.driverName}</td>
                      <td>{bus.type}</td>
                    </tr>
                  ))}
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

export default AddBus;
