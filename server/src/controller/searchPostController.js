const sql = require("../config/dbConnection");
module.exports = {
    getSearchPostHandler: (req, res) => {
        const { keyword } = req.params,
            searchPost = `SELECT post_id, title FROM articles WHERE title LIKE '%${keyword}%'`;
        sql.query(searchPost, (err, posts) => {
            if (err) {
                res.send({ error: err.message, status: false });
            } else {
                res.send(posts);
            }
        })
    }
}