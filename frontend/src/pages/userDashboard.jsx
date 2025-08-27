import { useState, useEffect } from "react";

function UserDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Giả sử gọi API để lấy danh sách user
    fetch("http://localhost:8081/api/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>👤 User Dashboard</h1>

      <div style={styles.card}>
        <h2>Danh sách Users</h2>
        {users.length === 0 ? (
          <p>⏳ Đang tải dữ liệu...</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Tên đăng nhập</th>
                <th>Email</th>
                <th>Vai trò</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    background: "#f9f9f9",
    minHeight: "100vh",
  },
  title: {
    color: "#333",
    textAlign: "center",
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginTop: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  th: {
    border: "1px solid #ddd",
    padding: "8px",
    background: "#eee",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
  },
};

export default UserDashboard;
