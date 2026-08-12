import { useContext, useState } from "react";
import { ExpenseContext } from "../../context/ExpenseContext";
import "./ExpenseForm.css";
import categories from "../../data/categories";

function ExpenseForm() {
  const { expenses, setExpenses } = useContext(ExpenseContext);
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Grocery");
  const [date, setDate] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    const newExpense = {
      id: Date.now(),
      title: expenseName,
      amount: Number(amount),
      category,
      date,
    };

    setExpenses([...expenses, newExpense]);
    setExpenseName("");
    setAmount("");
    setCategory("Grocery");
    setDate("");
  };
  return (
    <div className="expense-form">
      <h2>Add New Expense</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Expense Name</label>
          <input
            type="text"
            placeholder="Enter expense name"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default ExpenseForm;
