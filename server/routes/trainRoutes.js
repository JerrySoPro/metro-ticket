import express from 'express';
import TrainStatus from '../models/TrainStatus.js';

const router = express.Router();


router.get('/status', async (req, res) => {
  try {
    const trainStatuses = await TrainStatus.find().sort({ trainNumber: 1 });
    res.json(trainStatuses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch train status' });
  }
});


router.get('/status/:trainNumber', async (req, res) => {
  try {
    const train = await TrainStatus.findOne({ trainNumber: req.params.trainNumber });
    if (!train) {
      return res.status(404).json({ error: 'Train not found' });
    }
    res.json(train);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch train status' });
  }
});


router.post('/status', async (req, res) => {
  try {
    const trainStatus = new TrainStatus(req.body);
    await trainStatus.save();
    res.status(201).json(trainStatus);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create train status' });
  }
});


router.put('/status/:trainNumber', async (req, res) => {
  try {
    const train = await TrainStatus.findOneAndUpdate(
      { trainNumber: req.params.trainNumber },
      { ...req.body, lastUpdated: new Date() },
      { new: true }
    );
    if (!train) {
      return res.status(404).json({ error: 'Train not found' });
    }
    res.json(train);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update train status' });
  }
});

router.post('/seed', async (req, res) => {
  try {

    await TrainStatus.deleteMany({});
    

    const sampleTrains = [

    ];
    
    const insertedTrains = await TrainStatus.insertMany(sampleTrains);
    
    res.status(201).json({
      message: `Successfully seeded ${insertedTrains.length} trains`,
      trains: insertedTrains
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to seed train data' });
  }
});

export default router;