const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const authenticateUser = req.header("Authorization");

  if (!authenticateUser) {
    return res.status(401).json({ message: "Access Denied. No Token Provided." });
  }

  const token = authenticateUser.split(" ")[1]; // Extract token after 'Bearer'

  if (!token) {
    return res.status(401).json({ message: "Invalid Token Format" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};