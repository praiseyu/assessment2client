import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const EventCard = ({ props }) => {
  const { event_id, event_date, title, location, description, time } = props;
  const navigate = useNavigate();

  const handleClick = (e) => {
    navigate(`/events/${event_id}`);
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Text className="d-flex justify-content-between bg-primary-subtle py-2 px-3 mb-0">
        {new Date(event_date).toDateString()}
        <span className="text-primary">{time.slice(0, 5)}</span>
      </Card.Text>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{location}</Card.Text>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <Button variant="primary" onClick={handleClick}>
        Event Details
      </Button>
    </Card>
  );
};

export default EventCard;
