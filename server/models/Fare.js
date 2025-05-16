import mongoose from 'mongoose';

const fareSchema = new mongoose.Schema({
  from: String,
  to: String,
  fare: Number
});

export default mongoose.model('Fare', fareSchema);
