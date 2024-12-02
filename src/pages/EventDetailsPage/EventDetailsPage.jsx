import { Button, Image, ListGroup } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PhotosUploadForm from "../../components/PhotosUploadForm/PhotosUploadForm";
import arrowLeftIcon from "../../assets/icons/arrow-left.svg";
import PhotoGallery from "../../components/PhotoGallery/PhotoGallery";

const EventDetailsPage = () => {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState({});
  const [eventPhotos, setEventPhotos] = useState(null);
  const [eventAttendees, setEventAttendees] = useState([]);
  const navigate = useNavigate();

  async function getEventDetails() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/events/${eventId}`
      );
      setEventDetails(response.data);
    } catch (err) {
      console.error(`Error retriving event data: ${err}`);
    }
  }

  async function getEventPhotos() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/events/${eventId}/photos`
      );
      setEventPhotos(response.data);
    } catch (err) {
      console.error(`Error retriving event photos: ${err}`);
    }
  }

  async function getEventAttendees() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/events/${eventId}/attendees`
      );
      setEventAttendees(response.data);
    } catch (err) {
      console.error(`Error retrieving event attendees: ${err}`);
    }
  }

  const handleClickOnEdit = () => {
    navigate(`/events/edit/${eventId}`);
  };

  const handleNavigateToAttendee = (e) => {
    navigate(`/attendees/${e.target.dataset.uid}`);
  };

  const handleBackClick = () => {
    navigate(`/`);
  };

  const handleNavToEmailAttendees = () => {
    navigate(`/events/${eventId}/email-attendees`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_LOCALHOST}/events/${eventId}`);
      alert(`Event with ID #${eventId} succesfully deleted.`);
      navigate("/events");
    } catch (err) {
      console.error(`Error deleting event ${eventId}: ${err}`);
    }
  };

  useEffect(() => {
    getEventDetails();
    getEventPhotos();
    getEventAttendees();
  }, [eventId]);

  if (Object.keys(eventDetails).length === 0 || eventPhotos === null) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <section className="px-3 pt-5 pb-5 text-center bg-body-tertiary">
        <img
          src={arrowLeftIcon}
          width="30"
          alt="left-arrow"
          role="button"
          onClick={handleBackClick}
          className="left-align"
        />
        <h1>{eventDetails.title}</h1>
        <p>
          <span className="fw-semibold">Location: </span>
          {eventDetails.location}
        </p>
        <p>
          <span className="fw-semibold">Date: </span>
          {new Date(eventDetails.event_date).toDateString()}
        </p>
        <p>
          <span className="fw-semibold">Time: </span>
          {eventDetails.time.slice(0, 5)}
        </p>
        <p>{eventDetails.description}</p>
        <div className="w-25 mx-auto mb-4">
          <Image
            src={`${import.meta.env.VITE_LOCALHOST}/${
              eventDetails.cover_photo
            }`}
            fluid
          />
        </div>
        <div className="d-flex justify-content-center gap-3">
          <Button type="button" size="sm" onClick={handleClickOnEdit}>
            Edit Event
          </Button>
          <Button
            type="button"
            size="sm"
            variant="danger"
            onClick={handleDelete}
          >
            Delete Event
          </Button>
        </div>
      </section>
      <section className="px-5 py-4">
        <h2 className="text-center mb-4">Event Attendees</h2>

        {eventAttendees.length > 0 && (
          <div className="text-center">
            <Button className="text-center" onClick={handleNavToEmailAttendees}>
              Email All Attendees
            </Button>
          </div>
        )}

        <p className="text-center fw-semibold mt-4 bg-primary-subtle">
          Total: {eventAttendees.length}
        </p>
        <ListGroup>
          {eventAttendees.map((person) => (
            <ListGroup.Item
              key={person.attendee_id}
              data-uid={person.attendee_id}
              action
              onClick={handleNavigateToAttendee}
            >
              {person.firstName + " " + person.lastName}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </section>
      <section className="text-center px-5 pt-4 pb-5 bg-body-tertiary">
        <h2>Event Photos</h2>
        {eventPhotos && eventPhotos.length > 0 ? (
          <PhotoGallery eventPhotos={eventPhotos} />
        ) : (
          <p>No photos uploaded yet.</p>
        )}

        <PhotosUploadForm eventId={eventDetails.event_id} />
      </section>
    </>
  );
};

export default EventDetailsPage;
