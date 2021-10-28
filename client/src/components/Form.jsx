import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "../styles/Form.module.css";
import btnStyles from "../styles/Button.module.css";
import Button from "./Button";
import axios from "axios";
import { formValidateMessage } from "../utils/formValidateMessage";
import { UserContext } from "../contexts/UserContext";

export default function Form({ type, title }) {
  const [formFields, setFormFields] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validateMessage = formValidateMessage(formFields, type);

    if (validateMessage === "validates") {
      const url = `${process.env.REACT_APP_BASE_URL}/api/users/${type}`;
      try {
        const { data } = await axios.post(url, formFields);
        localStorage.setItem("tkn", data.token);
        setUser(data.data.user);
        history.push("/");
      } catch (e) {
        if (e.response.data.errorCode === 11000) {
          setSubmitStatus({
            requestCompleted: false,
            message: "This email is already registered.",
          });
        } else {
          setSubmitStatus({
            requestCompleted: false,
            message: "Something went wrong",
          });
        }
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
      <section>
        <form
          onSubmit={handleSubmit}
          className={styles.formContainer}
          action=""
        >
          <h1 className={styles.header}>{title}</h1>
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
              autoComplete="email"
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
              autoComplete="new-password"
            />
          </div>
          <div className={styles.formCol}>
            <label htmlFor="passwordConfirm">Confirm Password*</label>
            <input
              onChange={(e) => handleChange(e.target.value, e.target.id)}
              id="passwordConfirm"
              type="password"
              autoComplete="new-password"
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
      </section>
    );
  } else if (type === "login") {
    return (
      <section>
        <form
          onSubmit={handleSubmit}
          className={styles.formContainer}
          action=""
        >
          <h1 className={styles.header}>{title}</h1>
          <div className={styles.formCol}>
            <label htmlFor="email">Email*</label>
            <input
              onChange={(e) => handleChange(e.target.value, e.target.id)}
              id="email"
              type="email"
              autoComplete="email"
            />
          </div>
          <div className={styles.formCol}>
            <label htmlFor="password">Password*</label>
            <input
              onChange={(e) => handleChange(e.target.value, e.target.id)}
              id="password"
              type="password"
              autoComplete="password"
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
      </section>
    );
  }
}
