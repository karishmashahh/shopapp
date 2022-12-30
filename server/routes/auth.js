import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;
  const hashedPassord = await bcrypt.hash(req.body.password, 12);
  const newUser = new User({
    firstname,
    lastname,
    username,
    email,
    password: hashedPassord,
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return res.status(404).json({ message: "User does not exist" });

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return res.status(404).json({ message: "Invalid credentials" });

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      "test", //secret key
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (e) {
    res.status(500).json(e);
  }
});

export default router;
