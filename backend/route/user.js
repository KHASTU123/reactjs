// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcrypt");
// const User = require("../models/User");

// // REGISTER
// router.post("/register", async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     if (!username || !password) {
//       return res.status(400).json({ message: "Missing username or password" });
//     }

//     const existUser = await User.findOne({ username });
//     if (existUser) {
//       return res.status(400).json({ message: "Username already exists" });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({ username, password: hashedPassword });
//     await newUser.save();

//     return res.status(201).json({ message: "User created successfully", user: newUser });
//   } catch (err) {
//     return res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// // LOGIN
// router.post("/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });

//     if (!user) return res.status(404).json({ message: "User not found" });

//     // So sánh mật khẩu
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid password" });

//     return res.json({ message: "Login successful", user: { id: user._id, username: user.username } });
//   } catch (err) {
//     return res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// // GET ALL USERS
// router.get("/", async (req, res) => {
//   try {
//     const users = await User.find();
//     return res.status(200).json(users);
//   } catch (err) {
//     return res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// // GET ONE USER
// router.get("/:id", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });
//     return res.status(200).json(user);
//   } catch (err) {
//     return res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// // UPDATE USER
// router.put("/:id", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     let updatedFields = { username };

//     if (password) {
//       updatedFields.password = await bcrypt.hash(password, 10);
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       updatedFields,
//       { new: true }
//     );

//     if (!updatedUser) return res.status(404).json({ message: "User not found" });
//     return res.status(200).json({ message: "User updated successfully", user: updatedUser });
//   } catch (err) {
//     return res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// // DELETE USER
// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.params.id);
//     if (!deletedUser) return res.status(404).json({ message: "User not found" });
//     return res.status(200).json({ message: "User deleted successfully" });
//   } catch (err) {
//     return res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// module.exports = router;
import express from "express";
import { auth, allowRoles } from "../middleware/auth.js"; 


const router = express.Router();


router.get('/me', auth, allowRoles('user', 'admin'), (req, res) => {
res.json({ message: 'User scope OK', user: req.user });
});

export default router;
