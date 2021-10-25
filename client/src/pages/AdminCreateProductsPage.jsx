import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import useInput from "../hooks/use-input";
import Button from "../components/Button";
import Input from "../components/Input";

import styles from "../styles/Form.module.css";

const validTitle = (value) =>
  value.trim() !== "" && value.trim().length > 4 && value.trim().length < 41;

const AdminCreateProductsPage = () => {
  const [formFields, setFormFields] = useState(null);
  const [title2IsValid, setTitle2IsValid] = useState(false);
  const history = useHistory();
  const {
    value: titleValue,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle,
  } = useInput(validTitle);

  const handleChange = (value, fieldId) => {
    const payload = { ...formFields };
    payload[fieldId] = value;
    setFormFields(payload);
  };

  const handleCreateProduct = async () => {
    const token = localStorage.getItem("tkn");
    const url = "/api/products";
    const obj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formFields),
    };
    const response = await fetch(url, obj);
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    resetTitle();
    history.push(`/admin/products`);
  };

  const handleCancel = () => {
    history.push(`/admin/products`);
  };

  let formIsValid = false;

  if (titleIsValid && title2IsValid) formIsValid = true;

  // const titleClasses = titleHasError ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={handleCreateProduct} className={styles.formContainer}>
      <h1 className={styles.header}>Create product</h1>
      <div className={styles.formCol}>
        <label htmlFor="title">Title*</label>
        <input
          type="text"
          id="title"
          value={titleValue}
          onChange={titleChangeHandler}
          onBlur={titleBlurHandler}
        />
        {titleHasError && (
          <p>Please enter a title between 5-40 characters long.</p>
        )}
      </div>
      <Input
        label="Title*"
        inputId="title2"
        type="text"
        errorMessage="Please enter a title between 5-40 characters long."
        validationFunction={validTitle}
        isValid={title2IsValid}
        setIsValid={setTitle2IsValid}
      />
      <div className={styles.formCol}>
        <label htmlFor="category">category*</label>
        <input
          onChange={(e) => handleChange(e.target.value, e.target.id)}
          id="category"
          type="text"
          autoComplete="off"
        />
      </div>
      <div className={styles.formCol}>
        <label htmlFor="description">description*</label>
        <input
          onChange={(e) => handleChange(e.target.value, e.target.id)}
          id="description"
          type="text"
          autoComplete="off"
        />
      </div>
      <div className={styles.formCol}>
        <label htmlFor="imageUrl">imageUrl*</label>
        <input
          onChange={(e) => handleChange(e.target.value, e.target.id)}
          id="imageUrl"
          type="text"
          autoComplete="off"
        />
      </div>
      <div className={styles.formCol}>
        <label htmlFor="weight">weight*</label>
        <input
          onChange={(e) => handleChange(e.target.value, e.target.id)}
          id="weight"
          type="text"
          autoComplete="off"
        />
      </div>
      <div className={styles.formCol}>
        <label htmlFor="maker">maker*</label>
        <input
          onChange={(e) => handleChange(e.target.value, e.target.id)}
          id="maker"
          type="text"
          autoComplete="off"
        />
      </div>
      <div className={styles.formCol}>
        <label htmlFor="stock">stock*</label>
        <input
          onChange={(e) => handleChange(e.target.value, e.target.id)}
          id="stock"
          type="number"
          autoComplete="off"
        />
      </div>
      <div className={styles.formCol}>
        <Button text="Create" type="primary" disabled={!formIsValid} />
        <Button text="Cancel" type="secondary" onClick={handleCancel} />
      </div>
    </form>
  );
};
export default AdminCreateProductsPage;
