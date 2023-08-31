require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const config = require("./db/config");

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// Sample route
app.get("/", (req, res) => {
	res.send("Hello, Plant Planner!");
});

// TODO: Import and use other routes here
const userRoutes = require("./routes/users");
app.use("/users", userRoutes);

const listRoutes = require("./routes/lists");
app.use("/lists", listRoutes);

const plantRoutes = require("./routes/plants");
app.use("/lists", plantRoutes); // This will cover the nested plants routes, e.g., /lists/:listId/plants

const perenualRoutes = require("./api/perenual");
app.use("/api/perenual", perenualRoutes);

// Error handling
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

app.listen(config.PORT, () => {
	console.log(`Server is running on http://localhost:${config.PORT}`);
});
