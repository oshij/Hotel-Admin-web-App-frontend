import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import emailjs from 'emailjs-com';
import { API_URL } from "../constants";

function BookingForm({ isAdmin }) {
  const [email, setEmail] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, roomNumber, startTime, endTime };
    try {
      const bookrooms = await fetch(`${API_URL}/api/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (bookrooms.status === 201) {
        setMessage('Room booked successfully!');
        sendEmail();
      } else {
        setMessage('Room is pre-booked!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendEmail = () => {
    const templateParams = {
      to_email: email,
      room_number: roomNumber,
      start_time: startTime,
      end_time: endTime,
    };

    emailjs.send(
      '<service_b6c0dfo>',
      '<template_1tfdzyc>',
      templateParams,
      '<L5IMoizfYXzYS4MgV3Uue>'
    ).then((response) => {
      console.log('SUCCESS!', response.status, response.text);
    }, (error) => {
      console.log('FAILED...', error);
    });
  }

  return (
    <div>
      <Form onSubmit={handleSubmit} style={{ margin: '50px', padding: '50px' }}>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="roomNumber">
          <Form.Label>Room number</Form.Label>
          <Form.Control type="text" placeholder="Enter room number" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="startTime">
          <Form.Label>Start time</Form.Label>
          <Form.Control type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="endTime">
          <Form.Label>End time</Form.Label>
          <Form.Control type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </Form.Group>

        <Button variant="primary" type="submit">Submit</Button>
      </Form>
      {message && (
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: '#FEEFB3',
            color: '#333',
            padding: '1em',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {message}
        </div>
      )}
      {isAdmin && <a href="/bookings">Go to booking</a>}
    </div>
  );
}

export default BookingForm;
