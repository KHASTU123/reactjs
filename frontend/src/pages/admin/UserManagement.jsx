import { useEffect, useState } from "react";

function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/api/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>👤 Quản lý Users</h2>
      {users.length === 0 ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Tên đăng nhập</th>
              <th>Email</th>
              <th>Role</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u._id}>
                <td>{i + 1}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button style={styles.btnEdit}>Sửa</button>
                  <button style={styles.btnDelete}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  btnEdit: {
    marginRight: "8px",
    background: "#3498db",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  btnDelete: {
    background: "#e74c3c",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default UserManagement;
