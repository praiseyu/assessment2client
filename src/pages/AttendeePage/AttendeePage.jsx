import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import arrowLeftIcon from "../../assets/icons/arrow-left.svg";
import axios from "axios";
import AddAttendeeForm from "../AddAttendeeForm/AddAttendeeForm";

const AttendeePage = () => {
  const navigate = useNavigate();
  const { attendeeId } = useParams();
  const [initialData, setInitialData] = useState(null);

  const getOneAttendeeById = async (attendeeId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_LOCALHOST}/attendees/${attendeeId}`
    );
    if (response.data) {
      setInitialData(response.data);
    }
  };

  useEffect(() => {
    const getOneAttendee = async () => {
      if (attendeeId) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_LOCALHOST}/attendees/${attendeeId}`
          );
          setInitialData(response.data);
        } catch (err) {
          console.error(
            `Error fetching attendee with ID: ${attendeeId}: ${err.message}.`
          );
        }
      }
    };
    getOneAttendee();
  }, [attendeeId]);

  if (!attendeeId) {
    return <AddAttendeeForm />;
  } else {
    return (
      initialData && (
        <AddAttendeeForm
          isEditing={true}
          initialData={initialData}
          attendeeId={attendeeId}
        />
      )
    );
  }
};

export default AttendeePage;
