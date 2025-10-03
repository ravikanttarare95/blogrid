import User from "./../models/User.js";
import md5 from "md5";
import jwt from "jsonwebtoken"; // Used in Login

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

  const userData = new User({ name, email, password: md5(password) }); // md5 Encryption important

  await userData.save(); // saving data to MongoDB

  res.json({
    success: true,
    message: "User registered successfully",
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

    const existingUser = await User.findOne({
      email,
      password: md5(password),
    }).select("_id name email"); //---IMPORTANT---//

    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "Email or password is incorrect.",
      });
    }

    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        name: existingUser.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      message: "Login successful.",
      user: existingUser,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};

export { postSignup, postLogin };
