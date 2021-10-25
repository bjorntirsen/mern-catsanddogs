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
}) => {
  const {
    value: enteredValue,
    hasError: inputHasError,
    valueChangeHandler,
    inputBlurHandler,
  } = useInput(validationFunction, isValid);

  const ValidClasses = inputHasError
    ? classes.formCol_invalid
    : classes.formCol;

  return (
    <div className={ValidClasses}>
      <label htmlFor={inputId}>{label}</label>
      <input
        type={type}
        id={inputId}
        onChange={valueChangeHandler}
        onBlur={inputBlurHandler}
        value={enteredValue}
      />
      {inputHasError && <p className={classes.error_text}>{errorMessage}</p>}
    </div>
  );
};

export default Input;
