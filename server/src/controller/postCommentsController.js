const sql = require("../config/dbConnection");
module.exports = {
    getPostCommentsHandler: (req, res) => {
        res.send("hi")
    },
    setPostCommentsHandler: (req, res) => {
        const { user_id, post_id, comments } = req.body,
            setCommentQuery = "INSERT INTO user_comments SET ?";
        sql.query(setCommentQuery, { user_id, post_id, comments }, (err) => {
            if (err) {
                res.send({error: err.message, status: false})
            } else {
                res.send({msg: "Comment Successful", status: true})
            }
        })
    }
}