const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

const app = express();

// ================== CORS CONFIG ==================
const allowedOrigins = [
  "http://localhost:3000",               // local development
  "https://todo-app-lv13.onrender.com"   // your deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// ================== Routes ==================
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// ================== MongoDB Connection ==================
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mernapp";

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ================== Start Server ==================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
