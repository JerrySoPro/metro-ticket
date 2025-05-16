// models/Train.js
import mongoose from 'mongoose';

const trainSchema = new mongoose.Schema({
  name: String,
  currentLocation: String,
  eta: Number
});

export default mongoose.model('Train', trainSchema);
