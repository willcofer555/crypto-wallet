import express from 'express';
import { getAnalyticsData, generateReport} from '../controllers/analyticsController';
import { authMiddleware } from '../controllers/authController';


const router = express.Router();

router.get('/analytics', authMiddleware, getAnalyticsData);
router.get('/report', authMiddleware, generateReport);

export default router;
