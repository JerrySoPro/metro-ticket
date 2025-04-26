// app.js
const express = require('express');
const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');
// require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Middleware
// app.use(cors());
// app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/metro-ticket')
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.error(err));

app.get('/', (req, res) => {
    res.send('Welcome to the Metro Ticket Booking System API!');
});
// User Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: { type: String, enum: ['admin', 'user'], default: 'user' }
});

const User = mongoose.model('User', userSchema); // 

// Routes
// app.post('/register', async (req, res) => {
//     const { username, password, role } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ username, password: hashedPassword, role });
//     await newUser.save();
//     res.status(201).send('User registered');
// });

// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });

//     if (!user) return res.status(400).send('User not found');

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).send('Invalid credentials');

//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token });
// });


