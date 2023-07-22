const express = require("express");
const router = express.Router();

const {
  createBooking,
  getUserBookings,
  deleteUserBooking
} = require("../controllers/booking.controller");
const verifyToken = require("../middleware/verifyToken");

router.post("/bookings", createBooking);

// Get users bookings
router.get("/bookings", verifyToken, getUserBookings);

// delete user bookings
router.delete("/bookings/:id", verifyToken, deleteUserBooking);

module.exports = router;
