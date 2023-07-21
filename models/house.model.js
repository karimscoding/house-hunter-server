const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    roomSize: {
      type: Number,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    availabilityDate: {
      type: Date,
      required: true,
    },
    rentPerMonth: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          // Regex to validate Bangladeshi phone number format (e.g., +8801XXXXXXXXX)
          return /^(8801)[0-9]{8,10}$/.test(value);
        },
        message: "Please provide a valid Bangladeshi phone number",
      },
    },
  },
  { timeTamps: true }
);

const House = mongoose.model("House", houseSchema);

module.exports = House;
