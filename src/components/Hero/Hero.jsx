import { useContext } from "react";
import { ExpenseContext } from "../../context/ExpenseContext";

import "./Hero.css";

function Hero() {
  const { expenses, monthlyBudget } = useContext(ExpenseContext);

  // Current date and time
  const today = new Date();
  const currentHour = today.getHours();

  // Greeting
  let greeting = "";
  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  // Today's date
  const formattedDate = today.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // Calculate total expenses
  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  );

  // Calculate remaining budget
  const budgetLeft = monthlyBudget - totalExpense;

  return (
    <section className="hero">
      {/* Left Section */}
      <div className="hero-left">
        <p className="hero-greeting">{greeting} 👋 Anwesha </p>
        <p className="hero-description">
          Keep track of your spending and stay on top of your budget.
        </p>
      </div>

      {/* Right Section */}
      <div className="hero-right">
        <div className="summary-card">
          <span>💰</span>

          <div>
            <p>Budget Left</p>

            <h2>₹{budgetLeft.toLocaleString()}</h2>
          </div>
        </div>

        <div className="summary-card">
          <span>📅</span>

          <div>
            <p>Today</p>

            <h2>{formattedDate}</h2>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
