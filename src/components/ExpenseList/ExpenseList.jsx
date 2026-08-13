import { useContext, useState } from "react";
import { ExpenseContext } from "../../context/ExpenseContext";
import { FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import categories from "../../data/categories";
import "./ExpenseList.css";

function ExpenseList({ expenses }) {
  const { expenses: allExpenses, setExpenses } = useContext(ExpenseContext);
  // ID of the expense currently being edited
  const [editingId, setEditingId] = useState(null);
  // Edit form values
  const [editForm, setEditForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  // =========================
  // DELETE EXPENSE
  // =========================

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?",
    );

    if (!confirmDelete) return;

    const updatedExpenses = allExpenses.filter((expense) => expense.id !== id);

    setExpenses(updatedExpenses);
  };

  // =========================
  // START EDITING
  // =========================

  const handleEdit = (expense) => {
    setEditingId(expense.id);

    setEditForm({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
    });
  };

  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  // =========================
  // SAVE EDIT
  // =========================

  const handleSave = (id) => {
    if (
      !editForm.title.trim() ||
      !editForm.amount ||
      !editForm.category ||
      !editForm.date
    ) {
      alert("Please fill all fields.");
      return;
    }

    const updatedExpenses = allExpenses.map((expense) => {
      if (expense.id === id) {
        return {
          ...expense,
          title: editForm.title,
          amount: Number(editForm.amount),
          category: editForm.category,
          date: editForm.date,
        };
      }

      return expense;
    });

    setExpenses(updatedExpenses);
    setEditingId(null);
    setEditForm({
      title: "",
      amount: "",
      category: "",
      date: "",
    });
  };

  // =========================
  // CANCEL EDIT
  // =========================

  const handleCancel = () => {
    setEditingId(null);

    setEditForm({
      title: "",
      amount: "",
      category: "",
      date: "",
    });
  };

  // =========================
  // CATEGORY ICON
  // =========================

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

  const displayedExpenses = expenses;

  // =========================
  // EMPTY STATE
  // =========================

  if (displayedExpenses.length === 0) {
    return (
      <div className="expense-list empty-state">
        <h2>📭 No Expenses Found</h2>
        <p>Try adding an expense or changing your search.</p>
      </div>
    );
  }

  // =========================
  // TOTAL
  // =========================

  const totalAmount = displayedExpenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  );

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
          {editingId === expense.id ? (
            /* =========================
               EDIT FORM
            ========================= */

            <div className="edit-form">
              <h3>✏️ Edit Expense</h3>

              <div className="edit-field">
                <label>Expense Name</label>

                <input
                  type="text"
                  name="title"
                  value={editForm.title}
                  onChange={handleEditChange}
                />
              </div>

              <div className="edit-field">
                <label>Amount</label>

                <input
                  type="number"
                  name="amount"
                  value={editForm.amount}
                  onChange={handleEditChange}
                />
              </div>

              <div className="edit-field">
                <label>Category</label>

                <select
                  name="category"
                  value={editForm.category}
                  onChange={handleEditChange}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="edit-field">
                <label>Date</label>

                <input
                  type="date"
                  name="date"
                  value={editForm.date}
                  onChange={handleEditChange}
                />
              </div>

              <div className="edit-actions">
                <button
                  className="save-btn"
                  onClick={() => handleSave(expense.id)}
                >
                  <FaSave />
                  Save
                </button>

                <button className="cancel-btn" onClick={handleCancel}>
                  <FaTimes />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            /* =========================
               NORMAL EXPENSE
            ========================= */

            <>
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

                <div className="expense-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(expense)}
                    title="Edit Expense"
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(expense.id)}
                    title="Delete Expense"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;
