const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("loggedInUser")) || null;
};

export { getCurrentUser };
