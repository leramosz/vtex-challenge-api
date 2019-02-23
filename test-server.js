const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// create express app
const app = express();

// use cors
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/db.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.set('useCreateIndex', true)
mongoose.connect(dbConfig.testUrl, {useNewUrlParser: true});

require('./app/routes/category.routes.js')(app);
require('./app/routes/movie.routes.js')(app);

// listen for requests
module.exports = app.listen(3000);