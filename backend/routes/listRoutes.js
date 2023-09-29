// File name: listRoutes.js
// Description: This file contains the user list routes for the RESTFUL API from testplants local database

const express = require('express');
const router = express.Router();
const List = require('../models/list');  // Importing the List model
const ListPlants = require('../models/listPlants');  // Importing the ListPlants model
const authenticateJWT = require("../middleware/auth"); // Import the JWT middleware
const db = require('../db/db'); // Import the database connection

// Allow a user to create a new list
router.post('/', authenticateJWT, async (req, res) => {
    console.log("Inside the list creation route, received request body:", req.body);
    try {
        const userId = req.user.user_id;  // Extract user_id from JWT
        console.log("Request body:", req.body); // Log the request body to check the content
        const newList = await List.create({
            name: req.body.name,
            description: req.body.description,
            user_id: userId
        });
        res.status(201).json(newList);
    } catch (err) {
        console.error("Error when creating list:", err); // Log any error
        res.status(400).json({ message: err.message });
    }
});


// Allow a user to get a list of all lists by user ID
router.get('/', authenticateJWT, async (req, res) => {
    try {
        const userId = req.user.user_id;  // Extract user_id from JWT
        const lists = await List.findAllByUserId(userId); 
        res.json(lists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Allow a user to view a specific list
router.get('/:id', authenticateJWT, async (req, res) => {
    try {
        const list = await List.findById(req.params.id);
        res.json(list);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Allow a user to delete a specific list
router.delete('/:id', authenticateJWT, async (req, res) => {
    try {
        const listId = req.params.id;
        console.log("Attempting to delete list with ID:", listId);  // Add this log
        await List.delete(listId);
        res.status(200).json({ message: "List deleted successfully." });
    } catch (err) {
        console.error("Error while deleting the list:", err);  // Enhanced logging for errors
        res.status(500).json({ message: err.message });
    }
});

// Allow a user to add a plant to a specific list
router.post('/:listId/plants', authenticateJWT, async (req, res) => {
    try {
        const listId = req.params.listId;
        const plantId = req.body.plantId;

        console.log("Attempting to add plant with ID:", plantId, "to list with ID:", listId);
        
        // Insert a record into the listplants table
        await ListPlants.create({
            list_id: listId,
            plant_id: plantId,
            notes: req.body.notes || ''  // Optional notes, if you want to include them
        });
        
        res.status(200).json({ message: "Plant added to list successfully." });
    } catch (err) {
        console.error("Error while adding plant to the list:", err);
        res.status(500).json({ message: err.message });
    }
});

// Allow a user to view all plants within a specific list
router.get('/:id/plants', authenticateJWT, async (req, res) => {
    try {
        const listId = req.params.id;
        const plants = await ListPlants.findAllByListId(listId); 
        res.json(plants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Allow a user to remove a plant from a specific list
router.delete('/:listId/plants/:plantId', authenticateJWT, async (req, res) => {
    try {
        const listId = req.params.listId;
        const plantId = req.params.plantId;

        console.log("Attempting to remove plant with ID:", plantId, "from list with ID:", listId);
        
        // Find the record in the listplants table that corresponds to listId and plantId
        const result = await db.query('SELECT id FROM listplants WHERE list_id = $1 AND plant_id = $2', [listId, plantId]);
        
        // Check if a record was found
        if (result.rows.length > 0) {
            const listPlantId = result.rows[0].id;
            
            // Delete the record from the listplants table
            await ListPlants.delete(listPlantId);
            
            res.status(200).json({ message: "Plant removed from list successfully." });
        } else {
            res.status(404).json({ message: "Record not found." });
        }
    } catch (err) {
        console.error("Error while removing plant from the list:", err);
        res.status(500).json({ message: err.message });
    }
});

// Allow a user to update a specific list description
router.put('/:id', authenticateJWT, async (req, res) => {
    try {
        console.log('Request received:', req.body); // Log the received request body
        const listId = req.params.id;
        const { description } = req.body;
        await List.update(listId, { description }); // Ensure your List model can handle this
        console.log('List updated successfully'); // Log if the update was successful
        res.status(200).json({ message: 'List updated successfully.' });
    } catch (err) {
        console.error('Error updating list:', err); // Log any error that occurs
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;  // Exporting the router
