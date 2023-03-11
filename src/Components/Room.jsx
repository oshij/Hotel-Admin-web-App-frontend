import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const RoomCard = ({ room }) => {
  const {roomNumber, price, occupancy, type, image} = room
  const navigate = useNavigate();
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{type} - Room {roomNumber}</Card.Title>
        <Card.Text>
          <strong>Price:</strong> {price}<br />
          <strong>Occupancy:</strong> {occupancy}
        </Card.Text>
        <Button variant="primary" onClick={() => navigate("/bookRoom")}>Book</Button>
      </Card.Body>
    </Card>
  );
};

export default RoomCard;
