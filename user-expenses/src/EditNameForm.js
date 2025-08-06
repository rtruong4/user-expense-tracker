import React, { useState } from "react";

export const EditNameForm = ({ editName, user }) => {
  const [firstNameInput, setFirstName] = useState(user.first);
  const [lastNameInput, setLastName] = useState(user.last);

  const handleSubmit = (event) => {
    event.preventDefault();

    editName(user.id, firstNameInput, lastNameInput);

    setFirstName("");
    setLastName("");
  };
  return (
    <form className="inputForm" onSubmit={handleSubmit}>
      <label>First name</label>
      <input
        type="text"
        className="first-name-input"
        value={firstNameInput}
        onChange={(event) => setFirstName(event.target.value)}
      />

      <br></br>

      <label>Last name</label>
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
