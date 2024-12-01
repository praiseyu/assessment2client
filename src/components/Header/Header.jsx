import { Nav, Button } from "react-bootstrap";
import { Link, NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  return (
    <>
      <h1 className="text-center py-4">Events Manager</h1>
      <div className="justify-content-center d-flex gap-3 pb-4">
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
      </div>
      <Nav justify variant="tabs" activeKey={location.pathname}>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/events" eventKey="/events">
            Events
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/attendees" eventKey="link-2">
            Attendees
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default Header;
