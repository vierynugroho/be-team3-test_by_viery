const Joi = require("joi");

//! all field must be validated
const createUserSchema = Joi.object({
    name: Joi.string().max(60).required(),
    role: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).alphanum().required(),
    confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
        "any.only": "Confirm password does not match password",
    }),
    companyId: Joi.string().required(),
});

module.exports = createUserSchema;
