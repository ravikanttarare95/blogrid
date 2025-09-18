import User from "./../models/User.js"; // import modelSchema

const postSignup = async (req, res) => {
  const { name, email, password } = req.body;

  const userData = new User({ name, email, password });

  const savedData = await userData.save();

  res.json({
    success: true,
    message: "User registered successfully",
    data: savedData,
  });
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;
};

export { postSignup, postLogin };
