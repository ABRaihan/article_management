const sql = require("../config/dbConnection");
module.exports = {
	getPostCommentsHandler: (req, res) => {
		const { id } = req.headers,
			getCommentsQuery =
				"SELECT ud.name, uc.comments FROM user_details as ud INNER JOIN user_comments as uc ON ud.user_id = uc.user_id WHERE post_id = ?";
		sql.query(getCommentsQuery, id, (err, comments) => {
			if (err) {
				res.send({ error: err.message, status: false });
			} else {
				res.send(comments);
			}
		});
	},
	setPostCommentsHandler: (req, res) => {
		const { user_id, post_id, comments } = req.body,
			setCommentQuery = "INSERT INTO user_comments SET ?";
		sql.query(setCommentQuery, { user_id, post_id, comments }, (err) => {
			if (err) {
				res.send({ error: err.message, status: false });
			} else {
				res.send({ msg: "Comment Successful", status: true });
			}
		});
	}
};
