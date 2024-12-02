import { Form, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import arrowLeftIcon from "../../assets/icons/arrow-left.svg";
import axios from "axios";

const AddAttendeeForm = ({
  isEditing = false,
  initialData = {},
  attendeeId,
}) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [attendeeInfo, setAttendeeInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAttendeeInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleBackClick = () => {
    navigate("/attendees");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        if (isEditing) {
          const response = await axios.put(
            `${import.meta.env.VITE_LOCALHOST}/attendees/${attendeeId}`,
            attendeeInfo
          );
          setModalMessage("Attendee updated succesfully.");
        } else {
          const response = await axios.post(
            `${import.meta.env.VITE_LOCALHOST}/attendees`,
            attendeeInfo
          );
          setModalMessage("Attendee created successfully.");
        }
      } catch (err) {
        console.error(
          `Error ${isEditing ? "editing" : "creating"} attendee: ${err.message}`
        );
        setModalMessage("An error occurred. Try again.");
      }
      setShow(true);
      setTimeout(() => {
        setShow(false);
        navigate("/attendees");
      }, 3000);
    }
    setValidated(true);
  };

  useEffect(() => {
    if (isEditing) {
      setAttendeeInfo(initialData);
    }
  }, [isEditing]);

  return (
    <div className="p-4 bg-body-tertiary min-vh-100">
      <div className="d-flex justify-content-center gap-3 pb-4">
        <img
          src={arrowLeftIcon}
          width="30"
          alt="left-arrow"
          role="button"
          onClick={handleBackClick}
        />
        <h1 className="text-center">
          {isEditing ? "Edit Attendee" : "Add New Attendee"}
        </h1>
      </div>

      <Form
        className="col-6 mx-auto"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First Name"
            required
            onChange={handleChange}
            name="firstName"
            value={attendeeInfo.firstName}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last Name"
            required
            onChange={handleChange}
            name="lastName"
            value={attendeeInfo.lastName}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            required
            onChange={handleChange}
            name="email"
            value={attendeeInfo.email}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a name.
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          {isEditing ? "Update Attendee" : "Create Attendee"}
        </Button>
      </Form>
      <Modal size="sm" show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalMessage}</Modal.Title>
        </Modal.Header>
      </Modal>
    </div>
  );
};

export default AddAttendeeForm;
