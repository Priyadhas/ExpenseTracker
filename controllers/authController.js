const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
let db=require('../models/index');

const register = async (req, res) => {
  
  const { name, email, address, password, phoneNumber, gender } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = await db.User.create({ name, email, address, password: hashedPassword, phoneNumber, gender });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send({ error: 'User registration failed.' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ error: 'Invalid credentials.' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).send({ user, token });
  } catch (err) {
    res.status(400).send({ error: 'Login failed.' });
  }
};

module.exports = { register, login };
