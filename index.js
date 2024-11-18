const express = require('express'); 
const bodyParser = require('body-parser'); 
const app = express();
const port = 3000;

// ROUTES
const users = require('./routes/users');
const reviews = require('./routes/reviews');
const products = require('./routes/products');
const error = require('./utilities/error');

//Parsing Middleware:
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));

// Logging Middleware:
app.use((req, res, next) =>{
    const time = new Date();

    console.log(  `-----
${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
  ); 
  if (Object.keys(req.body).length > 0){
    console.log("Containing the data:");
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});

//Our routes:
app.use("/api/users", users);
app.use("/api/reviews", reviews);
app.use("/api/products", products);

//Adding HATEOAS links
app.get("/", (req, res) =>{
    res.json({
        links: [
            {
                href: "/api",
                rel: "api",
                type: "GET",
            },
        ],
    });
});

//HATEOAS
app.get("/api", (req, res) =>{
    res.json({
        links:[
            {
                href: "api/users",
                rel: "users",
                type: "GET",
            },
            {
                href: "api/users",
                rel: "users",
                type: "POST"
            },
            {
                href: "api/products",
                rel: "products",
                type: "GET"
            },
            {
                href: "api/products",
                rel: "products",
                type: "POST"
            },
            {
                href: "api/reviews",
                rel: "reviews",
                type: "GET"
            },
            {
                href: "api/reviews",
                rel: "reviews",
                type: "POST"
            },
        ]
    })
}); 

// 404 Middleware
app.use((req, res, next) => {
    next(error(404, "Resource Not Found"))
});

app.use((err, req, res, next) =>{
    res.status(err.status || 500);
    res.json({error : err.message});
});

app.listen(port, ()=> {
    console.log(`Server listening on port: ${port}.`);
})
