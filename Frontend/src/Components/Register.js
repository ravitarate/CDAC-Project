import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Navbar from "./Navbar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./Styles.css"; // Ensure this is where your CSS file is
import { BUS_SERVICE_API_BASE_URL } from "../BaseURLs/BaseURLs";

function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      contact: "",
      email: "",
      address: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Name is required"),
      contact: Yup.string()
        .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
        .required("Mobile number is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      address: Yup.string().required("Address is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post(BUS_SERVICE_API_BASE_URL+"/customer/registerUser", values);
        toast.success("Registration successful!");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } catch (error) {
        toast.error("Something went wrong!", {
          position: "top-center",
          autoClose: 1000,
        });
      }
    },
  });

  return (
    <div className="register-page">
      <Navbar />
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="register-form-container">
          <h2 className="text-center mb-4">Register</h2>
          <form onSubmit={formik.handleSubmit}>
            {/* Name Input */}
            <div className="mb-3">
              <label>Name:</label>
              <input
                type="text"
                {...formik.getFieldProps("username")}
                className="form-control"
              />
              {formik.touched.username && formik.errors.username && (
                <div className="text-danger">{formik.errors.username}</div>
              )}
            </div>

            {/* Mobile Input */}
            <div className="mb-3">
              <label>Mobile:</label>
              <input
                type="text"
                {...formik.getFieldProps("contact")}
                className="form-control"
              />
              {formik.touched.contact && formik.errors.contact && (
                <div className="text-danger">{formik.errors.contact}</div>
              )}
            </div>

            {/* Email Input */}
            <div className="mb-3">
              <label>Email:</label>
              <input
                type="email"
                {...formik.getFieldProps("email")}
                className="form-control"
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

            {/* Password Input */}
            <div className="mb-3">
              <label>Password:</label>
              <input
                type="password"
                {...formik.getFieldProps("password")}
                className="form-control"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-danger">{formik.errors.password}</div>
              )}
            </div>

            <div className="mb-3 w-100">
              <button
                type="submit"
                className="btn btn-light w-100"
                style={{ backgroundColor: "#b5dceb" }}
              >
                Register
              </button>
            </div>
          </form>
          <div className="mt-2 text-center">
            <p>Already have an account?</p>
            <Link to="/login" style={{ textDecoration: "none", color: "blue" }}>
              <strong>Login here</strong>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
