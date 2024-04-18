const Joi = require("joi");

const registerAdminSchema = Joi.object({
    name: Joi.string().max(60).required(),
    role: Joi.string().valid("user", "admin").required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).alphanum().required(),
    confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
        "any.only": "Confirm password does not match password",
    }),
});

const registerSuperAdminSchema = Joi.object({
    name: Joi.string().max(60).required(),
    role: Joi.string().valid("user", "admin", "superadmin").required(),
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
});

module.exports = {
    loginSchema,
    registerAdminSchema,
    registerSuperAdminSchema,
    updateUserSchema,
};
