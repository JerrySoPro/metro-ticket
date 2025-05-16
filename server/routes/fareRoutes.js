import express from 'express';
import { calculateFare } from '../controllers/fareController.js';

const router = express.Router();

router.get('/calculate', calculateFare);

export default router;
