import express from 'express';
import { auth, allowRoles } from '../middleware/auth.js';


const router = express.Router();


router.get('/stats', auth, allowRoles('admin'), (req, res) => {
// ví dụ dữ liệu thống kê giả lập
res.json({
message: 'Admin scope OK',
metrics: { users: 1200, activeToday: 87 }
});
});


export default router;