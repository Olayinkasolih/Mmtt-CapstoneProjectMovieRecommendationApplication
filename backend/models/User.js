import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  id: String,
  title: String,
  poster_path: String,
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favorites: [favoriteSchema],
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
