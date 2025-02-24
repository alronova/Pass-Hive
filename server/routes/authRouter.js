const { signup, login } = require('../controllers/authController');
const { signupCreds, loginCreds } = require('../middlewares/auth');

const router = require('express').Router();

router.post('/login', login);
router.post('/signup', signup);

module.exports = router;