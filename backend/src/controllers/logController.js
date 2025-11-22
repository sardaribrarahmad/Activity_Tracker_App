const ActivityLog = require('../models/ActivityLog');

const createLog = async (req, res) => {
  try {
    const { user, action_type, description, value, timestamp } = req.body;

    // Validation
    if (!user || !action_type || !description || value === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: user, action_type, description, value'
      });
    }

    if (typeof value !== 'number' || isNaN(value)) {
      return res.status(400).json({
        success: false,
        message: 'Value must be a valid number'
      });
    }

    const logData = {
      user: user.trim(),
      action_type: action_type.trim(),
      description: description.trim(),
      value: Number(value),
      timestamp: timestamp ? new Date(timestamp) : new Date()
    };

    const log = new ActivityLog(logData);
    await log.save();

    res.status(201).json({
      success: true,
      data: log
    });
  } catch (error) {
    console.error('Error creating log:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create activity log',
      error: error.message
    });
  }
};

const getLogs = async (req, res) => {
  try {
    const {
      sortBy = 'timestamp',
      sortOrder = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    // Validate sortBy
    const allowedSortFields = ['timestamp', 'value', 'user', 'action_type'];
    const sortField = allowedSortFields.includes(sortBy) ? sortBy : 'timestamp';
    const sortDirection = sortOrder === 'asc' ? 1 : -1;

    // Validate pagination
    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.max(1, Math.min(100, parseInt(limit, 10))); // Max 100 items per page
    const skip = (pageNum - 1) * limitNum;

    // Build sort object
    const sort = {};
    sort[sortField] = sortDirection;

    // Query logs
    const logs = await ActivityLog.find()
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .lean();

    // Get total count for pagination metadata
    const total = await ActivityLog.countDocuments();

    res.json({
      success: true,
      data: logs,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch activity logs',
      error: error.message
    });
  }
};

module.exports = {
  createLog,
  getLogs
};

