# Simple Koa - GraphQL - Mongoose ES6 Boilerplate

### Setting up 
Clone this repo and change details in package.json. Remove the .git directory and git init to start fresh.

Read below for more!

### Modules used
* graphql
* koa-graphql
* @koa-cors
* dotenv
* jsonwebtoken
* koa-jwt
* koa-router
* mongoose

### Directory Structure and important files

* auth - Auth related helper methods
* database - keeps models for mongoose into a separate *mongo* directory
* graphql - all the graphql related files stay here
* services - used to make more precise and compact services for busines logic (called from graphql resolvers)
* .env - stores all the environment related config
* app.js - initializes the database layer, middlewares, graphql and starts the server 


### Some important info
* mongoose models are defined in separate files under mongoose directory and are automatically populated and available in **ctx.db** on every koa request. For eg. *ctx.db.User*
* graphql directory has been broken down into
    * mutations - keeps all the mutations that you want (See sample mutations)
    * resolvers - keeps all the query resolvers that you want (See sample resolver)
    * types - keeps all the custom graphql types
    
* .env file need not to be checked into git and its best to keep it separate on each environment rather making *.env.dev*, *.env.prod*, don't do that. 
* Authentication - Authentication is being handled by **json web token**, check `UserSignupMutation.js` for more info on how to generate jwt tokens and send to client all in graphql
    * To enable auth for a particular `resolver` or `mutation` you just need to pass `true` while initializing in `schema.js` (check example)
    * For API, auth token needs to be sent into `Authorization` header of each request
    * For `graphiql`, token is picked up from cookie that is set when generating token the first time
    
* All `resolvers` and `mutation` extends the `BaseResolver` which does things like handling resolver level auth check

### How to run
* Clone the project
* Run npm install
* **node server.js**
* That's it!

### Future additions
* Add a simple logger capabale of handling different log levels

### Contribution

* Fork and make pull requests please!
* Report any bugs and improvements.

### Author

Suroor Wijdan [@suroorwijdan](https://github.com/suroorwijdan)


### License

BSD-3-Clause