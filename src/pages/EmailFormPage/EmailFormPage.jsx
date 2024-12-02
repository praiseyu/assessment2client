import { Form, Button, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import arrowLeftIcon from "../../assets/icons/arrow-left.svg";

const EmailFormPage = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const [emailFormData, setEmailFormData] = useState({
    subject: "",
    message: "",
  });
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleBackClick = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setEmailFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      sendEmailToEventAttendees(emailFormData);
      setShow(true);
      setTimeout(() => {
        setShow(false);
        navigate(`/events/${eventId}`);
      }, 3000);
    }
    setValidated(true);
  };

  async function sendEmailToEventAttendees(email) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_LOCALHOST}/events/${eventId}/attendees`,
        email
      );
      setModalMessage("Emails successfully sent to attendees.");
    } catch (err) {
      console.error("error message:", err.response?.data || err.message);
      setModalMessage("Emails were not sent. Try again.");
    }
  }

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
        <h1 className="text-center">Email All Attendees for Event {eventId}</h1>
      </div>

      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="col-6 mx-auto"
      >
        <Form.Group className="mb-3" controlId="subject">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            placeholder="Subject"
            onChange={handleChange}
            required
            value={emailFormData.subject}
            name="subject"
          />
          <Form.Control.Feedback type="invalid">
            Please enter a subject name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="message">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            onChange={handleChange}
            required
            placeholder="Write your message here."
            style={{ height: "200px", resize: "none" }}
            value={emailFormData.message}
            name="message"
          />
          <Form.Control.Feedback type="invalid">
            A message is required.
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Send Emails
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

export default EmailFormPage;
