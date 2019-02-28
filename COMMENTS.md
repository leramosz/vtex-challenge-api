## Development Process and Decisions – API in NodeJS

As I mentioned in the comments for the APP, my initial idea for this Code Challenge was more ambitious than what I ended up implementing. This idea was to build an application that implemented the following:

- A back office site to administrate movies and movie categories (CRUD)
- A customer site to allow them to enter via login, to check movies and movie categories, to add/remove movies to/from favorites, to add/delete reviews to/from movies.

I started implementing this as part of the API endpoints. This code can be found in the branch auth/jwt.

The implemented endpoints are protected to not allow not authenticated/authorized requests. This authentication/authorization process is made through a login endpoint that returns an access token that has to be used as part of the header in the next calls. If the access token is not used as part of the header or is expired, the request is forbidden.

Currently, there is only one kind of user. Thus, all the endpoints are protected excepting the endpoint that creates a new user and the endpoint that logs in a user. With more time I could have been able to implement different kind of users and different kids of authorizations. 

As I ended up implementing a simpler APP, I decided to enable some endpoint with free access to be exposed to the APP. This code can be found in the master branch.

I decided to use ExpressJS as it has interesting utilities to create APIs quickly. Also, as one of the job requirement is experience working with NoSQL DBs, I decided to use MongoDB and Mongoose as ODM.

In terms of testing, I decided to use Mocha and Chai because I learned from my investigation that they are good tools to test APIs. Also, because its syntax is pretty similar to RSpec that I used in the past to test Ruby on Rails applications.

Finally, to show more personal skills I decided to use Docker so the API can be run easily in any environment. Also, I decided to set up an environment in AWS so the API can be consumed from there.



