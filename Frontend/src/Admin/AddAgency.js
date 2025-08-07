import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./Admin";
import { BUS_SERVICE_API_BASE_URL } from "../BaseURLs/BaseURLs";

function ViewAgencies() {
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

  const [data, setData] = useState({ agencies: [], isFetching: false });
  const [searchText, setSearchText] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      contact: "",
      email: "",
      password: "",
      address:"",
    },
   validationSchema: Yup.object({
  name: Yup.string()
    .matches(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed")
    .required("Name is required"),

  contact: Yup.string()
    .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
    .required("Contact number is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  address: Yup.string()
    .min(5, "Address must be at least 5 characters")
    .required("Address is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must include at least one uppercase letter")
    .matches(/[a-z]/, "Must include at least one lowercase letter")
    .matches(/[0-9]/, "Must include at least one number")
    .matches(/[!@#$%^&*]/, "Must include at least one special character")
    .required("Password is required"),
}),

    onSubmit: async (values) => {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };

      try {
        await axios.post(
          BUS_SERVICE_API_BASE_URL+"/admin/addAgent",
          values,
          config
        );
        toast.success("Agency added successfully!", {
          position: "top-center",
          autoClose: 500,
        });
        setTimeout(() => {
          formik.resetForm();
        }, 2000);
      } catch (error) {
        console.error("Error adding agency:", error);
        toast.error("Failed to add agency.");
      }
    },
  });

  return (
    <Admin>
      <ToastContainer />
      <div className="container">
        <div className="content">
          {/* Add Agency Form */}
          <div className="form-section">
            <h3>Add Agency</h3>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label>Agency Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Agency Name"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-danger">{formik.errors.name}</div>
                )}
              </div>
              <div className="form-group">
                <label>Contact Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Contact Number"
                  {...formik.getFieldProps("contact")}
                />
                {formik.touched.contact &&
                  formik.errors.contact && (
                    <div className="text-danger">
                      {formik.errors.contact}
                    </div>
                  )}
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter Email"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-danger">{formik.errors.email}</div>
                )}
              </div>

               {/* Address Input */}
            <div className="mb-3">
              <label>Address:</label>
              <input
                type="text"
                {...formik.getFieldProps("address")}
                className="form-control"
              />
              {formik.touched.address && formik.errors.address && (
                <div className="text-danger">{formik.errors.address}</div>
              )}
            </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter Password"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-danger">{formik.errors.password}</div>
                )}
              </div>
              {/* Centered button */}
              <div className="button-container">
                <button type="submit" className="btn1">
                  Add Agency
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          max-width: 40%;
          margin: 20px auto;
        }
        .content {
          display: flex;
          gap: 20px;
        }
        .form-section {
          flex: 1;
          background:rgb(235, 239, 243);
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
        /* Center the Add button */
        .button-container {
          text-align: center;
          margin-top: 15px;
        }
        .btn1 {
          background-color: #63a0bc;
          padding: 10px 15px;
          border: none;
          color: white;
          cursor: pointer;
          border-radius: 5px;
        }
        .btn:hover {
          background-color:rgb(159, 200, 219);
        }
      `}</style>
    </Admin>
  );
}

export default ViewAgencies;
