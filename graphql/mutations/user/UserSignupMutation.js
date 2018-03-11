const BaseResolver = require('../../BaseResolver');
const {GraphQLNonNull, GraphQLString, GraphQLInt} = require('graphql');
const auth = require('../../../auth');

class UserSignupMutation extends BaseResolver {

    get args() {
        return {
            username: {
                type: new GraphQLNonNull(GraphQLString),
                description: 'Username for the user.'
            },
            password: {
                type: new GraphQLNonNull(GraphQLString),
                description: 'Password for the user.'
            },
            firstName: {
                type: new GraphQLNonNull(GraphQLString),
                description: 'First name of the user.'
            },
            lastName: {
                type: new GraphQLNonNull(GraphQLString),
                description: 'Last name for the user.'
            },
            age: {
                type: GraphQLInt,
                description: 'Age for the user.'
            }
        };
    }

    async resolve(parentValue, args, ctx) {
        let user = new ctx.db.User(args);

        try {
            let savedUser = await user.save();
            savedUser.authToken = await auth.generateToken({_id: user._id, username: user.username});

            ctx.cookies.set('token', savedUser.authToken);

            return savedUser;
        } catch (e) {
            throw new Error(e);
        }
    }
}

module.exports = UserSignupMutation;