import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      {/* =========================
          LOGO
      ========================= */}

      <div className="logo">
        <div className="logo-icon">💸</div>

        <div className="logo-text">
          <h2>Everyday Expense</h2>

          <p>Track • Save • Grow</p>
        </div>
      </div>

      {/* =========================
          MOBILE MENU BUTTON
      ========================= */}

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* =========================
          NAV LINKS
      ========================= */}

      <div className={`nav-links ${menuOpen ? "menu-open" : ""}`}>
        <NavLink
          to="/"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>

        <NavLink
          to="/add-expense"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Add Expense
        </NavLink>

        <NavLink
          to="/expenses"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Expenses
        </NavLink>

        <NavLink
          to="/reports"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Reports
        </NavLink>

        <NavLink
          to="/budget"
          onClick={closeMenu}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Budget
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
