const express = require("express");

const router = express.Router();

const upload = require("../middlewares/upload-middleware");
const validatorMiddleware = require("../middlewares/validator-middleware");
const { register } = require("../controllers/auth/register-controller");
const { login, userLoggedIn } = require("../controllers/auth/login-controller");
const { registerSchema, loginSchema } = require("../utils/joiValidation");
const Authenticate = require("../middlewares/auth-middleware");
const CheckRole = require("../middlewares/role-middleware");

//! Register
// - only superadmin & admin
router.post(
    "/register",
    Authenticate,
    CheckRole(["admin", "superadmin"]),
    upload.array("images"),
    validatorMiddleware(registerSchema),
    register
);

router.post("/login", validatorMiddleware(loginSchema), login);

router.get("/me", Authenticate, userLoggedIn);

module.exports = router;
