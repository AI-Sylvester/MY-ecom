// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const secretKey = '8f6f1e9d-c438-45f7-b3b4-49f4a9c23c97'; // Secret key for JWT

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Bearer <token>
  if (!token) {
    return res.status(403).send('Access denied');
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).send('Invalid token');
    }
    req.user = user;
    next();
  });
};

module.exports = { verifyToken };
