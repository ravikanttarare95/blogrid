import User from "./../models/User.js"; // import modelSchema

const postSignup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Name is required" });
  }
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ success: false, message: "Password is required" });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(409).json({
      success: false,
      message: `User with email ${email} already exists`,
    });
  }

  const nameRegexTest = /^[A-Za-z\s]{2,30}$/;
  const emailRegexTest = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegexTest =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (nameRegexTest.test(name) === false) {
    return res.status(400).json({
      success: false,
      message:
        "Name must be 2-30 characters long and contain only letters and spaces",
    });
  }

  if (emailRegexTest.test(email) === false) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email address.",
    });
  }

  if (passwordRegexTest.test(password) === false) {
    return res.status(400).json({
      success: false,
      message:
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    });
  }

  const userData = new User({ name, email, password });

  const savedData = await userData.save();

  res.json({
    success: true,
    message: "User registered successfully",
    data: savedData,
  });
};

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email or password is incorrect.",
      });
    }
    res.json({
      success: true,
      message: "Login successful.",
      data: user,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};

export { postSignup, postLogin };
