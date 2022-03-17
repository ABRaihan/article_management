// import files
const router = require("express").Router();
const { loginHandler, signupHandler, loginUserCheckHandler } = require("../controller/authController");

router.post("/login", loginHandler);
router.post("/signup", signupHandler);
router.get("/check", loginUserCheckHandler)

module.exports = router;
