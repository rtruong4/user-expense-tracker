import React, { useState, createContext } from "react";

export const Context = createContext();

//Using context to access states from any component
export const DataWrapper = ({ children }) => {
  const [namesList, setNamesList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [foodTotal, setFoodTotal] = useState(0);
  const [activityTotal, setActivityTotal] = useState(0);
  const [officeTotal, setOfficeTotal] = useState(0);

  return (
    <Context.Provider
      value={{
        names: [namesList, setNamesList],
        expenses: [expenseList, setExpenseList],
        food: [foodTotal, setFoodTotal],
        activity: [activityTotal, setActivityTotal],
        office: [officeTotal, setOfficeTotal],
      }}
    >
      {children}
    </Context.Provider>
  );
};
