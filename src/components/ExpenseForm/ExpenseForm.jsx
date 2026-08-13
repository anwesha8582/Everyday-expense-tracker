import { useContext, useState } from "react";
import { ExpenseContext } from "../../context/ExpenseContext";
import "./ExpenseForm.css";
import categories from "../../data/categories";

function ExpenseForm() {
  const { expenses, setExpenses } = useContext(ExpenseContext);

  const [expenseName, setExpenseName] = useState("");

  const [amount, setAmount] = useState("");

  const [category, setCategory] = useState(categories[0]?.name || "");

  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !expenseName.trim() ||
      !amount ||
      Number(amount) <= 0 ||
      !category ||
      !date
    ) {
      alert("Please fill all fields with valid values.");
      return;
    }

    const newExpense = {
      id: Date.now(),
      title: expenseName.trim(),
      amount: Number(amount),
      category,
      date,
    };

    setExpenses([...expenses, newExpense]);

    setExpenseName("");
    setAmount("");
    setCategory(categories[0]?.name || "");
    setDate("");
  };

  return (
    <div className="expense-form">
      <h2>Add New Expense</h2>

      <form onSubmit={handleSubmit}>
        {/* Expense Name */}

        <div className="form-group">
          <label>Expense Name</label>

          <input
            type="text"
            placeholder="Enter expense name"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
          />
        </div>

        {/* Amount */}

        <div className="form-group">
          <label>Amount</label>

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* Category */}

        <div className="form-group">
          <label>Category</label>

          <select
            value={category.name}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((item) => (
              <option key={item.name} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}

        <div className="form-group">
          <label>Date</label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Submit */}

        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default ExpenseForm;
