import express from 'express';
import { getProfile } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
const router = express.Router();

router.get('/profile', authMiddleware, getProfile);
router.post('/topup', authMiddleware, async (req, res) => {
  const { amount } = req.body;
  if (!amount || amount <= 0) return res.status(400).json({ error: 'Invalid amount' });

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.balance += amount;
    await user.save();

    //  Save transaction
    await Transaction.create({
      userId: user._id,
      amount,
      type: 'topup'
    });

    res.json({ message: 'Balance updated', balance: user.balance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to top up balance' });
  }
});


router.get('/transactions', authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch {
    res.status(500).json({ error: 'Profile fetch failed' });
  }
});


// Update profile info
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error('Update failed:', err);
    res.status(500).json({ error: 'Server error while updating profile' });
  }
});
export default router;
