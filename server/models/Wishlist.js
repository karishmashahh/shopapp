import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  productid: { type: String, required: true },
  check: { type: String, required: true, unique: true },
  img: { type: String, required: true },
});
export default mongoose.model("Wishlist", WishlistSchema);
