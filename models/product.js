const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true

  },
  itemDescription: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  inStock: {
    type: Number,
    required: true
  }
});






module.exports.getProductById = function(id, callback){
  Product.findById(id, callback);
}

const Product = module.exports = mongoose.model('Product', ProductSchema);


module.exports.addProduct = function(newProduct, callback){

  newProduct.save(callback);

}

module.exports.getProductByProductname = function(name, callback){
  const query = {name: name}
  Product.find(query, callback);
}

