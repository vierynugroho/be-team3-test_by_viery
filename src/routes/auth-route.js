const express = require("express");

const router = express.Router();

const upload = require("../middlewares/upload-middleware");
const validatorMiddleware = require("../middlewares/validator-middleware");
const { register } = require("../controllers/auth/register-controller");
const { login, authenticate } = require("../controllers/auth/login-controller");
const { registerSchema, loginSchema } = require("../utils/joiValidation");
const Authenticate = require("../middlewares/auth-middleware");

router.post(
    "/register",
    upload.array("images"),
    validatorMiddleware(registerSchema),
    register
);

router.post("/login", validatorMiddleware(loginSchema), login);

router.get("/me", Authenticate, authenticate);

module.exports = router;
