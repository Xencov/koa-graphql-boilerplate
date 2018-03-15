const {
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} = require('graphql');

const resolvers = require('./resolvers');
const mutations = require('./mutations');
const auth = require('../auth');
const User = require('./types/User');

const Query = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'Root Query',
    fields: () => ({
        sample: {
            type: GraphQLString,
            description: 'Sample query which returns string!',
            resolve: () => {
                return 'Hello from GraphiQL';
            }
        },
        users: new resolvers.User.getAllUsers(new GraphQLList(User), "Get all users", true),
        user: new resolvers.User.getUser(User, "Get user by id", true)
    })
});

const Mutation = new GraphQLObjectType({
    name: 'RootMutation',
    description: 'Root Mutation',
    fields: () => ({
        createUser: new mutations.UserMutations.userSignup(User, "Creates a new user", false),
        user: new mutations.UserMutations.user(User, "Updates current user", true)
    })
});


const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

module.exports = Schema;