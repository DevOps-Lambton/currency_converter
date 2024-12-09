import React, { useState } from "react";
import api from "../axios";

const CurrencyConverter = () => {
    const [amount, setAmount] = useState("");
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("CAD");
    const [converted, setConverted] = useState(null);
    const [error, setError] = useState("");

    const handleConvert = async () => {
        try {
            const response = await api.post("/convert", {
                amount,
                fromCurrency,
                toCurrency,
            });
            setConverted(response.data.convertedAmount);
            setError("");
        } catch (err) {
            setError("Failed to convert currency");
            setConverted(null);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Currency Converter</h1>
            <div className="mb-3">
                <input
                    type="number"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                />
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value.toUpperCase())}
                    placeholder="From Currency (e.g., USD)"
                />
            </div>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value.toUpperCase())}
                    placeholder="To Currency (e.g., CAD)"
                />
            </div>
            <button className="btn btn-primary" onClick={handleConvert}>
                Convert
            </button>
            {converted && (
                <h2 className="mt-3">Converted Amount: {converted}</h2>
            )}
            {error && <p className="text-danger">{error}</p>}
        </div>
    );
};

export default CurrencyConverter;
