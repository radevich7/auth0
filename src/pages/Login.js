import React, { useState } from "react";

import Container from "react-bootstrap/Container";

import SignIn from "../features/authentication/components/SignIn";
import ForgetPassword from "../features/authentication/components/ForgetPassword";
import styles from "../../src/App.module.css";
import SignUp from "../features/authentication/components/SignUp";

function Login() {
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  return (
    <>
      <Container fluid className={styles.login_container}>
        {!showSignUpForm ? (
          <SignIn
            onShowForgotPasswordModal={() =>
              setShowForgotPasswordModal(!showForgotPasswordModal)
            }
            onShowSignUpForm={() => setShowSignUpForm(!showSignUpForm)}
          />
        ) : (
          <SignUp
            onShowSignUpForm={() => setShowSignUpForm(!showSignUpForm)}
            showSignUpForm={showSignUpForm}
          />
        )}
        <ForgetPassword
          show={showForgotPasswordModal}
          onHandleShow={() =>
            setShowForgotPasswordModal(!showForgotPasswordModal)
          }
        />
      </Container>
    </>
  );
}

export default Login;
