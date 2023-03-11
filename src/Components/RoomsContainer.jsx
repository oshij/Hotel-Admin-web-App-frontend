import React, { useState, useEffect } from "react";
import RoomsList from "./RoomsList";
import Loading from "./Loading";
import { useSelector } from "react-redux";

export default function RoomsContainer() {
  useEffect(()=>{
    fetchRooms();
   
},[]);
const [rooms,setRooms]=useState([]);
const [search,setSearch]=useState("");

const fetchRooms=async() => {
    const fetchRooms=await fetch("http://localhost:5000/api/room")
    const rooms=await fetchRooms.json();
    setRooms(rooms);
    console.log("lkdskjfa")

    
}
 console.log(rooms)
  return (
    <>
      {rooms.length > 0 ? (
        <React.Fragment>
          <RoomsList rooms={rooms} />
        </React.Fragment>
      ) : (
        <>
            <Loading message={"Rooms data loading..."}/>
        </>
      )}
    </>
  );
}
