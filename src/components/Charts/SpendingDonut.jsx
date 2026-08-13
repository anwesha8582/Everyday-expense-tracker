import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import useExpenseStats from "../../hooks/useExpenseStats";
import categories from "../../data/categories";
import "./SpendingDonut.css";

function SpendingDonut({ period }) {
  const { categoryTotals } = useExpenseStats(period);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 650);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => {
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  const chartData = categories
    .map((category) => ({
      name: category,
      value: categoryTotals[category] || 0,
    }))
    .filter((item) => item.value > 0);

  const colors = [
    "#22C55E",
    "#A855F7",
    "#EF4444",
    "#3B82F6",
    "#EC4899",
    "#F59E0B",
    "#6366F1",
    "#14B8A6",
    "#8B5CF6",
    "#F97316",
    "#06B6D4",
    "#64748B",
  ];

  if (chartData.length === 0) {
    return (
      <div className="donut-empty">
        <h3>📊 No spending data yet</h3>
        <p>Add some expenses to see your category breakdown.</p>
      </div>
    );
  }

  return (
    <div className="spending-donut">
      <div className="chart-header">
        <div>
          <h2>Spending by Category</h2>
          <p>See where your money is going.</p>
        </div>
      </div>

      <div className="donut-chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={isMobile ? 75 : 105}
              outerRadius={isMobile ? 110 : 155}
              paddingAngle={3}
            >
              {chartData.map((entry, index) => (
                <Cell key={entry.name} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SpendingDonut;
