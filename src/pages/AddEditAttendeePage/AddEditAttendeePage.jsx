import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AddAttendeeForm from "../AddAttendeeForm/AddAttendeeForm";

const AddEditAttendeePage = () => {
  const { attendeeId } = useParams();
  const [initialData, setInitialData] = useState(null);

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

export default AddEditAttendeePage;
