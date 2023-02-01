const { Schema, Model, model } = require("mongoose");

// Esquema: datos que voy a guardar
const userSchema = new Schema({
	username: String,
	email: String,
	password: String,
});

module.exports = model("User", userSchema);
