import { createContext, useEffect, useState } from "react";

export const ExpenseContext = createContext();

const DEFAULT_BUDGET = 12000;

// Get current month in YYYY-MM format
const getCurrentMonthKey = () => {
  const today = new Date();

  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
    2,
    "0",
  )}`;
};

function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");

    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  // =====================================
  // MONTHLY BUDGETS
  // =====================================

  const [monthlyBudgets, setMonthlyBudgets] = useState(() => {
    const savedBudgets = localStorage.getItem("monthlyBudgets");

    // New format already exists
    if (savedBudgets) {
      return JSON.parse(savedBudgets);
    }

    // ---------------------------------
    // Migrate old single budget
    // ---------------------------------

    const oldBudget = localStorage.getItem("monthlyBudget");

    if (oldBudget) {
      const currentMonth = getCurrentMonthKey();

      return {
        [currentMonth]: Number(oldBudget),
      };
    }

    return {};
  });

  // =====================================
  // CURRENT MONTH
  // =====================================

  const currentMonthKey = getCurrentMonthKey();

  // =====================================
  // GET BUDGET FOR A MONTH
  // =====================================

  const getMonthlyBudget = (monthKey) => {
    return monthlyBudgets[monthKey] ?? DEFAULT_BUDGET;
  };

  // =====================================
  // CURRENT MONTH BUDGET
  // =====================================

  const monthlyBudget = getMonthlyBudget(currentMonthKey);

  // =====================================
  // SET BUDGET FOR ANY MONTH
  // =====================================

  const setMonthlyBudgetForMonth = (monthKey, amount) => {
    setMonthlyBudgets((previous) => ({
      ...previous,
      [monthKey]: Number(amount),
    }));
  };

  // =====================================
  // SET CURRENT MONTH BUDGET
  // =====================================

  const setMonthlyBudget = (amount) => {
    setMonthlyBudgetForMonth(currentMonthKey, amount);
  };

  // =====================================
  // SAVE EXPENSES
  // =====================================

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // =====================================
  // SAVE MONTHLY BUDGETS
  // =====================================

  useEffect(() => {
    localStorage.setItem("monthlyBudgets", JSON.stringify(monthlyBudgets));
  }, [monthlyBudgets]);

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        setExpenses,

        monthlyBudgets,

        monthlyBudget,
        setMonthlyBudget,

        getMonthlyBudget,
        setMonthlyBudgetForMonth,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export default ExpenseProvider;
