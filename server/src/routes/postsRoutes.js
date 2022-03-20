const {
	getPostHandler,
	setPostHandler,
	deletePostHandler,
	updatePostHandler,
	getDynamicPostHandler
} = require("../controller/postsController");

const router = require("express").Router();
router.get("/posts", getPostHandler);
router.get("/post/:postId", getDynamicPostHandler);
router.post("/posts", setPostHandler);
router.delete("/posts", deletePostHandler);
router.put("/posts", updatePostHandler);

module.exports = router;
