import { useState, useEffect } from "react";
import styles from "../styles/ProfilePage.module.css";
import { useHistory } from "react-router-dom";
export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const [userToChange, setUserToChange] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [canSendPayload, setCanSendPayload] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchUser = async () => {
      if (localStorage.getItem("tkn")) {
        const token = localStorage.getItem("tkn");
        const url = `${process.env.REACT_APP_BASE_URL}/api/users/getMe`;
        const obj = {
          headers: {
            authorization: `Bearer ${token}`,
          },
        };

        const response = await fetch(url, obj);
        const responseData = await response.json();

        setUserToChange(responseData.data.user);
        setIsLoading(false);
      } else setIsLoading(false);
    };
    fetchUser().catch((error) => {
      setIsLoading(false);
    });
  }, []);

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const changesValidate = (userPayload) => {
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(userPayload.email))
      return false;
    if (!canSendPayload) return false;
    return true;
  };

  const handleSaveClick = async () => {
    if (!userToChange) {
      alert("Details not changed");
      return;
    }
    if (!changesValidate(userToChange)) {
      alert("Fill all forms");
      return;
    }

    if (localStorage.getItem("tkn")) {
      const token = localStorage.getItem("tkn");
      const url = `${process.env.REACT_APP_BASE_URL}/api/users/updateMe`;
      const payload = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userToChange),
      };

      const response = await fetch(url, payload);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();
      setUserToChange(responseData.data.user);
      history.push("/");
    }
  };

  const handleChange = (value, fieldId) => {
    const userChangedDetails = { ...userToChange };
    userChangedDetails[fieldId] = value;
    setUserToChange(userChangedDetails);
    setCanSendPayload(true);
  };

  return (
    <div className={styles.profile_container}>
      {isLoading && <p>Loading...</p>}
      {userToChange && !isLoading && (
        <div className={styles.details_card}>
          <p className={styles.card_line}>
            <span>Name:</span>
            {editMode ? (
              <input
                onChange={(e) => handleChange(e.target.value, e.target.id)}
                placeholder={userToChange.fullName}
                id="fullName"
                type="text"
              />
            ) : (
              userToChange.fullName
            )}
          </p>
          <p className={styles.card_line}>
            <span>Email:</span>
            {editMode ? (
              <input
                onChange={(e) => handleChange(e.target.value, e.target.id)}
                placeholder={userToChange.email}
                id="email"
                type="email"
              />
            ) : (
              userToChange.email
            )}
          </p>
          <p className={styles.card_line}>
            <span>Address:</span>
            {editMode ? (
              <input
                onChange={(e) => handleChange(e.target.value, e.target.id)}
                placeholder={userToChange.address}
                id="address"
                type="text"
              />
            ) : (
              userToChange.address
            )}
          </p>
          <p className={styles.card_line}>
            <span>Phone Number:</span>
            {editMode ? (
              <input
                onChange={(e) => handleChange(e.target.value, e.target.id)}
                placeholder={userToChange.phone}
                id="phone"
                type="text"
              />
            ) : (
              userToChange.phone
            )}
          </p>
          {editMode ? (
            <button disabled={!canSendPayload} onClick={handleSaveClick}>
              Save
            </button>
          ) : (
            <button onClick={handleEditClick}>Edit</button>
          )}
        </div>
      )}
      {!userToChange && !isLoading && (
        <div className={styles.card_line}>
          You need to be logged in to see this page
        </div>
      )}
    </div>
  );
}
