const router = require('express').Router();
const { signIn } = require('../controllers/signIn')
const {forgotPassword} = require('../controllers/signIn/forgotPassword')
const {resetPassword} = require('../controllers/signIn/resetPassword')

router.post('/', signIn)
router.post('/forgot_password', forgotPassword)
router.post('/reset_password', resetPassword)

module.exports = router