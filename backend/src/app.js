const express = require("express");
const cors = require("cors");
const currencyRoutes = require("./routes/currencyRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/currency", currencyRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});