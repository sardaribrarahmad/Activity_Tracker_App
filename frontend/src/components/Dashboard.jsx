import { useState, useEffect } from 'react';
import { logsAPI, statsAPI } from '../services/api';
import SummaryCards from './SummaryCards';
import ActivityTable from './ActivityTable';
import AddLogModal from './AddLogModal';
import './Dashboard.css';

const Dashboard = ({ onLogout }) => {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  const fetchLogs = async () => {
    try {
      const response = await logsAPI.getLogs({
        sortBy,
        sortOrder,
        page,
        limit: 10,
      });
      if (response.success) {
        setLogs(response.data);
        setPagination(response.pagination);
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await statsAPI.getSummary();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchLogs(), fetchStats()]);
      setLoading(false);
    };
    loadData();
  }, [sortBy, sortOrder, page]);

  const handleAddLog = async (logData) => {
    try {
      await logsAPI.createLog(logData);
      setShowModal(false);
      // Refresh both logs and stats
      await Promise.all([fetchLogs(), fetchStats()]);
    } catch (error) {
      console.error('Error creating log:', error);
      throw error;
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
    setPage(1);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Activity Dashboard</h1>
        <button onClick={onLogout} className="logout-button">
          Logout
        </button>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-actions">
          <button
            onClick={() => setShowModal(true)}
            className="add-log-button"
          >
            + Add Activity Log
          </button>
        </div>

        <SummaryCards stats={stats} />

        <ActivityTable
          logs={logs}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={handleSort}
          pagination={pagination}
          onPageChange={setPage}
          page={page}
        />
      </div>

      {showModal && (
        <AddLogModal
          onClose={() => setShowModal(false)}
          onSave={handleAddLog}
        />
      )}
    </div>
  );
};

export default Dashboard;

