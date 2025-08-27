import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Đăng ký
router.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Missing fields" });
        }

        const existed = await User.findOne({ email });
        if (existed) {
            return res.status(409).json({ message: "Email already exists" });
        }

        // Hash password trước khi lưu
        const hash = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hash,
            role: "user", // gán mặc định user
        });

        await newUser.save();
        return res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        console.error("Register error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Đăng nhập
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(400).json({ message: 'Invalid credentials' });

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: "JWT_SECRET is not set" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES || '1d' }
        );
        console.log("JWT_SECRET at runtime:", process.env.JWT_SECRET);

        return res.json({ token, role: user.role, username: user.username });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

// Tạo admin seed
router.post('/seed-admin', async (req, res) => {
    try {
        const { email, password, username } = req.body;

        const existed = await User.findOne({ email });
        if (existed) return res.status(409).json({ message: 'Email already exists' });

        const hash = await bcrypt.hash(password, 10);

        const admin = await User.create({
            username,
            email,
            password: hash,
            role: 'admin'
        });

        return res.status(201).json({ id: admin._id, role: admin.role });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

export default router;
