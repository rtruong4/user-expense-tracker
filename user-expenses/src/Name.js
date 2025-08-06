import React, { useState } from "react";

export const Name = ({ name, index, removeName, setEdit }) => {
  const handleRemoveItem = (index) => {
    removeName(index);
  };

  const handleEditItem = (index) => {
    setEdit(index);
  };
  return (
    <div className="Name">
      <p>
        <span className="name-title">Employee Name: </span> {name.first}{" "}
        {name.last} | <span className="expense-title">Total Expenses:</span> $
        {name.totalExpense}{" "}
        <button class="remove-button" onClick={() => handleRemoveItem(index)}>
          Remove
        </button>
        <button class="edit-button" onClick={() => handleEditItem(index)}>
          Edit
        </button>
      </p>
    </div>
  );
};
