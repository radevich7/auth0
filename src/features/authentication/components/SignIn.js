import styles from "./SignIn.module.css";
import CustomButton from "../../../components/ui/CustomButton";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";

function SignIn(props) {
  return (
    <Container className={`row align-items-center ${styles.signin_container}`}>
      <div className={`col-sm ${styles.signin_logo}`}></div>
      <Form className="col-sm  ps-5 pe-5">
        <h1 className="text-center mb-4">Member Login</h1>
        <Form.Group className="mb-3">
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
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
