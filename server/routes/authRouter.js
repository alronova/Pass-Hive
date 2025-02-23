const { signup, login } = require('../controllers/authController');
const { signupCreds, loginCreds } = require('../middlewares/auth');

const router = require('express').Router();

router.post('/login', loginCreds, login);
router.post('/signup', signupCreds, signup);

module.exports = router;