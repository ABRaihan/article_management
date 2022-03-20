const {
	getUserReactHandler,
	setUserReactHandler
} = require("../controller/userReactController");

const router = require("express").Router();
router.get("/post/react", getUserReactHandler);
router.post("/post/react", setUserReactHandler);

module.exports = router;
