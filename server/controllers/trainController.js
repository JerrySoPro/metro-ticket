import Train from '../models/TrainStatus.js';
import mongoose from 'mongoose';

const sampleTrains = [
  {
    trainNumber: 'MT001',
    trainName: 'Dhaka Express',
    route: 'Motijheel - Shahbag - Kawran Bazar - Farmgate',
    currentStation: 'Shahbag',
    nextStation: 'Kawran Bazar',
    status: 'On Time',
    delay: 0,
    estimatedArrival: new Date(Date.now() + 8 * 60000),
    capacity: { current: 234, maximum: 1000 },
    speed: 45,
    direction: 'Northbound'
  },
  {
    trainNumber: 'MT002',
    trainName: 'Metro Blue Line',
    route: 'Farmgate - Kawran Bazar - Shahbag - Motijheel',
    currentStation: 'Kawran Bazar',
    nextStation: 'Shahbag',
    status: 'Delayed',
    delay: 5,
    estimatedArrival: new Date(Date.now() + 12 * 60000),
    capacity: { current: 567, maximum: 1000 },
    speed: 38,
    direction: 'Southbound'
  },
  {
    trainNumber: 'MT003',
    trainName: 'City Connector',
    route: 'Motijheel - Shahbag - Kawran Bazar - Farmgate',
    currentStation: 'Farmgate',
    nextStation: 'Kawran Bazar',
    status: 'On Time',
    delay: 0,
    estimatedArrival: new Date(Date.now() + 6 * 60000),
    capacity: { current: 123, maximum: 1000 },
    speed: 50,
    direction: 'Southbound'
  },
  {
    trainNumber: 'MT004',
    trainName: 'Metro Green Line',
    route: 'Farmgate - Kawran Bazar - Shahbag - Motijheel',
    currentStation: 'Motijheel',
    nextStation: 'Shahbag',
    status: 'Maintenance',
    delay: 15,
    estimatedArrival: new Date(Date.now() + 25 * 60000),
    capacity: { current: 0, maximum: 1000 },
    speed: 0,
    direction: 'Northbound'
  },
  // Additional sample trains
  {
    trainNumber: 'MT005',
    trainName: 'Metro Red Line',
    route: 'Motijheel - Shahbag - Kawran Bazar - Farmgate',
    currentStation: 'Motijheel',
    nextStation: 'Shahbag',
    status: 'On Time',
    delay: 0,
    estimatedArrival: new Date(Date.now() + 4 * 60000),
    capacity: { current: 789, maximum: 1000 },
    speed: 42,
    direction: 'Northbound'
  },
  {
    trainNumber: 'MT006',
    trainName: 'Express Metro',
    route: 'Farmgate - Kawran Bazar - Shahbag - Motijheel',
    currentStation: 'Shahbag',
    nextStation: 'Motijheel',
    status: 'Delayed',
    delay: 3,
    estimatedArrival: new Date(Date.now() + 9 * 60000),
    capacity: { current: 445, maximum: 1000 },
    speed: 35,
    direction: 'Southbound'
  },
  {
    trainNumber: 'MT007',
    trainName: 'Metro Orange Line',
    route: 'Motijheel - Shahbag - Kawran Bazar - Farmgate',
    currentStation: 'Kawran Bazar',
    nextStation: 'Farmgate',
    status: 'On Time',
    delay: 0,
    estimatedArrival: new Date(Date.now() + 7 * 60000),
    capacity: { current: 312, maximum: 1000 },
    speed: 48,
    direction: 'Northbound'
  },
  {
    trainNumber: 'MT008',
    trainName: 'Night Express',
    route: 'Farmgate - Kawran Bazar - Shahbag - Motijheel',
    currentStation: 'Farmgate',
    nextStation: 'Kawran Bazar',
    status: 'On Time',
    delay: 0,
    estimatedArrival: new Date(Date.now() + 5 * 60000),
    capacity: { current: 156, maximum: 1000 },
    speed: 46,
    direction: 'Southbound'
  }
];

async function seedTrainData() {
  try {
    await mongoose.connect('mongodb+srv://jerry:bBAZE4X7QPB1p6XB@metro-tickerting.ktldbbf.mongodb.net/?retryWrites=true&w=majority&appName=metro-tickerting');
    
    console.log('Connected to MongoDB...');
    
    await TrainStatus.deleteMany({});
    console.log('Cleared existing train data...');
    
    const insertedTrains = await TrainStatus.insertMany(sampleTrains);
    console.log(`Successfully inserted ${insertedTrains.length} sample trains!`);
    
    console.log('\n--- Inserted Trains Summary ---');
    insertedTrains.forEach(train => {
      console.log(`${train.trainNumber}: ${train.trainName} (${train.status})`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedTrainData();
