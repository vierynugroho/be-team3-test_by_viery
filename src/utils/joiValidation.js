const Joi = require("joi");

const registerSchema = Joi.object({
    name: Joi.string().max(60).required(),
    role: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).alphanum().required(),
    confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
        "any.only": "Confirm password does not match password",
    }),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).alphanum().required(),
});

const updateUserSchema = Joi.object({
    name: Joi.string().max(60).required(),
    role: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).alphanum().required(),
    confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
        "any.only": "Confirm password does not match password",
    }),
    companyId: Joi.string().required(),
});

module.exports = {
    loginSchema,
    registerSchema,
    updateUserSchema,
};
