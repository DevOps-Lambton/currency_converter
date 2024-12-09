const express = require("express");
const cors = require("cors");
const currencyRoutes = require("./routes/currencyRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/currency", currencyRoutes);

module.exports = app;
