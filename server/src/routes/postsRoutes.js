const { getPostHandler, setPostHandler, deletePostHandler } = require("../controller/postsController");

const router = require("express").Router();
router.get("/posts", getPostHandler);
router.post("/posts", setPostHandler);
router.delete("/posts", deletePostHandler);

module.exports = router;
