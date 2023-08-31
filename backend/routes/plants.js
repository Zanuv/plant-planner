/*

    Plants
    Search for plants
    Add a plant to a list
    Remove a plant from a list

*/

const express = require("express");
const { query } = require("../db/db");
const authenticateJWT = require("../middleware/auth");

const router = express.Router();

// Add a new plant to a specific list
router.post("/:listId/plants", authenticateJWT, async (req, res, next) => {
	try {
		const { listId } = req.params;
		const { plant_name, scientific_name } = req.body;

		// Insert the plant into the database
		const plantResult = await query(
			"INSERT INTO plants (plant_name, scientific_name) VALUES ($1, $2) RETURNING plant_id",
			[plant_name, scientific_name]
		);

		const newPlantId = plantResult.rows[0].plant_id;

		// Insert the plant into the list_plants join table
		await query(
			"INSERT INTO list_plants (list_id, plant_id) VALUES ($1, $2)",
			[listId, newPlantId]
		);

		return res
			.status(201)
			.json({ plant_id: newPlantId, plant_name, scientific_name });
	} catch (error) {
		return next(error);
	}
});

// Fetch all plants for a specific list
router.get("/:listId/plants", authenticateJWT, async (req, res, next) => {
	try {
		const { listId } = req.params;

		// Fetch all plants associated with the list ID
		const result = await query(
			"SELECT p.plant_id, p.plant_name, p.scientific_name, p.image_url FROM plants p JOIN list_plants lp ON p.plant_id = lp.plant_id WHERE lp.list_id = $1",
			[listId]
		);

		return res.json(result.rows);
	} catch (error) {
		return next(error);
	}
});

// Update a specific plant within a list
router.put(
	"/:listId/plants/:plantId",
	authenticateJWT,
	async (req, res, next) => {
		try {
			const { plantId } = req.params;
			const { plant_name, scientific_name } = req.body;

			// Update the specific plant in the database if it's associated with the given list
			const result = await query(
				"UPDATE plants SET plant_name = $1, scientific_name = $2 WHERE plant_id = $3 AND EXISTS (SELECT 1 FROM list_plants WHERE plant_id = $3)",
				[plant_name, scientific_name, plantId]
			);

			if (result.rowCount === 0) {
				return res.status(404).json({
					error: "Plant not found or not associated with the specified list.",
				});
			}

			return res.json({ message: "Plant updated successfully." });
		} catch (error) {
			return next(error);
		}
	}
);

// Remove a specific plant from a list
router.delete(
	"/:listId/plants/:plantId",
	authenticateJWT,
	async (req, res, next) => {
		try {
			const { listId, plantId } = req.params;

			// Delete the specific plant relationship from the list_plants table
			await query(
				"DELETE FROM list_plants WHERE list_id = $1 AND plant_id = $2",
				[listId, plantId]
			);

			return res.json({
				message: "Plant removed from list successfully.",
			});
		} catch (error) {
			return next(error);
		}
	}
);

// Route to add a plant to a list from the Perenual API
router.post("/:listId/add-plant", authenticateJWT, async (req, res, next) => {
	try {
		const { listId } = req.params;
		const {
			id: plant_external_id,
			common_name: plant_name,
			scientific_name,
			default_image: image,
		} = req.body;

		const image_url = image ? image.regular_url : null; // Use regular_url from default_image as image_url

		// Check if the plant already exists in the database
		const existingPlant = await query(
			"SELECT plant_id FROM plants WHERE plant_external_id = $1",
			[plant_external_id]
		);

		let plantId;
		if (existingPlant.rows.length === 0) {
			// If the plant doesn't exist, insert it
			const plantResult = await query(
				"INSERT INTO plants (plant_external_id, plant_name, scientific_name, image_url) VALUES ($1, $2, $3, $4) RETURNING plant_id",
				[plant_external_id, plant_name, scientific_name[0], image_url] // Note that scientific_name is an array, so we extract the first element
			);
			plantId = plantResult.rows[0].plant_id;
		} else {
			plantId = existingPlant.rows[0].plant_id;
		}

		// Add the plant to the user's specific list
		await query(
			"INSERT INTO list_plants (list_id, plant_id) VALUES ($1, $2)",
			[listId, plantId]
		);

		res.json({ message: "Plant added to list successfully." });
	} catch (error) {
		return next(error);
	}
});

module.exports = router;
