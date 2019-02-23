const mongoose = require("mongoose");
const Category = require('../models/category.model.js');
const Movie = require('../models/movie.model.js');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../test-server');
const should = chai.should();

chai.use(chaiHttp);

const postMovie = new Promise((resolve, reject) => {
  const movie = new Movie({
                    title: "test title", 
                    description: "test description",
                    year: 1800,
                    duration: 0,
                    trailer: "test trailer",
                    image: "test image",
                    rating: 0
                  });
  movie.save((err, movie) => {
    if (err) reject(err)
    resolve(movie);
  });
});

let movie;

describe('Categories', () => {

  before((done) => {
    postMovie.then((res) => {
      movie = res;
      done();  
    });
  });
      
  beforeEach((done) => {
    Category.deleteMany({}, (err) => { 
      done();           
    });        
  });
        
  // GET all categories
  describe('/GET categories', () => {
      it('it should GET all the categories', (done) => {
        chai.request(server)
            .get('/categories')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              	done();
            });
      });
  });

  // POST a category
  describe('/POST categories', () => {
      it('it should POST a new category', (done) => {
          const category = {
              title: "test title",
              description: "test description",
          }
        chai.request(server)
            .post('/categories')
            .send(category)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title').eql('test title');
                res.body.should.have.property('description').eql('test description');
              	done();
            });
      });
  });

  // GET category by id
  describe('/GET/:id category', () => {
      it('it should GET a category by the given id', (done) => {
          const category = new Category({
          					title: "test title", 
          					description: "test description"
          				});
          category.save((err, category) => {
            chai.request(server)
            .get('/categories/' + category.id)
            .send(category)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id').eql(category.id);
                res.body.should.have.property('title').eql('test title');
                res.body.should.have.property('description').eql('test description');
              	done();
            });
          });

      });
	
	});

  // PUT a category
  describe('/PUT/:id category', () => {
      it('it should UPDATE a category given the id', (done) => {
          const category = new Category({
          					title: "test title", 
          					description: "test description"
          				});
          category.save((err, category) => {
                chai.request(server)
                .put('/categories/' + category.id)
                .send({title: "Updated test title", description: "Updated test description"})
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                	res.body.should.have.property('title').eql('Updated test title');
                	res.body.should.have.property('description').eql('Updated test description');
                  done();
                });
          });
      });
  });

  // DELETE a category
  describe('/DELETE/:id category', () => {
      it('it should DELETE a category given the id', (done) => {
          const category = new Category({
          					title: "test title", 
          					description: "test description"
          				});
          category.save((err, category) => {
                chai.request(server)
                .delete('/categories/' + category.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Category deleted successfully!');
                  	done();
                });
          });
      });
  });

  // POST a movie into a category
  describe('/POST/:id/movies/:movieId categories', () => {

    it('it should POST a movie into a category', (done) => {
      const category = new Category({
                    title: "test title", 
                    description: "test description"
                  });
        category.save((err, category) => {
          const movieIntoCategory = { movie: movie.id }
          chai.request(server)
          .post('/categories/' + category.id + '/movies')
          .send(movieIntoCategory)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title').eql('test title');
            res.body.should.have.property('description').eql('test description');
            res.body.should.have.property('movies').to.be.an('array').to.have.members([movie.id]);
            done();
          });
        });
    });

  });

  // DELETE a movie from a category
  describe('/DELETE/:id/movies/:movieId categories', () => {

    it('it should DELETE a movie from a category', (done) => {
      const category = new Category({
                    title: "test title", 
                    description: "test description"
                  });
        category.save((err, category) => {
          chai.request(server)
          .delete('/categories/' + category.id + '/movies/' + movie.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title').eql('test title');
            res.body.should.have.property('description').eql('test description');
            res.body.should.have.property('movies').to.be.an('array').to.not.have.members([movie.id]);
            done();
          });
        });
    });

  });


});