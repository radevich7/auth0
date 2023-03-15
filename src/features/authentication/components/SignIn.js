import styles from "./SignIn.module.css";
import { Container } from "react-bootstrap";
import { getAuthCodeHref } from "../services/authService";

// import ButtonCustom from "../../../components/ui/ButtonCustom";

function SignIn(props) {
  const authHref = getAuthCodeHref();
  return (
    <Container className={`row align-items-center  ${styles.signin_container}`}>
      <div className={`col-sm ${styles.signin_logo}`}></div>
      <div className={`col-sm d-flex flex-column align-items-center`}>
        <h1 className="text-center mb-4">Member Login</h1>

        <a href={authHref}>SignIn/Register</a>

        {/* <ButtonCustom
          type={"button"}
          classNameStyles={"forgot_btn"}
          label={"Forgot Username/Password?"}
          variant={"light"}
          onClick={props.onShowForgotPasswordModal}
        />
        <ButtonCustom
          type={"button"}
          classNameStyles={"signup_btn"}
          label={"New User/Sign Up"}
          variant={""}
          onClick={props.onShowSignUpForm}
        /> */}
      </div>
    </Container>
  );
}

export default SignIn;
