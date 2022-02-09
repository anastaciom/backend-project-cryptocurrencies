
const router = require('express').Router();
const { admin } = require('../controllers/admin')
const {auth} = require('../middlewares/auth')

router.use(auth)
router.get('/', admin)

module.exports = router