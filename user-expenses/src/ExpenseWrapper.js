import React, { useState, useContext } from "react";
import { ExpenseForm } from "./ExpenseForm";
import { Expense } from "./Expense";
import { NameWrapper } from "./NameWrapper";
import { Context } from "./DataWrapper";
import { EditExpenseForm } from "./EditExpenseForm";
export const ExpenseWrapper = () => {
  const { names, expenses, food, activity, office } = useContext(Context);
  const [expenseList, setExpenseList] = expenses;
  const [namesList, setNamesList] = names;
  const [foodTotal, setFoodTotal] = food;
  const [activityTotal, setActivityTotal] = activity;
  const [officeTotal, setOfficeTotal] = office;

  const addExpense = (userID, expense, desc, cost) => {
    if (!(desc.trim() && cost && userID && expense)) {
      //Check if both fields are filled
      alert("Please fill out all fields");
      return false;
    }

    let name = "";
    for (let i = 0; i < namesList.length; i++) {
      //Find the name associated with the id so we can display it in the table
      if (namesList[i].id === userID) {
        name = namesList[i].first.concat(" ", namesList[i].last);
      }
    }

    const newList = [
      ...expenseList,
      {
        expenseID: Math.random().toString(16).slice(2),
        id: userID,
        user: name,
        expense: expense,
        desc: desc,
        cost: parseInt(cost, 10),
        isEditing: false,
      },
    ];
    setExpenseList(newList);

    //Update the total expense for the user
    const newNamesList = [];
    for (let i = 0; i < namesList.length; i++) {
      //Copying objects over while only modifying the expense
      if (namesList[i].id === userID) {
        const newObj = {
          id: namesList[i].id,
          first: namesList[i].first,
          last: namesList[i].last,
          totalExpense: parseInt(namesList[i].totalExpense) + parseInt(cost),
        };
        newNamesList.push(newObj);
      } else {
        newNamesList.push(namesList[i]);
      }
    }
    setNamesList(newNamesList);

    //Update the total expense for each category
    if (expense === "food") {
      setFoodTotal(parseInt(foodTotal) + parseInt(cost));
    }
    if (expense === "activity") {
      setActivityTotal(parseInt(activityTotal) + parseInt(cost));
    }
    if (expense === "office") {
      setOfficeTotal(parseInt(officeTotal) + parseInt(cost));
    }
  };

  const removeExpense = (index) => {
    const newList = [];
    for (let i = 0; i < expenseList.length; i++) {
      if (i === index) {
        let id = expenseList[i].id;
        let expenseType = expenseList[i].expense;
        let cost = expenseList[i].cost;
        //subtract from user expense
        const newNamesList = [];

        for (let j = 0; j < namesList.length; j++) {
          if (id === namesList[j].id) {
            const newNameObj = {
              id: namesList[j].id,
              first: namesList[j].first,
              last: namesList[j].last,
              totalExpense:
                parseInt(namesList[j].totalExpense) - parseInt(cost),
            };
            newNamesList.push(newNameObj);
          } else {
            newNamesList.push(namesList[j]);
          }
        }
        setNamesList(newNamesList);

        //subtract from total expense
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
        newList.push(expenseList[i]);
      }
    }
    setExpenseList(newList);
  };

  const setEdit = (index) => {
    const newList = [];
    for (let i = 0; i < expenseList.length; i++) {
      //Find the index and set it to is editing
      if (i === index) {
        const newObj = {
          expenseID: expenseList[i].expenseID,
          id: expenseList[i].id,
          user: expenseList[i].user,
          expense: expenseList[i].expense,
          desc: expenseList[i].desc,
          cost: expenseList[i].cost,
          isEditing: true,
        };
        newList.push(newObj);
      } else {
        newList.push(expenseList[i]);
      }
    }
    setExpenseList(newList);
  };

  const editItem = (index, userID, expenseInput, descInput, costInput) => {
    //Find at index then modify

    let costDifference = 0;

    let name = "";
    for (let i = 0; i < namesList.length; i++) {
      //Find the name associated with the id so we can display it in the table
      if (namesList[i].id === userID) {
        name = namesList[i].first.concat(" ", namesList[i].last);
      }
    }

    //Create new entry with updated values
    const newExpenseList = [];
    for (let i = 0; i < expenseList.length; i++) {
      if (index === i) {
        const newObj = {
          expenseID: expenseList[i].id,
          id: userID,
          user: name,
          expense: expenseInput,
          desc: descInput,
          cost: costInput,
          isEditing: false,
        };
        costDifference = parseInt(costInput) - parseInt(expenseList[i].cost);
        newExpenseList.push(newObj);
      } else {
        newExpenseList.push(expenseList[i]);
      }
    }
    setExpenseList(newExpenseList);

    //Need to update cost in other areas

    //Update the total expense for the user
    const newNamesList = [];
    for (let i = 0; i < namesList.length; i++) {
      //Copying objects over while only modifying the expense
      if (namesList[i].id === userID) {
        const newObj = {
          id: namesList[i].id,
          first: namesList[i].first,
          last: namesList[i].last,
          totalExpense:
            parseInt(namesList[i].totalExpense) + parseInt(costDifference),
        };
        newNamesList.push(newObj);
      } else {
        newNamesList.push(namesList[i]);
      }
    }
    setNamesList(newNamesList);

    //Update the total expense for each category
    if (expenseInput === "food") {
      setFoodTotal(parseInt(foodTotal) + parseInt(costDifference));
    }
    if (expenseInput === "activity") {
      setActivityTotal(parseInt(activityTotal) + parseInt(costDifference));
    }
    if (expenseInput === "office") {
      setOfficeTotal(parseInt(officeTotal) + parseInt(costDifference));
    }
  };
  return (
    <div>
      <h1>Expenses</h1>
      <ExpenseForm addExpense={addExpense} />
      {expenseList.map((x, index) =>
        x.isEditing ? (
          <EditExpenseForm entry={x} index={index} editExpense={editItem} />
        ) : (
          <div>
            <tr>
              <Expense
                entry={x}
                index={index}
                removeExpense={removeExpense}
                setEdit={setEdit}
              />
            </tr>
            <hr />
          </div>
        )
      )}
    </div>
  );
};
