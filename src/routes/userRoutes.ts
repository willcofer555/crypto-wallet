import express from 'express';
import { updateUserProfile, changePassword } from '../controllers/userController';

const router = express.Router();

router.put('/profile', updateUserProfile);
router.put('/password', changePassword);

export default router;