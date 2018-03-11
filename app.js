const env = require('dotenv');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const jwt = require('koa-jwt');
const GraphQLHTTP = require('koa-graphql');

const GraphQLSchema = require('./graphql/schema');
const database = require('./database');
const auth = require('./auth');

const app = new Koa();
const router = new Router();
const config = env.config().parsed;

async function init() {
    app.context.db = await database.start(__dirname + '/database/mongo', config.MONGO_URI);

    app.use(cors());

    //Unprotected root url
    router.get('/', (ctx, next) => {
        ctx.body = 'KOA Server running! Go back to sleep or code!';
    });

    //adding jwt to retrieve token if present and decode it,
    //allowing passthrough to enable login/signup requests to go through to graphql
    //cookie option has been passed to make auth work with graphiql
    router.use(jwt({secret: config.JWT_SECRET, passthrough: true, cookie: "token"}));

    //custom method to use parsed token data to validate and populate user
    router.use(auth.validate);

    //initializing graphql
    router.all('/graphql', GraphQLHTTP({
        schema: GraphQLSchema,
        graphiql: true
    }));

    //other protected url
    router.get('/protected', (ctx, next) => {
        if (!ctx.user) {
            ctx.status = 401;
            ctx.body = 'Protected resource, use Authorization header to get access';
            return;
        }

        ctx.body = 'This is a protected route!';
    });

    app.use(router.routes()).use(router.allowedMethods());

    //global error logging
    app.on("error", (err, ctx) => {
        console.log(err);
    });

    app.listen(config.PORT, function () {
        console.log("Server started on port =>", config.PORT);
    });
}


module.exports = init;