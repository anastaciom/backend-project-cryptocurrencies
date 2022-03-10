const router = require('express').Router();
const {signin} = require('../controllers/signin')
const {forgotPassword} = require('../controllers/signin/forgotPassword')
const {resetPassword} = require('../controllers/signin/resetPassword')

router.post('/', signin)
router.post('/forgot_password', forgotPassword)
router.post('/reset_password', resetPassword)

module.exports = router