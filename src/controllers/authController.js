const { Router } = require("express");
const debug = require("debug")("jwt:auth");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const config = require("../config");
const verifyToken = require("./verifyToken");

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
		expiresIn: 60 * 60 * 24,
		// expiresIn: 60,
	});

	return res.json({ auth: true, token });
});

router.post("/login", async (req, res, next) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email: email });
	if (!user) {
		return res.status(404).send("The email does not exists");
	}
	const passwordIsValid = await user.validatePassword(password);

	if (!passwordIsValid) {
		return res.status(401).json({ auth: false, token: null });
	}
	const token = jwt.sign({ id: user._id }, config.secret, {
		expiresIn: 60 * 60 * 24,
	});
	return res.json({ auth: true, token });
});

router.get("/profile", verifyToken, async (req, res, next) => {
	const user = await User.findById(req.userId, { password: 0 });
	if (!user) {
		return res.status(404).send("No user found");
	}

	return res.json(user);
});

module.exports = router;
