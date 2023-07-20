const express = require("express");
const { createUser, loginUser, logoutUser } = require("../controllers/user.controller");

const router = express.Router();

// register
router.post("/auth/register", createUser);

// login
router.post("/auth/login", loginUser);

// logout
router.post("/auth/logout", logoutUser);

module.exports = router;
