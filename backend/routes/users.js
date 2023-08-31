/* 
    User Routes
    Registration
    Login
    Fetching user profile
    Updating user profile
    Deleting user account
*/

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../db/config");
const { query } = require("../db/db"); // Import the query function from db.js
const authenticateJWT = require("../middleware/auth");

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res, next) => {
	try {
		const { username, password, email } = req.body;

		// Password validation
		const MIN_LENGTH = 8;
		if (password.length < MIN_LENGTH) {
			return res
				.status(400)
				.json({ error: "Password must be at least 8 characters long" });
		}
		if (!/[A-Z]/.test(password)) {
			return res.status(400).json({
				error: "Password must contain at least one uppercase letter",
			});
		}
		if (!/[a-z]/.test(password)) {
			return res.status(400).json({
				error: "Password must contain at least one lowercase letter",
			});
		}
		if (!/[0-9]/.test(password)) {
			return res
				.status(400)
				.json({ error: "Password must contain at least one number" });
		}

		// Check if the user already exists
		const existingUser = await query(
			"SELECT username FROM users WHERE username = $1",
			[username]
		);
		if (existingUser.rows.length > 0) {
			return res.status(400).json({ error: "Username already exists" });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 12);

		// Store the user in the database
		const result = await query(
			"INSERT INTO users (username, email, hashed_password) VALUES ($1, $2, $3) RETURNING user_id, username",
			[username, email, hashedPassword]
		);

		const newUser = result.rows[0];

		// Create a JWT token
		const token = jwt.sign(
			{ user_id: newUser.user_id, username: newUser.username },
			SECRET_KEY
		);

		return res.status(201).json({ token });
	} catch (error) {
		return next(error);
	}
});

router.post("/login", async (req, res, next) => {
	try {
		const { username, password } = req.body;

		// Fetch user with the given username from the database
		const result = await query(
			"SELECT user_id, username, hashed_password FROM users WHERE username = $1",
			[username]
		);

		const user = result.rows[0];

		if (user) {
			// Check if the provided password matches the one in the database
			const isValidPassword = await bcrypt.compare(
				password,
				user.hashed_password
			);

			if (isValidPassword) {
				// Generate a JWT for the user
				const token = jwt.sign(
					{ user_id: user.user_id, username: user.username },
					SECRET_KEY
				);
				return res.json({ token, username: user.username });
			}
		}

		// If authentication fails, throw an error
		throw new Error("Invalid username/password");
	} catch (err) {
		return next(err);
	}
});

// Use the middleware
router.get("/protected-route", authenticateJWT, (req, res) => {
	// This route is protected by JWT authentication
	// You can access user data using req.user
	res.json({ message: "Protected data" });
});

// ... more routes ...

module.exports = router;
