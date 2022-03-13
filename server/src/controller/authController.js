const { makeId } = require("../utils/utilityFunc");
const { isEmptyArray } = require("../utils/validationFunc");
const sql = require("../config/dbConnection");
module.exports = {
	loginHandler: (req, res) => {
		const { email, password } = req.body,
			getQuery =
				"SELECT user_id FROM auth_users where email = ? AND password = ?";
		sql.query(getQuery, [email, password], (err, rows) => {
			if (err) {
				res.send({ error: err.message, status: false });
			} else {
				if (isEmptyArray(rows)) {
					res.send({ error: "Invalid Credential", status: false });
				} else {
					res.send({ _id: rows[0].user_id, status: true });
				}
			}
		});
	},
	signupHandler: (req, res) => {
		const { name, email, password } = req.body,
			user = {
				user_id: makeId(),
				email,
				password
			},
			getQuery = "SELECT email FROM auth_users WHERE email = ?",
			setQuery = "INSERT INTO auth_users SET ?",
			insertQuery = "INSERT INTO user_details (user_id, name) VALUES ?";
		sql.query(getQuery, email, (err, rows) => {
			if (err) {
				res.send(err.message);
			} else {
				if (!isEmptyArray(rows)) {
					res.send({ error: "Email Already Exist" });
				} else {
					sql.query(setQuery, user, (err) => {
						if (err) {
							res.send({error: err.message, status: false});
						} else {
							res.send({
								message: "Successfully Sign Up",
								status: true
							});
						}
					});
					sql.query(insertQuery, [[[user.user_id, name]]]);
				}
			}
		});
	},
	loginUserCheckHandler: (req, res) => {
		const { id } = req.headers,
			getQuery = "SELECT user_id FROM auth_users WHERE user_id = ?";
		sql.query(getQuery, id, (err, rows) => {
			if (err) {
				res.send({ error: err.message });
			} else {
				isEmptyArray(rows)
					? res.send({ isUserLogged: false })
					: res.send({ isUserLogged: true });
			}
		});
	}
};
