import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import "./ViewPayments.css"; // Your custom styles
import { useNavigate } from "react-router-dom";
import Agency from "./Agency"; // Assuming Admin component is used for layout
import { BUS_SERVICE_API_BASE_URL } from "../BaseURLs/BaseURLs";

function ViewPayments() {
  const [payments, setPayments] = useState([]);

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

  // Fetch payments from the API on component mount
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };
  
        const response = await axios.get(BUS_SERVICE_API_BASE_URL+"/admin/getAllPayments", config); // Use axios.get with config
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };
  
    fetchPayments();
  }, []);
  
  return (
    <Agency>
      <div className="view-payments-container">
        <h2>View Payments</h2>
        <table className="payments-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Date</th>
              <th>User Name</th>
              <th>Payment Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <tr key={payment.paymentId}>
                  <td>{payment.orderId}</td>
                  <td>{payment.orderDate}</td>
                  <td>{payment.userName || "N/A"}</td> {/* Show 'N/A' if userName is null */}
                  <td>{payment.paymentStatus}</td>
                  <td>{payment.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No payments available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Agency>
  );
}

export default ViewPayments;
