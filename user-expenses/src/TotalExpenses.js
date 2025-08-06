import React, { useContext, useState } from "react";
import { Context } from "./DataWrapper";

export const TotalExpenses = () => {
  const { food, activity, office } = useContext(Context);
  const foodTotal = food;
  const activityTotal = activity;
  const officeTotal = office;

  return (
    <div>
      <p>
        <strong>Food:</strong> ${foodTotal}
      </p>
      <p>
        <strong>Activity:</strong> ${activityTotal}
      </p>
      <p>
        <strong>Office:</strong> ${officeTotal}
      </p>
    </div>
  );
};
