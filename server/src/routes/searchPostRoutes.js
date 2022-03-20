const { getSearchPostHandler } = require("../controller/searchPostController");

const router = require("express").Router();

router.get("/search/post/:keyword", getSearchPostHandler);

module.exports = router;