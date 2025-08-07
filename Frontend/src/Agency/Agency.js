import React from "react";
import { NavLink } from "react-router-dom";
import { FaBus, FaRoute, FaMoneyCheckAlt } from "react-icons/fa";
import AgencyNavbar from "./AgencyNavbar";
import { BiReceipt } from "react-icons/bi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles.css";

function Agency({ children }) {
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
      <AgencyNavbar />
      <div className="layout-container">
        <div
          className="sidebar1 "
          style={{ border: "2px solid white", display: "flex" }}
        >
          <div className="sidebar-header">
            <h3>Agency</h3>
          </div>
          <nav className="sidebar-nav">
            <NavLink
              to="/agency/addbus"
              className={({ isActive }) =>
                isActive ? "sidebar-linka active" : "sidebar-link"
              }
            >
              <FaBus className="icona" /> Add Bus
            </NavLink>
            <NavLink
              to="/agency/addtrip"
              className={({ isActive }) =>
                isActive ? "sidebar-linka active" : "sidebar-link"
              }
            >
              <FaRoute className="icona" /> Add Trip
            </NavLink>
            {/* <NavLink
              to="/agency/viewpayments"
              className={({ isActive }) =>
                isActive ? "sidebar-linka active" : "sidebar-link"
              }
            >
              <FaMoneyCheckAlt className="icona" /> View Payments
            </NavLink> */}
          </nav>
        </div>

        <div className="main-content">{children}</div>
      </div>
    </div>
  );
}

export default Agency;
