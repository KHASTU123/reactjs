import express from 'express';
import User from '../models/User.js';


const router = express.Router();


// Đăng ký (mặc định role=user). Có thể kiểm soát role khi seed admin riêng.
router.post('/register', async (req, res) => {
try {
const { username, email, password } = req.body;
if (!username || !email || !password) {
return res.status(400).json({ message: 'Missing fields' });
}


const existed = await User.findOne({ email });
if (existed) return res.status(409).json({ message: 'Email already exists' });


const hash = await bcrypt.hash(password, 10);
const user = await User.create({ username, email, password: hash });


return res.status(201).json({
id: user._id,
username: user.username,
email: user.email,
role: user.role
});
} catch (err) {
return res.status(500).json({ message: err.message });
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


const token = jwt.sign(
{ id: user._id, role: user.role },
process.env.JWT_SECRET,
{ expiresIn: process.env.JWT_EXPIRES || '1d' }
);


return res.json({ token, role: user.role, username: user.username });
} catch (err) {
return res.status(500).json({ message: err.message });
}
});


// (Tuỳ chọn) Tạo admin seed NẾU chưa có — nên tắt ở production hoặc bảo vệ bằng env
router.post('/seed-admin', async (req, res) => {
try {
const { email, password, username } = req.body;
const existed = await User.findOne({ email });
if (existed) return res.status(409).json({ message: 'Email already exists' });
const hash = await bcrypt.hash(password, 10);
const admin = await User.create({ username, email, password: hash, role: 'admin' });
return res.status(201).json({ id: admin._id, role: admin.role });
} catch (err) {
return res.status(500).json({ message: err.message });
}
});


export default router;