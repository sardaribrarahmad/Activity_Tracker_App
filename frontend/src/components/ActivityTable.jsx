import './ActivityTable.css';

const ActivityTable = ({
  logs,
  sortBy,
  sortOrder,
  onSort,
  pagination,
  onPageChange,
  page,
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const SortIcon = ({ field }) => {
    if (sortBy !== field) return <span className="sort-icon">⇅</span>;
    return (
      <span className="sort-icon">
        {sortOrder === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  return (
    <div className="activity-table-container">
      <h2>Activity Logs</h2>
      <div className="table-wrapper">
        <table className="activity-table">
          <thead>
            <tr>
              <th onClick={() => onSort('user')} className="sortable">
                User <SortIcon field="user" />
              </th>
              <th onClick={() => onSort('action_type')} className="sortable">
                Action Type <SortIcon field="action_type" />
              </th>
              <th>Description</th>
              <th onClick={() => onSort('value')} className="sortable">
                Value <SortIcon field="value" />
              </th>
              <th onClick={() => onSort('timestamp')} className="sortable">
                Timestamp <SortIcon field="timestamp" />
              </th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-state">
                  No activity logs found. Create your first log!
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log._id}>
                  <td>{log.user}</td>
                  <td>
                    <span className="action-badge">{log.action_type}</span>
                  </td>
                  <td className="description-cell">{log.description}</td>
                  <td className="value-cell">
                    {log.value.toLocaleString()}
                  </td>
                  <td>{formatDate(log.timestamp)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="pagination-button"
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {pagination.page} of {pagination.totalPages} (
            {pagination.total} total)
          </span>
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page >= pagination.totalPages}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityTable;

