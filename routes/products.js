const express = require('express'); 
const router = express.Router(); 
const app = express();
const products = require('../data/products'); 
const bodyParse = require('body-parser');
const reviews = require('../data/reviews');
const { error } = require('console');

app.set("View engine", "pug");
app.set("Views", "views"); 

app.use(bodyParse.urlencoded({extended: false})); 

router
    .route('/')
    .get((req, res, next) => {

        const links = [
            {
                href: "products/:id",
                rel:"products",
                type: "GET",
            }
        ];
        res.json({products, links});
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
        const links = [
            {
                href: `/${req.params.id}`,
                rel: "",
                type: "PATCH",
            },
            {
                href: `/${req.params.id}`,
                rel: "",
                type: "DELETE",
            }
        ]
        if (product) res.json({product, links});
        else next();
    })
        
router
    .route("/:id/reviews")
    .get((req, res, next) => {
        if (req.query.userId) {
            const userId = parseInt(req.query.userId); 
            const userReviews = reviews.filter((r) => r.id == userId); 
            if (isNaN(userId)) return next(error(400, "Invalid user ID"))
            res.json({userId: userId, reviews: userReviews})
        }

        const productId = parseInt(req.params.id); 
        const userReviews = reviews.filter((r) => r.id == productId); 
        res.json({productId: productId, reviews: userReviews}); 
    })

    
    
    
module.exports = router;