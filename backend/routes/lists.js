/* 
    Lists
    Create new list
    Fetch all lists for a user
    Update a list's name or other properties
    Delete a list
    Fetch plants in a specific list

*/

const express = require("express");
const { query } = require("../db/db");
const authenticateJWT = require("../middleware/auth");

const router = express.Router();

// Middleware to ensure user is authenticated before accessing any list operations
router.use(authenticateJWT);

// POST route to create a new list
router.post("/", async (req, res, next) => {
	try {
		const userId = req.user.user_id; // Extract user ID from the JWT payload
		const { list_name } = req.body; // Extract list name from the request body

		// Validate input data (you can add more validation if needed)
		if (!list_name) {
			return res.status(400).json({ error: "List name is required." });
		}

		// Check if the list with the same name already exists for the user
		const existingList = await query(
			"SELECT list_name FROM lists WHERE user_id = $1 AND list_name = $2",
			[userId, list_name]
		);
		if (existingList.rows.length) {
			return res
				.status(400)
				.json({ error: "List with this name already exists." });
		}

		// Insert the new list into the database
		const result = await query(
			"INSERT INTO lists (user_id, list_name) VALUES ($1, $2) RETURNING list_id, list_name",
			[userId, list_name]
		);

		return res.status(201).json(result.rows[0]);
	} catch (error) {
		return next(error);
	}
});

// GET route to fetch all lists for the user
router.get("/", async (req, res, next) => {
	console.log("Fetching lists for the user...");
	try {
		const userId = req.user.user_id; // Extract user ID from the JWT payload

		// Query the database to retrieve all lists for the user
		const result = await query(
			"SELECT list_id, list_name FROM lists WHERE user_id = $1",
			[userId]
		);

		// Return the lists
		return res.status(200).json(result.rows);
	} catch (error) {
		return next(error);
	}
});

// A test route for testing in Insomnia
router.get("/test", (req, res) => {
	res.json({ message: "Test route works!" });
});

// PUT route to update a specific list
router.put("/:listId", async (req, res, next) => {
	try {
		const listId = parseInt(req.params.listId);
		const userId = req.user.user_id; // Extract user ID from the JWT payload
		const { list_name } = req.body;

		// First, check if the list belongs to the authenticated user
		const listCheck = await query(
			"SELECT * FROM lists WHERE list_id = $1 AND user_id = $2",
			[listId, userId]
		);

		if (listCheck.rows.length === 0) {
			return res
				.status(404)
				.json({ error: "List not found or unauthorized." });
		}

		// Update the list in the database
		const result = await query(
			"UPDATE lists SET list_name = $1 WHERE list_id = $2 RETURNING list_name",
			[list_name, listId]
		);

		if (result.rows.length === 0) {
			return res.status(404).json({ error: "List not found." });
		}

		return res.json(result.rows[0]);
	} catch (error) {
		return next(error);
	}
});

// DELETE route to delete a specific list
router.delete("/:listId", async (req, res, next) => {
	try {
		const userId = req.user.user_id; // Extract user ID from the JWT payload
		const listId = req.params.listId;

		// Ensure the list belongs to the authenticated user
		const result = await query(
			"SELECT user_id FROM lists WHERE list_id = $1",
			[listId]
		);
		const list = result.rows[0];

		if (!list || list.user_id !== userId) {
			return res.status(403).json({ error: "Unauthorized" });
		}

		// First, delete all plants associated with the list in the list_plants table
		await query("DELETE FROM list_plants WHERE list_id = $1", [listId]);

		// Then, delete the list
		await query("DELETE FROM lists WHERE list_id = $1", [listId]);

		return res.status(200).json({ message: "List deleted successfully" });
	} catch (error) {
		return next(error);
	}
});

// GET route to fetch details for a specific list
router.get("/:listId", async (req, res, next) => {
	try {
		const userId = req.user.user_id; // Extract user ID from the JWT payload
		const listId = req.params.listId;

		// Query the database to retrieve details for the specific list
		const result = await query(
			"SELECT list_id, list_name FROM lists WHERE user_id = $1 AND list_id = $2",
			[userId, listId]
		);

		// If the list doesn't exist or doesn't belong to the user, send an error
		if (result.rows.length === 0) {
			return res
				.status(404)
				.json({ error: "List not found or unauthorized." });
		}

		// Return the list details
		return res.status(200).json(result.rows[0]);
	} catch (error) {
		return next(error);
	}
});

module.exports = router;
