import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import arrowLeftIcon from "../../assets/icons/arrow-left.svg";

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
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

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

  const handleBackClick = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      // console.log(true);
      const newEventData = new FormData();
      for (const key in eventFormData) {
        newEventData.append(key, eventFormData[key]);
      }

      if (coverPhoto) {
        newEventData.append("cover_photo", coverPhoto);
      }

      postNewEvent(newEventData);
    }
    setValidated(true);
  };

  async function postNewEvent(newEvent) {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const data = await axios.post(
        `${import.meta.env.VITE_LOCALHOST}/events`,
        newEvent,
        config
      );
    } catch (err) {
      console.error("error message:", err.response?.data || err.message);
    }
  }

  return (
    <div className="px-5 pt-4 bg-body-tertiary min-vh-100">
      <div className="d-flex justify-content-center gap-3 pb-4">
        <img
          src={arrowLeftIcon}
          width="30"
          alt="left-arrow"
          role="button"
          onClick={handleBackClick}
        />
        <h1 className="text-center">Create New Event</h1>
      </div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Event Title"
            value={eventFormData.title}
            onChange={handleChange}
            required
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Field is required.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            placeholder="Event Description"
            value={eventFormData.description}
            onChange={handleChange}
            required
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Field is required.
          </Form.Control.Feedback>
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
              required
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Field is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3 flex-grow-0.5" controlId="capacity">
            <Form.Label>Max Capacity</Form.Label>
            <Form.Control
              type="number"
              name="capacity"
              placeholder="0"
              value={eventFormData.capacity}
              onChange={handleChange}
              required
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Field is required.
            </Form.Control.Feedback>
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
              required
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Field is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3 flex-grow-1" controlId="time">
            <Form.Label>Event Time</Form.Label>
            <Form.Control
              type="time"
              name="time"
              value={eventFormData.time}
              onChange={handleChange}
              required
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Field is required.
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <Form.Group className="mb-3" controlId="cover_photo">
          <Form.Label>Upload a cover photo for this event:</Form.Label>
          <Form.Control
            type="file"
            name="cover_photo"
            onChange={handleFileChange}
            required
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Field is required.
          </Form.Control.Feedback>
          {coverPhoto && (
            <img
              src={URL.createObjectURL(coverPhoto)}
              alt="Cover Preview"
              className="mt-3"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          )}
        </Form.Group>
        {/* <img src="../"></img> */}
        <Button type="submit" className="d-block mx-auto w-50">
          Create Event
        </Button>
      </Form>
    </div>
  );
};

export default AddEventForm;
