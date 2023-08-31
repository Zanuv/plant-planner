const express = require("express");
const axios = require("axios");
const router = express.Router();

const PERENUAL_API_BASE = "https://perenual.com/api/";
const PERENUAL_API_KEY = process.env.PERENUAL_API_KEY;

// Route to search for plants by name
router.get("/search", async (req, res, next) => {
	try {
		const searchTerm = req.query.q;
		const page = req.query.page || 1; // Default to page 1 if not provided

		if (!searchTerm) {
			return res
				.status(400)
				.json({ error: "Search term (q) is required." });
		}

		const response = await axios.get(`${PERENUAL_API_BASE}species-list`, {
			params: {
				key: PERENUAL_API_KEY,
				q: searchTerm,
				page: page,
			},
		});

		return res.json(response.data);
	} catch (error) {
		return next(error);
	}
});

module.exports = router;
