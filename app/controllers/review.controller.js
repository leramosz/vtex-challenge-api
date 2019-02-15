const Review = require('../models/review.model.js');
const movie = require('../controllers/movie.controller.js');
const user = require('../controllers/user.controller.js');

// Create and save a new review => authentication validated while calling the addReview method in Movie
exports.create = (req) => {
    
    // Create a review
    const review = new Review({
        title: req.body.title, 
        review: req.body.review,
        rating: req.body.rating,
        user: req.body.user,
        movie: req.params.movieId
    });

    // Save review in the database
    return review.save();
};

// Delete a review with the specified reviewId in the request => authentication validated while calling the deleteReview method in Movie
exports.delete = (reviewId, movieId) => {
    return Review.remove({ $and: [ { _id: { $eq: reviewId } }, { movie: { $eq: movieId } } ] });
};

// Retrieve and return all reviews from the database
exports.findAll = (req, res) => {
    Review.find()
    .then(reviews => {
        res.send({ reviews: reviews, token: req.token});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving reviews."
        });
    });
};


