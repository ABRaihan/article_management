const sql = require("../config/dbConnection");
const { makeId } = require("../utils/utilityFunc");
module.exports = {
	getPostHandler: (req, res) => {
		const { id } = req.headers,
			getPostQuery = `SELECT * FROM articles ${
				id ? "WHERE user_id = ?" : ""
			}`;
		sql.query(getPostQuery, [id], (err, posts) => {
			if (err) {
				res.send({ error: err.message, id });
			} else {
				if (id) {
					res.send(posts);
				} else {
					const getQuery = "SELECT art.post_id, ud.name, art.title, art.post FROM user_details as ud INNER JOIN articles as art ON ud.user_id = art.user_id";
					sql.query(getQuery, (err, allPost) => {
						if (err) {
							res.send({error: err.message, status: false})
						} else {
							res.send(allPost);
						}
					})
				}
			}
		});
	},
	getDynamicPostHandler: (req, res) => {
		const { postId } = req.params,
			getPost = "SELECT art.post_id, ud.name, art.title, art.post FROM user_details as ud INNER JOIN articles as art ON ud.user_id = art.user_id WHERE art.post_id = ?";
		sql.query(getPost, postId, (err, post) => {
			if (err) {
				res.send({error: err.message, status: false})
			} else {
				res.send(...post);
			}
		})
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
	},
	deletePostHandler: (req, res) => {
		const { id } = req.headers,
			deleteQuery = "DELETE FROM articles WHERE post_id = ?";
		sql.query(deleteQuery, id, (err) => {
			if (err) {
				res.send({ error: err.message, status: false });
			} else {
				res.send({ msg: "Post Delete Successful", status: true });
			}
		});
	},
	updatePostHandler: (req, res) => {
		const { post_id, title, post } = req.body,
			updateQuery =
				"UPDATE articles SET title = ?, post = ? WHERE post_id = ?";
		sql.query(updateQuery, [title, post, post_id], (err) => {
			if (err) {
				res.send({ error: err.message, status: false });
			} else {
				res.send({ msg: "Post Update Successful", status: true });
			}
		});
	}
};
