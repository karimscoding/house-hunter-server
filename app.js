require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");


const userRoutes = require("./routes/user.route")

// variables
const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_ATLAS_URL;

// express app
const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);

// test api
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is up and running" });
});

// bypassed api
app.use("/api/user", userRoutes)

// db
mongoose
  .connect(uri, {
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
