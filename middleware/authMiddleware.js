const jwt = require("jsonwebtoken");
// const secretKey = process.env.JWT_SECRET;
const { secretKey } = require('./../config');

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  console.log("Token header:", token);

  if (!token) {
    console.log("❌Authorization token not found"); 

    return res.status(401).json({ message: "Authorization token not found" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    console.log("Decoded token", decoded)

    req.userId = decoded.userId;
    req.role = decoded.role;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
