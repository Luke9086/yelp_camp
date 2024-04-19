const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const Review = require('../models/review');
const {validateReview,isLoggedIn, isReviewAuthor} = require('../middleware');
const reviews = require('../controllers/reviews');

router.get('/',(req,res)=>{
    const {id} =req.params;
    res.redirect(`/campgrounds/${id}`);
})
router.post('/',validateReview,isLoggedIn ,catchAsync(reviews.createReviews));
router.delete('/:reviewId',isLoggedIn,isReviewAuthor,catchAsync(reviews.deleteReviews));

module.exports = router;