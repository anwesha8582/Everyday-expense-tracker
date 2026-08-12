import "./DashboardCard.css";
import Icon from "../Common/Icon";

function DashboardCard({ icon, title, value, color }) {
  return (
    <div className="dashboard-card" style={{ borderTop: `5px solid ${color}` }}>
      <div className="card-icon">
        <Icon name={icon} />
      </div>

      <h3 className="card-title">{title}</h3>

      <h2 className="card-value">₹{(value ?? 0).toLocaleString()}</h2>
    </div>
  );
}

export default DashboardCard;
