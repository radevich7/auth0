import React, { useState } from "react";
import auth0 from "auth0-js";
import { Modal, Button, Form } from "react-bootstrap";
import { forgotPasswordInputs } from "../services/inputs";
import CustomFormInput from "../../../components/ui/CustomFormInput";
import CustomButton from "../../../components/ui/CustomButton";

import styles from "./ForgetPassword.module.css";
const ForgetPassword = (props) => {
  const [email, setEmail] = useState(null);
  const [passwordResetStatus, setPasswordResetStatus] = useState({
    status: false,
    message: "",
  });
  const onChange = (e) => {
    setEmail(e.target.value);
  };
  const webAuth = new auth0.WebAuth({
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
    scope: process.env.REACT_APP_AUTH0_SCOPE,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    webAuth.changePassword(
      {
        connection: "Username-Password-Authentication",
        email: email,
      },
      function (err, resp) {
        if (err) {
          setPasswordResetStatus({ status: false, message: err });
        } else {
          setPasswordResetStatus({ status: true, message: resp });
        }
      }
    );
  };
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
            {!passwordResetStatus.status &&
              forgotPasswordInputs.map((input) => (
                <Form.Group className="mb-3" key={input.id}>
                  <CustomFormInput {...input} onChange={onChange} />
                </Form.Group>
              ))}

            {passwordResetStatus.status && (
              <span
                className={
                  passwordResetStatus.status ? styles.success : styles.error
                }
              >
                {passwordResetStatus.message}
              </span>
            )}

            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                className="me-1"
                onClick={props.onHandleShow}
              >
                Close
              </Button>
              {!passwordResetStatus.status && (
                <CustomButton
                  label={"Submit"}
                  variant={"info"}
                  className={"submit-btn"}
                  size={"xl"}
                  type={"submit"}
                />
              )}
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ForgetPassword;
