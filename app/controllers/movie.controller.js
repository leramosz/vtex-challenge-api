const Movie = require('../models/movie.model.js');

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
        rating: req.body.rating
    });

    // Save movie in the database
    movie.save()
    .then(movie => {
        res.send(movie);
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
        rating: req.body.rating
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


