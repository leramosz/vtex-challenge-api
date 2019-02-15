module.exports = (app) => {

    const movie = require('../controllers/movie.controller.js');
    const user = require('../controllers/user.controller.js');

    // Create a new movie
    app.post('/movies', user.verifyAccess, movie.create);

    // Retrieve all movies
    app.get('/movies', user.verifyAccess, movie.findAll);

    // Retrieve a single movie with movieId
    app.get('/movies/:movieId', user.verifyAccess, movie.findOne);

    // Update a movie with movieId
    app.put('/movies/:movieId', user.verifyAccess, movie.update);

    // Delete a movie with movieId
    app.delete('/movies/:movieId', user.verifyAccess, movie.delete);

    // Add review to movie
    app.post('/movies/:movieId/reviews', user.verifyAccess, movie.addReview);

    // Delete review from movie
    app.delete('/movies/:movieId/reviews/:reviewId', user.verifyAccess, movie.deleteReview);

}