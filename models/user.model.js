const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["house owner", "house renter"],
      default: "house renter",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// signup
userSchema.statics.signup = async function (
  name,
  email,
  password,
  phone,
  role
) {
  if (!name || !email || !password || !phone || !role) {
    throw new Error("All field are required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }

  if ((!validator, isStrongPassword(password))) {
    throw new Error(
      "Password is not strong (must contain 8+ chars, uppercase, lowercase, number, and symbol"
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);

  const user = await this.create({
    fullName,
    email,
    password: hashPass,
    phoneNumber,
    role,
  });

  return user;
};

// login
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All field are required");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Incorrect email and password ");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Incorrect email and password ");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
