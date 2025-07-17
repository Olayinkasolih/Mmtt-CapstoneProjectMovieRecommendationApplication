import express from 'express';
import User from '../models/User.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

// Get favorites
router.get('/', async (req, res) => {
  const user = await User.findById(req.userId);
  res.json(user.favorites);
});

// Add favorite
router.post('/add', async (req, res) => {
  const { id, title, poster_path } = req.body;
  const user = await User.findById(req.userId);

  if (!user.favorites.find((f) => f.id === id)) {
    user.favorites.push({ id, title, poster_path });
    await user.save();
  }
  res.json(user.favorites);
});

// Remove favorite
router.delete('/remove/:movieId', async (req, res) => {
  const { movieId } = req.params;
  const user = await User.findById(req.userId);
  user.favorites = user.favorites.filter((f) => f.id !== movieId);
  await user.save();
  res.json(user.favorites);
});

export default router;
