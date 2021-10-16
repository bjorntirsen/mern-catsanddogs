import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "../styles/Form.module.css";
import btnStyles from "../styles/Button.module.css";
import Button from "./Button";
import axios from "axios";
import { formValidateMessage } from "../utils/formValidateMessage";

export default function Form({ type }) {
  const [formFields, setFormFields] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validateMessage = formValidateMessage(formFields, type);

    if (validateMessage === "validates") {
      const url = `http://localhost:5000/api/users/${type}`;
      try {
        const { data } = await axios.post(url, formFields);
        localStorage.setItem("tkn", data.token);
        history.push("/");
      } catch (e) {
        setSubmitStatus({
          requestCompleted: false,
          message: "Something went wrong",
        });
      }
    } else {
      setSubmitStatus({
        requestCompleted: false,
        message: validateMessage,
      });
    }
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
          {submitStatus && (
            <p
              className={
                submitStatus.requestCompleted ? styles.success : styles.error
              }
            >
              {submitStatus.message}
            </p>
          )}
        </form>
      </>
    );
  } else if (type === "login") {
    return (
      <>
        <form
          onSubmit={handleSubmit}
          className={styles.formContainer}
          action=""
        >
          <div className={styles.formCol}>
            <label htmlFor="email">Email*</label>
            <input
              onChange={(e) => handleChange(e.target.value, e.target.id)}
              id="email"
              type="email"
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
            {/* Byt ut nedantående mot Button components */}
            <Button text="Login" type="primary" />
            <Link
              className={`${btnStyles.btn} ${btnStyles.btnSecondary}`}
              to="/"
            >
              Cancel
            </Link>
          </div>
          {submitStatus && (
            <p
              className={
                submitStatus.requestCompleted ? styles.success : styles.error
              }
            >
              {submitStatus.message}
            </p>
          )}
        </form>
      </>
    );
  }
}
