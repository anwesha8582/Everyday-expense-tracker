import { useContext, useState } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import ExpenseList from "../components/ExpenseList/ExpenseList";
import categories from "../data/categories";
import "./Expenses.css";

function Expenses() {
  const { expenses } = useContext(ExpenseContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  // Search + Category Filter
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || expense.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort filtered expenses
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sortBy === "newest") {
      return b.id - a.id;
    }

    if (sortBy === "oldest") {
      return a.id - b.id;
    }

    if (sortBy === "highest") {
      return b.amount - a.amount;
    }

    if (sortBy === "lowest") {
      return a.amount - b.amount;
    }

    return 0;
  });

  return (
    <div className="expenses-page">
      {/* Page Header */}
      <div className="page-header">
        <h1>📋 All Expenses</h1>

        <p>Manage and track all your expenses in one place.</p>
      </div>

      {/* Search + Filter + Sort */}
      <div className="expense-toolbar">
        {/* Search */}
        <div className="search-box">
          <span>🔍</span>

          <input
            type="text"
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <select
          className="category-filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">📂 All Categories</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          className="sort-filter"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">↓ Newest First</option>

          <option value="oldest">↑ Oldest First</option>

          <option value="highest">₹ Highest Amount</option>

          <option value="lowest">₹ Lowest Amount</option>
        </select>
      </div>

      {/* Expense List */}
      <ExpenseList expenses={sortedExpenses} />
    </div>
  );
}

export default Expenses;
