import { Button, Form, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import arrowLeftIcon from "../../assets/icons/arrow-left.svg";

const EditEventForm = () => {
  const [eventFormData, setEventFormData] = useState({
    title: "",
    description: "",
    location: "",
    capacity: 0,
    event_date: "",
    time: "",
  });

  const [currentCoverPhoto, setCurrentCoverPhoto] = useState(null);
  const [show, setShow] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const { eventId } = useParams();
  const navigate = useNavigate();

  async function getEventDetails() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/events/${eventId}`
      );
      const eventData = response.data;
      setEventFormData({
        title: eventData.title,
        description: eventData.description,
        location: eventData.location,
        capacity: eventData.capacity,
        event_date: eventData.event_date,
        time: eventData.time,
      });
      setCurrentCoverPhoto(eventData.cover_photo);
    } catch (err) {
      console.error(`Error retriving event data: ${err}`);
    }
  }

  useEffect(() => {
    getEventDetails();
  }, [eventId]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setEventFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBackClick = () => {
    navigate(`/events/${eventId}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = { ...eventFormData }; // Local copy of state
    const formData = new FormData();

    for (const key in updatedFormData) {
      formData.append(key, updatedFormData[key]);
    }

    const newEvent = { ...eventFormData };
    updateEvent(newEvent);
    setShow(true);
    setTimeout(() => {
      setShow(false);
      navigate("/events");
    }, 3000);
  };

  async function updateEvent(newEvent) {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_LOCALHOST}/events/${eventId}`,
        newEvent
      );
      setModalMessage("Event successfully updated.");
    } catch (err) {
      console.error("There was an error updating this event: ", err.message);
      setModalMessage("Event was not updated. Try again.");
    }
  }

  return (
    <div className="p-3 bg-body-tertiary">
      <div className="d-flex justify-content-center gap-3">
        <img
          src={arrowLeftIcon}
          width="30"
          alt="left-arrow"
          role="button"
          onClick={handleBackClick}
        />
        <h1 className="text-center">Edit Event</h1>
      </div>
      <Form onSubmit={handleSubmit} className="py-3">
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
        {currentCoverPhoto && (
          <div className="col-9 mx-auto my-3">
            <img
              className="col-12"
              src={`${import.meta.env.VITE_LOCALHOST}/${currentCoverPhoto}`}
              alt="event cover photo"
            />
          </div>
        )}
        <Button
          type="submit"
          className="bg-primary-emphasis d-block mx-auto w-50"
        >
          Update Event
        </Button>
      </Form>
      <Modal size="sm" show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalMessage}</Modal.Title>
        </Modal.Header>
      </Modal>
    </div>
  );
};

export default EditEventForm;
