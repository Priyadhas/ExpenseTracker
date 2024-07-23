const express = require('express');
const { register, login } = require('../controllers/authController');
const { validateUser } = require('../middleware/validationMiddleware');

const router = express.Router();

router.post('/register', 
    validateUser,
     register);
router.post('/login', validateUser, login);

module.exports = router;
