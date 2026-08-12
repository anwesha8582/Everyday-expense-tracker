import { useContext } from "react";
import { ExpenseContext } from "../../context/ExpenseContext";
import { FaTrash } from "react-icons/fa";
import "./ExpenseList.css";

function ExpenseList({ expenses }) {
  const { expenses: allExpenses, setExpenses } = useContext(ExpenseContext);

  // Reverse the expenses so newest expense appears first
  const displayedExpenses = expenses;

  const totalAmount = displayedExpenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  );

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?",
    );

    if (!confirmDelete) return;

    const updatedExpenses = allExpenses.filter((expense) => expense.id !== id);

    setExpenses(updatedExpenses);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Grocery":
        return "🛒";

      case "Shopping":
        return "🛍️";

      case "Restaurant":
        return "🍔";

      case "Travel":
        return "✈️";

      case "Medical":
        return "❤️";

      case "Entertainment":
        return "🎬";

      default:
        return "📦";
    }
  };

  if (displayedExpenses.length === 0) {
    return (
      <div className="expense-list empty-state">
        <h2>📭 No Expenses Found</h2>
        <p>Try adding an expense or changing your search.</p>
      </div>
    );
  }

  return (
    <div className="expense-list">
      {/* Summary */}
      <div className="summary-box">
        <div>
          <h4>Total Expenses</h4>
          <p>{displayedExpenses.length}</p>
        </div>

        <div>
          <h4>Total Amount</h4>
          <p>₹{totalAmount.toLocaleString()}</p>
        </div>
      </div>

      {/* Expense Cards */}
      {displayedExpenses.map((expense) => (
        <div className="expense-card" key={expense.id}>
          <div className="expense-left">
            <span className="category-badge">
              {getCategoryIcon(expense.category)} {expense.category}
            </span>

            <h3>{expense.title}</h3>

            <p className="expense-date">
              {new Date(expense.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="expense-right">
            <h2 className="amount">₹{expense.amount.toLocaleString()}</h2>

            <button
              className="delete-btn"
              onClick={() => handleDelete(expense.id)}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;
