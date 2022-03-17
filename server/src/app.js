// imported files
const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv");
const authRouter = require("./routes/authRoutes");
const userInfoRoutes = require("./routes/userInfoRoutes");
// third party func call
dotenv.config();
// variables
const app = express();
const PORT = process.env.PORT;

// Middleware Array
const middleware = [express.urlencoded({ extended: true }), express.json()];

app.use(cors());
app.use(middleware);
app.use("/", authRouter);
app.use("/", userInfoRoutes);

app.get("/", (req, res) => {
	res.json({ name: "A. B. Raihan" });
});

app.listen(PORT, () => {
	console.log("Server is running on PORT ", PORT);
});
