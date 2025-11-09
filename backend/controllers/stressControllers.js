// import { validationResult } from 'express-validator';
// import InputData from '../models/InputData.js';
// import StressLog from '../models/StressLog.js';
// import RelaxationActivity from '../models/RelaxationActivity.js';
// import ActivityLog from '../models/ActivityLog.js';
// import StressLogInputLink from '../models/StressLog_InputData.js';

// // Add stress detection result (creates InputData if provided, then StressLog)
// export const addStressDetection = async (req, res) => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         message: 'Validation failed',
//         errors: errors.array()
//       });
//     }

//     const { stressLevel, confidence, inputType, notes, inputPayload } = req.body;

//     // Create InputData record
//     const input = await InputData.create({
//       userId: req.userId,
//       inputType,
//       payload: inputPayload || {}
//     });

//     // Create StressLog record
//     const stress = await StressLog.create({
//       userId: req.userId,
//       inputDataId: input._id,
//       stressLevel,
//       confidence,
//       prompts: notes ? [notes] : []
//     });

//     await StressLogInputLink.create({ stressLogId: stress._id, inputDataId: input._id });

//     const recommendations = getPersonalizedRecommendations(stressLevel, {});

//     res.status(201).json({
//       success: true,
//       message: 'Stress detection recorded successfully',
//       data: {
//         stressLog: stress,
//         inputData: input,
//         recommendations
//       }
//     });

//   } catch (error) {
//     console.error('Add stress detection error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// };

// // Get stress history
// export const getStressHistory = async (req, res) => {
//   try {
//     const { days = 30, limit = 50 } = req.query;
//     const cutoffDate = new Date();
//     cutoffDate.setDate(cutoffDate.getDate() - parseInt(days));

//     const stressHistory = await StressLog.find({
//       userId: req.userId,
//       timestamp: { $gte: cutoffDate }
//     })
//       .sort({ timestamp: -1 })
//       .limit(parseInt(limit))
//       .populate({ path: 'inputDataId', select: 'inputType createdAt' });

//     const stats = await getStressStatsFromCollection(req.userId, parseInt(days));

//     res.status(200).json({
//       success: true,
//       message: 'Stress history retrieved successfully',
//       data: {
//         stressHistory,
//         statistics: stats,
//         period: `${days} days`
//       }
//     });

//   } catch (error) {
//     console.error('Get stress history error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// };

// // Add wellness activity (user activity log)
// export const addWellnessActivity = async (req, res) => {
//   try {
//     // Check for validation errors
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         message: 'Validation failed',
//         errors: errors.array()
//       });
//     }

//     const { activityType, duration, effectiveness, notes, activityId, linkedStressLogId } = req.body;

//     // Optional: ensure a catalog activity exists
//     let catalogActivity = null;
//     if (activityId) {
//       catalogActivity = await RelaxationActivity.findById(activityId);
//     }

//     const created = await ActivityLog.create({
//       userId: req.userId,
//       activityId: catalogActivity ? catalogActivity._id : undefined,
//       activityType,
//       duration: parseInt(duration),
//       effectiveness: parseInt(effectiveness),
//       notes: notes || '',
//       linkedStressLogId: linkedStressLogId || undefined
//     });

//     res.status(201).json({
//       success: true,
//       message: 'Wellness activity recorded successfully',
//       data: { activity: created }
//     });

//   } catch (error) {
//     console.error('Add wellness activity error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// };

// // Get wellness activities
// export const getWellnessActivities = async (req, res) => {
//   try {
//     const { days = 30, limit = 50 } = req.query;
//     const cutoffDate = new Date();
//     cutoffDate.setDate(cutoffDate.getDate() - parseInt(days));

//     const activities = await ActivityLog.find({
//       userId: req.userId,
//       timestamp: { $gte: cutoffDate }
//     })
//       .sort({ timestamp: -1 })
//       .limit(parseInt(limit))
//       .populate({ path: 'activityId', select: 'activityType title' });

//     const stats = await getWellnessStatsFromCollection(req.userId, parseInt(days));

//     res.status(200).json({
//       success: true,
//       message: 'Wellness activities retrieved successfully',
//       data: {
//         activities,
//         statistics: stats,
//         period: `${days} days`
//       }
//     });

//   } catch (error) {
//     console.error('Get wellness activities error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// };

// // Get dashboard data
// export const getDashboard = async (req, res) => {
//   try {
//     const stressStats = await getStressStatsFromCollection(req.userId, 7);
//     const wellnessStats = await getWellnessStatsFromCollection(req.userId, 7);

//     const recentStress = await StressLog.find({ userId: req.userId })
//       .sort({ timestamp: -1 })
//       .limit(5);

//     const recentActivities = await ActivityLog.find({ userId: req.userId })
//       .sort({ timestamp: -1 })
//       .limit(5)
//       .populate({ path: 'activityId', select: 'title activityType' });

//     const historyForTrend = await StressLog.find({ userId: req.userId })
//       .sort({ timestamp: -1 })
//       .limit(100);
//     const stressTrend = calculateStressTrend(historyForTrend, 7);

