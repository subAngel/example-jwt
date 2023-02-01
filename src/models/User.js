const { Schema, Model, model } = require("mongoose");
const bcrypt = require("bcryptjs");

// Esquema: datos que voy a guardar
const userSchema = new Schema({
	username: String,
	email: String,
	password: String,
});

userSchema.methods.encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	return bcrypt.hash(password, salt);
};

module.exports = model("User", userSchema);
