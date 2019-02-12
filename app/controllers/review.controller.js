const Review = require('../models/review.model.js');
const movie = require('../controllers/movie.controller.js');
const user = require('../controllers/user.controller.js');

// Create and save a new review
exports.create = (req, res) => {
    
    // Create a review
    const review = new Review({
        title: req.body.title, 
        review: req.body.review,
        rating: req.body.rating,
        user: req.body.user,
        movie: req.body.movie
    });

    // Save review in the database
    review.save()
    .then(review => {
        movie.addReview(review.movie, review._id);
        user.addReview(review.user, review._id);
        res.send(review);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the review."
        });
    });
};

// Find a single review with a reviewId
exports.findOne = (req, res) => {
    Review.findById(req.params.reviewId)
    .then(review => {
        if(!review) {
            return res.status(404).send({
                message: "Review not found with id " + req.params.reviewId
            });            
        }
        res.send(review);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Review not found with id " + req.params.reviewId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving review with id " + req.params.reviewId
        });
    });
};

// Delete a review with the specified reviewId in the request
exports.delete = (req, res) => {
    Review.findByIdAndRemove(req.params.reviewId)
    .then(review => {
        if(!review) {
            return res.status(404).send({
                message: "Review not found with id " + req.params.reviewId
            });
        }
        res.send({message: "Review deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Review not found with id " + req.params.reviewId
            });                
        }
        return res.status(500).send({
            message: "Could not delete review with id " + req.params.reviewId
        });
    });
};