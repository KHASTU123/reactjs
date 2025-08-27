import React from "react";
import { useLocation } from "react-router-dom";

function User() {
  const location = useLocation();
  const user = location.state?.user;

  return (
    <div>
      <h2>Welcome {user?.username}</h2>
      <p>User ID: {user?._id}</p>
    </div>
  );
}

export default User;
