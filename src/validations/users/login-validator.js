const Joi = require("joi");

//! all field must be validated
const createUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).alphanum().required(),
});

module.exports = createUserSchema;
