import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <div className="logo-icon">💸</div>
          <div className="logo-text">
            <h2> Everyday Expense</h2>
            <p>Track • Save • Grow</p>
          </div>
        </div>

        <div className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
          <NavLink
            to="/add-expense"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Add Expense
          </NavLink>
          <NavLink
            to="/expenses"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Expenses
          </NavLink>

          <NavLink
            to="/budget"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Budget
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
