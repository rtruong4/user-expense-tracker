import React, { useState, useContext } from "react";
import { NameForm } from "./NameForm";
import { Name } from "./Name";
import { Context } from "./DataWrapper";
import "./App.css";
import { EditNameForm } from "./EditNameForm";

export const NameWrapper = () => {
  const { names, expenses, food, activity, office } = useContext(Context);
  const [expenseList, setExpenseList] = expenses;
  const [namesList, setNamesList] = names;
  const [foodTotal, setFoodTotal] = food;
  const [activityTotal, setActivityTotal] = activity;
  const [officeTotal, setOfficeTotal] = office;

  const addName = (firstNameInput, lastNameInput) => {
    if (!(firstNameInput.trim() && lastNameInput.trim())) {
      //Check if both fields are filled
      alert("Please fill out both first and last name fields");
      return false;
    }

    const newList = [
      ...namesList,
      {
        id: Math.random().toString(16).slice(2), //Generate a random id for each user
        first: firstNameInput,
        last: lastNameInput,
        totalExpense: 0,
        isEditing: false,
      },
    ];
    setNamesList(newList);
  };

  const removeName = (index) => {
    const newList = [];
    for (let i = 0; i < namesList.length; i++) {
      if (i === parseInt(index)) {
        //Remove entries from expenses
        const newExpenseList = [];
        for (let j = 0; j < expenseList.length; j++) {
          if (expenseList[j].id === namesList[i].id) {
            // Matching entry means remove
            //Subtract from total expenses
            let cost = expenseList[j].cost;
            let expenseType = expenseList[j].expense;
            if (expenseType === "food") {
              setFoodTotal(parseInt(foodTotal) - parseInt(cost));
            }
            if (expenseType === "activity") {
              setActivityTotal(parseInt(activityTotal) - parseInt(cost));
            }
            if (expenseType === "office") {
              setOfficeTotal(parseInt(officeTotal) - parseInt(cost));
            }
          } else {
            newExpenseList.push(expenseList[j]);
          }
        }
        setExpenseList(newExpenseList);
      } else {
        newList.push(namesList[i]);
      }
    }
    setNamesList(newList);
  };

  const setEdit = (index) => {
    const newList = [];
    for (let i = 0; i < namesList.length; i++) {
      //Find the index and set it to is editing
      if (i === index) {
        const newObj = {
          id: namesList[i].id,
          first: namesList[i].first,
          last: namesList[i].last,
          totalExpense: namesList[i].totalExpense,
          isEditing: true,
        };
        newList.push(newObj);
      } else {
        newList.push(namesList[i]);
      }
    }
    setNamesList(newList);
  };

  const editItem = (id, first, last) => {
    const newList = [];
    for (let i = 0; i < namesList.length; i++) {
      //Find the matching id and modify the entry but keep id and expense the same
      if (namesList[i].id === id) {
        const newObj = {
          id: namesList[i].id,
          first: first,
          last: last,
          totalExpense: namesList[i].totalExpense,
          isEditing: false,
        };
        newList.push(newObj);
      } else {
        newList.push(namesList[i]);
      }
    }

    setNamesList(newList);

    let newConcatName = first.concat(" ", last);

    const newExpenseList = [];
    //Also do the same with the expenses
    for (let i = 0; i < expenseList.length; i++) {
      if (expenseList[i].id === id) {
        const newObj = {
          expenseID: expenseList[i].expenseID,
          id: expenseList[i].id,
          user: newConcatName,
          expense: expenseList[i].expense,
          desc: expenseList[i].desc,
          cost: expenseList[i].cost,
        };
        newExpenseList.push(newObj);
      } else {
        newExpenseList.push(expenseList[i]);
      }
    }

    setExpenseList(newExpenseList);
  };

  return (
    <div>
      <div className="NameWrapper">
        <h1>Users</h1>
        <NameForm addName={addName} />
        {namesList.map((x, index) =>
          x.isEditing ? (
            <EditNameForm editName={editItem} user={x} />
          ) : (
            <div>
              <tr>
                <Name
                  name={x}
                  index={index}
                  removeName={removeName}
                  setEdit={setEdit}
                />
              </tr>
              <hr />
            </div>
          )
        )}
      </div>
    </div>
  );
};
