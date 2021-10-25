import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Button from "../components/Button";
import Input from "../components/Input";

import styles from "../styles/Form.module.css";

const validTitle = (value) =>
  value.trim() !== "" && value.trim().length > 4 && value.trim().length < 41;
const validCategory = (value) =>
  value.trim() === "dog" || value.trim() === "cat";

const AdminCreateProductsPage = () => {
  const [formFields, setFormFields] = useState(null);
  const [titleIsValid, setTitleIsValid] = useState(false);
  const [categoryIsValid, setCategoryIsValid] = useState(false);
  const history = useHistory();

  const handleChange = (value, fieldId) => {
    const payload = { ...formFields };
    payload[fieldId] = value;
    setFormFields(payload);
  };

  const changeHandler = (e) => handleChange(e.target.value, e.target.id);

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
    history.push(`/admin/products`);
  };

  const handleCancel = () => {
    history.push(`/admin/products`);
  };

  let formIsValid = false;

  if (titleIsValid && categoryIsValid) formIsValid = true;

  return (
    <form
      onSubmit={handleCreateProduct}
      className={styles.formContainer}
      onChange={changeHandler}
    >
      <h1 className={styles.header}>Create product</h1>
      <Input
        label="Title*"
        inputId="title"
        type="text"
        errorMessage="Please enter a title between 5-40 characters long."
        validationFunction={validTitle}
        isValid={titleIsValid}
        setIsValid={setTitleIsValid}
      />
      <Input
        label="Category*"
        inputId="category"
        type="text"
        errorMessage="Available categories is either cat or dog"
        validationFunction={validCategory}
        isValid={categoryIsValid}
        setIsValid={setCategoryIsValid}
      />
      <div className={styles.formCol}>
        <label htmlFor="category">category*</label>
        <input
          onChange={changeHandler}
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
