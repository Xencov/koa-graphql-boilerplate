const BaseResolver = require('../../BaseResolver');
const {GraphQLNonNull, GraphQLString} = require('graphql');

class UserResolver extends BaseResolver {

    get args() {
        return {
            id: {
                type: new GraphQLNonNull(GraphQLString),
                description: 'Id for the user.'
            }
        };
    }

    async resolve(parentValue, args, ctx) {
        //calling super method to check authentication if applicable
        super.resolve(parentValue, args, ctx);

        try {
            return await ctx.db.User.findOne({_id: args.id}).lean();
        } catch (e) {
            throw new Error(e);
        }
    }
}

module.exports = UserResolver;