import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [
    {
      id: String,
      title: String,
      poster_path: String
    }
  ]
}, { timestamps: true });

export default mongoose.model('User', userSchema);
