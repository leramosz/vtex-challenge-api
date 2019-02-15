module.exports = (app) => {
    const user = require('../controllers/user.controller.js');

    // Create a new user
    app.post('/users', user.create);

    // User login
    app.post('/users/login', user.login);

    // Retrieve all users
    app.get('/users', user.verifyAccess, user.findAll);

    // Retrieve me
    app.get('/users/me', user.verifyAccess, user.me);

    // Retrieve a single user with userId
    app.get('/users/:userId', user.verifyAccess, user.findOne);

    // Add favorite movie to user
    app.post('/users/favorites/movies', user.verifyAccess, user.addFavorite);

    // Delete favorite from an user
    app.delete('/users/favorites/movies/:movieId', user.verifyAccess, user.deleteFavorite);

    // List favorites from an user
    app.get('/users/favorites/movies', user.verifyAccess, user.listFavorites);

}