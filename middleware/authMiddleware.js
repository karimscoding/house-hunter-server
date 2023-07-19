const jwt = require("jsonwebtoken");
// const secretKey = process.env.JWT_SECRET;
const { secretKey } = require('./../config');

console.log(secretKey)

const authMiddleware = (req, res, next) => {
  // Get the token from the req header
  const token = req.header("Authorization");
  console.log("Token header:", token);

  if (!token) {
    console.log("❌Authorization token not found"); // Add this console log to check if the middleware is being reached

    return res.status(401).json({ message: "Authorization token not found" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, secretKey);
    console.log("Decoded token", decoded)

    req.userId = decoded.userId;
    req.role = decoded.role; // Set the role in the request for later use

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
