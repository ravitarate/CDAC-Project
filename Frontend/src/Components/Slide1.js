import React from "react";
import Section1 from "./Section1"; // Import Section1

function Slide1() {
  return (
    <div style={{ position: "relative" }}>
      {/* Background Image */}
      <img
        src="./assests/homepage.jpg"
        alt="Background"
        style={{
          width: "100%",
          height: "100vh",
          objectFit: "cover",
          position: "absolute",
          zIndex: -1, // Keep the image behind the search form
        }}
      />
      {/* Search Section */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "2rem",
          maxWidth: "60%",
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "8px",
        }}
      >
        <Section1 />
      </div>
    </div>
  );
}

export default Slide1;
