import React from "react";

function Section2() {
  return (
    <div className="mycontainer my-5">
      <div className="row align-items-center">
        {/* Text Section */}
        <div className="col-lg-7 col-md-6 col-12 mb-4 mb-md-0">
          <h2 className="mb-4 fw-bolder fs-1">Welcome to Quick Bus Reservation</h2>
          <p className="mb-4 me-5 fs-5">
            Travel smarter and more comfortably with SwiftBus Reservation System. 
            We are committed to providing a seamless booking experience and ensuring your journey is smooth, safe, and timely. 
            Our platform offers an extensive network of routes connecting major cities and remote towns, 
            allowing you to plan your trips effortlessly.
            Enjoy comfortable seating, real-time route tracking, and prompt customer support to make your travel stress-free. 
            With multiple payment options and instant ticket confirmation, we're here to make your journey as smooth as possible. 
            Book your next adventure with us today!
          </p>
        </div>

        {/* Image Section */}
        <div className="col-lg-5 col-md-6 col-12">
          <div className="row g-2">
            <img
              src="./assests/img1.avif"
              alt="Bus Journey"
              className="img-fluid rounded-3 shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section2;
