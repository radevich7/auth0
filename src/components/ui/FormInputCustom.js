import { useState } from "react";
import Form from "react-bootstrap/Form";
import styles from "./FormInputCustom.module.css";

export default function FormInputCustom(props) {
  // const { errorMessage, onChange, ...props } = props;
  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    setFocused(true);
  };
  const style = `${
    props.classNameStyles ? styles[props.classNameStyles] : ""
  } ${props.className ? props.className : ""}`;

  return (
    <>
      <Form.Control
        type={props.type}
        className={style}
        placeholder={props.placeholder}
        defaultValue={props.value}
        onChange={props.onChange}
        onBlur={props.handleFocus}
        onFocus={handleFocus}
        name={props.name}
        focused={focused.toString()}
        pattern={props.pattern}
        required={props.required}
      />
      <span className={styles.errorMessage}>{props.errorMessage}</span>
    </>
  );
}
