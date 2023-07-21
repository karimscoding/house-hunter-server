const express = require("express");
const router = express.Router();

const {
  createBooking,
  getUserBookings,
} = require("../controllers/booking.controller");
const verifyToken = require("../middleware/verifyToken");

router.post("/bookings", createBooking);

// Get users bookings
router.get("/bookings", verifyToken, getUserBookings);

module.exports = router;
