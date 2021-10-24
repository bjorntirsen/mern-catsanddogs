import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Button from "../components/Button";

import styles from "../styles/Form.module.css";

const AdminCreateProductsPage = () => {
  const [formFields, setFormFields] = useState(null);
  const history = useHistory();

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
    history.push(`/admin/products`);
  };

  const handleCancel = () => {
    history.push(`/admin/products`);
  };

  return (
    <form onSubmit={handleCreateProduct} className={styles.formContainer}>
      <h1 className={styles.header}>Create product</h1>
      <div className={styles.formCol}>
        <label htmlFor="title">title*</label>
        <input
          onChange={(e) => handleChange(e.target.value, e.target.id)}
          id="title"
          type="text"
          autoComplete="off"
        />
      </div>
      <div className={styles.formCol}>
        <label htmlFor="price">price*</label>
        <input
          onChange={(e) => handleChange(e.target.value, e.target.id)}
          id="price"
          type="number"
          autoComplete="off"
        />
      </div>
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
        <Button text="Create" type="primary" />
        <Button text="Cancel" type="secondary" onClick={handleCancel} />
      </div>
    </form>
  );
};
export default AdminCreateProductsPage;
