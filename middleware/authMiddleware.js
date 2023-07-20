const jwt = require("jsonwebtoken");
const  SECRET_KEY  = process.env.JWT_SECRET

const authMiddleware = (req, res, next) => {
  // Get the token from the request header
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authorization token not found" });
  }

  try {
    // Verify the token and extract the user ID
    const decodedToken = jwt.verify(token, SECRET_KEY);
    req.userId = decodedToken.userId; 
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
