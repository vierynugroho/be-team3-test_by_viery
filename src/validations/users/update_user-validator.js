const Joi = require("joi");

//! all field must be validated
const updateUserSchema = Joi.object({
    name: Joi.string().max(60).required(),
    role: Joi.string().required(),
    companyId: Joi.string().required(),
});

module.exports = updateUserSchema;
