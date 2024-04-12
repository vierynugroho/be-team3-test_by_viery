const createHttpError = require("http-errors");
const Validators = require("../utils/joiValidation");

module.exports = (schema) => {
    return async (req, res, next) => {
        try {
            const validated = await schema.validateAsync(req.body);
            req.body = validated;
            next();
        } catch (error) {
            if (error.isJoi)
                return next(createHttpError(422, { message: error.message }));

            next(createHttpError(500));
        }
    };
};
