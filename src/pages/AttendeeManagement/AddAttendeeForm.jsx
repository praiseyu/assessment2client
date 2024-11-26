import React from "react";
import { Form, Button } from "react-bootstrap";

// add axios post form

const AddAttendeeForm = () => {
  return (
    <div className="p-4">
      <h1 className="text-center mb-4">Add New Attendee</h1>
      <Form className="col-6 mx-auto">
        <Form.Group className="mb-3" controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="First Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Last Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="Email" />
        </Form.Group>

        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button variant="primary" type="submit" className="w-100">
          Create Attendee
        </Button>
      </Form>
    </div>
  );
};

export default AddAttendeeForm;
