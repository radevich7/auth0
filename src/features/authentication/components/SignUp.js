import React, { useState, useRef } from "react";
import { Form, Container } from "react-bootstrap";

import styles from "./SignUp.module.css";

import FormInputCustom from "../../../components/ui/FormInputCustom";
import ButtonCustom from "../../../components/ui/ButtonCustom";

import { registrationInputs } from "../services/inputs";

const SignUp = (props) => {
  const [values, setValues] = useState({
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });

  console.log(values);
  const signInFormRef = useRef();

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
  };

  return (
    <Container className={`row align-items-center ${styles.signup_container}`}>
      <div className={`col-sm ${styles.signup_logo}`}></div>
      <Form
        ref={signInFormRef}
        onSubmit={handleSubmit}
        className="col-sm  ps-5 pe-5 d-flex flex-column"
      >
        <h1 className="text-center mb-4">Member Login</h1>

        {registrationInputs.map((input) => (
          <Form.Group className="mb-4 position-relative" key={input.id}>
            <FormInputCustom {...input} value={values} onChange={onChange} />
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
      </Form>
    </Container>
  );
};

export default SignUp;
