import React, { useState, useContext } from "react";
import "./App.css";
import { Context } from "./DataWrapper";

export const ExpenseForm = ({ addExpense, users }) => {
  const [userInput, setUser] = useState();
  const [expenseInput, setExpense] = useState();
  const [descInput, setDesc] = useState("");
  const [costInput, setCost] = useState();
  const { names, expenses } = useContext(Context);
  const [namesList, setNamesList] = names;

  const [selectedOptionName, setSelectedOptionName] = useState("defaultOption");
  const [selectedOptionExpense, setSelectedOptionExpense] =
    useState("defaultOption");

  const handleSubmit = (event) => {
    event.preventDefault();

    addExpense(userInput, expenseInput, descInput, costInput);

    setExpense();
    setUser();
    setDesc("");
    setCost(0);

    setSelectedOptionExpense("defaultOption");
    setSelectedOptionName("defaultOption");
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
      <label for="user">Select a user: </label>
      <select
        value={selectedOptionName}
        name="user"
        onChange={handleChangeName}
      >
        <option value="defaultOption">Select an option</option>
        {namesList.map((user) => (
          //Pass in the id so we can differentiate between users with identical names
          <option value={user.id}>
            {user.first} {user.last}
          </option>
        ))}
      </select>

      <label for="expense" style={{ padding: "5px" }}>
        Select an expense:
      </label>
      <select
        value={selectedOptionExpense}
        name="expense"
        onChange={handleChangeExpense}
      >
        <option value="defaultOption">Select an option</option>
        <option value="food">Food</option>
        <option value="activity">Actvity</option>
        <option value="office">Office Equipment</option>
      </select>

      <br></br>

      <label for="desc">Description: </label>
      <input
        name="desc"
        type="text"
        className="desc-input"
        value={descInput}
        onChange={(event) => setDesc(event.target.value)}
      />

      <label for="cost" style={{ padding: "5px" }}>
        Cost:
      </label>
      <input
        name="cost"
        type="number"
        min="0"
        className="cost-input"
        value={costInput}
        onChange={(event) => setCost(event.target.value)}
      />
      <br></br>
      <button type="submit" className="name-btn">
        Add
      </button>
    </form>
  );
};
