import { useState } from 'react';
import { logsAPI } from '../services/api';
import './AddLogModal.css';

const AddLogModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    user: '',
    action_type: '',
    description: '',
    value: '',
    timestamp: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'value' ? (value === '' ? '' : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.user || !formData.action_type || !formData.description || formData.value === '') {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      const logData = {
        ...formData,
        timestamp: formData.timestamp || new Date().toISOString(),
      };
      await onSave(logData);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create activity log');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Activity Log</h2>
          <button onClick={onClose} className="close-button">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="user">User *</label>
            <input
              id="user"
              name="user"
              type="text"
              value={formData.user}
              onChange={handleChange}
              placeholder="John Doe"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="action_type">Action Type *</label>
            <select
              id="action_type"
              name="action_type"
              value={formData.action_type}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="">Select action type</option>
              <option value="created">Created</option>
              <option value="updated">Updated</option>
              <option value="deleted">Deleted</option>
              <option value="viewed">Viewed</option>
              <option value="shared">Shared</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the activity..."
              rows="3"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="value">Value *</label>
            <input
              id="value"
              name="value"
              type="number"
              value={formData.value}
              onChange={handleChange}
              placeholder="0"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="timestamp">Timestamp</label>
            <input
              id="timestamp"
              name="timestamp"
              type="datetime-local"
              value={formData.timestamp}
              onChange={handleChange}
              disabled={loading}
            />
            <small>Leave empty to use current time</small>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="cancel-button"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="save-button"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Log'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLogModal;

