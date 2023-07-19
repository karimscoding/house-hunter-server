const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const secretKey = process.env.JWT_SECRET;

// users registrations
router.post("/register", async (req, res) => {
  try {
    const { fullName, role, phoneNumber, email, password } = req.body;

    // check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // hashed the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user document
    const newUser = new User({
      fullName,
      role,
      phoneNumber,
      email,
      password: hashedPassword,
    });

    //  save the user to the database
    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// user login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email and password does not match" });
    }

    // compare the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password does not matched" });
    }

    // generate a JWT token
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
});

// logout user
router.post("/logout", (req, res) => {
  res.clearCookie("jwtToken").json({ message: "Logged out successfully" });
});


module.exports = router;
