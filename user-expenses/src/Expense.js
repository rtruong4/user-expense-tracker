import React from "react";

export const Expense = ({ entry, index, removeExpense, setEdit }) => {
  const handleRemoveItem = (index) => {
    removeExpense(index);
  };

  const handleEditItem = (index) => {
    setEdit(index);
  };
  return (
    <div className="Name">
      <span>
        <span className="name-title">Employee Name: </span>
        {entry.user} | <span className="expense-title">Expense Type: </span>
        {entry.expense} | <span className="desc-title">Description: </span>
        {entry.desc} | <span className="cost-title">Cost: </span>${entry.cost}{" "}
        <button class="remove-button" onClick={() => handleRemoveItem(index)}>
          Remove
        </button>
        <button class="edit-button" onClick={() => handleEditItem(index)}>
          Edit
        </button>
      </span>
    </div>
  );
};
