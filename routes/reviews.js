const express = require('express'); 
const router = express.Router(); 

const reviews = require('../data/reviews'); 
const error = require('../utilities/error');

router
  .route('/')
  .get((req, res, next) => {
    let productId = parseInt(req.query.productId, 10);
    if (!productId) return next(error(400, "Product ID is required"));
    const productReviews = reviews.filter((r) => r.productId == productId);
    res.render('reviews', { reviews: productReviews, productId });
  })
  router
  .route('/')
  .post((req, res, next) => {
    const { userId, productId, rating, comment, date } = req.body;
    if (!userId || !productId || !rating || !comment || !date) {
      return next(error(400, "All fields are required to add a review"));
    }

    const newReview = {
      id: reviews[reviews.length - 1]?.id + 1 || 1,
      userId: parseInt(userId),
      productId: parseInt(productId),
      rating: parseInt(rating),
      comment,
      date,
    };
    reviews.push(newReview);

    res.redirect(`/api/reviews?productId=${productId}`);
  });

router
.route('/:id')
.delete((req, res, next) => {
    const productId = parseInt(req.query.productId, 10);
    const reviewIndex = reviews.findIndex((r) => r.id == req.params.id && r.productId == productId);
  
    if (reviewIndex == -1) return next(error(404, 'Review not found'));
  
    reviews.splice(reviewIndex, 1); 
    // console.log(`Deleted review with ID: ${req.params.id} for product ID: ${productId}`);
    
    res.json({ success: true, message: 'Review deleted successfully' });
  })
  .patch( (req, res, next) => {
    const reviewIndex = reviews.findIndex((r) => r.id == req.params.id);
  
    if (reviewIndex == -1) return next(error(404, 'Review not found'));
  
    const updatedFields = req.body;
    const review = reviews[reviewIndex];
    
    for (const key in updatedFields) {
      if (review[key] !== undefined) {
        review[key] = updatedFields[key];
      }
    }
  
    res.json({ success: true, updatedReview: review });
  });
  

module.exports = router