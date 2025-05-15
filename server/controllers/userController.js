import User from '../models/User.js';

export const getProfile = async (req, res) => {
  try {
    console.log("🔍 Request user object:", req.user); // <=== debug line

    if (!req.user || !req.user._id) {
      console.log("❌ Missing user._id from token!");
      return res.status(400).json({ error: 'Invalid token or missing _id' });
    }

    const user = await User.findById(req.user._id).select('-password');

    if (!user) {
      console.log("❌ User not found in database!");
      return res.status(404).json({ error: 'User not found' });
    }

    console.log("✅ User found:", user);
    res.json(user);

  } catch (err) {
    console.error("❌ getProfile ERROR:", err);
    res.status(500).json({ error: 'Server error', detail: err.message });
  }
};
