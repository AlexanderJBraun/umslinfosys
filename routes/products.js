const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Product = require('../models/product');
const mongojs = require('mongojs');
const db = mongojs('mongodb://localhost:27017/liquidNitro');


router.get('/products', function(req, res, next){
  
  db.products.find(function(err, products)
  {
    if(err){
      res.send(err);
    }
    res.json(products);
  });
});
/*
// add product
router.post('/newProduct', (req, res, next) => {
  let newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    inStock: req.body.inStock
  });

  Product.addProduct(newProduct, (err, product) => {
    if(err){
      res.json({success: false, msg:'Failed to add product'});
    } else {
      res.json({success: true, msg:'Product Added'});
    }
  });
});
*/


// Get Single product
router.get('/product/:id', function(req, res, next){
    db.products.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, product){
        if(err){
            res.send(err);
        }
        res.json(product);
    });
});

//remove product
router.delete('/product/:id', function(req, res, next){
    db.products.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, product){
        if(err){
            res.send(err);
        }
        res.json(product);
    });
});

module.exports = router;
