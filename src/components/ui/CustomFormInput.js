import { useState } from "react";
import Form from "react-bootstrap/Form";
import styles from "./CustomFormInput.module.css";

export default function CustomFormInput(props) {
  // const { errorMessage, onChange, ...props } = props;
  return (
    <>
      <Form.Control
        type={props.type}
        className={styles[props.className]}
        placeholder={props.placeholder}
        defaultValue={props.value}
        onChange={props.onChange}
        name={props.name}
      />
      <span className={styles.errorMessage}>{props.errorMessage}</span>
    </>
  );
}
