const createHttpError = require("http-errors");

module.exports = (allowedRoles) => {
    return async (req, res, next) => {
        try {
            if (!allowedRoles.includes(req.user.role)) {
                next(
                    createHttpError(403, {
                        message: "Your role does not have access permissions",
                    })
                );
            }
            next();
        } catch (error) {
            next(createHttpError(500, { message: error.message }));
        }
    };
};
