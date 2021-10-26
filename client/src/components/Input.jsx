import { useState, useEffect } from "react";

import classes from "../styles/Input.module.css";

const Input = ({
  label,
  inputId,
  type,
  errorMessage,
  validationFunction,
  isValid,
  setIsValid,
}) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    setIsValid(validationFunction(enteredValue));
  }, [enteredValue, setIsValid, validationFunction]);

  const hasError = !isValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const ValidClasses = hasError ? classes.invalid : "";
  const placeholder = type === "url" ? "https://example.com" : "";

  return (
    <div className={`${ValidClasses} ${classes.formCol}`}>
      <label htmlFor={inputId}>{label}</label>
      <input
        type={type}
        id={inputId}
        onChange={valueChangeHandler}
        onBlur={inputBlurHandler}
        value={enteredValue}
        placeholder={placeholder}
      />
      {hasError && <span className={classes.error_text}>{errorMessage}</span>}
    </div>
  );
};

export default Input;
