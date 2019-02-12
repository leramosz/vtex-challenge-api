const User = require('../models/user.model.js');
const Movie = require('../models/movie.model.js');
const mongoose = require('mongoose'), 
	  Schema = mongoose.Schema;

const ReviewSchema = mongoose.Schema({
    title: String,
    review: String,
    rating: Number,
    user : { type: Schema.Types.ObjectId, ref: 'User' },
    movie : { type: Schema.Types.ObjectId, ref: 'Movie' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Review', ReviewSchema);	
