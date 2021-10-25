import React from "react";

import useInput from "../hooks/use-input";

import classes from "../styles/Input.module.css";

const Input = ({
  label,
  inputId,
  type,
  errorMessage,
  validationFunction,
  isValid,
  setIsValid
}) => {
  const {
    value: enteredValue,
    hasError: inputHasError,
    valueChangeHandler,
    inputBlurHandler,
  } = useInput(validationFunction, isValid, setIsValid);

  const ValidClasses = inputHasError
    ? classes.invalid
    : '';

  return (
    <div className={`${ValidClasses} ${classes.formCol}`}>
      <label htmlFor={inputId}>{label}</label>
      <input
        type={type}
        id={inputId}
        onChange={valueChangeHandler}
        onBlur={inputBlurHandler}
        value={enteredValue}
      />
      {inputHasError && <span className={classes.error_text}>{errorMessage}</span>}
    </div>
  );
};

export default Input;
