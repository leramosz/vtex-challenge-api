module.exports = (app) => {

    const review = require('../controllers/review.controller.js');
    const user = require('../controllers/user.controller.js');

    app.get('/reviews', user.verifyAccess, review.findAll);

}