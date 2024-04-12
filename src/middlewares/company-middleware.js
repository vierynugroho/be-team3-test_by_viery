const createHttpError = require("http-errors");

module.exports = (companyId) => {
    return async (req, res, next) => {
        try {
            if (req.user.companyId !== stock.companyId) {
                next(
                    createHttpError(403, {
                        message:
                            "You don't have access, you are not part of this company",
                    })
                );
            }
            next();
        } catch (error) {
            next(createHttpError(500, { message: error.message }));
        }
    };
};
