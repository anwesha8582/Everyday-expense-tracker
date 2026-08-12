import { useContext } from "react";
import { ExpenseContext } from "../../context/ExpenseContext";
import DashboardCard from "./DashboardCard";
import "./Dashboard.css";

function Dashboard() {
  const { expenses, monthlyBudget } = useContext(ExpenseContext);

  // Calculate total expense
  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0,
  );

  // Calculate category total
  const getCategoryTotal = (categoryName) => {
    return expenses
      .filter((expense) => expense.category === categoryName)
      .reduce((total, expense) => total + expense.amount, 0);
  };

  const groceryTotal = getCategoryTotal("Grocery");
  const shoppingTotal = getCategoryTotal("Shopping");
  const restaurantTotal = getCategoryTotal("Restaurant");

  // Calculate remaining budget
  const budgetLeft = monthlyBudget - totalExpense;

  // Dashboard card data
  const dashboardData = [
    {
      id: 1,
      icon: "wallet",
      title: "Total Expense",
      value: totalExpense,
      color: "#F59E0B",
    },
    {
      id: 2,
      icon: "grocery",
      title: "Grocery",
      value: groceryTotal,
      color: "#22C55E",
    },
    {
      id: 3,
      icon: "shopping",
      title: "Shopping",
      value: shoppingTotal,
      color: "#A855F7",
    },
    {
      id: 4,
      icon: "restaurant",
      title: "Restaurant",
      value: restaurantTotal,
      color: "#EF4444",
    },
    {
      id: 5,
      icon: "budget",
      title: "Budget Left",
      value: budgetLeft,
      color: "#3B82F6",
    },
  ];

  return (
    <div className="dashboard-grid">
      {dashboardData.map((card) => (
        <DashboardCard
          key={card.id}
          icon={card.icon}
          title={card.title}
          value={card.value}
          color={card.color}
        />
      ))}
    </div>
  );
}

export default Dashboard;
