const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// mongodb://localhost:27017/
const PORT = 5000;

// Connecting to database...
mongoose
  .connect("mongodb://127.0.0.1:27017/userRegistrationData")
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.error("Database connection failed", err));

//Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Defining Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
});

// Defining models

const user = new mongoose.model("user", userSchema);

// Post routes
app.post("/", async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const newUser = new user({
      name,
      email,
      phone,
      address,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({
      error: "internal server erro",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
