import User from "./../models/User.js";
import Blog from "./../models/Blog.js";
import md5 from "md5";
import jwt from "jsonwebtoken"; // Used in Login
import { clearCache } from "./../utils/cache.js";

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
    return res.status(409).json({
      // HTTP status code 409: Conflict
      success: false,
      message: `User with email ${email} already exists`,
    });
  }

  const nameRegexPattern = /^[A-Za-z\s]{2,30}$/;
  const emailRegexPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegexPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (nameRegexPattern.test(name) === false) {
    return res.status(400).json({
      success: false,
      message:
        "Name must be 2-30 characters long and contain only letters and spaces",
    });
  }

  if (emailRegexPattern.test(email) === false) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email address.",
    });
  }

  if (passwordRegexPattern.test(password) === false) {
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
    }).select("_id name email"); //---IMPORTANT: Use Carefully: May Leak user's secrete detail like (passwword)---//

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

const postFavouritesById = async (req, res) => {
  const { user } = req;
  const { blogId } = req.params;

  const author = await User.findById(user.id);
  const alreadyFavourite = author.favourites.includes(blogId);
  if (alreadyFavourite) {
    author.favourites = author.favourites.filter(
      (blog_id) => blog_id.toString() !== blogId
    );
  } else {
    author.favourites.push(blogId);
  }
  await author.save();

  // await clearCache()
  res.json({
    blogId,
    user,
  });
};

const getFavourites = async (req, res) => {
  try {
    const { user } = req;
    // Deep populate
    const Curentuser = await User.findById(user.id).populate({
      path: "favourites",
      populate: { path: "author", select: "name email avatar" },
    });

    if (Curentuser) {
      res.json({ success: true, favouriteBlogs: Curentuser.favourites });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch favourites.",
      error: error.message,
    });
  }
};
export { postSignup, postLogin, postFavouritesById, getFavourites };
