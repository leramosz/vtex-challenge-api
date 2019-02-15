const Movie = require('../models/movie.model.js');
const Review = require('../models/review.model.js');
const jwt = require('jsonwebtoken');
const config = require('../../config/config.js');
const mongoose = require('mongoose'), 
	  Schema = mongoose.Schema,
	  bcrypt = require('bcrypt'),
      SALT_WORK_FACTOR = 10;

const UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],
    reviews : [{ type: Schema.Types.ObjectId, ref: 'Review' }]
}, {
    timestamps: true
});

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

UserSchema.statics.tokenCreate = function(userId) {
    return jwt.sign({ id: userId }, config.secret, { expiresIn: 900 }); 
}

UserSchema.statics.verifyToken = function(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ message: 'Not authorized' });
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
            return res.status(401).send({ message: 'Not authorized' });
        }
        req.userId = decoded.id;
        req.token = UserSchema.statics.tokenCreate(req.userId);
        next();
    });
}

module.exports = mongoose.model('User', UserSchema);	
