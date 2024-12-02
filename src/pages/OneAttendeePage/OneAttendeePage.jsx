import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, ListGroup, Modal, FormCheck } from "react-bootstrap";
import axios from "axios";
import leftArrowIcon from "../../assets/icons/arrow-left.svg";

const OneAttendeePage = () => {
  const { attendeeId } = useParams();
  const [attendeeData, setAttendeeData] = useState(null);
  const [allEvents, setAllEvents] = useState(null);
  const [availableEvents, setAvailableEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEventIds, setSelectedEventIds] = useState([]);
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/attendees");
  };

  async function fetchAttendeeAndEvents() {
    try {
      const attendeeResponse = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/attendees/${attendeeId}`
      );
      setAttendeeData(attendeeResponse.data);
      const allEvents = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/events`
      );
      setAllEvents(allEvents.data);
      const assignedEventIds = new Set(
        attendeeResponse.data.events.map((event) => event.event_id)
      );
      const filteredEvents = allEvents.data.filter(
        (event) => !assignedEventIds.has(event.event_id)
      );
      setAvailableEvents(filteredEvents);
    } catch (err) {
      console.error(`Error retrieving attendee data: ${err}.`);
    }
  }

  const handleAssignEvents = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_LOCALHOST}/attendees/${attendeeId}/events`,
        { eventIds: selectedEventIds }
      );
      alert("Events assigned successfully!");
      setShowModal(false);
      fetchAttendeeAndEvents();
    } catch (err) {
      console.error(`Error assigning events: ${err}`);
    }
  };

  useEffect(() => {
    fetchAttendeeAndEvents();
  }, [attendeeId]);

  if (!attendeeData) {
    return <p>Loading...</p>;
  }
  const events = attendeeData.events;
  return (
    <article className="p-3 bg-body-tertiary min-vh-100">
      <div className="d-flex justify-content-center gap-5">
        <img
          src={leftArrowIcon}
          width="40"
          role="button"
          onClick={handleBackClick}
        />
        <div>
          <h1 className="text-center">
            {attendeeData.firstName + " " + attendeeData.lastName}
          </h1>
          <p className="text-center">{attendeeData.email}</p>
        </div>
      </div>
      <h2 className="ps-3 pt-4">Event Attendance</h2>
      <ListGroup className="pb-4 pt-2">
        <ListGroup.Item className="d-flex bg-primary-subtle">
          <div className="col-1 fw-semibold">ID #</div>
          <div className="col-3 fw-semibold">Title</div>
          <div className="col-4 fw-semibold">Location</div>
          <div className="col-3 fw-semibold">Date</div>
          <div className="col-1 fw-semibold">Time</div>
        </ListGroup.Item>
        {events.map((event) => (
          <ListGroup.Item className="d-flex" key={event.event_id}>
            <div className="col-1">{event.event_id}</div>
            <div className="col-3">{event.title}</div>
            <div className="col-4">{event.location}</div>
            <div className="col-3">
              {new Date(event.event_date).toDateString()}
            </div>
            <div className="col-1">{event.time.slice(0, 5)}</div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Button className="btn-primary" onClick={() => setShowModal(true)}>
        Add Events To Attendee
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select Events</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {availableEvents.length > 0 ? (
            availableEvents.map((event) => (
              <FormCheck
                key={event.event_id}
                type="checkbox"
                label={event.title}
                value={event.event_id}
                onChange={(e) => {
                  const eventId = parseInt(e.target.value, 10);
                  setSelectedEventIds((prev) =>
                    e.target.checked
                      ? [...prev, eventId]
                      : prev.filter((id) => id !== eventId)
                  );
                }}
              />
            ))
          ) : (
            <p>No available events to assign.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAssignEvents}>
            Assign Events
          </Button>
        </Modal.Footer>
      </Modal>
    </article>
  );
};

export default OneAttendeePage;
