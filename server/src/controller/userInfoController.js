const sql = require("../config/dbConnection");
module.exports = {
	userDataInsertHandler: (req, res) => {
		const { name, gender, dob, social } = req.body,
			{ facebook, youtube, twitter, linkedin } = social,
			{ id } = req.headers,
			updateQuery =
				"UPDATE user_details SET name = ?, gender = ?, dob = ? WHERE user_id = ?";
		sql.query(updateQuery, [name, gender, dob, id], (err) => {
			if (err) {
				res.send({ error: err.message, status: false });
			} else {
				const socialUpdateQuery =
					"UPDATE user_social_details SET facebook = ?, youtube = ?, twitter = ?, linkedin = ?";
				sql.query(
					socialUpdateQuery,
					[facebook, youtube, twitter, linkedin],
					(err) => {
						if (err) {
							res.send({ error: err.message, status: false });
						} else {
							res.send({
								msg: "Update Successfully",
								status: true
							});
						}
					}
				);
			}
		});
	},
	userDataGetHandler: (req, res) => {
		const { id } = req.headers;
		const getQuery =
			"SELECT ud.name, ud.gender, DATE_FORMAT(ud.dob, '%d %M %Y') as dob, au.email FROM user_details as ud INNER JOIN auth_users as au ON ud.user_id = au.user_id WHERE ud.user_id = ?";
		sql.query(getQuery, id, (err, user_info) => {
			if (err) {
				res.send({ error: err.message, status: false });
			} else {
				const getSocial =
					"SELECT facebook, youtube, twitter, linkedin FROM user_social_details WHERE user_id = ?";
				sql.query(getSocial, id, (err, social) => {
					if (err) {
						res.send({ error: err.message, status: false });
					} else {
						user_info[0].social = social[0];
						res.send(...user_info);
					}
				});
			}
		});
	}
};
