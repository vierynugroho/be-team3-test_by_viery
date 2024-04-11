const Joi = require("joi");

//! all field must be validated
const updateUserSchema = Joi.object({
    name: Joi.string().max(60).required(),
    role: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).alphanum().required(),
    companyId: Joi.string().required(),
});

module.exports = updateUserSchema;
