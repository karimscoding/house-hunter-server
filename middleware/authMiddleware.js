const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  //get the token from the req header
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Authorization token not found" });
  }

  try {
    // verify the token
    const decoded = jwt.verify(token, secretKey);

    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401), json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
