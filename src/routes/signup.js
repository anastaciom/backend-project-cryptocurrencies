const router = require('express').Router();
const {signup} = require('../controllers/signup/index.js')

router.post('/', signup)

module.exports = router