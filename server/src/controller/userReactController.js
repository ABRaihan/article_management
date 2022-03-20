const sql = require("../config/dbConnection");
const { isEmptyArray } = require("../utils/validationFunc");
module.exports = {
	getUserReactHandler: (req, res) => {
		res.send("ok");
	},
	setUserReactHandler: (req, res) => {
		const { user_id, post_id, likes, dislike } = req.body,
			getReactQuery =
				"SELECT likes, dislike FROM user_reaction WHERE user_id = ? AND post_id = ?";
		sql.query(getReactQuery, [user_id, post_id], (err, react) => {
			if (err) {
				res.send({ error: err.message, status: false });
			} else {
				if (isEmptyArray(react)) {
					const setReactQuery = "INSERT INTO user_reaction SET ?";
					sql.query(
						setReactQuery,
						{ user_id, post_id, likes, dislike },
						(err) => {
							if (err) {
								res.send({ error: err.message, status: false });
							} else {
								res.send({
									msg: "React Add Successful",
									status: true
								});
							}
						}
					);
				} else {
					const updateReactQuery =
						"UPDATE user_reaction SET likes = ?, dislike = ? WHERE user_id = ? AND post_id = ?";
					sql.query(
						updateReactQuery,
						[likes, dislike, user_id, post_id],
						(err) => {
							if (err) {
								res.send({ error: err.message, status: false });
							} else {
								res.send({
									msg: "React Update Successful",
									status: true
								});
							}
						}
					);
				}
			}
		});
	}
};
