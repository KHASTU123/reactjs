import { Link, Routes, Route } from "react-router-dom";
import UserManagement from "./admin/UserManagement";

function AdminDashboard() {
  return (
    <div style={styles.layout}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>⚙️ Admin</h2>
        <nav>
          <ul style={styles.menu}>
            <li><Link to="users">👤 Quản lý Users</Link></li>
            <li><Link to="roles">🔑 Quản lý Roles</Link></li>
            <li><Link to="stats">📊 Thống kê</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={styles.content}>
        <h1>Trang Admin Dashboard</h1>
        <Routes>
          <Route path="users" element={<UserManagement />} />
          <Route path="roles" element={<div>Trang quản lý Roles</div>} />
          <Route path="stats" element={<div>Trang thống kê</div>} />
        </Routes>
      </main>
    </div>
  );
}

const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  sidebar: {
    width: "220px",
    background: "#2c3e50",
    color: "white",
    padding: "20px",
  },
  logo: {
    marginBottom: "30px",
  },
  menu: {
    listStyle: "none",
    padding: 0,
  },
  content: {
    flex: 1,
    padding: "20px",
    background: "#f4f6f8",
  },
};

export default AdminDashboard;
