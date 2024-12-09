const express = require("express");
const { convertCurrency } = require("../controllers/currencyController");

const router = express.Router();

router.post("/convert", convertCurrency);

module.exports = router;
