const express = require("express");
const { convertCurrency } = require("../controllers/currencyController");

const router = express.Router();

// POST /api/currency/convert
router.post("/convert", convertCurrency);

module.exports = router;
