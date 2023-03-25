import express from "express";
const router = express.Router();
import Stripe from "stripe";

const stripe = Stripe(
  "sk_test_51MVesLSHa8vEWjUBDd1F6X94AjWTFuvji9BcPPagm4uYgxBuWUlONVK86uBIlT1Pi8bSARc5DZ747x0TDM0PPSuw00oMMwuSdO"
);

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(res);
      }
    }
  );
});

router.post("/create-checkout-session", async (req, res) => {
  const line_items = req.body.products.map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.title,
          //images: [item.img],
          description: item.desc,
        },
        unit_amount: item.price * 100,
      },
      quantity: 1,
    };
  });

  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: { allowed_countries: ["IN"] },
    line_items,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.send({ url: session.url });
});

export default router;
