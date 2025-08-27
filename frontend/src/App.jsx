import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import UserDashboard from './pages/userDashboard.jsx';
import AdminDashboard from './pages/adminDasdborad.jsx';
import Forbidden from './pages/Forbidden.jsx';
import NotFound from './pages/NotFound.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';


export default function App() {
return (
<Routes>
<Route path="/" element={<Navigate to="/login" replace />} />
<Route path="/login" element={<Login />} />


<Route
path="/user/dashboard"
element={
<ProtectedRoute requireRole="user">
<UserDashboard />
</ProtectedRoute>
}
/>


<Route
path="/admin/dashboard"
element={
<ProtectedRoute requireRole="admin">
<AdminDashboard />
</ProtectedRoute>
}
/>


<Route path="/forbidden" element={<Forbidden />} />
<Route path="*" element={<NotFound />} />
</Routes>
);
}