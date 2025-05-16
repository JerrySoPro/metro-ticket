import Fare from '../models/Fare.js';

export const calculateFare = async (req, res) => {
  const { from, to } = req.query;
  try {
    const result = await Fare.findOne({ from, to });
    if (!result) {
      return res.status(404).json({ message: 'Fare not found' });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
