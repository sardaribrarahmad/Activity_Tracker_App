import './SummaryCards.css';

const SummaryCards = ({ stats }) => {
  if (!stats) {
    return (
      <div className="summary-cards">
        <div className="summary-card loading">Loading...</div>
        <div className="summary-card loading">Loading...</div>
        <div className="summary-card loading">Loading...</div>
        <div className="summary-card loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="summary-cards">
      <div className="summary-card">
        <div className="card-icon">📊</div>
        <div className="card-content">
          <h3>Total Activities</h3>
          <p className="card-value">{stats.total_activities || 0}</p>
        </div>
      </div>

      <div className="summary-card">
        <div className="card-icon">💰</div>
        <div className="card-content">
          <h3>Total Value</h3>
          <p className="card-value">
            {stats.total_value?.toLocaleString() || 0}
          </p>
        </div>
      </div>

      <div className="summary-card">
        <div className="card-icon">⚡</div>
        <div className="card-content">
          <h3>Most Common Action</h3>
          <p className="card-value">
            {stats.most_common_action || 'N/A'}
          </p>
        </div>
      </div>

      <div className="summary-card">
        <div className="card-icon">👤</div>
        <div className="card-content">
          <h3>Most Active User</h3>
          <p className="card-value">
            {stats.most_active_user || 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;

