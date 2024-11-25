const express = require('express'); 
const router = express.Router(); 
const products = require('../data/products'); 
const reviews = require('../data/reviews');

const error = require('../utilities/error')

router
    .route('/')
    .get((req, res, next) => {
        res.render("index", {items: products})
    })
    .post((req, res, next) => {
        if (req.body.name && req.body.category && req.body.price && req.body.description && req.body.rating) {
            const newProduct = {
                id: products[products.length - 1].id + 1,
                name: req.body.name,
                category: req.body.category,
                price: req.body.price,
                description: req.body.description,
                rating: req.body.rating,
            }
            products.push(newProduct);
            res.json(products[products.length -1])
        } else next(error(400, "Insufficient Data"))
    })

router
    .route("/:id")
    .get((req, res, next) =>{
        const product = products.find((p) => p.id == req.params.id); 
        if (product) {
            res.render("product", {product})
        }
        else next();
    })


    

    
    
    
module.exports = router;