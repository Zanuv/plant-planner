"use strict";

require("dotenv").config(); // Load environment variables from .env file

const CONFIG = {
	SECRET_KEY: process.env.SECRET_KEY,
	PORT: process.env.PORT || 3001,
	BCRYPT_WORK_FACTOR: process.env.BCRYPT_WORK_FACTOR || 12,
	DATABASE_URL: process.env.DATABASE_URL,
	PERENUAL_API_KEY: process.env.PERENUAL_API_KEY,
};

module.exports = CONFIG;
