require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path"); // NEW: Require path module
const config = require("./db/config");

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// TODO: Import and use other routes here
const userRoutes = require("./routes/users");
app.use("/users", userRoutes);

const listRoutes = require("./routes/lists");
app.use("/lists", listRoutes);

const plantRoutes = require("./routes/plants");
app.use("/lists", plantRoutes); // This will cover the nested plants routes, e.g., /lists/:listId/plants

const perennialRoutes = require("./api/perenual"); // Ensure this path is correct.
app.use("/api/perenual", perennialRoutes);

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
