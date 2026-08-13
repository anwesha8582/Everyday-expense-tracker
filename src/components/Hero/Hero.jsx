import useExpenseStats from "../../hooks/useExpenseStats";
import "./Hero.css";

function Hero() {
  const { monthlyBudget, totalExpense, budgetLeft, overBudget, isOverBudget } =
    useExpenseStats("month");

  // =====================================
  // GREETING
  // =====================================

  const today = new Date();

  const currentHour = today.getHours();

  let greeting = "";

  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  // =====================================
  // DATE
  // =====================================

  const formattedDate = today.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // =====================================
  // RETURN
  // =====================================

  return (
    <section className="hero">
      <div className="hero-left">
        <p className="hero-greeting">{greeting} 👋 Anwesha</p>
        <p className="hero-description">
          Keep track of your spending and stay on top of your monthly budget.
        </p>
      </div>

      <div className="hero-right">
        <div className="summary-card">
          <span>💰</span>

          <div>
            <p>{isOverBudget ? "Over Budget" : "Budget Left"}</p>

            <h2>
              ₹{(isOverBudget ? overBudget : budgetLeft).toLocaleString()}
            </h2>
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
