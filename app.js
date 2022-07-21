const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const sauceRoutes = require("./routes/sauce");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");

const dotenv = require("dotenv");

dotenv.config();

const app = express();

const connectToMongo = async () => {
  try {
    const mongoconnection = await mongoose.connect(process.env.MONGO_URI);

    if (mongoconnection) {
      console.log("Successfuly connected to MongoDB Atlas!");
    }
  } catch (error) {
    console.log("Failed to connect to MongoDB Atlas");
    console.error(error);
  }
};
connectToMongo();

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauceRoutes);

module.exports = app;
