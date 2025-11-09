import express from 'express';
import { logStress } from '../controllers/logStressLevel.js';
import { textPrediction } from '../controllers/handleTextPrediction.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post("/logstress",verifyToken,logStress);
router.post("/text",textPrediction);
// import { body, query } from 'express-validator';

// import {
//   addStressDetection,
//   getStressHistory,
//   addWellnessActivity,
//   getWellnessActivities,
//   getDashboard,
//   suggestActivities
// } from '../controllers/stressControllers.js';

// const router = express.Router();

// All stress routes require authentication
// router.use(verifyToken);

// Validation middleware
// const stressDetectionValidation = [
//   body('stressLevel')
//     .isIn(['low', 'medium', 'high'])
//     .withMessage('Stress level must be low, medium, or high'),
  
//   body('confidence')
//     .isFloat({ min: 0, max: 1 })
//     .withMessage('Confidence must be between 0 and 1'),
  
//   body('inputType')
//     .isIn(['facial', 'voice', 'text', 'multimodal'])
//     .withMessage('Input type must be facial, voice, text, or multimodal'),
  
//   body('notes')
//     .optional()
//     .isLength({ max: 500 })
//     .withMessage('Notes cannot exceed 500 characters')
// ];

// const wellnessActivityValidation = [
//   body('activityType')
//     .isIn(['meditation', 'breathing', 'music', 'affirmation', 'exercise'])
//     .withMessage('Activity type must be meditation, breathing, music, affirmation, or exercise'),
  
//   body('duration')
//     .isInt({ min: 1, max: 480 })
//     .withMessage('Duration must be between 1 and 480 minutes'),
  
//   body('effectiveness')
//     .isInt({ min: 1, max: 5 })
//     .withMessage('Effectiveness must be between 1 and 5'),
  
//   body('notes')
//     .optional()
//     .isLength({ max: 500 })
//     .withMessage('Notes cannot exceed 500 characters')
// ];

// const queryValidation = [
//   query('days')
//     .optional()
//     .isInt({ min: 1, max: 365 })
//     .withMessage('Days must be between 1 and 365'),
  
//   query('limit')
//     .optional()
//     .isInt({ min: 1, max: 100 })
//     .withMessage('Limit must be between 1 and 100')
// ];

// // Stress detection routes (also records input)
// router.post('/detection', stressDetectionValidation, addStressDetection);
// router.get('/history', queryValidation, getStressHistory);

// // Wellness activity routes
// router.post('/wellness', wellnessActivityValidation, addWellnessActivity);
// router.get('/wellness', queryValidation, getWellnessActivities);

// // Dashboard route
// router.get('/dashboard', getDashboard);

// // AI suggestions
// router.post('/suggest', [
//   body('stressLevel')
//     .isIn(['low', 'medium', 'high'])
//     .withMessage('stressLevel must be low, medium, or high'),
//   body('preferences').optional().isObject()
// ], suggestActivities);

export default router;
