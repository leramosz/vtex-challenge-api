const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    title: String,
    description: String,
    year: Number,
    duration: Number,
    trailer: String,
    image: String,
    rating: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Movie', MovieSchema);	
