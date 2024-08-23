const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  taxApplicability: { type: Boolean },
  tax: { type: Number },
  baseAmount: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  totalAmount: { type: Number },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" },
});

itemSchema.pre("save", function (next) {
  this.totalAmount = this.baseAmount - this.discount;
  next();
});

module.exports = mongoose.model("Item", itemSchema);
