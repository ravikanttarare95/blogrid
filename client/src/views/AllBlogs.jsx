import React, { useEffect, useState } from "react";
import { getCurrentUser } from "./../utils.js";
import Navbar from "./../components/Navbar.jsx";
function AllBlogs() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(getCurrentUser());
  }, []);
  return (
    <div>
      <Navbar />
      <h1>AllBlogs</h1>{" "}
      <p>{user ? `Hello! ${user.name} 👋🏻` : "Welcome Guest!"}</p>
    </div>
  );
}

export default AllBlogs;
