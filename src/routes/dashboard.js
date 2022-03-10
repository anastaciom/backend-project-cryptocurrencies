const router = require("express").Router();
const { sessions } = require("../controllers/sessions");
const { auth } = require("../middlewares/auth");

router.use(auth);
router.get("/", sessions);

module.exports = router;
