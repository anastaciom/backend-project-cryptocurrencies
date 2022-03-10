const router = require('express').Router();
const {signup} = require('../controllers/signup/index')

router.post('/', signup)

module.exports = router