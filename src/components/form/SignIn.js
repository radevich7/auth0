import styles from "../form/SignIn.module.css";
import CustomButton from "../ui/CustomButton";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";

function SignIn() {
  return (
    <Container className={`row align-items-center ${styles.signin_container}`}>
      <div className={`col-sm ${styles.signin_logo}`}></div>
      <Form className="col-sm">
        <h1 className="text-center">Member Login</h1>
        <Form.Group className="mb-3">
          {/* <Form.Label>Email address</Form.Label> */}
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group className="mb-3">
          {/* <Form.Label>Password</Form.Label> */}
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <CustomButton label={"Login"} variant={"info"} />
        <CustomButton label={"Forgot Username/Password?"} variant={"warning"} />
      </Form>
    </Container>
  );
}

export default SignIn;
