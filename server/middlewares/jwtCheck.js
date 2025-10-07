const jwtCheck = (req, res, next) => {
  req.user = null; /////why null
  const { authorization } = req.headers; // Authorization: Bearer token

  if (!authorization) {
    res.json({
      success: false,
      message: "Authorization token missing",
    });
  }

  try {
    const token = authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decode;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid JWT Token" });
  }
};

export default jwtCheck;
