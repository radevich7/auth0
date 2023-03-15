import React, { useState, useRef } from "react";
import { Form, Container } from "react-bootstrap";

import styles from "./SignUp.module.css";

import FormInputCustom from "../../../components/ui/FormInputCustom";
import ButtonCustom from "../../../components/ui/ButtonCustom";

import { registrationInputs } from "../services/inputs";
import { signUpService } from "../services/authService";
import ToastCustom from "../../../components/ui/ToastCustom";

const SignUp = (props) => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });
  const [signUpStatus, setSignUpStatus] = useState({
    isError: false,
    message: "",
  });

  const signUpFormRef = useRef();

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const inputReset = (value) => {};

  const handleSubmit = (event) => {
    event.preventDefault();
    signUpService(values, setSignUpStatus);
    console.log(values);
  };
  const resetFormTostOnClose = () => {
    setSignUpStatus({
      isError: false,
      message: "",
    });
    setValues({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      birthday: "",
      password: "",
      confirmPassword: "",
    });
    signUpFormRef.current.reset();
  };

  return (
    <Container className={`row align-items-center ${styles.signup_container}`}>
      <div className={`col-sm ${styles.signup_logo}`}></div>
      <Form
        ref={signUpFormRef}
        onSubmit={handleSubmit}
        className="col-sm  ps-5 pe-5 d-flex flex-column"
      >
        <h1 className="text-center mb-4">Member Registration</h1>

        {registrationInputs.map((input) => (
          <Form.Group className="mb-4 position-relative" key={input.id}>
            <FormInputCustom
              {...input}
              value={values}
              onChange={onChange}
              onInputReset={inputReset}
            />
          </Form.Group>
        ))}
        <ButtonCustom
          label={"Register"}
          variant={"info"}
          classNameStyles={"login_btn"}
          className={"mt-2"}
          size={"xl"}
          type={"submit"}
        />
        <ButtonCustom
          type={"button"}
          classNameStyles={"login_btn"}
          label={"back"}
          variant={"light"}
          onClick={props.onShowSignUpForm}
        />
        <ToastCustom
          position={"top-end"}
          bg={"danger"}
          autohide={false}
          bodyText={signUpStatus.message}
          closeButton={true}
          classNameBody={"text-white p-4"}
          show={signUpStatus.isError}
          onClose={resetFormTostOnClose}
        />
      </Form>
    </Container>
  );
};

export default SignUp;
