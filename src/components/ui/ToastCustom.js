import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const ToastCustom = (props) => {
  return (
    <ToastContainer className="p-3" position={props.position}>
      <Toast
        bg={props.bg}
        show={props.show}
        onClose={props.onClose}
        autohide={props.autohide}
        delay={3000}
      >
        <Toast.Header
          closeButton={props.closeButton}
          className={props.classNameHeader}
        >
          <strong className="me-auto">{props.headerText}</strong>
          <small>{props.headerTime}</small>
        </Toast.Header>
        <Toast.Body className={props.classNameBody}>
          {props.bodyText}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};
export default ToastCustom;
