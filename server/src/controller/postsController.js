const sql = require("../config/dbConnection");
const { makeId } = require("../utils/utilityFunc");
module.exports = {
	getPostHandler: (req, res) => {
		const { id } = req.headers,
			getPostQuery = `SELECT * FROM articles ${id ? "WHERE user_id = ?" : "" }`;
		sql.query(getPostQuery,[id], (err, posts) => {
			if (err) {
				res.send({ error: err.message, id });
			} else {
				res.send(posts);
			}
		});
	},
	setPostHandler: (req, res) => {
		const { title, article, id } = req.body,
			setPostQuery = "INSERT INTO articles SET ?",
			post = { post_id: makeId(), user_id: id, title, post: article };
		sql.query(setPostQuery, post, (err) => {
			if (err) {
				res.send({ error: err.message, status: false });
			} else {
				res.send({
					msg: "Post Successful",
					status: true,
					id: post.post_id
				});
			}
		});
	}
};
