import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  ListGroup,
  Button,
  Container,
  Stack,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import EventCard from "../EventCard/EventCard";

const EventCalendar = () => {
  const [eventData, setEventData] = useState([]);

  async function getEventData() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/events`
      );
      setEventData(response.data);
    } catch (err) {
      console.error(`Error getting event details: ${err}.`);
    }
  }

  useEffect(() => {
    getEventData();
  }, []);

  return (
    <div className="p-3">
      {/* <h1 className="text-center mb-3">Events Manager</h1>
      <div className="justify-content-center d-flex gap-3 py-3 mb-3">
        <Button className="btn-warning">
          <Link
            to="/addevent"
            style={{ color: "black", textDecoration: "none" }}
          >
            New Event
          </Link>
        </Button>
        <Button className="btn-info">
          <Link
            to="/attendees/add"
            style={{ color: "black", textDecoration: "none" }}
          >
            New Attendee
          </Link>
        </Button>
        <Button className="btn-info">
          <Link
            to="/attendees"
            style={{ color: "black", textDecoration: "none" }}
          >
            View Attendees
          </Link>
        </Button>
      </div> */}
      <h2 className="text-center pb-2">All Events</h2>
      <div className="px-4 d-flex gap-4 flex-wrap justify-content-center">
        {eventData
          .sort((a, b) => new Date(a.event_date) - new Date(b.event_date))
          .map((event) => (
            <EventCard key={event.event_id} props={event} />
          ))}
      </div>
    </div>
  );
};

export default EventCalendar;
