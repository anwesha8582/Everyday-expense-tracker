import useExpenseStats from "../../hooks/useExpenseStats";
import CategoryCarousel from "../CategoryCarousel/CategoryCarousel";
import "./Dashboard.css";

function Dashboard() {
  const {
    monthlyBudget,
    totalExpense,
    budgetLeft,
    overBudget,
    isOverBudget,
    spentPercentage,
    remainingPercentage,
  } = useExpenseStats();

  return (
    <div className="dashboard">
      <div className={`budget-progress ${isOverBudget ? "budget-over" : ""}`}>
        <div className="budget-heading">
          <div>
            <span>Monthly Budget</span>
            <h2>₹{monthlyBudget.toLocaleString()}</h2>
          </div>
          <div
            className={`budget-status ${
              isOverBudget
                ? "status-danger"
                : spentPercentage >= 80
                  ? "status-warning"
                  : "status-success"
            }`}
          >
            {isOverBudget
              ? "🚨 Budget exceeded"
              : spentPercentage >= 80
                ? "⚠️ Budget getting low"
                : "✓ On track"}
          </div>
        </div>

        <div className="budget-info">
          <div className="spent-info">
            <span>Spent</span>

            <strong>₹{totalExpense.toLocaleString()}</strong>
          </div>

          <div
            className={
              isOverBudget
                ? "remaining-info over-budget-info"
                : "remaining-info"
            }
          >
            <span>{isOverBudget ? "Over Budget" : "Remaining"}</span>

            <strong>
              ₹{(isOverBudget ? overBudget : budgetLeft).toLocaleString()}
            </strong>
          </div>
        </div>

        <div className="budget-bar">
          <div
            className={isOverBudget ? "spent-bar budget-overflow" : "spent-bar"}
            style={{
              width: `${spentPercentage}%`,
            }}
          />
          {!isOverBudget && (
            <div
              className="remaining-bar"
              style={{
                width: `${remainingPercentage}%`,
              }}
            />
          )}
        </div>

        <div className="budget-percentages">
          <span>{spentPercentage.toFixed(1)}% spent</span>
          <span>
            {isOverBudget
              ? "0% left"
              : `${remainingPercentage.toFixed(1)}% left`}
          </span>
        </div>
        {isOverBudget && (
          <p className="overflow-message">
            🚨 You have exceeded your budget by ₹{overBudget.toLocaleString()}
          </p>
        )}
      </div>
      <CategoryCarousel />
    </div>
  );
}

export default Dashboard;
