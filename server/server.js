import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import trainRoutes from './routes/trainRoutes.js';
import fareRoutes from './routes/fareRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/trains', trainRoutes);
app.use('/api/fares', fareRoutes);

mongoose.connect('mongodb://localhost:27017/metro_ticket_system', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(5000, () => console.log('Server running on http://localhost:5000'));
})
.catch(err => console.error('DB connection error:', err));
