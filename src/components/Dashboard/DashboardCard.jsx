import "./DashboardCard.css";
import Icon from "../Common/Icon";

function DashboardCard({ icon, title, value, color }) {
  return (
    <div
      className="dashboard-card"
      style={{
        "--card-color": color,
      }}
    >
      <div className="card-icon">
        <Icon name={icon} />
      </div>

      <div>
        <h3 className="card-title">{title}</h3>

        <h2 className="card-value">₹{value.toLocaleString()}</h2>
      </div>
    </div>
  );
}

export default DashboardCard;
