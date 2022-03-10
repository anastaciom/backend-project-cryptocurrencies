const router = require('express').Router();
const { signUp } = require('../controllers/signup')

router.post('/', signUp)

module.exports = router