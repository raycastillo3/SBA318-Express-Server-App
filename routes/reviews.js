const express = require('express'); 
const router = express.Router(); 

const reviews = require('../data/reviews'); 
const error = require('../utilities/error');

router
    .route('/')
    .get((req, res, next) => { 
        let userReviews = reviews;
        if (req.query.userId) {
            const userId = parseInt(req.query.userId);
            userReviews = reviews.filter((r) => r.userId == userId);
        }
        if (req.query.productId) {
            const productId = parseInt(req.query.productId);
            userReviews = reviews.filter((r) => r.productId == productId);
        }
        res.render("reviews", {reviews: userReviews})
    })
    .post((req, res, next) => {
        if (req.body.userId && req.body.productId && req.body.rating && req.body.comment && req.body.date) {
            const newReview = {
                id: reviews[reviews.length - 1].id + 1,
                userId: req.body.userId,
                productId: req.body.productId,
                rating: req.body.rating,
                comment: req.body.comment,
                date: req.body.date
            }
            reviews.push(newReview);
            return res.json(reviews[reviews.length - 1])
        } else next(error(400, "Insufficient Data"))
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
    .patch((req, res, next) => {
        const review = reviews.find((c, i) => {
            if (c.id == req.params.id) {
                for (const key in req.body){
                    reviews[i][key] = req.body[key];
                }
                return true;
            } 
        });
        if (review) res.json(review);
        else next();
    })
    .delete((req, res, next) =>{
        const review = reviews.find((c, i) => {
            if (c.id == req.params.id) {
                reviews.splice(i, 1);
                return true;
            }
        });
        if (review) res.json(review); 
        else next();
    });
module.exports = router