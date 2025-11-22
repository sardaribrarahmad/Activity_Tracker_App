const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
    trim: true
  },
  action_type: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  value: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  }
}, {
  timestamps: false // We're using our own timestamp field
});

// Index for better query performance
activityLogSchema.index({ timestamp: -1 });
activityLogSchema.index({ user: 1 });
activityLogSchema.index({ action_type: 1 });

module.exports = mongoose.model('ActivityLog', activityLogSchema);

