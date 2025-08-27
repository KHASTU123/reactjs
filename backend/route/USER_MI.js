import express from 'express';
import { auth, allowRoles } from '../middleware/auth.js';


const router = express.Router();


router.get('/me', auth, allowRoles('user', 'admin'), (req, res) => {
res.json({ message: 'User scope OK', user: req.user });
});


export default router;