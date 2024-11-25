This is a products review application. It uses 3 (mock) APIs products, reviews, & users. 
Also, uses Pug as template engine to view and review the products. This app allows users
to view a product and add reviews.

### Routes: 
[GET api/users/:id/reviews]() <br/>
Retrives all reviews written by the user with the specified ID. <br/>
[GET /api/users/:id/reviews]() <br/>
Retrieves all reviews written by the user with the specified id. <br/>
[GET /api/users/:id/reviews?productId=<VALUE>]() <br/>
Retrieves all reviews written by the user with the specified id for a specific product.<br/>
### __Reviews__ <br/>
Creates a new review. Fields: <br/>
    id: A unique identifier for the review.<br/>
    userId: The id of the user writing the review.<br/>
    productId: The id of the product being reviewed.<br/>
    rating: A numeric rating (e.g., 1–5).<br/>
    comment: The review's text.<br/>
    date: Date of the review.<br/>

