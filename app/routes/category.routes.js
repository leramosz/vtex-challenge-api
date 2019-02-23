module.exports = (app) => {
    const category = require('../controllers/category.controller.js');
    const user = require('../controllers/user.controller.js');

    // Create a new category
    app.post('/categories', user.verifyAccess, category.create);

    // Retrieve all categories
    app.get('/categories', user.verifyAccess, category.findAll);

    // Retrieve a single category with categoryId
    app.get('/categories/:categoryId', user.verifyAccess, category.findOne);

    // Update a category with categoryId
    app.put('/categories/:categoryId', user.verifyAccess, category.update);

    // Delete a category with categoryId
    app.delete('/categories/:categoryId', user.verifyAccess, category.delete);

    // Add movie to category
    app.post('/categories/:categoryId/movies', user.verifyAccess, category.addMovie);

    // Delete movie from category
    app.delete('/categories/:categoryId/movies/:movieId', user.verifyAccess, category.deleteMovie);
}