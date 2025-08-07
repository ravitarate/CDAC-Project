import React from "react";
import { NavLink } from "react-router-dom";
import { FaBuilding, FaUsers } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import "./Styles.css";

function Admin({ children }) {
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

  return (
    <div>
      <AdminNavbar />
      <div className="layout-container">
        <div
          className="sidebar1"
          style={{ border: "2px solid white", display: "flex" }}
        >
          <div className="sidebar-header">
            <h3>Admin</h3>
          </div>
          <nav className="sidebar-nav">
            {/* Customer Section */}
            <NavLink
              to="/admin/addagency"
              className={({ isActive }) =>
                isActive ? "sidebar-linka active" : "sidebar-link"
              }
            >
              <FaUsers className="icona" /> Add Agency
            </NavLink>

            {/* Workers Section */}
            <NavLink
              to="/admin/viewagency"
              className={({ isActive }) =>
                isActive ? "sidebar-linka active" : "sidebar-link"
              }
            >
              <FaBuilding className="icona" /> View Agency
            </NavLink>
          </nav>
        </div>

        <div className="main-content">{children}</div>
      </div>
    </div>
  );
}

export default Admin;
