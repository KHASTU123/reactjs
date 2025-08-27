// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// require("dotenv").config();
// const userRoutes = require("./route/user");
// const connectDB = require("./config/db");
// // const initApiRoutes = require("./route/api");
// const authRoutes = require("./route/auth");
// const adminRoutes = require("./route/admin");
// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Kết nối MongoDB
// connectDB();

// // Routes
// app.use("/api/users", userRoutes);

// app.get("/", (req, res) => {
//   res.send("Hello from backend!");
// });

// const PORT = process.env.PORT || 8081;
// app.listen(PORT, () => {
//   console.log(`✅ Backend running at http://localhost:${PORT}`);
// });



import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./route/user.js";
import connectDB from "./config/db.js";
import authRoutes from "./route/auth.js";
import adminRoutes from "./route/admin.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

connectDB();
app.get('/', (_, res) => res.send('API is running'));
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on ${port}`));
