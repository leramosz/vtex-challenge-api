const mongoose = require("mongoose");
const Movie = require('../models/movie.model.js');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../test-server');
const should = chai.should();

chai.use(chaiHttp);

describe('Movies', () => {
      
  beforeEach((done) => {
        Movie.deleteMany({}, (err) => { 
           done();           
        });        
    });
        
  // GET all movies
  describe('/GET movies', () => {
      it('it should GET all the movies', (done) => {
        chai.request(server)
            .get('/movies')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              	done();
            });
      });
  });

  // POST a movie
  describe('/POST movies', () => {
      it('it should POST a new movie', (done) => {
          const movie = {
              title: "test title",
              description: "test description",
              year: 1800,
              duration: 0,
              trailer: "test trailer",
              image: "test image",
              rating: 0
          }
        chai.request(server)
            .post('/movies')
            .send(movie)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title').eql('test title');
                res.body.should.have.property('description').eql('test description');
                res.body.should.have.property('year').eql(1800);
                res.body.should.have.property('duration').eql(0);
                res.body.should.have.property('trailer').eql("test trailer");
                res.body.should.have.property('image').eql("test image");
                res.body.should.have.property('rating').eql(0);
              	done();
            });
      });
  });

  // GET movie by id
  describe('/GET/:id movie', () => {
      it('it should GET a movie by the given id', (done) => {
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
            chai.request(server)
            .get('/movies/' + movie.id)
            .send(movie)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('_id').eql(movie.id);
                res.body.should.have.property('title').eql('test title');
                res.body.should.have.property('description').eql('test description');
                res.body.should.have.property('year').eql(1800);
                res.body.should.have.property('duration').eql(0);
                res.body.should.have.property('trailer').eql("test trailer");
                res.body.should.have.property('image').eql("test image");
                res.body.should.have.property('rating').eql(0);
              	done();
            });
          });

      });
	
	});

  // PUT a category
  describe('/PUT/:id movie', () => {
      it('it should UPDATE a movie given the id', (done) => {
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
                chai.request(server)
                .put('/movies/' + movie.id)
                .send({
                    title: "Updated test title", 
                    description: "Updated test description",
                    year: 1900,
                    duration: 1,
                    trailer: "Updated test trailer",
                    image: "Updated test image",
                    rating: 1
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                	  res.body.should.have.property('title').eql('Updated test title');
                	  res.body.should.have.property('description').eql('Updated test description');
                    res.body.should.have.property('year').eql(1900);
                    res.body.should.have.property('duration').eql(1);
                    res.body.should.have.property('trailer').eql("Updated test trailer");
                    res.body.should.have.property('image').eql("Updated test image");
                    res.body.should.have.property('rating').eql(1);
                  	done();
                });
          });
      });
  });

  // DELETE a movie
  describe('/DELETE/:id movie', () => {
      it('it should DELETE a movie given the id', (done) => {
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
                chai.request(server)
                .delete('/movies/' + movie.id)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Movie deleted successfully!');
                  done();
                });
          });
      });
  });

});