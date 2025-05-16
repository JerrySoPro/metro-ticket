import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  from: String,
  to: String,
  fare: Number,
  ticketId: String,
  purchasedAt: Date,
});

export default mongoose.model('Ticket', ticketSchema);
