import React from "react";
import {
  FaBusAlt,
  FaUserFriends,
  FaRoute,
  FaMapMarkerAlt,
  FaTicketAlt,
  FaClock,
} from "react-icons/fa";

const Slide2 = () => {
  const stats = [
    {
      icon: <FaBusAlt size={50} color="#63a0bc" />,
      value: "120",
      description: "Buses in Fleet",
    },
    {
      icon: <FaUserFriends size={50} color="#63a0bc" />,
      value: "45,000+",
      description: "Satisfied Customers",
    },
    {
      icon: <FaRoute size={50} color="#63a0bc" />,
      value: "200+",
      description: "Routes Covered",
    },
    {
      icon: <FaMapMarkerAlt size={50} color="#63a0bc" />,
      value: "75",
      description: "Pickup & Drop Points",
    },
    {
      icon: <FaTicketAlt size={50} color="#63a0bc" />,
      value: "95%",
      description: "On-time Ticket Bookings",
    },
    {
      icon: <FaClock size={50} color="#63a0bc" />,
      value: "24x7",
      description: "Customer Support Availability",
    },
  ];

  return (
    <div className="stats-container">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="icon">{stat.icon}</div>
          <h1 className="value">{stat.value}</h1>
          <p className="description">{stat.description}</p>
        </div>
      ))}

      <style jsx>{`
        .stats-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          margin: 40px auto;
          margin-top: 20%;
          max-width: 1200px;
        }
        .stat-card {
          flex: 1 1 calc(33.333% - 40px);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-width: 300px;
        }
        .icon {
          margin-bottom: 10px;
        }
        .value {
          font-size: 2.5rem;
          color: #333;
          margin: 10px 0;
        }
        .description {
          font-size: 1rem;
          color: #555;
        }
        @media (max-width: 768px) {
          .stat-card {
            flex: 1 1 calc(50% - 20px);
          }
        }
        @media (max-width: 480px) {
          .stat-card {
            flex: 1 1 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Slide2;
