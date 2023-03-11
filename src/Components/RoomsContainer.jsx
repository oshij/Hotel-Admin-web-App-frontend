import React, { useState, useEffect } from "react";
import RoomsList from "./RoomsList";
import Loading from "./Loading";
import { API_URL } from "../constants";


export default function RoomsContainer() {
  useEffect(()=>{
    fetchRooms();
   
},[]);
const [rooms,setRooms]=useState([]);

const fetchRooms=async() => {
    const fetchRooms=await fetch(`${API_URL}/api/room`)
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
