import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: String,
  role: { type: String, enum: ['user', 'staff', 'admin'], default: 'user' },
  isVerified: { type: Boolean, default: false },
  balance: { type: Number, default: 0 }
}, { timestamps: true });

// ✅ Use export default instead of module.exports
const User = mongoose.model('User', userSchema);
export default User;
