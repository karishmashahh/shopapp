import express from "express";
const router = express.Router();
import Stripe from "stripe";

const stripe = Stripe(process.env.STRIPE_KEY);

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "inr",
    },
    (err, res) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(res);
      }
    }
  );
});

export default router;
