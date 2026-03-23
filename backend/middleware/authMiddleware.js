const jwt = require('jsonwebtoken');
const supabase = require('../supabaseClient');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
      
      const { data: user, error } = await supabase
        .from('users')
        .select('id, name, email, favorites')
        .eq('id', decoded.id)
        .single();
        
      if (error) throw error;
      
      req.user = { _id: user.id, ...user };
      return next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
