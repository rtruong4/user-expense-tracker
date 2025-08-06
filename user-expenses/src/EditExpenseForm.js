import React, { useState, useContext } from "react";
import "./App.css";
import { Context } from "./DataWrapper";

export const EditExpenseForm = ({ entry, index, editExpense }) => {
  const [userInput, setUser] = useState(entry.id);
  const [expenseInput, setExpense] = useState(entry.expense);
  const [descInput, setDesc] = useState(entry.desc);
  const [costInput, setCost] = useState(entry.cost);
  const { names } = useContext(Context);
  const [namesList, setNamesList] = names;
  const [selectedOptionName, setSelectedOptionName] = useState(entry.id);
  const [selectedOptionExpense, setSelectedOptionExpense] = useState(
    entry.expense
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    editExpense(index, userInput, expenseInput, descInput, costInput);

    setExpense();
    setUser();
    setDesc("");
    setCost(0);
  };

  const handleChangeName = (event) => {
    setUser(event.target.value);
    setSelectedOptionName(event.target.value);
  };

  const handleChangeExpense = (event) => {
    setExpense(event.target.value);
    setSelectedOptionExpense(event.target.value);
  };

  return (
    <form className="inputForm" onSubmit={handleSubmit}>
      <label for="user">Select a user:</label>
      <select
        value={selectedOptionName}
        name="user"
        onChange={handleChangeName}
      >
        {namesList.map((user) => (
          //Pass in the id so we can differentiate between users with identical names
          <option value={user.id}>
            {user.first} {user.last}
          </option>
        ))}
      </select>

      <label for="expense">Select an expense:</label>
      <select
        value={selectedOptionExpense}
        name="expense"
        onChange={handleChangeExpense}
      >
        <option value="food">Food</option>
        <option value="activity">Actvity</option>
        <option value="office">Office Equipment</option>
      </select>

      <label for="desc">Description</label>
      <input
        name="desc"
        type="text"
        className="desc-input"
        value={descInput}
        onChange={(event) => setDesc(event.target.value)}
      />

      <label for="cost">Cost</label>
      <input
        name="cost"
        type="number"
        min="0"
        className="cost-input"
        value={costInput}
        onChange={(event) => setCost(event.target.value)}
      />

      <button type="submit" className="name-btn">
        Add
      </button>
    </form>
  );
};
