const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth");    // Your auth routes
const taskRoutes = require("./routes/tasks");   // Your task routes

const app = express();

// ================== Middleware ==================
app.use(cors());
app.use(express.json()); // parse JSON bodies

// ================== Routes ==================
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes); // <-- Fixed: mount task routes

// ================== MongoDB Connection ==================
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mernapp";

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ================== Start Server ==================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
