const jwt = require('jsonwebtoken');

exports.validate = async function (ctx, next) {
    //do your validation by fetching the user here or just return same context
    if (ctx.state.user) {
        ctx.user = await ctx.db.User.findOne({_id: ctx.state.user._id});
    } else {
        ctx.user = null;
    }

    return next();
};

exports.generateToken = async function (data) {
    return jwt.sign(data, process.env.JWT_SECRET);
};