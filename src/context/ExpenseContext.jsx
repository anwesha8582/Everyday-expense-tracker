import { createContext, useEffect, useState } from "react";

export const ExpenseContext = createContext();

function ExpenseProvider({ children }) {
  // Expenses
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");

    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  // Monthly Budget
  const [monthlyBudget, setMonthlyBudget] = useState(() => {
    const savedBudget = localStorage.getItem("monthlyBudget");

    return savedBudget ? Number(savedBudget) : 12000;
  });

  // Save expenses
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Save monthly budget
  useEffect(() => {
    localStorage.setItem("monthlyBudget", monthlyBudget);
  }, [monthlyBudget]);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        setExpenses,
        monthlyBudget,
        setMonthlyBudget,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export default ExpenseProvider;
