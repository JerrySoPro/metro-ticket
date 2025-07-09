import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import Ticket from '../models/Ticket.js';  // Add this import

const router = express.Router();

router.post('/book', authMiddleware, async (req, res) => {
  try {
    const { origin, destination, date, time, type } = req.body;

    if (!origin || !destination || !date || !time || !type) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const ticket = await Ticket.create({
      userId: req.user._id,
      origin,
      destination,
      date,
      time,
      type,
      createdAt: new Date()
    });

    res.status(201).json(ticket);
  } catch (err) {
    console.error('Booking failed:', err);
    res.status(500).json({ error: 'Booking failed' });
  }
});

export default router;