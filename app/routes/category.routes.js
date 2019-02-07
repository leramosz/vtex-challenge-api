module.exports = (app) => {
    const category = require('../controllers/category.controller.js');

    // Create a new category
    app.post('/categories', category.create);

    // Retrieve all categories
    app.get('/categories', category.findAll);

    // Retrieve a single category with categoryId
    app.get('/categories/:categoryId', category.findOne);

    // Update a category with categoryId
    app.put('/categories/:categoryId', category.update);

    // Delete a category with categoryId
    app.delete('/categories/:categoryId', category.delete);
}