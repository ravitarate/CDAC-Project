import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Navbar from "./Navbar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./Styles.css"; // Import CSS for styling
import { BUS_SERVICE_API_BASE_URL } from "../BaseURLs/BaseURLs";

function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(BUS_SERVICE_API_BASE_URL+"/login", values);
        toast.success("Login Successful!", {
          position: "top-center",
          autoClose: 1000,
        });

        const user1 = response.data;
        sessionStorage.setItem("userName", user1.name);
        sessionStorage.setItem("userId", user1.id);
        sessionStorage.setItem("userRole", user1.role);
        sessionStorage.setItem("jwtToken", user1.jwt);

        if (user1.role === "ROLE_CUSTOMER") navigate("/");
        else if (user1.role === "ROLE_ADMIN") navigate("/admin");
        else if (user1.role === "ROLE_AGENT") navigate("/agency");
      } catch (error) {
        toast.error("Invalid email or password!", {
          position: "top-center",
          autoClose: 1000,
        });
      }
    },
  });

  return (
    <div className="login-page">
      <Navbar />
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="shadow-lg p-4 form-container"
        >
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={formik.handleSubmit}>
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
                className="btn btn-light w-100 mt-3"
                style={{ backgroundColor: "#b5dceb" }}
              >
                Login
              </button>
            </div>
          </form>
          <div className="text-center">
            <p>Don't have an account?
            <Link to="/register" style={{ textDecoration: "none", color: "blue" }}>
              <strong>  Register here</strong>
            </Link>
            </p>
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default Login;
