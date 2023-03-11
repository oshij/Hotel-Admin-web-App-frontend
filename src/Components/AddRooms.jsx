import { useState } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";

const AddRoomForm = () => {
  const [roomNumber, setRoomNumber] = useState("");
  const [occupancy, setOccupancy] = useState("");
  const [roomType, setRoomType] = useState("SINGLE");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addRoom = async () => {
      const response = await fetch("http://localhost:5000/api/room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomNumber,occupancy,price,type:roomType,image }),
      });
      if (response.ok) {
        setMessage("Room added successfully.");
      }
    };
    await addRoom();
  };

  return (
    <div className="container my-5 pt-5">
      <h2>Add a Room</h2>
      {message && <Alert variant="success">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="roomNumber">
            <Form.Label>Room Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter room number"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="occupancy">
            <Form.Label>Occupancy</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter occupancy"
              value={occupancy}
              onChange={(e) => setOccupancy(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="roomType">
            <Form.Label>Room Type</Form.Label>
            <Form.Control
              as="select"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
            >
              <option value="SINGLE">Single Room</option>
              <option value="DOUBLE">Double Room</option>
              <option value="DELUXE">Deluxe Room</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="image">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Add Room
        </Button>
      </Form>
    </div>
  );
};

export default AddRoomForm;
