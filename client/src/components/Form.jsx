import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Form.module.css";
import btnStyles from "../styles/Button.module.css";
import Button from "./Button";

export default function Form({ type }) {
  const [formFields, setFormFields] = useState(null);

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
      <form onSubmit={handleSubmit} className={styles.formContainer} action="">
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
          <label htmlFor="tel">Phone Number*</label>
          <input
            onChange={(e) => handleChange(e.target.value, e.target.id)}
            id="tel"
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
          <label htmlFor="password">Confirm Password*</label>
          <input
            onChange={(e) => handleChange(e.target.value, e.target.id)}
            id="confirmPassword"
            type="password"
          />
        </div>
        <div className={styles.formCol}>
          {/* Byt ut nedantående mot Button components */}
          <Button text="Sign Up" type="primary" />
          <Link className={`${btnStyles.btn} ${btnStyles.btnSecondary}`} to="/">
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

