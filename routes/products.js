const express = require('express'); 
const router = express.Router(); 

const products = require('../data/products'); 

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

module.exports = router;