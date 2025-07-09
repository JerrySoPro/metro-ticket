import mongoose from 'mongoose';

const trainStatusSchema = new mongoose.Schema({
  trainNumber: {
    type: String,
    required: true,
    unique: true
  },
  trainName: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
  },
  currentStation: {
    type: String,
    required: true
  },
  nextStation: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['On Time', 'Delayed', 'Cancelled', 'Maintenance'],
    default: 'On Time'
  },
  delay: {
    type: Number, // in minutes
    default: 0
  },
  estimatedArrival: {
    type: Date,
    required: true
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  capacity: {
    current: { type: Number, default: 0 },
    maximum: { type: Number, default: 1000 }
  },
  speed: {
    type: Number, // km/h
    default: 0
  },
  direction: {
    type: String,
    enum: ['Northbound', 'Southbound', 'Eastbound', 'Westbound'],
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('TrainStatus', trainStatusSchema);