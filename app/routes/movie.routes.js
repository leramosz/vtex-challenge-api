module.exports = (app) => {

    const movie = require('../controllers/movie.controller.js');

    // Create a new movie
    app.post('/movies', movie.create);

    // Retrieve all movies
    app.get('/movies', movie.findAll);

    // Retrieve a single movie with movieId
    app.get('/movies/:movieId', movie.findOne);

    // Update a movie with movieId
    app.put('/movies/:movieId', movie.update);

    // Delete a movie with movieId
    app.delete('/movies/:movieId', movie.delete);

}