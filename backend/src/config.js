require("dotenv").config();

const config = {
    port: process.env.PORT || 5000,
    currencyApiUrl: process.env.CURRENCY_API_URL,
};

module.exports = config;
