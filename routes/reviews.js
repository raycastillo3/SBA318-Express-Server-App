const express = require('express'); 
const router = express.Router(); 

const reviews = require('../data/reviews'); 

router
    .route('/')
    .get((req, res, next) => { 
    const links = [
        {
            href: "reviews/:id",
            rel: "id",
            type: "GET"
        }
    ];
    res.json({reviews, links})
    })

router
    .route("/:id")
    .get((req, res, next) => {
        const review = reviews.find((r) => r.id == req.params.id); 
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
        if (review) res.json({review, links});
        else next(); 
    })
module.exports = router