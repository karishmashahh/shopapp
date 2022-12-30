import express from "express";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "./verifyToken.js";
import User from "../models/User.js";
import Wishlist from "../models/Wishlist.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 12);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5) //return latest 5 users
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/wishlist", async (req, res) => {
  try {
    const products = await Wishlist.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/wishlist", async (req, res) => {
  const { userid, productid, check, img } = req.body;
  const newWishlist = new Wishlist({ userid, productid, check, img });
  try {
    const savedProduct = await newWishlist.save();
    res.status(201).json(savedProduct);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1)); //get prev year today
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } }, //match created at greater than last year
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 }, //sum every registered user
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
