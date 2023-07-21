const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token.' });
  }

  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Forbidden: Invalid token.' });
  }
};

module.exports = verifyToken