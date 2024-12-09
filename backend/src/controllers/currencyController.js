const axios = require("axios");
const config = require("../config");

// Function to convert currency
const convertCurrency = async (req, res) => {
  try {
    const { amount, fromCurrency, toCurrency } = req.body;

<<<<<<< HEAD
        // Validate input
        if (!amount || !fromCurrency || !toCurrency) {
<<<<<<< HEAD
            return res.status(400).json({ error: "All fields are required." });
=======
            return res.status(400).json({ error: "All fields a are required." });
>>>>>>> 82b1c42c6d3de83f684494be48102ba38005790e
        }

        // Fetch exchange rates
        const response = await axios.get(`${config.currencyApiUrl}/${fromCurrency}`);
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
=======
    // Validate input
    if (!amount || !fromCurrency || !toCurrency) {
      return res.status(400).json({ error: "Please enter an amount." });
>>>>>>> b8230fd35eded6c67b8154ca28434f02c54be1d3
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
