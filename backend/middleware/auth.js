const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Access Denied: No Token Provided' });
  }

  try {
    const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET); // Split "Bearer <token>"
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid Token' });
  }
};

module.exports = authenticateToken;
