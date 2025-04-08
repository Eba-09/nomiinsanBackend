const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; 
  
  if (!token) {
    console.log("Token not provided");
    return res.status(401).json({ message: 'Token not found' });
  }
  jwt.verify(token, process.env.JWT_SECRET || 'secret123', (err, user) => {
    if (err) {
      console.log("Error verifying token:", err);
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticate };
