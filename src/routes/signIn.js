const router = require('express').Router();
const { signIn } = require('../controllers/signIn')

router.post('/', signIn)

module.exports = router