const router = require('express').Router();
const { signUp } = require('../controllers/createUserController')

router.post('/', signUp)

module.exports = router