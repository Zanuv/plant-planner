// File name: user.js
// Description: This file contains the user model for the RESTFUL API

const db = require('../db/db');

const User = {
  findAll: () => {
    return db.any('SELECT * FROM users');
  },

  findById: (id) => {
    return db.one('SELECT * FROM users WHERE id = $1', [id]);
  },

  findByEmail: (email) => {
    return db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);
  },

  create: (user) => {
    return db.one('INSERT INTO users (email) VALUES ($1) RETURNING id', [user.email]);
  },

  delete: (id) => {
    return db.none('DELETE FROM users WHERE id = $1', [id]);
  }
};

module.exports = User;
