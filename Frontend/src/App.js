import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Components/Home';
import Login from './Components/Login';
import Register from "./Components/Register";

import Admin from "./Admin/Admin";
import AddAgency from "./Admin/AddAgency";
import ViewAgency from "./Admin/ViewAgency";


import Agency from "./Agency/Agency";
import AddBus from "./Agency/AddBus";
import AddTrip from "./Agency/AddTrip";
import ViewBookings from "./Agency/ViewBookings";
import ViewPayments from "./Agency/ViewPayments"; 
import ShowAllTrips from "./Components/ShowAllTrips";


import ViewSeats from "./Customer/ViewSeats";
import Payment from "./Customer/Payment";
import Bookings from "./Customer/Bookings";
import EditProfile from "./Customer/EditProfile";
import ForgotPassword from "./Customer/ForgotPassword";
import ResetPassword from "./Customer/ResetPassword";

function App() {
  return (
        <div className="App">
        <Router>
        <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>

        <Route path="/admin" element={<Admin/>}></Route>
        <Route path="/admin/addagency" element={<AddAgency/>}></Route>
        <Route path="/admin/viewagency" element={<ViewAgency/>}></Route>


        <Route path="/agency" element={<Agency/>}></Route>
        <Route path="/agency/addbus" element={<AddBus/>}></Route>
        <Route path="/agency/addtrip" element={<AddTrip/>}></Route>
        <Route path="/agency/viewbookings/:tripId" element={<ViewBookings />} />
        <Route path="/agency/viewpayments" element={<ViewPayments />}/>

        <Route path="/viewtrips" element={<ShowAllTrips/>}/>
        <Route path="/customer/viewseats" element={<ViewSeats/>}/>
        <Route path="/customer/payement" element={<Payment/>}/>
        <Route path="/customer/bookings" element={<Bookings/>}/>
        <Route path="/editprofile/:userId" element={<EditProfile/>}/>
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword/>}/>


        </Routes>
        </Router>
         </div>
  );
}

export default App;
