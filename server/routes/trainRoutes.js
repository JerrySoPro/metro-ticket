import express from 'express';
import { getTrainStatus } from '../controllers/trainController.js';

const router = express.Router();

router.get('/', getTrainStatus);

export default router;
