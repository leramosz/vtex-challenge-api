module.exports = (app) => {

    const review = require('../controllers/review.controller.js');

    app.get('/reviews', review.findAll);

}