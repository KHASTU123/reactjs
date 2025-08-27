import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import User from "./pages/User";
import UserDashboard from "./pages/userDashboard";
import AdminDashboard from "./pages/adminDasdborad";
import UserManagement from "./pages/admin/UserManagement";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
        <Route  path="/admin/dashboard/users" element={<UserManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
