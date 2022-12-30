import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  productid: { type: String, required: true },
  check: { type: String, required: true, unique: true },
});

export default mongoose.model("Cart", CartSchema);
