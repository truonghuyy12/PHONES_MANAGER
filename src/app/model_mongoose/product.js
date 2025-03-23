const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  product_name: String,
  series: String,
  inventory_quantity: Number,
  link_product: String,
  barcode: String,
  import_price: String,
  retail_price: String,
  createdAt:{type: Date,default: Date.now},
  colors: String,
  link_image: String,
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;
