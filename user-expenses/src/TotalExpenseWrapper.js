import React, { useContext } from "react";
import { TotalExpenses } from "./TotalExpenses";
import { Context } from "./DataWrapper";

export const TotalExpenseWrapper = () => {
  return (
    <div className="TotalExpenseWrapper">
      <h1>Total Expenses</h1>
      <TotalExpenses />
    </div>
  );
};
