const router = require("express").Router();
const { allUsers } = require("../controllers/admin/users");
const { signInAdmin } = require("../controllers/admin/signIn");
const { auth } = require("../middlewares/auth");

router.post("/", signInAdmin);
router.use(auth);
router.get("/users", allUsers);

module.exports = router;
