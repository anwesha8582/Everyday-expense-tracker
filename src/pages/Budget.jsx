import { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import "./Budget.css";

function Budget() {
  const { expenses, monthlyBudget, setMonthlyBudget } =
    useContext(ExpenseContext);

  const [budgetInput, setBudgetInput] = useState("");

  // Calculate total amount spent
  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  );

  // Calculate remaining budget
  const budgetLeft = monthlyBudget - totalExpense;

  // Calculate percentage spent
  const percentageSpent =
    monthlyBudget > 0 ? (totalExpense / monthlyBudget) * 100 : 0;

  // Keep progress between 0 and 100
  const progressPercentage = Math.min(percentageSpent, 100);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBudget = Number(budgetInput);

    if (newBudget <= 0) {
      alert("Please enter a valid budget.");
      return;
    }

    setMonthlyBudget(newBudget);

    setBudgetInput("");
  };

  return (
    <div className="budget-page">
      {/* Header */}

      <div className="budget-header">
        <h1>💰 Budget</h1>

        <p>Set and manage your monthly spending budget.</p>
      </div>

      {/* Main Budget Card */}

      <div className="budget-card">
        {/* Current Budget */}

        <div className="current-budget">
          <span className="budget-icon">💵</span>

          <div>
            <p>Current Monthly Budget</p>

            <h2>₹{monthlyBudget.toLocaleString()}</h2>
          </div>
        </div>

        {/* Progress Section */}

        <div className="budget-progress-section">
          <div className="progress-header">
            <div>
              <span>Spent</span>

              <strong>₹{totalExpense.toLocaleString()}</strong>
            </div>

            <div>
              <span>Remaining</span>

              <strong>₹{Math.max(budgetLeft, 0).toLocaleString()}</strong>
            </div>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${progressPercentage}%`,
              }}
            ></div>
          </div>

          <p className="progress-text">
            {percentageSpent.toFixed(1)}% of your budget spent
          </p>
        </div>

        <div className="budget-divider"></div>

        {/* Update Budget Form */}

        <form onSubmit={handleSubmit}>
          <label>Set New Monthly Budget</label>

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
