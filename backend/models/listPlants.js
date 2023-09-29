// File name: listPlants.js
// Description: This file contains the listPlants model for the RESTFUL API

const db = require('../db/db');

const ListPlants = {
  findAllByListId: (listId) => {
    return db.query(`
        SELECT plants.*, listplants.id as listplants_id, listplants.list_id
        FROM listplants
        JOIN plants ON listplants.plant_id = plants.id
        WHERE listplants.list_id = $1;
    `, [listId]);
  },
  
  findById: (id) => {
    return db.query('SELECT * FROM listplants WHERE id = $1', [id]);
  },

  create: (listPlant) => {
    return db.query('INSERT INTO listplants (list_id, plant_id) VALUES ($1, $2) RETURNING id', [listPlant.list_id, listPlant.plant_id]);
  },

  update: (id, listPlant) => {
    // If you don't have any other fields to update, you might not need this function
    // But if you have, adjust the query accordingly
    return db.query('UPDATE listplants SET column_to_update=$1 WHERE id=$2', [value_to_update, id]);
  },

  delete: (id) => {
    return db.query('DELETE FROM listplants WHERE id = $1', [id]);
  }
};

module.exports = ListPlants;