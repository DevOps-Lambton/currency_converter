const axios = require("axios");
const config = require("../config");

// Function to convert currency
const convertCurrency = async (req, res) => {
  try {
    const { amount, fromCurrency, toCurrency } = req.body;

    // Validate input
    if (!amount || !fromCurrency || !toCurrency) {
      return res.status(400).json({ error: "Please enter an amount." });
    }

    // Fetch exchange rates
    const response = await axios.get(
      `${config.currencyApiUrl}/${fromCurrency}`
    );
    const rates = response.data.conversion_rates;

    // Validate toCurrency
    if (!rates[toCurrency]) {
      return res.status(400).json({ error: "Invalid currency code." });
    }

    // Calculate converted amount
    const convertedAmount = (amount * rates[toCurrency]).toFixed(2);

    res.status(200).json({
      amount,
      fromCurrency,
      toCurrency,
      convertedAmount,
    });
  } catch (error) {
    console.error("Error in convertCurrency:", error.message);
    res.status(500).json({ error: "Failed to convert currency." });
  }
};

module.exports = { convertCurrency };
