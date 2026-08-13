import { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import "./Budget.css";

function Budget() {
  const {
    expenses,

    getMonthlyBudget,

    setMonthlyBudgetForMonth,
  } = useContext(ExpenseContext);

  // =====================================
  // CURRENT MONTH
  // =====================================

  const today = new Date();

  const currentMonth = `${today.getFullYear()}-${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}`;

  // =====================================
  // SELECTED MONTH
  // =====================================

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  // =====================================
  // BUDGET INPUT
  // =====================================

  const [budgetInput, setBudgetInput] = useState("");

  // =====================================
  // CURRENT SELECTED BUDGET
  // =====================================

  const selectedBudget = getMonthlyBudget(selectedMonth);

  // =====================================
  // SELECTED MONTH EXPENSES
  // =====================================

  const selectedMonthExpenses = expenses.filter((expense) => {
    if (!expense.date) {
      return false;
    }

    return expense.date.startsWith(selectedMonth);
  });

  // =====================================
  // TOTAL SPENT
  // =====================================

  const totalExpense = selectedMonthExpenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  );

  // =====================================
  // BUDGET LEFT
  // =====================================

  const budgetLeft = Math.max(selectedBudget - totalExpense, 0);

  // =====================================
  // OVER BUDGET
  // =====================================

  const overBudget = Math.max(totalExpense - selectedBudget, 0);

  const isOverBudget = totalExpense > selectedBudget;

  // =====================================
  // PROGRESS
  // =====================================

  const percentageSpent =
    selectedBudget > 0 ? (totalExpense / selectedBudget) * 100 : 0;

  const progressPercentage = Math.min(percentageSpent, 100);

  // =====================================
  // MONTH LABEL
  // =====================================

  const formattedMonth = new Date(
    Number(selectedMonth.split("-")[0]),
    Number(selectedMonth.split("-")[1]) - 1,
    1,
  ).toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  // =====================================
  // UPDATE BUDGET
  // =====================================

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBudget = Number(budgetInput);

    if (newBudget <= 0) {
      alert("Please enter a valid budget.");

      return;
    }

    setMonthlyBudgetForMonth(selectedMonth, newBudget);

    setBudgetInput("");
  };

  // =====================================
  // RETURN
  // =====================================

  return (
    <div className="budget-page">
      {/* =========================
          HEADER
      ========================= */}

      <div className="budget-header">
        <div>
          <h1>💰 Budget</h1>

          <p>Manage your budget month by month.</p>
        </div>

        {/* Month Selector */}

        <input
          className="budget-month-picker"
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />
      </div>

      {/* =========================
          MAIN CARD
      ========================= */}

      <div className="budget-card">
        {/* Selected Month */}

        <div className="selected-month-label">{formattedMonth}</div>

        {/* Current Budget */}

        <div className="current-budget">
          <span className="budget-icon">💵</span>

          <div>
            <p>Monthly Budget</p>

            <h2>₹{selectedBudget.toLocaleString()}</h2>
          </div>
        </div>

        {/* =========================
            SPENDING
        ========================= */}

        <div className="budget-progress-section">
          <div className="progress-header">
            <div>
              <span>Spent</span>

              <strong>₹{totalExpense.toLocaleString()}</strong>
            </div>

            <div>
              <span>{isOverBudget ? "Over Budget" : "Remaining"}</span>

              <strong className={isOverBudget ? "budget-danger" : ""}>
                ₹{(isOverBudget ? overBudget : budgetLeft).toLocaleString()}
              </strong>
            </div>
          </div>

          {/* Progress */}

          <div className="progress-bar">
            <div
              className={
                isOverBudget ? "progress-fill budget-overflow" : "progress-fill"
              }
              style={{
                width: `${progressPercentage}%`,
              }}
            />
          </div>

          {/* Progress Text */}

          <p
            className={
              isOverBudget ? "progress-text budget-danger" : "progress-text"
            }
          >
            {isOverBudget
              ? `Budget exceeded by ₹${overBudget.toLocaleString()}`
              : `${percentageSpent.toFixed(1)}% of your budget spent`}
          </p>
        </div>

        <div className="budget-divider" />

        {/* =========================
            UPDATE FORM
        ========================= */}

        <form onSubmit={handleSubmit}>
          <label>Set Budget for {formattedMonth}</label>

          <div className="budget-input-group">
            <span>₹</span>

            <input
              type="number"
              placeholder="Enter budget amount"
              value={budgetInput}
              onChange={(e) => setBudgetInput(e.target.value)}
            />
          </div>

          <button type="submit">Update Budget</button>
        </form>
      </div>
    </div>
  );
}

export default Budget;
