import { Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import EventCalendar from "../../components/EventCalendar/EventCalendar";
import Header from "../../components/Header/Header";

const LandingPage = () => {
  return (
    <>
      <Header />
      <EventCalendar />
    </>
  );
};

export default LandingPage;
