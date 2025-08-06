import "./App.css";
import React, { useState } from "react";
import { NameForm } from "./NameForm";
import { NameWrapper } from "./NameWrapper";
import { ExpenseWrapper } from "./ExpenseWrapper";
import { DataWrapper } from "./DataWrapper";
import { TotalExpenseWrapper } from "./TotalExpenseWrapper";
function App() {
  return (
    <div className="App">
      <div className="test">
        <DataWrapper>
          <div class="left-div">
            <div class="total-div">
              <TotalExpenseWrapper />
            </div>
            <NameWrapper />
          </div>
          <div class="right-div">
            <ExpenseWrapper />
          </div>
        </DataWrapper>
      </div>
    </div>
  );
}

export default App;
