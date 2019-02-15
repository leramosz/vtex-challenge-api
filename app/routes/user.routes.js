module.exports = (app) => {
    const user = require('../controllers/user.controller.js');

    // Create a new movie
    app.post('/users', user.create);

    // Retrieve all user
    app.get('/users', user.findAll);

    // Retrieve a single user with userId
    app.get('/users/:userId', user.findOne);

    // Add favorite movie to user
    app.post('/users/:userId/favorites/movies', user.addFavorite);

    // Delete favorite from an user
    app.delete('/users/:userId/favorites/movies/:movieId', user.deleteFavorite);

    // List favorites from an user
    app.get('/users/:userId/favorites/movies', user.listFavorites);

    // User login
    app.post('/users/auth', user.auth);

}