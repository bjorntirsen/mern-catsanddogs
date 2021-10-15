import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Form.module.css";
import btnStyles from "../styles/Button.module.css";
import Button from "./Button";

export default function Form({ type }) {
  const [formFields, setFormFields] = useState(null);

  const formValidateMessage = (submitedFileds) => {
    let fields = [];
    if (type === "signup") {
      fields = [
        "fullName",
        "email",
        "phone",
        "address",
        "password",
        "passwordConfirm",
      ];
    } else if (type === "login") {
      fields = ["email", "passowrd"];
    }

    let isThereEmptyField = false;
    //This checks if there is any empty field
    fields.forEach((field) => {
      if (
        submitedFileds[field] === "" ||
        typeof submitedFileds[field] === "undefined"
      ) {
        isThereEmptyField = true;
      }
    });

    if (isThereEmptyField) return "No empty fields";

    //This will check if passwords match only for the signup type
    if (
      typeof submitedFileds.passwordConfirm !== undefined &&
      submitedFileds.password !== submitedFileds.passwordConfirm
    )
      return "Passwords don't match";

    if (
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(submitedFileds.email)
    )
      return "Not a valid Email address";

    return "validates";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formFields);
  };

  const handleChange = (value, fieldId) => {
    const payload = { ...formFields };
    payload[fieldId] = value;
    setFormFields(payload);
  };

  if (type === "signup") {
    return (
      <>
        <form
          onSubmit={handleSubmit}
          className={styles.formContainer}
          action=""
        >
          <div className={styles.formCol}>
            <label htmlFor="fullName">Fullname*</label>
            <input
              onChange={(e) => handleChange(e.target.value, e.target.id)}
              id="fullName"
              type="text"
            />
          </div>
          <div className={styles.formCol}>
            <label htmlFor="email">Email*</label>
            <input
              onChange={(e) => handleChange(e.target.value, e.target.id)}
              id="email"
              type="email"
            />
          </div>
          <div className={styles.formCol}>
            <label htmlFor="phone">Phone Number*</label>
            <input
              onChange={(e) => handleChange(e.target.value, e.target.id)}
              id="phone"
              type="tel"
            />
          </div>
          <div className={styles.formCol}>
            <label htmlFor="address">Address*</label>
            <input
              onChange={(e) => handleChange(e.target.value, e.target.id)}
              id="address"
              type="text"
            />
          </div>
          <div className={styles.formCol}>
            <label htmlFor="password">Password*</label>
            <input
              onChange={(e) => handleChange(e.target.value, e.target.id)}
              id="password"
              type="password"
            />
          </div>
          <div className={styles.formCol}>
            <label htmlFor="passwordConfirm">Confirm Password*</label>
            <input
              onChange={(e) => handleChange(e.target.value, e.target.id)}
              id="passwordConfirm"
              type="password"
            />
          </div>
          <div className={styles.formCol}>
            {/* Byt ut nedantående mot Button components */}
            <Button text="Sign Up" type="primary" />
            <Link
              className={`${btnStyles.btn} ${btnStyles.btnSecondary}`}
              to="/"
            >
              Cancel
            </Link>
          </div>
        </form>
    );
  } else if (type === "login") {
    return (
      <form className={styles.formContainer} action="">
        <div className={styles.formCol}>
          <label htmlFor="email">Email*</label>
          <input id="email" type="email" />
        </div>
        <div className={styles.formCol}>
          <label htmlFor="password">Password*</label>
          <input id="password" type="password" />
        </div>
        <div className={styles.formCol}>
          {/* Byt ut nedantående mot Button components */}
          <Button text="Login" type="primary" />
          <Link className={`${btnStyles.btn} ${btnStyles.btnSecondary}`} to="/">
            Cancel
          </Link>
        </div>
      </form>
    );
  }
}

