import jwt from 'jsonwebtoken';


export const auth = (req, res, next) => {
const authHeader = req.headers.authorization || '';
const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
if (!token) return res.status(401).json({ message: 'No token provided' });


try {
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = decoded; // { id, role, iat, exp }
return next();
} catch (err) {
return res.status(401).json({ message: 'Invalid or expired token' });
}
};


export const allowRoles = (...roles) => (req, res, next) => {
if (!req.user) return res.status(401).json({ message: 'Unauthenticated' });
if (!roles.includes(req.user.role)) {
return res.status(403).json({ message: 'Access denied' });
}
return next();
};