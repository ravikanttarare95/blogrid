import React, { useEffect, useState } from "react";
import { getCurrentUser } from "./../utils.js";

function AllBlogs() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(getCurrentUser());
  }, []);
  return (
    <div>
      <h1>AllBlogs</h1>{" "}
      <p>{user ? `Hello! ${user.name} 👋🏻` : "Welcome Guest!"}</p>
    </div>
  );
}

export default AllBlogs;
