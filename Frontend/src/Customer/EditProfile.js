import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Components/Navbar";
import { BUS_SERVICE_API_BASE_URL } from "../BaseURLs/BaseURLs";

function EditProfile() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const id = userId;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [changePassword, setChangePassword] = useState(false);

  const editUrl = `${BUS_SERVICE_API_BASE_URL}/customer/getUserById/${id}`;
  const updateUrl = `${BUS_SERVICE_API_BASE_URL}/customer/updateUser/${id}`;

  // Role validation and redirection
  useEffect(() => {
    const role = sessionStorage.getItem("userRole");
    const name = sessionStorage.getItem("userName");

    if (!name) {
      navigate("/");
    } else if (role === "CUSTOMER") {
      navigate("/");
    } else if (role === "AGENT") {
      navigate("/agency");
    } else if (role === "ADMIN") {
      navigate("/admin");
    }
  }, [navigate]);

  // Fetch user data
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };

    axios
      .get(editUrl, config)
      .then((response) => {
        const { name, email, contact, address } = response.data;
        setName(name || "");
        setEmail(email || "");
        setContact(contact || "");
        setAddress(address || "");
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        toast.error("Failed to fetch user details");
      });
  }, [editUrl]);

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };

   const userDetails = {
  username: name,  
  email,
  contact,
  address,
};


    if (changePassword && password.trim() !== "") {
      userDetails.password = password;
    }

    axios
      .put(updateUrl, userDetails, config)
      .then(() => {
        toast.success("Profile updated successfully!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.error("Failed to update profile:", error);
        toast.error("Failed to update profile.");
      });
  };

  return (
    <div className="container1">
      <Navbar />
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center" style={{ marginTop: "-20%" }}>
        <div
          className="shadow-lg p-4"
          style={{
            width: "35rem",
            marginTop: "25rem",
            border: "2px solid #b5dceb",
            backgroundColor: "#f4f4f9",
            color: "black",
          }}
        >
          <h2 className="text-center mb-4">Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-3">
              <label>User Name:</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                value={email}
                readOnly
              />
            </div>

            {/* Contact */}
            <div className="mb-3">
              <label>Contact:</label>
              <input
                type="text"
                className="form-control"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                maxLength={10}
                pattern="\d{10}"
                required
              />
            </div>

            {/* Address */}
            <div className="mb-3">
              <label>Address:</label>
              <textarea
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            {/* Toggle password change */}
            {/* <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                checked={changePassword}
                onChange={() => setChangePassword(!changePassword)}
                id="changePasswordCheck"
              />
              <label className="form-check-label" htmlFor="changePasswordCheck">
                Change Password?
              </label>
            </div>

            {/* Password input - visible only if checkbox is selected */}
            {/* {changePassword && (
              <div className="mb-3">
                <label>New Password:</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )} */} 

            {/* Submit Button */}
            <div className="mb-3 w-100">
              <button
                type="submit"
                className="btn btn-light w-100"
                style={{ backgroundColor: "#b5dceb" }}
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
