import Train from '../models/Train.js';

export const getTrainStatus = async (req, res) => {
  try {
    const trains = await Train.find();
    res.json(trains); // ✅ must return JSON
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch train status' });
  }
};
