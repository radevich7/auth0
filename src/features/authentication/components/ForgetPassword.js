import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ForgetPassword = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your forget password logic here
  };
  console.log(props.show);
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHandleShow}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHandleShow}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ForgetPassword;
