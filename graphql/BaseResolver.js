class BaseResolver {

    constructor(type, description, isAuthRequired) {
        this._type = type;
        this._description = description;
        this._isAuthRequired = isAuthRequired || false;

        return {
            type: this._type,
            description: this._description,
            args: this.args,
            resolve: this.resolve.bind(this)
        }
    }

    get type() {
        return this._type;
    }

    get description() {
        return this._description
    }

    get isAuthRequired() {
        return this._isAuthRequired;
    }

    resolve(parentValue, args, ctx) {
        if (this._isAuthRequired && !ctx.user) {
            throw new Error("Authentication missing!");
        }
    }
}

module.exports = BaseResolver;