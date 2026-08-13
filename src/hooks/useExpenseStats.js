import { useContext, useMemo } from "react";
import { ExpenseContext } from "../context/ExpenseContext";

function getCurrentMonthKey() {
  const today = new Date();

  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
    2,
    "0",
  )}`;
}

function useExpenseStats(period = "month") {
  const { expenses, monthlyBudget } = useContext(ExpenseContext);

  // =====================================
  // FILTER EXPENSES
  // =====================================

  const filteredExpenses = useMemo(() => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    // =================================
    // ALL TIME
    // =================================

    if (period === "all") {
      return expenses;
    }

    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);

      if (Number.isNaN(expenseDate.getTime())) {
        return false;
      }

      expenseDate.setHours(0, 0, 0, 0);

      // =================================
      // TODAY
      // =================================

      if (period === "today") {
        return expenseDate.getTime() === today.getTime();
      }

      // =================================
      // THIS WEEK
      // Monday = first day
      // =================================

      if (period === "week") {
        const startOfWeek = new Date(today);

        const day = today.getDay();

        const daysFromMonday = day === 0 ? 6 : day - 1;

        startOfWeek.setDate(today.getDate() - daysFromMonday);

        return expenseDate >= startOfWeek && expenseDate <= today;
      }

      // =================================
      // THIS MONTH
      // =================================

      if (period === "month") {
        return (
          expenseDate.getMonth() === today.getMonth() &&
          expenseDate.getFullYear() === today.getFullYear()
        );
      }

      // =================================
      // LAST MONTH
      // =================================

      if (period === "lastMonth") {
        const lastMonth = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          1,
        );

        return (
          expenseDate.getMonth() === lastMonth.getMonth() &&
          expenseDate.getFullYear() === lastMonth.getFullYear()
        );
      }

      // =================================
      // THIS YEAR
      // =================================

      if (period === "year") {
        return expenseDate.getFullYear() === today.getFullYear();
      }

      return true;
    });
  }, [expenses, period]);

  // =====================================
  // TOTAL EXPENSE
  // =====================================

  const totalExpense = useMemo(() => {
    return filteredExpenses.reduce(
      (total, expense) => total + expense.amount,
      0,
    );
  }, [filteredExpenses]);

  // =====================================
  // CATEGORY TOTALS
  // =====================================

  const categoryTotals = useMemo(() => {
    return filteredExpenses.reduce((totals, expense) => {
      const category = expense.category;

      if (!totals[category]) {
        totals[category] = 0;
      }

      totals[category] += expense.amount;

      return totals;
    }, {});
  }, [filteredExpenses]);

  // =====================================
  // BUDGET
  // =====================================

  const budgetLeft = Math.max(monthlyBudget - totalExpense, 0);

  const overBudget = Math.max(totalExpense - monthlyBudget, 0);

  const isOverBudget = totalExpense > monthlyBudget;

  // =====================================
  // PERCENTAGES
  // =====================================

  const spentPercentage =
    monthlyBudget > 0 ? Math.min((totalExpense / monthlyBudget) * 100, 100) : 0;

  const remainingPercentage = Math.max(100 - spentPercentage, 0);

  // =====================================
  // HIGHEST EXPENSE
  // =====================================

  const highestExpense =
    filteredExpenses.length > 0
      ? filteredExpenses.reduce((highest, expense) =>
          expense.amount > highest.amount ? expense : highest,
        )
      : null;

  // =====================================
  // AVERAGE EXPENSE
  // =====================================

  const averageExpense =
    filteredExpenses.length > 0 ? totalExpense / filteredExpenses.length : 0;

  // =====================================
  // HIGHEST CATEGORY
  // =====================================

  const highestCategory = Object.entries(categoryTotals).reduce(
    (highest, [category, amount]) => {
      if (!highest || amount > highest.amount) {
        return {
          category,
          amount,
        };
      }

      return highest;
    },
    null,
  );

  // =====================================
  // MONTHLY TOTALS
  // =====================================

  const monthlyTotals = useMemo(() => {
    const totals = {};

    filteredExpenses.forEach((expense) => {
      const date = new Date(expense.date);

      if (Number.isNaN(date.getTime())) {
        return;
      }

      const monthKey = `${date.getFullYear()}-${String(
        date.getMonth() + 1,
      ).padStart(2, "0")}`;

      if (!totals[monthKey]) {
        totals[monthKey] = 0;
      }

      totals[monthKey] += expense.amount;
    });

    return totals;
  }, [filteredExpenses]);

  return {
    expenses: filteredExpenses,
    allExpenses: expenses,

    monthlyBudget,

    totalExpense,
    categoryTotals,
    monthlyTotals,

    budgetLeft,
    overBudget,
    isOverBudget,

    spentPercentage,
    remainingPercentage,

    highestExpense,
    averageExpense,
    highestCategory,

    currentMonthKey: getCurrentMonthKey(),
  };
}

export default useExpenseStats;
