import { useContext } from "react";
import { ExpenseContext } from "../context/ExpenseContext";
import "./Home.css";
import Hero from "../components/Hero/Hero";
import Dashboard from "../components/Dashboard/Dashboard";
import ExpenseList from "../components/ExpenseList/ExpenseList";

function Home() {
  const { expenses } = useContext(ExpenseContext);

  // Get the latest 5 expenses
  const recentExpenses = [...expenses].slice(-5).reverse();

  return (
    <div className="home">
      <Hero />
      <Dashboard />
      <ExpenseList expenses={recentExpenses} />
    </div>
  );
}

export default Home;
