const User = require('../models/user.model.js');

// Create and save a new user => not authentication required
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

// User login => not authentication required
exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if(!user) {
            return res.status(401).send({
                message: "Wrong user/password"
            });            
        }
        user.comparePassword(req.body.password, function(err, isMatch) {
            if (err) throw err;
            if (isMatch) {
                res.send({ 
                    firstName: user.firstName, 
                    lastName: user.lastName, 
                    email: user.email, 
                    token: User.tokenCreate(user._id)
                });
            }
            else {
                return res.status(401).send({
                    message: "Wrong user/password"
                });
            }  
        });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(401).send({
                message: "Wrong user/password"
            });                
        }
        return res.status(500).send({
            message: "Error loging in"
        });
    });
};

// Verify access through access token => not authentication required
exports.verifyAccess = (req, res, next) => {
    User.verifyToken(req, res, next); 
};


// Retrieve and return all users from the database => authentication required
exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send({ users: users, token:req.token });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single user with a userId => authentication required
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }
        res.send({ user: user, token: req.token });
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

// Find current user => authentication required
exports.me = (req, res) => {
    User.findById(req.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.userId
            });            
        }
        res.send({ me: user, token: req.token });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.userId
        });
    });
};

// Add favorite movie to user => authentication required
exports.addFavorite = (req, res) => {
    User.findByIdAndUpdate( 
        req.userId,
        { $push: { favorites: req.body.movie } },
        { new: true }  
    ).then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.userId
            });            
        }
        res.send({ user: user, token: req.token });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.userId
        });
    });
};

// Delete favorite from an user => authentication required
exports.deleteFavorite = (req, res) => {
    User.findByIdAndUpdate( 
        req.userId,
        { $pull: { favorites: req.params.movieId } },
        { new: true } 
    ).then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.userId
            });            
        }
        res.send({ user: user, token: req.token });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.userId
        });
    });
};

// List favorites from an user => authentication required
exports.listFavorites = (req, res) => {
    User.findById(req.userId)
    .populate({ path: 'favorites', select: '_id title year image rating' })
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.userId
            });            
        }
        res.send({ favorites: user.favorites, token: req.token });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.userId
        });
    });
};

// Add review to user => authentication is validated while creating rewiew
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

// Delete review from user => authentication is validated while creating rewiew
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




