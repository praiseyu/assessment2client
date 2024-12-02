import Header from "../../components/Header/Header";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AllAttendeesPage = () => {
  const [attendeeData, setAttendeeData] = useState([]);
  const navigate = useNavigate();

  const handleNavigateToAttendee = (e) => {
    navigate(`/attendees/${e.currentTarget.dataset.uid}`);
  };

  const handleNavToEditAttendee = (attendeeId) => {
    navigate(`/attendees/${attendeeId}/edit`);
  };

  const handleDeleteClick = async (attendeeId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_LOCALHOST}/attendees/${attendeeId}`
      );
    } catch (err) {
      console.error(`Error deleting attendee ${attendeeId}: ${err}.`);
    }
  };

  async function getAllAttendees() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/attendees`
      );
      setAttendeeData(response.data);
    } catch (err) {
      console.error(`Error retrieving attendee data: ${err}.`);
    }
  }
  useEffect(() => {
    getAllAttendees();
  }, []);

  if (attendeeData.length === 0) {
    return <p>Loading</p>;
  }

  return (
    <div>
      <Header />
      <div className="p-3 mx-2 bg-light">
        <h1 className="text-center">All Attendees</h1>
        <div className="list-group">
          {attendeeData.map((person) => (
            <div
              key={person.attendee_id}
              className="d-flex list-group-item align-items-center"
            >
              <a
                data-uid={person.attendee_id}
                href={`/attendees/${person.attendee_id}`}
                onClick={handleNavigateToAttendee}
                className="flex-grow-1 text-decoration-none text-black"
              >
                <div className="d-flex">
                  <div className="col-1">{person.attendee_id}</div>
                  <div className="col-4">
                    {person.firstName + " " + person.lastName}
                  </div>
                  <div className="col-5">{person.email}</div>
                </div>
              </a>
              <div className="col-2 d-flex gap-3 z-3">
                <Button
                  className="btn-primary"
                  size="sm"
                  onClick={() => {
                    handleNavToEditAttendee(person.attendee_id);
                  }}
                >
                  Edit
                </Button>
                <Button
                  className="btn-danger"
                  size="sm"
                  onClick={() => {
                    handleDeleteClick(person.attendee_id);
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllAttendeesPage;
