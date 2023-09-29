// File name: list.js
// Description: This file contains the list model for the RESTFUL API

const db = require('../db/db');

const List = {
    findAllByUserId: async (userId) => {
        const result = await db.query('SELECT * FROM userlists WHERE user_id = $1', [userId]);
        return result.rows;
    },

    findById: async (id) => {
        const result = await db.query('SELECT * FROM userlists WHERE id = $1', [id]);
        return result.rows[0];
    },

    create: async (list) => {
        const result = await db.query('INSERT INTO userlists (name, description, user_id) VALUES ($1, $2, $3) RETURNING id', [list.name, list.description, list.user_id]);
        return result.rows[0];
    },
    
    update: async (id, list) => {
        try {
            console.log('Updating list with id:', id, 'with data:', list); // Log the id and data
            await db.query('UPDATE userlists SET description=$1 WHERE id=$2', [list.description, id]);
            console.log('Update successful'); // Log if the update was successful
        } catch (error) {
            console.error('Error updating list in database:', error); // Log any error that occurs
            throw error;
        }
    },
    
    delete: async (id) => {
        console.log("In the delete function, ID to be deleted:", id);  // Add this log
        await db.query('DELETE FROM userlists WHERE id = $1', [id]);
    }
    
};

module.exports = List;
