const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient');
const { protect } = require('../middleware/authMiddleware');

// @route   GET /api/matches
// @desc    Get all active matches
// @access  Protected
router.get('/', protect, async (req, res) => {
  try {
    const { data: matches, error } = await supabase
      .from('matches')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) throw error;

    const formattedMatches = matches.map(match => ({
      _id: match.id,
      ...match.data
    }));

    res.json(formattedMatches);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/matches/:id
// @desc    Get match by ID
// @access  Protected
router.get('/:id', protect, async (req, res) => {
  try {
    const { data: match, error } = await supabase
      .from('matches')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    if (!match) return res.status(404).json({ message: 'Match not found' });

    res.json({
      _id: match.id,
      ...match.data
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/matches/favorite
// @desc    Toggle match in user favorites
// @access  Protected
router.post('/favorite', protect, async (req, res) => {
  const { matchId } = req.body;
  
  if (!matchId) return res.status(400).json({ message: 'matchId is required' });

  try {
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('favorites')
      .eq('id', req.user._id)
      .single();

    if (userError) throw userError;

    let favorites = user.favorites || [];
    const isFavorited = favorites.includes(matchId);
    
    if (isFavorited) {
      favorites = favorites.filter(id => id !== matchId);
    } else {
      favorites.push(matchId);
    }
    
    const { data: updatedUser, error: updateError } = await supabase
      .from('users')
      .update({ favorites })
      .eq('id', req.user._id)
      .select('favorites')
      .single();

    if (updateError) throw updateError;
    
    res.json({ favorites: updatedUser.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
