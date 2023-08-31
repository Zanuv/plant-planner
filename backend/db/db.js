const { Pool } = require("pg");
const config = require("./config");

const pool = new Pool({
	connectionString: config.DATABASE_URL,
});

pool.connect()
	.then(() => console.log("Connected to database"))
	.catch((err) => console.error("Error connecting to database:", err));

module.exports = {
	query: (text, params) => pool.query(text, params),
};
