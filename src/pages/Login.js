import Container from "react-bootstrap/Container";
import SignIn from "../components/form/SignIn";
import styles from "../../src/App.module.css";

function Login() {
  return (
    <>
      <Container fluid className={styles.login_container}>
        <SignIn />
      </Container>
    </>
  );
}

export default Login;
