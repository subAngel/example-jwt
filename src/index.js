const app = require("./app");
const debug = require("debug")("jwt:index");

// const app = express();
// require("./database");

// routes

app.listen(app.get("port"), () => {
	debug(`Server listening on http://localhost:${app.get("port")}`);
});
