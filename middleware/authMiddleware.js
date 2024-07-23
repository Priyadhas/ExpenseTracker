const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ error: 'Access denied, no token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = db.User.findOne({ where: { id: decoded.id } });
 
    if (!user) {
      throw new Error();
    }
    console.log(user.toJSON());
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send({ error: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
