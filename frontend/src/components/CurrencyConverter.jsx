import React, { useState } from "react";
import axios from "axios";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState(null);

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

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Currency Converter</h1>
      <div className="card shadow-lg p-4">
        <div className="form-group mb-3">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>

        <div className="form-row mb-3">
          <div className="col">
            <label htmlFor="fromCurrency">From Currency</label>
            <select
              id="fromCurrency"
              className="form-control"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="CAD">CAD</option>
              <option value="GBP">GBP</option>
            </select>
          </div>

          <div className="col">
            <label htmlFor="toCurrency">To Currency</label>
            <select
              id="toCurrency"
              className="form-control"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="CAD">CAD</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </div>

        <button className="btn btn-primary btn-block" onClick={handleConvert}>
          Convert
        </button>

        {convertedAmount && (
          <div className="alert alert-success mt-4">
            Converted Amount: {convertedAmount} {toCurrency}
          </div>
        )}

        {error && <div className="alert alert-danger mt-4">Error: {error}</div>}
      </div>
    </div>
  );
};

export default CurrencyConverter;
