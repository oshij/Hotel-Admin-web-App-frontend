import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import Navbar from "./Components/Navbar";
import Rooms from "./Components/Rooms";

import AddRoomForm from "./Components/AddRooms";

import Bookings from "./Components/Bookings";
import BookingForm from "./Components/BookForm";


function App() {


  return (
    <BrowserRouter>
    
    <Navbar />
      <Routes>
        <Route index path="/rooms" element={<Rooms /> } />
         <Route path="/addRoom" element={<AddRoomForm/>} />
         <Route path="/bookRoom" element={<BookingForm/>} />
         <Route path="/bookings" element={<Bookings />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
