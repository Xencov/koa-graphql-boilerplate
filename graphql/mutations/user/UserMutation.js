const BaseResolver = require('../../BaseResolver');
const {GraphQLString, GraphQLInt} = require('graphql');

class UserMutation extends BaseResolver {

    get args() {
        return {
            password: {
                type: GraphQLString,
                description: 'Password for the user.'
            },
            firstName: {
                type: GraphQLString,
                description: 'First name of the user.'
            },
            lastName: {
                type: GraphQLString,
                description: 'Last name for the user.'
            },
            age: {
                type: GraphQLInt,
                description: 'Age for the user.'
            }
        };
    }

    async resolve(parentValue, args, ctx) {
        //calling super method to check authentication if applicable
        super.resolve(parentValue, args, ctx);

        let user = await ctx.db.User.find({_id: ctx.user._id});

        user.password = args.password || user.password;
        user.firstName = args.firstName || user.firstName;
        user.lastName = args.lastName || user.lastName;
        user.age = args.age || user.age;

        try {
            return await user.save();
        } catch (e) {
            throw new Error(e);
        }
    }
}

module.exports = UserMutation;