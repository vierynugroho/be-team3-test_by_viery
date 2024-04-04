const Joi = require('joi');

//! all field must be validated
const createUserSchema = Joi.object({
	name: Joi.string().max(60).required(),
	role: Joi.string().required(),
	companyId: Joi.string().required(),
});

module.exports = createUserSchema;
