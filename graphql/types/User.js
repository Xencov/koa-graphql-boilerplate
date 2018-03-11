const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = require('graphql');


const User = new GraphQLObjectType({
    name: 'User',
    description: 'User entity',
    fields: () => ({
        id: {
            type: GraphQLString,
            resolve: (user) => user._id
        },
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        fullName: {type: GraphQLString},
        username: {type: GraphQLString},
        age: {type: GraphQLInt},
        authToken: {type: GraphQLString},
    })
});

module.exports = User;