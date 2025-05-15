import express from 'express';
import { getProfile } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', authMiddleware, getProfile);

// ✅ Use default export
export default router;
