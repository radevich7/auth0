import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { forgotPasswordInputs } from "../services/inputs";
import { changePasswordService } from "../services/authService";
import CustomFormInput from "../../../components/ui/CustomFormInput";
import CustomButton from "../../../components/ui/CustomButton";

import styles from "./ForgetPassword.module.css";
const ForgetPassword = (props) => {
  const [email, setEmail] = useState("");
  const [passwordResetStatus, setPasswordResetStatus] = useState({
    isSuccess: false,
    isError: false,
    message: "",
  });
  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changePasswordService(email, setPasswordResetStatus, setEmail);
  };

  const handleCloseModal = () => {
    props.onHandleShow();
    setTimeout(() => {
      setPasswordResetStatus({ isSuccess: false, isError: false, message: "" });
    }, 300);
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
            {!passwordResetStatus.isSuccess &&
              forgotPasswordInputs.map((input) => (
                <Form.Group className="mb-3" key={input.id}>
                  <CustomFormInput {...input} onChange={onChange} />
                </Form.Group>
              ))}

            {(passwordResetStatus.isSuccess || passwordResetStatus.isError) && (
              <span
                className={
                  !passwordResetStatus.isError ? styles.success : styles.error
                }
              >
                {passwordResetStatus.message}
              </span>
            )}

            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                className="me-1"
                onClick={handleCloseModal}
              >
                Close
              </Button>
              {!passwordResetStatus.isSuccess && (
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
