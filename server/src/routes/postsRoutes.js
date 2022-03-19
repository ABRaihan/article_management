const { getPostHandler, setPostHandler, deletePostHandler, updatePostHandler } = require("../controller/postsController");

const router = require("express").Router();
router.get("/posts", getPostHandler);
router.post("/posts", setPostHandler);
router.delete("/posts", deletePostHandler);
router.put("/posts", updatePostHandler);

module.exports = router;
