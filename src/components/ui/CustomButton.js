import styles from "./CustomButton.module.css";
import Button from "react-bootstrap/Button";

export default function CustomButton(props) {
  return (
    <Button
      variant={props.variant}
      className={styles[props.className]}
      size={props.size}
      onClick={props.onClick}
      type={props.type}
    >
      {props.label}
    </Button>
  );
}
