import styles from "./CustomButton.module.css";
import Button from "react-bootstrap/Button";

export default function CustomButton({
  className = "",
  variant = "primary",
  label = "Button",
  onClick,
  size = "lg",
}) {
  return (
    <Button
      variant={variant}
      // className={`${styles}.${className}`}
      size={size}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
