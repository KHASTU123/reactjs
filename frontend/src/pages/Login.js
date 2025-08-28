// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login() {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post("http://localhost:8081/api/users/login", {
//                 username,
//                 password,
//             });
//             if (res.data.user) {
//                 console.log("Login success:", res.data);
//                 navigate("/user", { state: { user: res.data.user } });
//             } else {
//                 setError(res.data.message || "Login failed");
//             }
//         } catch (err) {
//             console.error(err);
//             setError(err.response?.data?.message || "Login failed");
//         }

//     };

//     return (
//         <div style={{ maxWidth: "400px", margin: "auto" }}>
//             <h2>Login</h2>
//             {error && <p style={{ color: "red" }}>{error}</p>}
//             <form onSubmit={handleLogin}>
//                 <div>
//                     <label>Username:</label>
//                     <input
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                     />
//                 </div>
//                 <div>
//                     <label>Password:</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </div>
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// }

// export default Login;


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios.js';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('auth/login', { email, password });
      console.log("Login response:", data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('username', data.username);

      if (data.role === 'admin') navigate('/admin/dashboard');
      else navigate("/user/dashboard");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

