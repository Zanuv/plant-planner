// File name: plant.js
// Description: This file contains the plant model for the RESTFUL API

const db = require('../db/db');  // Your database configuration

const Plant = {
  findAll: () => {
    return db.query('SELECT * FROM plants');
  },

  findById: (id) => {
    return db.query('SELECT * FROM plants WHERE id = $1', [id]);
  },

  findByCommonName: (commonName) => {
    return db.query('SELECT * FROM plants WHERE common_name ILIKE $1', [`%${commonName}%`]);
  },
  
  create: (plant) => {
    return db.query('INSERT INTO plants (common_name, scientific_name, watering, sunlight, description, zoning, icon_path) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      [plant.common_name, plant.scientific_name, plant.watering, plant.sunlight, plant.description, plant.zoning, plant.icon_path]);
  },

  update: (id, plant) => {
    return db.query('UPDATE plants SET common_name=$1, scientific_name=$2, watering=$3, sunlight=$4, description=$5, zoning=$6, icon_path=$7 WHERE id=$8',
      [plant.common_name, plant.scientific_name, plant.watering, plant.sunlight, plant.description, plant.zoning, plant.icon_path, id]);
  },

  delete: (id) => {
    return db.query('DELETE FROM plants WHERE id = $1', [id]);
  }
};

module.exports = Plant;
