This is a products review application. It uses 3 (mock) APIs products, reviews, & users. 
Also, uses Pug as template engine to view and review the products.

### Routes: 
[GET api/users/:id/reviews]() <br/>
Retrives all reviews written by the user with the specified ID. <br/>
[GET /api/users/:id/reviews]() <br/>
Retrieves all reviews written by the user with the specified id. <br/>
[GET /api/users/:id/reviews?productId=<VALUE>]()<br/>
Retrieves all reviews written by the user with the specified id for a specific product.<br/>
#### __Products__ <br/>
[GET /api/products/:id/reviews]<br/>
Retrieves all reviews for the product with the specified id.<br/>
GET /api/products/:id/reviews?userId=<VALUE><br/>
Retrieves all reviews for the product with the specified id written by a specific user.<br/>
[GET /api/products/:id]()<br/>
Retrieves detailed information about the product with the specified id.<br/>
http://localhost:3000/api/products/1<br>
POST /api/products<br/>
Creates a new product with fields:<br/>
    name, <br/>
    category, <br/>
    price, <br/>
    description.<br/>
### __Reviews__ <br/>
GET /api/reviews<br/>
Retrieves all reviews. You can filter using query parameters:<br/>
http://localhost:3000/api/reviews/ <br/>
GET /api/reviews?userId=<VALUE>: <br/>
Retrieve all reviews written by the user with the specified id.<br/>
GET /api/reviews?productId=<VALUE>: <br/>
Retrieve all reviews for the product with the specified id.<br/>
POST /api/reviews <br/>
Creates a new review. Fields: <br/>
    id: A unique identifier for the review.<br/>
    userId: The id of the user writing the review.<br/>
    productId: The id of the product being reviewed.<br/>
    rating: A numeric rating (e.g., 1–5).<br/>
    comment: The review's text.<br/>
    date: Date of the review.<br/>
GET /api/reviews/:id<br/>
Retrieves the review with the specified id.<br/>
PATCH /api/reviews/:id<br/>
Updates the review with the specified id. Fields to update can include rating or comment.<br/>
DELETE /api/reviews/:id<br/>
Deletes the review with the specified id.<br/>
GET /api/products/:id/reviews?userId=<VALUE><br/>
Retrieves all reviews for the product with the specified id written by a specific user.<br/>
GET /api/users/:id/reviews?productId=<VALUE><br/>
Retrieves all reviews written by the user with the specified id for a specific product.<br/>


## Requirements:
