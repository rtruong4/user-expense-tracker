import React, { useState } from "react";
import "./App.css";

export const NameForm = ({ addName }) => {
  const [firstNameInput, setFirstName] = useState("");
  const [lastNameInput, setLastName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); //Prevent page from refreshing
    addName(firstNameInput, lastNameInput);
    setFirstName("");
    setLastName("");
  };
  return (
    <form className="inputForm" onSubmit={handleSubmit}>
      <label>First name: </label>
      <input
        type="text"
        className="first-name-input"
        value={firstNameInput}
        onChange={(event) => setFirstName(event.target.value)}
      />

      <br></br>

      <label>Last name: </label>
      <input
        type="text"
        className="last-name-input"
        value={lastNameInput}
        onChange={(event) => setLastName(event.target.value)}
      />

      <br></br>

      <button type="submit" className="name-btn">
        Add
      </button>
    </form>
  );
};
