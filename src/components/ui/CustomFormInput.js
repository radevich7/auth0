import { useState } from "react";
import Form from "react-bootstrap/Form";
import styles from "./CustomFormInput.module.css";

export default function CustomFormInput(props) {
  // const { errorMessage, onChange, ...props } = props;
  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <>
      <Form.Control
        type={props.type}
        className={styles[props.className]}
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
