const express = require("express");
const { convertCurrency } = require("../controllers/currencyController");

const router = express.Router();

// POST route for currency conversion
router.post("/convert", convertCurrency);

module.exports = router;
