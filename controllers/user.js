const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.signup = async (req, res, next) => {
  try {
    //   use bcrypt to hash the users password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    if (savedUser) {
      res.status(201).json({
        message: "User added successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
      return res.status(401).json({ error: "User not found" });
    }

    try {
      // compare using bcrypt
      const valid = await bcrypt.compare(
        req.body.password,
        existingUser.password
      ); //returns a boolean
      if (!valid) {
        return res.status(401).json({ error: "Invalid password" });
      }
      //   else
      // create jwt token
      const token = jwt.sign(
        { userId: existingUser._id },
        "RANDOM_TOKEN_SECRET",
        {
          expiresIn: "24h",
        }
      );
      //   console.log(token);
      res.status(200).json({
        userId: existingUser._id,
        token,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
