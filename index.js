const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const routes = require("./routes/api");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

// Connect to the database
mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

// Since mongoose's Promise is deprecated, we override it with Node's Promise
mongoose.Promise = global.Promise;

// CORS middleware
app.use(cors());

// Parse JSON bodies (built-in Express middleware)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api", routes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client", "dist")));

// Handle all other routes by returning the React app (must be after API routes)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Error handling middleware (must be last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
