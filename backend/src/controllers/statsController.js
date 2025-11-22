const ActivityLog = require('../models/ActivityLog');

const getSummary = async (req, res) => {
  try {
    // Get total activities and total value
    const [totalActivities, totalValueResult, actionTypeStats, userStats] = await Promise.all([
      ActivityLog.countDocuments(),
      ActivityLog.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: '$value' }
          }
        }
      ]),
      ActivityLog.aggregate([
        {
          $group: {
            _id: '$action_type',
            count: { $sum: 1 }
          }
        },
        {
          $sort: { count: -1 }
        },
        {
          $limit: 1
        }
      ]),
      ActivityLog.aggregate([
        {
          $group: {
            _id: '$user',
            count: { $sum: 1 }
          }
        },
        {
          $sort: { count: -1 }
        },
        {
          $limit: 1
        }
      ])
    ]);

    const totalValue = totalValueResult.length > 0 ? totalValueResult[0].total : 0;
    const mostCommonAction = actionTypeStats.length > 0 ? actionTypeStats[0]._id : null;
    const mostActiveUser = userStats.length > 0 ? userStats[0]._id : null;

    res.json({
      success: true,
      data: {
        total_activities: totalActivities,
        total_value: totalValue,
        most_common_action: mostCommonAction,
        most_active_user: mostActiveUser
      }
    });
  } catch (error) {
    console.error('Error fetching summary stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch summary statistics',
      error: error.message
    });
  }
};

module.exports = {
  getSummary
};

