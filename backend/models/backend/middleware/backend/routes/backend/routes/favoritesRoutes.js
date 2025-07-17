import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

// Get favorites
router.get('/', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user);
  res.json(user.favorites);
});

// Add favorite
router.post('/add', authMiddleware, async (req, res) => {
  const { id, title, poster_path } = req.body;
  const user = await User.findById(req.user);

  if (!user.favorites.find(fav => fav.id === id)) {
    user.favorites.push({ id, title, poster_path });
    await user.save();
  }
  res.json(user.favorites);
});

// Remove favorite
router.delete('/remove/:movieId', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user);
  user.favorites = user.favorites.filter(fav => fav.id !== req.params.movieId);
  await user.save();
  res.json(user.favorites);
});

export default router;
