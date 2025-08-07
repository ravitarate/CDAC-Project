import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import { Navbar, Container, Nav, Badge, Button } from 'react-bootstrap';
import { FaHome, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Styles.css";
function AgencyNavbar() {
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

    const handleLogout = () => {
        sessionStorage.clear();
        
        const logoutChannel = new BroadcastChannel('logout-channel');
        logoutChannel.postMessage({ type: 'logout' });
        
        toast.info('Signed Out Successfully', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        
        logoutChannel.close();
      };
      
      const logoutChannel = new BroadcastChannel('logout-channel');
      logoutChannel.addEventListener('message', (event) => {
        if (event.data.type === 'logout') {
          navigate('/');
        }
      });

  return (
    <div>
      <Navbar  expand="lg" className="px-5" style={{ border: '2px solid white',backgroundColor:"#63a0bc" }}>
        <Container fluid>
        <Navbar.Brand as={NavLink} to="/admin" className="d-flex align-items-center text-decoration-none">
        <span className="logo-style1">
        Quick Bus Reservation
        </span>
      </Navbar.Brand>
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto d-flex justify-content-between w-100">
              <Nav.Item>
                <NavLink
                  to="/admin"
                  className="nav-link fs-4 text-white fw-semibold"
                >
                 
                </NavLink>
              </Nav.Item>
              <Nav.Item className="d-flex align-items-center">
                <Badge bg="light" className="fs-5 text-dark fw-semibold">
                  <FaUserCircle /> 
                  {sessionStorage.getItem("userName")}
                </Badge>
                <Button
                  variant="danger"
                  className="ms-3"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt /> Logout
                </Button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ToastContainer />
    </div>
  )
}

export default AgencyNavbar
