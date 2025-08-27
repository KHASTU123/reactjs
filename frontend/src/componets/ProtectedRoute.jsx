import { Navigate } from 'react-router-dom';


export default function ProtectedRoute({ children, requireRole }) {
const token = localStorage.getItem('token');
const role = localStorage.getItem('role');


if (!token) return <Navigate to="/login" replace />;
if (requireRole && role !== requireRole) return <Navigate to="/forbidden" replace />;


return children;
}