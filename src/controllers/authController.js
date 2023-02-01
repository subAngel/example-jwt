const { Router } = require("express");

const router = new Router();

router.post("/signup", (req, res, next) => {});
router.post("/login", (req, res, next) => {
	res.json("login");
});
router.get("/profile", (req, res, next) => {
	return res.json("me");
});

module.exports = router;
