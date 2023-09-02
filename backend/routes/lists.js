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
		const userId = req.user.user_id;
		const { list_name, description } = req.body;

		if (!list_name) {
			return res.status(400).json({ error: "List name is required." });
		}

		const existingList = await query(
			"SELECT list_name FROM lists WHERE user_id = $1 AND list_name = $2",
			[userId, list_name]
		);

		if (existingList.rows.length) {
			return res
				.status(400)
				.json({ error: "List with this name already exists." });
		}

		const result = await query(
			"INSERT INTO lists (user_id, list_name, description) VALUES ($1, $2, $3) RETURNING list_id, list_name, description",
			[userId, list_name, description]
		);

		return res.status(201).json(result.rows[0]);
	} catch (error) {
		return next(error);
	}
});

router.get("/", async (req, res, next) => {
	try {
		const userId = req.user.user_id;

		const result = await query(
			"SELECT list_id, list_name FROM lists WHERE user_id = $1",
			[userId]
		);

		return res.status(200).json(result.rows);
	} catch (error) {
		return next(error);
	}
});

router.get("/test", (req, res) => {
	res.json({ message: "Test route works!" });
});

router.put("/:listId", async (req, res, next) => {
	try {
		const listId = parseInt(req.params.listId);
		const userId = req.user.user_id;
		const { list_name, description } = req.body;

		const listCheck = await query(
			"SELECT * FROM lists WHERE list_id = $1 AND user_id = $2",
			[listId, userId]
		);

		if (listCheck.rows.length === 0) {
			return res
				.status(404)
				.json({ error: "List not found or unauthorized." });
		}

		const result = await query(
			"UPDATE lists SET list_name = $1, description = $2 WHERE list_id = $3 RETURNING list_name, description",
			[list_name, description, listId]
		);

		return res.json(result.rows[0]);
	} catch (error) {
		return next(error);
	}
});

router.delete("/:listId", async (req, res, next) => {
	try {
		const userId = req.user.user_id;
		const listId = req.params.listId;

		const result = await query(
			"SELECT user_id FROM lists WHERE list_id = $1",
			[listId]
		);
		const list = result.rows[0];

		if (!list || list.user_id !== userId) {
			return res.status(403).json({ error: "Unauthorized" });
		}

		await query("DELETE FROM list_plants WHERE list_id = $1", [listId]);
		await query("DELETE FROM lists WHERE list_id = $1", [listId]);

		return res.status(200).json({ message: "List deleted successfully" });
	} catch (error) {
		return next(error);
	}
});

router.get("/:listId", async (req, res, next) => {
	try {
		const userId = req.user.user_id;
		const listId = req.params.listId;

		const result = await query(
			"SELECT list_id, list_name, description FROM lists WHERE user_id = $1 AND list_id = $2",
			[userId, listId]
		);

		if (result.rows.length === 0) {
			return res
				.status(404)
				.json({ error: "List not found or unauthorized." });
		}

		return res.status(200).json(result.rows[0]);
	} catch (error) {
		return next(error);
	}
});

module.exports = router;
