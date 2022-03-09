const router = require('express').Router();
const { signUp } = require('../controllers/signUp/index')

router.post('/', signUp)

module.exports = router