import React from "react";
import {Link} from 'react-router-dom'
import styles from '../styles/Form.module.css';
import btnStyles from '../styles/Button.module.css';
import Button from "./Button"

export default function Form({type}) {
    if (type === "signup"){
        return (
            <form className={styles.formContainer} action="">
                <div className={styles.formCol}>
                    <label htmlFor="fullName">Fullname</label>
                    <input id="fullName" type="text" />
                </div>
                <div className={styles.formCol}>
                    <label htmlFor="email">Email*</label>
                    <input id="email" type="email" />
                </div>
                <div className={styles.formCol}>
                    <label htmlFor="tel">Phone Number</label>
                    <input id="tel" type="tel" />
                </div>
                <div className={styles.formCol}>
                    <label htmlFor="address">Address</label>
                    <input id="address" type="text" />
                </div>
                <div className={styles.formCol}>
                    <label htmlFor="password">Password*</label>
                    <input id="password" type="password" />
                </div>
                <div className={styles.formCol}>
                {/* Byt ut nedantående mot Button components */}
                <Button text="Sign Up" type="primary" />
                <Link className={`${btnStyles.btn} ${btnStyles.btnSecondary}`} to="/">Cancel</Link>
                </div>
            </form>
        );
    }
    else if (type === "login"){
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
                <Link className={`${btnStyles.btn} ${btnStyles.btnSecondary}`} to="/">Cancel</Link>
                </div>
            </form>
        );
    }
}