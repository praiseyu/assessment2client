import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import EventCard from "../EventCard/EventCard";

const EventCalendar = () => {
  const [eventData, setEventData] = useState([]);
  const location = useLocation();

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

  const today = new Date();
  const eventsToDisplay =
    location.pathname === "/"
      ? eventData
          .filter((event) => new Date(event.event_date) >= today)
          .sort((a, b) => new Date(a.event_date) - new Date(b.event_date))
          .slice(0, 6)
      : eventData.sort(
          (a, b) => new Date(a.event_date) - new Date(b.event_date)
        );

  return (
    <div className="p-3 bg-body-tertiary mx-2">
      <h2 className="text-center pb-2">
        {location.pathname === "/" ? "Upcoming Events" : "All Events"}
      </h2>
      <div className="px-4 d-flex gap-4 flex-wrap justify-content-center">
        {eventsToDisplay.map((event) => (
          <EventCard key={event.event_id} props={event} />
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
