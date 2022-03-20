const { getPostCommentsHandler, setPostCommentsHandler } = require("../controller/postCommentsController");

const router = require("express").Router();
router.get("/post/comments", getPostCommentsHandler);
router.post("/post/comments", setPostCommentsHandler);
module.exports = router;