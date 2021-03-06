import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Button from "../components/Button";
import Input from "../components/Input";

import styles from "../styles/Form.module.css";
import { appPostRequest } from "../utils/apiCalls";

// Functions used to validate
const validTitle = (value) =>
  value.trim() !== "" && value.trim().length > 4 && value.trim().length < 41;
const isNumeric = (value) => {
  if (typeof value !== "string") return false;
  return !Number.isNaN(value) && !Number.isNaN(parseFloat(value));
};
const validCategory = (value) =>
  value.trim() === "dog" || value.trim() === "cat";
const validDescription = (value) =>
  value.trim() !== "" && value.trim().length > 14 && value.trim().length < 1025;
const isValidHttpUrl = (value) => {
  let url;
  try {
    url = new URL(value);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
};
const isNotEmpty = (value) => value.trim() !== "";

const AdminCreateProductsPage = () => {
  const [formFields, setFormFields] = useState(null);
  const [titleIsValid, setTitleIsValid] = useState(false);
  const [priceIsValid, setPriceIsValid] = useState(false);
  const [categoryIsValid, setCategoryIsValid] = useState(false);
  const [descriptionIsValid, setDescriptionIsValid] = useState(false);
  const [imageUrlIsValid, setImageUrlIsValid] = useState(false);
  const [weightIsValid, setWeightIsValid] = useState(false);
  const [makerIsValid, setMakerIsValid] = useState(false);
  const [stockIsValid, setStockIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useHistory();

  const handleChange = (value, fieldId) => {
    const payload = { ...formFields };
    payload[fieldId] = value;
    setFormFields(payload);
  };

  const changeHandler = (event) =>
    handleChange(event.target.value, event.target.id);

  const handleCreateProduct = async (event) => {
    event.preventDefault();
    const url = `${process.env.REACT_APP_BASE_URL}/api/products`;
    try {
      await appPostRequest(url, formFields);
      history.push(`/admin/products`);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleCancel = () => {
    history.push(`/admin/products`);
  };

  let formIsValid = false;

  if (
    titleIsValid &&
    priceIsValid &&
    categoryIsValid &&
    descriptionIsValid &&
    imageUrlIsValid &&
    weightIsValid &&
    makerIsValid &&
    stockIsValid
  )
    formIsValid = true;

  return (
    <section>
      <form
        className={styles.formContainer}
        onChange={changeHandler}
        onSubmit={handleCreateProduct}
      >
        <h1 className={styles.header}>Create product</h1>
        <Input
          label="Title:"
          inputId="title"
          type="text"
          errorMessage="Please enter a title between 5-40 characters long."
          validationFunction={validTitle}
          isValid={titleIsValid}
          setIsValid={setTitleIsValid}
        />
        <Input
          label="Price:"
          inputId="price"
          type="number"
          errorMessage="Please enter a price."
          validationFunction={isNumeric}
          isValid={priceIsValid}
          setIsValid={setPriceIsValid}
        />
        <Input
          label="Category:"
          inputId="category"
          type="text"
          errorMessage="Available categories is either cat or dog"
          validationFunction={validCategory}
          isValid={categoryIsValid}
          setIsValid={setCategoryIsValid}
        />
        <Input
          label="Description:"
          inputId="description"
          type="text"
          errorMessage="Please enter a description between 15-1024 characters long."
          validationFunction={validDescription}
          isValid={descriptionIsValid}
          setIsValid={setDescriptionIsValid}
        />
        <Input
          label="URL to image:"
          inputId="imageUrl"
          type="url"
          errorMessage="Please enter a valid URL."
          validationFunction={isValidHttpUrl}
          isValid={imageUrlIsValid}
          setIsValid={setImageUrlIsValid}
        />
        <Input
          label="Weight:"
          inputId="weight"
          type="text"
          errorMessage="Please enter a weight."
          validationFunction={isNotEmpty}
          isValid={weightIsValid}
          setIsValid={setWeightIsValid}
        />
        <Input
          label="Maker:"
          inputId="maker"
          type="text"
          errorMessage="Please enter a maker."
          validationFunction={isNotEmpty}
          isValid={makerIsValid}
          setIsValid={setMakerIsValid}
        />
        <Input
          label="Stock:"
          inputId="stock"
          type="number"
          errorMessage="Please enter stock."
          validationFunction={isNumeric}
          isValid={stockIsValid}
          setIsValid={setStockIsValid}
        />
        <div className={styles.formCol}>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
          <Button
            text="Create"
            btnStyle="primary"
            btnType="submit"
            disabled={!formIsValid}
          />
          <Button text="Cancel" btnStyle="secondary" onClick={handleCancel} />
        </div>
      </form>
    </section>
  );
};
export default AdminCreateProductsPage;
