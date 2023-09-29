// File name: plantRoutes.js
// Description: This file contains the plants routes for the RESTFUL API

const express = require('express');
const router = express.Router();
const Plant = require('../models/plant');  // Importing the Plant model

router.get('/test', (req, res) => {
  res.send('Plant route test successful');
});

// Get a list of all plants from RESTFUL API
router.get('/', async (req, res) => {
  try {
    const plants = await Plant.findAll();
    res.json(plants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new plant route from RESTFUL API
router.post('/', async (req, res) => {
  try {
    const newPlant = await Plant.create(req.body);
    res.status(201).json(newPlant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Search for a specific plant by common name from RESTFUL API
router.get('/search', async (req, res) => {
  console.log("Accessed /plants/search endpoint");
  console.log("Search query:", req.query.common_name);
  try {
    const plants = await Plant.findByCommonName(req.query.common_name);
    res.json(plants.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add more routes for updating, deleting plants, etc.

module.exports = router;
