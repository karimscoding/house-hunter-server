require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user.route");
const addHouseRoutes = require("./routes/add.house.route");
const getAllHouses = require("./routes/add.house.route");
const getHousesByOwner = require("./routes/add.house.route");
const getHouseById = require("./routes/add.house.route");
const updateHouseById = require("./routes/add.house.route");
const deleteHouseById = require("./routes/add.house.route");

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
app.use("/api/user", userRoutes);
app.use("/api/user", addHouseRoutes);
app.use("/api/user", getAllHouses);
app.use("/api/user", getHousesByOwner);
app.use("/api/user", getHouseById);
app.use("/api/user", updateHouseById);
app.use("/api/user", deleteHouseById);

// db
mongoose
  .connect(uri, {
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port: http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
