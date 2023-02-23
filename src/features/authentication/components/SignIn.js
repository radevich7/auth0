import { useState } from "react";
import styles from "./SignIn.module.css";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import CustomButton from "../../../components/ui/CustomButton";
import CustomFormInput from "../../../components/ui/CustomFormInput";

import { signInInputs } from "../services/inputs";

function SignIn(props) {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  console.log(values);
  return (
    <Container className={`row align-items-center ${styles.signin_container}`}>
      <div className={`col-sm ${styles.signin_logo}`}></div>
      <Form className="col-sm  ps-5 pe-5">
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
