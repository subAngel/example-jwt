const mongoose = require("mongoose");
const debug = require("debug")("jwt:database");
require("dotenv").config();

mongoose.set("strictQuery", true);
mongoose
	.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
	.then((db) => debug("DB is connected"))
	.catch((err) => console.log(err));