//     res.status(200).json({
//       success: true,
//       message: 'Dashboard data retrieved successfully',
//       data: {
//         stressStats,
//         wellnessStats,
//         recentStress,
//         recentActivities,
//         stressTrend,
//         userPreferences: {}
//       }
//     });

//   } catch (error) {
//     console.error('Get dashboard error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// };

// // Helper: static fallback suggestions shaped like Gemini output
// const getPersonalizedRecommendations = (stressLevel, preferences) => {
//   if (stressLevel === 'low') {
//     return [
//       { activityType: 'humor', title: 'Quick Meme Break', description: 'AI-curated light memes to keep the good mood.', duration: 8 },
//       { activityType: 'humor', title: 'Wholesome Jokes', description: 'Short, uplifting jokes to refresh your mind.', duration: 6 },
//       { activityType: 'music', title: 'Feel-Good Tunes', description: 'Upbeat, light background music for a boost.', duration: 12 }
//     ];
//   }
//   if (stressLevel === 'medium') {
//     return [
//       { activityType: 'breathing', title: 'Box Breathing Animation', description: 'Follow a calming 4-4-4-4 guided animation.', duration: 8 },
//       { activityType: 'music', title: 'Calming Ambient Playlist', description: 'Soft ambient sounds to reduce tension.', duration: 15 },
//       { activityType: 'breathing', title: '4-7-8 Guided Breath', description: 'Reduce anxiety with paced 4-7-8 breaths.', duration: 10 }
//     ];
//   }
//   // high
//   return [
//     { activityType: 'affirmation', title: 'Grounding Affirmations', description: 'AI-generated affirmations to restore calm.', duration: 10 },
//     { activityType: 'meditation', title: 'Body Scan Meditation', description: 'Guided scan to release deep-held tension.', duration: 15 },
//     { activityType: 'meditation', title: 'Loving-Kindness Practice', description: 'Cultivate warmth and safety sensations.', duration: 12 }
//   ];
// };

// // Helper function to calculate stress trend
// const calculateStressTrend = (stressHistoryDocs, days) => {
//   const cutoffDate = new Date();
//   cutoffDate.setDate(cutoffDate.getDate() - days);

//   const recentEntries = stressHistoryDocs.filter(entry => (entry.timestamp || entry.date) >= cutoffDate);
  
//   if (recentEntries.length < 2) {
//     return { trend: 'insufficient_data', change: 0 };
//   }

//   // Calculate average stress level for first and second half of period
//   const midPoint = Math.floor(recentEntries.length / 2);
//   const firstHalf = recentEntries.slice(0, midPoint);
//   const secondHalf = recentEntries.slice(midPoint);

//   const firstHalfAvg = firstHalf.reduce((sum, entry) => {
//     const level = entry.stressLevel === 'low' ? 1 : entry.stressLevel === 'medium' ? 2 : 3;
//     return sum + level;
//   }, 0) / firstHalf.length;

//   const secondHalfAvg = secondHalf.reduce((sum, entry) => {
//     const level = entry.stressLevel === 'low' ? 1 : entry.stressLevel === 'medium' ? 2 : 3;
//     return sum + level;
//   }, 0) / secondHalf.length;

//   const change = secondHalfAvg - firstHalfAvg;
  
//   let trend = 'stable';
//   if (change > 0.2) trend = 'increasing';
//   else if (change < -0.2) trend = 'decreasing';

//   return { trend, change: Math.round(change * 100) / 100 };
// };

// // Stats helpers using collections
// const getStressStatsFromCollection = async (userId, days = 30) => {
//   const cutoff = new Date();
//   cutoff.setDate(cutoff.getDate() - days);
//   const docs = await StressLog.find({ userId, timestamp: { $gte: cutoff } });
//   const count = docs.length;
//   const score = { low: 1, medium: 2, high: 3 };
//   const avg = count === 0 ? 0 : docs.reduce((s, d) => s + score[d.stressLevel], 0) / count;
//   const distribution = docs.reduce((acc, d) => {
//     acc[d.stressLevel] = (acc[d.stressLevel] || 0) + 1;
//     return acc;
//   }, { low: 0, medium: 0, high: 0 });
//   return { entries: count, averageLevelScore: Math.round(avg * 100) / 100, distribution };
// };

// const getWellnessStatsFromCollection = async (userId, days = 30) => {
//   const cutoff = new Date();
//   cutoff.setDate(cutoff.getDate() - days);
//   const docs = await ActivityLog.find({ userId, timestamp: { $gte: cutoff } });
//   const totalDuration = docs.reduce((s, d) => s + (d.duration || 0), 0);
//   const avgEff = docs.length === 0 ? 0 : docs.reduce((s, d) => s + (d.effectiveness || 0), 0) / docs.length;
//   const distribution = docs.reduce((acc, d) => {
//     acc[d.activityType] = (acc[d.activityType] || 0) + 1;
//     return acc;
//   }, { meditation: 0, breathing: 0, music: 0, affirmation: 0, exercise: 0 });
//   return { entries: docs.length, totalDuration, averageEffectiveness: Math.round(avgEff * 100) / 100, distribution };
// };
