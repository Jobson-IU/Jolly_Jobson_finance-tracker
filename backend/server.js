const express = require("express");
const cors = require("cors");

const app = express();

// Import routes
const authRoutes = require("./routes/auth");
const transactionRoutes = require("./routes/transactions");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Finance Tracker API is running...");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});