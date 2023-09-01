const express = require('express');
const {check, validationResult} = require("express-validator")
const router = express.Router();

const { getAllProducts, createProducts, updateProducts } = require("../services/products")

/* GET products listing. */
router.get('/', function(req, res, next) {
 const allProducts = getAllProducts()  
  res.send(allProducts);
});

router.post('/', [
  check("id").isNumeric(),
  check("name").isAlpha().isLength({min: 3}),
  check("description").isAlphanumeric().isLength({min: 3, max: 40})
],function(req, res, next) {
  const errors = validationResult(req.body)

  if(!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()})
  }
  const body = req.body
  const createResponse = createProducts(body)
  
  if (createResponse) {
    return res.send(createResponse)
  }
  res.send("Error")
 });

 router.patch('/', function(req, res, next) {
  const body = req.body
  const createResponse = updateProducts(body.id, body.name, body.description)
  
  if (createResponse) {
    return res.send("Update OK")
  }
  res.send("Error")
 });
 

module.exports = router;