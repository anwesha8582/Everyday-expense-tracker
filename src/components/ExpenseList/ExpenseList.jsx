import { useContext, useState } from "react";
import { ExpenseContext } from "../../context/ExpenseContext";
import { FaTrash, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import categories from "../../data/categories";
import Icon from "../Common/Icon";
import "./ExpenseList.css";

function ExpenseList({ expenses }) {
  const { expenses: allExpenses, setExpenses } = useContext(ExpenseContext);

  // ID of the expense currently being edited
  const [editingId, setEditingId] = useState(null);

  // Edit form state
  const [editForm, setEditForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  // =====================================
  // GET CATEGORY DATA
  // =====================================

  const getCategoryData = (categoryName) => {
    return (
      categories.find((category) => category.name === categoryName) || {
        name: categoryName,
        icon: "other",
        color: "#64748B",
      }
    );
  };

  // =====================================
  // DELETE EXPENSE
  // =====================================

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?",
    );

    if (!confirmDelete) return;

    const updatedExpenses = allExpenses.filter((expense) => expense.id !== id);

    setExpenses(updatedExpenses);
  };

  // =====================================
  // START EDIT
  // =====================================

  const handleEdit = (expense) => {
    setEditingId(expense.id);

    setEditForm({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
    });
  };

  // =====================================
  // HANDLE EDIT INPUT
  // =====================================

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================
  // SAVE EDIT
  // =====================================

  const handleSave = (id) => {
    if (
      !editForm.title.trim() ||
      !editForm.amount ||
      Number(editForm.amount) <= 0 ||
      !editForm.category ||
      !editForm.date
    ) {
      alert("Please fill all fields with valid values.");
      return;
    }

    const updatedExpenses = allExpenses.map((expense) => {
      if (expense.id === id) {
        return {
          ...expense,
          title: editForm.title.trim(),
          amount: Number(editForm.amount),
          category: editForm.category,
          date: editForm.date,
        };
      }

      return expense;
    });

    setExpenses(updatedExpenses);

    handleCancel();
  };

  // =====================================
  // CANCEL EDIT
  // =====================================

  const handleCancel = () => {
    setEditingId(null);

    setEditForm({
      title: "",
      amount: "",
      category: "",
      date: "",
    });
  };

  // =====================================
  // DISPLAYED EXPENSES
  // =====================================

  const displayedExpenses = expenses;

  // =====================================
  // EMPTY STATE
  // =====================================

  if (displayedExpenses.length === 0) {
    return (
      <div className="expense-list empty-state">
        <div className="empty-icon">📭</div>

        <h2>No Expenses Found</h2>

        <p>Try adding an expense or changing your search/filter.</p>
      </div>
    );
  }

  // =====================================
  // TOTAL AMOUNT
  // =====================================

  const totalAmount = displayedExpenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  );

  return (
    <div className="expense-list">
      {/* =====================================
          SUMMARY
      ===================================== */}

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

      {/* =====================================
          EXPENSE CARDS
      ===================================== */}

      {displayedExpenses.map((expense) => {
        const categoryData = getCategoryData(expense.category);

        return (
          <div className="expense-card" key={expense.id}>
            {/* =================================
                EDIT MODE
            ================================= */}

            {editingId === expense.id ? (
              <div className="edit-form">
                <div className="edit-form-header">
                  <div>
                    <h3>✏️ Edit Expense</h3>

                    <p>Update your expense details.</p>
                  </div>
                </div>

                {/* Expense Name */}

                <div className="edit-field">
                  <label>Expense Name</label>

                  <input
                    type="text"
                    name="title"
                    value={editForm.title}
                    onChange={handleEditChange}
                    placeholder="Enter expense name"
                  />
                </div>

                {/* Amount */}

                <div className="edit-field">
                  <label>Amount</label>

                  <div className="edit-amount-input">
                    <span>₹</span>

                    <input
                      type="number"
                      name="amount"
                      value={editForm.amount}
                      onChange={handleEditChange}
                      placeholder="Enter amount"
                    />
                  </div>
                </div>

                {/* Category */}

                <div className="edit-field">
                  <label>Category</label>

                  <select
                    name="category"
                    value={editForm.category}
                    onChange={handleEditChange}
                  >
                    {categories.map((category) => (
                      <option key={category.name} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}

                <div className="edit-field">
                  <label>Date</label>

                  <input
                    type="date"
                    name="date"
                    value={editForm.date}
                    onChange={handleEditChange}
                  />
                </div>

                {/* Buttons */}

                <div className="edit-actions">
                  <button
                    type="button"
                    className="save-btn"
                    onClick={() => handleSave(expense.id)}
                  >
                    <FaSave />
                    Save Changes
                  </button>

                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={handleCancel}
                  >
                    <FaTimes />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* =================================
                  NORMAL MODE
              ================================= */

              <>
                <div className="expense-left">
                  {/* Category */}

                  <span
                    className="category-badge"
                    style={{
                      "--category-color": categoryData.color,
                    }}
                  >
                    <Icon name={categoryData.icon} />

                    <span>{categoryData.name}</span>
                  </span>

                  {/* Title */}

                  <h3>{expense.title}</h3>

                  {/* Date */}

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
                      type="button"
                      className="edit-btn"
                      onClick={() => handleEdit(expense)}
                      title="Edit Expense"
                      aria-label="Edit Expense"
                    >
                      <FaEdit />
                    </button>

                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleDelete(expense.id)}
                      title="Delete Expense"
                      aria-label="Delete Expense"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ExpenseList;
