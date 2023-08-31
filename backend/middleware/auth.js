const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../db/config");

function authenticateJWT(req, res, next) {
	const authHeader = req.headers.authorization;

	if (authHeader) {
		console.log(`Received Authorization header: ${authHeader}`);
		const token = authHeader.split(" ")[1]; // Bearer <token>

		jwt.verify(token, SECRET_KEY, (err, user) => {
			if (err) {
				console.log(err); // <-- Log any errors here
				return res.sendStatus(403); // Forbidden
			}

			req.user = user;
			next();
		});
	} else {
		res.sendStatus(401); // Unauthorized
	}
}

module.exports = authenticateJWT;
