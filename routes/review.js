const express = require("express");
const router = express.Router({ mergeParams: true });              // merging parent route with child route
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");         // .. --> going to parent directory
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

const ReviewController = require("../controllers/reviews.js");


//REVIEWS
router.post("/",
    validateReview,
    isLoggedIn,
    wrapAsync(ReviewController.createReview)
);


//DELETE ROUTE for reviews
router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(ReviewController.destroyReview)
);

module.exports = router;