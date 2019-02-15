const Movie = require('../models/movie.model.js');
const Review = require('../controllers/review.controller.js');
const User = require('../controllers/user.controller.js');

// Create and save a new movie
exports.create = (req, res) => {
    // Validate request
    if(!req.body.description) {
        return res.status(400).send({
            message: "Movie description can not be empty"
        });
    }

    // Create a movie
    const movie = new Movie({
        title: req.body.title || "Untitled movie", 
        description: req.body.description,
        year: req.body.year,
        duration: req.body.duration,
        trailer: req.body.trailer,
        image: req.body.image,
        rating: req.body.rating,
        category: req.body.category
    });

    // Save movie in the database
    movie.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the movie."
        });
    });
};

// Retrieve and return all movies from the database.
exports.findAll = (req, res) => {
    Movie.find()
    .then(movies => {
        res.send(movies);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving movies."
        });
    });
};

// Find a single movie with a movieId
exports.findOne = (req, res) => {
    Movie.findById(req.params.movieId)
    .populate({ path: 'category', select: '_id title' })  
    .then(movie => {
        if(!movie) {
            return res.status(404).send({
                message: "Movie not found with id " + req.params.movieId
            });            
        }
        res.send(movie);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Movie not found with id " + req.params.movieId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving movie with id " + req.params.movieId
        });
    });
};

// Update a movie identified by the movieId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.description) {
        return res.status(400).send({
            message: "Movie description can not be empty"
        });
    }

    // Find movie and update it with the request body
    Movie.findByIdAndUpdate(req.params.movieId, {
        title: req.body.title || "Untitled movie", 
        description: req.body.description,
        year: req.body.year,
        duration: req.body.duration,
        trailer: req.body.trailer,
        image: req.body.image,
        rating: req.body.rating,
        reviews: req.body.reviews
    }, {new: true})
    .then(movie => {
        if(!movie) {
            return res.status(404).send({
                message: "Movie not found with id " + req.params.movieId
            });
        }
        res.send(movie);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Movie not found with id " + req.params.movieId
            });                
        }
        return res.status(500).send({
            message: "Error updating movie with id " + req.params.movieId
        });
    });
};

// Delete a movie with the specified movieId in the request
exports.delete = (req, res) => {
    Movie.findByIdAndRemove(req.params.movieId)
    .then(movie => {
        if(!movie) {
            return res.status(404).send({
                message: "Movie not found with id " + req.params.movieId
            });
        }
        res.send({message: "Movie deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Movie not found with id " + req.params.movieId
            });                
        }
        return res.status(500).send({
            message: "Could not delete movie with id " + req.params.movieId
        });
    });
};

// Add a review to a movie
exports.addReview = (req, res) => {

    Movie.findById(req.params.movieId)
    .then(movie => {
        if(!movie) {
            return res.status(404).send({
                message: "Movie not found with id " + req.params.movieId
            });
        }
        Review.create(req).then(review => {
            Movie.findByIdAndUpdate(req.params.movieId, { $push: { reviews: review._id } }, { new: true })
            .then(movie => {
               if(!movie) {
                    console.log("Movie not found with id " + req.params.movieId);
                }
                console.log("movie updated");
            }).catch(err => {
               if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                    console.log("Movie not found with id " + req.params.movieId);
                }              
                console.log("Could not delete movie with id " + req.params.movieId);
            });
            User.addReview(req.body.user, review._id);
            res.send(review);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Movie not found with id " + req.params.movieId
            });               
        }
        return res.status(500).send({
            message: err.message || "Some error occurred"
        });
    });

};

// Delete a review from a movie
exports.deleteReview = (req, res) => {

    Movie.findById(req.params.movieId)
    .then(movie => {
        if(!movie) {
            return res.status(404).send({
                message: "Movie not found with id " + req.params.movieId
            });
        }
        Review.delete(req.params.reviewId, req.params.movieId)
        .then(result => {
            if(result.n == 0) {
                return res.status(404).send({
                    message: "Could not delete the review"
                });
            }
            Movie.findByIdAndUpdate(req.params.movieId, { $pull: { reviews: req.params.reviewId } }, { new: true })
            .then(movie => {
               if(!movie) {
                    console.log("Movie not found with id " + req.params.movieId);
                    return;
                }
                console.log("movie updated");
            }).catch(err => {
               if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                    console.log("Movie not found with id " + req.params.movieId);
                    return;
                }              
                console.log("Could not delete movie with id " + req.params.movieId);
                return;
            });
            User.deleteReview(req.body.user, req.params.reviewId);
            res.send({message: "Review deleted successfully!"});
        }).catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Could not delete the review"
                });                
            }
            return res.status(500).send({
                message: "Could not delete the review"
            });
        });
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Movie not found with id " + req.params.movieId
            });               
        }
        return res.status(500).send({
            message: err.message || "Some error occurred"
        });
    });
    
};
