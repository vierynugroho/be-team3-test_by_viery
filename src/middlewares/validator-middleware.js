const createHttpError = require('http-errors');
const Validators = require('../validations');

module.exports = (validator) => {
	if (!Validators.hasOwnProperty(validator)) throw new Error(`${validator} validator is not exist!`);

	return async (req, res, next) => {
		try {
			const validated = await Validators[validator].validateAsync(req.body);
			req.body = validated;
			next();
		} catch (error) {
			if (error.isJoi) return next(createHttpError(422, { message: error.message }));

			next(createHttpError(500));
		}
	};
};
