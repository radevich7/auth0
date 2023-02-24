import { useState } from "react";
import auth0 from "auth0-js";

import styles from "./SignIn.module.css";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import CustomButton from "../../../components/ui/CustomButton";
import CustomFormInput from "../../../components/ui/CustomFormInput";

import { signInInputs } from "../services/inputs";

function SignIn(props) {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  // AUTH0
  const webAuth = new auth0.WebAuth({
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
    scope: process.env.REACT_APP_AUTH0_SCOPE,
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    webAuth.login(
      {
        username: values.email,
        password: values.password,
        realm: process.env.REACT_APP_AUTH0_REALM,
        redirectUri: process.env.REACT_APP_AUTH0_REDIRECT_URI,
        responseType: process.env.REACT_APP_AUTH0_LOGIN_RESPONSE_TYPE,
      },
      (error) => console.log(error)
    );
  };

  return (
    <Container className={`row align-items-center ${styles.signin_container}`}>
      <div className={`col-sm ${styles.signin_logo}`}></div>
      <Form onSubmit={handleSubmit} className="col-sm  ps-5 pe-5">
        <h1 className="text-center mb-4">Member Login</h1>

        {signInInputs.map((input) => (
          <Form.Group className="mb-3" key={input.id}>
            <CustomFormInput
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          </Form.Group>
        ))}
        <CustomButton
          label={"Login"}
          variant={"info"}
          className={"login_btn"}
          size={"xl"}
          type={"submit"}
        />
        <CustomButton
          className={"forgot_btn"}
          label={"Forgot Username/Password?"}
          variant={"light"}
          onClick={props.onHandleShow}
        />
      </Form>
    </Container>
  );
}

export default SignIn;
