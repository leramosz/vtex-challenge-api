const Movie = require('../models/movie.model.js');
const mongoose = require('mongoose'), Schema = mongoose.Schema;

const CategorySchema = mongoose.Schema({
    title: String,
    description: String,
    movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema);	
