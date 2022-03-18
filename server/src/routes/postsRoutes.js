const { getPostHandler, setPostHandler } = require("../controller/postsController");

const router = require("express").Router();
router.get("/posts", getPostHandler);
router.post("/posts", setPostHandler);

module.exports = router;
