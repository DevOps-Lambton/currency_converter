const axios = require("axios");
const config = require("../config");

const convertCurrency = async (req, res) => {
    try {
        const { amount, fromCurrency, toCurrency } = req.body;

        if (!amount || !fromCurrency || !toCurrency) {
            return res.status(400).json({ error: "All fields are must required." });
        }

        const response = await axios.get(`${config.currencyApiUrl}/${fromCurrency}`);
        const rates = response.data.rates;

        if (!rates[toCurrency]) {
            return res.status(400).json({ error: "Invalid currency code." });
        }

        const convertedAmount = (amount * rates[toCurrency]).toFixed(2);

        res.status(200).json({
            amount,
            fromCurrency,
            toCurrency,
            convertedAmount,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to convert currency." });
    }
};

module.exports = { convertCurrency };
