import { jwtDecode } from "jwt-decode";
const getCurrentUser = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  const token = localStorage.getItem("token");

  if (!loggedInUser || !token) return null;

  const decoded = jwtDecode(token);

  if (decoded?.exp < Date.now() / 1000) {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    return null;
  }
  return loggedInUser;
};

export { getCurrentUser };
