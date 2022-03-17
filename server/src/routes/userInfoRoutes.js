const {
	userDataInsertHandler,
	userDataGetHandler
} = require("../controller/userInfoController");

const router = require("express").Router();

router.post("/userInfo", userDataInsertHandler);
router.get("/userInfo", userDataGetHandler);

module.exports = router;
