const express = require('express'); 
const router = express.Router();

const users = require('../data/users'); 
const reviews = require('../data/reviews');
const error = require('../utilities/error')

router
    .route("/")
    .get((req, res, next) => {
    const links = [
        {
            href: "users/:id",
            rel: "id", 
            type: "GET"
        }
    ];
    res.json({users, links});
    })
    .post((req, res, next) =>{
        if (req.body.name && req.body.username && req.body.email) {
            if (users.find((u) => u.username == req.body.username)) {
                next(error(409, "Username Already Taken"))
            }
            const user = {
                id: users[users.length - 1].id + 1,
                name: req.body.name,
                username: req.body.username,
                email: req.body.email
            };

            users.push(user);
            res.json(users[users.length -1]);
        } else next(error(400, "Insufficient Data"));
    });


router
    .route("/:id")
    .get((req, res, next) => { 
        const user = users.find((u) => u.id == req.params.id);

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
        ]; 

        if (user) res.json({user, links});
        else next();
})
.patch((req, res, next) => {
    const user = users.find((u, i) =>{
        if (u.id == req.params.id) {
            for (const key in req.body) {
                users[i][key] = req.body[key];
            }
            return true;
        }
    });
    if (user) res.json(user);
    else next();
})
.delete((req, res, next) => {
    const user = users.find((u, i) =>{
        if (u.id == req.params.id) {
            users.splice(i, 1);
            return true;
        }
    });

    if (user) res.json(user);
    else next();
})


router
    .route("/:id/reviews")
    .get((req, res, next) => {
        if (req.query.productId) {
            const productId = parseInt(req.query.productId, 10);
            const userReviews = reviews.filter((r) => r.userId == productId);

            res.json({productId: productId, reviews: userReviews}); 

            if (isNaN(productId)) return next((error(400, "Invalid product ID ")))
        }

        const id = parseInt(req.params.id, 10);
        const userReviews = reviews.filter((r) => r.id == id);
        res.json({userId: id, reviews: userReviews})
    })
    

module.exports = router; 