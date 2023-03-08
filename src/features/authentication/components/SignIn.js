import { useRef, useState } from "react";

import styles from "./SignIn.module.css";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { loginService } from "../services/authService";

import ButtonCustom from "../../../components/ui/ButtonCustom";
import FormInputCustom from "../../../components/ui/FormInputCustom";
import ToastCustom from "../../../components/ui/ToastCustom";

import { signInInputs } from "../services/inputs";

function SignIn(props) {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [loginStatus, setloginStatus] = useState({
    isError: false,
    message: "",
  });
  const signInFormRef = useRef();

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    loginService(values, setloginStatus);
  };

  const resetFormTostOnClose = () => {
    setloginStatus({
      isError: false,
      message: "",
    });
    setValues({
      email: "",
      password: "",
    });
    signInFormRef.current.reset();
  };

  return (
    <Container className={`row align-items-center ${styles.signin_container}`}>
      <div className={`col-sm ${styles.signin_logo}`}></div>
      <Form
        ref={signInFormRef}
        onSubmit={handleSubmit}
        className="col-sm  ps-5 pe-5"
      >
        <h1 className="text-center mb-4">Member Login</h1>

        {signInInputs.map((input) => (
          <Form.Group className="mb-4 position-relative" key={input.id}>
            <FormInputCustom
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          </Form.Group>
        ))}

        <ButtonCustom
          label={"Login"}
          variant={"info"}
          classNameStyles={"login_btn"}
          className={"mt-2"}
          size={"xl"}
          type={"submit"}
        />
        <ButtonCustom
          type={"button"}
          classNameStyles={"forgot_btn"}
          label={"Forgot Username/Password?"}
          variant={"light"}
          onClick={props.onHandleShow}
        />
        <ToastCustom
          position={"top-end"}
          bg={"danger"}
          autohide={false}
          bodyText={loginStatus.message}
          closeButton={true}
          classNameBody={"text-white p-4"}
          show={loginStatus.isError}
          onClose={resetFormTostOnClose}
        />
      </Form>
    </Container>
  );
}

export default SignIn;
