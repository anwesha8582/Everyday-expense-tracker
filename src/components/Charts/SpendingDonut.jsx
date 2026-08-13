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

  // =========================
  // RESPONSIVE CHART SIZE
  // =========================

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

  // =========================
  // CHART DATA
  // =========================

  const chartData = categories
    .map((category) => ({
      name: category.name,

      value: categoryTotals[category.name] || 0,

      color: category.color,
    }))
    .filter((item) => item.value > 0);

  // =========================
  // EMPTY STATE
  // =========================

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
      {/* =========================
          HEADER
      ========================= */}

      <div className="chart-header">
        <h2>Spending Distribution</h2>

        <p>See where your money is going.</p>
      </div>

      {/* =========================
          CHART
      ========================= */}

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
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => `₹${Number(value).toLocaleString()}`}
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SpendingDonut;
