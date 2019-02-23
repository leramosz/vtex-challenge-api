const Review = require('../models/review.model.js');
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const MovieSchema = mongoose.Schema({
    title: String,
    description: String,
    year: Number,
    duration: Number,
    trailer: String,
    image: String,
    rating: Number,
    reviews : [{ type: Schema.Types.ObjectId, ref: 'Review' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Movie', MovieSchema);	
