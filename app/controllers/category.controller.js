const Category = require('../models/category.model.js');

// Create and save a new category
exports.create = (req, res) => {
    // Validate request
    if(!req.body.description) {
        return res.status(400).send({
            message: "Category description can not be empty"
        });
    }

    // Create a category
    const category = new Category({
        title: req.body.title || "Untitled category", 
        description: req.body.description
    });

    // Save category in the database
    category.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the category."
        });
    });
};

// Retrieve and return all categories from the database.
exports.findAll = (req, res) => {
    Category.find()
    .then(Categories => {
        res.send(Categories);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving categories."
        });
    });
};

// Find a single category with a categoryId
exports.findOne = (req, res) => {
    Category.findById(req.params.categoryId)
    .then(category => {
        if(!category) {
            return res.status(404).send({
                message: "Category not found with id " + req.params.categoryId
            });            
        }
        res.send(category);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Category not found with id " + req.params.categoryId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving category with id " + req.params.categoryId
        });
    });
};

// Update a category identified by the categoryId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.description) {
        return res.status(400).send({
            message: "Category description can not be empty"
        });
    }

    // Find category and update it with the request body
    Category.findByIdAndUpdate(req.params.categoryId, {
        title: req.body.title || "Untitled Category",
        content: req.body.description
    }, {new: true})
    .then(category => {
        if(!category) {
            return res.status(404).send({
                message: "Category not found with id " + req.params.categoryId
            });
        }
        res.send(category);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Category not found with id " + req.params.categoryId
            });                
        }
        return res.status(500).send({
            message: "Error updating category with id " + req.params.categoryId
        });
    });
};

// Delete a category with the specified categoryId in the request
exports.delete = (req, res) => {
    Category.findByIdAndRemove(req.params.categoryId)
    .then(category => {
        if(!category) {
            return res.status(404).send({
                message: "Category not found with id " + req.params.categoryId
            });
        }
        res.send({message: "Category deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Category not found with id " + req.params.categoryId
            });                
        }
        return res.status(500).send({
            message: "Could not delete category with id " + req.params.categoryId
        });
    });
};