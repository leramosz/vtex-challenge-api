const User = require('../models/user.model.js');

// Create and save a new user
exports.create = (req, res) => {
    // Create a user
    const user = new User({
        firstName: req.body.firstName, 
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    });

    // Save user in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user."
        });
    });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    User.find()
    .then(user => {
        res.send(user);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};

// Add favorite movie to user
exports.addFavorite = (req, res) => {
    User.findByIdAndUpdate( 
        req.params.userId,
        { $push: { favorites: req.body.movie } },
        { new: true }  
    ).then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};

// Delete favorite from an user
exports.deleteFavorite = (req, res) => {
    User.findByIdAndUpdate( 
        req.params.userId,
        { $pull: { favorites: req.params.movieId } },
        { new: true } 
    ).then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};

// List favorites from an user
exports.listFavorites = (req, res) => {
    User.findById(req.params.userId)
    .populate({ path: 'favorites', select: '_id title year image rating' })
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }
        res.send(user.favorites);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};

// Add review to user
exports.addReview = (userId, reviewId) => {
    User.findByIdAndUpdate(userId, { $push: { reviews: reviewId } }, { new: true })
    .then(user => {
       if(!user) {
            console.log("User not found with id " + userId);
            return;
        }
        console.log("user updated");
        return;
    }).catch(err => {
       if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            console.log("User not found with id " + userId);
            return;
        }              
        console.log("Could not delete user with id " + userId);
        return;
    });
};

// Delete review from user
exports.deleteReview = (userId, reviewId) => {
    User.findByIdAndUpdate(userId, { $pull: { reviews: reviewId } }, { new: true })
    .then(user => {
       if(!user) {
            console.log("User not found with id " + userId);
            return;
        }
        console.log("user updated");
    }).catch(err => {
       if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            console.log("User not found with id " + userId);
            return;
        }              
        console.log("Could not delete user with id " + userId);
        return;
    });
};