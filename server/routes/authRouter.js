const { signup, login, verifyToken } = require('../controllers/authController');
// const { signupCreds, loginCreds } = require('../middlewares/auth');

const router = require('express').Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/verifyToken', verifyToken);

module.exports = router;