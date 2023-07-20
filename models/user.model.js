const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

// Signup
userSchema.statics.signup = async function (name, email, password, phone, role) {
  if (!name || !email || !password || !phone || !role) {
    throw new Error("All fields are required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password is not strong (must contain 6+ chars, uppercase, lowercase, number, and symbol)"
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);

  const user = await this.create({
    name,
    email,
    password: hashPass,
    phone,
    role,
  });
 // Generate JWT token
 const token = user.generateToken();
  return {user, token};
};


// Generate JWT token
userSchema.methods.generateToken = function () {
  const tokenPayload = {
    userId: this._id,
    role: this.role,
    name:this.name,
    email:this.email
  };

  const JWT_SECRET_KEY = process.env.JWT_SECRET; // Replace with your secret key for signing JWT tokens

  return jwt.sign(tokenPayload, JWT_SECRET_KEY, { expiresIn: "3h" });
};


// login
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields are required");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Incorrect email and password");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Incorrect email and password");
  }

  return user;
};


module.exports = mongoose.model("User", userSchema);
