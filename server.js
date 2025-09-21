const express = require("express");
const adminRoutes = require("./src/routes/adminRoutes"); 
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Routes
app.use("/", adminRoutes);

// Health check or base route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});