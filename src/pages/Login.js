import React, { useState } from "react";

import Container from "react-bootstrap/Container";

import SignIn from "../features/authentication/components/SignIn";
import ForgetPassword from "../features/authentication/components/ForgetPassword";
import styles from "../../src/App.module.css";

function Login() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Container fluid className={styles.login_container}>
        <SignIn onHandleShow={() => setShow(!show)} />
        <ForgetPassword show={show} onHandleShow={() => setShow(!show)} />
      </Container>
    </>
  );
}

export default Login;
