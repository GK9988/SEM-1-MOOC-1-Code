const Mongoose = require("mongoose");
require("mongoose-currency").loadType(Mongoose);

const Currency = Mongoose.Types.Currency;

const Schema = Mongoose.Schema;

const promotionSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  price: {
    type: Currency,
    required: true,
    min: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    required: true,
  },
});

const Promotions = Mongoose.model("Promotion", promotionSchema);

module.exports = Promotions;
