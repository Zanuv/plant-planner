// File name: server.js
// Description: This file is the main backend server file 

require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const config = require("./db/config");
const path = require("path");

const app = express();

// Middlewares
app.use(cors());
// Set Content Security Policy
app.use(helmet({
	contentSecurityPolicy: {
	  directives: {
		defaultSrc: ["'self'"],
		imgSrc: ["'self'", "data:", "https://raw.githubusercontent.com"], // Add your external source here
		// ... add other directives as needed
	  },
	},
  }));
app.use(express.json());

app.use((req, res, next) => {
    console.log('Received request body:', req.body);
    next();
});


// Import Routes
const userRoutes = require("./routes/userRoutes");
const listRoutes = require("./routes/listRoutes");
const plantRoutes = require("./routes/plantRoutes");

// Use Routes
app.use("/users", userRoutes);
app.use("/lists", listRoutes);
app.use("/plants", plantRoutes);

// NEW: Serve static files from the React frontend app
const frontendBuildPath = path.join(__dirname, "..", "frontend", "build");
app.use(express.static(frontendBuildPath));

// NEW: Catch-all handler for any unmatched route
app.get("*", (req, res) => {
	res.sendFile(path.join(frontendBuildPath, "index.html"));
});

// Error handling
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

app.listen(config.PORT, () => {
	console.log(`Server is running on http://localhost:${config.PORT}`);
});
