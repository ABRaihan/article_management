const mysql = require("mysql")
const sql = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "article_management"
})

sql.connect(err => {
    if (err) {
        console.log(err.message);
    } else {
        console.log("DB Connection Successful")
    }
})

module.exports = sql;