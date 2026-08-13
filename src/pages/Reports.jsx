import { useState } from "react";
import useExpenseStats from "../hooks/useExpenseStats";
import categories from "../data/categories";
import SpendingDonut from "../components/Charts/SpendingDonut";
import MonthlySpendingChart from "../components/Charts/MonthlySpendingChart";
import "./Reports.css";

function Reports() {
  const [period, setPeriod] = useState("all");

  const {
    expenses,
    totalExpense,
    averageExpense,
    categoryTotals,
    highestExpense,
    highestCategory,
  } = useExpenseStats(period);

  const hasExpenses = expenses.length > 0;

  const maxCategoryAmount = Math.max(
    ...categories.map((category) => categoryTotals[category] || 0),
    0,
  );

  return (
    <div className="reports-page">
      {/* =========================
          HEADER
      ========================= */}

      <div className="reports-header">
        <div>
          <h1>📊 Reports</h1>

          <p>Understand where your money is going.</p>
        </div>

        {/* Period Filter */}

        <select
          className="report-period"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="all">All Time</option>

          <option value="today">Today</option>

          <option value="week">This Week</option>

          <option value="month">This Month</option>

          <option value="lastMonth">Last Month</option>

          <option value="year">This Year</option>
        </select>
      </div>

      {/* =========================
          SUMMARY CARDS
      ========================= */}

      <div className="report-summary">
        <div className="report-stat">
          <div className="report-stat-icon total-icon">₹</div>

          <div>
            <span>Total Spent</span>

            <h2>₹{totalExpense.toLocaleString()}</h2>
          </div>
        </div>

        <div className="report-stat">
          <div className="report-stat-icon average-icon">↗</div>

          <div>
            <span>Average Expense</span>

            <h2>₹{Math.round(averageExpense).toLocaleString()}</h2>
          </div>
        </div>

        <div className="report-stat">
          <div className="report-stat-icon category-icon-stat">🏆</div>

          <div>
            <span>Top Category</span>

            <h2>{highestCategory ? highestCategory.category : "—"}</h2>

            {highestCategory && (
              <small>₹{highestCategory.amount.toLocaleString()}</small>
            )}
          </div>
        </div>

        <div className="report-stat">
          <div className="report-stat-icon largest-icon">💰</div>

          <div>
            <span>Largest Expense</span>

            <h2>
              ₹{highestExpense ? highestExpense.amount.toLocaleString() : "0"}
            </h2>

            {highestExpense && <small>{highestExpense.title}</small>}
          </div>
        </div>
      </div>

      {/* =========================
          VISUAL REPORTS
      ========================= */}

      <div className="reports-visuals">
        <SpendingDonut period={period} />
        <div className="category-report">
          <div className="report-section-header">
            <div>
              <h2>Spending by Category</h2>

              <p>See how your spending is distributed.</p>
            </div>
          </div>

          {!hasExpenses ? (
            <div className="reports-empty">
              <h3>📭 No spending data</h3>

              <p>There are no expenses for this period.</p>
            </div>
          ) : (
            <div className="category-report-list">
              {categories.map((category) => {
                const amount = categoryTotals[category] || 0;

                const percentage =
                  totalExpense > 0 ? (amount / totalExpense) * 100 : 0;

                const barWidth =
                  maxCategoryAmount > 0
                    ? (amount / maxCategoryAmount) * 100
                    : 0;

                return (
                  <div className="category-report-item" key={category}>
                    <div className="category-report-top">
                      <div>
                        <span className="category-report-name">{category}</span>

                        <span className="category-report-percent">
                          {percentage.toFixed(1)}%
                        </span>
                      </div>

                      <strong>₹{amount.toLocaleString()}</strong>
                    </div>

                    <div className="report-bar">
                      <div
                        className="report-bar-fill"
                        style={{
                          width: `${barWidth}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <MonthlySpendingChart period={period} />
    </div>
  );
}

export default Reports;
