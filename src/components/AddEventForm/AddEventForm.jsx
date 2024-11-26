import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

const AddEventForm = () => {
  //   const LOCAL_HOST = "http://localhost:8080";
  const [eventFormData, setEventFormData] = useState({
    title: "",
    description: "",
    location: "",
    capacity: 0,
    event_date: "",
    time: "",
  });

  const [coverPhoto, setCoverPhoto] = useState(null);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setEventFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setCoverPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEventData = new FormData();
    for (const key in eventFormData) {
      newEventData.append(key, eventFormData[key]);
    }
    if (coverPhoto) {
      newEventData.append("cover_photo", coverPhoto);
    }
    postNewEvent(newEventData);
  };

  async function postNewEvent(newEvent) {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const data = await axios.post(
        `${import.meta.env.VITE_LOCALHOST}/events`,
        newEvent,
        config
      );
      console.log(data);
    } catch (err) {
      console.error("error message:", err.response?.data || err.message);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          placeholder="Event Title"
          value={eventFormData.title}
          onChange={handleChange}
        ></Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="description"
          placeholder="Event Description"
          value={eventFormData.description}
          onChange={handleChange}
        ></Form.Control>
      </Form.Group>
      <div className="d-flex gap-3">
        <Form.Group className="mb-3 flex-grow-1" controlId="location">
          <Form.Label>Event Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            placeholder="Event Location"
            value={eventFormData.location}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3 flex-grow-0.5" controlId="capacity">
          <Form.Label>Max Capacity</Form.Label>
          <Form.Control
            type="number"
            name="capacity"
            placeholder="0"
            value={eventFormData.capacity}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
      </div>
      <div className="d-flex gap-3">
        <Form.Group className="mb-3 flex-grow-1" controlId="event_date">
          <Form.Label>Event Date</Form.Label>
          <Form.Control
            type="date"
            name="event_date"
            value={eventFormData.event_date}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3 flex-grow-1" controlId="time">
          <Form.Label>Event Time</Form.Label>
          <Form.Control
            type="time"
            name="time"
            value={eventFormData.time}
            onChange={handleChange}
          ></Form.Control>
        </Form.Group>
      </div>
      <Form.Group className="mb-3" controlId="cover_photo">
        <Form.Label>Upload a cover photo for this event:</Form.Label>
        <Form.Control
          type="file"
          name="cover_photo"
          onChange={handleFileChange}
        ></Form.Control>
      </Form.Group>
      {/* <img src="../"></img> */}
      <Button type="submit" className="d-block mx-auto w-50">
        Create Event
      </Button>
    </Form>
  );
};

export default AddEventForm;
