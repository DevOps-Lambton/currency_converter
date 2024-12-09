import React, { useState } from "react";
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

  // Helper function to get the full currency name
  const getCurrencyName = (currencyCode) => {
    switch (currencyCode) {
      case "USD":
        return "US Dollar";
      case "EUR":
        return "Euro";
      case "CAD":
        return "Canadian Dollar";
      case "GBP":
        return "British Pound";
      case "AUD":
        return "Australian Dollar";
      case "JPY":
        return "Japanese Yen";
      case "INR":
        return "Indian Rupee";
      case "CNY":
        return "Chinese Yuan";
      case "CHF":
        return "Swiss Franc";
      case "MXN":
        return "Mexican Peso";
      case "NZD":
        return "New Zealand Dollar";
      case "SGD":
        return "Singapore Dollar";
      case "HKD":
        return "Hong Kong Dollar";
      case "NOK":
        return "Norwegian Krone";
      case "SEK":
        return "Swedish Krona";
      case "ZAR":
        return "South African Rand";
      default:
        return currencyCode;
    }
  };

  // Handle currency conversion
  const handleConvert = async () => {
    try {
      setError(null);
      const response = await axios.post(
        "http://localhost:5000/api/currency/convert",
        {
          amount,
          fromCurrency,
          toCurrency,
        }
      );
      setConvertedAmount(response.data.convertedAmount);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong!");
    }
  };

  // Handle currency swap
  const handleSwap = async () => {
    try {
      setError(null);
      const temp = fromCurrency;
      setFromCurrency(toCurrency);
      setToCurrency(temp);

      if (amount) {
        const response = await axios.post(
          "http://localhost:5000/api/currency/convert",
          {
            amount,
            fromCurrency: toCurrency,
            toCurrency: fromCurrency,
          }
        );
        setConvertedAmount(response.data.convertedAmount);
      }
    } catch (err) {
      setError(
        err.response?.data?.error || "Something went wrong during the swap!"
      );
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 text-primary">Currency Converter</h1>
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
                <MenuItem value="USD">
                  <Flag code="US" style={{ width: 20, marginRight: 8 }} />
                  USD - US Dollar
                </MenuItem>
                <MenuItem value="EUR">
                  <Flag code="EU" style={{ width: 20, marginRight: 8 }} />
                  EUR - Euro
                </MenuItem>
                <MenuItem value="CAD">
                  <Flag code="CA" style={{ width: 20, marginRight: 8 }} />
                  CAD - Canadian Dollar
                </MenuItem>
                <MenuItem value="GBP">
                  <Flag code="GB" style={{ width: 20, marginRight: 8 }} />
                  GBP - British Pound
                </MenuItem>
                <MenuItem value="AUD">
                  <Flag code="AU" style={{ width: 20, marginRight: 8 }} />
                  AUD - Australian Dollar
                </MenuItem>
                <MenuItem value="JPY">
                  <Flag code="JP" style={{ width: 20, marginRight: 8 }} />
                  JPY - Japanese Yen
                </MenuItem>
                <MenuItem value="INR">
                  <Flag code="IN" style={{ width: 20, marginRight: 8 }} />
                  INR - Indian Rupee
                </MenuItem>
                <MenuItem value="CNY">
                  <Flag code="CN" style={{ width: 20, marginRight: 8 }} />
                  CNY - Chinese Yuan
                </MenuItem>
                <MenuItem value="CHF">
                  <Flag code="CH" style={{ width: 20, marginRight: 8 }} />
                  CHF - Swiss Franc
                </MenuItem>
                <MenuItem value="MXN">
                  <Flag code="MX" style={{ width: 20, marginRight: 8 }} />
                  MXN - Mexican Peso
                </MenuItem>
                <MenuItem value="NZD">
                  <Flag code="NZ" style={{ width: 20, marginRight: 8 }} />
                  NZD - New Zealand Dollar
                </MenuItem>
                <MenuItem value="SGD">
                  <Flag code="SG" style={{ width: 20, marginRight: 8 }} />
                  SGD - Singapore Dollar
                </MenuItem>
                <MenuItem value="HKD">
                  <Flag code="HK" style={{ width: 20, marginRight: 8 }} />
                  HKD - Hong Kong Dollar
                </MenuItem>
                <MenuItem value="NOK">
                  <Flag code="NO" style={{ width: 20, marginRight: 8 }} />
                  NOK - Norwegian Krone
                </MenuItem>
                <MenuItem value="SEK">
                  <Flag code="SE" style={{ width: 20, marginRight: 8 }} />
                  SEK - Swedish Krona
                </MenuItem>
                <MenuItem value="ZAR">
                  <Flag code="ZA" style={{ width: 20, marginRight: 8 }} />
                  ZAR - South African Rand
                </MenuItem>
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
                <MenuItem value="USD">
                  <Flag code="US" style={{ width: 20, marginRight: 8 }} />
                  USD - US Dollar
                </MenuItem>
                <MenuItem value="EUR">
                  <Flag code="EU" style={{ width: 20, marginRight: 8 }} />
                  EUR - Euro
                </MenuItem>
                <MenuItem value="CAD">
                  <Flag code="CA" style={{ width: 20, marginRight: 8 }} />
                  CAD - Canadian Dollar
                </MenuItem>
                <MenuItem value="GBP">
                  <Flag code="GB" style={{ width: 20, marginRight: 8 }} />
                  GBP - British Pound
                </MenuItem>
                <MenuItem value="AUD">
                  <Flag code="AU" style={{ width: 20, marginRight: 8 }} />
                  AUD - Australian Dollar
                </MenuItem>
                <MenuItem value="JPY">
                  <Flag code="JP" style={{ width: 20, marginRight: 8 }} />
                  JPY - Japanese Yen
                </MenuItem>
                <MenuItem value="INR">
                  <Flag code="IN" style={{ width: 20, marginRight: 8 }} />
                  INR - Indian Rupee
                </MenuItem>
                <MenuItem value="CNY">
                  <Flag code="CN" style={{ width: 20, marginRight: 8 }} />
                  CNY - Chinese Yuan
                </MenuItem>
                <MenuItem value="CHF">
                  <Flag code="CH" style={{ width: 20, marginRight: 8 }} />
                  CHF - Swiss Franc
                </MenuItem>
                <MenuItem value="MXN">
                  <Flag code="MX" style={{ width: 20, marginRight: 8 }} />
                  MXN - Mexican Peso
                </MenuItem>
                <MenuItem value="NZD">
                  <Flag code="NZ" style={{ width: 20, marginRight: 8 }} />
                  NZD - New Zealand Dollar
                </MenuItem>
                <MenuItem value="SGD">
                  <Flag code="SG" style={{ width: 20, marginRight: 8 }} />
                  SGD - Singapore Dollar
                </MenuItem>
                <MenuItem value="HKD">
                  <Flag code="HK" style={{ width: 20, marginRight: 8 }} />
                  HKD - Hong Kong Dollar
                </MenuItem>
                <MenuItem value="NOK">
                  <Flag code="NO" style={{ width: 20, marginRight: 8 }} />
                  NOK - Norwegian Krone
                </MenuItem>
                <MenuItem value="SEK">
                  <Flag code="SE" style={{ width: 20, marginRight: 8 }} />
                  SEK - Swedish Krona
                </MenuItem>
                <MenuItem value="ZAR">
                  <Flag code="ZA" style={{ width: 20, marginRight: 8 }} />
                  ZAR - South African Rand
                </MenuItem>
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
