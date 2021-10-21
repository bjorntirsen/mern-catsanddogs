import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import styles from "../styles/ProfilePage.module.css";
import { useHistory } from "react-router-dom";
export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [changedUser, setChangedUser] = useState(null);
  const [canSendPayload, setCanSendPayload] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setChangedUser({ ...user });
  }, [user]);

  const handleEditClick = (e) => {
    setEditMode(!editMode);
  };

  const changesValidate = (userPayload) => {
    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(userPayload.email))
      return false;
    if (!canSendPayload) return false;
    return true;
  };

  const handleSaveClick = async (e) => {
    console.log(changedUser);
    if (!changedUser) {
      alert("Details not changed");
      return;
    }
    if (!changesValidate(changedUser)) {
      alert("Fill all forms");
      return;
    }

    if (localStorage.getItem("tkn")) {
      const token = localStorage.getItem("tkn");
      const url = "/api/users/updateMe";
      const payload = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(changedUser),
      };

      const response = await fetch(url, payload);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();
      console.log(responseData);
      setUser(responseData.data.user);
      history.push("/");
    }
  };

  const handleChange = (value, fieldId) => {
    const userChangedDetails = { ...changedUser };
    userChangedDetails[fieldId] = value;
    setChangedUser(userChangedDetails);
    setCanSendPayload(true);
  };
  return (
    <div className={styles.profile_container}>
      {user ? (
        <div className={styles.details_card}>
          <p className={styles.card_line}>
            <span>Name:</span>
            {editMode ? (
              <input
                onChange={(e) => handleChange(e.target.value, e.target.id)}
                placeholder={user.fullName}
                id="fullName"
                type="text"
              />
            ) : (
              user.fullName
            )}
          </p>
          <p className={styles.card_line}>
            <span>Email:</span>
            {editMode ? (
              <input
                onChange={(e) => handleChange(e.target.value, e.target.id)}
                placeholder={user.email}
                id="email"
                type="email"
              />
            ) : (
              user.email
            )}
          </p>
          <p className={styles.card_line}>
            <span>Address:</span>
            {editMode ? (
              <input
                onChange={(e) => handleChange(e.target.value, e.target.id)}
                placeholder={user.address}
                id="address"
                type="text"
              />
            ) : (
              user.address
            )}
          </p>
          <p className={styles.card_line}>
            <span>Phone Number:</span>
            {editMode ? (
              <input
                onChange={(e) => handleChange(e.target.value, e.target.id)}
                placeholder={user.phone}
                id="phone"
                type="text"
              />
            ) : (
              user.phone
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
      ) : (
        <div className={styles.card_line}>
          You need to be logged in to see this page
        </div>
      )}
    </div>
  );
}
