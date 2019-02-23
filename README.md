## VTEX Code Challenge - API Implementation

This API was built as part of the VTEX Code Challenge that was requested by the VTEX HR team during its recruiting process for 
a Technical Consultant position.

This API was built using the following technologies:

- Node.js
- Express.js
- MongoDB
- Mongoose

Automated tests were implementing using the following technologies:

- Mocha
- Chai

This repository contains two different versions of the same API. They were committed to different branches:

- master: it containts a simple API that implements a basic CRUD to manage information for movies and movie categories. The 
automated tests were created only for this version.

- auth/jwt: it containts a much elaborated API that, addionally to the CRUD for movies and movie categories, it implements user
management, adding/deleting favorite movies to/from an user and adding/deleting reviews to/from a movie. It also implements a 
JWT token based authentication/authorization.

### Master version

The available endpoints in this version are the following:

#### Categoy

- POST /categories => create a new category
- GET /categories => retrieve all categories
- GET /categories/{categoryId} => retrieve a category by ID
- PUT /categories/{categoryId} => update a category by ID
- DELETE /categories/{categoryId} => delete a category by ID
- POST /categories/{categoryId}/movies => add a movie to category by ID
- DELETE /categories/{categoryId}/movies/{movieId} => delete a movie from category by ID

The Schema for the category is the following:

- title: String
- description: String
- movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }]

#### Movie

- POST /movies => create a new movie
- GET /movies => retrieve all movies
- GET /movies/{movieId} => retrieve a movie by ID
- PUT /movies/{movieId} => update a movie by ID
- DELETE /movies/{movieId} => delete a movie by ID

The Schema for the movie is the following:

- title: String
- description: String
- year: Number
- duration: Number
- trailer: String (YouTube video ID)
- image: String (URL of the image)
- rating: Number

### Auth/jwt version

The available endpoints in this version are the following:

#### Category

- POST /categories => create a new category
- GET /categories => retrieve all categories
- GET /categories/{categoryId} => retrieve a category by ID
- PUT /categories/{categoryId} => update a category by ID
- DELETE /categories/{categoryId} => delete a category by ID
- POST /categories/{categoryId}/movies => add a movie to category by ID
- DELETE /categories/{categoryId}/movies/{movieId} => delete a movie from category by IDs

The Schema for the category is the following:

- title: String
- description: String
- movies: [{ type: Schema.Types.ObjectId, ref: 'Movie' }]

#### Movie

- POST /movies => create a new movie
- GET /movies => retrieve all movies
- GET /movies/{movieId} => retrieve a movie by ID
- PUT /movies/{movieId} => update a movie by ID
- DELETE /movies/{movieId} => delete a movie by ID
- POST /movies/{movieId}/reviews => add a review to a movie by ID
- DELETE /movies/{movieId}/reviews/{reviewId} => delete a review from a movie by IDs

The Schema for the movie is the following:

- title: String
- description: String
- year: Number
- duration: Number
- trailer: String (YouTube video ID)
- image: String (URL of the image)
- rating: Number,
- reviews : [{ type: Schema.Types.ObjectId, ref: 'Review' }]

#### User

- POST /users => create a new user
- POST /users/login => logs an user
- GET /users => retrieve all users
- GET /users/{userId} => retrieve an user by an ID
- GET /users/me => retrieve the current logged user
- POST /users/favorites/movies => add a favorite movie to the current logged user
- DELETE /users/favorites/movies/{movieId} => delete a favorite movie from the current logged user
- GET /users/favorite/movies => retrieve all favorites movies from the current logged user

The Schema for the user is the following:

- firstName: String
- lastName: String
- email: { type: String, required: true, index: { unique: true } }
- password: { type: String, required: true }
- favorites: [{ type: Schema.Types.ObjectId, ref: 'Movie' }]
- reviews : [{ type: Schema.Types.ObjectId, ref: 'Review' }]

#### Review

- GET /reviews => retrieve all reviews

The Schema for the review is the following:

- title: String
- review: String
- rating: Number
- user : { type: Schema.Types.ObjectId, ref: 'User' }
- movie : { type: Schema.Types.ObjectId, ref: 'Movie' }

### Running the API

The first step is cloning the repository and running "npm install" in the root project folder to install all the dependencies.
Then, you can run the application running "npm start" or using Docker running the following comands:

- docker build -t vtex-api .
- docker run --name vtex-api -p 3000:3000 vtex-api

Later, you can go to http://localhost:3000/ and you should see the following message:

{
  message: "Welcome to the VTEX Challenge"
}

### Testing the API

To run the automated tests run "npm test"
