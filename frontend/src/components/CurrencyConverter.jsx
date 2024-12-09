import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaExchangeAlt } from "react-icons/fa";
import {
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  InputAdornment,
  TextField,
  Grid,
} from "@mui/material";
import Flag from "react-world-flags"; // Import flag for currency
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is included

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("CAD");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState(null);
  const [hasInteracted, setHasInteracted] = useState(false); // Track user interaction
  const [loading, setLoading] = useState(false); // Track loading state

  // List of supported currencies
  const currencies = [
    { code: "USD", flag: "US", name: "US Dollar" },
    { code: "EUR", flag: "EU", name: "Euro" },
    { code: "CAD", flag: "CA", name: "Canadian Dollar" },
    { code: "GBP", flag: "GB", name: "British Pound" },
    { code: "AUD", flag: "AU", name: "Australian Dollar" },
    { code: "JPY", flag: "JP", name: "Japanese Yen" },
    { code: "INR", flag: "IN", name: "Indian Rupee" },
    { code: "CNY", flag: "CN", name: "Chinese Yuan" },
    { code: "CHF", flag: "CH", name: "Swiss Franc" },
    { code: "MXN", flag: "MX", name: "Mexican Peso" },
    { code: "NZD", flag: "NZ", name: "New Zealand Dollar" },
    { code: "SGD", flag: "SG", name: "Singapore Dollar" },
    { code: "HKD", flag: "HK", name: "Hong Kong Dollar" },
    { code: "NOK", flag: "NO", name: "Norwegian Krone" },
    { code: "SEK", flag: "SE", name: "Swedish Krona" },
    { code: "ZAR", flag: "ZA", name: "South African Rand" },
  ];

  // Helper function to get the full currency name
  const getCurrencyName = (currencyCode) => {
    const currency = currencies.find((c) => c.code === currencyCode);
    return currency ? currency.name : currencyCode;
  };

  // Handle currency conversion
  const handleConvert = async () => {
    if (!amount || amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    try {
      setError(null);
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/currency/convert`,
        {
          amount,
          fromCurrency,
          toCurrency,
        }
      );
      setConvertedAmount(response.data.convertedAmount);
      setHasInteracted(true); // Set interacted state to true
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Handle currency swap
  const handleSwap = async () => {
    try {
      setError(null);
      setLoading(true);
      const temp = fromCurrency;
      setFromCurrency(toCurrency);
      setToCurrency(temp);

      if (amount) {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/currency/convert`,
          {
            amount,
            fromCurrency: toCurrency,
            toCurrency: fromCurrency,
          }
        );
        setConvertedAmount(response.data.convertedAmount);
        setHasInteracted(true); // Set interacted state to true
      }
    } catch (err) {
      setError(
        err.response?.data?.error || "Something went wrong during the swap!"
      );
    } finally {
      setLoading(false);
    }
  };

  // Automatically convert when amount, fromCurrency, or toCurrency changes after user has interacted
  useEffect(() => {
    if (hasInteracted && amount && fromCurrency && toCurrency) {
      handleConvert();
    }
  }, [amount, fromCurrency, toCurrency, hasInteracted]);

  // Render currency options
  const renderCurrencyOptions = (currencies) => {
    return currencies.map((currency) => (
      <MenuItem key={currency.code} value={currency.code}>
        <Flag
          code={currency.flag}
          style={{ width: "20px", marginRight: "8px" }}
        />
        {currency.code} - {currency.name}
      </MenuItem>
    ));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 text-danger">meet</h1>
      <div className="card shadow-lg p-4">
        {/* Amount Input */}
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={6} sm={6}>
            <TextField
              label="Amount"
              variant="outlined"
              fullWidth
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        {/* Currency Dropdowns and Swap Button */}
        <Grid
          container
          spacing={3}
          alignItems="center"
          justifyContent="center"
          style={{ marginTop: "20px" }}
        >
          {/* From Currency */}
          <Grid item xs={3} display="flex" justifyContent="flex-start">
            <FormControl fullWidth variant="outlined">
              <InputLabel>From Currency</InputLabel>
              <Select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                label="From Currency"
              >
                {renderCurrencyOptions(currencies)}
              </Select>
            </FormControl>
          </Grid>

          {/* Swap Button */}
          <Grid item xs={2} textAlign="center">
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={handleSwap}
              style={{ height: 56 }}
            >
              <FaExchangeAlt style={{ fontSize: "1.5rem" }} />
            </Button>
          </Grid>

          {/* To Currency */}
          <Grid item xs={3} display="flex" justifyContent="flex-end">
            <FormControl fullWidth variant="outlined">
              <InputLabel>To Currency</InputLabel>
              <Select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                label="To Currency"
              >
                {renderCurrencyOptions(currencies)}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Convert Button */}
        <Button
          variant="contained"
          color="success"
          fullWidth
          size="large"
          onClick={handleConvert}
          style={{ marginTop: "20px", padding: "15px" }}
        >
          Convert
        </Button>

        {/* Display Converted Amount */}
        {convertedAmount && (
          <div className="alert alert-success mt-4">
            <strong>
              {amount} {fromCurrency} ({getCurrencyName(fromCurrency)}) ={" "}
              <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                {convertedAmount} {toCurrency} - {getCurrencyName(toCurrency)}
              </span>{" "}
            </strong>
          </div>
        )}

        {/* Display Error */}
        {error && (
          <div className="alert alert-danger mt-4">
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
