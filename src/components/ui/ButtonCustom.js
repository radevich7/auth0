import styles from "./ButtonCustom.module.css";
import Button from "react-bootstrap/Button";

export default function ButtonCustom(props) {
  const style = `${
    props.classNameStyles ? styles[props.classNameStyles] : ""
  } ${props.className ? props.className : ""}`;
  return (
    <Button
      variant={props.variant}
      className={style}
      size={props.size}
      onClick={props.onClick}
      type={props.type}
    >
      {props.label}
    </Button>
  );
}
