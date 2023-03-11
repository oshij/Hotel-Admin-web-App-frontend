import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { API_URL } from "../constants";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await fetch(`${API_URL}/api/booking`);
      const data = await response.json();
      setBookings(data);
    };
    fetchBookings();
  }, []);

  const handleEditBooking = async (bookingId) => {
    const booking = bookings.find((b) => b._id === bookingId);
    const email = prompt(`Enter new email (current: ${booking.email}):`, booking.email);
    const roomNumber = prompt(`Enter new room number (current: ${booking.roomNumber}):`, booking.roomNumber);
    const startTime = prompt(`Enter new start time (current: ${booking.startTime}):`, booking.startTime);
    const endTime = prompt(`Enter new end time (current: ${booking.endTime}):`, booking.endTime);

    if (email || roomNumber || startTime || endTime) {
      const confirmed = window.confirm("Are you sure you want to update the booking with the new details and price?");
      if (confirmed) {
        const response = await fetch(`${API_URL}/api/booking/${bookingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email || booking.email,
            roomNumber: roomNumber || booking.roomNumber,
            startTime: startTime || booking.startTime,
            endTime: endTime || booking.endTime,
            confirmed: true,
          }),
        });

        if (response.ok) {
          const updatedBooking = await response.json();
          setBookings(bookings.map((b) => (b._id === bookingId ? updatedBooking : b)));
          alert("Booking updated successfully!");
        } else {
          alert("Failed to update booking.");
        }
      }
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    const confirmed = window.confirm("Are you sure you want to cancel the booking?");
  
    if (confirmed) {
      const response = await fetch(`${API_URL}/api/booking/${bookingId}/cancel`, {
        method: "POST",
      });
  
      if (response.ok) {
        const { refund_amount } = await response.json();
        const updatedBookings = bookings.map((b) => {
          if (b._id === bookingId) {
            return {
              ...b,
              status: "Cancelled",
              refund_amount: refund_amount
            };
          }
          return b;
        });
        setBookings(updatedBookings);
        if (refund_amount === 0) {
          alert("Booking cancelled.");
        } else if (refund_amount === -1) {
          alert("Failed to cancel booking.");
        } else {
          alert(`Booking cancelled. Refund amount: ${refund_amount}`);
        }
      } else {
        alert("Failed to cancel booking.");
      }
    }
  };
  
  
  return (
    <div className="my-5 pt-4">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Room Number</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Price</th>
            <th>Status</th>
            <th>REFUND</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>

        </thead>
        <tbody>
  {bookings.map((booking) => (
    <tr key={booking._id}>
      <td>{booking._id}</td>
      <td>{booking.email}</td>
      <td>{booking.roomNumber}</td>
      <td>{booking.startTime}</td>
      <td>{booking.endTime}</td>
      <td>{booking.price}</td>
      <td>{booking.status}</td>
      <td>{booking.refund_amount === -1 ? "N/A" : `$${booking.refund_amount}`}</td>
      <td>
        <Button variant="primary" onClick={() => handleEditBooking(booking._id)}>Edit</Button>
      </td>
      <td>
        <Button variant="primary" onClick={() => handleDeleteBooking(booking._id)}>DELETE</Button>
      </td>
    </tr>
  ))}
</tbody>

      </Table>
    </div>
  );
};

export default BookingList;
