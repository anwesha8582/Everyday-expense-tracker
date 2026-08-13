import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import useExpenseStats from "../../hooks/useExpenseStats";
import "./MonthlySpendingChart.css";

function MonthlySpendingChart({ period }) {
  const { monthlyTotals } = useExpenseStats(period);

  const chartData = Object.entries(monthlyTotals)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, amount]) => {
      const [year, monthNumber] = month.split("-");

      const date = new Date(Number(year), Number(monthNumber) - 1);

      return {
        month: date.toLocaleDateString("en-IN", {
          month: "short",
          year: "numeric",
        }),
        amount,
      };
    });

  if (chartData.length === 0) {
    return (
      <div className="monthly-chart empty-chart">
        <h3>📈 No trend data yet</h3>

        <p>Add expenses to see your monthly spending trend.</p>
      </div>
    );
  }

  return (
    <div className="monthly-chart">
      <div className="chart-header">
        <h2>Monthly Spending Trend</h2>

        <p>Track how your spending changes over time.</p>
      </div>

      <div className="monthly-chart-area">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 20,
              left: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />

            <Line
              type="monotone"
              dataKey="amount"
              stroke="#0f766e"
              strokeWidth={3}
              dot={{
                r: 5,
              }}
              activeDot={{
                r: 7,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MonthlySpendingChart;
