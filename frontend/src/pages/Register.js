import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:8081/api/auth/register", {
        username,
        email,
        password,
      });
      if (res.status = 201) {
        navigate("/login");
      }
      console.log("Server response raw:", res.data);
      console.log("Message field:", res.data.message);
    }
    catch (err) {
      console.error("❌ Error:", err);
      alert("Register failed!");


      //   } else {
      //     console.log(res.data.message);
      //     alert("Đăng ký thất bại!");
      //   }
      // } catch (err) {
      //   console.error("❌ Error:", err);
      //   alert("Register failed!");
      // }
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="email"
        placeholder="emil"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}


export default Register;
