const { Router } = require("express");
const debug = require("debug")("jwt:auth");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const config = require("../config");

const router = new Router();

router.post("/signup", async (req, res, next) => {
	const { username, email, password } = req.body;
	const user = new User({
		username,
		email,
		password,
	});
	user.password = await user.encryptPassword(user.password);
	await user.save();

	const token = jwt.sign({ id: user._id }, config.secret, {
		// expiresIn: 60*60*24
		expiresIn: 60,
	});

	return res.json({ auth: true, token });
});
router.post("/login", (req, res, next) => {
	res.json("login");
});
router.get("/profile", (req, res, next) => {
	return res.json("me");
});

module.exports = router;
